import type { Service } from '@/types/service';

export const services: Service[] = [
  {
    id: 'digital-launch',
    slug: 'digital-launch',
    name: 'Digital Launch',
    tagline: 'Digital Launch System',
    description:
      'Turn the business into a clear digital path from attention to action.',
    packages: {
      basic: {
        name: 'Launch Foundation',
        tier: 'Basic',
        price: '€2,900',
        priceNumber: 2900,
        description: 'Essential high-converting digital presence and brand positioning for growing businesses.',
        timeline: '2–3 weeks delivery',
        features: [
          'High-performance 5-page responsive web architecture',
          'Core brand positioning & conversion-focused copywriting',
          'Lead capture mechanisms & CRM intake integration',
          'Fast Next.js infrastructure with Core Web Vitals optimization',
          'SEO metadata, indexation baseline & analytics setup',
          'Post-launch documentation & full asset ownership',
        ],
      },
      premium: {
        name: 'Enterprise Scale Launch',
        tier: 'Premium',
        price: '€5,800',
        priceNumber: 5800,
        description: 'Complete multi-tier digital platform with interactive storytelling, headless CMS and global localization.',
        timeline: '4–6 weeks delivery',
        isPopular: true,
        features: [
          'Everything in Launch Foundation',
          'Interactive custom product / service animations & 3D elements',
          'Headless CMS integration for dynamic content management',
          'Multi-language localization (DE / EN / ES)',
          'Complete design system & bespoke UI component library',
          'Automated staging environment & 60-day dedicated SLA support',
        ],
      },
    },
    paidEntry: {
      name: 'Launch Blueprint',
      price: 490,
    },
    implementation: {
      from: 2900,
    },
    timeline: '2–6 weeks',
    icon: 'Globe',
    color: 'blue',
    buyerFit: [
      'Businesses without a credible digital presence',
      'Companies launching a new product, service or market',
      'Teams whose current website does not convert or communicate clearly',
      'Founders who need a professional digital foundation before outreach',
    ],
    problems: [
      'Visitors cannot understand what the business does in under ten seconds',
      'The current website does not move visitors toward any clear action',
      'There is no consistent message across digital touchpoints',
      'The business is losing credibility before the first conversation',
    ],
    scope: [
      {
        title: 'Brand messaging foundation',
        description:
          'Core message, positioning statement and tone of voice defined.',
      },
      {
        title: 'Website design and build',
        description:
          'Professional multi-page website with clear hierarchy and conversion path.',
      },
      {
        title: 'Content architecture',
        description:
          'Page structure, copy framework and information hierarchy.',
      },
      {
        title: 'Technical foundation',
        description:
          'Domain, hosting, analytics, contact forms and performance baseline.',
      },
      {
        title: 'SEO foundation',
        description:
          'Metadata, structure and indexation baseline for organic discovery.',
      },
    ],
    deliverables: [
      'Launch Blueprint document (positioning, structure, scope)',
      'Professional multi-page website',
      'Written copy and content structure',
      'Analytics and tracking setup',
      'Contact and lead intake mechanism',
      'Basic SEO foundation',
      'Hosting and domain configuration',
      'Post-launch handover documentation',
    ],
    exclusions: [
      'Paid advertising campaigns',
      'Social media management',
      'Ongoing content creation',
      'E-commerce or payment processing (scoped separately)',
      'Custom software or integrations',
    ],
    engagementSteps: [
      'Launch Blueprint session — understand the business, buyer and goal',
      'Structural design — pages, hierarchy, conversion path',
      'Content and copy development',
      'Design and build',
      'Review and acceptance',
      'Launch and handover',
    ],
  },
  {
    id: 'automation-integration',
    slug: 'automation-integration',
    name: 'Automation & Integration',
    tagline: 'Automation & Integration System',
    description:
      'Connect the tools and handoffs that slow the team down.',
    packages: {
      basic: {
        name: 'Workflow Connector',
        tier: 'Basic',
        price: '€3,900',
        priceNumber: 3900,
        description: 'Connect core tools, eliminate manual data entry, and streamline departmental handoffs.',
        timeline: '2–4 weeks delivery',
        features: [
          'Direct integration between up to 4 core tools (CRM, ERP, Billing, Slack)',
          'Event-driven webhook synchronization with zero latency',
          'Standard automated data transformation & payload validation rules',
          'Centralized error logging & instant notification channels',
          'Full visual architecture diagram & operations manual',
        ],
      },
      premium: {
        name: 'Enterprise Operations Bus',
        tier: 'Premium',
        price: '€7,800',
        priceNumber: 7800,
        description: 'High-throughput enterprise event bus with human-in-the-loop validation checkpoints and automated retry queues.',
        timeline: '5–8 weeks delivery',
        isPopular: true,
        features: [
          'Everything in Workflow Connector',
          'Unlimited system connectors & relational database synchronizers',
          'Human-in-the-loop verification gates with custom UI actions',
          'High-concurrency queue & automated dead-letter retry architecture',
          'Real-time operational telemetry dashboard & exception dispatch',
          '90-day uptime monitoring & priority SLA maintenance',
        ],
      },
    },
    paidEntry: {
      name: 'Workflow Blueprint',
      price: 690,
    },
    implementation: {
      from: 3900,
    },
    timeline: '2–8 weeks',
    icon: 'GitBranch',
    color: 'cyan',
    buyerFit: [
      'Teams spending significant time on manual data transfers and handoffs',
      'Businesses using multiple tools that do not communicate with each other',
      'Operations where errors occur at the boundary between systems',
      'Companies where staff are doing repetitive work that a system should handle',
    ],
    problems: [
      'Data is copied manually between tools causing delays and errors',
      'Handoffs between team members or departments rely on email and memory',
      'No single source of truth exists for operational data',
      'Staff time is consumed by routine tasks rather than higher-value work',
    ],
    scope: [
      {
        title: 'Workflow mapping',
        description:
          'Document current process, tools, handoffs and failure points.',
      },
      {
        title: 'Integration design',
        description:
          'Design the connected system with clear data flows and business rules.',
      },
      {
        title: 'Automation build',
        description:
          'Configure, build and test the automation using appropriate platforms.',
      },
      {
        title: 'Human approval gates',
        description:
          'Define which decisions require human confirmation before action.',
      },
      {
        title: 'Monitoring and alerting',
        description:
          'Visibility into automation health and exception notification.',
      },
      {
        title: 'Documentation',
        description:
          'Written record of workflows, logic, credentials and maintenance steps.',
      },
    ],
    deliverables: [
      'Workflow Blueprint (current state, target state, gap analysis)',
      'Integration architecture diagram',
      'Configured automation workflows',
      'Human approval mechanisms where required',
      'Error handling and exception routing',
      'Monitoring dashboard or alerting setup',
      'Operational documentation',
      'Handover and knowledge transfer session',
    ],
    exclusions: [
      'Custom software development (scoped separately)',
      'Platforms or tools that do not offer API access',
      'Business process redesign beyond scope of automation',
      'Ongoing maintenance without a retainer agreement',
    ],
    engagementSteps: [
      'Workflow Blueprint session — map the process and identify automatable work',
      'Integration architecture design',
      'Build and configure automations',
      'Test with real data and real scenarios',
      'Review, acceptance and go-live',
      'Documentation and handover',
    ],
  },
  {
    id: 'ai-workflow',
    slug: 'ai-workflow',
    name: 'AI Workflow',
    tagline: 'AI Workflow System',
    description:
      'Turn one valuable AI opportunity into a controlled working workflow.',
    packages: {
      basic: {
        name: 'AI Agent Pipeline',
        tier: 'Basic',
        price: '€4,500',
        priceNumber: 4500,
        description: 'Targeted autonomous AI pipeline for document parsing, data extraction, and structured classification.',
        timeline: '3–4 weeks delivery',
        features: [
          'Single dedicated AI workflow engine (document extraction or classification)',
          'Strict JSON schema validation & hallucination guardrails',
          'Deterministic prompt engineering with domain context',
          'Direct API endpoint integration into existing business tools',
          'Full privacy compliance with self-hosted / EU data residency',
        ],
      },
      premium: {
        name: 'Autonomous Enterprise Engine',
        tier: 'Premium',
        price: '€9,500',
        priceNumber: 9500,
        description: 'Multi-agent orchestration system with dedicated RAG vector search, human review gates, and audit trails.',
        timeline: '6–8 weeks delivery',
        isPopular: true,
        features: [
          'Everything in AI Agent Pipeline',
          'Multi-agent orchestration with specialized sub-task delegates',
          'Dedicated Vector Database & Enterprise RAG retrieval engine',
          'Human-in-the-loop verification portal & anomaly escalation',
          'Continuous evaluation benchmark suite for precision tracking',
          '60-day telemetry monitoring & model fine-tuning support',
        ],
      },
    },
    paidEntry: {
      name: 'AI Evidence Sprint',
      price: 950,
    },
    implementation: {
      from: 4900,
    },
    timeline: 'Sprint 1–2 weeks, Implementation 3–8 weeks',
    icon: 'Cpu',
    color: 'blue',
    buyerFit: [
      'Teams spending significant time on repetitive document or data work',
      'Businesses with a clear AI use case but no structured implementation',
      'Operations that need AI output reviewed before it reaches customers or records',
      'Companies that want to move carefully — one use case at a time',
    ],
    problems: [
      'AI tools are being used informally without clear process or oversight',
      'Document generation, extraction or classification is done manually',
      'There is no way to evaluate whether AI output is accurate or acceptable',
      'Teams are experimenting but not producing reliable, accountable results',
    ],
    scope: [
      {
        title: 'Use-case selection',
        description:
          'Identify which AI opportunity has the clearest business case and lowest risk.',
      },
      {
        title: 'Workflow evidence',
        description:
          'Sprint to demonstrate the AI workflow with real data before committing to full build.',
      },
      {
        title: 'Knowledge and context assembly',
        description:
          'Gather the business rules, documents and context the AI system needs.',
      },
      {
        title: 'Document extraction and retrieval',
        description:
          'Build structured input pipelines from existing documents and data.',
      },
      {
        title: 'Draft generation',
        description:
          'AI produces an output — draft, classification, summary or decision input.',
      },
      {
        title: 'Human approval gate',
        description:
          'All significant outputs pass through a defined human review step before action.',
      },
      {
        title: 'Evaluation framework',
        description:
          'Define how accuracy, completeness and acceptability will be measured.',
      },
      {
        title: 'Privacy review',
        description:
          'Identify data categories, retention rules and compliance requirements.',
      },
      {
        title: 'Monitoring',
        description:
          'Track usage, exceptions and evaluation results over time.',
      },
    ],
    deliverables: [
      'AI Evidence Sprint report (use-case, findings, recommendation)',
      'Go / change / stop recommendation',
      'Implemented AI workflow with human approval mechanism',
      'Evaluation framework and acceptance criteria',
      'Privacy and data handling documentation',
      'Monitoring and exception alerting',
      'Operational documentation',
      'Handover session',
    ],
    exclusions: [
      'Uncontrolled autonomous AI with no human review',
      'Guaranteed accuracy, revenue or savings claims',
      'AI training or model development',
      'Multiple use cases in a single engagement',
      'Custom AI model fine-tuning',
    ],
    engagementSteps: [
      'Use-case identification and business case review',
      'AI Evidence Sprint — demonstrate the workflow with real data',
      'Go / change / stop decision',
      'Full workflow build with human approval gates',
      'Evaluation, testing and acceptance',
      'Documentation, monitoring and handover',
    ],
  },
  {
    id: 'custom-software',
    slug: 'custom-software',
    name: 'Custom Software',
    tagline: 'Custom Software System',
    description:
      'Build the software the operation actually needs.',
    packages: {
      basic: {
        name: 'Custom Application MVP',
        tier: 'Basic',
        price: '€6,900',
        priceNumber: 6900,
        description: 'Bespoke web application or internal client portal tailored to your unique operational workflow.',
        timeline: '4–6 weeks delivery',
        features: [
          'Modern responsive web application & intuitive user interface',
          'Role-based authentication & access permissions (RBAC)',
          'Relational database architecture & secure REST API layer',
          'Cloud infrastructure setup (Vercel / AWS) with CI/CD deployment',
          'Complete source code handover with 100% IP ownership',
        ],
      },
      premium: {
        name: 'Enterprise Platform',
        tier: 'Premium',
        price: '€14,500',
        priceNumber: 14500,
        description: 'High-scale multi-tenant enterprise system with real-time sync, audit telemetry, and dedicated SLAs.',
        timeline: '8–12 weeks delivery',
        isPopular: true,
        features: [
          'Everything in Custom Application MVP',
          'Complex workflow orchestration & multi-tenant data partitioning',
          'Real-time WebSocket synchronization & event streaming',
          'Security hardening, penetration assessment & GDPR compliance audit',
          'High-throughput stress testing & automated database backup routines',
          '6-month priority architecture support & SLA guarantee',
        ],
      },
    },
    paidEntry: {
      name: 'Solution Blueprint',
      price: 1500,
    },
    implementation: {
      from: 7500,
      label: 'Phased',
    },
    timeline: 'Phased delivery',
    icon: 'Code2',
    color: 'navy',
    buyerFit: [
      'Businesses that have outgrown generic tools and need custom logic',
      'Operations with specific workflow, permission or integration requirements',
      'Companies building a product, platform or internal tool',
      'Teams whose current software does not match how the business actually works',
    ],
    problems: [
      'Off-the-shelf software does not fit the actual business process',
      'Manual workarounds exist because no tool handles the specific requirement',
      'Data is fragmented across systems with no single authoritative record',
      'The business has grown but the software has not',
    ],
    scope: [
      {
        title: 'Requirements and stakeholder mapping',
        description:
          'Define what the system must do, who uses it and what success means.',
      },
      {
        title: 'User journeys and interface design',
        description:
          'Map the user experience before writing a line of code.',
      },
      {
        title: 'Frontend development',
        description:
          'Build the interfaces users interact with — web application, admin panel or dashboard.',
      },
      {
        title: 'Backend and API development',
        description:
          'Business logic, data processing, integrations and automation endpoints.',
      },
      {
        title: 'Database design',
        description:
          'Data structure, relationships, access controls and integrity rules.',
      },
      {
        title: 'Permissions and roles',
        description:
          'Define who can see, do and change what within the system.',
      },
      {
        title: 'Testing',
        description:
          'Functional, integration and user acceptance testing with real scenarios.',
      },
      {
        title: 'Deployment and monitoring',
        description:
          'Production deployment with error tracking and performance visibility.',
      },
      {
        title: 'Documentation and handover',
        description:
          'Technical and operational documentation. You own and understand what was built.',
      },
    ],
    deliverables: [
      'Solution Blueprint (requirements, architecture, phased plan)',
      'User journey maps and interface designs',
      'Fully functional custom software application',
      'Backend, database and integration layer',
      'Role-based permission system',
      'Testing documentation and acceptance results',
      'Deployed production environment',
      'Monitoring and error tracking setup',
      'Technical and operational documentation',
      'Handover and knowledge transfer',
    ],
    exclusions: [
      'Ongoing hosting management without a retainer',
      'Feature additions outside agreed scope without change control',
      'Third-party licensing costs',
      'Content population or data migration outside defined scope',
    ],
    engagementSteps: [
      'Solution Blueprint — requirements, stakeholders, architecture, phased plan',
      'Design — user journeys, interface and data structure',
      'Build — phased delivery with review points',
      'Test — functional and user acceptance testing',
      'Deploy — production environment with monitoring',
      'Handover — documentation, training and knowledge transfer',
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
