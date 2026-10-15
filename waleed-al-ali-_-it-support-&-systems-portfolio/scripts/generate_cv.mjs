import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const pageWidth = 210;
const pageHeight = 297;

// Colors
const primaryDark = [23, 25, 28];     // #17191C
const accentSteel = [58, 62, 69];     // #3A3E45 (Steel gray)
const darkGray = [45, 49, 56];        // #2D3138
const mutedGray = [110, 115, 125];    // #6E737D
const lightBg = [248, 249, 250];      // #F8F9FA
const borderGray = [220, 224, 230];   // #DCE0E6

// Left Sidebar Background
doc.setFillColor(...lightBg);
doc.rect(0, 0, 72, pageHeight, 'F');
doc.setDrawColor(...borderGray);
doc.line(72, 0, 72, pageHeight);

// Left Column Content
let leftY = 22;

// Name Header in Sidebar / Initials Monogram
doc.setFillColor(15, 23, 42);
doc.roundedRect(16, leftY, 40, 40, 3, 3, 'F');
doc.setTextColor(255, 255, 255);
doc.setFontSize(20);
doc.setFont('helvetica', 'bold');
doc.text('WA', 36, leftY + 25, { align: 'center' });

leftY += 50;

// Contact Section
doc.setTextColor(...primaryDark);
doc.setFontSize(11);
doc.setFont('helvetica', 'bold');
doc.text('CONTACT DETAILS', 12, leftY);
doc.setDrawColor(...accentSteel);
doc.setLineWidth(0.8);
doc.line(12, leftY + 2, 60, leftY + 2);

leftY += 9;
doc.setFontSize(8.5);
doc.setFont('helvetica', 'bold');
doc.setTextColor(...darkGray);
doc.text('Location', 12, leftY);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...mutedGray);
doc.text('Dubai, United Arab Emirates', 12, leftY + 4);

leftY += 12;
doc.setFont('helvetica', 'bold');
doc.setTextColor(...darkGray);
doc.text('Phone', 12, leftY);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...mutedGray);
doc.text('+971 524836389', 12, leftY + 4);

leftY += 12;
doc.setFont('helvetica', 'bold');
doc.setTextColor(...darkGray);
doc.text('Email', 12, leftY);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...mutedGray);
doc.text('Waleedalali210@gmail.com', 12, leftY + 4);

leftY += 12;
doc.setFont('helvetica', 'bold');
doc.setTextColor(...darkGray);
doc.text('LinkedIn', 12, leftY);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...mutedGray);
doc.text('linkedin.com/in/waleed-al-ali', 12, leftY + 4);

leftY += 18;

// Education Section
doc.setTextColor(...primaryDark);
doc.setFontSize(11);
doc.setFont('helvetica', 'bold');
doc.text('EDUCATION', 12, leftY);
doc.setDrawColor(...accentSteel);
doc.setLineWidth(0.8);
doc.line(12, leftY + 2, 60, leftY + 2);

leftY += 9;
doc.setFontSize(9);
doc.setFont('helvetica', 'bold');
doc.setTextColor(...primaryDark);
doc.text('Bachelor of Computer Science', 12, leftY);
doc.setFontSize(8.5);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...mutedGray);
doc.text('Al-Balqa Applied University', 12, leftY + 4.5);
doc.text('2022 - 2026', 12, leftY + 9);

leftY += 18;

// Languages Section
doc.setTextColor(...primaryDark);
doc.setFontSize(11);
doc.setFont('helvetica', 'bold');
doc.text('LANGUAGES', 12, leftY);
doc.setDrawColor(...accentSteel);
doc.setLineWidth(0.8);
doc.line(12, leftY + 2, 60, leftY + 2);

leftY += 9;
doc.setFontSize(8.5);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...darkGray);
doc.text('• Arabic (Native Speaker)', 12, leftY);
doc.text('• English (Very Good - Professional)', 12, leftY + 5);

leftY += 15;

// Core Strengths
doc.setTextColor(...primaryDark);
doc.setFontSize(11);
doc.setFont('helvetica', 'bold');
doc.text('KEY COMPETENCIES', 12, leftY);
doc.setDrawColor(...accentSteel);
doc.setLineWidth(0.8);
doc.line(12, leftY + 2, 60, leftY + 2);

leftY += 8;
const competencies = [
  'Windows Desktop & Server',
  'Active Directory & GPO',
  'TCP/IP, DNS, DHCP Config',
  'Hardware Diagnostics & Repair',
  'Remote Desktop Support',
  'User Access Management',
  'Cisco Packet Tracer Labs',
  'Security Baseline & Auditing'
];
doc.setFontSize(8);
doc.setTextColor(...darkGray);
competencies.forEach((item, i) => {
  doc.text(`• ${item}`, 12, leftY + (i * 4.6));
});


// Right Column Content
const rightX = 82;
let rightY = 22;

// Header / Title
doc.setTextColor(...primaryDark);
doc.setFontSize(24);
doc.setFont('helvetica', 'bold');
doc.text('Waleed Al-Ali', rightX, rightY);

rightY += 6;
doc.setFontSize(11);
doc.setTextColor(...accentSteel);
doc.setFont('helvetica', 'bold');
doc.text('IT Support  |  System Administration  |  Networking', rightX, rightY);

rightY += 9;
doc.setFontSize(8.8);
doc.setFont('helvetica', 'normal');
doc.setTextColor(...darkGray);
const summary = "Computer Science graduate with a strong foundation in IT support, troubleshooting, networking, and Windows administration. Passionate about solving technical problems, supporting users, and continuously developing skills in enterprise IT infrastructure, Active Directory, and system administration. Based in Dubai, UAE.";
const splitSummary = doc.splitTextToSize(summary, 115);
doc.text(splitSummary, rightX, rightY);
rightY += (splitSummary.length * 4.2) + 6;

// Technical Projects & Hands-On Labs
doc.setTextColor(...primaryDark);
doc.setFontSize(11.5);
doc.setFont('helvetica', 'bold');
doc.text('PRACTICAL PROJECTS & HANDS-ON LABS', rightX, rightY);
doc.setDrawColor(...borderGray);
doc.setLineWidth(0.4);
doc.line(rightX, rightY + 2, 198, rightY + 2);

rightY += 8;

function addProject(title, subtitle, bullets) {
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryDark);
  doc.text(title, rightX, rightY);
  
  if (subtitle) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(...mutedGray);
    doc.text(subtitle, 198, rightY, { align: 'right' });
  }
  
  rightY += 4.5;
  doc.setFontSize(8.2);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkGray);
  
  bullets.forEach(b => {
    const wrapped = doc.splitTextToSize(`- ${b}`, 115);
    doc.text(wrapped, rightX + 2, rightY);
    rightY += wrapped.length * 3.8;
  });
  rightY += 2;
}

addProject('Windows Server & Enterprise Administration Lab', 'Virtual Environment', [
  'Deployed and configured Windows Server within hypervisor test environments.',
  'Configured Active Directory Domain Services (AD DS), organizational units (OUs), and user accounts.',
  'Authored and enforced Group Policy Objects (GPO) for enterprise security and desktop policies.',
  'Performed Windows system backup, restore procedures, and endpoint diagnostics.'
]);

addProject('Cisco Packet Tracer Networking Topologies', 'Network Simulation', [
  'Architected multi-subnet network topologies implementing switches, routers, and gateways.',
  'Configured VLANs, IP addressing schemes (IPv4), default gateways, and inter-VLAN routing.',
  'Diagnosed and resolved simulated connectivity issues using ping, traceroute, and packet inspection.'
]);

addProject('TryHackMe Cybersecurity & SOC Fundamentals', 'Hands-On Labs', [
  'Completed Cyber Security 101 Learning Path (45+ hours) covering networking, security & defense.',
  'Conducted network enumeration and port discovery using Nmap in controlled lab VMs.',
  'Practiced security monitoring, log analysis, threat detection, and password audit techniques.'
]);

addProject('VersaStyle Web Platform', 'Front-End Development', [
  'Engineered responsive interface workflows with appointment booking and service views.',
  'Collaborated across team iterations to test and refine user-facing interactions.'
]);

// Certifications & Training
rightY += 2;
doc.setTextColor(...primaryDark);
doc.setFontSize(11.5);
doc.setFont('helvetica', 'bold');
doc.text('CERTIFICATIONS & PROFESSIONAL TRAINING', rightX, rightY);
doc.setDrawColor(...borderGray);
doc.setLineWidth(0.4);
doc.line(rightX, rightY + 2, 198, rightY + 2);

rightY += 7;

function addCert(name, issuer, date, credId) {
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryDark);
  doc.text(name, rightX, rightY);
  
  doc.setFontSize(7.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...mutedGray);
  doc.text(issuer + (date ? ` | ${date}` : ''), rightX, rightY + 3.8);
  
  if (credId) {
    doc.text(`ID: ${credId}`, 198, rightY + 3.8, { align: 'right' });
  }
  rightY += 7.5;
}

addCert('Cyber Security 101 Learning Path', 'TryHackMe (45 hrs 23 mins)', 'July 2026', 'THM-ACLEUTADCG');
addCert('Microsoft Entra ID for Administrators', 'LinkedIn Learning', 'September 2026', '5462f87cabc8746b');
addCert('Windows Server 2025: Install & Configure Active Directory', 'LinkedIn Learning', 'September 2026', '7140b0ca6544db55');
addCert('Windows Server 2025: Implementing Group Policy', 'LinkedIn Learning', 'September 2026', '744c59300e79b95a');
addCert('Windows Server 2025 Essential Training', 'LinkedIn Learning', 'September 2026', '8b2a616a1a7ef1f9');
addCert('Windows 11: Administration', 'LinkedIn Learning', 'August 2026', 'dfe74113c9efcd39');
addCert('Cisco CCNA Coursework Completed', 'Cisco Academy / Self-Study (Certification Pending)', '', '');
addCert('CompTIA Security+ Coursework', 'CompTIA Training (Currently Studying)', '', '');

// Save file
const pdfOutput = doc.output('arraybuffer');
fs.writeFileSync(path.join(process.cwd(), 'public', 'Waleed_Al-Ali_CV.pdf'), Buffer.from(pdfOutput));
fs.writeFileSync(path.join(process.cwd(), 'public', 'waleed-al-ali-cv.pdf'), Buffer.from(pdfOutput));
console.log('CV PDF successfully created in public directory.');
