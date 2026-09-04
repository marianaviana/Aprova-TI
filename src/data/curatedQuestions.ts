import { Question } from '../types';

export const CURATED_QUESTIONS: Question[] = [
  // ===================== SEPLAG-RJ: Governança de TIC =====================
  {
    id: 'seplag-gov-01',
    examId: 'seplag',
    subjectId: 'seplag_gov_tic',
    subjectName: 'Governança e Gestão de TIC',
    topicName: 'Governança de TIC, COBIT 2019 e ISO/IEC 38500',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    statement:
      'Uma Secretaria de Estado do Rio de Janeiro pretende estruturar seu modelo de Governança e Gestão de Tecnologia da Informação com base no framework COBIT 2019. Durante a etapa de desenho do sistema de governança, o comitê diretivo discutiu os princípios fundamentais que regem o framework e a distinção entre governança e gestão.\n\nCom base no COBIT 2019 e nas diretrizes de governança em órgãos públicos, assinale a afirmativa correta:',
    options: [
      {
        id: 'A',
        text: 'A governança planeja, constrói, executa e monitora atividades alinhadas com a direção estabelecida pelo corpo de gestão.',
      },
      {
        id: 'B',
        text: 'O COBIT 2019 diferencia sistema de governança de framework de governança; o sistema de governança é dinâmico e pode ser adaptado usando fatores de desenho (design factors).',
      },
      {
        id: 'C',
        text: 'O modelo de avaliação de capacidade de processos do COBIT 2019 adotou com exclusividade os níveis de maturidade de 1 a 5 da ISO 9001, abandonando a abordagem CMMI.',
      },
      {
        id: 'D',
        text: 'A cascata de metas do COBIT 2019 define que as metas de TI direcionam as necessidades dos stakeholders, as quais determinam os objetivos corporativos.',
      },
      {
        id: 'E',
        text: 'Os 40 objetivos do COBIT 2019 são divididos igualmente em quatro domínios exclusivos de governança, cabendo à gestão apenas a execução de SLAs.',
      },
    ],
    correctOptionId: 'B',
    justification:
      'No COBIT 2019, há uma distinção explícita entre "Sistema de Governança" (os componentes que criam valor, que é dinâmico e moldado através dos 11 Fatores de Desenho / Design Factors) e "Framework de Governança" (as regras e estrutura que orientam sua criação). A alternativa B expressa com exatidão esse pilar.',
    distractorExplanations: {
      A: 'Incorreta: A assertiva inverte os papéis. Quem "planeja, constrói, executa e monitora" (PBRM) é a GESTÃO. A governança avalia, direciona e monitora (EDM).',
      C: 'Incorreta: O COBIT 2019 baseia sua avaliação de capacidade de processo no CMMI (níveis de 0 a 5).',
      D: 'Incorreta: A cascata de metas parte das necessidades dos stakeholders -> Metas corporativas -> Metas de alinhamento -> Objetivos de governança e gestão.',
      E: 'Incorreta: São 5 domínios: 1 de governança (EDM - 5 objetivos) e 4 de gestão (APO, BAI, DSS, MEA - 35 objetivos), totalizando 40.',
    },
    syllabusCitation:
      'SEPLAG/RJ Anexo I - Governança e Gestão de TIC: COBIT 2019, princípios, sistema de governança, objetivos, componentes, cascata de metas e avaliação de capacidade.',
  },
  {
    id: 'seplag-gov-02',
    examId: 'seplag',
    subjectId: 'seplag_gov_tic',
    subjectName: 'Governança e Gestão de TIC',
    topicName: 'Gestão de Serviços de TIC (ITIL 4 Foundation)',
    format: 'multipla_escolha',
    difficulty: 'Médio',
    statement:
      'No contexto do ITIL 4 Foundation aplicado à gestão de serviços públicos de tecnologia, a equipe técnica do órgão está remodelando suas práticas para assegurar a co-criação de valor sustentável com os cidadãos.\n\nAssinale a opção que apresenta a definição correta de um dos Princípios Orientadores (Guiding Principles) do ITIL 4:',
    options: [
      {
        id: 'A',
        text: 'Foco no valor: Recomenda que o valor seja medido exclusivamente pela redução direta de custos financeiros nos contratos de infraestrutura.',
      },
      {
        id: 'B',
        text: 'Comece de onde você está: Orienta a descartar completamente serviços e processos pré-existentes para evitar vícios de concepção anteriores.',
      },
      {
        id: 'C',
        text: 'Progredir iterativamente com feedback: Sugere organizar o trabalho em partes menores e gerenciáveis que possam ser executadas e validadas oportunamente.',
      },
      {
        id: 'D',
        text: 'Pensar e trabalhar holisticamente: Recomenda isolar cada silo técnico para garantir que incidentes não contaminem outros componentes do catálogo.',
      },
      {
        id: 'E',
        text: 'Otimizar e automatizar: Estabelece que a automação de qualquer atividade deva preceder a simplificação do processo correspondente.',
      },
    ],
    correctOptionId: 'C',
    justification:
      'O princípio "Progredir iterativamente com feedback" (Progress iteratively with feedback) preconiza dividir iniciativas em ciclos menores, obtendo retorno rápido das partes interessadas antes de avançar, evitando desperdício de recursos e garantindo aderência às necessidades reais.',
    distractorExplanations: {
      A: 'Incorreta: Foco no valor compreende a experiência do cliente/usuário e o resultado gerado, e não mero corte financeiro isolado.',
      B: 'Incorreta: "Comece de onde você está" determina analisar o que já existe e funciona bem, reaproveitando antes de reinventar.',
      D: 'Incorreta: Trabalhar holisticamente combate ativamente silos organizacionais, enxergando a organização e os serviços como um todo integrado.',
      E: 'Incorreta: A regra de ouro é primeiro simplificar e otimizar; nunca se deve automatizar um processo ineficiente ou complexo demais.',
    },
    syllabusCitation:
      'SEPLAG/RJ Anexo I - Governança e Gestão de TIC: ITIL 4 Foundation; princípios, dimensões e cadeia de valor de serviços; gerenciamento de incidentes, problemas e melhoria contínua.',
  },
  {
    id: 'seplag-gov-03',
    examId: 'seplag',
    subjectId: 'seplag_gov_tic',
    subjectName: 'Governança e Gestão de TIC',
    topicName: 'Planejamento Estratégico de TIC e PDTIC',
    format: 'certo_errado',
    difficulty: 'Médio',
    statement:
      'O Plano Diretor de Tecnologia da Informação e Comunicação (PDTIC) no âmbito da Administração Pública é um instrumento de diagnóstico, planejamento e gestão dos recursos e processos de TIC. É correto afirmar que o PDTIC deve manter alinhamento estrito com os instrumentos orçamentários formais, notadamente o Plano Plurianual (PPA) e a Lei de Diretrizes Orçamentárias (LDO), servindo ainda como insumo obrigatório para a composição do Plano de Contratações Anual (PCA) de TIC do órgão.',
    options: [
      { id: 'C', text: 'Certo' },
      { id: 'E', text: 'Errado' },
    ],
    correctOptionId: 'C',
    justification:
      'Certo. O PDTIC deve necessariamente refletir o planejamento estratégico do ente federativo e vincular-se às diretrizes e metas orçamentárias (PPA e LDO). As contratações de TIC priorizadas no PDTIC fundamentam diretamente o Plano de Contratações Anual (PCA), garantindo governança orçamentária e conformidade com as orientações do Tribunal de Contas da União (TCU).',
    syllabusCitation:
      'SEPLAG/RJ Anexo I - Planejamento Estratégico de TIC: PDTIC, conceito, finalidade, elaboração, acompanhamento e revisão; alinhamento ao planejamento institucional, PPA, LDO e PCA.',
  },

  // ===================== SEPLAG-RJ: Dados e Inteligência Analítica =====================
  {
    id: 'seplag-data-01',
    examId: 'seplag',
    subjectId: 'seplag_dados_ia',
    subjectName: 'Dados e Inteligência Analítica',
    topicName: 'Governança de Dados (DAMA-DMBOK) e Privacidade',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    statement:
      'Em uma iniciativa de instituição da governança de dados em uma autarquia fluminense baseada nas boas práticas do DAMA-DMBOK e nas diretrizes da LGPD (Lei nº 13.709/2018), definiu-se a estrutura de papéis e responsabilidades sobre os ativos de informação.\n\nAcerca das atribuições específicas preconizadas pelo DMBOK e pela LGPD, assinale a afirmativa correta:',
    options: [
      {
        id: 'A',
        text: 'O Data Owner (proprietário do dado) é o profissional técnico responsável pela infraestrutura física de armazenamento e execução de rotinas de backup.',
      },
      {
        id: 'B',
        text: 'O Data Custodian (custodiante do dado) é tipicamente um líder de área de negócio que determina as regras de acesso e finalidade do uso da informação.',
      },
      {
        id: 'C',
        text: 'O Data Steward (curador/zelador do dado) atua como a ponte entre o negócio e a TI, assegurando a aplicação de padrões de qualidade, metadados e regras de conformidade na gestão diária dos dados.',
      },
      {
        id: 'D',
        text: 'O Encarregado de Proteção de Dados (DPO) responde solidariamente como operador do banco de dados relacional e é o único responsável técnico por falhas em consultas SQL.',
      },
      {
        id: 'E',
        text: 'A qualidade dos dados no DMBOK é mensurada apenas pela dimensão de volumetria, sendo desnecessárias métricas como completude, acurácia e tempestividade.',
      },
    ],
    correctOptionId: 'C',
    justification:
      'O Data Steward (zelador ou curador de dados) é a figura central na governança operacional do DAMA-DMBOK: ele zela pela qualidade, padronização de metadados, consistência e conformidade com as políticas estabelecidas pelo Data Owner (responsável pelo negócio).',
    distractorExplanations: {
      A: 'Incorreta: O Data Owner é um gestor de negócio com autoridade sobre a definição e uso do dado, e não quem cuida da infraestrutura de backup.',
      B: 'Incorreta: O Data Custodian é a área técnica/TI responsável pela custódia, segurança, integridade e armazenamento físico do dado.',
      D: 'Incorreta: O DPO (Encarregado) atua como canal de comunicação entre o controlador, titulares e a ANPD, e não opera infraestrutura técnica de SQL.',
      E: 'Incorreta: Volumetria não é dimensão de qualidade; dimensões clássicas do DMBOK incluem acurácia, completude, consistência, tempestividade, unicidade e validade.',
    },
    syllabusCitation:
      'SEPLAG/RJ Anexo I - Dados e Inteligência Analítica: Governança de dados, princípios, componentes e DAMA-DMBOK; papéis de data owner, data steward, data custodian e DPO.',
  },
  {
    id: 'seplag-data-02',
    examId: 'seplag',
    subjectId: 'seplag_dados_ia',
    subjectName: 'Dados e Inteligência Analítica',
    topicName: 'Arquitetura de Dados, Big Data e Data Lakehouse',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    statement:
      'Para modernizar a análise de políticas de saúde e educação, um órgão governamental projetou uma arquitetura analítica moderna integrando Data Warehouse, Data Lake e Data Lakehouse.\n\nSobre as características fundamentais dessas arquiteturas e técnicas de ingestão, assinale a afirmativa correta:',
    options: [
      {
        id: 'A',
        text: 'O Data Lakehouse combina a flexibilidade e o armazenamento de baixo custo de dados não estruturados do Data Lake com as propriedades ACID e os mecanismos de governança do Data Warehouse.',
      },
      {
        id: 'B',
        text: 'Na abordagem ETL clássica, os dados brutos são primeiramente carregados no banco analítico de destino e somente depois transformados pelo processador analítico.',
      },
      {
        id: 'C',
        text: 'O esquema em estrela (Star Schema) de modelagem dimensional caracteriza-se pela completa normalização de todas as tabelas de dimensão até a terceira forma normal (3FN).',
      },
      {
        id: 'D',
        text: 'Bancos de dados NoSQL do tipo chave-valor são desenhados prioritariamente para consultas relacionais multi-tabela com cláusulas complexas de JOIN em árvores de entidades.',
      },
      {
        id: 'E',
        text: 'A camada "Bronze" (Raw) de uma arquitetura Lakehouse medallion armazena exclusivamente dados já agregados, enriquecidos e prontos para consumo direto em dashboards executivos.',
      },
    ],
    correctOptionId: 'A',
    justification:
      'O conceito de Data Lakehouse (viabilizado por tecnologias como Delta Lake, Apache Iceberg e Hudi) une as melhores qualidades de ambos os mundos: o armazenamento escalável e diversificado de arquivos do Data Lake com controle transacional ACID, versionamento (time travel), esquema e governança típicos do Data Warehouse tradicional.',
    distractorExplanations: {
      B: 'Incorreta: No ETL tradicional, os dados são extraídos, transformados em uma área de staging temporária e então carregados (Load). Carregar antes de transformar é característico do ELT.',
      C: 'Incorreta: O Star Schema é desnormalizado; quem normaliza as dimensões reduzindo redundância é o Snowflake Schema.',
      D: 'Incorreta: Bancos chave-valor (ex: Redis) não fazem joins relacionais nem suportam árvores complexas estruturadas.',
      E: 'Incorreta: A camada Bronze guarda dados brutos/in natura. Dados agregados e prontos para consumo de negócio residem na camada Gold.',
    },
    syllabusCitation:
      'SEPLAG/RJ Anexo I - Dados e Inteligência Analítica: Bancos relacionais e NoSQL; Data Warehouse, Data Lake e Data Lakehouse; ETL e ELT; Big Data.',
  },
  {
    id: 'seplag-data-03',
    examId: 'seplag',
    subjectId: 'seplag_dados_ia',
    subjectName: 'Dados e Inteligência Analítica',
    topicName: 'Ciência de Dados, Machine Learning e IA Generativa',
    format: 'certo_errado',
    difficulty: 'Difícil',
    statement:
      'No desenvolvimento de modelos preditivos para identificação de risco de evasão escolar na rede estadual, a equipe constatou que o modelo apresentou acurácia de 99% na base de treino, mas apenas 61% na base de testes. Nesse cenário, ocorreu o fenômeno de overfitting (sobreajuste), o qual pode ser mitigado por técnicas como validação cruzada k-fold, simplificação do modelo ou aplicação de regularização (como penalidades L1 Lasso ou L2 Ridge).',
    options: [
      { id: 'C', text: 'Certo' },
      { id: 'E', text: 'Errado' },
    ],
    correctOptionId: 'C',
    justification:
      'Certo. O descompasso entre performance quase perfeita no treino e desempenho degradado no teste caracteriza tipicamente o overfitting (alta variância). As estratégias indicadas (validação cruzada, regularização L1/L2, poda e redução de complexidade) são os métodos padrões para restaurar a capacidade de generalização do algoritmo.',
    syllabusCitation:
      'SEPLAG/RJ Anexo I - Dados e Inteligência Analítica: Ciência de Dados e ciclo analítico; aprendizado de máquina supervisionado; overfitting e underfitting; regularização e validação.',
  },

  // ===================== DATAPREV: Desenvolvimento de Software (Perfil 3) =====================
  {
    id: 'dataprev-dev-01',
    examId: 'dataprev',
    profileId: 'dev_software',
    subjectId: 'dataprev_perfil3_dev',
    subjectName: 'Desenvolvimento de Software (Perfil 3)',
    topicName: 'Backend: Java, Spring Boot, APIs e Microsserviços',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    statement:
      'A equipe de desenvolvimento da Dataprev está refatorando um sistema legado previdenciário monolítico para uma arquitetura baseada em microsserviços com Spring Boot e Spring Cloud. Durante o desenho das fronteiras de serviço e garantia de resiliência, a arquitetura adotou o padrão Arquitetura Hexagonal (Ports and Adapters).\n\nNesse padrão arquitetural e nas práticas com ecossistema Spring, é correto afirmar que:',
    options: [
      {
        id: 'A',
        text: 'A lógica de negócio central (Core Domain) deve depender diretamente de anotações JPA do banco de dados relacional para facilitar o acoplamento.',
      },
      {
        id: 'B',
        text: 'As portas (Ports) definem as interfaces pelas quais o domínio se comunica com o mundo externo, enquanto os adaptadores (Adapters) implementam detalhes técnicos específicos como REST controllers ou repositórios SQL.',
      },
      {
        id: 'C',
        text: 'A comunicação assíncrona entre microsserviços via Kafka elimina completamente a necessidade de preocupações com idempotência no processamento de mensagens.',
      },
      {
        id: 'D',
        text: 'O padrão API Gateway no Spring Cloud deve conter toda a regra de negócio e cálculos de benefícios da previdência social.',
      },
      {
        id: 'E',
        text: 'O princípio da Inversão de Dependência (D do SOLID) estabelece que módulos de alto nível devem depender diretamente de implementações concretas de baixo nível.',
      },
    ],
    correctOptionId: 'B',
    justification:
      'Na Arquitetura Hexagonal de Alistair Cockburn, a lógica de negócio do domínio é isolada e pura: as Portas (Ports) declaram o contrato/interface do que o domínio precisa ou expõe, e os Adaptadores (Adapters) cuidam da tradução para tecnologias externas (HTTP REST, mensageria Kafka, banco JPA).',
    distractorExplanations: {
      A: 'Incorreta: O Core Domain jamais deve se acoplar a frameworks ou anotações de persistência externa.',
      C: 'Incorreta: Mensageria (Kafka) opera tipicamente em garantia at-least-once, tornando o tratamento de idempotência crucial para evitar duplicidades.',
      D: 'Incorreta: O API Gateway atua como ponto único de entrada (roteamento, autenticação, rate limit) e não deve concentrar regras de negócio de domínio.',
      E: 'Incorreta: O princípio diz exatamente o inverso: ambos devem depender de abstrações (interfaces), não o alto nível depender do baixo nível.',
    },
    syllabusCitation:
      'DATAPREV Anexo I - Perfil 3: Desenvolvimento de Sistemas; Arquitetura hexagonal, microsserviços (orquestração de serviços e API gateway) e containers; SOLID.',
  },
  {
    id: 'dataprev-dev-02',
    examId: 'dataprev',
    profileId: 'dev_software',
    subjectId: 'dataprev_perfil3_dev',
    subjectName: 'Desenvolvimento de Software (Perfil 3)',
    topicName: 'Desenvolvimento Seguro e OWASP Top 10',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    statement:
      'Em uma auditoria de segurança estática (SAST) em APIs REST da Dataprev, foi detectado que um endpoint recebia um parâmetro de consulta com identificador de documento e o concatenava diretamente na instrução SQL sem sanitização. Além disso, outro serviço permitia que um usuário autenticado acessasse prontuários de outros cidadãos apenas alterando o ID numérico na URL da requisição.\n\nDe acordo com o ranking OWASP Top 10, essas vulnerabilidades são classificadas, respectivamente, como:',
    options: [
      {
        id: 'A',
        text: 'Injection (A03:2021) e Broken Access Control / Controle de Acesso Quebrado (A01:2021).',
      },
      {
        id: 'B',
        text: 'Cryptographic Failures (A02:2021) e Security Misconfiguration (A05:2021).',
      },
      {
        id: 'C',
        text: 'Insecure Design (A04:2021) e Server-Side Request Forgery - SSRF (A10:2021).',
      },
      {
        id: 'D',
        text: 'Vulnerable and Outdated Components (A06:2021) e Injection (A03:2021).',
      },
      {
        id: 'E',
        text: 'Software and Data Integrity Failures (A08:2021) e Identification and Authentication Failures (A07:2021).',
      },
    ],
    correctOptionId: 'A',
    justification:
      'A concatenação direta de dados do usuário em comando SQL constitui clássica Injeção SQL (OWASP A03:2021 - Injection). Já a permissão para acessar recursos de terceiros manipulando IDs sem a devida verificação de autorização (conhecida historicamente como IDOR - Insecure Direct Object References) é a principal manifestação de Quebra de Controle de Acesso (OWASP A01:2021 - Broken Access Control, que ocupa o 1º lugar do Top 10).',
    distractorExplanations: {
      B: 'Incorreta: Falhas criptográficas dizem respeito a dados em repouso/trânsito sem criptografia forte; má configuração se refere a defaults inseguros.',
      C: 'Incorreta: SSRF ocorre quando o servidor busca recursos em URLs externas não confiáveis induzido pelo atacante.',
      D: 'Incorreta: Componentes vulneráveis tratam de dependências/bibliotecas desatualizadas com CVEs conhecidos.',
      E: 'Incorreta: Integridade de software envolve esteiras de CI/CD sem assinatura de artefatos.',
    },
    syllabusCitation:
      'DATAPREV Anexo I - Perfil 3: Segurança da Informação: OWASP Top 10; Análise estática e dinâmica de código (SAST e DAST); Mecanismos de segurança.',
  },

  // ===================== DATAPREV: Segurança Cibernética (Perfil 5) =====================
  {
    id: 'dataprev-sec-01',
    examId: 'dataprev',
    profileId: 'seguranca',
    subjectId: 'dataprev_perfil5_sec',
    subjectName: 'Segurança Cibernética e Proteção de Dados (Perfil 5)',
    topicName: 'Normas ISO 27000, Gestão de Riscos e Cibersegurança',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    statement:
      'A equipe de resposta a incidentes de segurança da informação (CSIRT) de uma empresa pública identificou tentativas persistentes de movimentação lateral e exfiltração de dados após um ataque de phishing bem-sucedido. Para catalogar as técnicas do adversário e planejar defesas de contenção, adotou-se o framework MITRE ATT&CK.\n\nSobre o funcionamento e taxonomia do MITRE ATT&CK, assinale a afirmativa correta:',
    options: [
      {
        id: 'A',
        text: 'O framework MITRE ATT&CK organiza o comportamento adversário em Táticas (o objetivo imediato do atacante) e Técnicas (como o objetivo é alcançado na prática).',
      },
      {
        id: 'B',
        text: 'O framework restringe-se exclusivamente a testes teóricos de penetração (pentest) em redes sem fio, não abrangendo ambientes Windows, Linux ou Nuvem.',
      },
      {
        id: 'C',
        text: 'A tática de "Initial Access" descreve a fase final de destruição de dados e solicitação de resgate em ataques de ransomware.',
      },
      {
        id: 'D',
        text: 'O modelo MITRE ATT&CK substitui inteiramente a norma ISO/IEC 27001, tornando prescindível a implementação de um Sistema de Gestão de Segurança da Informação (SGSI).',
      },
      {
        id: 'E',
        text: 'As técnicas mapeadas pelo MITRE ATT&CK baseiam-se unicamente em assinaturas de hashes MD5 de malwares, sem analisar comportamento ou procedimentos (TTPs).',
      },
    ],
    correctOptionId: 'A',
    justification:
      'A base do MITRE ATT&CK é estruturada na tríade TTP (Táticas, Técnicas e Procedimentos). As Táticas representam o "porquê" (o objetivo do adversário, ex: Persistência, Movimentação Lateral, Evasão de Defesa), enquanto as Técnicas descrevem o "como" (as ações específicas executadas).',
    distractorExplanations: {
      B: 'Incorreta: O ATT&CK cobre sistemas operacionais corporativos (Windows, macOS, Linux), Cloud (AWS, Azure, GCP, M365), redes e containers.',
      C: 'Incorreta: "Initial Access" é o vetor inicial de intrusão (ex: spearphishing, exploração de serviço público exposto). A destruição/resgate fica sob a tática de "Impact".',
      D: 'Incorreta: A ISO 27001 é um padrão de gestão organizacional (SGSI), enquanto o MITRE ATT&CK é uma base operacional de inteligência de ameaças; eles são complementares.',
      E: 'Incorreta: O ATT&CK foca no topo da "Pirâmide da Dor" de David Bianco (TTPs comportamentais), muito além de hashes estáticos.',
    },
    syllabusCitation:
      'DATAPREV Anexo I - Perfil 5: Conhecimento das Táticas do framework Mitre ATT&CK; Detecção, resposta e tratamento de Incidentes Cibernéticos.',
  },

  // ===================== DATAPREV & SEPLAG: Legislação de TIC e LGPD =====================
  {
    id: 'dataprev-law-01',
    examId: 'dataprev',
    subjectId: 'dataprev_conhecimentos_comuns',
    subjectName: 'Módulo Comum: Legislação de TIC, Segurança e IA',
    topicName: 'Legislação: LAI, Crimes Informáticos, Marco Civil e LGPD',
    format: 'multipla_escolha',
    difficulty: 'Médio',
    statement:
      'Em relação ao tratamento de dados pessoais realizado por pessoas jurídicas de direito público e empresas estatais prestadoras de serviços públicos (como a Dataprev e a SEPLAG), em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018), analise as afirmativas a seguir:\n\nI. O tratamento de dados pessoais pelo poder público deve ser realizado para o atendimento de sua finalidade pública, na persecução do interesse público, com o objetivo de executar as competências legais ou cumprir as atribuições legais do serviço público.\nII. Os dados pessoais constantes de bancos de dados governamentais podem ser livremente transferidos a entidades privadas com fins econômicos, independentemente de previsão legal ou finalidade pública.\nIII. A autoridade pública deve manter os dados em formato interoperável e estruturado para o uso compartilhado com outras entidades públicas na execução de políticas públicas.\n\nEstá correto o que se afirma em:',
    options: [
      { id: 'A', text: 'I, apenas.' },
      { id: 'B', text: 'I e III, apenas.' },
      { id: 'C', text: 'II e III, apenas.' },
      { id: 'D', text: 'I, II e III.' },
      { id: 'E', text: 'II, apenas.' },
    ],
    correctOptionId: 'B',
    justification:
      'Os itens I e III estão estritamente corretos segundo o art. 23 da LGPD (atendimento da finalidade pública e fornecimento de dados em formato interoperável para uso compartilhado). O item II está frontalmente incorreto, pois o art. 26, § 1º veda expressamente ao poder público transferir a entidades privadas dados pessoais constantes de bases de dados a que tenha acesso, ressalvadas hipóteses taxativas (ex: execução descentralizada de serviço público ou dados acessíveis publicamente).',
    distractorExplanations: {
      A: 'Incorreta: O item III também está expressamente previsto no art. 23, § 1º da LGPD.',
      C: 'Incorreta: O item II é vedado pelo art. 26 da LGPD.',
      D: 'Incorreta: O item II invalida a opção.',
      E: 'Incorreta: O item II é falso.',
    },
    syllabusCitation:
      'DATAPREV Anexo I - Legislação Acerca de Segurança da Informação e Proteção de Dados: Lei nº 13.709/2018 (LGPD) - capítulos I, II, III, IV e VII.',
  },
  {
    id: 'dataprev-law-02',
    examId: 'dataprev',
    subjectId: 'dataprev_conhecimentos_comuns',
    subjectName: 'Módulo Comum: Legislação de TIC, Segurança e IA',
    topicName: 'Legislação: LAI, Crimes Informáticos, Marco Civil e LGPD',
    format: 'certo_errado',
    difficulty: 'Médio',
    statement:
      'Segundo o Marco Civil da Internet (Lei nº 12.965/2014), na provisão de conexão à internet, cabe ao administrador de sistema autônomo manter os registros de conexão sob sigilo, em ambiente controlado e de segurança, pelo prazo de 1 (um) ano, sendo vedada a guarda dos registros de acesso a aplicações de internet nessa mesma operação de provisão de conexão.',
    options: [
      { id: 'C', text: 'Certo' },
      { id: 'E', text: 'Errado' },
    ],
    correctOptionId: 'C',
    justification:
      'Certo. Nos termos do art. 13 do Marco Civil da Internet (Lei nº 12.965/2014), o provedor de conexão deve manter os registros de conexão pelo prazo de 1 ano. Além disso, o art. 14 proíbe expressamente que o provedor de conexão guarde os registros de acesso a aplicações de internet (sites visitados pelos usuários), assegurando a privacidade e o sigilo das comunicações.',
    syllabusCitation:
      'DATAPREV Anexo I - Legislação de TI: Lei nº 12.965/2014 (Marco Civil da Internet) - capítulos II e III.',
  },

  // ===================== DATAPREV: Inteligência da Informação (Perfil 4) =====================
  {
    id: 'dataprev-data-01',
    examId: 'dataprev',
    profileId: 'inteligencia_info',
    subjectId: 'dataprev_perfil4_data',
    subjectName: 'Inteligência da Informação (Perfil 4)',
    topicName: 'Ciência de Dados, Machine Learning e IA',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    statement:
      'Na avaliação de modelos de classificação binária para identificação de fraudes em concessão de benefícios previdenciários, a ocorrência de um falso negativo (uma fraude não detectada pelo algoritmo) acarreta prejuízo orçamentário direto severo ao erário. Já o falso positivo exige apenas uma checagem documental adicional pelo servidor público.\n\nConsiderando a matriz de confusão e o trade-off entre métricas de avaliação, o cientista de dados da Dataprev deve priorizar a otimização de qual métrica:',
    options: [
      {
        id: 'A',
        text: 'Acurácia simples, pois ela reflete com fidelidade a performance mesmo quando as classes são extremamente desbalanceadas.',
      },
      {
        id: 'B',
        text: 'Revocação (Recall ou Sensibilidade), pois mede a proporção de fraudes reais que foram corretamente identificadas pelo modelo, minimizando os falsos negativos.',
      },
      {
        id: 'C',
        text: 'Especificidade, com o objetivo primário de maximizar a identificação exclusiva de cidadãos idôneos não fraudulentos.',
      },
      {
        id: 'D',
        text: 'Coeficiente de determinação (R²), que é a métrica padrão para problemas de classificação binária.',
      },
      {
        id: 'E',
        text: 'Índice de Silhueta, que quantifica a homogeneidade de clusters em algoritmos supervisionados.',
      },
    ],
    correctOptionId: 'B',
    justification:
      'Em cenários onde o Falso Negativo (deixar passar uma fraude) é a falha mais crítica, a métrica prioritária é a Revocação (Recall = VP / (VP + FN)). Maximizar o Recall garante que a grande maioria dos casos fraudulentos reais seja capturada pelo modelo.',
    distractorExplanations: {
      A: 'Incorreta: Em bases desbalanceadas (ex: 99% normais e 1% fraudes), um modelo que prevê sempre "não-fraude" atinge 99% de acurácia, sendo inútil.',
      C: 'Incorreta: A especificidade foca nos verdadeiros negativos (não-fraudes), não priorizando a contenção dos falsos negativos.',
      D: 'Incorreta: O R² é métrica de regressão linear contínua, não de classificação binária.',
      E: 'Incorreta: Índice de Silhueta é métrica de agrupamento não-supervisionado (clustering).',
    },
    syllabusCitation:
      'DATAPREV Anexo I - Perfil 4: Ciência de Dados; Métricas de avaliação de modelos; Aprendizado supervisionado.',
  },

  // ===================== DATAPREV: Análise de Negócios de TI (Perfil 1) =====================
  {
    id: 'dataprev-biz-01',
    examId: 'dataprev',
    profileId: 'analise_negocios',
    subjectId: 'dataprev_perfil1_negocios',
    subjectName: 'Análise de Negócios de TI (Perfil 1)',
    topicName: 'Gerenciamento de Processos de Negócio (BPM CBOK v4)',
    format: 'multipla_escolha',
    difficulty: 'Médio',
    statement:
      'De acordo com o Guia para o Gerenciamento de Processos de Negócio (BPM CBOK v4.0), os processos organizacionais são estruturados em uma hierarquia bem delimitada para permitir a governança e a rastreabilidade das operações.\n\nAssinale a opção que apresenta a sequência correta da hierarquia de processos, do nível de maior agregação estratégica para o nível mais granular de execução:',
    options: [
      {
        id: 'A',
        text: 'Macroprocesso -> Processo -> Subprocesso -> Atividade -> Tarefa.',
      },
      {
        id: 'B',
        text: 'Processo -> Macroprocesso -> Atividade -> Subprocesso -> Tarefa.',
      },
      {
        id: 'C',
        text: 'Tarefa -> Atividade -> Subprocesso -> Processo -> Macroprocesso.',
      },
      {
        id: 'D',
        text: 'Cadeia de Valor -> Tarefa -> Subprocesso -> Processo -> Procedimento.',
      },
      {
        id: 'E',
        text: 'Macroprocesso -> Subprocesso -> Processo -> Procedimento -> Regra de Negócio.',
      },
    ],
    correctOptionId: 'A',
    justification:
      'Conforme o BPM CBOK v4.0 (explicitamente citado no edital da Dataprev): "Hierarquia do processo: Macroprocesso, Processo, Subprocesso, Atividades e Tarefa". A Tarefa representa a unidade atômica e mais granular do trabalho dentro de uma atividade.',
    distractorExplanations: {
      B: 'Incorreta: Inverte Macroprocesso e Processo.',
      C: 'Incorreta: Ordem inversa (do menor para o maior).',
      D: 'Incorreta: Tarefa posicionada antes de processo e subprocesso.',
      E: 'Incorreta: Subprocesso antes de Processo e Procedimento não faz parte dessa escala canônica do CBOK.',
    },
    syllabusCitation:
      'DATAPREV Anexo I - Perfil 1: Gerenciamento de Processos de Negócio (BPM CBOK v.4.0): Hierarquia do processo: Macroprocesso, Processo, Subprocesso, Atividades e Tarefa.',
  },

  // ===================== SEPLAG-RJ: Língua Portuguesa FGV =====================
  {
    id: 'seplag-port-01',
    examId: 'seplag',
    subjectId: 'seplag_conhecimentos_gerais',
    subjectName: 'Conhecimentos Gerais (Língua Portuguesa e Raciocínio)',
    topicName: 'Língua Portuguesa (Estilo FGV)',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    statement:
      'Considere o período a seguir, extraído de um relatório técnico de governança pública:\n\n"Embora os gestores compreendam a urgência da transformação digital dos serviços públicos, nem todos os departamentos alocaram recursos suficientes para a capacitação das equipes, o que comprometeu a tempestividade da entrega."\n\nNo que concerne à relação lógica e semântica entre as orações e o emprego de seus conectores, assinale a afirmativa correta:',
    options: [
      {
        id: 'A',
        text: 'A oração introduzida pela conjunção "Embora" exprime uma relação de causa e efeito em relação à oração principal.',
      },
      {
        id: 'B',
        text: 'O conector "Embora" introduz uma oração subordinada adverbial concessiva, indicando uma ressalva que não impede a ocorrência do fato expresso na oração principal.',
      },
      {
        id: 'C',
        text: 'A substituição de "Embora" por "Visto que", mantendo-se o tempo verbal inalterado, preservaria o sentido de oposição original do enunciado.',
      },
      {
        id: 'D',
        text: 'O pronome "o que" exerce função anafórica que retoma especificamente o substantivo "departamentos".',
      },
      {
        id: 'E',
        text: 'A vírgula após "públicos" é incorreta, visto que orações adverbiais antepostas não devem ser isoladas por vírgula na norma culta.',
      },
    ],
    correctOptionId: 'B',
    justification:
      'A conjunção "Embora" é tipicamente concessiva: ela introduz uma ideia que se contrapõe à oração principal, mas não a anula ou impede. Na tradição da banca FGV, o reconhecimento do valor semântico de oposição/concessão dos conectivos é questão recorrente.',
    distractorExplanations: {
      A: 'Incorreta: A relação é de concessão/oposição atenuada, não de causa direta.',
      C: 'Incorreta: "Visto que" é conjunção causal e alteraria por completo o sentido do texto.',
      D: 'Incorreta: "o que" retoma a totalidade da oração anterior (o fato de nem todos os departamentos terem alocado recursos), não apenas o vocábulo "departamentos".',
      E: 'Incorreta: A oração adverbial anteposta exige pontuação (vírgula obrigatória).',
    },
    syllabusCitation:
      'SEPLAG/RJ Anexo I - Língua Portuguesa: Coesão, coerência; conectores e operadores argumentativos; pontuação e sinais gráficos.',
  },

  // ===================== SEPLAG-RJ: Segurança da Informação e Criptografia =====================
  {
    id: 'seplag-sec-01',
    examId: 'seplag',
    subjectId: 'seplag_gov_tic',
    subjectName: 'Governança e Gestão de TIC',
    topicName: 'Segurança da Informação: ISO/IEC 27001:2022 e ISO/IEC 27002',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    focusDistractors: true,
    statement:
      'A ISO/IEC 27002 em sua versão atualizada reformulou a taxonomia dos controles de segurança da informação, substituindo as antigas 14 seções por 4 temas consolidados, além de introduzir atributos taxonômicos para facilitar a categorização dos controles pelos gestores de risco.\n\nAssinale a opção que apresenta correta e exclusivamente os quatro novos temas de controles da ISO/IEC 27002:',
    options: [
      { id: 'A', text: 'Preventivo, Detectivo, Corretivo e Compensatório.' },
      { id: 'B', text: 'Controles Organizacionais, Controles de Pessoas, Controles Físicos e Controles Tecnológicos.' },
      { id: 'C', text: 'Governança, Gestão de Riscos, Continuidade de Negócios e Criptografia.' },
      { id: 'D', text: 'Confidencialidade, Integridade, Disponibilidade e Autenticidade.' },
      { id: 'E', text: 'Identificação, Proteção, Detecção e Resposta a Incidentes.' },
    ],
    correctOptionId: 'B',
    justification:
      'A norma ABNT NBR ISO/IEC 27002:2022 estruturou seus 93 controles em exatamente quatro temas lógicos: Controles Organizacionais (37 controles), Controles de Pessoas (8 controles), Controles Físicos (14 controles) e Controles Tecnológicos (34 controles).',
    distractorExplanations: {
      A: 'Incorreta: Preventivo, detectivo e corretivo são tipos de controle (atributo "Control type"), e não temas estruturais.',
      C: 'Incorreta: Mistura processos de governança com práticas específicas.',
      D: 'Incorreta: São as propriedades fundamentais da segurança da informação (tríade CID + autenticidade).',
      E: 'Incorreta: São funções do NIST Cybersecurity Framework (CSF: Identify, Protect, Detect, Respond, Recover).',
    },
    syllabusCitation:
      'SEPLAG/RJ Anexo I - Governança de TIC: Gestão de Segurança da Informação; normas ABNT NBR ISO/IEC 27001 e ISO/IEC 27002; controles e temas.',
  },
  {
    id: 'seplag-sec-02',
    examId: 'seplag',
    subjectId: 'seplag_gov_tic',
    subjectName: 'Governança e Gestão de TIC',
    topicName: 'Criptografia, Hash e Assinatura Digital ICP-Brasil',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    focusDistractors: true,
    statement:
      'Um analista de TI da SEPLAG-RJ foi encarregado de desenhar a infraestrutura de segurança para envio de declarações orçamentárias confidenciais entre secretarias. A solução deve garantir confidencialidade no armazenamento, não repúdio do emissor e verificação de que o documento não sofreu alteração no trânsito.\n\nConsiderando os conceitos de criptografia e assinatura digital (padrão ICP-Brasil), assinale a afirmativa correta:',
    options: [
      {
        id: 'A',
        text: 'A assinatura digital é gerada encriptando-se o hash do documento com a chave pública do emissor, de modo que qualquer um possa decifrá-la com a chave privada.',
      },
      {
        id: 'B',
        text: 'A assinatura digital consiste na cifragem do resumo criptográfico (hash) do documento com a chave privada do remetente, garantindo autenticidade, integridade e não repúdio.',
      },
      {
        id: 'C',
        text: 'O algoritmo SHA-256 é um mecanismo de cifragem simétrica reversível que permite recuperar o texto original mediante a aplicação da chave privada correspondente.',
      },
      {
        id: 'D',
        text: 'Para garantir confidencialidade ao enviar uma mensagem para Maria, João deve cifrar o arquivo com a chave pública de João.',
      },
      {
        id: 'E',
        text: 'A criptografia simétrica (como AES-256) é dispensada em sistemas modernos em virtude de ser matematicamente menos segura que a criptografia assimétrica RSA de 2048 bits.',
      },
    ],
    correctOptionId: 'B',
    justification:
      'Para assinar digitalmente: calcula-se o hash da mensagem e encripta-se esse hash com a CHAVE PRIVADA do autor. O destinatário decifra o hash usando a chave pública do autor e compara com o hash recalculado do arquivo. Se coincidirem, prova-se que o dono da chave privada assinou (autenticidade e não repúdio) e que o conteúdo não foi alterado (integridade).',
    distractorExplanations: {
      A: 'Incorreta: Inverte as chaves: encripta-se com a chave privada do autor, e decifra-se com a chave pública.',
      C: 'Incorreta: Funções de Hash (como SHA-256) são funções unidirecionais (one-way), ou seja, irreversíveis.',
      D: 'Incorreta: Para garantir confidencialidade, João cifra com a chave PÚBLICA DE MARIA (destinatária), pois somente a chave privada de Maria poderá decifrar.',
      E: 'Incorreta: A criptografia simétrica AES é extremamente rápida e segura, sendo amplamente combinada com a assimétrica em sistemas híbridos (ex: TLS/HTTPS).',
    },
    syllabusCitation:
      'SEPLAG/RJ Anexo I - Segurança da Informação: Criptografia simétrica e assimétrica; funções hash; assinatura digital e certificação ICP-Brasil.',
  },
  {
    id: 'seplag-lgpd-01',
    examId: 'seplag',
    subjectId: 'seplag_dados_ia',
    subjectName: 'Dados e Inteligência Analítica',
    topicName: 'Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    focusDistractors: true,
    statement:
      'A Secretaria de Fazenda e Planejamento realiza o cruzamento de bases cadastrais contendo dados pessoais de cidadãos e servidores públicos para apuração de fraudes tributárias e concessão de benefícios sociais. Os auditores questionaram a base legal aplicável sob a ótica da Lei Geral de Proteção de Dados Pessoais (LGPD).\n\nÀ luz da LGPD (Lei nº 13.709/2018) quanto ao tratamento de dados pela Administração Pública, assinale a opção correta:',
    options: [
      {
        id: 'A',
        text: 'O tratamento de dados pessoais pelo poder público depende, em todos os casos e sem exceção, de prévio consentimento formal e por escrito de cada cidadão titular.',
      },
      {
        id: 'B',
        text: 'A Administração Pública pode tratar dados pessoais para a execução de políticas públicas previstas em leis e regulamentos ou respaldadas em contratos, convênios ou instrumentos congêneres, independentemente de consentimento.',
      },
      {
        id: 'C',
        text: 'A base legal do "Legítimo Interesse do Controlador" pode ser utilizada livremente por órgãos e entidades públicas em qualquer hipótese de tratamento de dados sensíveis.',
      },
      {
        id: 'D',
        text: 'A Autoridade Nacional de Proteção de Dados (ANPD) não possui competência regulatória ou sancionatória sobre órgãos da Administração Pública direta.',
      },
      {
        id: 'E',
        text: 'O compartilhamento de dados entre entes públicos é expressamente vedado pela LGPD, ainda que destinado ao atendimento de finalidades públicas estritas.',
      },
    ],
    correctOptionId: 'B',
    justification:
      'O art. 7º, inciso III, e o Capítulo IV da LGPD estabelecem expressamente que o tratamento de dados pessoais por pessoas jurídicas de direito público é legítimo para a consecução de finalidades públicas e na execução de políticas públicas legalmente respaldadas, sem necessidade de consentimento do titular.',
    distractorExplanations: {
      A: 'Incorreta: O consentimento é apenas uma das 10 bases legais; a execução de políticas públicas dispensa o consentimento.',
      C: 'Incorreta: O legítimo interesse não se aplica para dados pessoais sensíveis (art. 11), e o art. 10 delimita seu uso pelo poder público.',
      D: 'Incorreta: A ANPD fiscaliza e aplica sanções administrativas a órgãos públicos (exceto multas pecuniárias, mas com advertências, publicização e bloqueios).',
      E: 'Incorreta: O compartilhamento é permitido desde que voltado ao atendimento de finalidades públicas de execução de políticas.',
    },
    syllabusCitation:
      'SEPLAG/RJ Anexo I - Dados e Inteligência Analítica: Lei nº 13.709/2018 (LGPD); princípios, direitos dos titulares, bases legais de tratamento no setor público e atuação da ANPD.',
  },

  // ===================== DATAPREV: Perfil 2 (Arquitetura, Engenharia e Sustentação) =====================
  {
    id: 'dataprev-arch-01',
    examId: 'dataprev',
    profileId: 'arquitetura_sustentacao',
    subjectId: 'dataprev_perfil2_infra',
    subjectName: 'Arquitetura, Engenharia e Sustentação (Perfil 2)',
    topicName: 'Contêineres e Orquestração Kubernetes (K8s)',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    focusDistractors: true,
    statement:
      'A infraestrutura da Dataprev executa sistemas críticos em um cluster de Kubernetes de larga escala. Um engenheiro de software precisa expor uma aplicação de consulta previdenciária internamente para outros microsserviços do mesmo cluster e garantir balanceamento de carga entre as réplicas dos Pods.\n\nSobre os tipos de Services e objetos de rede no Kubernetes, assinale a afirmativa correta:',
    options: [
      {
        id: 'A',
        text: 'O Service do tipo ClusterIP é o tipo padrão; ele aloca um endereço IP virtual acessível exclusivamente de dentro do cluster, balanceando o tráfego entre os Pods selecionados por rótulos (labels).',
      },
      {
        id: 'B',
        text: 'O Service do tipo NodePort aloca um IP externo roteável diretamente na internet pública sem necessidade de expor portas altas dos nós do cluster.',
      },
      {
        id: 'C',
        text: 'O Ingress Controller é um componente de hardware que substitui completamente a necessidade de definir Services dentro do cluster.',
      },
      {
        id: 'D',
        text: 'Cada Pod em um cluster Kubernetes pode conter estritamente um único contêiner, sendo proibido o padrão sidecar.',
      },
      {
        id: 'E',
        text: 'O objeto StatefulSet deve ser evitado para bancos de dados porque ele não garante ordem de inicialização nem identificadores de rede estáveis.',
      },
    ],
    correctOptionId: 'A',
    justification:
      'ClusterIP é o tipo de Service default no K8s. Ele cria um IP virtual interno estável que atua como proxy/balanceador para os Pods que coincidem com os seletores (labels/selectors), sendo a forma padrão de comunicação interna entre microsserviços.',
    distractorExplanations: {
      B: 'Incorreta: NodePort abre uma porta estática (geralmente entre 30000-32767) em cada nó do cluster.',
      C: 'Incorreta: O Ingress atua na camada 7 (HTTP/HTTPS) roteando para os Services do cluster; ele não é hardware nem elimina Services.',
      D: 'Incorreta: Pods podem conter múltiplos contêineres que compartilham rede (localhost) e volumes, padrão fundamental de sidecars.',
      E: 'Incorreta: StatefulSet é precisamente o objeto desenhado para aplicações stateful (como bancos de dados), garantindo IDs de rede estáveis e persistência dedicada.',
    },
    syllabusCitation:
      'DATAPREV Anexo I - Perfil 2: Arquitetura, Engenharia e Sustentação; contêineres Docker, orquestração Kubernetes, Pods, Deployments, Services, Ingress e StatefulSets.',
  },
  {
    id: 'dataprev-arch-02',
    examId: 'dataprev',
    profileId: 'arquitetura_sustentacao',
    subjectId: 'dataprev_perfil2_infra',
    subjectName: 'Arquitetura, Engenharia e Sustentação (Perfil 2)',
    topicName: 'Bancos de Dados: PostgreSQL, MVCC e Níveis de Isolamento',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    focusDistractors: true,
    statement:
      'No gerenciamento de banco de dados relacional PostgreSQL em ambientes de alta concorrência de transações previdenciárias, a equipe técnica analisa o mecanismo de controle de concorrência multiversão (MVCC) e os níveis de isolamento ANSI SQL.\n\nAssinale a afirmativa correta sobre o comportamento do PostgreSQL:',
    options: [
      {
        id: 'A',
        text: 'No nível de isolamento Read Committed (padrão do PostgreSQL), uma consulta SELECT enxerga um snapshot fixado no instante em que a transação inteira começou.',
      },
      {
        id: 'B',
        text: 'No mecanismo MVCC do PostgreSQL, leituras de dados nunca bloqueiam escritas, e escritas de dados nunca bloqueiam leituras simples de dados.',
      },
      {
        id: 'C',
        text: 'O comando VACUUM é desnecessário no PostgreSQL moderno, pois registros marcados como obsoletos (dead tuples) são excluídos instantaneamente do disco na finalização do comando DELETE.',
      },
      {
        id: 'D',
        text: 'O nível de isolamento Repeatable Read impede a anomalia de Serialização (Serialization Anomaly) dispensando o nível Serializable.',
      },
      {
        id: 'E',
        text: 'Índices do tipo B-Tree não suportam operadores de comparação como =, <, <=, >, >=, sendo restritos a buscas de texto com predicados LIKE.',
      },
    ],
    correctOptionId: 'B',
    justification:
      'O pilar central do MVCC (Multi-Version Concurrency Control) do PostgreSQL é: "readers never block writers, and writers never block readers". Isso garante alta vazão concorrente sem que transações de leitura retenham locks exclusivos em tabelas ou tuplas.',
    distractorExplanations: {
      A: 'Incorreta: No Read Committed, cada comando individual vê um snapshot no início DO COMANDO, e não no início da transação. Quem vê o snapshot fixo da transação é o Repeatable Read.',
      C: 'Incorreta: UPDATEs e DELETEs criam novas versões de tuplas ou marcam antigas como mortas (dead tuples). O VACUUM é indispensável para reclaim de espaço e congelamento de Transaction IDs.',
      D: 'Incorreta: O Repeatable Read no PostgreSQL previne Leitura Fantasma (Phantom Read), mas ainda pode sofrer de anomalias de serialização (Write Skew). Somente o Serializable impede todas as anomalias.',
      E: 'Incorreta: B-Tree é o índice padrão universal para operadores de ordenação e comparação (=, <, <=, >, >=). Para buscas parciais de texto ou arrays usam-se GIN ou GiST.',
    },
    syllabusCitation:
      'DATAPREV Anexo I - Perfil 2: Bancos de dados relacionais e SGBD PostgreSQL; controle de concorrência MVCC, níveis de isolamento, locks, VACUUM e indexação.',
  },

  // ===================== DATAPREV: Perfil 5 (Segurança Cibernética e Proteção de Dados) =====================
  {
    id: 'dataprev-sec-01',
    examId: 'dataprev',
    profileId: 'seguranca',
    subjectId: 'dataprev_perfil5_seg',
    subjectName: 'Segurança Cibernética e Proteção de Dados (Perfil 5)',
    topicName: 'Arquitetura Zero Trust (NIST SP 800-207)',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    focusDistractors: true,
    statement:
      'A Dataprev está implementando a arquitetura Zero Trust baseada na publicação especial NIST SP 800-207 para proteger ativos críticos de processamento previdenciário e acesso de operadores em trabalho híbrido.\n\nDe acordo com os princípios fundamentais da arquitetura Zero Trust do NIST, assinale a opção correta:',
    options: [
      {
        id: 'A',
        text: 'A confiança é atribuída implicitamente a qualquer usuário ou dispositivo situado dentro dos limites físicos da rede local interna (LAN) do datacenter.',
      },
      {
        id: 'B',
        text: 'O acesso a recursos individuais é concedido por sessão com privilégios mínimos estritos, sendo a autenticação e a autorização dinâmicas e continuamente reavaliadas antes do acesso ser permitido.',
      },
      {
        id: 'C',
        text: 'O mecanismo do Policy Enforcement Point (PEP) é responsável exclusivo pela tomada de decisões lógicas de acesso, dispensando o Policy Decision Point (PDP).',
      },
      {
        id: 'D',
        text: 'A criptografia de tráfego de rede é considerada redundante e dispensável uma vez que a identidade do usuário já tenha sido validada pelo firewall de borda.',
      },
      {
        id: 'E',
        text: 'A política Zero Trust restringe-se ao controle de dispositivos corporativos físicos (hardware), não se aplicando a microsserviços, APIs ou chamadas de banco de dados.',
      },
    ],
    correctOptionId: 'B',
    justification:
      'O princípio orientador do Zero Trust é "Never Trust, Always Verify". Nenhum dispositivo ou usuário possui confiança implícita baseada em localização na rede. Toda solicitação de recurso é avaliada dinamicamente pelo Policy Decision Point (PDP) com privilégio mínimo, e aplicada pelo Policy Enforcement Point (PEP).',
    distractorExplanations: {
      A: 'Incorreta: Zero Trust rejeita a premissa de perímetro confiável interno.',
      C: 'Incorreta: O PDP (Policy Decision Point) decide; o PEP (Policy Enforcement Point) apenas executa e aplica a decisão.',
      D: 'Incorreta: A comunicação deve ser encriptada ponta a ponta (mTLS), independentemente da rede.',
      E: 'Incorreta: Aplica-se integralmente a identidades de máquinas, microsserviços, chamadas de API e dados.',
    },
    syllabusCitation:
      'DATAPREV Anexo I - Perfil 5: Segurança Cibernética; conceitos de Arquitetura Zero Trust (NIST SP 800-207), PDP, PEP e microsegmentação de redes.',
  },
  {
    id: 'dataprev-sec-02',
    examId: 'dataprev',
    profileId: 'seguranca',
    subjectId: 'dataprev_perfil5_seg',
    subjectName: 'Segurança Cibernética e Proteção de Dados (Perfil 5)',
    topicName: 'Vulnerabilidades Web e OWASP Top 10',
    format: 'certo_errado',
    difficulty: 'Difícil',
    focusDistractors: true,
    statement:
      'Na edição recente da OWASP Top 10, a categoria "Quebra de Controle de Acesso" (Broken Access Control) assumiu a primeira colocação (A01). Essa falha ocorre tipicamente quando a aplicação permite que um usuário comum acesse registros ou recursos confidenciais de outros usuários simplesmente manipulando identificadores numéricos ou parâmetros na URL (IDOR - Insecure Direct Object References), o que deve ser mitigado implementando checagens de autorização robustas no lado do servidor em todas as requisições.',
    options: [
      { id: 'C', text: 'Certo' },
      { id: 'E', text: 'Errado' },
    ],
    correctOptionId: 'C',
    justification:
      'Certo. A01:2021 - Broken Access Control é a vulnerabilidade mais incidente segundo a OWASP. IDOR é o exemplo clássico dessa falha, e a defesa indispensável é validar no backend se a sessão do usuário autenticado possui direito de acesso sobre o objeto solicitado antes de devolvê-lo.',
    syllabusCitation:
      'DATAPREV Anexo I - Perfil 5: Segurança em Aplicações Web; OWASP Top 10; Broken Access Control, Injection, XSS e CSRF.',
  },

  // ===================== DATAPREV: Perfil 4 (Inteligência da Informação) =====================
  {
    id: 'dataprev-data-01',
    examId: 'dataprev',
    profileId: 'inteligencia_info',
    subjectId: 'dataprev_perfil4_dados',
    subjectName: 'Inteligência da Informação (Perfil 4)',
    topicName: 'Modelagem Dimensional: Dimensões de Mudança Lenta (SCD)',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    focusDistractors: true,
    statement:
      'Em um Data Warehouse analítico da Dataprev modelado segundo a metodologia dimensional de Ralph Kimball, armazena-se o histórico cadastral de agências da Previdência Social. Quando uma agência altera seu município ou endereço físico, a equipe de modelagem precisa preservar a capacidade de realizar análises retroativas precisas das transações ocorridas antes da mudança e, simultaneamente, das novas transações ocorridas após a mudança.\n\nPara atender integralmente a esse requisito preservando o histórico de alterações, a técnica correta de Slowly Changing Dimension (SCD) a ser adotada é:',
    options: [
      {
        id: 'A',
        text: 'SCD Tipo 1: Sobrescrever os valores dos atributos antigos pelos novos na mesma linha da tabela, descartando o histórico para economizar espaço de armazenamento.',
      },
      {
        id: 'B',
        text: 'SCD Tipo 2: Inserir uma nova linha na tabela de dimensão com uma nova chave substituta (surrogate key), mantendo as datas de início e fim de validade e o flag de registro ativo.',
      },
      {
        id: 'C',
        text: 'SCD Tipo 0: Truncar a tabela de fatos para reconstruir o cubo OLAP a partir do zero a cada execução de carga noturna.',
      },
      {
        id: 'D',
        text: 'SCD Tipo 3: Criar uma nova tabela de fatos dedicada para cada alteração de atributo cadastral do registro.',
      },
      {
        id: 'E',
        text: 'SCD Tipo 4: Descartar a chave primária da dimensão e vincular a tabela fato diretamente ao log de transações do banco de dados relacional.',
      },
    ],
    correctOptionId: 'B',
    justification:
      'O SCD Tipo 2 (Slowly Changing Dimension Type 2) é o padrão de ouro de Kimball para rastreamento histórico completo. Ele cria um novo registro para cada alteração com nova surrogate key, data de início, data de expiração e indicador de registro corrente (is_current), permitindo segmentar métricas antes e depois da data da mudança.',
    distractorExplanations: {
      A: 'Incorreta: O SCD Tipo 1 apenas sobrescreve o valor antigo, destruindo o histórico analítico.',
      C: 'Incorreta: SCD Tipo 0 significa retenção original sem alterações (atributos fixos imutáveis).',
      D: 'Incorreta: SCD Tipo 3 adiciona uma coluna na mesma linha (ex: "municipio_anterior") guardando apenas uma mudança prévia, não novas tabelas fato.',
      E: 'Incorreta: Não existe essa definição no modelo de Kimball.',
    },
    syllabusCitation:
      'DATAPREV Anexo I - Perfil 4: Inteligência da Informação; modelagem dimensional de Ralph Kimball, tabelas fato e dimensão, surrogate keys e SCD tipos 1, 2 e 3.',
  },

  // ===================== DATAPREV: Perfil 3 (Desenvolvimento de Software) =====================
  {
    id: 'dataprev-dev-02',
    examId: 'dataprev',
    profileId: 'dev_software',
    subjectId: 'dataprev_perfil3_dev',
    subjectName: 'Desenvolvimento de Software (Perfil 3)',
    topicName: 'Padrões de Projeto (Design Patterns GoF)',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    focusDistractors: true,
    statement:
      'Um arquiteto de software na Dataprev precisa projetar um módulo de cálculo de alíquotas previdenciárias que variam conforme a categoria do segurado (contribuinte individual, empregado doméstico, servidor público). O sistema deve permitir incorporar novas regras de cálculo e novos algoritmos sem alterar as classes de processamento nem recorrer a estruturas condicionais extensas (como múltiplos if/else ou switch/case aninhados).\n\nAssinale o padrão de projeto comportamental do catálogo GoF (Gang of Four) mais indicado para essa arquitetura:',
    options: [
      { id: 'A', text: 'Strategy' },
      { id: 'B', text: 'Singleton' },
      { id: 'C', text: 'Adapter' },
      { id: 'D', text: 'Decorator' },
      { id: 'E', text: 'Observer' },
    ],
    correctOptionId: 'A',
    justification:
      'O padrão comportamental Strategy define uma família de algoritmos, encapsula cada um deles em classes separadas e os torna intercambiáveis em tempo de execução. Ele resolve exatamente a eliminação de cadeias de if/else e atende ao princípio Open/Closed (aberto para extensão, fechado para modificação).',
    distractorExplanations: {
      B: 'Incorreta: Singleton garante instância única de uma classe; não encapsula variações de algoritmos.',
      C: 'Incorreta: Adapter é padrão estrutural para converter a interface de uma classe em outra esperada pelos clientes.',
      D: 'Incorreta: Decorator agrega responsabilidades dinâmicas a um objeto sem criar subclasses, mas não modela a escolha de algoritmos alternativos.',
      E: 'Incorreta: Observer é padrão comportamental para notificação 1-para-N entre objetos quando o estado de um sujeito muda.',
    },
    syllabusCitation:
      'DATAPREV Anexo I - Perfil 3: Desenvolvimento de Software; padrões de projeto GoF (criacionais, estruturais e comportamentais); princípios SOLID.',
  },
  {
    id: 'dataprev-dev-03',
    examId: 'dataprev',
    profileId: 'dev_software',
    subjectId: 'dataprev_perfil3_dev',
    subjectName: 'Desenvolvimento de Software (Perfil 3)',
    topicName: 'Microsserviços: Resiliência com Circuit Breaker',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    focusDistractors: true,
    statement:
      'Em uma arquitetura de microsserviços do sistema previdenciário, o serviço de Emissão de Certidões realiza chamadas HTTP síncronas ao serviço de Cadastro de Contribuintes. Para evitar o efeito cascata de indisponibilidade (cascading failure) quando o serviço de cadastro estiver instável ou fora do ar, implementou-se o padrão Circuit Breaker (Disjuntor).\n\nSobre a máquina de estados do padrão Circuit Breaker, assinale a opção correta:',
    options: [
      {
        id: 'A',
        text: 'No estado Aberto (Open), todas as requisições enviadas ao serviço dependente são executadas normalmente para verificar se ele já se recuperou da falha.',
      },
      {
        id: 'B',
        text: 'No estado Fechado (Closed), o disjuntor permite que as requisições passem livremente para o serviço de destino e monitora a taxa de falhas; caso a taxa exceda o limite parametrizado, o disjuntor transita para Aberto (Open).',
      },
      {
        id: 'C',
        text: 'O estado Meio-Aberto (Half-Open) é ativado permanentemente assim que a primeira falha de timeout for registrada pelo cliente HTTP.',
      },
      {
        id: 'D',
        text: 'Quando o disjuntor está Aberto (Open), a aplicação trava e bloqueia as threads do servidor até que o banco de dados libere um lock exclusivo.',
      },
      {
        id: 'E',
        text: 'O padrão Circuit Breaker elimina a necessidade de definir timeouts nas conexões HTTP entre microsserviços.',
      },
    ],
    correctOptionId: 'B',
    justification:
      'Na operação normal, o Circuit Breaker está FECHADO (Closed), permitindo a passagem das chamadas e monitorando métricas. Ao atingir o limiar de falhas, ele ABRE (Open), cortando instantaneamente as chamadas subsequentes e retornando um fallback rápido para poupar recursos. Após um tempo de espera, vai para MEIO-ABERTO (Half-Open) para testar se o serviço remoto se recuperou.',
    distractorExplanations: {
      A: 'Incorreta: No estado Aberto, as requisições NÃO são enviadas ao serviço com falha; elas falham imediatamente (fast-fail) ou acionam resposta de fallback.',
      C: 'Incorreta: O estado Meio-Aberto é temporário e acionado após um período de tempo determinado no estado Aberto.',
      D: 'Incorreta: O objetivo é exatamente o oposto: evitar prender threads e travar a aplicação consumidora.',
      E: 'Incorreta: O timeout continua sendo requisito fundamental de rede em chamadas remotas.',
    },
    syllabusCitation:
      'DATAPREV Anexo I - Perfil 3: Desenvolvimento de Software; padrões de microsserviços, resiliência, Circuit Breaker, Bulkhead, Retry e Timeout.',
  },

  // ===================== SEPLAG-RJ: Gestão Ágil e Scrum Guide 2020 =====================
  {
    id: 'seplag-agile-01',
    examId: 'seplag',
    subjectId: 'seplag_gov_tic',
    subjectName: 'Governança e Gestão de TIC',
    topicName: 'Metodologias Ágeis: Scrum Guide 2020 e Kanban',
    format: 'multipla_escolha',
    difficulty: 'Médio',
    focusDistractors: true,
    statement:
      'A Secretaria de Estado adota o framework Scrum em conformidade estrita com a edição oficial do Scrum Guide (2020) para o desenvolvimento dos sistemas do portal do cidadão.\n\nAssinale a afirmativa correta acerca dos papéis, eventos e artefatos previstos no Scrum Guide:',
    options: [
      {
        id: 'A',
        text: 'O Product Owner gerencia tecnicamente os Desenvolvedores, atribuindo tarefas individuais e determinando as horas de trabalho de cada membro da equipe.',
      },
      {
        id: 'B',
        text: 'O Scrum Master é responsável por maximizar o valor do produto resultante do trabalho do Scrum Team e possui a palavra final na priorização das metas financeiras.',
      },
      {
        id: 'C',
        text: 'O Scrum define três compromissos (commitments) associados aos seus artefatos: a Meta do Produto (Product Goal) para o Product Backlog; a Meta da Sprint (Sprint Goal) para o Sprint Backlog; e a Definição de Pronto (Definition of Done) para o Incremento.',
      },
      {
        id: 'D',
        text: 'A Reunião Retrospectiva da Sprint (Sprint Retrospective) é o momento em que o Scrum Team demonstra o incremento aos stakeholders externos para homologação funcional.',
      },
      {
        id: 'E',
        text: 'O Scrum Guide 2020 recomenda expressamente a existência de um Gerente de Projetos corporativo para mediar as decisões entre o Product Owner e os Desenvolvedores.',
      },
    ],
    correctOptionId: 'C',
    justification:
      'Uma das principais inovações do Scrum Guide 2020 foi formalizar que cada um dos três artefatos possui exatamente um compromisso (commitment): Product Backlog -> Product Goal; Sprint Backlog -> Sprint Goal; Increment -> Definition of Done.',
    distractorExplanations: {
      A: 'Incorreta: O PO não gerencia pessoas nem atribui tarefas; os Desenvolvedores são autogerenciáveis.',
      B: 'Incorreta: Maximizar o valor do produto é responsabilidade do Product Owner, e não do Scrum Master.',
      D: 'Incorreta: A demonstração aos stakeholders ocorre na Sprint Review (Revisão da Sprint). A Retrospectiva é interna sobre melhoria de processos e equipe.',
      E: 'Incorreta: Não existe o papel de Gerente de Projetos no Scrum; o Scrum Team é composto por PO, Scrum Master e Desenvolvedores.',
    },
    syllabusCitation:
      'SEPLAG/RJ Anexo I - Governança e Gestão de TIC: Métodos ágeis; Scrum Guide (papéis, artefatos, eventos e compromissos); Kanban e princípios ágeis.',
  },

  // ===================== SEPLAG-RJ: Legislação e Contratações de TIC =====================
  {
    id: 'seplag-licit-01',
    examId: 'seplag',
    subjectId: 'seplag_gov_tic',
    subjectName: 'Governança e Gestão de TIC',
    topicName: 'Contratações de TIC (Lei nº 14.133/2021 e Boas Práticas)',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    focusDistractors: true,
    statement:
      'No planejamento de uma licitação para contratação de serviços continuados de desenvolvimento e manutenção de software sob a Lei nº 14.133/2021 (Nova Lei de Licitações e Contratos Administrativos) e diretrizes de governança do TCU, a equipe de planejamento da contratação está elaborando o Termo de Referência.\n\nAssinale a opção que atende às diretrizes legais e jurisprudenciais consolidadas para contratação de TIC no setor público:',
    options: [
      {
        id: 'A',
        text: 'A remuneração da empresa contratada deve ser fixada preferencialmente por homem-hora ou hora trabalhada pura, sem vinculação com resultados ou níveis de serviço.',
      },
      {
        id: 'B',
        text: 'A contratação de serviços de TIC deve ser vinculada à entrega de produtos ou ao atingimento de resultados expressos em ordens de serviço, associada a instrumentos de Acordo de Nível de Serviço (ANS/SLA) com previsão de glosas por descumprimento.',
      },
      {
        id: 'C',
        text: 'O Estudo Técnico Preliminar (ETP) é dispensável em contratações de TIC, bastando a existência do Edital aprovado pela assessoria jurídica.',
      },
      {
        id: 'D',
        text: 'É permitido indicar marcas específicas e exclusivas de servidores e bancos de dados no Termo de Referência sem qualquer justificativa técnica fundamentada.',
      },
      {
        id: 'E',
        text: 'A gestão do contrato e a fiscalização técnica e setorial podem ser exercidas cumulativamente pelo preposto formal da empresa contratada.',
      },
    ],
    correctOptionId: 'B',
    justification:
      'A Súmula nº 269 do TCU e os princípios da Lei nº 14.133/2021 determinam que nas contratações de TIC a remuneração deve ser vinculada a resultados ou entregas efetivas (mensuráveis em Pontos de Função, US, ou ordens de serviço atestadas), sendo proibido o pagamento por mero posto/hora de trabalho sem controle de entrega, além da obrigatoriedade do ANS/SLA com critérios claros de medição e glosa.',
    distractorExplanations: {
      A: 'Incorreta: O pagamento por homem-hora desvinculado de entrega é expressamente vedado pelas boas práticas do TCU e pela Lei 14.133/2021.',
      C: 'Incorreta: O ETP é elemento essencial e obrigatório da fase preparatória da licitação.',
      D: 'Incorreta: A indicação de marcas é vedada, exceto em estritas hipóteses de padronização formalmente comprovada.',
      E: 'Incorreta: O preposto é o representante da empresa privada contratada; os fiscais e gestores de contrato são agentes públicos do órgão contratante.',
    },
    syllabusCitation:
      'SEPLAG/RJ Anexo I - Governança de TIC: Contratações de Soluções de TIC; Lei nº 14.133/2021; planejamento, ETP, Termo de Referência, gestão, fiscalização e ANS.',
  },

  // ===================== TRANSPETRO (CESGRANRIO) =====================
  {
    id: 'transpetro-sec-01',
    examId: 'transpetro',
    subjectId: 'transpetro_seguranca_cibernetica',
    subjectName: 'Segurança Cibernética e da Informação (Cesgranrio)',
    topicName: 'Segurança Ofensiva e Framework MITRE ATT&CK',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    statement:
      'A equipe de Segurança Cibernética da Transpetro, durante uma simulação de adversário (Red Team) conduzida em seu ambiente operacional de transporte e dutovias, analisou um ataque em que o invasor, após obter acesso inicial a uma estação de trabalho via engenharia social, extraiu credenciais em formato hash NTLM da memória do processo LSASS. Em seguida, o invasor utilizou esses hashes diretamente para autenticar-se em outros servidores do domínio sem necessidade de quebrar a senha original em texto claro.\n\nDe acordo com a matriz MITRE ATT&CK Enterprise, essa técnica de movimentação lateral e abuso de credenciais é catalogada sob o identificador e denominação:',
    options: [
      {
        id: 'A',
        text: 'T1550.002 - Use Alternate Authentication Material: Pass the Hash.',
      },
      {
        id: 'B',
        text: 'T1059.001 - Command and Scripting Interpreter: PowerShell Execution.',
      },
      {
        id: 'C',
        text: 'T1078.003 - Valid Accounts: Local Accounts Brute Force.',
      },
      {
        id: 'D',
        text: 'T1021.002 - Remote Services: SMB/Windows Admin Shares Flooding.',
      },
      {
        id: 'E',
        text: 'T1110.004 - Brute Force: Credential Stuffing Attack.',
      },
    ],
    correctOptionId: 'A',
    justification:
      'No framework MITRE ATT&CK Enterprise, a técnica de autenticar-se em servidores remotos utilizando diretamente o hash de senha (como NTLM), sem derivar ou decifrar a senha em texto claro, é denominada "Pass the Hash", classificada sob a sub-técnica T1550.002 (Use Alternate Authentication Material). A Cesgranrio costuma cobrar a correlação entre a técnica real de hacking e a nomenclatura oficial do MITRE ATT&CK.',
    distractorExplanations: {
      B: 'Incorreta: T1059.001 refere-se à execução de scripts PowerShell, que é uma técnica da tática Execution, e não a movimentação com material alternativo de credenciais.',
      C: 'Incorreta: T1078 trata do uso de contas válidas, mas o mecanismo específico de injetar o hash NTLM diretamente no protocolo de autenticação é a técnica Pass the Hash (T1550.002).',
      D: 'Incorreta: SMB/Windows Admin Shares é uma sub-técnica de Remote Services (T1021.002), mas a questão foca no aproveitamento do hash de autenticação extraído do LSASS.',
      E: 'Incorreta: Credential Stuffing (T1110.004) consiste em testar listas de pares usuário/senha vazados em múltiplos serviços na tentativa de reutilização de senhas.',
    },
    syllabusCitation:
      'TRANSPETRO Edital 2026.4 - Ênfase 7 (Segurança Cibernética): MITRE ATT&CK (matrizes, táticas, técnicas, procedimentos e mitigações); Código Malicioso e Ferramentas de Hacking.',
  },
  {
    id: 'transpetro-sec-02',
    examId: 'transpetro',
    subjectId: 'transpetro_seguranca_cibernetica',
    subjectName: 'Segurança Cibernética e da Informação (Cesgranrio)',
    topicName: 'Segurança Defensiva, Normas ISO e NIST CSF',
    format: 'multipla_escolha',
    difficulty: 'Médio',
    statement:
      'O Instituto Nacional de Padrões e Tecnologia dos EUA (NIST) publicou a versão 2.0 do Cybersecurity Framework (NIST CSF 2.0), amplamente adotada por operadoras de infraestruturas críticas e empresas do setor de energia. Em relação à versão 1.1, a versão 2.0 introduziu uma nova Função (Function) central no Núcleo do Framework (Framework Core) que permeia todas as demais e reforça o direcionamento corporativo e a gestão de riscos.\n\nAssinale a alternativa que indica corretamente essa nova Função incluída no NIST CSF 2.0:',
    options: [
      {
        id: 'A',
        text: 'Govern (Governança).',
      },
      {
        id: 'B',
        text: 'Assure (Garantia).',
      },
      {
        id: 'C',
        text: 'Comply (Conformidade).',
      },
      {
        id: 'D',
        text: 'Mitigate (Mitigação).',
      },
      {
        id: 'E',
        text: 'Monitor (Monitoração).',
      },
    ],
    correctOptionId: 'A',
    justification:
      'A grande inovação estrutural do NIST CSF 2.0 foi a criação da 6ª Função do Core: "Govern" (Governança - GV). Enquanto o CSF 1.1 continha cinco funções (Identify, Protect, Detect, Respond, Recover), o CSF 2.0 estabeleceu Govern no centro do modelo para enfatizar estratégia, políticas corporativas, gestão de riscos de cadeia de suprimentos e papéis de liderança.',
    distractorExplanations: {
      B: 'Incorreta: "Assure" não é uma função do NIST CSF.',
      C: 'Incorreta: "Comply" é um conceito de compliance regulatório, mas não integra o núcleo de funções do NIST CSF 2.0.',
      D: 'Incorreta: "Mitigate" é uma categoria interna de resposta/tratamento de risco, não uma Função de primeiro nível.',
      E: 'Incorreta: Monitoramento faz parte de Detect (Continuous Monitoring) e Protect, não sendo uma Função autônoma.',
    },
    syllabusCitation:
      'TRANSPETRO Edital 2026.4 - Ênfase 7 (Segurança Cibernética): The NIST Cybersecurity Framework (CSF) 2.0; CIS Critical Security Controls Version 8.1; ISO 27001:2022.',
  },
  {
    id: 'transpetro-infra-01',
    examId: 'transpetro',
    subjectId: 'transpetro_infra_redes',
    subjectName: 'Redes de Computadores e Sistemas Operacionais (Cesgranrio)',
    topicName: 'Redes de Computadores e Sistemas Distribuídos',
    format: 'multipla_escolha',
    difficulty: 'Médio',
    statement:
      'No contexto da interligação de sistemas autônomos (Autonomous Systems - AS) em redes de longa distância de grande porte, o protocolo BGP (Border Gateway Protocol) é a espinha dorsal de roteamento da Internet e de backbones corporativos.\n\nSobre as características de funcionamento e seleção de rotas do BGPv4, assinale a afirmativa correta:',
    options: [
      {
        id: 'A',
        text: 'O BGP utiliza o algoritmo de Dijkstra (Link-State) com cálculo de métrica de custo baseado na largura de banda da interface de saída.',
      },
      {
        id: 'B',
        text: 'O BGP é classificado como um protocolo do tipo vetor de caminhos (Path Vector) que opera sobre a porta TCP 179 e utiliza o atributo AS_PATH para prevenir laços de roteamento.',
      },
      {
        id: 'C',
        text: 'Sessões iBGP (Internal BGP) exigem que todos os roteadores alterem o atributo NEXT_HOP para o seu próprio endereço IP em cada salto interno.',
      },
      {
        id: 'D',
        text: 'O atributo MED (Multi-Exit Discriminator) possui escopo global e é propagado obrigatoriamente por todos os Sistemas Autônomos transitários da Internet.',
      },
      {
        id: 'E',
        text: 'O protocolo BGP opera exclusivamente sobre UDP na porta 520, transmitindo atualizações periódicas a cada 30 segundos.',
      },
    ],
    correctOptionId: 'B',
    justification:
      'O BGP é um protocolo Path Vector que roda sobre conexões de transporte confiáveis TCP na porta 179. Cada anúncio de prefixo carrega uma lista sequencial de Sistemas Autônomos percorridos (atributo AS_PATH). Se um roteador BGP recebe um anúncio contendo seu próprio número de AS no AS_PATH, ele descarta a rota imediatamente, garantindo a prevenção absoluta de loops de roteamento entre ASs.',
    distractorExplanations: {
      A: 'Incorreta: O algoritmo de Dijkstra é usado por protocolos de estado de enlace como OSPF e IS-IS, não pelo BGP.',
      C: 'Incorreta: Em sessões iBGP, por padrão, o atributo NEXT_HOP não é alterado para o roteador intermediário, sendo mantido o NEXT_HOP original do gateway de borda (eBGP).',
      D: 'Incorreta: O MED (Multi-Exit Discriminator) é um atributo não transitivo que se limita à comunicação entre dois ASs vizinhos diretos, não sendo repassado para além do AS adjacente.',
      E: 'Incorreta: Quem opera em UDP porta 520 com envios a cada 30s é o clássico RIP (Routing Information Protocol).',
    },
    syllabusCitation:
      'TRANSPETRO Edital 2026.4 - Ênfase 4 (Infraestrutura): Redes de Computadores e Sistemas Distribuídos; Protocolos TCP/IP; Roteamento avançado BGP e OSPF.',
  },
  {
    id: 'transpetro-cloud-01',
    examId: 'transpetro',
    subjectId: 'transpetro_cloud_devops',
    subjectName: 'Cloud Computing, DevOps e Arquitetura de Contêineres (Cesgranrio)',
    topicName: 'Virtualização, Contêineres e Microsserviços',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    statement:
      'Em um cluster Kubernetes (K8s) implementado para orquestração de microsserviços em ambiente de computação em nuvem híbrida, a camada de controle (Control Plane) é responsável por manter o estado desejado da infraestrutura.\n\nQual componente do Control Plane é o único que se comunica diretamente com o armazenamento de estado persistente etcd e valida/configura todos os objetos da API?',
    options: [
      {
        id: 'A',
        text: 'kube-scheduler.',
      },
      {
        id: 'B',
        text: 'kube-controller-manager.',
      },
      {
        id: 'C',
        text: 'kube-apiserver.',
      },
      {
        id: 'D',
        text: 'kubelet.',
      },
      {
        id: 'E',
        text: 'kube-proxy.',
      },
    ],
    correctOptionId: 'C',
    justification:
      'O `kube-apiserver` é o componente central e hub de comunicação do Control Plane do Kubernetes. Ele expõe a API REST do Kubernetes, realiza a autenticação, autorização e controle de admissão das requisições e é o ÚNICO componente do cluster que possui permissão de leitura e gravação no banco de chave-valor distribuído `etcd`. Todos os outros componentes (scheduler, controller-manager, kubelet) interagem exclusivamente com o `kube-apiserver`.',
    distractorExplanations: {
      A: 'Incorreta: O `kube-scheduler` monitora pods sem nó atribuído através do `kube-apiserver` e seleciona o nó ideal para executá-los.',
      B: 'Incorreta: O `kube-controller-manager` roda os loops de controle (NodeLifecycle, ReplicaSet, Endpoints) comunicando-se via API Server.',
      D: 'Incorreta: O `kubelet` é o agente que roda nos nós de trabalho (Worker Nodes) para gerenciar contêineres reportando ao API Server.',
      E: 'Incorreta: O `kube-proxy` roda em cada nó e gerencia as regras de rede (iptables/IPVS) para os Services do Kubernetes.',
    },
    syllabusCitation:
      'TRANSPETRO Edital 2026.4 - Ênfase 4 (Infraestrutura): Contêineres; Kubernetes; Arquitetura de microsserviços e orquestração.',
  },
  {
    id: 'transpetro-dados-01',
    examId: 'transpetro',
    subjectId: 'transpetro_dados_ia',
    subjectName: 'Bancos de Dados, Big Data e Ciência de Dados (Cesgranrio)',
    topicName: 'Big Data, Machine Learning, NLP e Governança DMBOK',
    format: 'multipla_escolha',
    difficulty: 'Médio',
    statement:
      'Durante a estruturação do Data Lakehouse da Transpetro para análise de telemetria de sensores de dutos e frotas, o arquiteto de Big Data optou por persistir grandes volumes de dados no formato Apache Parquet em vez de arquivos CSV ou JSON.\n\nEssa escolha técnica fundamenta-se principalmente no fato de o Apache Parquet ser um formato de arquivo:',
    options: [
      {
        id: 'A',
        text: 'Baseado em texto puro legível por humanos, o que elimina a necessidade de metadados de esquema.',
      },
      {
        id: 'B',
        text: 'Orientado a colunas (columnar storage), que permite compressão eficiente de dados por tipo e otimiza consultas analíticas com leitura seletiva de colunas e predicate pushdown.',
      },
      {
        id: 'C',
        text: 'Orientado estritamente a linhas (row-oriented), ideal para operações frequentes de inserção pontual (OLTP de baixa latência).',
      },
      {
        id: 'D',
        text: 'Não binário que armazena registros no formato XML hierárquico com suporte nativo a schemas XSD.',
      },
      {
        id: 'E',
        text: 'Que requer obrigatoriamente a execução de um servidor Apache Cassandra ativo em memória para leitura de partições.',
      },
    ],
    correctOptionId: 'B',
    justification:
      'O Apache Parquet é um formato binário colunar de código aberto amplamente utilizado no ecossistema Apache Hadoop/Spark. O armazenamento colunar agrupa valores do mesmo tipo de dado sequencialmente no disco, viabilizando taxas altíssimas de compressão (como Snappy e Gzip), além de permitir que motores analíticos (Spark, Presto/Trino, DuckDB) leiam apenas as colunas requisitadas na consulta e apliquem "predicate pushdown" (filtragem direto na leitura das estatísticas de min/max dos blocos de dados), economizando I/O de rede e disco.',
    distractorExplanations: {
      A: 'Incorreta: O Parquet é um formato binário (não legível em texto puro) e possui metadados com esquema rígido no rodapé do arquivo.',
      C: 'Incorreta: Formatos orientados a linha (como Apache Avro ou tabelas OLTP) são bons para escritas linha a linha; o Parquet é colunar (OLAP).',
      D: 'Incorreta: O Parquet não tem nenhuma relação com XML/XSD; ele é estruturado em Thrift metadata e encodings binários.',
      E: 'Incorreta: O Parquet é um formato de arquivo independente de armazenamento em sistemas de arquivos (como HDFS, S3, Azure Blob), não dependendo de Cassandra.',
    },
    syllabusCitation:
      'TRANSPETRO Edital 2026.4 - Ênfase 8 (Ciência de Dados): Big Data; Técnicas e ferramentas Spark, Hadoop, Parquet, HDFS e MapReduce; Data Lakehouse.',
  },

  // ===================== ABGF (CARLOS CHAGAS - FCC) =====================
  {
    id: 'abgf-eng-01',
    examId: 'abgf',
    subjectId: 'abgf_engenharia_software_devops',
    subjectName: 'Engenharia de Software, Padrões de Projeto e DevOps (FCC)',
    topicName: 'Ciclo de Vida, POO, Design Patterns GoF e DDD',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    statement:
      'Considere que uma equipe de desenvolvimento da ABGF necessita implementar um módulo para cálculo de garantia em operações de crédito à exportação. Dependendo do país de destino, do setor econômico e da modalidade do fundo garantidor, deve ser aplicado um algoritmo de precificação distinto. O sistema deve permitir que novos algoritmos sejam adicionados sem modificar o código do cliente que invoca o cálculo, possibilitando a troca dinâmica do algoritmo em tempo de execução.\n\nSegundo o padrão de projeto GoF (Gang of Four) mais adequado para essa situação, os desenvolvedores devem empregar o padrão:',
    options: [
      {
        id: 'A',
        text: 'Singleton, garantindo uma única instância global compartilhada para os dados da transação.',
      },
      {
        id: 'B',
        text: 'Strategy, definindo uma família de algoritmos, encapsulando cada um deles e tornando-os intercambiáveis pelo cliente.',
      },
      {
        id: 'C',
        text: 'Decorator, permitindo anexar responsabilidades adicionais a um objeto dinamicamente sem alterar sua interface.',
      },
      {
        id: 'D',
        text: 'Adapter, convertendo a interface de uma classe existente em outra interface esperada pelos clientes.',
      },
      {
        id: 'E',
        text: 'Observer, notificando automaticamente múltiplos objetos dependentes sobre alterações de estado.',
      },
    ],
    correctOptionId: 'B',
    justification:
      'O padrão comportamental GoF Strategy tem como intenção explícita: "definir uma família de algoritmos, encapsular cada um deles e torná-los intercambiáveis. Strategy permite que o algoritmo varie independentemente dos clientes que o utilizam". É a resposta clássica da FCC para cenários de cálculo ou precificação com múltiplas regras de negócio alternáveis.',
    distractorExplanations: {
      A: 'Incorreta: Singleton garante a existência de uma única instância de uma classe, não se aplicando à alternância de algoritmos de cálculo.',
      C: 'Incorreta: Decorator agrega comportamentos recursivos em tempo de execução a objetos sem usar herança profunda, não sendo focado em alternar algoritmos concorrentes.',
      D: 'Incorreta: Adapter converte interfaces incompatíveis para que classes possam trabalhar juntas.',
      E: 'Incorreta: Observer é um padrão de publicação/assinatura para propagar eventos a observadores registrados.',
    },
    syllabusCitation:
      'ABGF Edital 01/2026 - Cargo E05 (Analistas TI): Engenharia de Software; Práticas e padrões de arquitetura; Padrões de projeto (Design Patterns GoF); Programação Orientada a Objetos.',
  },
  {
    id: 'abgf-sql-01',
    examId: 'abgf',
    subjectId: 'abgf_banco_dados_ia',
    subjectName: 'Bancos de Dados, Big Data e Inteligência Artificial (FCC)',
    topicName: 'Modelagem de Dados, SQL ANSI, NoSQL e Data Lakehouse',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    statement:
      'Considere a tabela `GarantiaCredito` contendo as colunas `id_operacao` (inteiro), `ano_vigencia` (inteiro) e `valor_cobertura` (numérico), com registros de garantias emitidas pela agência. Deseja-se gerar uma consulta SQL ANSI que classifique as operações de cada ano em ordem decrescente de valor de cobertura, atribuindo uma numeração sequencial estrita de classificação (1, 2, 3...) para cada linha dentro de seu respectivo ano, sem gerar lacunas nem duplicatas no ranking mesmo se duas operações tiverem exatamente o mesmo valor de cobertura.\n\nA cláusula e função analítica que atende estritamente a esses requisitos é:',
    options: [
      {
        id: 'A',
        text: 'RANK() OVER (ORDER BY valor_cobertura DESC)',
      },
      {
        id: 'B',
        text: 'ROW_NUMBER() OVER (PARTITION BY ano_vigencia ORDER BY valor_cobertura DESC)',
      },
      {
        id: 'C',
        text: 'DENSE_RANK() OVER (PARTITION BY valor_cobertura ORDER BY ano_vigencia DESC)',
      },
      {
        id: 'D',
        text: 'NTILE(10) OVER (GROUP BY ano_vigencia ORDER BY valor_cobertura DESC)',
      },
      {
        id: 'E',
        text: 'LAG(valor_cobertura) OVER (PARTITION BY ano_vigencia ORDER BY id_operacao)',
      },
    ],
    correctOptionId: 'B',
    justification:
      'A função analítica `ROW_NUMBER()` atribui um número sequencial único e consecutivo a cada linha da partição (definida por `PARTITION BY ano_vigencia`) de acordo com a ordem especificada (`ORDER BY valor_cobertura DESC`). Mesmo em caso de empates no valor de cobertura, `ROW_NUMBER()` atribui números distintos consecutivos (1, 2, 3...), sem criar empates ou lacunas. Já `RANK()` geraria empates com saltos (1, 1, 3) e `DENSE_RANK()` geraria empates sem saltos (1, 1, 2).',
    distractorExplanations: {
      A: 'Incorreta: `RANK()` gera números repetidos em valores iguais e salta posições subsequentes, além de não particionar por ano.',
      C: 'Incorreta: Particiona erroneamente por `valor_cobertura` em vez de particionar por `ano_vigencia`, além de `DENSE_RANK` atribuir o mesmo número a empates.',
      D: 'Incorreta: `NTILE` divide em decis/baldes, e a sintaxe de window functions não aceita `GROUP BY` dentro de `OVER()`.',
      E: 'Incorreta: `LAG()` recupera o valor da linha anterior na janela, não atribuindo números de classificação sequencial.',
    },
    syllabusCitation:
      'ABGF Edital 01/2026 - Cargo E05 (Analistas TI): Banco de Dados; Linguagem SQL (ANSI); Consultas, junções, funções de agregação e analíticas (Window Functions).',
  },
  {
    id: 'abgf-devops-01',
    examId: 'abgf',
    subjectId: 'abgf_engenharia_software_devops',
    subjectName: 'Engenharia de Software, Padrões de Projeto e DevOps (FCC)',
    topicName: 'Cultura DevOps, DevSecOps, CI/CD e Infraestrutura como Código',
    format: 'multipla_escolha',
    difficulty: 'Médio',
    statement:
      'No âmbito das práticas de automação de infraestrutura como código (IaC) e configuração de servidores da ABGF, a ferramenta Ansible é amplamente adotada. Sobre a arquitetura, o modelo de execução e os conceitos do Ansible, assinale a afirmativa correta:',
    options: [
      {
        id: 'A',
        text: 'O Ansible adota uma arquitetura client-server obrigatória, necessitando que um daemon agente esteja instalado previamente e em execução contínua em todos os nós gerenciados.',
      },
      {
        id: 'B',
        text: 'Os playbooks do Ansible são descritos em sintaxe XML estruturada e operam com semântica estritamente imperativa, sem garantia de idempotência nos módulos.',
      },
      {
        id: 'C',
        text: 'O Ansible é agentless (sem necessidade de agentes nos alvos), conectando-se aos hosts gerenciados via SSH no Linux ou WinRM no Windows, executando módulos desenvolvidos para serem idempotentes.',
      },
      {
        id: 'D',
        text: 'O arquivo de inventário do Ansible suporta apenas endereços IP fixos estáticos em formato binário compilado, sendo incapaz de integrar inventários dinâmicos de nuvem.',
      },
      {
        id: 'E',
        text: 'A execução de tarefas no Ansible não permite o uso de variáveis ou templates, devendo os arquivos de configuração ser copiados sem qualquer interpolação de dados.',
      },
    ],
    correctOptionId: 'C',
    justification:
      'O Ansible destaca-se pelo modelo "agentless" (sem agentes dedicados nos servidores de destino). Ele utiliza os canais de administração remota já nativos dos sistemas operacionais (SSH para nós Linux/Unix e WinRM para nós Windows). Além disso, seus módulos principais são desenhados segundo o princípio da idempotência (executar a playbook múltiplas vezes produz o mesmo resultado no estado final sem efeitos colaterais indesejados), com arquivos escritos em formato YAML.',
    distractorExplanations: {
      A: 'Incorreta: Ferramentas como Puppet e Chef tradicionalmente exigiam agentes dedicados nos nós; o Ansible é notório por ser agentless.',
      B: 'Incorreta: Playbooks são escritas em YAML (não XML) e utilizam abordagem declarativa com suporte a idempotência.',
      D: 'Incorreta: O inventário do Ansible pode ser estático (INI ou YAML) ou dinâmico (scripts/plugins que consultam APIs de AWS, Azure, GCP ou VMware).',
      E: 'Incorreta: O Ansible suporta templating robusto com a engine Jinja2 e amplo uso de variáveis.',
    },
    syllabusCitation:
      'ABGF Edital 01/2026 - Cargo E05 (Analistas TI): DevOps, CI/CD e Automação; Infraestrutura como Código (IaC); Conceitos declarativos e imperativos; Ansible.',
  },
  {
    id: 'abgf-sec-01',
    examId: 'abgf',
    subjectId: 'abgf_seguranca_governanca',
    subjectName: 'Cibersegurança, Governança e Gestão de TI (FCC)',
    topicName: 'Segurança da Informação, Criptografia e Frameworks',
    format: 'multipla_escolha',
    difficulty: 'Difícil',
    statement:
      'O Center for Internet Security (CIS) desenvolve os "CIS Critical Security Controls" (CIS Controls v8.1), um conjunto prescritivo e priorizado de salvaguardas essenciais para defesa contra os ataques cibernéticos mais frequentes. Para orientar a implementação gradual de acordo com o porte e capacidade técnica da organização, os CIS Controls dividem as salvaguardas em três Grupos de Implementação (Implementation Groups - IGs).\n\nAssinale a afirmativa correta a respeito do Grupo de Implementação 1 (IG1):',
    options: [
      {
        id: 'A',
        text: 'O IG1 destina-se a grandes corporações com equipes avançadas de SOC e SOC tier-3, focando em caça ativa de ameaças (threat hunting) e inteligência preditiva.',
      },
      {
        id: 'B',
        text: 'O IG1 representa a higiene cibernética essencial (Basic Cyber Hygiene), constituído por salvaguardas fundamentais que toda organização, independentemente do porte, deve implementar para mitigar a maioria dos ataques cibernéticos comuns.',
      },
      {
        id: 'C',
        text: 'O IG1 substitui integralmente a necessidade de gestão de inventário de ativos de hardware e software por ferramentas proprietárias de IA.',
      },
      {
        id: 'D',
        text: 'As salvaguardas do IG1 são opcionais e aplicáveis apenas quando a organização já alcançou a conformidade total com o IG2 e IG3.',
      },
      {
        id: 'E',
        text: 'O IG1 prescreve exclusivamente defesas em profundidade contra ataques persistentes avançados (APT) apoiados por Estados-nação.',
      },
    ],
    correctOptionId: 'B',
    justification:
      'No CIS Controls v8 (e v8.1), o Implementation Group 1 (IG1) é a definição padrão da indústria de "Higiene Básica de Cibersegurança" (Basic Cyber Hygiene). O IG1 é o conjunto de 56 salvaguardas fundamentais prioritárias que qualquer organização deve adotar (gestão básica de ativos, atualizações, senhas fortes, MFA e backups regulares). Os grupos IG2 e IG3 expandem progressivamente essas práticas para cenários com maior complexidade de dados e riscos mais severos.',
    distractorExplanations: {
      A: 'Incorreta: O grupo voltado a grandes corporações com dados altamente sensíveis e riscos de ataques direcionados sofisticados é o IG3.',
      C: 'Incorreta: O Controle 1 do CIS é exatamente "Inventory and Control of Enterprise Assets"; inventário de hardware e software é a base do IG1.',
      D: 'Incorreta: O IG1 é a base de partida obrigatória para todos; o IG2 contém o IG1, e o IG3 contém o IG2 e o IG1.',
      E: 'Incorreta: Proteção contra APTs sofisticados é o foco do IG3, enquanto o IG1 foca em ataques oportunistas comuns.',
    },
    syllabusCitation:
      'ABGF Edital 01/2026 - Cargo E05 (Analistas TI): Segurança da Informação e Cibersegurança; Frameworks e normas; CIS Controls; NIST CSF; ISO 27001/27002.',
  },
  {
    id: 'abgf-gestao-01',
    examId: 'abgf',
    subjectId: 'abgf_seguranca_governanca',
    subjectName: 'Cibersegurança, Governança e Gestão de TI (FCC)',
    topicName: 'Gestão de TI: ITIL 4, COBIT 2019 e Contratações Públicas',
    format: 'multipla_escolha',
    difficulty: 'Médio',
    statement:
      'No âmbito da Administração Pública Federal, a Instrução Normativa SGD/ME nº 94, de 23 de dezembro de 2022, estabelece as regras gerais para a contratação de Soluções de Tecnologia da Informação e Comunicação (TIC). De acordo com a IN SGD/ME nº 94/2022, a fase de Planejamento da Contratação tem início com a elaboração formal de qual artefato obrigatório?',
    options: [
      {
        id: 'A',
        text: 'Termo de Encerramento do Contrato (TEC).',
      },
      {
        id: 'B',
        text: 'Documento de Oficialização da Demanda (DOD).',
      },
      {
        id: 'C',
        text: 'Termo de Aceite Definitivo da Solução de TIC.',
      },
      {
        id: 'D',
        text: 'Portaria de Nomeação do Gestor Financeiro da Ata.',
      },
      {
        id: 'E',
        text: 'Declaração de Inexigibilidade de Licitação Sumária.',
      },
    ],
    correctOptionId: 'B',
    justification:
      'Nos termos da IN SGD/ME nº 94/2022 (e também na antecessora IN 01/2019), o processo de contratação de soluções de TIC é dividido em três fases: Planejamento da Contratação, Seleção do Fornecedor e Gestão do Contrato. A fase de Planejamento da Contratação inicia-se formalmente com o envio do Documento de Oficialização da Demanda (DOD) pela Área Requisitante à Área de TIC, que deflagra a instituição da Equipe de Planejamento da Contratação e a elaboração dos Estudos Técnicos Preliminares (ETP).',
    distractorExplanations: {
      A: 'Incorreta: O Termo de Encerramento ocorre no final da vigência do contrato, na fase de gestão.',
      C: 'Incorreta: O Termo de Aceite Definitivo é emitido durante a execução contratual após entrega e homologação dos serviços/bens.',
      D: 'Incorreta: Não é ato inicial de planejamento de TIC.',
      E: 'Incorreta: Inexigibilidade é uma exceção de licitação da fase de seleção do fornecedor, não o instrumento inicial da demanda.',
    },
    syllabusCitation:
      'ABGF Edital 01/2026 - Cargo E05 (Analistas TI): Gestão de TI; Contratações de TI na Administração Pública; IN SGD/ME nº 94/2022.',
  },
];
