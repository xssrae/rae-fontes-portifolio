export interface Project {
  slug: string
  title: string
  description: string
  githubUrl: string
  stars: number
  forks: number
  languages: string[]
}

export const projects: Project[] = [
  {
    slug: 'dev-skill-tracker',
    title: 'Dev Skill Tracker',
    description: 'Projeto Java com microsservicos e mensageria Kafka para rastrear tecnologias estudadas e projetos concluidos com progresso visual.',
    githubUrl: 'https://github.com/xssrae/dev-skill-tracker',
    stars: 100,
    forks: 50,
    languages: ['Java', 'Spring Boot', 'Apache Kafka']
  },
  {
    slug: 'etl-pyspark',
    title: 'ETL Pipeline com PySpark',
    description: 'Desafio - Vaga Analista Junior do Itau Unibanco - Pipeline de dados utilizando PySpark para integrar dados de clientes e vendas, gerar resumos por cliente e relatórios financeiros por produto.',
    githubUrl: 'https://github.com/xssrae/etl-pyspark',
    stars: 200,
    forks: 100,
    languages: ['PySpark', 'Python', 'Apache Hadoop']
  }
]
