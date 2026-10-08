import { Button, Select, Textarea, TextInput } from '@mantine/core'
import { useRef, useState } from 'react'
import { Providers } from './Providers'
import classes from './ContactForm.module.css'

interface Props { email: string; topics: string[] }

/** Arka uç yok: form e-posta istemcinizde hazır bir taslak açar, mesajı siz gönderirsiniz. */
export function ContactForm({ email, topics }: Props) {
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [topic, setTopic] = useState<string | null>(null)
  const [msg, setMsg] = useState('')
  const [errs, setErrs] = useState<{ name?: string; msg?: string }>({})
  const nameRef = useRef<HTMLInputElement>(null)
  const msgRef = useRef<HTMLTextAreaElement>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const next = { name: name.trim() ? undefined : 'Lütfen adınızı yazın.', msg: msg.trim() ? undefined : 'Lütfen mesajınızı yazın.' }
    setErrs(next)
    if (next.name || next.msg) {
      ;(next.name ? nameRef : msgRef).current?.focus()
      return
    }
    const subject = `Danışmanlık talebi${topic ? `: ${topic}` : ''}`
    const body = `Merhaba İsmail,\n\n${msg}\n\n— ${name}${from ? `\n${from}` : ''}`
    // Bazı istemciler uzun bağlantıları keser; gövdeyi sınırla
    const safeBody = body.length > 1500 ? `${body.slice(0, 1500)}…` : body
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(safeBody)}`
  }

  return (
    <Providers>
      <form className={classes.form} onSubmit={submit} noValidate>
        <TextInput ref={nameRef} label="Adınız" value={name} onChange={(e) => setName(e.currentTarget.value)} required classNames={{ input: classes.input, label: classes.label, error: classes.error }} error={errs.name} autoComplete="name" />
        <TextInput label="E-posta veya telefon (isteğe bağlı)" value={from} onChange={(e) => setFrom(e.currentTarget.value)} classNames={{ input: classes.input, label: classes.label }} autoComplete="off" />
        <Select
          label="Konu" placeholder="Bir alan seçin" data={topics} value={topic} onChange={setTopic} clearable
          comboboxProps={{ withinPortal: true, transitionProps: { transition: 'pop', duration: 160 } }}
          classNames={{ input: classes.input, label: classes.label, dropdown: classes.dropdown, option: classes.option }}
        />
        <Textarea ref={msgRef} label="Mesajınız" value={msg} onChange={(e) => setMsg(e.currentTarget.value)} required minRows={5} autosize classNames={{ input: classes.input, label: classes.label, error: classes.error }} error={errs.msg} />
        <div>
          <Button type="submit" size="lg" radius="xl" className={classes.send}>E-posta taslağını aç</Button>
          <p className={classes.note}>Form sunucuya veri göndermez; e-posta uygulamanızda hazır bir taslak açar.</p>
        </div>
      </form>
    </Providers>
  )
}
