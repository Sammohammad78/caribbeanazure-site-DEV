export const site = {
  en: {
    // Default WhatsApp number (international format without '+' for wa.me link)
    whatsappNumber: '31612345678',
    navbar: {
      links: [
        { label: 'Services', href: '#services' },
        { label: 'Process', href: '#process' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    hero: {
      title: 'WhatsApp‑first websites & AI automation for busy SMEs.',
      subtitle:
        'We turn scattered processes into clean, automated flows—web, chat, and back‑office—so you close more deals with less effort.',
      ctaPrimary: {
        label: 'Book Automation Audit',
        whatsappMessage:
          'Hello Caribbean Azure team! I’d like to book a 20‑minute automation audit.',
      },
      ctaSecondary: {
        label: 'Email Us',
        href: '#contact',
      },
    },
    services: {
      title: 'Our Services',
      items: [
        {
          title: 'Website & Lead Capture',
          description:
            'Conversion‑focused websites built with Next.js and Framer Motion, paired with smart forms that capture leads and sync to your CRM.',
        },
        {
          title: 'WhatsApp & Inbox Automation',
          description:
            'We connect WhatsApp, email, and your CRM using tools like n8n and Zapier so you never miss a lead and always reply fast.',
        },
        {
          title: 'AI Chatbots',
          description:
            'Train AI to handle FAQs, bookings, and quotes so your prospects get answers instantly—even outside business hours.',
        },
      ],
    },
    process: {
      title: 'Our Process',
      steps: [
        {
          title: 'Discovery Call',
          description: 'We learn about your business goals and processes.',
        },
        {
          title: 'Automation Blueprint',
          description: 'We design a bespoke solution across web, chat, and backend.',
        },
        {
          title: 'Build & Integrate',
          description: 'We build your website and hook up automations.',
        },
        {
          title: 'Launch & Iterate',
          description: 'We go live, monitor performance, and optimize continuously.',
        },
      ],
    },
    howItWorks: {
      title: 'How It Works',
      description:
        'We combine modern web technology with chat‑based automation. First we understand your workflows, then implement streamlined systems that just work.',
    },
    pricing: {
      title: 'Simple Pricing',
      tiers: [
        {
          name: 'Starter',
          price: '€499',
          description:
            'A professional one‑page website, basic automation, and WhatsApp contact.',
          features: [
            'Responsive one‑page site',
            'Basic lead capture form',
            'WhatsApp chat button',
            '1 automation workflow',
          ],
        },
        {
          name: 'Growth',
          price: '€1299',
          description:
            'Multi‑page site, advanced automations, and AI chatbot integration.',
          features: [
            'Up to 5 pages',
            'Advanced forms & CRM sync',
            'WhatsApp & email automations',
            'AI FAQ chatbot',
            'Monthly analytics report',
          ],
        },
        {
          name: 'Pro',
          price: 'Custom',
          description:
            'Tailored solutions for scaling teams with bespoke automations.',
          features: [
            'Unlimited pages',
            'Custom integrations',
            'AI booking & quoting bots',
            'Dedicated support',
            'Quarterly strategy reviews',
          ],
        },
      ],
    },
    faq: {
      title: 'FAQ',
      items: [
        {
          question: 'How long does it take to launch my site?',
          answer:
            'For the Starter plan, we aim to launch within two weeks of content delivery. Larger projects typically take 3–4 weeks.',
        },
        {
          question: 'Do I need to provide my own hosting?',
          answer:
            'No—you can host with us on Vercel (EU servers) or use your preferred provider. We handle deployment for you.',
        },
        {
          question: 'Can you integrate my existing tools?',
          answer:
            'Absolutely. We work with many CRMs and communication platforms. Just let us know what you’re using and we’ll connect it.',
        },
        {
          question: 'What counts as an automation workflow?',
          answer:
            'A workflow is an automated sequence triggered by an event, like a new lead. It can involve multiple apps (e.g., form submission → email → CRM update).',
        },
        {
          question: 'How does AI training work?',
          answer:
            'We collect your FAQs, guidelines, and content to train a chatbot. We continuously refine its responses based on real interactions.',
        },
        {
          question: 'Is there any monthly fee?',
          answer:
            'Starter and Growth plans include three months of support. After that, optional support starts at €49/month.',
        },
        {
          question: 'Do you offer multilingual websites?',
          answer:
            'Yes, we can implement multilingual support (e.g., Dutch, German) on any plan.',
        },
        {
          question: 'What if I already have a website?',
          answer:
            'We can audit your existing site, migrate content, and add our automation layer without losing your SEO.',
        },
      ],
    },
    contact: {
      title: 'Get in Touch',
      description:
        'Ready to save time and boost conversions? Let’s chat. Use the form below or send us a WhatsApp message.',
      budgetOptions: ['< €500', '€500–1,500', '€1,500–3,000', '> €3,000'],
      successMessage: 'Thanks for reaching out! We’ll get back to you soon.',
    },
    footer: {
      text: `© ${new Date().getFullYear()} Caribbean Azure. All rights reserved.`,
    },
  },
  nl: {
    // Dutch translations can be added here. Values default to English.
  },
};

export type SiteContent = typeof site;