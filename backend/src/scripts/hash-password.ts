import bcrypt from 'bcryptjs';
import { createInterface } from 'readline';

// Receive the password on stdin rather than exposing it in command-line arguments.
const input = createInterface({ input: process.stdin, terminal: false });
input.once('line', async value => {
  if (Buffer.byteLength(value, 'utf8') < 12 || Buffer.byteLength(value, 'utf8') > 72) {
    console.error('Password must be 12-72 UTF-8 bytes'); process.exitCode = 1;
  } else { console.log(await bcrypt.hash(value, 12)); }
  input.close();
});
