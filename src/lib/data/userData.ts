import type { UserData } from "@/lib/types/portfolio";

export const userData: UserData = {
  name: "Warlike R. S. Soares",
  role: "Software Developer",
  location: "Parnamirim, RN",
  phone: "(84) 99173-3188",
  bio: "Desenvolvedor de software e graduado em Tecnologia da Informação com sólida experiência na criação de soluções tecnológicas, abrangendo desenvolvimento web (ReactJS, Next.JS), mobile (React Native) e sistemas de gestão. Possuo forte proficiência em linguagens como JavaScript, TypeScript e Python, além de habilidades analíticas e de resolução de problemas comprovadas.",
  languages: [
    { name: "Português", level: "Nativo" },
    { name: "Inglês", level: "Fluente" },
    { name: "Francês", level: "Intermediário" },
  ],
  education: [
    {
      institution: "UFRN - Universidade Federal do Rio Grande do Norte",
      degree: "Mestrado em Matemática Aplicada e Estatística (PPGMAE)",
      period: "Início: 2026",
      status: "Futuro",
    },
    {
      institution: "UFRN - Universidade Federal do Rio Grande do Norte",
      degree: "Bacharelado em Tecnologia da Informação",
      period: "Conclusão: 2024",
      status: "Concluído",
    },
    {
      institution: "Rocketseat",
      degree: "Full Stack Web Development (React.js/Next.js)",
      period: "Formação Complementar",
      status: "Certificado",
    },
    {
      institution: "IMD/UFRN",
      degree: "Desenvolvimento de Jogos Digitais",
      period: "Formação Complementar",
      status: "Certificado",
    },
  ],
  experience: [
    {
      company: "Freelancer - Tecnologia da Informação",
      role: "Software Developer",
      period: "Período Recente",
      description:
        "Atuação em projetos sob demanda, aplicando arquitetura e lógica de programação para soluções personalizadas. Realização de Anotação de Dados e revisão rigorosa de código-fonte para treinamento e refinamento de modelos de Inteligência Artificial.",
    },
    {
      company: "Teleperformance CRM S.A.",
      role: "Intérprete Bilíngue e Suporte Técnico",
      period: "2022 - 2024",
      description:
        "Atuação como intérprete de ponte (Inglês-Português), garantindo precisão terminológica em comunicações técnicas em tempo real. Resolução de conflitos, processamento de solicitações e manutenção de dados em sistemas CRM complexos para clientes internacionais.",
    },
  ],
  skills: [
    { name: "JavaScript / TypeScript", level: 95, type: "lang" },
    { name: "Python", level: 90, type: "lang" },
    { name: "C# / C++", level: 80, type: "lang" },
    { name: "ReactJS / Next.JS", level: 92, type: "web" },
    { name: "React Native", level: 85, type: "mobile" },
    { name: "HTML / CSS / SCSS", level: 90, type: "web" },
    { name: "API & DB Integration", level: 88, type: "backend" },
    { name: "Git / Versioning", level: 85, type: "tools" },
  ],
  projects: [
    {
      id: 1,
      title: "ig.news",
      category: "SaaS / Blog",
      image: "ignews.png",
      tech: ["Next.js", "Stripe", "FaunaDB"],
      description:
        "Site de notícias com sistema de assinatura. Integração com Stripe para pagamentos e controle de acesso a conteúdos exclusivos (posts completos).",
      link: "https://ignews-blog-nine.vercel.app/",
    },
    {
      id: 2,
      title: "Space Traveling",
      category: "Web / UI",
      image: "spacetraveling.png",
      tech: ["Next.js", "TypeScript", "Prismic CMS"],
      description:
        "Projeto de blog com interface vertical moderna e minimalista. Foco em tipografia, carregamento estático e experiência de leitura fluida.",
      link: "https://space-traveling-lovat.vercel.app/",
    },
    {
      id: 3,
      title: "Toda a Noite",
      category: "Game Dev",
      image: "TodaANoite.png",
      tech: ["Visual Novel", "Narrative Design", "Itch.io"],
      description:
        "Jogo do gênero Visual Novel hospedado no Itch.io. Focado em narrativa interativa e imersão do jogador através de escolhas.",
      link: "https://klebinho.itch.io/toda-a-noite",
    },
  ],
  contact: {
    email: "warlikerichard@hotmail.com",
    github: "warlikerichard",
    linkedin: "warlike-richard",
    whatsapp: "(84) 99173-3188",
  },
};
