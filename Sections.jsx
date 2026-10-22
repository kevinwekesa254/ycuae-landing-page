// SMB landing sections — youcloud.ae visual language. All copy comes from i18n.jsx.

function Hero({ t, lang, openForm }) {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-media reveal">
          <img src="assets/hero-cashier.jpg" alt="A cashier in Dubai taking payment on a youcloud POS, with live POS, payments, inventory, HR and insights panels around her" width="1672" height="941" fetchpriority="high" />
        </div>
        <div className="hero-grid">
          <div className="reveal">
            <span className="eyebrow">{t.heroEyebrow}</span>
            <h1 className="display">{t.heroA}<br />{t.heroB}</h1>
            {/* The other-language headline shows only on the Arabic page — no Arabic text on the English page */}
            {lang === 'ar' && <p className="hero-alt is-en" lang="en" dir="ltr">{t.heroAlt}</p>}
          </div>
          <div className="reveal" style={{ '--d': '.12s' }}>
            <p className="hero-sub">{t.heroSub}</p>
            <div className="btn-row">
              <Btn onClick={() => openForm('enquiry')}><Arrowed text={t.heroCta1} /></Btn>
              <Btn kind="outline" href="#how-it-works">{t.heroCta2}</Btn>
            </div>
            <div className="price-line">
              <b>{money(t.price)}</b>
              <span>{t.pricePer}</span>
              <small>· {t.priceNote}</small>
            </div>
          </div>
        </div>
      </div>
      <div className="band">
        <div className="container band-track">
          {t.heroBadges.map(b => <span key={b}>✓ {b}</span>)}
        </div>
      </div>
    </section>
  );
}

// ── Certification strip ──
function CertStrip({ t }) {
  return (
    <section>
      <div className="container cert">
        <span className="cert-label">{t.certLabel}</span>
        <div className="cert-logos ltr">
          {/* Official marks from visa.com, mastercard.com and unionpay.com — in the same order as t.certs */}
          {['visa.png', 'mastercard.svg', 'unionpay.png'].map((f, i) => (
            <span key={f} className={'card-mark card-' + f.split('.')[0]}><img src={'assets/cards/' + f} alt={t.certs[i]} height="28" /></span>
          ))}
        </div>
        <span className="cert-note">{t.certNote}</span>
      </div>
    </section>
  );
}

// ── How it works — "Platform · unified business ops" timeline, as on youcloudpay.com
//    (Sell → Run → Record → Know; SMB only, so no Enterprise "Connect" step)
const Ico = ({ d }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d.map((x, i) => <path key={i} d={x} />)}
  </svg>
);

// Icon set from youcloudpay.com (PF_PATHS), drawn in currentColor
const PF = {
  store: "<path d='M3 9l1.5-5h15L21 9'/><path d='M4 9v11h16V9'/><path d='M3 9h18'/><path d='M9.5 20v-6h5v6'/>",
  layers: "<path d='M12 3l9 5-9 5-9-5z'/><path d='M3 13l9 5 9-5'/>",
  ledger: "<path d='M5 19.5A2.5 2.5 0 0 1 7.5 17H20V3H7.5A2.5 2.5 0 0 0 5 5.5z'/><path d='M5 19.5A2.5 2.5 0 0 0 7.5 22H20v-5'/><path d='M9 7h7M9 11h5'/>",
  bulb: "<path d='M9 18h6M10 21h4'/><path d='M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z'/>",
  monitor: "<rect x='3' y='4' width='18' height='12' rx='2'/><path d='M8 20h8M12 16v4'/>",
  phone: "<rect x='7' y='2' width='10' height='20' rx='2'/><path d='M11 18h2'/>",
  tablet: "<rect x='4' y='3' width='16' height='18' rx='2'/><path d='M11 17.5h2'/>",
  kiosk: "<rect x='6' y='2' width='12' height='14' rx='2'/><path d='M9 20h6M12 16v4M9 6h6M9 9.5h4'/>",
  qr: "<rect x='3' y='3' width='7' height='7' rx='1'/><rect x='14' y='3' width='7' height='7' rx='1'/><rect x='3' y='14' width='7' height='7' rx='1'/><path d='M14 14h3v3M21 14v.01M14 21h.01M17 21h4v-4'/>",
  globe: "<circle cx='12' cy='12' r='9'/><path d='M3 12h18'/><path d='M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18'/>",
  truck: "<path d='M2 6h12v10H2z'/><path d='M14 10h4l3 3v3h-7'/><circle cx='6.5' cy='18' r='2'/><circle cx='17.5' cy='18' r='2'/>",
  chat: "<path d='M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z'/>",
  cart: "<circle cx='9' cy='20' r='1.5'/><circle cx='18' cy='20' r='1.5'/><path d='M2 3h3l2.6 12.2a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 2-1.6L22 7H6'/>",
  card: "<rect x='2' y='5' width='20' height='14' rx='2'/><path d='M2 10h20M6 15h4'/>",
  book: "<path d='M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z'/><path d='M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z'/>",
  users: "<circle cx='9' cy='8' r='4'/><path d='M2 21v-1a6 6 0 0 1 12 0v1'/><path d='M16 3.5a4 4 0 0 1 0 9M22 21v-1a6 6 0 0 0-4-5.6'/>",
  megaphone: "<path d='M3 10v4a1 1 0 0 0 1 1h3l7 5V4L7 9H4a1 1 0 0 0-1 1z'/><path d='M18 8.5a5 5 0 0 1 0 7'/>",
  headset: "<path d='M4 15v-3a8 8 0 0 1 16 0v3'/><rect x='2' y='14' width='5' height='7' rx='2'/><rect x='17' y='14' width='5' height='7' rx='2'/>",
  chart: "<path d='M3 3v18h18'/><path d='M7 15l4-4 3 3 6-7'/>",
  sparkle: "<path d='M12 3l1.9 4.6 4.6 1.9-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z'/><path d='M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z'/>",
  trend: "<path d='M3 17l6-6 4 4 8-8'/><path d='M15 7h6v6'/>",
  receipt: "<path d='M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z'/><path d='M9 8h6M9 12h6'/>",
  box: "<path d='M21 8l-9-5-9 5 9 5z'/><path d='M3 8v8l9 5 9-5V8M12 13v8'/>",
  cash: "<rect x='2' y='6' width='20' height='12' rx='2'/><circle cx='12' cy='12' r='2.5'/><path d='M6 12h.01M18 12h.01'/>",
  wallet: "<path d='M19 7V5a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2'/><path d='M3 6v13a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-3'/>",
  bars: "<path d='M4 20V10M10 20V4M16 20v-7M2 20h20'/>",
};
const PfIco = ({ n, size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: PF[n] }} />
);

// Same order as t.sell / t.run / t.know in i18n.jsx (so Arabic labels map by position)
const PF_SELL = ['monitor', 'phone', 'tablet', 'kiosk', 'qr', 'globe', 'truck', 'chat'];
// Brighter module colours for the navy stage (from youcloudpay.com)
const PF_RUN = [['cart', '#F6A660'], ['card', '#F38BB8'], ['book', '#3FCFC3'], ['users', '#4FD08F'], ['megaphone', '#FF8A8F'], ['headset', '#6FA8FF'], ['chart', '#9A9DFF'], ['sparkle', '#B793FF']];
const PF_KNOW = ['trend', 'receipt', 'box', 'cash', 'wallet', 'bars'];

function PfStep({ n, icon, title, desc, children }) {
  return (
    <div className="pf-step reveal">
      <div className="pf-rail"><span className="pf-node"><PfIco n={icon} size={19} /></span></div>
      <div className="pf-body">
        <div className="pf-head"><div className="pf-num">{n}</div><div className="pf-title">{title}</div><div className="pf-desc">{desc}</div></div>
        {children}
      </div>
    </div>
  );
}

function SystemFlow({ t }) {
  const [lead, rest] = t.hiwSub.split(/\s+—\s+/);
  return (
    <>
      <div className="pf">
        <PfStep n="01" icon="store" title={t.rows.sell} desc={t.stepCaps.sell}>
          <div className="pf-card"><div className="pf-chips">
            {t.sell.map((c, i) => <span className="pf-chip" key={c}><PfIco n={PF_SELL[i]} size={15} />{c}</span>)}
          </div></div>
        </PfStep>
        <PfStep n="02" icon="layers" title={t.rows.run} desc={t.stepCaps.run}>
          <div className="pf-card"><div className="pf-mods">
            {t.run.map((r, i) => (
              <div className="pf-mod" key={r}>
                <span className="pf-ico" style={{ color: PF_RUN[i][1], background: PF_RUN[i][1] + '2E' }}><PfIco n={PF_RUN[i][0]} size={17} /></span>
                <span>{r}</span>
              </div>
            ))}
          </div></div>
        </PfStep>
        <PfStep n="03" icon="ledger" title={t.rows.record} desc={t.stepCaps.record}>
          <div className="pf-ledger">
            <span className="pf-ico"><PfIco n="ledger" size={21} /></span>
            <div className="pf-ledger-copy">
              <div className="pf-ledger-title">{t.ledger}</div>
              <div className="pf-ledger-sub">{t.ledgerTag.split(/\s*·\s*/).map((x, i, a) => <React.Fragment key={x}><span>{x}{i < a.length - 1 ? ' ·' : ''}</span>{' '}</React.Fragment>)}</div>
            </div>
          </div>
        </PfStep>
        <PfStep n="04" icon="bulb" title={t.rows.know} desc={t.stepCaps.know}>
          <div className="pf-card"><div className="pf-know">
            {t.know.map((k, i) => <div className="pf-insight" key={k}><span className="pf-ico"><PfIco n={PF_KNOW[i]} size={15} /></span>{k}</div>)}
          </div></div>
        </PfStep>
      </div>
      <p className="pf-caption">{lead}{rest && <>. <span>{rest.charAt(0).toUpperCase() + rest.slice(1)}</span></>}</p>
    </>
  );
}

const EVENT_ICONS = {
  bill: ['M5 2h14v20l-3-2-2 2-2-2-2 2-2-2-3 2z', 'M9 7h6', 'M9 11h6', 'M9 15h4'],
  pay: ['M9 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', 'M2.5 20a6.5 6.5 0 0 1 13 0', 'M16 4.5a3.5 3.5 0 0 1 0 7', 'M18 14a5.5 5.5 0 0 1 3.5 5.5'],
};

function EventCard({ title, amt, where, rows, posted, icon, d }) {
  return (
    <div className="event reveal" style={{ '--d': d }}>
      <div className="event-top">
        <span className="event-ico"><Ico d={EVENT_ICONS[icon]} /></span>
        <div className="event-meta"><b>{title}</b><small>{where}</small></div>
        <LivePip label="Live" />
      </div>
      <div className="event-amt ltr"><Dh />{amt}</div>
      <ul className="rows">
        {rows.map(([k, v]) => <li key={k}><span>{k}</span><b>{money(v)}</b></li>)}
      </ul>
      <div className="ok">{posted}</div>
    </div>
  );
}

function HowItWorks({ t }) {
  return (
    <section id="how-it-works" className="section pf-section">
      <div className="container">
        <div className="pf-stage">
          <div className="pf-top reveal">
            <span className="pf-pill">{t.hiwEyebrow}</span>
            <div className="pf-headrow">
              <h2 className="h2">{t.hiwA}<br /><em>{t.hiwB}</em></h2>
              <p className="lead">{t.hiwIntro}</p>
            </div>
          </div>
          <SystemFlow t={t} />
        </div>
        <div className="explain">
          <div className="explain-copy reveal">
            <h3 className="h3">{t.explainA} <em>{t.explainB}</em></h3>
            <p>{t.explainBody}</p>
            <p className="take">{t.explainTake}</p>
          </div>
          <div className="events">
            <EventCard title={t.ev1Title} amt={t.ev1Amt} where={t.ev1Where} rows={t.ev1} posted={t.posted} icon="bill" d=".06s" />
            <EventCard title={t.ev2Title} amt={t.ev2Amt} where={t.ev2Where} rows={t.ev2} posted={t.posted} icon="pay" d=".14s" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Merchants ──
function HwCard({ img, d, delay }) {
  return (
    <div className="hw-card reveal" style={{ '--d': delay }}>
      <div className="hw-img"><img src={img} alt={d[0] + ' — ' + d[1]} loading="lazy" width="1536" height="1024" /></div>
      <span className="tag">{d[1]}</span>
      <h4 dir="ltr">{d[0]}</h4>
      <p>{d[2]}</p>
    </div>
  );
}

function MerchantCard({ id, m, photo, alt, imgs, amt, settled }) {
  return (
    <article id={id} className="merchant">
      <div className="m-hero reveal">
        <img src={photo} alt={alt} loading="lazy" width="1536" height="1024" />
        <span className="m-badge">{m.badge}</span>
        <div className="m-live">
          <small>{m.today}</small>
          <b className="ltr"><Dh />{amt}</b>
          <i>✓ {settled}</i>
        </div>
        <div className="m-copy">
          <span className="tag">{m.name}</span>
          <h3>{m.hA} <em>{m.hB}</em></h3>
          <p>{m.body} <b>{m.take}</b></p>
        </div>
      </div>
      <div className="hw-pair">
        <HwCard img={imgs[0]} d={m.d1} delay=".05s" />
        <HwCard img={imgs[1]} d={m.d2} delay=".12s" />
      </div>
      <div className="specs reveal">
        {m.kv.map(([k, v, u]) => <div key={k}><small>{k}</small><b>{v}<span>{u}</span></b></div>)}
      </div>
    </article>
  );
}

function Merchants({ t }) {
  return (
    <section id="merchants" className="section sky">
      <div className="container">
        <SectionHead eyebrow={t.mEyebrow} a={t.mA} b={t.mB} sub={t.mSub} />
        <div className="merchants">
          <MerchantCard id="retail" m={t.retail} photo="assets/retail-store.webp" alt="A busy supermarket storefront in a Dubai mall"
            imgs={['assets/hw-y5000.webp', 'assets/hw-y1000.webp']} amt="8,940" settled={t.settled} />
          <MerchantCard id="fnb" m={t.fnb} photo="assets/fnb-owner.webp" alt="A restaurant owner taking orders on a youcloud tablet"
            imgs={['assets/hw-y4000.webp', 'assets/hw-y7000.webp']} amt="6,215" settled={t.settled} />
        </div>
      </div>
    </section>
  );
}

// ── Sell online (for shops & freelancers) ──
function SellOnline({ t }) {
  const mk = t.onlineMock;
  return (
    <section id="sell-online" className="section">
      <div className="container">
        <SectionHead eyebrow={t.onlineEyebrow} a={t.onlineA} b={t.onlineB} sub={t.onlineSub} />
        <div className="split">
          <div className="split-media reveal">
            <img src="assets/sell-online.jpg" alt="A boutique owner taking an order on her phone" loading="lazy" width="1200" height="675" style={{ objectPosition: '55% 50%' }} />
            <div className="shop-card">
              <div className="shop-head"><span className="tag">{mk.title}</span><LivePip label="Live" /></div>
              <div className="product">
                <span className="ico">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16l-1.5 12H5.5L4 7z" /><path d="M8 7V5a4 4 0 018 0v2" /></svg>
                </span>
                <div style={{ minWidth: 0 }}>
                  <b>{mk.item}</b>
                  <span className="p">{money(mk.price)}</span>
                </div>
                <span className="stock">IN STOCK</span>
              </div>
              <div className="share">{mk.channels.map(c => <span key={c}>{c}</span>)}</div>
              <div className="paid">
                {[mk.paid, mk.ledger].map(x => <div key={x}><span>{money(x)}</span><span>✓</span></div>)}
              </div>
              <div className="pay-chips ltr">{['CARD', 'APPLE PAY', 'QR'].map(p => <span key={p}>{p}</span>)}</div>
            </div>
          </div>
          <div className="reveal" style={{ '--d': '.1s' }}>
            <p className="body-copy">{t.onlineBody}</p>
            <p className="take">{t.onlineTake}</p>
            <div className="steps">
              {t.onlineSteps.map(([h, d], i) => (
                <div className="step" key={h}>
                  <i>{i + 1}</i>
                  <div><b>{h}</b><p>{d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── AI campaigns ──
function Campaigns({ t }) {
  const mk = t.campMock;
  return (
    <section id="campaigns" className="section dark">
      <div className="container">
        <div className="split">
          <div className="reveal">
            <SectionHead eyebrow={t.campEyebrow} a={t.campA} b={t.campB} sub={t.campSub} />
            <p className="body-copy">{t.campBody}</p>
            <p className="take">{t.campTake}</p>
            <div className="pills coral">{t.campTriggers.map(x => <span key={x}>{x}</span>)}</div>
            <div className="pills" dir="ltr" style={{ marginTop: 6 }}>{['WhatsApp', 'Instagram', 'Facebook'].map(c => <span key={c}>{c}</span>)}</div>
          </div>
          <div className="camp-media reveal" style={{ '--d': '.1s' }}>
            <img src="assets/campaigns.jpg" alt="A café owner smiling at a campaign result on his phone" loading="lazy" width="1200" height="765" style={{ objectPosition: '62% 50%' }} />
            <div className="ai-card">
              <div className="ai-msg">
                <div className="who"><i>AI</i><span>{mk.who}</span></div>
                <p>{mk.line}</p>
                <div className="ai-actions">{mk.actions.map(a => <span key={a}>{a}</span>)}</div>
              </div>
              <div className="ai-result">{money(mk.result)}<small>{mk.posted}</small></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBand({ t }) {
  return (
    <section className="section sand">
      <div className="container stats">
        {t.stats.map(([n, s, l], i) => (
          <div key={l} className={'stat reveal' + (i === 0 ? ' hot' : '')} style={{ '--d': (i * 0.06) + 's' }}>
            <b className="ltr">{n}<span>{s}</span></b>
            <p>{l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTA({ t, openForm }) {
  return (
    <section id="cta" className="split-cta">
      <div className="media"><img src="assets/dubai-night.jpg" alt="Dubai skyline lit up at night" loading="lazy" width="933" height="1400" /></div>
      <div className="copy reveal">
        <span className="eyebrow">{t.ctaEyebrow}</span>
        <h2>{t.ctaA} <em>{t.ctaB}</em></h2>
        <p>{t.ctaSub}</p>
        <div className="btn-row">
          <Btn onClick={() => openForm('enquiry')}><Arrowed text={t.cta1} /></Btn>
          <Btn kind="outline" onClick={() => openForm('whatsapp')}>{t.cta2}</Btn>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, CertStrip, HowItWorks, Merchants, SellOnline, Campaigns, StatBand, FinalCTA });
