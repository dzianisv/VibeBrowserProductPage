import ProfessionTemplate, { ProfessionConfig } from '@/components/profession-template'

const peopleConfig: ProfessionConfig = {
  slug: 'people',
  name: 'People',
  title: 'Personal AI Assistant',
  subtitle: 'Your personal AI that handles everyday tasks',
  gradient: 'from-emerald-600 via-teal-500 to-emerald-600',
  gradientFrom: 'from-emerald-600',
  gradientVia: 'via-teal-500',
  gradientTo: 'to-emerald-600',
  accentColor: 'text-emerald-600',
  accentBg: 'bg-emerald-100 text-emerald-700',
  rotatingWords: ['Email', 'Calendar', 'Appointments', 'Shopping', 'Travel', 'Bills', 'Applications', 'Reminders'],
  description: 'Your personal AI assistant that handles the busywork of daily life. From answering emails to scheduling appointments, Vibe Co-Pilot helps you stay on top of everything without the overwhelm.',
  ctaText: 'Get Started',
  ctaLink: '/waitlist',
  ctaIsWaitlist: true,
  showDownload: true,
  features: [
    { icon: 'Mail', title: 'Email Management', description: 'Auto-reply to emails, highlight important messages, draft responses based on your style.' },
    { icon: 'Calendar', title: 'Smart Scheduling', description: 'Find time for appointments, meetings, and personal tasks. Book services with natural language.' },
    { icon: 'Clock', title: 'Daily Brief', description: 'Get a morning summary of important emails, calendar events, and tasks for the day.' },
    { icon: 'ShoppingCart', title: 'Shopping Lists', description: 'Add items to shopping lists, compare prices, track deliveries.' },
    { icon: 'FileText', title: 'Bill Tracking', description: 'Track bills, subscriptions, and due dates. Never miss a payment again.' },
    { icon: 'Briefcase', title: 'Job Applications', description: 'Fill out job applications automatically. Tailor resumes and cover letters to each position.' },
    { icon: 'Plane', title: 'Travel Planning', description: 'Search flights, compare hotels, book rental cars. Handle confirmation emails.' },
    { icon: 'UserMinus', title: 'Cancel Subscriptions', description: 'Find and unsubscribe from services you no longer use. Save money on forgotten subscriptions.' },
    { icon: 'Shield', title: 'Insurance Claims', description: 'Submit phone, medical, or auto insurance claims. Handle paperwork and follow up.' },
    { icon: 'MessageSquare', title: 'Insurance Chat', description: 'Chat with your insurance to check coverage at a clinic or specialist. Understand your benefits.' },
    { icon: 'Stethoscope', title: 'Doctor Appointments', description: 'Schedule appointments with doctors. Find in-network providers and book slots.' },
    { icon: 'Headphones', title: 'Get Refunds', description: 'Contact customer support for refunds, disputed charges, or service issues.' },
    { icon: 'Building', title: 'Bank Disputes', description: 'Submit unauthorized transaction claims to your bank. Contest charges and protect your accounts.' },
  ],
  workflows: [
    'Get a morning brief of important emails and calendar',
    'Schedule appointments with natural language',
    'Auto-reply to routine emails',
    'Apply to jobs with one command',
    'Cancel subscriptions you don\'t need anymore',
    'Submit insurance claims (phone, medical, auto)',
    'Chat with insurance to check coverage at any clinic or specialist',
    'Schedule doctor appointments',
    'Contact support for refunds',
    'Dispute unauthorized bank charges',
    'Track bills and subscriptions automatically',
  ],
  tools: ['Gmail', 'Google Calendar', 'LinkedIn', 'Amazon', 'Uber', 'Doordash', 'Netflix', 'Spotify'],
  testimonials: [
    { quote: "Vibe handles my email while I'm in meetings. It's like having a personal assistant.", author: "Jessica Miller", practice: "Product Manager" },
    { quote: "Applied to 20 jobs in one weekend. Vibe filled out all the forms for me.", author: "David Chen", practice: "Job Seeker" },
  ],
  faqs: [
    { question: 'Does Vibe read my emails?', answer: 'Vibe only reads emails to help you manage them. Your data is processed locally or encrypted - we never use it to train models.' },
    { question: 'Can Vibe make purchases?', answer: 'Vibe can research and recommend products, but all purchases require your approval.' },
    { question: 'Is this only for work emails?', answer: 'No! Vibe helps with personal Gmail, shopping orders, travel bookings, and more.' },
    { question: 'How does job application work?', answer: 'Tell Vibe what jobs you\'re interested in, upload your resume once, and Vibe fills out applications and tailors your info for each role.' },
    { question: 'How does subscription cancellation work?', answer: 'Tell Vibe to find unused subscriptions in your emails. It identifies recurring charges, shows you what you\'re paying for, and can cancel or help you cancel the ones you don\'t need.' },
  ],
}

export default function Page() {
  return <ProfessionTemplate config={peopleConfig} />
}
