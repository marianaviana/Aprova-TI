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
];
