import type { Service } from '@/types/service';

export const services: Service[] = [
  {
    id: 'digital-launch',
    slug: 'digital-launch',
    name: 'Digital Launch',
    tagline: 'Digital Launch System',
    description:
      'Turn the business into a clear digital path from attention to action.',
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
