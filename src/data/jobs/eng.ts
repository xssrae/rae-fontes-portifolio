import type { Job } from './types'

export const jobs_eng: Job[] = [
  {
    company: 'Itau Unibanco',
    role: 'Software Engineer Junior',
    startDate: 'Jan 2026',
    endDate: 'Currently',
    description:
      'Acting in the development of high-scale distributed systems in Java and Kotlin (Spring Boot) for the FP Recovery area. Specialist in event-driven architectures with Apache Kafka and AWS SQS, designing resilient microservices with optimized partitioning, backpressure control, and DLQs to sustain loads of millions of events/day with high throughput and transactional integrity. Experience in the complete data lifecycle through serverless ETL pipelines (AWS Glue Jobs) and reactive ingestion via AWS Lambda, EventBridge, and Amazon S3, feeding distributed NoSQL databases in Apache Cassandra. Management of infrastructure as code (Terraform), deployment in containers with Docker and AWS ECS, and end-to-end observability of SLIs/SLOs with Datadog, Grafana, and Splunk, integrating AI agents (Claude Code and Devin) to maximize efficiency and quality of deliveries.',
    technologies: [
      'Java','Kotlin', 'Spring Boot','Apache Kafka', 'AWS SQS', 'AWS Lambda', 'AWS Glue', 'Amazon S3', 'Apache Cassandra', 'Terraform', 'Docker', 'AWS ECS', 'Datadog', 'Grafana', 'Splunk', 'Claude Code', 'Devin'
    ],
  },
  {
    company: 'Itau Unibanco',
    role: 'Intern in Information Technology',
    startDate: 'Jun 2024',
    endDate: 'Dec 2025',
    description:
      'Working in the customer service area with a focus on software development and improving the customer experience. Responsible for developing routed chats and conversational journeys integrated with REST APIs, through low-code development. Responsible for the entire lifecycle of messaging solutions, from refinement to implementation. AI Engineering and Low-Code Development: Development and integration of journeys for virtual assistants (Chats and Messaging) with and without generative AI, consuming REST APIs applied to the main digital channels of the bank (Web, Mobile, WhatsApp). Use of AI tools for acceleration and code quality, including GitHub Copilot, Microsoft Copilot, and Stackspot. DevOps, IaC and Observability: Experience with Terraform for Infrastructure as Code (IaC), CI/CD pipelines for deployment, and API log monitoring with Datadog. Business Impact: Delivery of high-impact journeys (e.g., automation of health plan management and card tracking), resulting in reduced response times and increased user autonomy.',
    technologies: [
      'Python', 'Datadog', 'GitHub Copilot', 'Microsoft Copilot', 'Stackspot', 'Terraform', 'CI/CD'
    ],
  },
]
