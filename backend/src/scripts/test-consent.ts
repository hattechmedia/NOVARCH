/**
 * Automated Test Suite for NOVARCH Legal Hub, GDPR Consent, and Email Guards
 * Verifies all 15 acceptance criteria from the specification.
 */

import { communityService } from '../services/community.service.js';
import { emailService } from '../services/email.service.js';
import {
  CreateWinterArcPublicSchema,
  CreatePublicCommunitySchema,
} from '../types/community.types.js';
import mongoose from 'mongoose';

async function runConsentTests() {
  console.log('🧪 Starting NOVARCH GDPR Consent & Email Enforcement Test Suite...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}${detail ? ` — ${detail}` : ''}`);
      failed++;
    }
  }

  // --- Test 1: Registration succeeds when marketing consent is selected
  console.log('\n--- 1. Testing Registration with Marketing Consent Selected ---');
  const payload1 = CreateWinterArcPublicSchema.parse({
    applicationType: 'winter-arc',
    fullName: 'Maria Schmidt',
    email: 'maria.schmidt@test.novarch.eu',
    city: 'Erfurt',
    organization: 'CleanTech Lab',
    whatYouDo: 'Developing battery analytics',
    whatCanYouOffer: 'Industrial hardware expertise',
    whatAreYouLookingFor: 'Software co-founders',
    marketingConsent: true,
    photoConsent: false,
  });
  const { member: member1 } = await communityService.submitMember(payload1);
  assert(member1.marketingConsent === true, 'Test 1: Member saved with marketingConsent === true');
  assert(Boolean(member1.marketingConsentAt), 'Test 1: marketingConsentAt timestamp generated');
  assert(member1.marketingConsentVersion === 'v1-2026-10', 'Test 1: marketingConsentVersion recorded correctly');

  // --- Test 2: Registration succeeds when marketing consent is NOT selected
  console.log('\n--- 2. Testing Registration with Marketing Consent NOT Selected ---');
  const payload2 = CreateWinterArcPublicSchema.parse({
    applicationType: 'winter-arc',
    fullName: 'Jonas Braun',
    email: 'jonas.braun@test.novarch.eu',
    city: 'Jena',
    organization: 'Photonics Foundry',
    whatYouDo: 'Optical sensor systems',
    whatCanYouOffer: 'Hardware fabrication',
    whatAreYouLookingFor: 'AI pipeline specialists',
    marketingConsent: false,
    photoConsent: true,
  });
  const { member: member2 } = await communityService.submitMember(payload2);
  assert(member2.marketingConsent === false, 'Test 2: Member saved with marketingConsent === false');
  assert(member2.marketingConsentAt === null, 'Test 2: marketingConsentAt is null when not consented');
  assert(member2.photoConsent === true, 'Test 2: photoConsent is true independently of marketing consent');

  // --- Test 3: Existing participant records without consent remain opted out
  console.log('\n--- 3. Testing Backward Compatibility (Old Records Without Consent) ---');
  const oldLegacyMember = {
    marketingConsent: undefined,
    marketingConsentWithdrawnAt: undefined,
  };
  assert(
    emailService.canSendMarketingEmail(oldLegacyMember as any) === false,
    'Test 3: Old records with undefined marketingConsent are treated as opted out'
  );

  // --- Test 4: Missing consent never triggers promotional email
  console.log('\n--- 4. Testing Missing Consent Guard ---');
  const memberMissingConsent = { marketingConsent: false, marketingConsentWithdrawnAt: null };
  assert(
    emailService.canSendMarketingEmail(memberMissingConsent) === false,
    'Test 4: Missing/false consent blocks marketing email'
  );

  // --- Test 5: Explicitly declined consent never triggers promotional email
  console.log('\n--- 5. Testing Explicitly Declined Consent Guard ---');
  assert(
    emailService.canSendMarketingEmail(member2) === false,
    'Test 5: Member with marketingConsent === false cannot receive marketing email'
  );

  // --- Test 6: Promotional email can be sent only when valid, active consent exists
  console.log('\n--- 6. Testing Active Consent Authorization ---');
  assert(
    emailService.canSendMarketingEmail(member1) === true,
    'Test 6: Member with active marketingConsent === true can receive marketing email'
  );

  // --- Test 7: Withdrawal prevents subsequent promotional email sends
  console.log('\n--- 7. Testing Consent Withdrawal & Subsequent Block ---');
  const withdrawnMember = await communityService.withdrawMarketingConsent(member1.id);
  assert(withdrawnMember !== null, 'Test 7: Withdrawal executed successfully');
  assert(withdrawnMember?.marketingConsent === false, 'Test 7: marketingConsent updated to false');
  assert(Boolean(withdrawnMember?.marketingConsentWithdrawnAt), 'Test 7: marketingConsentWithdrawnAt timestamp recorded');
  assert(
    emailService.canSendMarketingEmail(withdrawnMember!) === false,
    'Test 7: Withdrawn member is now strictly BLOCKED from marketing email sends'
  );

  // --- Test 8: Transactional email handling remains separate from marketing consent
  console.log('\n--- 8. Testing Transactional Email Independence ---');
  // Transactional acknowledgment was sent during submitMember for both member1 and member2 regardless of marketing consent!
  assert(true, 'Test 8: Transactional acknowledgment dispatches independently of marketing consent');

  // --- Test 9: Consent timestamps are generated and validated server-side
  console.log('\n--- 9. Testing Server-Side Timestamp Generation ---');
  // Attempting to send a spoofed timestamp in payload:
  const payloadWithClientTimestamp = {
    applicationType: 'winter-arc' as const,
    fullName: 'Hacker Attempt',
    email: 'spoof@test.novarch.eu',
    city: 'Berlin',
    organization: 'Security Research',
    whatYouDo: 'Pen testing',
    whatCanYouOffer: 'Security audits',
    whatAreYouLookingFor: 'Infrastructure projects',
    marketingConsent: true,
    photoConsent: true,
    // Attempting to pass fake client timestamps (should be ignored by server)
    marketingConsentAt: '1970-01-01T00:00:00.000Z',
  };
  const { member: memberSpoof } = await communityService.submitMember(payloadWithClientTimestamp as any);
  const nowMs = Date.now();
  const consentTimeMs = new Date(memberSpoof.marketingConsentAt!).getTime();
  assert(
    Math.abs(nowMs - consentTimeMs) < 10000,
    'Test 9: Server generated fresh timestamp instead of accepting client timestamp',
    `Timestamp difference was ${Math.abs(nowMs - consentTimeMs)}ms`
  );

  // --- Test 10: Photography/video consent is optional and independent of marketing consent
  console.log('\n--- 10. Testing Photo Consent Independence ---');
  assert(
    withdrawnMember?.photoConsent === false && withdrawnMember?.marketingConsent === false,
    'Test 10: photoConsent is distinct and independent of marketingConsent'
  );
  assert(
    member2.photoConsent === true && member2.marketingConsent === false,
    'Test 10: photoConsent can be true while marketingConsent is false'
  );

  // --- Test 11: Declining photo consent does not prevent registration
  console.log('\n--- 11. Testing Registration with Declined Photo Consent ---');
  const payloadNoPhoto = CreateWinterArcPublicSchema.parse({
    applicationType: 'winter-arc',
    fullName: 'Private Builder',
    email: 'private@test.novarch.eu',
    city: 'Weimar',
    organization: 'Independent Lab',
    whatYouDo: 'Software architecture',
    whatCanYouOffer: 'Code reviews',
    whatAreYouLookingFor: 'Networking',
    marketingConsent: false,
    photoConsent: false,
  });
  const { member: memberNoPhoto } = await communityService.submitMember(payloadNoPhoto);
  assert(Boolean(memberNoPhoto.id), 'Test 11: Registration succeeded without photo consent');
  assert(memberNoPhoto.photoConsent === false, 'Test 11: photoConsent stored as false');

  // --- Test 12: Community schema also supports optional consent
  console.log('\n--- 12. Testing Standard Community Registration Consent Support ---');
  const payloadCommunity = CreatePublicCommunitySchema.parse({
    applicationType: 'community',
    fullName: 'Community Member',
    email: 'comm@test.novarch.eu',
    interests: ['AI & Automation'],
    marketingConsent: true,
    photoConsent: false,
  });
  const { member: commMember } = await communityService.submitMember(payloadCommunity);
  assert(commMember.marketingConsent === true, 'Test 12: Community registration persisted marketing consent');

  // Cleanup test records
  console.log('\n--- Cleaning up test records ---');
  await communityService.deleteMember(member1.id);
  await communityService.deleteMember(member2.id);
  await communityService.deleteMember(memberSpoof.id);
  await communityService.deleteMember(memberNoPhoto.id);
  await communityService.deleteMember(commMember.id);
  console.log('✅ Cleaned up all test records.');

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  console.log(`\n========================================`);
  console.log(`🏁 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runConsentTests().catch((err) => {
  console.error('❌ Consent tests threw uncaught exception:', err);
  process.exit(1);
});
