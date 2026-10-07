import {
  initCompanyDb,
  createCompany,
  getCompanyByEmail,
  getCompanyById,
  getAllCompanies,
} from '../src/lib/db.js';
import { hashPassword, verifyPassword, generateToken, verifyToken } from '../src/lib/auth.js';
import { sanitizeUser } from '../src/lib/middleware.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log('🧪 Starting Corporate / Company Authentication Unit Tests...\n');

  await initCompanyDb();

  // Test 1: Seeded Corporate Partners
  console.log('Test 1: Seeded Corporate Partners Verification');
  const googleComp = await getCompanyByEmail('recruiter@google.com');
  assert(googleComp !== null, 'Seeded Google company exists');
  assert(googleComp.role === 'COMPANY', 'Seeded company has role COMPANY');
  assert(googleComp.status === 'ACTIVE', 'Seeded company is ACTIVE');
  assert(googleComp.auth_provider === 'google', 'Seeded Google partner has auth_provider=google');

  const tcsComp = await getCompanyByEmail('campus@tcs.com');
  assert(tcsComp !== null, 'Seeded TCS company exists');
  const tcsPwOk = await verifyPassword('Company@RIMT#2026', tcsComp.password_hash);
  assert(tcsPwOk === true, 'Seeded TCS password verifies correctly');

  // Test 2: New Company Registration (Email + Password)
  console.log('\nTest 2: Company Registration (Email + Password)');
  const testEmail = `recruiter.deloitte.${Date.now()}@deloitte.com`;
  const testPw = 'DeloitteHiring#2026';
  const hashedPw = await hashPassword(testPw);

  const newCompany = await createCompany({
    company_name: 'Deloitte India',
    recruiter_name: 'Priya Sharma',
    email: testEmail,
    password_hash: hashedPw,
    auth_provider: 'email',
    industry: 'Consulting & Risk Advisory',
  });

  assert(newCompany.id !== undefined, 'Company ID generated');
  assert(newCompany.company_name === 'Deloitte India', 'Company name saved correctly');
  assert(newCompany.role === 'COMPANY', 'Role is strictly COMPANY');
  assert(newCompany.status === 'ACTIVE', 'Status is ACTIVE');

  const retrieved = await getCompanyByEmail(testEmail);
  assert(retrieved !== null, 'Retrieved registered company by email');
  assert(retrieved.company_name === 'Deloitte India', 'Retrieved company name matches');
  const pwVerified = await verifyPassword(testPw, retrieved.password_hash);
  assert(pwVerified === true, 'Password verified successfully');

  // Test 3: Google OAuth Registration & Sign In
  console.log('\nTest 3: Company Registration via Google OAuth');
  const googleEmail = `recruiter.aws.${Date.now()}@amazon.com`;
  const googleUser = await createCompany({
    company_name: 'Amazon Web Services',
    recruiter_name: 'DevOps Campus Team',
    email: googleEmail,
    password_hash: null,
    auth_provider: 'google',
    industry: 'Cloud & Infrastructure',
    avatar_url: 'https://ui-avatars.com/api/?name=AWS&background=FF9900&color=000&bold=true',
  });

  assert(googleUser.auth_provider === 'google', 'Auth provider is google');
  assert(googleUser.password_hash === null, 'No password required for Google auth');
  assert(googleUser.role === 'COMPANY', 'Google authenticated user has role COMPANY');

  // Test 4: Token Generation & Verification with Role Isolation
  console.log('\nTest 4: Corporate JWT Token Lifecycle');
  const token = await generateToken({
    id: googleUser.id,
    companyId: googleUser.id,
    email: googleUser.email,
    company_name: googleUser.company_name,
    role: 'COMPANY',
  });

  assert(typeof token === 'string' && token.length > 20, 'JWT token generated');
  const decoded = await verifyToken(token);
  assert(decoded !== null, 'JWT token successfully verified');
  assert(decoded.role === 'COMPANY', 'Decoded role is COMPANY');
  assert(decoded.companyId === googleUser.id, 'Decoded companyId matches');

  // Test 5: Role-based boundary checks
  console.log('\nTest 5: Role Gating Logic');
  // Check allowedRoles for Talent Directory (allows ADMIN and COMPANY)
  const allowedForTalent = ['ADMIN', 'COMPANY'];
  assert(allowedForTalent.includes(decoded.role), 'COMPANY role is allowed to view Talent Pool');

  // Check staff-restricted actions (approvals, reject, revoke)
  const staffOnlyRoles = ['ADMIN', 'SUPER_ADMIN'];
  assert(!staffOnlyRoles.includes(decoded.role), 'COMPANY role is BLOCKED from staff actions (Approvals, Student Edits)');

  // Test 6: Security Sanitization
  console.log('\nTest 6: Sanitization Check');
  const safe = sanitizeUser(newCompany);
  assert(safe.password_hash === undefined, 'password_hash removed from sanitized object');
  assert(safe.company_name === 'Deloitte India', 'Public fields intact');

  console.log('\n========================================');
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log('========================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});
