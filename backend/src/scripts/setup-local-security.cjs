const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const { execFileSync } = require('node:child_process');

async function main() {
  const root = path.resolve(__dirname, '../../..');
  const backendFile = path.join(root, 'backend/.env');
  const frontendFile = path.join(root, 'frontend/.env.local');
  const dashboardFile = path.join(root, 'dashboard/.env');
  const loginFile = path.join(root, 'backend/.env.admin-credentials.local');
  for (const file of [backendFile, frontendFile, dashboardFile, loginFile]) {
    execFileSync('git', ['check-ignore', '--quiet', file], { cwd: root });
  }
  const parse = file => fs.existsSync(file) ? dotenv.parse(fs.readFileSync(file)) : {};
  const backend = parse(backendFile), frontend = parse(frontendFile);
  const strong = value => typeof value === 'string' && value.length >= 32 && !/your-|placeholder|example|NOVARCH_SECURE_JWT_SECRET/i.test(value);
  const secret = () => crypto.randomBytes(48).toString('base64url');
  const jwt = strong(backend.JWT_SECRET) ? backend.JWT_SECRET : secret();
  const internal = strong(backend.INTERNAL_API_SECRET) ? backend.INTERNAL_API_SECRET : strong(frontend.INTERNAL_API_SECRET) ? frontend.INTERNAL_API_SECRET : secret();
  const form = strong(frontend.FORM_SIGNING_SECRET) ? frontend.FORM_SIGNING_SECRET : secret();
  const username = (backend.ADMIN_USERNAME || 'admin@novarch.eu').trim().toLowerCase();
  let passwordHash = backend.ADMIN_PASSWORD;
  let password;
  if (!/^\$2[aby]\$(1[2-6])\$[./A-Za-z0-9]{53}$/.test(passwordHash || '')) {
    const old = backend.ADMIN_PASSWORD || '';
    password = old.length >= 12 && Buffer.byteLength(old) <= 72 && !/your-|placeholder|example|Novarch@Admin2026/i.test(old) && !old.startsWith('$2') ? old : crypto.randomBytes(24).toString('base64url');
    passwordHash = await bcrypt.hash(password, 12);
    if (!await bcrypt.compare(password, passwordHash)) throw new Error('Password verification failed');
  }
  function update(file, entries) {
    let content = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
    for (const [key, value] of Object.entries(entries)) {
      const line = `${key}='${value}'`;
      const pattern = new RegExp(`^\\s*(?:export\\s+)?${key}\\s*=.*$`, 'gm');
      content = pattern.test(content) ? content.replace(pattern, () => line) : content.trimEnd() + '\n' + line + '\n';
    }
    fs.writeFileSync(file, content, { mode: 0o600 });
  }
  const port = /^\d+$/.test(backend.PORT || '') ? backend.PORT : '5000';
  const origins = [...new Set([...(backend.CORS_ORIGINS || '').split(',').map(x => x.trim()).filter(Boolean), 'http://localhost:3000', 'http://localhost:5173'])].join(',');
  update(backendFile, { JWT_SECRET: jwt, ADMIN_USERNAME: username, ADMIN_PASSWORD: passwordHash, INTERNAL_API_SECRET: internal, FRONTEND_URL: 'http://localhost:3000', CORS_ORIGINS: origins });
  update(frontendFile, { FORM_SIGNING_SECRET: form, INTERNAL_API_SECRET: internal, BACKEND_API_URL: `http://localhost:${port}/api`, NEXT_PUBLIC_API_URL: `http://localhost:${port}` });
  update(dashboardFile, { VITE_API_URL: `http://localhost:${port}/api`, VITE_FRONTEND_URL: 'http://localhost:3000' });
  if (password) {
    fs.writeFileSync(loginFile, `# LOCAL administrator login only. Do not commit or share.\nADMIN_USERNAME=${username}\nLOGIN_PASSWORD=${password}\n`, { mode: 0o600 });
  }
  const savedBackend = parse(backendFile), savedFrontend = parse(frontendFile);
  if (savedBackend.INTERNAL_API_SECRET !== savedFrontend.INTERNAL_API_SECRET || !strong(savedBackend.JWT_SECRET) || !strong(savedFrontend.FORM_SIGNING_SECRET)) throw new Error('Configuration verification failed');
  console.log(JSON.stringify({ configured: true, sharedSecretMatches: true, jwtSecretValid: true, formSecretValid: true, passwordHashValid: true, loginDetailsFile: password ? 'backend/.env.admin-credentials.local' : 'Existing credentials retained', localApiPort: port }));
}
main().catch(() => { console.error('Local configuration failed; secret values suppressed'); process.exitCode = 1; });
