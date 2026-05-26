/* ============================================================
   home.js — renders the home page (hero + about + games) from
   window.JOYCRAFT into the page mounts. Depends on data.js +
   components.js. theme.js runs after this to wire the nav.
   ============================================================ */
(function () {
  'use strict';

  var D = window.JOYCRAFT, JC = window.JC, esc = JC.esc;

  /* -- hero -- */
  function statPill(s) {
    return '<div class="stat-pill"><span class="stat-num">' + esc(s.num) +
           '</span><span class="stat-label">' + esc(s.label) + '</span></div>';
  }

  function ctaBtn(b) {
    return '<a href="' + esc(b.href) + '" class="btn btn-' + esc(b.style) + '">' +
           esc(b.icon) + ' ' + esc(b.label) + '</a>';
  }

  function heroSection() {
    var h = D.hero;
    return '<section class="hero" aria-labelledby="hero-title"><div class="container"><div class="hero-content">' +
      '<div class="hero-badge">' + esc(h.badge) + '</div>' +
      '<h1 class="hero-title" id="hero-title">' + esc(h.title) + '</h1>' +
      '<p class="hero-tagline">' + esc(h.tagline) + '</p>' +
      '<div class="hero-stats">' + h.stats.map(statPill).join('') + '</div>' +
      '<div class="hero-ctas">' + h.ctas.map(ctaBtn).join('') + '</div>' +
    '</div></div></section>';
  }

  /* -- about: disciplines + founders -- */
  function discCard(d) {
    return '<article class="disc-card"><div class="disc-icon" aria-hidden="true">' + esc(d.icon) +
           '</div><h3>' + esc(d.title) + '</h3><p>' + esc(d.desc) + '</p></article>';
  }

  function founderCard(f) {
    var avatar = f.photo
      ? '<img class="founder-avatar ' + esc(f.avatar) + '" src="' + esc(f.photo) + '" alt="' + esc(f.name) + '" loading="lazy">'
      : '<div class="founder-avatar ' + esc(f.avatar) + '" aria-label="Avatar for ' + esc(f.name) + '">' + esc(f.initials) + '</div>';
    return '<article class="founder-card">' + avatar +
      '<div class="founder-info"><h3>' + esc(f.name) + '</h3>' +
        '<span class="founder-role">' + esc(f.role) + '</span>' +
        '<p>' + esc(f.bio) + '</p>' +
      '</div></article>';
  }

  function aboutSection() {
    var a = D.about;
    return '<section id="about" aria-labelledby="about-heading"><div class="container">' +
      '<span class="section-tag">' + esc(a.tag) + '</span>' +
      '<h2 class="section-title" id="about-heading">' + esc(a.title) + '</h2>' +
      '<p class="section-intro">' + esc(a.intro) + '</p>' +
      '<div class="disciplines-grid">' + a.disciplines.map(discCard).join('') + '</div>' +
      '<h2 class="founders-heading">👾 The Founders</h2>' +
      '<div class="founders-grid">' + a.founders.map(founderCard).join('') + '</div>' +
    '</div></section>';
  }

  /* -- games / portfolio -- */
  function storeLink(g, l) {
    return '<a href="' + esc(l.href) + '" class="store-btn' +
      '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(g.name) + ' on ' + esc(l.label) + '">' +
      esc(l.icon) + ' ' + esc(l.label) + '</a>';
  }

  function gameCard(g) {
    var banner = g.img
      ? '<div class="game-banner" style="background:' + esc(g.gradient) + ';padding:0;" aria-hidden="true">' +
          '<img src="' + esc(g.img) + '" alt="" class="game-banner-img"></div>'
      : '<div class="game-banner" style="background:' + esc(g.gradient) + ';" aria-hidden="true">' + esc(g.emoji) + '</div>';

    var links = g.links.map(function (l) { return storeLink(g, l); }).join('');

    return '<article class="game-card">' + banner +
      '<span class="game-platform-badge">' + esc(g.platform) + '</span>' +
      '<div class="game-body"><h3>' + esc(g.name) + '</h3><p>' + esc(g.desc) + '</p>' +
        '<div class="game-links">' + links + '</div>' +
      '</div></article>';
  }

  function gamesSection() {
    var gs = D.games;
    return '<section id="games" aria-labelledby="games-heading"><div class="container">' +
      '<span class="section-tag">' + esc(gs.tag) + '</span>' +
      '<h2 class="section-title" id="games-heading">' + esc(gs.title) + '</h2>' +
      '<p class="section-intro">' + esc(gs.intro) + '</p>' +
      '<div class="games-grid">' + gs.items.map(gameCard).join('') + '</div>' +
    '</div></section>';
  }

  /* -- mount -- */
  JC.mountChrome('home');
  document.getElementById('main').innerHTML = heroSection() + aboutSection() + gamesSection();
})();
