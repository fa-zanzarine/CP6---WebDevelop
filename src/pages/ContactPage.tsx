import { ContactForm } from '@/components/contact/ContactForm'

export default function ContactPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold">Contato</h1>
        <p className="mt-1 text-muted">
          Tem um projeto, vaga ou ideia? Mande uma mensagem e eu respondo por e-mail.
        </p>
      </header>
      <ContactForm />
    </section>
  )
}
