const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Stdin keeps the password out of process arguments and shell history.
if (process.stdin.isTTY) process.stdin.setRawMode(true);
const input = readline.createInterface({ input: process.stdin, terminal: false });
input.once('line', async password => {
  input.close();
  if (process.stdin.isTTY) process.stdin.setRawMode(false);
  try {
    if (Buffer.byteLength(password) < 12 || Buffer.byteLength(password) > 72) throw new Error('Invalid length');
    const root = path.resolve(__dirname, '../../..');
    const envFile = path.join(root, 'backend/.env');
    const loginFile = path.join(root, 'backend/.env.admin-credentials.local');
    const contents = fs.readFileSync(envFile, 'utf8');
    const config = dotenv.parse(contents);
    const hash = await bcrypt.hash(password, 12);
    if (!await bcrypt.compare(password, hash)) throw new Error('Hash verification failed');
    const pattern = /^\s*(?:export\s+)?ADMIN_PASSWORD\s*=.*$/gm;
    const line = `ADMIN_PASSWORD='${hash}'`;
    fs.writeFileSync(envFile, pattern.test(contents) ? contents.replace(pattern, () => line) : contents.trimEnd() + '\n' + line + '\n', { mode: 0o600 });
    fs.writeFileSync(loginFile, `# LOCAL administrator login only. Do not commit or share.\nADMIN_USERNAME=${config.ADMIN_USERNAME || 'admin@novarch.eu'}\nLOGIN_PASSWORD=${password}\n`, { mode: 0o600 });
    console.log('Administrator password updated and bcrypt verified; secret values suppressed.');
  } catch { console.error('Password update failed; secret values suppressed.'); process.exitCode = 1; }
});
