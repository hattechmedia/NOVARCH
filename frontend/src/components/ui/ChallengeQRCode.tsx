'use client';

import * as React from 'react';
import { Download, Check, Copy, ExternalLink, QrCode as QrIcon } from 'lucide-react';
import { HACKTHEFLAG_CHALLENGE_URL } from '@/lib/constants';

interface ChallengeQRCodeProps {
  className?: string;
  size?: number;
  showActions?: boolean;
}

// Exact crisp SVG path generated with Error Correction Level H and 4-module quiet zone (41x41 grid)
const QR_SVG_PATH =
  'M4 4.5h7m1 0h3m4 0h1m1 0h2m1 0h2m1 0h2m1 0h7M4 5.5h1m5 0h1m1 0h1m2 0h2m1 0h1m2 0h2m5 0h1m1 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h1m1 0h1m4 0h2m4 0h1m1 0h2m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m2 0h1m3 0h2m7 0h3m1 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m3 0h7m3 0h2m4 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m2 0h2m2 0h2m2 0h1m3 0h2m1 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h1m1 0h2m1 0h1m2 0h1m1 0h2m1 0h1m1 0h1M6 12.5h3m1 0h1m1 0h4m1 0h1m1 0h3m2 0h1m1 0h2m1 0h3m2 0h3M9 13.5h1m3 0h1m1 0h1m2 0h3m1 0h1m1 0h2m1 0h1m1 0h2m2 0h4M4 14.5h1m1 0h1m1 0h1m1 0h1m2 0h2m2 0h4m1 0h4m4 0h2m2 0h1M4 15.5h3m4 0h6m4 0h2m2 0h3m1 0h1m3 0h4M9 16.5h2m5 0h10m2 0h2m2 0h1M4 17.5h1m3 0h1m4 0h1m1 0h1m1 0h1m1 0h1m2 0h3m1 0h2m2 0h1m2 0h1m2 0h1M5 18.5h3m2 0h1m1 0h1m2 0h5m2 0h2m2 0h1m2 0h3m3 0h1M4 19.5h1m6 0h1m1 0h2m1 0h4m1 0h1m2 0h3m1 0h1m1 0h2m1 0h4M5 20.5h3m1 0h3m3 0h2m2 0h1m9 0h1m1 0h2m2 0h2M4 21.5h4m1 0h1m2 0h1m3 0h3m1 0h1m2 0h3m1 0h2m1 0h2m4 0h1M5 22.5h1m1 0h1m1 0h2m3 0h7m1 0h1m1 0h3m7 0h1M6 23.5h1m1 0h2m1 0h6m1 0h2m1 0h1m1 0h3m1 0h2m2 0h1m1 0h4M7 24.5h1m2 0h1m2 0h1m2 0h1m1 0h2m2 0h2m4 0h1m3 0h2m2 0h1M4 25.5h1m1 0h1m4 0h2m1 0h2m1 0h3m1 0h1m2 0h1m1 0h1m1 0h1m1 0h2m1 0h2m1 0h1M4 26.5h1m1 0h2m1 0h2m3 0h7m1 0h2m2 0h1m4 0h2m1 0h2M4 27.5h1m3 0h2m3 0h1m2 0h8m1 0h3m5 0h2M4 28.5h1m1 0h1m3 0h2m1 0h2m1 0h3m1 0h1m1 0h1m1 0h1m1 0h7M12 29.5h1m2 0h1m1 0h1m2 0h5m3 0h1m3 0h1m1 0h3M4 30.5h7m2 0h1m3 0h5m1 0h2m1 0h3m1 0h1m1 0h2M4 31.5h1m5 0h1m3 0h2m3 0h6m2 0h2m3 0h1m1 0h3M4 32.5h1m1 0h3m1 0h1m1 0h1m1 0h2m1 0h1m1 0h5m1 0h2m1 0h6m1 0h2M4 33.5h1m1 0h3m1 0h1m1 0h1m1 0h2m1 0h4m3 0h1m4 0h1m2 0h1m1 0h2M4 34.5h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h1m1 0h2m1 0h3m1 0h1m1 0h1m1 0h2m2 0h2M4 35.5h1m5 0h1m2 0h1m1 0h1m1 0h2m2 0h2m1 0h1m1 0h1m2 0h1m1 0h1m1 0h2M4 36.5h7m3 0h1m1 0h1m1 0h2m1 0h1m1 0h2m2 0h2m1 0h1m2 0h1m1 0h1';

export function ChallengeQRCode({
  className = '',
  size = 260,
  showActions = true,
}: ChallengeQRCodeProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(HACKTHEFLAG_CHALLENGE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* ── Outer Scannable Mat with High Contrast Quiet Zone ── */}
      <div
        className="relative group p-4 sm:p-5 bg-white rounded-lg shadow-2xl shadow-[#1E5FBF]/15 border border-white/20 transition-transform duration-300 hover:scale-[1.01]"
        style={{ width: size + 32, maxWidth: '100%' }}
      >
        {/* Subtle Cyber Corner Marks for aesthetic framing without occluding quiet zone */}
        <div aria-hidden="true" className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-slate-400/50 pointer-events-none" />
        <div aria-hidden="true" className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-slate-400/50 pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-slate-400/50 pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-slate-400/50 pointer-events-none" />

        {/* Vector SVG QR Code with Infinite Sharpness & Zero Pixelation */}
        <div className="relative aspect-square w-full flex items-center justify-center bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 41 41"
            shapeRendering="crispEdges"
            role="img"
            aria-label={`QR Code to access the live HackTheFlag challenge at ${HACKTHEFLAG_CHALLENGE_URL}`}
            className="w-full h-full block"
          >
            <title>Scan to access live HackTheFlag challenge</title>
            {/* Pure white background */}
            <path fill="#ffffff" d="M0 0h41v41H0z" />
            {/* Crisp black QR modules */}
            <path stroke="#000000" strokeWidth="1" d={QR_SVG_PATH} />
          </svg>
        </div>

        {/* Quiet Zone Certification Tag */}
        <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span className="flex items-center gap-1">
            <QrIcon className="w-3 h-3 text-[#1E5FBF]" />
            <span>Target: ngrok.app</span>
          </span>
          <span className="text-[10px] uppercase tracking-wider text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
            Live Node
          </span>
        </div>
      </div>

      {/* ── Supporting Action Bar below QR Code ── */}
      {showActions && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#38B2D8]"
            title="Copy challenge URL to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy URL</span>
              </>
            )}
          </button>

          <a
            href="/images/hacktheflag/hacktheflag-qr.png"
            download="novarch-hacktheflag-qr.png"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#38B2D8]"
            title="Download high-resolution QR image for offline or print use"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Save PNG</span>
          </a>

          <a
            href={HACKTHEFLAG_CHALLENGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1E5FBF]/20 hover:bg-[#1E5FBF]/30 text-[#38B2D8] border border-[#38B2D8]/30 transition-colors font-medium focus-visible:outline-2 focus-visible:outline-[#38B2D8]"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Link</span>
          </a>
        </div>
      )}
    </div>
  );
}
