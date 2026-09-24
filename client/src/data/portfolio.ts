// All portfolio content lives here. Edit this file to personalise the site;
// the components and pages read from it and don't need to change.
// Anything marked TODO is placeholder text to replace with your own details.

import type { Accent } from '../components/accents'

export type Social = { label: string; url: string }

export type Project = {
  title: string
  description: string
  tech: string[]
  liveUrl?: string
  repoUrl?: string
}

export type SkillGroup = { category: string; items: string[] }

export type Job = {
  role: string
  company: string
  location?: string
  period: string
  points: string[]
}

export type Credential = {
  credential: string
  institution: string
  location: string
  period: string
  highlights?: string[]
}

export type FocusArea = {
  slug: string // URL path, e.g. /web-development
  title: string
  navLabel: string // short label for the navbar
  accent: Accent
  tagline: string // one line, shown on the home page card
  summary: string // intro paragraph at the top of the page
  highlights: string[] // "What I do"
  skills: SkillGroup[]
  coursework: string[] // relevant courses from the IT Solutions program
  projects: Project[]
}

export const profile = {
  name: 'Jeffrey Bradford Lamptey',
  role: 'IT Solutions Professional',
  tagline:
    'I build web applications, keep systems and databases running smoothly, and turn raw data into clear business insight.',
  location: 'Toronto, ON',
  email: 'jeffbradford32@gmail.com',
  // Put your resume in client/public/resume.pdf and it will be served at this path.
  resumeUrl: '/resume.pdf',
  socials: [
    { label: 'GitHub', url: 'https://github.com/bradfordjeffrey' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jeffrey-lamptey-69a182390/' },
  ] satisfies Social[],
}

export const about: string[] = [
  "I'm an IT professional based in Toronto with over 7 years of hands-on experience in end-user technical support, device provisioning and cloud account administration across Microsoft 365 and Entra ID (Azure AD). I hold a B.Sc. in Information Technology and a Post-Graduate Certificate in Information Technology Solutions from Humber Polytechnic.",
  "My skill set spans IT operations, web development, business and data analytics, and data administration. I enjoy working where technology meets the business: supporting the people who use it, keeping systems secure and reliable, automating repetitive work with Python, Bash and PowerShell, and making sure data is accurate and put to good use.",
]

// Most recent first.
export const education: Credential[] = [
  {
    credential: 'Post-Graduate Certificate in Information Technology Solutions',
    institution: 'Humber Polytechnic',
    location: 'Toronto, ON',
    period: 'Sep 2024 – Apr 2026',
    highlights: [
      'Honours standing in every term',
      'Cumulative average of 86.8%',
      'Top results: Business Intelligence (98%), Data Modelling & Reporting with SQL (96%), SQL Server Database Development (95%), Web Programming & Design (94%), SQL Server Administration (94%)',
      'Capstone: Blockchain & Hugging Face AI Integration',
    ],
  },
  {
    credential: 'Bachelor of Science in Information Technology',
    institution: 'Kings University College',
    location: 'Accra, Ghana',
    period: 'Jan 2015 – Sep 2019',
  },
]

// Home page number counters (they count up when scrolled into view).
export type Stat = { value: number; label: string; decimals?: number; suffix?: string }

export const stats: Stat[] = [
  { value: 7, suffix: '+', label: 'Years of IT experience' },
  { value: 86.8, decimals: 1, suffix: '%', label: 'Post-grad cumulative average' },
  { value: 90, suffix: '%', label: 'Faster invoicing through automation' },
  { value: 23, label: 'IT courses completed' },
]

// Tools shown in the scrolling strip on the home page.
export const toolbelt: string[] = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'PHP', 'Java', 'SQL Server', 'MySQL',
  'Power BI', 'Excel', 'Python', 'Pandas', 'Hadoop', 'Spark', 'TensorFlow', 'Microsoft 365',
  'Entra ID', 'PowerShell', 'Bash', 'Zendesk', 'Jira', 'Linux', 'Windows', 'macOS', 'Hugging Face',
  'Git', 'Lightroom', 'Premiere Pro',
]

export const focusAreas: FocusArea[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    navLabel: 'Web Dev',
    accent: 'sky',
    tagline: 'Responsive, full-stack web applications, from the interface to the database.',
    summary:
      'I design and build modern web applications end to end: clean, responsive front ends, server-side logic and APIs, and the databases that power them. I focus on writing maintainable code using proven data structures and design patterns.',
    highlights: [
      'Build responsive, accessible interfaces with HTML, CSS, JavaScript and React',
      'Develop server-side applications and REST APIs with Node.js, Express and PHP',
      'Design relational databases and connect them to web applications with SQL',
      'Apply object-oriented programming, data structures and design patterns in Java',
    ],
    skills: [
      { category: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'XML'] },
      { category: 'Backend', items: ['Node.js', 'Express', 'PHP', 'Laravel', 'Java', 'REST APIs'] },
      { category: 'Data & Tools', items: ['SQL Server', 'MySQL', 'Git', 'GitHub', 'VS Code'] },
    ],
    coursework: [
      'Web Programming and Design',
      'XML and JavaScript',
      'Web Programming & Frameworks 1',
      'Web Programming & Frameworks 2',
      'Web Application Development using PHP',
      'Java Programming 1',
      'Advanced Java Programming',
      'Data Structures and Design Patterns',
    ],
    projects: [
      {
        title: 'Personal Portfolio',
        description:
          'This website: a multi-page React and TypeScript site with an Express API that validates, rate-limits and emails contact-form messages.',
        tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express'],
        repoUrl: 'https://github.com/bradfordjeffrey/my-portfolio',
      },
      {
        title: 'FleetFlow: Transport Management System',
        description:
          'A web application I conceived, designed and built for managing a transport company’s vehicles, drivers, customer rentals, maintenance, driver work-and-pay contracts, payments and expenses, with role-based accounts for admins, managers, mechanics and drivers. I designed the whole system, including its fully normalised (3NF) MySQL database of nine related tables. Built as a group course project.',
        tech: ['PHP', 'Laravel', 'MySQL', 'Eloquent ORM'],
      },
    ],
  },
  {
    slug: 'it-operations',
    title: 'IT Operations',
    navLabel: 'IT Ops',
    accent: 'emerald',
    tagline: 'User support, secure devices and accounts, and automated, reliable systems.',
    summary:
      'With over 7 years in technical support, I keep people productive and systems secure. I manage user accounts and access in Microsoft 365 and Entra ID, image and harden laptops, resolve support tickets within SLA, troubleshoot networks, and automate routine administration with PowerShell, Python and Bash.',
    highlights: [
      'Resolve end-user support tickets within SLA using Zendesk and Jira Service Desk',
      'Manage account lifecycles, MFA, security groups and mailboxes in Microsoft 365 and Entra ID (Azure AD)',
      'Image, stage and harden Windows and macOS devices with least-privilege controls',
      'Troubleshoot network connectivity: VPN, Wi-Fi, routers, switches and static IP addressing',
      'Automate repetitive administration tasks with PowerShell, Python and Bash',
      'Administer SQL Server security, backups and performance, and keep IT asset inventories up to date',
    ],
    skills: [
      {
        category: 'Identity & Access',
        items: ['Microsoft 365', 'Entra ID (Azure AD)', 'MFA', 'Security groups & RBAC', 'Onboarding & offboarding', 'Least-privilege access'],
      },
      {
        category: 'Endpoints & Systems',
        items: ['Windows 10/11', 'macOS', 'Linux', 'iOS & Android', 'OS imaging & hardening', 'Hardware upgrades', 'SQL Server'],
      },
      {
        category: 'Networking & Service Desk',
        items: ['TCP/IP & subnetting', 'VPN support', 'Routers & switches', 'Zendesk', 'Jira Service Desk', 'TeamViewer, AnyDesk & RDP'],
      },
      {
        category: 'Automation',
        items: ['PowerShell', 'Python', 'Bash', 'Knowledge base authoring'],
      },
    ],
    coursework: [
      'Operating Systems',
      'Advanced Operating Systems',
      'SQL Server Administration',
      'Project Management',
      'Requirements Analysis and Process Modelling',
      'Capstone Project',
    ],
    projects: [
      {
        title: 'Automated Communications & OS Scripting',
        description:
          'Wrote custom Python and Bash scripts to automate file handling and repetitive communication workflows, and PowerShell scripts to configure OS preferences and automate routine Windows administration.',
        tech: ['Python', 'Bash', 'PowerShell', 'Windows', 'Linux'],
      },
      {
        title: 'Invoicing Workflow Automation',
        description:
          'At Bradford Brothers Transport, automated operational tracking workflows with conditional logic, improving real-time invoicing efficiency by 90%.',
        tech: ['Workflow automation', 'JavaScript', 'Troubleshooting'],
      },
    ],
  },
  {
    slug: 'data-analytics',
    title: 'Business & Data Analytics',
    navLabel: 'Analytics',
    accent: 'violet',
    tagline: 'Turning data into dashboards, reports and decisions.',
    summary:
      'I help organisations make better decisions with their data. I model and query data with SQL, build business intelligence dashboards and reports, work with big data platforms, and apply machine learning to find patterns and make predictions.',
    highlights: [
      'Build interactive business intelligence dashboards and KPI reports',
      'Design data models and write advanced SQL queries for reporting',
      'Process and analyse large datasets with big data tools',
      'Apply machine learning and deep learning models to real business problems',
    ],
    skills: [
      { category: 'Business Intelligence', items: ['Power BI', 'Excel', 'Dashboards & KPIs', 'Data visualisation'] },
      { category: 'Data & SQL', items: ['SQL', 'Data modelling', 'SQL Server', 'Data cleaning'] },
      { category: 'Big Data & ML', items: ['Python', 'Pandas', 'Hadoop', 'Spark', 'Scikit-learn', 'TensorFlow'] },
    ],
    coursework: [
      'Business Intelligence',
      'Implementing Data Modelling and Reporting with SQL',
      'Fundamentals of Data Analytics',
      'Big Data 1',
      'Big Data 2',
      'Machine Learning',
      'Deep Learning',
    ],
    projects: [
      // TODO: replace with your real projects
      {
        title: 'Sales Performance Dashboard',
        description:
          'Describe a BI dashboard you built: the data source, the key metrics it tracks, and the insights it revealed.',
        tech: ['Power BI', 'SQL', 'Excel'],
      },
      {
        title: 'Blockchain & Hugging Face AI Integration (Capstone)',
        description:
          'Integrated open-source AI models through Hugging Face APIs to build an audio-to-text feature that automates workflow inputs, and used Python scripts and API endpoints to streamline data ingestion, reducing manual processing time.',
        tech: ['Python', 'Hugging Face', 'REST APIs', 'Blockchain'],
      },
    ],
  },
  {
    slug: 'data-administration',
    title: 'Data Entry & Administration',
    navLabel: 'Data Admin',
    accent: 'amber',
    tagline: 'Fast, accurate data entry and well-organised, trustworthy records.',
    summary:
      'I make sure an organisation\'s data is accurate, complete and easy to find. I handle high-volume data entry with a strong eye for detail, maintain and validate records in spreadsheets and databases, and produce clear reports, while treating sensitive information with care.',
    highlights: [
      'Enter and update high volumes of data quickly and accurately',
      'Validate, clean and de-duplicate records to keep data reliable',
      'Maintain organised records in Excel, databases and document systems',
      'Produce reports and summaries, and handle confidential information responsibly',
    ],
    skills: [
      {
        category: 'Data Entry',
        items: ['Fast, accurate typing', 'Data validation', 'Data cleaning', 'Records management'],
      },
      {
        category: 'Tools',
        items: ['Microsoft Excel', 'Pivot tables & lookups', 'Microsoft Word', 'Outlook', 'SQL databases'],
      },
      {
        category: 'Administration',
        items: ['Attention to detail', 'Confidentiality', 'Reporting', 'Organisation & time management'],
      },
    ],
    coursework: [
      'Introduction to Database and SQL',
      'SQL Server Database Development',
      'Implementing Data Modelling and Reporting with SQL',
      'Fundamentals of Data Analytics',
      'Requirements Analysis and Process Modelling',
    ],
    projects: [
      {
        title: 'IT Asset Inventory Management',
        description:
          'At HPW Fresh & Dry, maintained comprehensive IT asset inventories tracking hardware serial numbers, software assignments and deployment histories across the company\'s workstations.',
        tech: ['Asset management', 'Excel', 'Records management'],
      },
      {
        title: 'Account Lifecycle Records',
        description:
          'At MTN Ghana, kept user account data accurate across Microsoft 365 and Entra ID through onboarding and offboarding, and logged 30–35 support tickets weekly in Zendesk with complete, SLA-compliant records.',
        tech: ['Microsoft 365', 'Entra ID', 'Zendesk'],
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Photography & Videography page (/photo-video)
// ---------------------------------------------------------------------------

export type Photo = {
  src: string // image in client/public/photography/, e.g. '/photography/sunset.jpg'
  alt: string // short description for screen readers and SEO
  category: string // used for the filter buttons, e.g. 'Portraits'
  caption?: string // shown in the full-screen viewer
  width?: number // pixel size of the image file (printed by `npm run photos`)
  height?: number
}

export type Video = {
  title: string
  description?: string
  // Use ONE of these:
  youtubeId?: string // the part after "v=" in a YouTube link, e.g. 'dQw4w9WgXcQ'
  vimeoId?: string // the number at the end of a Vimeo link
  src?: string // a video file in client/public/videos/, e.g. '/videos/reel.mp4'
  poster?: string // optional preview image for a self-hosted video
}

export const creative = {
  slug: 'photo-video',
  title: 'Photography & Videography',
  navLabel: 'Photo & Video',
  accent: 'rose' as Accent,
  tagline: 'Capturing people, places and moments through the lens.',
  summary:
    "Beyond IT, I'm passionate about photography and videography. I enjoy telling stories visually, from composing the shot to editing the final image or film. Here is a selection of my work.",
  specialties: ['Cityscapes', 'Travel', 'Events', 'Street', 'Nature', 'Adventure', 'Video editing'], // TODO: adjust
  tools: ['Adobe Lightroom', 'Adobe Photoshop', 'Adobe Premiere Pro', 'DaVinci Resolve'], // TODO

  // Your photos. Resized copies live in client/public/photography/ (see README: "Adding photos").
  // The first three are also shown on the home page, cropped to portrait (3:4), so keep portrait shots first.
  // width/height are the resized image's size; they let the page reserve space so nothing jumps while loading.
  photos: [
    { src: '/photography/IMG_4390.webp', width: 1200, height: 1600, alt: 'Illuminated Toronto sign at night with the city skyline behind it', category: 'Cityscapes', caption: 'Toronto after dark' },
    { src: '/photography/IMG_9588.webp', width: 1200, height: 1600, alt: 'The Eiffel Tower above the trees on an overcast day', category: 'Travel', caption: 'Paris, Eiffel Tower' },
    { src: '/photography/IMG_4470.webp', width: 1200, height: 1600, alt: 'Mist rising from Horseshoe Falls above a rocky shoreline', category: 'Nature', caption: 'Horseshoe Falls, Niagara' },
    { src: '/photography/G0013740.webp', width: 1600, height: 1400, alt: 'Wide-angle selfie of a tandem paraglider flight over green hills', category: 'Adventure', caption: 'Tandem paragliding' },
    { src: '/photography/IMG_0235.webp', width: 1200, height: 1600, alt: 'Harbourfront FC entrance gate with visitors walking through', category: 'Events', caption: 'Harbourfront FC' },
    { src: '/photography/IMG_0455.webp', width: 1200, height: 1600, alt: 'Audience seated in a modern hall during a talk', category: 'Events', caption: 'Event coverage' },
    { src: '/photography/IMG_4835.webp', width: 1200, height: 1600, alt: 'Yellow Lamborghini Urus turning at a residential intersection in autumn', category: 'Street', caption: 'Yellow on the corner' },
    { src: '/photography/IMG_9580.webp', width: 1200, height: 1600, alt: 'Louis Vuitton storefront with red-lit window displays', category: 'Street', caption: 'Louis Vuitton storefront' },
    { src: '/photography/IMG_0177.webp', width: 1200, height: 1600, alt: 'Modern high-rise towers against a clear evening sky', category: 'Cityscapes', caption: 'Glass towers' },
    { src: '/photography/IMG_4294.webp', width: 1200, height: 1600, alt: 'City skyline seen over trees from beside a highway', category: 'Cityscapes', caption: 'Skyline from the road' },
  ] satisfies Photo[],

  // TODO: add your videos, e.g.
  // { title: 'Showreel 2026', description: 'Highlights from recent shoots.', youtubeId: 'abc123XYZ' },
  // { title: 'Wedding film', src: '/videos/wedding.mp4', poster: '/videos/wedding.jpg' },
  videos: [] as Video[],
}

// Most recent first.
export const experience: Job[] = [
  {
    role: 'Technical Support & Systems Coordinator (Contract)',
    company: 'Bradford Brothers Transport',
    location: 'Remote',
    period: 'Dec 2020 – Jan 2026',
    points: [
      'Served as the technical support contact for custom web-based tracking software, reading JavaScript application logic to find the root cause of user-reported issues.',
      'Automated operational tracking workflows using conditional logic, improving real-time invoicing efficiency by 90%.',
    ],
  },
  {
    role: 'Technical Support Representative / Field Specialist',
    company: 'Teledata Ghana',
    location: 'Ghana',
    period: 'Jan 2023 – Sep 2024',
    points: [
      'Diagnosed and resolved complex network connectivity issues involving VPNs, Wi-Fi, routers and Ethernet connections using standard diagnostic tools.',
      'Escalated specialised incidents to tier-2 engineering teams with clear diagnostic logs, screenshots and reproduction steps.',
    ],
  },
  {
    role: 'Technical Support Representative',
    company: 'MTN Ghana',
    location: 'Ghana',
    period: 'Aug 2021 – Dec 2022',
    points: [
      'Managed end-to-end account lifecycles, including provisioning, onboarding and offboarding, across Microsoft 365 and Entra ID (Azure AD).',
      'Provisioned and staged new laptops with standard corporate software builds, applying administrative privilege controls to block unauthorised installs.',
      'Administered MFA, role-based access control (RBAC), security groups and shared mailboxes for remote and hybrid teams.',
      'Triaged, logged and resolved 30–35 support tickets weekly in Zendesk while meeting SLA response standards.',
    ],
  },
  {
    role: 'Technical Support & Operations Specialist',
    company: 'HPW Fresh & Dry Limited',
    location: 'Ghana',
    period: 'Sep 2019 – Aug 2021',
    points: [
      'Ran the full workstation lifecycle: imaged, configured, deployed and maintained Windows 10/11 and macOS systems with pre-approved applications.',
      'Enforced security hygiene by restricting administrative privileges on end-user devices, requiring IT approval for non-standard software.',
      'Performed hardware repairs, RAM and SSD upgrades, system recoveries and Blue Screen (BSOD) troubleshooting.',
      'Maintained IT asset inventories tracking hardware serial numbers, software assignments and deployment histories.',
    ],
  },
  {
    role: 'IT Support Technician',
    company: 'iPro Solutions Limited',
    location: 'Ghana',
    period: 'Sep 2015 – Aug 2016',
    points: [
      'Assisted with server rack deployments, assigned static IP configurations for client workstations, and provided entry-level database support.',
    ],
  },
]
