import { useState } from 'react';
import { Loader2, Copy, Send } from 'lucide-react';
import { contact, profile } from '../content';
import { Glass } from './glass/Glass';
import { Dock } from './glass/Dock';
import { notify } from './glass/Island';
import { Section, Reveal, WordReveal } from './ui/section';

const field =
  'mt-1.5 w-full rounded-2xl border-0 bg-[var(--glass-fill)] px-4 py-3 text-[15px] text-foreground shadow-[var(--glass-inner),inset_0_0_0_1px_hsl(var(--foreground)/0.06)] outline-none transition-shadow placeholder:text-faint focus:shadow-[var(--glass-inner),inset_0_0_0_2px_hsl(var(--accent)/0.6)]';

export const ContactSection = () => {
  const [state, setState] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      notify('Email copied');
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('https://formspree.io/f/xpwjypyl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('send failed');
      setState('idle');
      setForm({ name: '', email: '', message: '' });
      notify('Message sent. Thank you!');
    } catch {
      setState('error');
      setTimeout(() => setState('idle'), 4000);
    }
  };

  return (
    <Section id="contact" className="pb-32 md:pb-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <Reveal as="p" y={10} className="eyebrow">Contact</Reveal>
          <WordReveal
            text={contact.heading + '.'}
            className="mt-3 text-[44px] font-semibold leading-[1] tracking-[-0.045em] md:text-[80px]"
          />
          <Reveal as="p" delay={0.1} className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground md:text-[19px]">
            {contact.body}
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="text-[22px] font-semibold tracking-[-0.03em] text-foreground underline decoration-accent/40 decoration-2 underline-offset-[6px] transition-colors hover:decoration-accent md:text-[28px]"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copy}
              aria-label="Copy email address"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--glass-fill-strong)] text-foreground/70 shadow-[var(--glass-inner),0_1px_3px_rgba(0,0,0,0.08)] transition-transform hover:scale-110 hover:text-foreground active:scale-95"
            >
              <Copy size={16} />
            </button>
          </Reveal>

          <Reveal delay={0.28} className="mt-8 flex justify-center">
            <Dock />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-3xl">
          <Glass radius={32} className="p-6 md:p-9">
            <form onSubmit={submit} className="space-y-4" data-testid="contact-form">
              <p className="text-[17px] font-semibold tracking-[-0.02em]">Or leave a note</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="meta font-medium">Name</span>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} autoComplete="name" />
                </label>
                <label className="block">
                  <span className="meta font-medium">Email</span>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} autoComplete="email" />
                </label>
              </div>
              <label className="block">
                <span className="meta font-medium">Message</span>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${field} resize-none`} />
              </label>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95 disabled:opacity-60"
                  data-testid="contact-submit-btn"
                >
                  {state === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
                  {state === 'loading' ? 'Sending' : 'Send message'}
                </button>
                {state === 'error' && (
                  <span className="meta text-destructive">That didn&rsquo;t go through. Email works too.</span>
                )}
              </div>
            </form>
          </Glass>
        </Reveal>
      </div>
    </Section>
  );
};
