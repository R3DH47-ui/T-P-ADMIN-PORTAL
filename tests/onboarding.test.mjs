/**
 * Onboarding & Gated Status Guard Verification Test Suite
 * Validates signup, pending gating, approval transitions, rejection,
 * and immediate mid-session token invalidation.
 */

import { initDb, getUserByEmail, getUserByRollNo, createStudent, approveStudent, rejectStudent, revokeStudent, getUserById, updateProfile } from '../src/lib/db.js';
import { hashPassword, verifyPassword, generateToken, verifyToken } from '../src/lib/auth.js';

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
  console.log('🧪 Starting Onboarding & Status-Guard Unit Tests...\n');

  await initDb();

  // Test 1: Password hashing and verification
  console.log('Test 1: Password Cryptography');
  const rawPw = 'StudentSecret@123';
  const hash = await hashPassword(rawPw);
  const isValid = await verifyPassword(rawPw, hash);
  const isInvalid = await verifyPassword('WrongPw', hash);
  assert(isValid === true, 'Correct password verifies successfully');
  assert(isInvalid === false, 'Incorrect password is appropriately rejected');

  // Test 2: Student Registration creates PENDING status
  console.log('\nTest 2: Student Signup -> PENDING Status');
  const studentEmail = `student.${Date.now()}@rimt.ac.in`;
  const studentRoll = `RIMT-23-CSE-${Math.floor(Math.random() * 899 + 100)}`;
  const newStudent = await createStudent({
    full_name: 'Test Student',
    roll_number: studentRoll,
    department: 'Computer Science & Engineering',
    year_semester: '2nd Year (3rd Sem)',
    email: studentEmail,
    password_hash: hash,
  });

  assert(newStudent.id !== undefined, 'User ID generated');
  assert(newStudent.status === 'PENDING', 'Initial status is strictly PENDING');
  assert(newStudent.role === 'USER', 'Initial role is USER');

  // Regression test: legacy mobile-format records use name/roll_no, while portal queries use full_name/roll_number.
  const legacyRoll = `LEGACY-${Date.now()}`;
  global.__RIMT_DB_USERS.push({
    id: `legacy-${Date.now()}`,
    name: 'Legacy Phone Student',
    roll_no: legacyRoll,
    department: 'Computer Science & Engineering',
    year_semester: '1st Year (1st Sem)',
    email: `legacy.${Date.now()}@rimt.ac.in`,
    password_hash: hash,
    status: 'PENDING',
    role: 'USER',
    created_at: new Date().toISOString(),
  });
  const legacyLookup = await getUserByRollNo(legacyRoll);
  assert(legacyLookup && (legacyLookup.roll_number === legacyRoll || legacyLookup.roll_no === legacyRoll), 'Legacy mobile-format student is found using roll number lookup');

  // Test 3: Status Gating on Login Attempt
  console.log('\nTest 3: Authentication Gate for PENDING Account');
  const lookupUser = await getUserByEmail(studentEmail);
  const canIssueToken = lookupUser.status === 'APPROVED';
  assert(canIssueToken === false, 'Pending student is BLOCKED from receiving access token');

  // Test 4: Admin Approval Transition
  console.log('\nTest 4: Admin Approval State Transition');
  const approvedUser = await approveStudent(newStudent.id, 'ADMIN-001');
  assert(approvedUser.status === 'APPROVED', 'Status transitions to APPROVED upon admin approval');
  assert(approvedUser.reviewed_by === 'ADMIN-001', 'Auditor ID recorded on approval');
  assert(approvedUser.reviewed_at !== null, 'Timestamp recorded on approval');

  // Test 5: Approved Student Token Generation & Profile Access
  console.log('\nTest 5: Approved Student Session & Profile Modification');
  const studentToken = await generateToken({
    id: approvedUser.id,
    email: approvedUser.email,
    role: approvedUser.role,
    status: approvedUser.status,
  });
  const decoded = await verifyToken(studentToken);
  assert(decoded.id === approvedUser.id, 'Valid JWT generated and decoded');

  const updatedProfile = await updateProfile(approvedUser.id, {
    phone: '+91 98765-43210',
    department: 'CSE - Artificial Intelligence',
  });
  assert(updatedProfile.phone === '+91 98765-43210', 'Approved student can modify profile');

  // Test 6: Admin Rejection with Reason
  console.log('\nTest 6: Admin Rejection with Reason');
  const rejectReason = 'Roll number does not match university registrar batch records.';
  const rejectedUser = await rejectStudent(approvedUser.id, rejectReason, 'ADMIN-001');
  assert(rejectedUser.status === 'REJECTED', 'Status transitions to REJECTED');
  assert(rejectedUser.rejection_reason === rejectReason, 'Rejection reason saved correctly');

  // Test 7: Mid-Session Token Invalidation (CRITICAL)
  console.log('\nTest 7: Live Status Guard (Immediate Mid-Session Invalidation)');
  // Simulated middleware check using the previously issued studentToken
  const liveDbUser = await getUserById(decoded.id);
  const isAccessAllowed = liveDbUser && liveDbUser.status === 'APPROVED';
  assert(isAccessAllowed === false, 'Active token is IMMEDIATELY invalid because live DB status is REJECTED');

  // Test 8: Rejected User Profile Update Blocked
  console.log('\nTest 8: Blocked Profile Mutation for Rejected User');
  let blockedError = null;
  try {
    await updateProfile(rejectedUser.id, { phone: '1234567890' });
  } catch (err) {
    blockedError = err;
  }
  assert(blockedError !== null, 'Rejected user is blocked from mutating profile');

  console.log('\nTest 9: Revoking Previously Approved Access');
  const restoredUser = await approveStudent(rejectedUser.id, 'ADMIN-001');
  assert(restoredUser.status === 'APPROVED', 'Rejected registration can be re-approved');
  const revocationReason = 'Access removed for status-guard test.';
  const revokedUser = await revokeStudent(restoredUser.id, revocationReason, 'ADMIN-001');
  assert(revokedUser.status === 'REVOKED', 'Approved account transitions to REVOKED');
  assert(revokedUser.revocation_reason === revocationReason, 'Revocation reason is recorded');
  const liveRevokedUser = await getUserById(revokedUser.id);
  assert(liveRevokedUser.status === 'REVOKED', 'Live user lookup returns revoked status');

  let revokedProfileError = null;
  try {
    await updateProfile(revokedUser.id, { phone: '1234567890' });
  } catch (err) {
    revokedProfileError = err;
  }
  assert(revokedProfileError !== null, 'Revoked user is blocked from profile changes');

  console.log(`\n========================================`);
  console.log(`🏁 Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
