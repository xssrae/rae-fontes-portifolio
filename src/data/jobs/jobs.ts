export interface Job {
  company: string
  role: string
  startDate: string
  endDate: string
  location?: string
  description: {
    pt: string
    en: string
  }
  technologies: string[]
}

export const jobs: Job[] = [
  {
    company: 'Company Name',
    role: 'Software Engineer',
    startDate: 'Jan 2022',
    endDate: 'Present',
    description: {
      pt: 'Atuação no desenvolvimento e manutenção de serviços backend com Java e Spring Boot, criação de APIs RESTful e integração com bancos de dados.',
      en: 'Worked on developing and maintaining backend services with Java and Spring Boot, building RESTful APIs and integrating with databases.',
    },
    technologies: ['Java', 'Spring Boot'],
  },
  {
    company: 'Another Company',
    role: 'Backend Developer',
    startDate: 'Jun 2020',
    endDate: 'Dec 2021',
    description: {
      pt: 'Contribuição para uma arquitetura de microsserviços e implementação de soluções orientadas a eventos usando Kafka.',
      en: 'Contributed to a microservices architecture and implemented event-driven solutions using Kafka.',
    },
    technologies: ['Java', 'Spring Boot', 'Kafka'],
  },
]
