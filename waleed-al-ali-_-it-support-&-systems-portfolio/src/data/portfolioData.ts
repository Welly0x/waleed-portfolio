export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  skills: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category: 'windows' | 'security' | 'networking' | 'in-progress';
  type: 'Official Certificate' | 'Learning Path' | 'Coursework' | 'In Progress';
  date?: string;
  duration?: string;
  credentialId?: string;
  skills: string[];
  description: string;
  verifyUrl?: string;
  isOfficialCredential: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  bullets: string[];
  tags: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Waleed Al-Ali",
    role: "IT Support | System Administration | Networking",
    location: "Dubai, United Arab Emirates",
    locationShort: "Dubai, UAE",
    phone: "+971 524836389",
    phoneHref: "tel:+971524836389",
    email: "Waleedalali210@gmail.com",
    emailHref: "mailto:Waleedalali210@gmail.com",
    linkedin: "https://www.linkedin.com/in/waleed-al-ali-aa5418298/",
    intro: "I'm a Computer Science graduate with a strong foundation in IT support, troubleshooting, networking, and Windows administration. I'm passionate about solving technical problems, supporting users, and continuously developing my skills in IT infrastructure and system administration.",
    aboutParagraphs: [
      "I'm a Computer Science graduate from Al-Balqa Applied University with a strong interest in IT support, system administration, networking, and cybersecurity.",
      "Through my academic studies, technical training, and hands-on labs, I've developed knowledge of Windows environments, Windows Server, Active Directory, Group Policy, networking fundamentals, and technical troubleshooting.",
      "I'm eager to apply my knowledge in a professional environment, gain practical experience, and continue growing as an IT professional."
    ],
    closingLine: "I'm always interested in connecting with professionals and exploring opportunities in IT support and system administration.",
    education: {
      degree: "Bachelor of Computer Science",
      university: "Al-Balqa Applied University",
      period: "2022 – 2026",
      status: "Graduate"
    },
    languages: [
      { name: "Arabic", level: "Native" },
      { name: "English", level: "Very Good (Professional Working Proficiency)" }
    ]
  },

  skills: [
    {
      id: "it-support",
      name: "IT Support",
      description: "End-user assistance, hardware diagnostics, and systematic software troubleshooting.",
      icon: "Headphones",
      skills: [
        "Technical Troubleshooting",
        "Hardware and Software Support",
        "Windows 10/11",
        "User Support",
        "System Backups & Recovery",
        "Remote Desktop Support",
        "User Account Management",
        "System Maintenance"
      ]
    },
    {
      id: "system-admin",
      name: "System Administration",
      description: "Enterprise directory structures, domain controllers, and centralized policy control.",
      icon: "Server",
      skills: [
        "Windows Server (2025/2022)",
        "Active Directory (AD DS)",
        "Group Policy (GPO)",
        "User and Group Management",
        "Microsoft Entra ID (Azure AD)",
        "Organizational Units (OUs)"
      ]
    },
    {
      id: "networking",
      name: "Networking",
      description: "Network architecture, protocol configuration, routing, and connectivity resolution.",
      icon: "Network",
      skills: [
        "TCP/IP Fundamentals",
        "DNS and DHCP",
        "IP Addressing & Subnetting",
        "Routing and Switching Fundamentals",
        "VLANs & Gateways",
        "Basic Network Troubleshooting"
      ]
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      description: "Security baselines, log inspection, and defensive lab experimentation.",
      icon: "ShieldCheck",
      skills: [
        "Security Fundamentals",
        "Cybersecurity Labs",
        "Basic Security Concepts",
        "SIEM & Splunk Concepts",
        "Log Analysis & Monitoring",
        "Threat Detection Basics"
      ]
    },
    {
      id: "tools-training",
      name: "Tools and Training",
      description: "Industry platforms, emulation suites, and ongoing professional coursework.",
      icon: "Terminal",
      skills: [
        "Cisco Packet Tracer",
        "TryHackMe Defense Labs",
        "CCNA Coursework",
        "CompTIA Security+ Coursework",
        "Nmap & Network Enumeration",
        "PowerShell & Command Line Basics"
      ]
    }
  ] as SkillCategory[],

  certifications: [
    {
      id: "thm-cyber-101",
      title: "Cyber Security 101 Learning Path",
      issuer: "TryHackMe",
      category: "security",
      type: "Official Certificate",
      date: "July 2, 2026",
      duration: "45 hours 23 minutes",
      credentialId: "THM-ACLEUTADCG",
      skills: ["Cyber Security Fundamentals", "Network Security", "Web Defense", "Host Security"],
      description: "Extensive 45-hour hands-on curriculum covering security fundamentals, offensive and defensive concepts, networking models, and practical lab environments.",
      verifyUrl: "https://tryhackme.com/p/waleed-al-ali",
      isOfficialCredential: true
    },
    {
      id: "li-entra-id",
      title: "Microsoft Entra ID for Administrators",
      issuer: "LinkedIn Learning",
      category: "windows",
      type: "Official Certificate",
      date: "September 17, 2026",
      duration: "2 hours 11 minutes",
      credentialId: "5462f87cabc8746b9f6f6ff46a0b330ffc1f2e46b1ffdeb1006d5b88bb346448",
      skills: ["System Administration", "Microsoft Entra ID", "Cloud Identity", "Access Management"],
      description: "Comprehensive guidance on modern cloud identity management, directory sync, user roles, security groups, and Microsoft Entra tenant administration.",
      verifyUrl: "https://www.linkedin.com/learning/certificates/5462f87cabc8746b9f6f6ff46a0b330ffc1f2e46b1ffdeb1006d5b88bb346448",
      isOfficialCredential: true
    },
    {
      id: "li-win-server-ad",
      title: "Windows Server 2025: Install and Configure Active Directory",
      issuer: "LinkedIn Learning",
      category: "windows",
      type: "Official Certificate",
      date: "September 13, 2026",
      duration: "1 hour 31 minutes",
      credentialId: "7140b0ca6544db558aa2fafe0d2acb30eaae42fbaf783e923b0ef04c48b1d8c7",
      skills: ["Windows Server", "Active Directory", "Domain Controller Promotion", "OU Design"],
      description: "Authoritative training on installing, deploying, and structuring Active Directory Domain Services (AD DS) in Windows Server 2025 enterprise environments.",
      verifyUrl: "https://www.linkedin.com/learning/certificates/7140b0ca6544db558aa2fafe0d2acb30eaae42fbaf783e923b0ef04c48b1d8c7",
      isOfficialCredential: true
    },
    {
      id: "li-win-server-gpo",
      title: "Windows Server 2025: Implementing Group Policy",
      issuer: "LinkedIn Learning",
      category: "windows",
      type: "Official Certificate",
      date: "September 14, 2026",
      duration: "1 hour 23 minutes",
      credentialId: "744c59300e79b95a152795132e7a05e84b6f8f096f68d81efbc9e332108cbc36",
      skills: ["Windows Server", "Group Policy (GPO)", "Administrative Templates", "Security Baselines"],
      description: "Configuration and deployment of Group Policy Objects (GPOs), policy inheritance, security filtering, and centralized workstation management.",
      verifyUrl: "https://www.linkedin.com/learning/certificates/744c59300e79b95a152795132e7a05e84b6f8f096f68d81efbc9e332108cbc36",
      isOfficialCredential: true
    },
    {
      id: "li-win-server-essential",
      title: "Windows Server 2025 Essential Training",
      issuer: "LinkedIn Learning",
      category: "windows",
      type: "Official Certificate",
      date: "September 12, 2026",
      duration: "3 hours 19 minutes",
      credentialId: "8b2a616a1a7ef1f99e26a13775499ce9560bdc4e1aa32484289845e791a642ea",
      skills: ["Windows Server", "Server Roles & Features", "Storage Services", "Server Manager"],
      description: "Foundational architecture, installation options, core server roles, storage management, virtualization concepts, and operational maintenance for Windows Server 2025.",
      verifyUrl: "https://www.linkedin.com/learning/certificates/8b2a616a1a7ef1f99e26a13775499ce9560bdc4e1aa32484289845e791a642ea",
      isOfficialCredential: true
    },
    {
      id: "li-win-11-admin",
      title: "Windows 11: Administration",
      issuer: "LinkedIn Learning",
      category: "windows",
      type: "Official Certificate",
      date: "August 30, 2026",
      duration: "1 hour 39 minutes",
      credentialId: "dfe74113c9efcd39a1054c280f660e3014e6f8b9c4803371960c3c71f95789ee",
      skills: ["Windows System Administration", "Windows Desktop Administration", "Windows 11"],
      description: "Modern desktop administration for client endpoints: system settings, security baselines, device encryption, servicing, and performance optimization.",
      verifyUrl: "https://www.linkedin.com/learning/certificates/dfe74113c9efcd39a1054c280f660e3014e6f8b9c4803371960c3c71f95789ee",
      isOfficialCredential: true
    },
    {
      id: "thm-pre-security",
      title: "Pre Security Learning Path",
      issuer: "TryHackMe",
      category: "security",
      type: "Learning Path",
      date: "Completed",
      skills: ["Networking Basics", "Web Architecture", "Linux Basics", "Windows Security"],
      description: "Fundamental training path covering computer networks, web protocols, and operating systems defense.",
      isOfficialCredential: false
    },
    {
      id: "cisco-ccna",
      title: "Cisco CCNA Coursework",
      issuer: "Cisco Academy / Self-Study",
      category: "networking",
      type: "Coursework",
      date: "Coursework Completed",
      skills: ["Network Access", "IP Connectivity", "IP Services", "Security Fundamentals"],
      description: "Completed comprehensive networking curriculum covering routing, switching, VLAN segmentation, and network diagnostics. Official Cisco certification examination pending.",
      isOfficialCredential: false
    },
    {
      id: "comptia-sec-plus",
      title: "CompTIA Security+ Coursework",
      issuer: "CompTIA Study Curriculum",
      category: "security",
      type: "In Progress",
      date: "Currently Studying",
      skills: ["Threats, Vulnerabilities & Attacks", "Identity & Access Management", "Risk Management"],
      description: "Active structured domain study preparing for the industry-standard CompTIA Security+ certification exam.",
      isOfficialCredential: false
    },
    {
      id: "thm-soc-1",
      title: "SOC Level 1 Learning Path",
      issuer: "TryHackMe",
      category: "in-progress",
      type: "In Progress",
      date: "In Progress",
      skills: ["Security Operations", "SIEM (Splunk)", "Log Analysis", "Incident Response"],
      description: "Hands-on progression through security operations center workflows, alert triaging, log analysis, and incident investigation.",
      isOfficialCredential: false
    }
  ] as CertificateItem[],

  projects: [
    {
      id: "windows-server-lab",
      title: "Windows Server & Administration Lab",
      category: "System Administration",
      tagline: "Enterprise domain configuration, user access administration, and policy enforcement in virtual hypervisor environments.",
      bullets: [
        "Configured Windows Server inside an isolated hypervisor test environment.",
        "Set up Active Directory Domain Services (AD DS) and organized users, groups, and organizational units (OUs).",
        "Authored and enforced Group Policy Objects (GPO) for enterprise security policies and desktop baselines.",
        "Performed Windows backup and disaster recovery procedures, verifying system state integrity.",
        "Practiced routine Windows administrative troubleshooting and user account lifecycle tasks."
      ],
      tags: ["Windows Server", "Active Directory", "Group Policy (GPO)", "Hyper-V / VMware", "System Backup"]
    },
    {
      id: "cisco-packet-tracer",
      title: "Packet Tracer Networking Topologies",
      category: "Networking",
      tagline: "End-to-end multi-subnet network architecture, VLAN segmentation, and routing simulation.",
      bullets: [
        "Built and configured structured network topologies with multiple routers, switches, and client endpoints.",
        "Designed and implemented IPv4 addressing schemes, subnetting, and default gateways.",
        "Configured VLANs and inter-VLAN routing to segregate traffic and enhance network security.",
        "Conducted connectivity diagnostics and protocol verification using ping, traceroute, and packet inspection.",
        "Gained direct hands-on experience with switching loops, trunking, and network fundamentals."
      ],
      tags: ["Cisco Packet Tracer", "VLANs", "Inter-VLAN Routing", "IPv4 Subnetting", "Switching"]
    },
    {
      id: "tryhackme-security-labs",
      title: "TryHackMe Hands-On Cybersecurity Labs",
      category: "Cybersecurity & SOC",
      tagline: "Network enumeration, vulnerability discovery, and log inspection across controlled Linux and Windows environments.",
      bullets: [
        "Executed network enumeration and host discovery scans using Nmap.",
        "Conducted web directory enumeration and asset discovery with Gobuster.",
        "Practiced credential security auditing using Hydra and hash analysis with John the Ripper.",
        "Investigated security event logs and endpoint artifacts for incident response drills.",
        "Explored Metasploit framework concepts in monitored sandboxes to understand defensive countermeasures."
      ],
      tags: ["Nmap", "Log Analysis", "TryHackMe", "Network Security", "Gobuster"]
    },
    {
      id: "versastyle-project",
      title: "VersaStyle Web Graduation Project",
      category: "Front-End Development",
      tagline: "Responsive web interface with appointment booking and service catalog management.",
      bullets: [
        "Participated in developing responsive, accessible user interfaces using semantic HTML5, CSS3, and JavaScript.",
        "Assisted in implementing appointment booking workflows and service management features.",
        "Collaborated closely with project teammates to deliver university milestones ahead of schedule.",
        "Contributed to testing, cross-browser compatibility verification, and UI user flow refinements."
      ],
      tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX"]
    }
  ] as ProjectItem[]
};
