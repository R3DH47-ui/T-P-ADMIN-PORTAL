import { initAdminDb, createAdmin, getAdminByEmail, getAdminById, checkAdminEmailExists, updateAdmin } from '../src/lib/db.js';
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
  console.log('🧪 Starting Admin Authentication Unit Tests...\n');

  await initAdminDb();

  // Test 1: Seeded Admin Verification
  console.log('Test 1: Seeded Admin Verification');
  const defaultAdmin = await getAdminByEmail('dean.tp.rimt@gmail.com');
  assert(defaultAdmin !== null, 'Default admin exists in database');
  assert(defaultAdmin.role === 'ADMIN', 'Default admin has role ADMIN');
  assert(defaultAdmin.status === 'ACTIVE', 'Default admin has status ACTIVE');
  const pwOk = await verifyPassword('Admin@1234', defaultAdmin.password_hash);
  assert(pwOk === true, 'Default admin password verifies successfully');

  // Test 2: Admin Signup and Duplicate Prevention
  console.log('\nTest 2: Admin Signup and Duplicate Prevention');
  const newEmail = `admin.test.${Date.now()}@gmail.com`;
  const newPw = 'ComplexPass@2026';
  const newHash = await hashPassword(newPw);

  const existsBefore = await checkAdminEmailExists(newEmail);
  assert(existsBefore === false, 'New email does not exist before signup');

  const createdAdmin = await createAdmin({
    full_name: 'Dr. Test Administrator',
    email: newEmail,
    password_hash: newHash,
    role: 'ADMIN',
    status: 'ACTIVE',
  });

  assert(createdAdmin.id !== undefined, 'Admin ID generated');
  assert(createdAdmin.email === newEmail.toLowerCase(), 'Email normalized and stored');
  assert(createdAdmin.status === 'ACTIVE', 'New admin status is ACTIVE');

  const existsAfter = await checkAdminEmailExists(newEmail);
  assert(existsAfter === true, 'Email exists after signup');

  // Test 3: JWT Token generation & verification
  console.log('\nTest 3: Token Lifecycle for Admin Session');
  const token = await generateToken({
    id: createdAdmin.id,
    adminId: createdAdmin.id,
    email: createdAdmin.email,
    role: createdAdmin.role,
  });
  assert(typeof token === 'string' && token.split('.').length === 3, 'Valid JWT structure generated');

  const decoded = await verifyToken(token);
  assert(decoded !== null, 'Token decodes successfully');
  assert(decoded.adminId === createdAdmin.id, 'Decoded payload contains correct adminId');
  assert(decoded.role === 'ADMIN', 'Decoded payload contains role ADMIN');

  // Test 4: Password Change
  console.log('\nTest 4: Password Update');
  const newerPw = 'UpdatedSecure#789';
  const newerHash = await hashPassword(newerPw);
  const updated = await updateAdmin(createdAdmin.id, { password_hash: newerHash });
  assert(updated !== null, 'Admin record updated');

  const refreshedAdmin = await getAdminById(createdAdmin.id);
  const oldPwCheck = await verifyPassword(newPw, refreshedAdmin.password_hash);
  const newPwCheck = await verifyPassword(newerPw, refreshedAdmin.password_hash);
  assert(oldPwCheck === false, 'Old password no longer valid');
  assert(newPwCheck === true, 'New password valid');

  // Test 5: Profile Picture Update
  console.log('\nTest 5: Profile Picture Update');
  const picUrl = 'https://example.com/admin-avatar.jpg';
  await updateAdmin(createdAdmin.id, { profile_pic_url: picUrl });
  const adminWithPic = await getAdminById(createdAdmin.id);
  assert(adminWithPic.profile_pic_url === picUrl, 'Profile picture URL updated');

  // Test 6: Sanitization
  console.log('\nTest 6: Security Sanitization');
  const sanitized = sanitizeUser(adminWithPic);
  assert(sanitized.password_hash === undefined, 'password_hash is completely stripped from sanitized user');

  console.log(`\n========================================`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
