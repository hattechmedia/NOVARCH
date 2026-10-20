export class RequestBodyError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}

/** Read a bounded stream before JSON parsing, including chunked requests. */
export async function readObject(request: Request): Promise<Record<string, unknown>> {
  if (!request.headers.get('content-type')?.includes('application/json')) throw new RequestBodyError('JSON required');
  const reader = request.body?.getReader();
  if (!reader) throw new RequestBodyError('Request body required');
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    while (true) {
      const part = await reader.read(); if (part.done) break;
      size += part.value.byteLength;
      if (size > 32768) { await reader.cancel(); throw new RequestBodyError('Request too large', 413); }
      chunks.push(part.value);
    }
  } finally { reader.releaseLock(); }
  const all = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { all.set(chunk, offset); offset += chunk.length; }
  let value: unknown;
  try { value = JSON.parse(new TextDecoder().decode(all)); } catch { throw new RequestBodyError('Invalid JSON'); }
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new RequestBodyError('Object required');
  const body = value as Record<string, unknown>;
  if (Object.keys(body).length > 40) throw new RequestBodyError('Too many fields');
  for (const [key, field] of Object.entries(body)) {
    if (key === 'marketingConsent' || key === 'photoConsent') {
      if (typeof field !== 'boolean') throw new RequestBodyError('Invalid consent');
    } else if (key === 'performances' || key === 'interests' || key === 'text') {
      if (!Array.isArray(field) || field.length > 15 || field.some(v => typeof v !== 'string' || v.length > (key === 'text' ? 3000 : 100))) throw new RequestBodyError('Invalid selection');
    } else if (key === 'referral' && field && typeof field === 'object' && !Array.isArray(field)) {
      if (Object.keys(field).length > 5 || Object.values(field).some(v => typeof v !== 'string' || v.length > 500)) throw new RequestBodyError('Invalid referral');
    } else if (key === 'estimatedValue') {
      if (typeof field !== 'number' || !Number.isFinite(field)) throw new RequestBodyError('Invalid amount');
    } else if (field !== null && field !== undefined && (typeof field !== 'string' || field.length > 3000)) {
      throw new RequestBodyError('Invalid field');
    }
  }
  // Callers retain their field-specific validation; this boundary rejects hostile types.
  return body;
}
