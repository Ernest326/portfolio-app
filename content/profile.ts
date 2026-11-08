export interface TimelineEntry {
  period?: string;
  title: string;
  subtitle?: string;
  summary?: string;
  href?: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export const profile = {
  name: 'Ernest Warzuchowski',
  siteName: 'Ernestooo.dev',
  headline: 'Computer Science & Software Engineering student at Maynooth University',
  intro: [
    "Hello! I'm Ernest, a Computer Science & Software Engineering student at Maynooth University, graduating in 2027. I have a huge passion for technology, programming and electronics, and I love to explore and learn new things.",
    "Most of what I build sits somewhere between game engines and graphics, full-stack web apps and AI. I'm also a VR enthusiast, and outside of programming I enjoy art, music, chess and working out.",
  ],
  email: 'ernest.w.work@gmail.com',
  siteUrl: 'https://www.ernestooo.dev',
  cvPath: '/cv.pdf',
  links: {
    github: 'https://github.com/Ernest326',
    linkedin: 'https://www.linkedin.com/in/ernest-warzuchowski-63b85b306',
  },
};

export const experience: TimelineEntry[] = [
  {
    period: 'Sep – Dec 2026',
    title: 'Lab Demonstrator',
    subtitle: 'Maynooth University',
    summary: 'Part-time lab demonstrator between timetable gaps, returning after a previous year in the role.',
  },
  {
    period: 'Feb – Jul 2026',
    title: 'Software Engineer Intern',
    subtitle: 'Mastercard, Dublin',
    summary: 'College placement as a software engineer, taking on the standard workload alongside my team.',
  },
  {
    period: 'Jun 2025 – Present',
    title: 'Director, CISO & DPO',
    subtitle: 'Proptech Deliverables Limited',
    summary: 'Director of a startup I started in college with friends, responsible for information security and data protection.',
  },
  {
    period: '2024 – Present',
    title: 'Computer Science Tutor',
    summary: 'Helping students who are struggling with their coursework.',
  },
];

export const skills: SkillGroup[] = [
  { label: 'Languages', items: ['C++', 'C#', 'C', 'Java', 'JavaScript', 'TypeScript', 'Python', 'SQL'] },
  { label: 'Web & cloud', items: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'MUI', 'Tailwind', 'Azure', 'AWS'] },
  { label: 'Graphics & games', items: ['OpenGL', 'Vulkan', 'Unity', 'Unreal Engine', 'Blender'] },
  { label: 'AI & robotics', items: ['PyTorch', 'ROS2', 'Computer vision'] },
  { label: 'Tools', items: ['Git', 'CMake', 'Jenkins', 'Splunk', 'Dynatrace', 'Linux'] },
  { label: 'Hardware', items: ['Arduino & ESP', 'Raspberry Pi', 'KiCad', 'SolidWorks', 'Soldering', '3D printing'] },
];

export const education: TimelineEntry[] = [
  {
    period: '2023 – 2027',
    title: 'B.Sc. Computer Science & Software Engineering',
    subtitle: 'Maynooth University',
    summary:
      'Final year project: Semantic Mapping and Navigation with a Mobile Robot, a ROS2 node built for object detection, mapping and a human input query service.',
  },
  {
    period: '2018 – 2023',
    title: 'Leaving Certificate, 556 points',
    subtitle: 'Portlaoise College',
  },
];

export const community: TimelineEntry[] = [
  {
    period: '2022 – Present',
    title: 'CoderDojo Mentor',
    subtitle: 'CoderDojo Portarlington',
    summary: 'Started off teaching Unity, now teaching Python.',
  },
  {
    period: 'May 2026',
    title: 'STEM Passport Mentor',
    subtitle: 'Mastercard',
    summary: 'Mentored DEIS secondary school students over three days as they developed banking app ideas.',
  },
  {
    period: '2023 – 2025',
    title: 'Student Representative',
    subtitle: 'Maynooth University',
    summary: '2nd year Computer Science representative, and 1st year representative in the Computer Science Society.',
  },
  {
    period: '2022 – 2024',
    title: 'Demo Facilitator',
    subtitle: 'Makerspace Portarlington',
    summary: 'Ran VR and 3D printing demos at STEM events and summer camps, including a STEAM event at Aviva promoting women in STEM.',
  },
  {
    period: '2025 – 2026',
    title: 'Festival Volunteer',
    subtitle: 'Electric Picnic & ForestFest',
    summary: 'Assisted at the Electric Picnic Air Hubs and ran VR headset demos at ForestFest.',
  },
];

export const hackathons: TimelineEntry[] = [
  {
    period: '2026',
    title: 'Huawei Tech Arena',
    subtitle: 'Online · team of 4',
    summary: 'Competed with three other students and placed 25th out of 76 teams in the online first stage.',
  },
  {
    period: '2026',
    title: 'SPARK Innovation',
    subtitle: 'Mastercard · team of 4',
    summary: "Competed with three other interns in our department's innovation competition, building a local MCP log analyser.",
  },
  {
    period: '2025',
    title: 'Civilizations Coding Competition',
    subtitle: 'Maynooth',
    summary: 'Won the Solo Competitor Award.',
  },
  {
    period: '2023',
    title: 'Supermaker',
    subtitle: 'Online hackathon',
    summary: 'Built a level editor and web game engine with a friend in around 24 hours.',
    href: '/projects/supermaker',
  },
  {
    period: '2021',
    title: 'Coolest Projects',
    subtitle: 'Online',
    summary: 'Showcased a Python voice-controlled assistant, built during COVID.',
    href: '/projects/smart-glasses',
  },
  {
    period: '2019',
    title: 'Coolest Projects',
    subtitle: 'In person',
    summary: 'Showcased a zombie shooter built in Unity.',
  },
];

export const achievements: TimelineEntry[] = [
  {
    period: '2025',
    title: 'Founded my first startup',
    subtitle: 'Deliverables',
    summary: 'Formed with my colleagues.',
  },
  {
    title: 'Offered a Microsoft internship',
  },
  {
    period: '2024 – 2025',
    title: 'Microsoft Mentorship Programme',
    summary: 'Selected for the programme and built Deliverables, a full-stack parcel tracking app, with classmates.',
    href: '/projects/microsoft-deliverables',
  },
  {
    title: 'Google Cybersecurity Fundamentals',
    subtitle: 'Coursera certificate',
  },
  {
    title: 'MongoDB fundamentals',
    subtitle: 'MongoDB badges',
  },
];

export const glance: Array<{ label: string; value: string }> = [
  { label: 'Now', value: 'Final-year B.Sc. Computer Science & Software Engineering at Maynooth University' },
  { label: 'Building', value: 'Semantic mapping & navigation for a mobile robot (ROS2)' },
  { label: 'Previously', value: 'Software Engineer Intern at Mastercard' },
  { label: 'Focus', value: 'Game engines & graphics, full-stack web, AI' },
  { label: 'Based in', value: 'Ireland' },
];
