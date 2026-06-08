'use client';

import { Check, Copy, Link2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type PublicLinkCopyButtonProps = {
  profileUrl: string;
};

export function PublicLinkCopyButton({
  profileUrl,
}: PublicLinkCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
      aria-label="Copy public profile link"
      title={copied ? 'Copied' : 'Copy public profile link'}
    >
      {copied ? <Check className="h-4 w-4 text-emerald-700" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied link' : 'Copy public link'}
      <Link2 className="h-4 w-4 text-slate-400" />
    </button>
  );
}
