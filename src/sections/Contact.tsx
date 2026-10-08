import { Button, Select, Textarea, TextInput } from '@mantine/core'
import { IconBrandGithub, IconMail } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { Magnet } from '../components/fx/Magnet'
import { Reveal } from '../components/fx/Reveal'
import { SERVICES, SITE } from '../data/site'
import classes from './Contact.module.css'

export function Contact() {
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
    // Arka uç yok: e-posta istemcinizi açar, mesajı siz gönderirsiniz.
    // Bazı istemciler uzun bağlantıları keser; gövdeyi sınırla
    const safeBody = body.length > 1500 ? `${body.slice(0, 1500)}…` : body
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(safeBody)}`
  }

  return (
    <section id="iletisim" className={`section ${classes.root}`} aria-labelledby="iletisim-baslik">
      <div className={`wrap ${classes.grid}`}>
        <Reveal>
          <p className="eyebrow">İletişim</p>
          <h2 id="iletisim-baslik" className={classes.title}>Bir sonraki adımı birlikte yazalım.</h2>
          <p className={classes.lead}>Hedefinizi birkaç cümleyle anlatın. Kapsam, süre ve çıktıyı yazılı olarak geri paylaşırım.</p>
          <ul className={classes.links}>
            <li><a href={`mailto:${SITE.email}`}><IconMail size={22} aria-hidden="true" /> {SITE.email}</a></li>
            <li><a href={SITE.github} target="_blank" rel="noreferrer noopener"><IconBrandGithub size={22} aria-hidden="true" /> github.com/karacaismail</a></li>
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <form className={classes.form} onSubmit={submit} noValidate>
            <TextInput ref={nameRef} label="Adınız" value={name} onChange={(e) => setName(e.currentTarget.value)} required classNames={{ input: classes.input, label: classes.label, error: classes.error }} error={errs.name} autoComplete="name" />
            <TextInput label="E-posta veya telefon (isteğe bağlı)" value={from} onChange={(e) => setFrom(e.currentTarget.value)} classNames={{ input: classes.input, label: classes.label }} autoComplete="off" />
            <Select
              label="Konu"
              placeholder="Bir alan seçin"
              data={SERVICES.map((s) => s.title)}
              value={topic}
              onChange={setTopic}
              clearable
              comboboxProps={{ withinPortal: true, transitionProps: { transition: 'pop', duration: 160 } }}
              classNames={{ input: classes.input, label: classes.label, dropdown: classes.dropdown, option: classes.option }}
            />
            <Textarea ref={msgRef} label="Mesajınız" value={msg} onChange={(e) => setMsg(e.currentTarget.value)} required minRows={5} autosize classNames={{ input: classes.input, label: classes.label, error: classes.error }} error={errs.msg} />
            <div>
              <Magnet>
                <Button type="submit" size="lg" radius="xl" className={classes.send}>E-posta taslağını aç</Button>
              </Magnet>
              <p className={classes.note}>Form sunucuya veri göndermez; e-posta uygulamanızda hazır bir taslak açar.</p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
