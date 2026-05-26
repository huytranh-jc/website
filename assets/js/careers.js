/* ============================================================
   careers.js — renders the careers page (hero + job accordion)
   from window.JOYCRAFT.jobs and handles expand/collapse.
   Depends on data.js + components.js. theme.js runs after.
   ============================================================ */
(function () {
  'use strict';

  var D = window.JOYCRAFT, JC = window.JC, esc = JC.esc;

  function bullets(arr, extraClass) {
    var cls = extraClass ? ' class="' + extraClass + '"' : '';
    return '<ul' + cls + '>' + arr.map(function (li) {
      return '<li>' + esc(li) + '</li>';
    }).join('') + '</ul>';
  }

  function jobItem(job) {
    var domId = 'job-' + job.id, detailId = 'detail-' + job.id;

    return '<div class="job-item" role="listitem" id="' + domId + '">' +
      '<div class="job-row" role="button" tabindex="0" aria-expanded="false" aria-controls="' + detailId + '" data-job="' + domId + '">' +
        '<div class="job-row-left">' +
          '<span class="job-title">' + esc(job.title) + '</span>' +
          '<div class="job-meta">' +
            '<span class="meta-pill location">📍 ' + esc(D.careers.location) + '</span>' +
            '<span class="meta-pill type">' + esc(job.type) + '</span>' +
          '</div>' +
        '</div>' +
        '<span class="job-chevron" aria-hidden="true">▾</span>' +
      '</div>' +
      '<div class="job-detail" id="' + detailId + '" aria-label="' + esc(job.title) + ' job details">' +
        '<p class="detail-intro">' + esc(job.intro) + '</p>' +
        '<div class="detail-section"><h4>⚙️ Responsibilities</h4>' + bullets(job.responsibilities) + '</div>' +
        '<div class="detail-section"><h4>✅ Requirements</h4>' + bullets(job.requirements) + '</div>' +
        '<div class="detail-section"><h4>⭐ Nice to Have</h4>' + bullets(job.niceToHave) + '</div>' +
        '<div class="detail-section"><h4 class="benefits-list">🎁 Benefits</h4>' + bullets(job.benefits, 'benefits-list') + '</div>' +
        '<div class="detail-section"><h4>🗓️ Work Details</h4>' +
          '<ul class="work-details">' +
            '<li><strong>Location:</strong> ' + esc(D.careers.address) + '</li>' +
            (job.workMode ? '<li><strong>Work mode:</strong> ' + esc(job.workMode) + '</li>' : '') +
            (job.schedule ? '<li><strong>Schedule:</strong> ' + esc(job.schedule) + '</li>' : '') +
          '</ul>' +
        '</div>' +
        '<div class="apply-box">' +
          '<h4>📬 How to Apply</h4>' +
          '<p>Sound like you? Send your CV and portfolio to <strong>' + esc(D.contact.hiringEmail) + '</strong> with the role in the subject line.</p>' +
          '<a href="' + JC.mailto(D.contact.hiringEmail, 'Application: ' + job.title) + '" class="apply-btn" aria-label="Email your CV for ' + esc(job.title) + ' role">✉️ Email your CV</a>' +
        '</div>' +
        '<button class="back-btn" data-job="' + domId + '" aria-label="Back to all roles">← Back to all roles</button>' +
      '</div>' +
    '</div>';
  }

  function careersHero() {
    var c = D.careers;
    return '<section class="careers-hero" aria-labelledby="careers-heading"><div class="container careers-hero-inner">' +
      '<div class="page-badge">' + esc(c.badge) + '</div>' +
      '<h1 id="careers-heading">' + esc(c.title) + '</h1>' +
      '<p>' + esc(c.intro) + '</p>' +
    '</div></section>';
  }

  function jobsSection() {
    var n = D.jobs.length;
    return '<section class="jobs-section"><div class="container">' +
      '<div class="jobs-count">🎯 ' + n + ' Open Role' + (n === 1 ? '' : 's') + '</div>' +
      '<div class="job-list" id="jobList" role="list">' + D.jobs.map(jobItem).join('') + '</div>' +
    '</div></section>';
  }

  /* -- mount -- */
  JC.mountChrome('careers', { minimal: true });
  document.getElementById('main').innerHTML = careersHero() + jobsSection();

  /* -- accordion: one open at a time, smooth scroll into view -- */
  function toggleJob(domId) {
    var item = document.getElementById(domId);
    if (!item) return;

    var wasOpen = item.classList.contains('open');

    document.querySelectorAll('.job-item.open').forEach(function (el) {
      el.classList.remove('open');
      el.querySelector('.job-row').setAttribute('aria-expanded', 'false');
    });

    if (!wasOpen) {
      item.classList.add('open');
      item.querySelector('.job-row').setAttribute('aria-expanded', 'true');
      setTimeout(function () {
        var top = item.getBoundingClientRect().top + window.pageYOffset - 88;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }, 40);
    }
  }

  var list = document.getElementById('jobList');

  list.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-job]');
    if (trigger) toggleJob(trigger.getAttribute('data-job'));
  });

  list.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      var row = e.target.closest('.job-row[data-job]');
      if (row) { e.preventDefault(); toggleJob(row.getAttribute('data-job')); }
    }
  });
})();
