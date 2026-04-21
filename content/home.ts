// All homepage copy lives here — the single edit surface.
// Updated from Nirmaan_Website_Content.docx

export const nav = {
  logoAlt: "Nirmaan",
  links: [
    { label: "Why Nirmaan", href: "#why" },
    { label: "Product", href: "#solution" },
    { label: "Solution", href: "#use-cases" },
    { label: "Get in touch", href: "#contact" },
  ],
  signIn: "Sign in",
  demo: "Download App",
};

export const hero = {
  eyebrow: "Personalized 1:1 learning — anytime, anywhere, at any level.",
  titlePre: "An AI tutor that actually ",
  titleEm: "teaches,",
  titleHl: "",
  titlePost: "just like a human teacher.",
  sub: "Nirmaan teaches through conversations, visuals, and step-by-step guidance — so you don't just get answers, you truly understand.",
  ctaPrimary: "Download the App",
  ctaSecondary: "See how it works", // Keeping this as a placeholder since doc only has Download App button
  floatingTags: [
    { label: "Finally, learning that feels personal.", top: "8%", left: "-6%", variant: "accent" as const },
    { label: "Scroll ↓", bottom: "18%", right: "-4%", variant: "accent" as const },
  ],
};

export const problemScenes = [
  {
    tag: "THE PROBLEM (PART 1)",
    title: "The teacher explains it once in class.",
    body: "You didn't fully get it. But there's no time to stop — the chapter moved on.",
  },
  {
    tag: "Classroom",
    title: "You think of asking…",
    body: "But the class had 40 students and too little time. The bell rings. And your question stays with you.",
  },
  {
    tag: "At Home",
    title: "Later at home, you try to figure it out on your own.",
    body: "The textbook explains it the same way — and it still doesn't make sense. YouTube has a hundred videos, but not the way you need.",
  },
  {
    tag: "The Surrender",
    title: "So the doubt stays.",
    body: "And 'later' quietly turns into never. You had to move on.",
  },
];

export const compound = {
  title: "One small gap is missed.",
  body: "And slowly, many connected concepts begin to break silently. Until this grows into a large, permanent gap… …affecting years that come next in the student's learning journey.",
  chip: "Permanent Learning Gap",
};

export const whatIf = {
  kicker: "",
  titlePre: "What if you had a ",
  titleHl: "personal tutor",
  titlePost: " who understood exactly how you learn and was available anytime you needed?",
  bullets: [
    { text: "A tutor that knows where your gaps are.", variant: "orange" as const },
    { text: "Teaches anytime you need, for as long as you need — until you truly understand.", variant: "sky" as const },
    { text: "Explains through conversation, visuals, and drawings — tailored to how you understand best.", variant: "violet" as const },
    { text: "And costs far less than a traditional tutor.", variant: "mint" as const },
  ],
};

export const meetNirmaan = {
  kicker: "Meet Nirmaan",
  title: "An AI tutor that teaches like the best human tutor you've ever had.",
  meta: "Not a chatbot. Not a video library. A real 1:1 tutor that teaches through conversations and visuals.",
  closing: "So learning finally feels simple. Clear. And personal.",
  cards: [
    {
      heading: "Teaches through voice-based conversation",
      body: "Two-way. It asks. It listens. It responds. Adapts in real time, like a tutor sitting next to you. Explains every concept on screen, clearly.",
      chips: ["Two-way", "Adapts", "Conversational"],
      points: [
        "Two-way voice — it asks, listens, and responds in real time.",
        "Adapts like a tutor sitting next to you, not a scripted bot.",
        "Explains every concept clearly, right on your screen.",
      ],
    },
    {
      heading: "Explains Visually",
      body: "Uses diagrams, visuals, and step-by-step breakdowns. Drawn live on a whiteboard to make complex concepts simple. Everything is generated instantly around exactly what you don't understand.",
      visual: "board" as const,
      points: [
        "Diagrams and step-by-step breakdowns drawn live on a whiteboard.",
        "Generated instantly around exactly what you don't understand.",
        "Makes complex concepts feel simple and visual.",
      ],
    },
    {
      heading: "Solves Doubts Instantly",
      body: "No waiting. No fixed schedules. Learn whenever you're stuck. Re-explains concepts in different ways until it clicks. Checks if you've actually understood before moving on.",
      visual: "memory" as const,
      points: [
        "No waiting, no fixed schedules — learn the moment you're stuck.",
        "Re-explains in different ways until it actually clicks.",
        "Checks that you've understood before moving on.",
      ],
    },
    {
      heading: "Hyper-Personalized for You",
      body: "Understands your gaps, pace, and level — and adapts every explanation to you. Learns how you think, what works, and what doesn't. Gets better at teaching you the more you use it.",
      chip: "Personalized",
      points: [
        "Understands your gaps, pace, and level — adapts every explanation.",
        "Learns how you think, what works, and what doesn't.",
        "Gets better at teaching you the more you use it.",
      ],
    },
  ],
};

export const simPower = {
  kicker: "Powered by SIM",
  title: ["Nirmaan doesn't just teach.", "It understands", "you first."] as const,
  bullets: [
    { text: "Builds a complete model of you — your strengths, your gaps, how you learn.", variant: "orange" as const },
    { text: "Knows what you've mastered, what's shaky, and what's been missing for years.", variant: "orange" as const },
    { text: "Nirmaan doesn't just respond. It continuously learns how you think, where you struggle, and what works for you.", variant: "orange" as const },
  ],
  cta: "See SIM in action",
  closing: "A real tutor doesn't just explain. They understand you first.",
};

export const demoVideo = {
  kicker: "See it teach",
  title: "Watch Nirmaan explain a concept.",
  meta: "Watch Nirmaan explain a concept.",
  caption: "No scripts. No edits. A real teaching conversation.",
  poster: "/video/demo-poster.jpg",
  src: "/video/demo.mp4",
};

export const useCases = {
  kicker: "Who it's for",
  title: "Built for every learner. Designed for real impact.",
  meta: "Better learning. Deeper understanding. Stronger outcomes.",
  student: {
    heading: "For Students",
    body: "Learn anything. Anytime. At any level. From Grade 5 math to engineering thermodynamics. From clearing a simple doubt at midnight to mastering an entire subject from scratch. One tutor. Every level. No limits.",
    subjects: [
      { label: "Download App", variant: "accent" as const },
    ],
    more: "Get Started",
  },
  school: {
    heading: "For Schools",
    body: "See what the classroom can't show you. Micro-level insights into every student — where they're stuck, how they learn, what they need next. Nirmaan doesn't replace teachers. It gives them superpowers.",
    stats: [
      { num: 100, label: "Micro-level insights", suffix: "%" },
    ],
  },
};

export const testimonials = {
  kicker: "What people say",
  title: "Don't take our word for it.",
  meta: "Success stories from our users",
  items: [
    {
      text: "For the first time, I could see where she was actually struggling — not just the marks, but why she was stuck.",
      name: "Parent",
      role: "Bangalore",
      initials: "P",
      avatar: "orange" as const,
    },
    {
      text: "It explains things in a way that actually makes sense. I wish I had this two years ago.",
      name: "Student",
      role: "Class 10, CBSE",
      initials: "S",
      avatar: "ink" as const,
    },
    {
      text: "The diagnostic reports showed me gaps I didn't know existed in my class. Game changer for teachers.",
      name: "Science Teacher",
      role: "Bangalore",
      initials: "T",
      avatar: "orange" as const,
    },
  ],
};

export const trustLogos = {
  header: "Trusted by schools and learning partners",
  logos: [
    "School 1",
    "School 2",
    "School 3",
    "Partner 1",
    "Partner 2",
  ],
};

export const blog = {
  kicker: "From the blog",
  title: "Exploring how students think<br>learn and grow",
  meta: "Insights from our team",
  posts: [
    {
      chip: "Learning",
      titlePre: "Why students say ",
      titleEm: "'I'm not a math person'",
      titlePost: " — and what's really going on.",
      desc: "The confidence problem behind the learning gap.",
      art: "waves" as const,
    },
    {
      chip: "Product",
      titlePre: "How ",
      titleEm: "Nirmaan's AI tutor",
      titlePost: " actually teaches — not just answers.",
      desc: "The difference between a chatbot and a tutor.",
      art: "nodes" as const,
    },
    {
      chip: "Schools",
      titlePre: "What ",
      titleEm: "teachers",
      titlePost: " see when they use Nirmaan in classrooms.",
      desc: "Micro-level diagnostics that change how teachers teach.",
      art: "bell" as const,
    },
  ],
};

export const closingCTA = {
  tag: "Closing Statement",
  manifesto: [
    "The future of a nation depends on how its students learn today.",
    "And real learning only happens when every student has access to the right guidance at the right time.",
    "Now, that kind of learning is finally accessible — through Nirmaan.",
  ],
  title: "One session. That's all it takes.",
  ctaPrimary: "Start a Free Lesson →",
  ctaSecondary: "Talk to Our Team",
  backToTop: "Back to top \u2191",
};

export const contact = {
  kicker: "Let's talk",
  title: "Get in touch.",
  meta: "We'd love to hear from you.",
  form: {
    nameLabel: "Name",
    namePlaceholder: "Your Name",
    emailLabel: "Email",
    emailPlaceholder: "Your Email",
    roleLabel: "I am a...",
    roles: ["Student", "Parent", "School", "Other"],
    messageLabel: "Message",
    messagePlaceholder: "Write your message here...",
    submit: "Send Message",
    sending: "Sending\u2026",
    sentChip: "Sent",
    sentLine: "Thank you. We'll get back to you soon.",
  },
  direct: {
    heading: "Or contact us directly.",
    email: "hello@nirmaan.education",
    phone: "+91 843 1234 711",
    location: "Bangalore · India",
    compliance: [
      { label: "SOC-2", variant: "default" as const },
      { label: "COPPA", variant: "default" as const },
      { label: "ISO 27001", variant: "default" as const },
    ],
  },
};

export const footer = {
  tagline: "Shaping a generation that Thinks, Feels, and Leads.",
  compliance: ["SOC-2", "COPPA", "ISO 27001"],
  columns: [
    {
      heading: "PRODUCT",
      links: [
        { label: "For Students", href: "#use-cases" },
        { label: "For Schools", href: "#use-cases" },
        { label: "Download App", href: "#top" },
      ],
    },
    {
      heading: "COMPANY",
      links: [
        { label: "About", href: "#meet" },
        { label: "Blog", href: "#blog" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      heading: "LEGAL",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ],
  bottom: {
    copyright: "\u00A9 2026 Nirmaan Education. All rights reserved.",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Built in Bangalore 🇮🇳", href: "#" },
    ],
  },
};
