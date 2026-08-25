/* ============================================================
   data.js — SINGLE source of truth for all page content.
   Render scripts (home.js, careers.js, components.js) read from
   window.JOYCRAFT. To edit copy / add a game / add a job, edit
   here only — no HTML changes needed.
   ============================================================ */
window.JOYCRAFT = {

  /* -- brand + global chrome -- */
  brand: { name: 'JoyCraft', emoji: '🎮' },

  nav: [
    { label: 'Home',    href: 'index.html',        key: 'home'    },
    { label: 'About',   href: 'index.html#about',  key: 'about'   },
    { label: 'Careers', href: 'careers.html',      key: 'careers' }
  ],

  contact: {
    email:       'business@joycraftgames.net',
    hiringEmail: 'hiring@joycraftgames.net',
    site:        'joycraftgames.net',
    siteUrl:     'https://joycraftgames.net/',
    location:    'Hanoi, Vietnam'
  },

  /* ===========================================================
     HOME — hero
     =========================================================== */
  hero: {
    badge: 'GAME STUDIO',
    title: 'JoyCraft',
    tagline: 'A Vietnam-based, AI-augmented game studio building mobile titles. ' +
             'We move fast — from rapid prototyping to polished launch — by combining ' +
             'deep craft with modern AI-driven workflows.',
    stats: [
      { num: '50M+', label: 'Combined Downloads' },
      { num: '3',    label: 'Disciplines'        },
      { num: '3',    label: 'Founders'           }
    ],
    ctas: [
      { label: 'Get In Touch', href: 'mailto:business@joycraftgames.net', icon: '✉️', style: 'primary'   },
      { label: 'View Careers', href: 'careers.html',                      icon: '🚀', style: 'secondary' }
    ]
  },

  /* ===========================================================
     HOME — about (disciplines + founders)
     =========================================================== */
  about: {
    tag: 'About Us',
    title: 'Full-Stack Game Development',
    intro: 'JoyCraft unites engineering, art, and design under one roof — delivering ' +
           'market-ready games from first prototype to global launch.',

    disciplines: [
      { icon: '⚙️', title: 'Engineering',
        desc: 'Unity-native development with deep expertise in mobile optimization, live-ops, analytics pipelines, and scalable game architecture.' },
      { icon: '🎨', title: 'Art & Visual',
        desc: 'Cinematic-grade art direction rooted in 3D advertising and animated film production — bringing cross-industry visual quality into games.' },
      { icon: '🕹️', title: 'Game Design',
        desc: 'Player-centric design with a data-informed approach to core loops, progression, balancing, and monetization.' },
      { icon: '🤖', title: 'AI-Driven Development',
        desc: 'We integrate AI tools throughout our pipeline — from rapid prototyping and asset generation to automated testing — compressing dev cycles without sacrificing quality.' }
    ],

    founders: [
      { initials: 'TN', avatar: 'tn', photo: 'images/nguyen%20tu.png', name: 'Tu Nguyen', role: 'CEO · Co-Founder',
        bio: 'Creative director with a strong production background in 3D commercials and animated films.' },
      { initials: 'HT', avatar: 'ht', photo: 'images/huy%20profile.jpg', name: 'Huy Tran', role: 'CTO · Co-Founder',
        bio: 'Shipped multiple hit mobile titles with 50M+ combined downloads. Owns the full technical stack — scalable architecture, SDK integration, live-ops, performance optimization across platforms.' }
    ]
  },

  /* ===========================================================
     HOME — games / portfolio
     `gradient` paints the banner; `emoji` shows when no `img`.
     =========================================================== */
  games: {
    tag: 'Portfolio',
    title: 'Our Games 🕹️',
    intro: 'From chart-topping music casuals to indie narrative adventures — built with craft, shipped with speed.',
    items: [
      { name: 'Ring Slide: Colorful Yarn', platform: 'Mobile',
        gradient: 'linear-gradient(135deg,#ff9ff3,#ff6b6b)',
        img: 'images/Icon_4_round_512.png',
        desc: 'Casual puzzle — the first title shipped under the JoyCraft banner.',
        links: [
          { label: 'Google Play', icon: '▶', href: 'https://play.google.com/store/apps/details?id=com.ringslide.colorfulyarn' }
        ] },
      { name: 'Airport Jam: Passenger Sort', platform: 'Mobile',
        gradient: 'linear-gradient(135deg,#48dbfb,#54a0ff)',
        img: 'images/airport_jam_icon.png',
        desc: 'Sort puzzle — guide passengers to the right gates. Our second mobile title.',
        links: [
          { label: 'Google Play', icon: '▶', href: 'https://play.google.com/store/apps/details?id=com.airportjam.sortpuzzle' }
        ] },
      { name: 'Sand Scratch', platform: 'Mobile',
        gradient: 'linear-gradient(135deg,#a29bfe,#6c5ce7)',
        img: 'images/sand_scratch_icon.png',
        desc: 'Relaxing sand art puzzle — scratch away to reveal colorful scenes.',
        links: [
          { label: 'Google Play', icon: '▶', href: 'https://play.google.com/store/apps/details?id=com.puzzle.sandscratch' }
        ] },
      { name: 'Untitled Project', platform: 'In Development', emoji: '🚧',
        gradient: 'linear-gradient(135deg,#48dbfb,#1dd1a1)',
        desc: 'Our second title — currently in development under the JoyCraft banner. Stay tuned.',
        links: [] }
    ]
  },

  /* ===========================================================
     CAREERS — page header
     =========================================================== */
  careers: {
    badge: "🚀 We're Hiring",
    title: 'Join JoyCraft',
    intro: "We're building the future of mobile games — fast, with craft and AI. Come build with us.",
    location: 'Hà Nội',                                 // header pill — shared by all roles
    address: 'Vũ Thạnh, Ô Chợ Dừa, Đống Đa, Hà Nội'     // Work Details location — shared by all roles
  },

  /* ===========================================================
     CAREERS — open roles
     `id` is used for the DOM id + mailto subject slug.
     =========================================================== */
  jobs: [
    {
      id: 'unity-developer',
      title: 'Unity Developer (Fresher/Junior)',
      type: 'Full-time',
      intro: "JoyCraft Games is a startup building puzzle games with a tight team of 5–10. You'll build mobile game systems in Unity for Android and iOS, ship to real players, and grow alongside the team.",
      responsibilities: [
        'Build mobile game systems in Unity (C#) for Android and iOS — focused on puzzle games.',
        'Integrate third-party SDKs and advertising networks.',
        'Contribute ideas to improve the product.',
        'Collaborate across departments — design, art, and marketing.'
      ],
      requirements: [
        '6+ months of Unity game development — freshers welcome with a strong portfolio.',
        'Solid C# and OOP fundamentals.',
        'Strong problem-solving skills and clean, maintainable code.',
        'Able to work independently and as part of a team.',
        'A portfolio of projects you have built.'
      ],
      niceToHave: [
        'Experience optimizing app performance.',
        'Hands-on experience integrating SDKs.',
        'Built complete 3D game systems across multiple titles.'
      ],
      benefits: [
        'Salary up to 45M VND, based on ability.',
        'Guaranteed 15+ months of income per year.',
        '100% salary during probation.',
        'Sundays off.',
        'Transportation and lunch support.',
        'Dynamic environment with clear advancement opportunities.'
      ],
      schedule: 'Monday–Saturday, 8:15–18:00 (flexible)'
    },
    {
      id: 'unity-developer-intern',
      title: 'Unity Developer Intern',
      type: 'Internship',
      intro: "JoyCraft Games is a Hanoi-based startup building puzzle games with a small team of 5–10. As an intern, you'll turn game designs into real features and learn production game development with a mentor by your side.",
      responsibilities: [
        'Turn game designs into functional, working features.',
        'Take part in level design and playtesting.',
        'Learn game development practices under mentor guidance.'
      ],
      requirements: [
        'Final-year student or recent graduate in IT or a related field.',
        'C# programming experience.',
        'Strong self-learning ability.'
      ],
      niceToHave: [
        'Students from top technology universities are a plus.',
        'Scholarship recipients or award winners in major competitions are especially welcome.',
        'Prior hands-on experience with Unity.'
      ],
      benefits: [
        'Opportunity to convert to a full-time role after the internship.',
        'Financial support (allowance).',
        'Hands-on experience shipping real 3D games to global markets.',
        'Career development guidance and mentorship.'
      ],
      workMode: 'On-site',
      schedule: 'Minimum 20 hours/week'
    }
  ]
};
