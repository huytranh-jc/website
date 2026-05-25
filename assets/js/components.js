/* ============================================================
   components.js — shared chrome (nav + footer) + tiny helpers.
   Exposes window.JC. Depends on data.js (window.JOYCRAFT).
   No framework, classic script so it works over file://.
   ============================================================ */
(function () {
  'use strict';

  var D = window.JOYCRAFT;

  /* escape text before injecting via innerHTML */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* build a mailto with an optional, properly-encoded subject */
  function mailto(email, subject) {
    return 'mailto:' + email + (subject ? '?subject=' + encodeURIComponent(subject) : '');
  }

  /* shared top navigation; `activeKey` highlights the current tab */
  function renderNav(activeKey) {
    var b = D.brand;

    var links = D.nav.map(function (item) {
      var isActive = item.key === activeKey;
      return '<li><a href="' + esc(item.href) + '" class="' + (isActive ? 'active' : '') + '"' +
             (isActive ? ' aria-current="page"' : '') + '>' + esc(item.label) + '</a></li>';
    }).join('');

    return '' +
      '<nav role="navigation" aria-label="Main navigation">' +
        '<div class="container nav-inner">' +
          '<a href="index.html" class="nav-logo" aria-label="' + esc(b.name) + ' home">' +
            esc(b.name) + ' ' + esc(b.emoji) +
          '</a>' +
          '<ul class="nav-links" id="navLinks">' + links + '</ul>' +
          '<div class="nav-actions">' +
            '<button class="theme-btn" id="themeToggle" aria-label="Toggle dark/light mode" title="Toggle theme"></button>' +
            '<button class="nav-hamburger" id="hamburger" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="navLinks">' +
              '<span></span><span></span><span></span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</nav>';
  }

  /* shared footer. Pass { minimal: true } for just the bottom bar. */
  function renderFooter(opts) {
    opts = opts || {};
    var c = D.contact, b = D.brand;

    var cta = opts.minimal ? '' :
      '<h2 class="footer-cta-heading">Let&#39;s Build Something Together</h2>' +
      '<p class="footer-cta-sub">Open to publishing partnerships, work-for-hire, and co-development.</p>' +
      '<div class="footer-contacts">' +
        '<a href="' + mailto(c.email) + '" class="contact-item" aria-label="Email ' + esc(c.email) + '"><span>✉️</span> ' + esc(c.email) + '</a>' +
        '<a href="' + esc(c.siteUrl) + '" class="contact-item" target="_blank" rel="noopener noreferrer" aria-label="Visit ' + esc(c.site) + ' (opens in new tab)"><span>🌐</span> ' + esc(c.site) + '</a>' +
        '<a href="' + esc(c.phoneHref) + '" class="contact-item" aria-label="Call ' + esc(c.phone) + '"><span>📞</span> ' + esc(c.phone) + '</a>' +
      '</div>';

    return '' +
      '<footer role="contentinfo">' +
        '<div class="container footer-inner">' +
          cta +
          '<div class="footer-divider"></div>' +
          '<div class="footer-bottom">' +
            '<a href="index.html" class="footer-bottom-logo">' + esc(b.name) + ' ' + esc(b.emoji) + '</a>' +
            '<span class="footer-copy">© 2026 ' + esc(b.name) + ' Game Studio · ' + esc(c.location) + '</span>' +
          '</div>' +
        '</div>' +
      '</footer>';
  }

  /* mount nav + footer into their placeholders, given an active tab key */
  function mountChrome(activeKey, footerOpts) {
    var navRoot = document.getElementById('nav-root');
    var footRoot = document.getElementById('footer-root');
    if (navRoot)  navRoot.innerHTML  = renderNav(activeKey);
    if (footRoot) footRoot.innerHTML = renderFooter(footerOpts);
  }

  window.JC = {
    esc: esc,
    mailto: mailto,
    renderNav: renderNav,
    renderFooter: renderFooter,
    mountChrome: mountChrome
  };
})();
