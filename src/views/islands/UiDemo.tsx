import { Avatar, Badge, Button, Progress, RingProgress, SegmentedControl, Slider, Switch, TextInput } from '@mantine/core'
import { Providers } from './Providers'
import classes from './UiDemo.module.css'

/**
 * "Düzen" sahnesinin parçaları: gerçek Mantine bileşenleri, sunucuda statik çizilir.
 * Süs olduğu için üst kapsayıcı aria-hidden + inert (odaklanamaz, okunmaz).
 */
export function UiDemo() {
  return (
    <Providers>
      <div className={classes.board} aria-hidden="true" inert>
        <div className={classes.tile} data-tile>
          <span className={classes.label}>Dönüşüm</span>
          <strong className={classes.kpi}>%4,8</strong>
          <svg viewBox="0 0 120 32" className={classes.spark} aria-hidden="true"><path d="M2 26 L20 20 L38 23 L56 12 L74 15 L92 6 L118 9" fill="none" stroke="var(--c-ember)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div className={classes.tile} data-tile>
          <span className={classes.label}>Eylemler</span>
          <div className={classes.row}>
            <Button size="sm" radius="xl" color="ember" tabIndex={-1}>Başlat</Button>
            <Button size="sm" radius="xl" variant="subtle" color="gray" tabIndex={-1}>Vazgeç</Button>
          </div>
        </div>
        <div className={classes.tile} data-tile>
          <span className={classes.label}>Bildirimler</span>
          <Switch defaultChecked color="ember" size="md" label="Açık" tabIndex={-1} />
        </div>
        <div className={classes.tile} data-tile>
          <span className={classes.label}>Sprint</span>
          <Progress value={72} color="ember" size="md" radius="xl" />
          <span className={classes.meta}>%72 tamamlandı</span>
        </div>
        <div className={classes.tile} data-tile>
          <span className={classes.label}>Aralık</span>
          <SegmentedControl data={['Gün', 'Hafta', 'Ay']} defaultValue="Hafta" size="sm" radius="xl" tabIndex={-1} />
        </div>
        <div className={classes.tile} data-tile>
          <span className={classes.label}>Ekip</span>
          <Avatar.Group>
            <Avatar color="ember" radius="xl" classNames={{ placeholder: classes.avatarText }}>İK</Avatar>
            <Avatar color="teal" radius="xl" classNames={{ placeholder: classes.avatarText }}>AY</Avatar>
            <Avatar color="grape" radius="xl" classNames={{ placeholder: classes.avatarText }}>MD</Avatar>
            <Avatar radius="xl" classNames={{ placeholder: classes.avatarText }}>+3</Avatar>
          </Avatar.Group>
        </div>
        <div className={classes.tile} data-tile>
          <span className={classes.label}>Doluluk</span>
          <RingProgress size={84} thickness={9} roundCaps sections={[{ value: 78, color: 'ember' }]} label={<span className={classes.ring}>78</span>} />
        </div>
        <div className={classes.tile} data-tile>
          <span className={classes.label}>Durum</span>
          <div className={classes.row}>
            <Badge color="teal" variant="light" classNames={{ root: classes.badge, label: classes.badgeLabel }}>Hazır</Badge>
            <Badge color="ember" variant="light" classNames={{ root: classes.badge, label: classes.badgeLabel }}>İnceleme</Badge>
            <Badge color="gray" variant="light" classNames={{ root: classes.badge, label: classes.badgeLabel }}>Yeni</Badge>
          </div>
        </div>
        <div className={classes.tile} data-tile>
          <span className={classes.label}>Ses</span>
          <Slider defaultValue={60} color="ember" size="md" label={null} thumbSize={18} />
        </div>
        <div className={classes.tile} data-tile>
          <span className={classes.label}>Hafta</span>
          <svg viewBox="0 0 120 44" className={classes.bars} aria-hidden="true">
            {[16, 28, 22, 36, 30, 42, 26].map((h, i) => (
              <rect key={i} x={4 + i * 17} y={44 - h} width="11" height={h} rx="3" fill={i === 5 ? 'var(--c-ember)' : 'var(--c-line)'} />
            ))}
          </svg>
        </div>
        <div className={classes.tile} data-tile>
          <span className={classes.label}>Arama</span>
          <TextInput size="sm" radius="md" placeholder="Bileşen ara" tabIndex={-1} />
        </div>
        <div className={classes.tile} data-tile>
          <span className={classes.label}>Hız</span>
          <strong className={classes.kpi}>1,2 sn</strong>
          <span className={classes.meta}>ilk içerik</span>
        </div>
      </div>
    </Providers>
  )
}
