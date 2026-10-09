/*! FLEX cookie consent. Self-contained: injects its own styles and markup.
 *  Configure BEFORE loading, e.g.
 *  <script>window.FLEX_CONSENT={theme:'green',policyUrl:'privacy.html',analyticsId:'G-XXXXXXX'}</script>
 *  Leave analyticsId empty and no analytics code is ever loaded. */
(function () {
  'use strict';
  var CFG = Object.assign({ theme: 'green', policyUrl: 'privacy.html', analyticsId: '', cookieName: 'flex_consent', days: 180 }, window.FLEX_CONSENT || {});
  var P = CFG.theme === 'teal'
    ? { main: '#1a5c52', dark: '#0f3d36', accent: '#c9a84c', on: '#0f3d36', soft: '#eef4f2', font: "'Inter',system-ui,sans-serif", head: "'Playfair Display',Georgia,serif", r: '2px' }
    : { main: '#1f4a1a', dark: '#12300f', accent: '#b4dc2e', on: '#12300f', soft: '#eef3e4', font: "'Figtree',system-ui,sans-serif", head: "'Bricolage Grotesque','Arial Black',system-ui,sans-serif", r: '999px' };

  var css = '\
.fxc,.fxc-ov{--m:' + P.main + ';--d:' + P.dark + ';--a:' + P.accent + ';--on:' + P.on + ';--soft:' + P.soft + ';font-family:' + P.font + ';color:#16240f;line-height:1.5}\
.fxc *,.fxc-ov *{box-sizing:border-box}\
.fxc{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;padding:0 max(16px,env(safe-area-inset-left)) calc(16px + env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-right));pointer-events:none}\
.fxc[hidden],.fxc-ov[hidden]{display:none}\
.fxc-in{pointer-events:auto;max-width:980px;margin:0 auto;background:#fff;border:1px solid #dfe5d6;border-top:4px solid var(--a);border-radius:24px;box-shadow:0 24px 60px -20px rgba(0,0,0,.45);padding:20px 22px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:16px 24px;align-items:center;animation:fxcUp .5s cubic-bezier(.2,.8,.2,1) both}\
@keyframes fxcUp{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}\
.fxc h2{font-family:' + P.head + ';font-size:1.1rem;margin:0 0 4px;color:var(--d)}\
.fxc p{margin:0;font-size:.93rem;color:#4b5b45}\
.fxc a{color:var(--m);font-weight:600}\
.fxc-btns{display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end}\
.fxc-b{font:700 .9rem ' + P.font + ';min-height:46px;padding:0 20px;border-radius:' + P.r + ';cursor:pointer;border:2px solid var(--m);background:transparent;color:var(--m);transition:background .2s,color .2s,transform .15s}\
.fxc-b.solid{background:var(--m);color:#fff}\
.fxc-b:active{transform:scale(.97)}\
@media (hover:hover){.fxc-b:hover{background:var(--m);color:#fff}.fxc-b.solid:hover{background:var(--d);border-color:var(--d)}}\
.fxc-b:focus-visible,.fxc-sw input:focus-visible+i{outline:3px solid var(--a);outline-offset:2px}\
.fxc-ov{position:fixed;inset:0;z-index:2147483001;background:rgba(10,24,8,.6);backdrop-filter:blur(3px);display:grid;place-items:center;padding:16px;overflow:auto}\
.fxc-m{background:#fff;width:min(560px,100%);max-height:calc(100dvh - 32px);overflow:auto;border-radius:26px;padding:26px 24px;box-shadow:0 30px 80px -20px rgba(0,0,0,.6);animation:fxcUp .35s cubic-bezier(.2,.8,.2,1) both}\
.fxc-m h2{font-family:' + P.head + ';font-size:1.4rem;margin:0 0 6px;color:var(--d)}\
.fxc-m>p{font-size:.93rem;color:#4b5b45;margin:0 0 16px}\
.fxc-cat{display:flex;gap:16px;align-items:flex-start;justify-content:space-between;padding:14px 0;border-top:1px solid #e4e9dc}\
.fxc-cat b{display:block;color:var(--d);font-size:1rem}\
.fxc-cat span.d{display:block;font-size:.86rem;color:#5a6b54;margin-top:2px}\
.fxc-sw{position:relative;flex:none;width:52px;height:30px;margin-top:2px}\
.fxc-sw input{position:absolute;inset:0;opacity:0;width:100%;height:100%;margin:0;cursor:pointer;z-index:1}\
.fxc-sw i{position:absolute;inset:0;border-radius:99px;background:#c9d1c2;transition:background .2s}\
.fxc-sw i::after{content:"";position:absolute;left:3px;top:3px;width:24px;height:24px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);transition:transform .2s}\
.fxc-sw input:checked+i{background:var(--m)}\
.fxc-sw input:checked+i::after{transform:translateX(22px)}\
.fxc-sw input:disabled{cursor:not-allowed}\
.fxc-sw input:disabled+i{opacity:.55}\
.fxc-act{display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end;margin-top:18px}\
@media (max-width:700px){.fxc-in{grid-template-columns:1fr;padding:18px}.fxc-btns{justify-content:stretch}.fxc-btns .fxc-b{flex:1 1 100%}.fxc-act .fxc-b{flex:1 1 100%}}\
@media (prefers-reduced-motion:reduce){.fxc-in,.fxc-m{animation:none}}';
  var st = document.createElement('style'); st.setAttribute('data-fxc', ''); st.textContent = css; document.head.appendChild(st);

  /* ---- storage (a first-party cookie holds the choice) ---- */
  function read() {
    try { var m = document.cookie.match(new RegExp('(?:^|; )' + CFG.cookieName + '=([^;]*)')); if (m) { var c = JSON.parse(decodeURIComponent(m[1])); if (c && c.v === 1) return c; } } catch (e) {}
    return null;
  }
  function write(c) {
    c.v = 1; c.ts = new Date().toISOString();
    document.cookie = CFG.cookieName + '=' + encodeURIComponent(JSON.stringify(c)) + '; max-age=' + (CFG.days * 86400) + '; path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
    consent = c;
  }
  var consent = read();

  /* ---- analytics (only if configured AND allowed) ---- */
  var gaLoaded = false;
  function applyConsent() {
    var id = CFG.analyticsId;
    if (id) {
      if (consent && consent.analytics) {
        window['ga-disable-' + id] = false;
        if (!gaLoaded) {
          gaLoaded = true;
          var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id); document.head.appendChild(s);
          window.dataLayer = window.dataLayer || []; window.gtag = function () { window.dataLayer.push(arguments); };
          window.gtag('js', new Date()); window.gtag('config', id, { anonymize_ip: true });
        }
      } else {
        window['ga-disable-' + id] = true;
        clearGaCookies();
      }
    }
    document.dispatchEvent(new CustomEvent('flex-consent', { detail: consent }));
  }
  function clearGaCookies() {
    var host = location.hostname.split('.'), doms = [location.hostname, '.' + location.hostname];
    if (host.length > 2) doms.push('.' + host.slice(-2).join('.'));
    document.cookie.split('; ').forEach(function (c) {
      var n = c.split('=')[0];
      if (/^_ga/.test(n) || n === '_gid') doms.forEach(function (d) { document.cookie = n + '=; max-age=0; path=/; domain=' + d; });
      if (/^_ga/.test(n) || n === '_gid') document.cookie = n + '=; max-age=0; path=/';
    });
  }

  /* ---- markup ---- */
  var banner = document.createElement('div');
  banner.className = 'fxc'; banner.hidden = true;
  banner.setAttribute('role', 'region'); banner.setAttribute('aria-label', 'Cookie notice');
  banner.innerHTML = '<div class="fxc-in"><div><h2>Your privacy</h2><p>We use essential cookies to make this site work. With your permission we also use analytics cookies to understand how the site is used. You can change your mind at any time. See our <a href="' + CFG.policyUrl + '">Privacy and Cookie Policy</a>.</p></div>' +
    '<div class="fxc-btns"><button type="button" class="fxc-b" data-a="custom">Customise</button><button type="button" class="fxc-b" data-a="reject">Reject non-essential</button><button type="button" class="fxc-b solid" data-a="accept">Accept all</button></div></div>';
  var modal = document.createElement('div');
  modal.className = 'fxc-ov'; modal.hidden = true;
  modal.innerHTML = '<div class="fxc-m" role="dialog" aria-modal="true" aria-labelledby="fxcMT"><h2 id="fxcMT">Cookie settings</h2>' +
    '<p>Choose which cookies you are happy for us to use. Essential cookies are always on because the site cannot work without them.</p>' +
    '<div class="fxc-cat"><div><b>Essential</b><span class="d">Remember the cookie choice you make here. Always on.</span></div><label class="fxc-sw"><input type="checkbox" checked disabled aria-label="Essential cookies, always on"><i></i></label></div>' +
    '<div class="fxc-cat"><div><b>Analytics</b><span class="d">Anonymous statistics about visits and popular pages, so we can improve the site.' + (CFG.analyticsId ? '' : ' Not in use on this site at the moment.') + '</span></div><label class="fxc-sw"><input type="checkbox" id="fxcAn" aria-label="Analytics cookies"><i></i></label></div>' +
    '<div class="fxc-act"><button type="button" class="fxc-b" data-a="reject">Reject non-essential</button><button type="button" class="fxc-b" data-a="save">Save my choices</button><button type="button" class="fxc-b solid" data-a="accept">Accept all</button></div></div>';
  document.body.appendChild(banner); document.body.appendChild(modal);

  var lastFocus = null;
  function hideBanner() { banner.hidden = true; }
  function closeModal() { modal.hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function openModal() {
    lastFocus = document.activeElement;
    modal.querySelector('#fxcAn').checked = !!(consent && consent.analytics);
    modal.hidden = false; modal.querySelector('.fxc-b').focus();
  }
  function choose(kind) {
    var an = kind === 'accept' ? true : kind === 'reject' ? false : modal.querySelector('#fxcAn').checked;
    write({ analytics: an });
    hideBanner(); modal.hidden = true; applyConsent();
    if (lastFocus && lastFocus.focus && kind !== 'accept' && kind !== 'reject') try { lastFocus.focus(); } catch (e) {}
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-a]');
    if (a && (banner.contains(a) || modal.contains(a))) {
      var k = a.getAttribute('data-a');
      if (k === 'custom') openModal(); else choose(k);
      return;
    }
    var s = e.target.closest && e.target.closest('[data-cookie-settings]');
    if (s) { e.preventDefault(); openModal(); return; }
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'Tab') {
      var f = modal.querySelectorAll('button:not([disabled]),input:not([disabled])'), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  window.flexConsent = { get: function () { return consent; }, open: openModal };
  if (!consent) { banner.hidden = false; } else { applyConsent(); }
})();
