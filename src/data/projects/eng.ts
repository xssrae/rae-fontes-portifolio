import type { Project } from './types'

export const projects_eng: Project[] = [
  {
    slug: 'dev-skill-tracker',
    title: 'Dev Skill Tracker',
    description: 'A Java project with microservices and Kafka messaging to track studied technologies and completed projects with visual progress.',
    githubUrl: 'https://github.com/xssrae/dev-skill-tracker',
    stars: 100,
    forks: 50,
    languages: ['Java', 'Spring Boot', 'Apache Kafka']
},
  {
    slug: 'etl-pyspark',
    title: 'ETL Pipeline com PySpark',
    description: 'Challenge - Itau Unibanco Junior Analyst Position - Data pipeline using PySpark to integrate customer and sales data, generate summaries per customer, and financial reports per product.',
    githubUrl: 'https://github.com/xssrae/etl-pyspark',
    stars: 200,
    forks: 100,
    languages: ['PySpark', 'Python', 'Apache Hadoop']
  }
]
