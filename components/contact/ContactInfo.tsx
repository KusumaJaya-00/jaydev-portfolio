import { SocialLinks } from '@/components/contact/SocialLinks'

/**
 * Info card shown next to the contact form.
 * Used on the home contact section and the /contact page so they stay identical.
 */
export function ContactInfo() {
  return (
    <div className="notch bg-card border border-border p-6 sm:p-8 flex flex-col gap-6 transition-colors duration-300 hover:border-primary/40 h-full">
      <div className="inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 notch-sm border border-border bg-muted/40 text-muted-foreground text-xs font-medium tracking-wide w-fit">
        <span className="relative flex h-1.5 w-1.5 ml-0.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 pulse-ring" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400" />
        </span>
        <span className="uppercase">Open to work</span>
      </div>

      <div>
        <p className="font-mono text-xs text-muted-foreground mb-1.5">$ email</p>
        <a
          href="mailto:hello@example.com"
          className="text-lg font-semibold text-foreground hover:text-secondary transition-colors"
        >
          hello@example.com
        </a>
      </div>

      <div>
        <p className="font-mono text-xs text-muted-foreground mb-3">$ socials</p>
        <SocialLinks />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
          <p className="font-mono text-xs text-muted-foreground mb-1">$ timezone</p>
          <p className="text-sm text-foreground">UTC+8 · Indonesia</p>
        </div>
        <div>
          <p className="font-mono text-xs text-muted-foreground mb-1">$ response_time</p>
          <p className="text-sm text-foreground">Within 24 hours</p>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-border text-sm text-muted-foreground">
        Open for freelance &amp; full-time opportunities.
      </div>
    </div>
  )
}
