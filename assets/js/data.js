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
    tagline: 'A Vietnam-based, AI-augmented game studio building mobile & PC titles. ' +
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
        bio: 'Shipped multiple hit mobile titles with 50M+ combined downloads. Owns the full technical stack — scalable architecture, SDK integration, live-ops, performance optimization across platforms.' },
      { initials: 'NT', avatar: 'nt', photo: 'images/nhat%20profile.jpg', name: 'Nhat Tran', role: 'Game Director · Co-Founder',
        bio: 'Game designer shipped on mobile and PC. Specializes in gameplay systems, level progression, player-centric design.' }
    ]
  },

  /* ===========================================================
     HOME — games / portfolio
     `gradient` paints the banner; `emoji` shows when no `img`.
     Set `steam:true` on a link for the dark Steam hover style.
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
    intro: "We're building the future of mobile games — fast, with craft and AI. Come build with us."
  },

  /* ===========================================================
     CAREERS — open roles
     `id` is used for the DOM id + mailto subject slug.
     =========================================================== */
  jobs: [
    {
      id: 'unity-developer',
      title: 'Unity Developer',
      location: 'Hanoi / Remote',
      type: 'Full-time',
      intro: "You'll be in the engine all day — building tight game systems, optimizing for mobile, and shipping fast. We value people who can balance speed with clean architecture.",
      responsibilities: [
        'Develop core gameplay mechanics and game systems in Unity (C#).',
        'Profile and optimize performance for iOS and Android across mid-to-low-end devices.',
        'Integrate third-party SDKs: analytics, ads, push notifications, IAP.',
        'Collaborate closely with designers and artists through rapid iteration loops.',
        'Support live-ops updates: A/B tests, feature flags, content deploys.'
      ],
      requirements: [
        '3+ years of Unity development; shipped at least one title on a major store.',
        'Strong C# skills — clean code, SOLID principles, readable architecture.',
        'Experience with mobile performance bottlenecks (draw calls, GC, batching).',
        'Comfortable working with version control (Git) in a team workflow.'
      ],
      niceToHave: [
        'Experience with addressables, asset bundles, or modular content pipelines.',
        'Familiarity with AI-assisted development tools (Cursor, Copilot, etc.).',
        'Background in casual or hypercasual mobile genres.'
      ],
      benefits: [
        'Competitive salary benchmarked to market + performance bonus.',
        'Remote-friendly with async-first culture and flexible hours.',
        'Work on titles with real player traction — not greenfield forever.',
        'Access to premium AI/dev tools, covered by the studio.'
      ]
    },
    {
      id: 'game-designer',
      title: 'Game Designer',
      location: 'Hanoi',
      type: 'Full-time',
      intro: 'Own the feel of the game from first mechanic to launch meta. We need someone who thinks in systems, sweats the numbers, and has taste — because data and craft live side by side here.',
      responsibilities: [
        'Design and iterate on core gameplay loops, progression systems, and game economy.',
        'Write clear GDDs and feature specs that developers and artists can build from.',
        'Collaborate with the UA team to align design with player retention and monetization.',
        'Run playtests, analyze session data, and drive data-informed balance changes.',
        'Prototype new game concepts quickly in collaboration with engineering.'
      ],
      requirements: [
        '2+ years in mobile game design with at least one shipped title.',
        'Strong grasp of core loop design, meta-game, and F2P economy fundamentals.',
        'Comfortable interpreting analytics dashboards (retention, ARPU, D1/D7/D30).',
        'Clear communicator — can translate ideas into actionable specs.'
      ],
      niceToHave: [
        'Experience designing casual or music/rhythm genre games.',
        'Ability to prototype designs in Unity (prefab assembly level, no code required).',
        'Understanding of ASO and how design choices affect store positioning.'
      ],
      benefits: [
        'Direct influence on titles from day one — no committee layers.',
        'Competitive salary + bonus tied to game performance milestones.',
        'Work alongside founders who ship, not just manage.',
        'Flexible schedule; results over hours.'
      ]
    },
    {
      id: '2d-game-artist',
      title: '2D Game Artist',
      location: 'Hanoi / Remote',
      type: 'Full-time',
      intro: "Create the visuals that make players stop scrolling. We care deeply about art quality — so you'll have both high standards and great collaborators.",
      responsibilities: [
        'Create 2D game assets: characters, environments, UI elements, icons, and promo art.',
        'Design and maintain a consistent art style guide across a title.',
        'Animate characters and UI elements (Spine, frame-by-frame, or tween-based).',
        'Work with Unity developers to ensure assets are optimized and properly integrated.',
        'Contribute to store creatives: app icons, screenshots, feature graphics.'
      ],
      requirements: [
        'Strong 2D illustration portfolio — characters, environments, UI, or all three.',
        'Proficiency in Photoshop, Illustrator, or equivalent; Spine or similar.',
        'Understanding of game art constraints: texture atlases, sprite sheets, draw calls.',
        'Ability to work within and extend an established art direction.'
      ],
      niceToHave: [
        'Experience in casual mobile game art styles.',
        'Motion design or After Effects skills for UI/promo video.',
        'Familiarity with AI image generation as a concept/reference aid.'
      ],
      benefits: [
        'Art direction from a co-founder with deep film/commercial production background.',
        'Remote-friendly — work from anywhere with stable internet.',
        'Competitive salary + profit-sharing on shipped titles.',
        "Creative freedom within clear direction — we don't micromanage craft."
      ]
    },
    {
      id: '3d-artist-vfx',
      title: '3D Artist / VFX',
      location: 'Hanoi',
      type: 'Full-time',
      intro: "We blend 3D and VFX in ways most mobile studios don't bother with. If you come from advertising or film production and want to bring that quality bar into games, you'll fit right in.",
      responsibilities: [
        'Model, rig, and animate 3D characters, props, and environments for mobile/PC games.',
        "Create real-time VFX using Unity's particle system and Shader Graph / VFX Graph.",
        'Optimize assets for mobile constraints: poly counts, draw calls, texture budgets.',
        'Produce 3D elements for promotional materials, trailers, and store assets.',
        'Work with technical artists and devs to integrate assets cleanly into Unity.'
      ],
      requirements: [
        '3+ years in 3D art/VFX — game, film, advertising, or a mix.',
        'Proficiency in Maya, Blender, or 3ds Max; Substance Painter for texturing.',
        'Experience creating real-time VFX in Unity or Unreal.',
        'Portfolio showing both technical quality and artistic sensibility.'
      ],
      niceToHave: [
        'Background in 3D commercials or animated film production.',
        'Experience with cinematic rendering for trailers (Octane, Arnold, or similar).',
        'Shader / tech-art skills in Unity (HLSL, Shader Graph).'
      ],
      benefits: [
        'Work closely with senior art direction on cross-discipline projects.',
        'Work on cross-platform projects that ship to millions of players.',
        'Competitive salary + hardware/software budget.',
        'Tight team, fast feedback, genuine creative ownership.'
      ]
    },
    {
      id: 'user-acquisition-specialist',
      title: 'User Acquisition Specialist',
      location: 'Hanoi',
      type: 'Full-time',
      intro: "We've shipped games that hit 50M+ downloads. We need someone to run the growth engine on our next titles — owning media buying, creative testing, and scaling what works.",
      responsibilities: [
        'Plan, execute, and optimize UA campaigns across Meta, Google, AppLovin, Unity Ads, and TikTok.',
        'Manage creative testing pipelines: brief creatives, analyze CTR/CVR/ROAS, scale winners.',
        'Monitor campaign performance daily — adjust bids, budgets, and audiences.',
        'Work with the design team to brief and iterate on ad creatives based on data.',
        'Track SKAN/ATT attribution, MMPs (AppsFlyer/Adjust), and cohort metrics.'
      ],
      requirements: [
        '2+ years in mobile UA, specifically in gaming (casual or hypercasual preferred).',
        'Hands-on experience managing $50K+/month ad spend across at least two platforms.',
        'Strong analytical mindset — comfortable with Sheets and attribution dashboards.',
        'Understanding of iOS privacy changes and their impact on measurement.'
      ],
      niceToHave: [
        'Experience with programmatic or DSP buying.',
        'ASO knowledge and understanding of organic/paid interplay.',
        'Ability to brief creative concepts for UA — not just analyze after the fact.'
      ],
      benefits: [
        "Own the UA strategy, not just execute orders — you'll have real budget authority.",
        "Work on titles with proven retention; you're scaling something that already works.",
        'Competitive base + performance bonus tied to ROAS and CPI targets.',
        'Access to best-in-class MMP, analytics, and creative tools.'
      ]
    }
  ]
};
