# Aprova-TI 🎯

> Plataforma inteligente para geração de simulados, cadernos de erros e questões focadas em concursos públicos da área de TI.

O **Aprova-TI** é uma aplicação web desenvolvida para otimizar a preparação de candidatos a cargos de Tecnologia da Informação em concursos públicos. Utilizando a API do **Google Gemini**, a plataforma gera questões personalizadas, analisa o desempenho do estudante e consolida cadernos de erros estratégicos para revisão contínua.

---

## ⚡ Tecnologias Utilizadas

* **Frontend:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Inteligência Artificial:** [Google Gen AI SDK](https://www.npmjs.com/package/@google/genai) (`gemini-2.5-flash`)
* **Backend / API Server:** [Express.js](https://expressjs.com/) (Node.js)
* **Estilização:** CSS3 / Tailwind CSS
* **Gerenciador de Pacotes:** `npm` (suporte a `bun`)

---

## 🚀 Funcionalidades Principais

* **Simulados Personalizados:** Geração dinâmica de questões por tópicos e editais específicos da área de TI.
* **Caderno de Erros:** Mapeamento automático dos pontos fracos para revisões direcionadas.
* **Resoluções Comentadas:** Explicações detalhadas geradas por IA para cada alternativa da questão.
* **Dashboard de Desempenho:** Acompanhamento de métricas de acerto por disciplina e tópico.

---

## 🛠️ Como Executar o Projeto Localmente

### Pré-requisitos

* [Node.js](https://nodejs.org/) (v18 ou superior)
* Uma chave de API do [Google AI Studio](https://aistudio.google.com/)

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/marianaviana/Aprova-TI.git](https://github.com/marianaviana/Aprova-TI.git)
   cd Aprova-TI
