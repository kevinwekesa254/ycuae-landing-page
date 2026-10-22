// Enquiry form (Get started) + WhatsApp chat sheet + floating WhatsApp button.
// Copy is bilingual (English / Arabic) via the F strings below.

const F = {
  en: {
    title: 'Get started with youcloud',
    sub: 'Tell us about your business and we will call you back — usually within one working hour.',
    name: 'Full name', nameP: 'e.g. Ahmed Al Mansoori',
    biz: 'Business name', bizP: 'e.g. Al Noor Grocery',
    mobile: 'Mobile number', email: 'Email',
    emirate: 'Emirate', emirateP: 'Select…', emirates: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'],
    type: 'Business type', typeP: 'Select…', types: ['Grocery / supermarket', 'Café / restaurant', 'Fashion / electronics', 'Salon / services', 'Selling online / social', 'Other'],
    branches: 'Branches / tills', branchesP: 'Select…', branchesOpts: ['1', '2–5', '6–20', '20+'],
    devices: 'Devices of interest',
    deviceList: ['y5000 Counter POS', 'y1000 Handheld', 'y4000 Tablet', 'y7000 Self-order kiosk', 'y10 QR SoundBox', 'Not sure yet'],
    contact: 'Preferred contact', contactOpts: ['Call me', 'WhatsApp', 'Email'],
    notes: 'Anything else?', notesP: 'What do you want to fix first?',
    submit: 'Send my enquiry', sending: 'Sending…',
    err: 'Please fill in your name, mobile number and business type.',
    thanksT: 'Thanks — we have your enquiry.',
    thanksB: 'Our UAE team will call you back on your mobile, usually within one working hour.',
    ref: 'Reference', close: 'Close', whatsapp: 'Or chat on WhatsApp now',
    consent: 'By sending this you agree we may contact you about youcloud.',
    sendFail: 'We could not send that. Please try again, or message us on WhatsApp.',
    sendFailMail: 'Email it to us instead',
  },
  ar: {
    title: 'ابدأ مع youcloud',
    sub: 'أخبرنا عن نشاطك التجاري وسنعاود الاتصال بك — عادة خلال ساعة عمل واحدة.',
    name: 'الاسم الكامل', nameP: 'مثال: أحمد المنصوري',
    biz: 'اسم النشاط التجاري', bizP: 'مثال: بقالة النور',
    mobile: 'رقم الجوال', email: 'البريد الإلكتروني',
    emirate: 'الإمارة', emirateP: 'اختر…', emirates: ['دبي', 'أبوظبي', 'الشارقة', 'عجمان', 'رأس الخيمة', 'الفجيرة', 'أم القيوين'],
    type: 'نوع النشاط', typeP: 'اختر…', types: ['بقالة / سوبرماركت', 'مقهى / مطعم', 'أزياء / إلكترونيات', 'صالون / خدمات', 'بيع عبر الإنترنت / التواصل', 'أخرى'],
    branches: 'عدد الفروع / نقاط البيع', branchesP: 'اختر…', branchesOpts: ['1', '2–5', '6–20', 'أكثر من 20'],
    devices: 'الأجهزة التي تهمك',
    deviceList: ['جهاز الكاشير y5000', 'جهاز y1000 المحمول', 'جهاز y4000 اللوحي', 'كشك y7000 للطلب الذاتي', 'سمّاعة الدفع y10 برمز QR', 'لست متأكداً بعد'],
    contact: 'طريقة التواصل المفضلة', contactOpts: ['اتصل بي', 'واتساب', 'البريد الإلكتروني'],
    notes: 'أي شيء آخر؟', notesP: 'ما الذي تريد حله أولاً؟',
    submit: 'أرسل طلبي', sending: 'جارٍ الإرسال…',
    err: 'يرجى إدخال الاسم ورقم الجوال ونوع النشاط.',
    thanksT: 'شكراً — لقد استلمنا طلبك.',
    thanksB: 'سيتصل بك فريقنا في الإمارات على جوالك، عادة خلال ساعة عمل واحدة.',
    ref: 'الرقم المرجعي', close: 'إغلاق', whatsapp: 'أو تحدث معنا على واتساب الآن',
    consent: 'بإرسالك هذا الطلب فإنك توافق على أن نتواصل معك بخصوص youcloud.',
    sendFail: 'لم نتمكن من الإرسال. يرجى المحاولة مرة أخرى أو مراسلتنا على واتساب.',
    sendFailMail: 'أرسله إلينا عبر البريد الإلكتروني',
  },
};

const WHATSAPP_NUMBER = '971525748524'; // UAE sales WhatsApp (+971 52 574 8524) — used only in wa.me links, never shown on the page

// Every enquiry is emailed to sales, with a copy to Arun, through FormSubmit — the same route as the main
// youcloud.ae demo form. The first submission to a new address triggers a one-time activation email.
const NOTIFY = { to: 'sales@youcloud.ae', cc: 'arun@youcloudpay.com' };

// Optional: also POST every enquiry as JSON to a CRM or automation webhook (Zapier, Make, n8n…).
const ENQUIRY_WEBHOOK_URL = '';

const waStrings = {
  en: { title: 'Chat with youcloud', online: 'Online now · replies in minutes',
    sub: 'Pick a topic and we will open WhatsApp with your message ready to send.',
    name: 'Your name', nameP: 'e.g. Ahmed', topic: 'What can we help with?',
    topics: ['I want a demo', 'Pricing for my shop', 'Which device do I need?', 'Help with selling online', 'Something else'],
    note: 'Anything to add? (optional)', noteP: 'e.g. I run a grocery in Al Barsha with 2 tills',
    preview: 'Your message', send: 'Open WhatsApp', close: 'Close',
    hello: 'Marhaba youcloud. ', myName: ' — my name is ' },
  ar: { title: 'تحدث مع youcloud', online: 'متصل الآن · نرد خلال دقائق',
    sub: 'اختر موضوعاً وسنفتح واتساب ورسالتك جاهزة للإرسال.',
    name: 'اسمك', nameP: 'مثال: أحمد', topic: 'كيف يمكننا مساعدتك؟',
    topics: ['أريد عرضاً توضيحياً', 'الأسعار لمتجري', 'أي جهاز أحتاج؟', 'مساعدة في البيع عبر الإنترنت', 'موضوع آخر'],
    note: 'هل تريد إضافة شيء؟ (اختياري)', noteP: 'مثال: لدي بقالة في البرشاء بجهازَي كاشير',
    preview: 'رسالتك', send: 'افتح واتساب', close: 'إغلاق',
    hello: 'مرحباً youcloud. ', myName: ' — اسمي ' },
};

const field = {
  width: '100%', height: 48, padding: '0 14px', borderRadius: 8, border: '1px solid var(--line-2)',
  background: '#fff', fontSize: 17, fontFamily: 'inherit', color: 'var(--ink)', outline: 'none',
};
const label = {
  display: 'block', fontSize: 14, letterSpacing: '0.02em',
  textTransform: 'uppercase', fontWeight: 700, color: 'var(--ink)', marginBottom: 6,
};

function Sheet({ children, onClose, wide, className = '' }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, []);
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" style={{
      position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(10,28,58,0.55)',
      backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} className={className} style={{
        background: '#fff', borderRadius: 'var(--r-lg)', width: '100%', maxWidth: wide ? 720 : 440,
        maxHeight: '90vh', overflowY: 'auto', boxShadow: 'var(--shadow-lg)', position: 'relative',
      }}>{children}</div>
    </div>
  );
}

function EnquiryForm({ lang, onClose, onWhatsApp }) {
  const s = F[lang] || F.en;
  const [f, setF] = React.useState({ name: '', biz: '', mobile: '', email: '', emirate: '', type: '', branches: '', contact: '', notes: '', devices: [] });
  const [state, setState] = React.useState('idle');
  const [ref, setRef] = React.useState('');
  const [err, setErr] = React.useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const toggleDevice = (d) => setF(prev => ({ ...prev, devices: prev.devices.includes(d) ? prev.devices.filter(x => x !== d) : prev.devices.concat(d) }));

  const [mailHref, setMailHref] = React.useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!f.name.trim() || !f.mobile.trim() || !f.type) { setErr(s.err); return; }
    setErr(''); setState('sending');

    const payload = {
      source: 'youcloud-smb-landing',
      lang,
      submittedAt: new Date().toISOString(),
      page: typeof location !== 'undefined' ? location.href : '',
      name: f.name.trim(),
      business: f.biz.trim(),
      mobile: f.mobile.trim(),
      email: f.email.trim(),
      emirate: f.emirate,
      businessType: f.type,
      branches: f.branches,
      devices: f.devices,
      preferredContact: f.contact,
      notes: f.notes.trim(),
    };

    const reference = 'YC-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    const email = {
      _subject: 'New enquiry (UAE landing page) — ' + (payload.business || payload.name),
      _cc: NOTIFY.cc, _template: 'table', _captcha: 'false',
      'Reference': reference, 'Name': payload.name, 'Business': payload.business || '—',
      'Mobile': payload.mobile, 'Email': payload.email || '—', 'Emirate': payload.emirate || '—',
      'Business type': payload.businessType, 'Branches / tills': payload.branches || '—',
      'Devices of interest': payload.devices.join(', ') || '—', 'Preferred contact': payload.preferredContact || '—',
      'Notes': payload.notes || '—', 'Language': lang === 'ar' ? 'Arabic' : 'English', 'Page': payload.page,
    };
    const post = (url, body) => fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(body),
    }).then(r => r.ok).catch(() => false);

    const sent = await Promise.all([
      post('https://formsubmit.co/ajax/' + NOTIFY.to, email),
      ENQUIRY_WEBHOOK_URL ? post(ENQUIRY_WEBHOOK_URL, { ...payload, reference }) : Promise.resolve(false),
    ]);
    if (sent[0] || sent[1]) { setRef(reference); setState('done'); return; }

    // Nothing got through: offer the same enquiry as a pre-filled email instead.
    const lines = Object.keys(email).filter(k => k.charAt(0) !== '_').map(k => k + ': ' + email[k]);
    setMailHref('mailto:' + NOTIFY.to + '?cc=' + encodeURIComponent(NOTIFY.cc) + '&subject=' + encodeURIComponent(email._subject) + '&body=' + encodeURIComponent(lines.join('\n')));
    setErr(s.sendFail);
    setState('idle');
  };

  if (state === 'done') {
    return (
      <Sheet onClose={onClose}>
        <div style={{ padding: 32, textAlign: 'center' }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--c-hr-soft)', color: 'var(--c-hr)', display: 'grid', placeItems: 'center', margin: '0 auto 18px', fontSize: 26, fontWeight: 700 }}>✓</div>
          <h3 style={{ fontSize: 24, letterSpacing: '-0.02em' }}>{s.thanksT}</h3>
          <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6, marginTop: 12 }}>{s.thanksB}</p>
          <div style={{ marginTop: 18, display: 'inline-block', padding: '10px 16px', background: 'var(--bg-2)', borderRadius: 10, fontFamily: 'var(--f-mono)', fontSize: 13, fontWeight: 700 }} dir="ltr">
            {s.ref}: {ref}
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
            <Btn onClick={onWhatsApp}>{s.whatsapp}</Btn>
            <Btn kind="ghost" onClick={onClose}>{s.close}</Btn>
          </div>
        </div>
      </Sheet>
    );
  }

  return (
    <Sheet onClose={onClose} wide>
      <form onSubmit={submit} style={{ padding: 'clamp(20px, 3vw, 32px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 22 }}>
          <div>
            <Eyebrow>{s.title}</Eyebrow>
            <h3 style={{ fontSize: 26, letterSpacing: '-0.025em', marginTop: 14 }}>{s.title}</h3>
            <p style={{ color: 'var(--muted)', fontSize: 14.5, marginTop: 8, maxWidth: '46ch' }}>{s.sub}</p>
          </div>
          <button type="button" onClick={onClose} aria-label={s.close} style={{ fontSize: 26, lineHeight: 1, color: 'var(--muted)', padding: '0 4px', flexShrink: 0 }}>×</button>
        </div>

        <div className="yc-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label style={label}>{s.name} *</label><input style={field} value={f.name} onChange={set('name')} placeholder={s.nameP} /></div>
          <div><label style={label}>{s.biz}</label><input style={field} value={f.biz} onChange={set('biz')} placeholder={s.bizP} /></div>
          <div><label style={label}>{s.mobile} *</label><input style={field} value={f.mobile} onChange={set('mobile')} placeholder="+971 5X XXX XXXX" dir="ltr" /></div>
          <div><label style={label}>{s.email}</label><input style={field} value={f.email} onChange={set('email')} placeholder="you@business.ae" dir="ltr" /></div>
          <div><label style={label}>{s.emirate}</label>
            <select style={field} value={f.emirate} onChange={set('emirate')}>
              <option value="">{s.emirateP}</option>{s.emirates.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div><label style={label}>{s.type} *</label>
            <select style={field} value={f.type} onChange={set('type')}>
              <option value="">{s.typeP}</option>{s.types.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div><label style={label}>{s.branches}</label>
            <select style={field} value={f.branches} onChange={set('branches')}>
              <option value="">{s.branchesP}</option>{s.branchesOpts.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div><label style={label}>{s.contact}</label>
            <select style={field} value={f.contact} onChange={set('contact')}>
              <option value="">{s.contactOpts[0]}</option>{s.contactOpts.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <label style={label}>{s.devices}</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {s.deviceList.map(d => {
              const on = f.devices.includes(d);
              return (
                <button type="button" key={d} onClick={() => toggleDevice(d)} style={{
                  padding: '9px 14px', borderRadius: 999, fontSize: 13.5, fontWeight: 600,
                  border: '1.5px solid ' + (on ? 'var(--brand)' : 'var(--line)'),
                  background: on ? 'var(--brand-soft)' : '#fff', color: on ? 'var(--brand-ink)' : 'var(--ink-2)',
                }}>{d}</button>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <label style={label}>{s.notes}</label>
          <textarea style={{ ...field, height: 'auto', padding: '12px 14px', minHeight: 96, resize: 'vertical' }} value={f.notes} onChange={set('notes')} placeholder={s.notesP} />
        </div>

        {err && <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 10, background: 'var(--brand-soft)', color: 'var(--brand-ink)', fontSize: 14, fontWeight: 600 }}>{err}{mailHref && <> <a href={mailHref} style={{ textDecoration: 'underline' }}>{s.sendFailMail}</a></>}</div>}

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 22, flexWrap: 'wrap' }}>
          <button type="submit" className="btn btn-primary" disabled={state === 'sending'} style={{
            opacity: state === 'sending' ? 0.7 : 1,
          }}>{state === 'sending' ? s.sending : s.submit} <span className="arr" aria-hidden="true">→</span></button>
          <button type="button" onClick={onWhatsApp} style={{ fontSize: 14, fontWeight: 600, color: 'var(--brand-ink)', textDecoration: 'underline' }}>{s.whatsapp}</button>
        </div>
        <p style={{ fontSize: 12, color: 'var(--muted-2)', marginTop: 14 }}>{s.consent}</p>
      </form>
    </Sheet>
  );
}

const WA_ICON = (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.4 8.4 0 01-12.3 7.4L3 21l2.2-5.5A8.4 8.4 0 1121 11.5z" />
  </svg>
);

// A short form that composes a WhatsApp message and opens wa.me with it.
function WhatsAppSheet({ lang, onClose }) {
  const s = waStrings[lang] || waStrings.en;
  const [name, setName] = React.useState('');
  const [topic, setTopic] = React.useState(s.topics[0]);
  const [note, setNote] = React.useState('');
  const nameRef = React.useRef(null);
  React.useEffect(() => { nameRef.current && nameRef.current.focus(); }, []);
  const msg = s.hello + topic + (name.trim() ? s.myName + name.trim() : '') + '.' + (note.trim() ? '\n' + note.trim() : '');
  const href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
  return (
    <Sheet onClose={onClose} className="wa-sheet">
      <div className="wa-head">
        <span className="wa-ico">{WA_ICON}</span>
        <div className="wa-title">
          <b>{s.title}</b>
          <small>{s.online}</small>
        </div>
        <button type="button" className="wa-close" onClick={onClose} aria-label={s.close}>×</button>
      </div>
      <div className="wa-body">
        <p className="wa-sub">{s.sub}</p>

        <label className="wa-label" htmlFor="wa-name">{s.name}</label>
        <input id="wa-name" ref={nameRef} className="wa-input" value={name} placeholder={s.nameP} autoComplete="given-name" onChange={e => setName(e.target.value)} />

        <span className="wa-label">{s.topic}</span>
        <div className="wa-topics" role="radiogroup" aria-label={s.topic}>
          {s.topics.map(tp => (
            <button type="button" key={tp} role="radio" aria-checked={topic === tp} className={topic === tp ? 'on' : ''} onClick={() => setTopic(tp)}>{tp}</button>
          ))}
        </div>

        <label className="wa-label" htmlFor="wa-note">{s.note}</label>
        <textarea id="wa-note" className="wa-input wa-note" rows="2" value={note} placeholder={s.noteP} onChange={e => setNote(e.target.value)} />

        <span className="wa-label">{s.preview}</span>
        <div className="wa-chat"><div className="wa-bubble">{msg}</div></div>

        <a className="btn wa-send" href={href} target="_blank" rel="noreferrer">{WA_ICON}{s.send}</a>
      </div>
    </Sheet>
  );
}

function WhatsAppFab({ lang, onClick }) {
  return (
    <button onClick={onClick} aria-label="WhatsApp" className="fab">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.4 8.4 0 01-12.3 7.4L3 21l2.2-5.5A8.4 8.4 0 1121 11.5z" />
      </svg>
      <span>{lang === 'ar' ? 'تحدث معنا' : 'Chat with us'}</span>
    </button>
  );
}

Object.assign(window, { EnquiryForm, WhatsAppSheet, WhatsAppFab, WHATSAPP_NUMBER });
