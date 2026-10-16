import React, { useState } from 'react';
import { Mail, Send, X } from 'lucide-react';
import { CommunityMember } from '../types';
import { api } from '../services/api';

interface ReplyModalProps {
  member: CommunityMember;
  onClose: () => void;
}

export const ReplyModal: React.FC<ReplyModalProps> = ({ member, onClose }) => {
  const [subject, setSubject] = useState('Winter Arc · Treffen 01');
  const [message, setMessage] = useState(`Hello ${member.fullName},\n\n`);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim() || sending) return;

    setSending(true);
    setError(null);
    try {
      await api.replyWinterArc(member.id, subject.trim(), message.trim());
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send reply.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className="w-full max-w-lg rounded-2xl border border-[#17304E] bg-[#070D17] shadow-2xl"
        role="dialog"
        aria-labelledby="winter-arc-reply-title"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#17304E]/70">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-[#38B2D8]" />
            <h2 id="winter-arc-reply-title" className="text-sm font-mono font-semibold text-white">
              Reply to {member.fullName}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#64748B] hover:text-white hover:bg-[#17304E]/60 cursor-pointer"
            aria-label="Close reply"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {sent ? (
          <div className="px-5 py-8 text-center space-y-4">
            <p className="text-sm font-mono text-emerald-400">Reply sent to {member.email}</p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-[#1E5FBF] px-4 py-2 text-sm font-mono text-white hover:bg-[#1E5FBF]/80 cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="px-5 py-4 space-y-3">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-[#64748B] mb-1">
                To
              </label>
              <p className="text-sm font-mono text-[#38B2D8]">{member.email}</p>
            </div>
            <div>
              <label htmlFor="reply-subject" className="block text-[10px] font-mono uppercase tracking-widest text-[#64748B] mb-1">
                Subject
              </label>
              <input
                id="reply-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl bg-[#0B1524] border border-[#17304E] px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-[#38B2D8]/60"
                required
              />
            </div>
            <div>
              <label htmlFor="reply-message" className="block text-[10px] font-mono uppercase tracking-widest text-[#64748B] mb-1">
                Message
              </label>
              <textarea
                id="reply-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                className="w-full rounded-xl bg-[#0B1524] border border-[#17304E] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#38B2D8]/60 resize-y"
                required
              />
            </div>
            {error && <p className="text-xs font-mono text-red-400">{error}</p>}
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-[#17304E] px-4 py-2 text-sm font-mono text-[#94A3B8] hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={sending}
                className="flex items-center gap-2 rounded-xl bg-[#1E5FBF] px-4 py-2 text-sm font-mono text-white hover:bg-[#1E5FBF]/80 disabled:opacity-50 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                {sending ? 'Sending...' : 'Send Reply'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
