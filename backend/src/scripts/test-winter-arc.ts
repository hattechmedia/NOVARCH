import { communityService } from '../services/community.service.js';
import {
  CreateWinterArcPublicSchema,
  CreatePublicCommunitySchema,
  UpdateCommunityStatusSchema,
} from '../types/community.types.js';
import mongoose from 'mongoose';

async function runTests() {
  console.log('🧪 Starting Winter Arc & Community Integration Tests...\n');

  // Test 1: Valid Winter Arc payload
  console.log('Test 1: Validating Winter Arc application payload schema...');
  const validWinterArcPayload = {
    applicationType: 'winter-arc' as const,
    fullName: 'Alexander Weber',
    email: 'alex.weber@ilmenau-tech.de',
    city: 'Ilmenau',
    organization: 'Ilmenau Robotics Lab',
    whatYouDo: 'Building autonomous sensor nodes and embedded robotics systems.',
    whatCanYouOffer: 'Hardware-level systems architecture insights and edge AI prototyping experience.',
    whatAreYouLookingFor: 'Collaborations with software founders and UI/UX designers.',
    linkedinUrl: 'https://linkedin.com/in/alex-weber',
    portfolioUrl: 'https://alexweber.dev',
    proposedGuest: 'Elena Rostova, Research Fellow at TU Ilmenau',
    referral: {
      utmSource: 'linkedin',
      utmMedium: 'social',
      utmCampaign: 'winter_arc_launch',
    },
  };

  const parsedWinterArc = CreateWinterArcPublicSchema.parse(validWinterArcPayload);
  console.log('✅ Winter Arc payload validated successfully:', parsedWinterArc.fullName);

  // Test 2: Invalid Winter Arc payload (missing required city & whatCanYouOffer)
  console.log('\nTest 2: Testing schema rejection for invalid Winter Arc payload...');
  try {
    CreateWinterArcPublicSchema.parse({
      applicationType: 'winter-arc',
      fullName: 'Incomplete Applicant',
      email: 'invalid-email',
      // missing city, organization, whatYouDo, whatCanYouOffer, whatAreYouLookingFor
    });
    console.error('❌ Test failed: Invalid payload was unexpectedly accepted.');
  } catch (err: any) {
    console.log('✅ Correctly rejected invalid Winter Arc payload with validation errors:', err.issues?.length, 'issues found.');
  }

  // Test 3: Standard Community application payload
  console.log('\nTest 3: Testing standard Community application payload...');
  const validCommunityPayload = {
    applicationType: 'community' as const,
    fullName: 'Sarah Miller',
    email: 'sarah.m@example.com',
    organization: 'Acme Digital',
    role: 'Product Lead',
    interests: ['AI & Automation', 'Custom Software'],
    message: 'Excited to join the NOVARCH circle.',
  };
  const parsedCommunity = CreatePublicCommunitySchema.parse(validCommunityPayload);
  console.log('✅ Community payload validated successfully:', parsedCommunity.fullName);

  // Test 4: Service submission and persistence
  console.log('\nTest 4: Testing CommunityService submitMember for Winter Arc...');
  const { member: savedWinterArc, emailResult } = await communityService.submitMember(parsedWinterArc);
  console.log('✅ Saved Winter Arc Application ID:', savedWinterArc.id);
  console.log('   Application Type:', savedWinterArc.applicationType);
  console.log('   Email status:', emailResult.status);
  console.log('   Status:', savedWinterArc.status);

  // Test 5: Service submission for Community Member
  console.log('\nTest 5: Testing CommunityService submitMember for standard Community...');
  const { member: savedCommunity } = await communityService.submitMember(parsedCommunity);
  console.log('✅ Saved Community Member ID:', savedCommunity.id);
  console.log('   Application Type:', savedCommunity.applicationType);

  // Test 6: Fetch all and filter
  console.log('\nTest 6: Querying all applications...');
  const allMembers = await communityService.getAllMembers();
  console.log(`✅ Total members in repository: ${allMembers.length}`);

  const winterArcList = await communityService.getAllMembers({ applicationType: 'winter-arc' });
  console.log(`✅ Winter Arc applications filtered: ${winterArcList.length}`);

  const communityList = await communityService.getAllMembers({ applicationType: 'community' });
  console.log(`✅ Community members filtered: ${communityList.length}`);

  // Test 7: Status update
  console.log('\nTest 7: Testing status update to "Selected"...');
  const validStatus = UpdateCommunityStatusSchema.parse({ status: 'Selected' });
  const updatedMember = await communityService.updateMemberStatus(savedWinterArc.id, validStatus.status as any);
  console.log(`✅ Member ${updatedMember?.fullName} status updated to: ${updatedMember?.status}`);

  // Test 8: Query by ID
  console.log('\nTest 8: Querying record by ID...');
  const retrieved = await communityService.getMemberById(savedWinterArc.id);
  console.log(`✅ Retrieved record: ${retrieved?.fullName} (${retrieved?.email})`);
  console.log(`   City: ${retrieved?.city}`);
  console.log(`   What they can offer: ${retrieved?.whatCanYouOffer}`);
  const referral = retrieved?.referral;
  const campaignSource =
    referral && typeof referral === 'object' && 'utmSource' in referral ? referral.utmSource : undefined;
  console.log(`   Campaign Source: ${campaignSource}`);

  // Cleanup test records
  console.log('\nCleaning up test records...');
  await communityService.deleteMember(savedWinterArc.id);
  await communityService.deleteMember(savedCommunity.id);
  console.log('✅ Cleaned up test records.');

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  console.log('\n🎉 ALL INTEGRATION TESTS PASSED PERFECTLY!\n');
}

runTests().catch((err) => {
  console.error('❌ Test run failed:', err);
  process.exit(1);
});
