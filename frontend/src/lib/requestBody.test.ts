import test from 'node:test';
import assert from 'node:assert/strict';
import { readObject, RequestBodyError } from './requestBody';

function request(body: string) { return new Request('http://test.local', { method: 'POST', headers: { 'content-type': 'application/json' }, body }); }
test('rejects null, arrays, malformed JSON and object-valued user fields', async () => {
  for (const body of ['null', '[]', '{', '{"email":{"$ne":null}}', '{"photoConsent":"true"}']) {
    await assert.rejects(() => readObject(request(body)), RequestBodyError);
  }
});
test('rejects an oversized body before JSON parsing', async () => {
  await assert.rejects(() => readObject(request('x'.repeat(40000))), (error: unknown) => error instanceof RequestBodyError && error.status === 413);
});
test('keeps valid registration consent choices and campaign data intact', async () => {
  const body = { fullName: 'Test Participant', email: 'test@example.com', marketingConsent: false, photoConsent: true, referral: { utmSource: 'event' }, interests: ['Engineering'] };
  assert.deepEqual(await readObject(request(JSON.stringify(body))), body);
});
