// Shared bits: logo, eyebrow, buttons, live pip, section head, nav, footer.
// Visual language follows youcloud.ae — classes live in site.css.

// The logo is the youcloud.ae wordmark artwork (assets/logo.png, assets/logo-white.png).
// It is Latin artwork, so it never mirrors in Arabic.
function YcLogo({ dark = false, height = 32 }) {
  return <img src={dark ? 'assets/logo-white.png' : 'assets/logo.png'} alt="youcloud" width={Math.round(height * 2003 / 311)} height={height} dir="ltr" />;
}

// UAE Dirham symbol (CBUAE artwork in assets/dirham.svg), coloured by the surrounding text.
function Dh() {
  return <span className="dh" role="img" aria-label="AED" />;
}

// Shows amounts with the Dirham symbol: "AED 19" (English) and "19 درهم / درهماً" (Arabic) both become ⃀19.
// Each amount is isolated left-to-right so the symbol stays in front of the number in Arabic too.
// "every dirham" / "كل درهم" (no number) is left as words.
function money(text) {
  if (typeof text !== 'string') return text;
  const re = /AED\s*([+−-]?\d[\d,.]*)|([+−-]?\d[\d,.]*)\s?درهم(?:اً)?/g;
  const out = []; let last = 0, m, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const num = m[1] || m[2];
    const sign = /^[+−-]/.test(num) ? num[0] : '';
    out.push(<bdi key={i++} dir="ltr" className="amt">{sign}<Dh />{sign ? num.slice(1) : num}</bdi>);
    last = re.lastIndex;
  }
  if (!out.length) return text;
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>;
}

function Btn({ children, kind = 'primary', small, onClick, href, className = '' }) {
  const k = { primary: 'btn-primary', ghost: 'btn-outline', ghostDark: 'btn-white', outline: 'btn-outline', white: 'btn-white' }[kind] || 'btn-primary';
  const cls = ['btn', k, small ? 'btn-sm' : '', className].filter(Boolean).join(' ');
  if (href) return <a href={href} onClick={onClick} className={cls}>{children}</a>;
  return <button type="button" onClick={onClick} className={cls}>{children}</button>;
}

function LivePip({ label }) {
  return <span className="live">{label}</span>;
}

// Renders "Arrow →" with the arrow flipped in RTL.
function Arrowed({ text }) {
  const m = /^(.*?)\s*([→←])$/.exec(text || '');
  if (!m) return text;
  return <>{m[1]} <span className="arr" aria-hidden="true">→</span></>;
}

function SectionHead({ eyebrow, a, b, sub, light }) {
  return (
    <div className="section-head reveal">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="h2">{a} <em>{b}</em></h2>
      {sub && <p className="lead">{sub}</p>}
    </div>
  );
}

const NAV_IDS = ['how-it-works', 'retail', 'fnb', 'sell-online', 'campaigns'];

function Nav({ t, lang, setLang, openForm }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const close = () => setOpen(false);
  return (
    <header className={'nav' + (scrolled ? ' scrolled' : '') + (open ? ' open' : '')}>
      <div className="container nav-inner">
        <a href="#top" className="brand" aria-label="youcloud"><YcLogo /></a>
        <nav className="nav-links" aria-label="Sections">
          {t.nav.map((l, i) => <a key={l} href={'#' + NAV_IDS[i]}>{l}</a>)}
        </nav>
        <div className="nav-actions">
          <div className="lang" role="group" aria-label="Language">
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
            <button className={'ar-btn' + (lang === 'ar' ? ' on' : '')} onClick={() => setLang('ar')} aria-pressed={lang === 'ar'}>عربي</button>
          </div>
          <Btn className="nav-cta" onClick={() => openForm('enquiry')}>{t.navCta}</Btn>
          <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(o => !o)}><span /><span /><span /></button>
        </div>
      </div>
      <div className="mobile-menu">
        {t.nav.map((l, i) => <a key={l} href={'#' + NAV_IDS[i]} onClick={close}>{l}</a>)}
        <Btn onClick={() => { close(); openForm('enquiry'); }}>{t.navCta}</Btn>
      </div>
    </header>
  );
}

function Footer({ t, openForm }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <YcLogo dark height={40} />
            <p>{t.footDesc}</p>
          </div>
          <div>
            <h5>{t.footProduct}</h5>
            <ul>{NAV_IDS.map((id, i) => <li key={id}><a href={'#' + id}>{t.nav[i]}</a></li>)}</ul>
          </div>
          <div>
            <h5>{t.footContact}</h5>
            <ul>
              <li><button onClick={() => openForm('whatsapp')}>{t.footWhatsApp}</button></li>
              <li><a className="ltr" href={'mailto:' + t.footEmail}>{t.footEmail}</a></li>
              <li><a className="ltr" href={'mailto:' + t.footSupport}>{t.footSupport}</a></li>
              <li><a className="ltr" href={'https://' + t.footSite} target="_blank" rel="noreferrer">{t.footSite}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">{t.rights}</div>
      </div>
    </footer>
  );
}

Object.assign(window, { Dh, money, YcLogo, Eyebrow, Btn, LivePip, Arrowed, SectionHead, Nav, Footer });
