const SAFE_ID = /^[a-zA-Z0-9_-]{8,64}$/;

export function isValidResourceId(id: unknown): id is string {
  return typeof id === 'string' && SAFE_ID.test(id);
}
