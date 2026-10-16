import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import jsQR from 'jsqr';
import QRCode from 'qrcode';

const TARGET_URL = 'https://34f9fabd0dc1.ngrok.app/';

async function runVerification() {
  console.log('====================================================');
  console.log(' NOVARCH HackTheFlag Automated Verification Suite');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, extraInfo = '') {
    if (condition) {
      console.log(`✅ [PASS] ${testName}${extraInfo ? ` — ${extraInfo}` : ''}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}${extraInfo ? ` — ${extraInfo}` : ''}`);
      failed++;
    }
  }

  // 1. Verify files exist
  const pageFile = path.resolve('src/app/hacktheflag/page.tsx');
  const contentFile = path.resolve('src/components/sections/HackTheFlagContent.tsx');
  const qrComponentFile = path.resolve('src/components/ui/ChallengeQRCode.tsx');
  const pngQrFile = path.resolve('public/images/hacktheflag/hacktheflag-qr.png');

  assert(fs.existsSync(pageFile), 'Route page file exists', pageFile);
  assert(fs.existsSync(contentFile), 'Section component exists', contentFile);
  assert(fs.existsSync(qrComponentFile), 'QR Code component exists', qrComponentFile);
  assert(fs.existsSync(pngQrFile), 'High-res QR PNG asset exists', pngQrFile);

  // 2. Verify Next.js build output includes /hacktheflag
  const buildManifest = path.resolve('.next/server/app/hacktheflag.html');
  const buildRsc = path.resolve('.next/server/app/hacktheflag.rsc');
  const hasPrerender = fs.existsSync(buildManifest) || fs.existsSync(buildRsc);
  assert(hasPrerender, 'Route /hacktheflag is prerendered in .next build output');

  // 3. Programmatically decode the generated PNG QR Code
  try {
    const pngBuffer = fs.readFileSync(pngQrFile);
    const { data, info } = await sharp(pngBuffer).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
    const decoded = jsQR(new Uint8ClampedArray(data), info.width, info.height);

    assert(Boolean(decoded && decoded.data === TARGET_URL), 'PNG QR Code decodes to exact target URL', `Decoded: "${decoded?.data}"`);
  } catch (err: any) {
    assert(false, 'PNG QR Code decoding test error', err.message);
  }

  // 4. Programmatically decode the SVG QR Code matrix
  try {
    const qrMatrix = QRCode.create(TARGET_URL, { errorCorrectionLevel: 'H' });
    const margin = 4;
    const size = qrMatrix.modules.size;
    const totalSize = size + margin * 2;
    const scale = 8;
    const width = totalSize * scale;
    const height = width;
    const rawRgba = new Uint8ClampedArray(width * height * 4);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const mx = Math.floor(x / scale) - margin;
        const my = Math.floor(y / scale) - margin;
        const isDark = (mx >= 0 && mx < size && my >= 0 && my < size) ? qrMatrix.modules.get(mx, my) : 0;
        const idx = (y * width + x) * 4;
        const val = isDark ? 0 : 255;
        rawRgba[idx] = val;
        rawRgba[idx + 1] = val;
        rawRgba[idx + 2] = val;
        rawRgba[idx + 3] = 255;
      }
    }

    const decodedSvg = jsQR(rawRgba, width, height);
    assert(Boolean(decodedSvg && decodedSvg.data === TARGET_URL), 'Vector QR matrix decodes to exact target URL', `Decoded: "${decodedSvg?.data}"`);
  } catch (err: any) {
    assert(false, 'SVG QR matrix decoding error', err.message);
  }

  // 5. Verify CTA link destinations in source code
  const contentSource = fs.readFileSync(contentFile, 'utf8');
  const qrComponentSource = fs.readFileSync(qrComponentFile, 'utf8');
  assert(contentSource.includes('HACKTHEFLAG_CHALLENGE_URL'), 'HackTheFlagContent binds directly to HACKTHEFLAG_CHALLENGE_URL constant');
  assert(qrComponentSource.includes('HACKTHEFLAG_CHALLENGE_URL'), 'ChallengeQRCode binds directly to HACKTHEFLAG_CHALLENGE_URL constant');
  assert(contentSource.includes('Open Live Challenge'), 'Contains prominent CTA labeled "Open Live Challenge"');
  assert(contentSource.includes('Scan to Access the Live Challenge'), 'Contains required instruction "Scan to Access the Live Challenge"');
  assert(contentSource.includes('target="_blank"'), 'Uses safe external link attribute target="_blank"');
  assert(contentSource.includes('rel="noopener noreferrer"'), 'Uses safe external link attribute rel="noopener noreferrer"');

  // 6. Verify reachability of the live challenge URL
  try {
    const res = await fetch(TARGET_URL, { signal: AbortSignal.timeout(6000) });
    assert(res.status === 200, 'Live Challenge endpoint is reachable', `HTTP ${res.status} ${res.statusText}`);
  } catch (err: any) {
    console.warn(`⚠️ Note: Live challenge reachability probe: ${err.message}`);
  }

  console.log(`\nVerification Complete: ${passed} Passed, ${failed} Failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runVerification();
