import { ArrowUpRight } from 'lucide-react';
import { writing, profile } from '../content';
import { Glass } from './glass/Glass';
import { MediumIcon } from './glass/Dock';
import { Section, SectionHead, Reveal, ArrowLink } from './ui/section';

export const WritingSection = () => (
  <Section id="writing">
    <SectionHead eyebrow="Writing" title="Notes from the build." intro={writing.intro} />

    <div className="mx-auto max-w-4xl space-y-5">
      {writing.posts.map((post) => (
        <Reveal key={post.href}>
          <Glass
            as="a"
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            radius={30}
            tilt={2}
            className="group block p-7 md:p-10"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground">
                <MediumIcon size={16} />
                Medium · {post.date}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--glass-fill-strong)] shadow-[var(--glass-inner)] transition-all duration-300 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
                <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-rotate-45" />
              </span>
            </div>
            <h3 className="mt-5 text-[24px] font-semibold leading-[1.2] tracking-[-0.03em] md:text-[32px]">
              {post.title}
            </h3>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <span key={t} className="chip text-[12px]">{t}</span>
              ))}
            </div>
          </Glass>
        </Reveal>
      ))}

      <Reveal className="pt-4 text-center">
        <ArrowLink href={profile.links.medium}>All posts on Medium</ArrowLink>
      </Reveal>
    </div>
  </Section>
);
