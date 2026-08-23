import { PageHeader } from '@/components/layout/PageHeader'
import { PublicShell } from '@/components/layout/PublicShell'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch — whether it is a project idea, a question, or just saying hi.',
}

export default function ContactPage() {
  return (
    <PublicShell>
      <div className="container mx-auto px-4 md:px-8 py-16">
        <PageHeader
          title="Get in Touch"
          description="Let's work together"
          command="$ mail --compose"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
          <div className="notch bg-card border border-border p-6 sm:p-8 transition-colors duration-300 hover:border-primary/40">
            <ContactForm />
          </div>
          <ContactInfo />
        </div>
      </div>
    </PublicShell>
  )
}
