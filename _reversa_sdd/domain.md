# Modelo de Domínio e Regras de Negócio — mAPPa

> **Gerado pelo Detetive (Reversa)**  
> **Data:** 2026-10-28  
> **Nível de Documentação:** Essencial  
> **Escala de Confiança:** 🟢 CONFIRMADO (regras estruturais extraídas do código) | 🟡 INFERIDO (práticas do método escoteiro da UEB)

---

## 1. Glossário de Domínio

| Termo | Definição no Sistema | Escala |
|-------|----------------------|--------|
| **Associado** | Membro registrado na União dos Escoteiros do Brasil (UEB), identificado por seu número de registro único. Pode ser jovem ou adulto. | 🟢 CONFIRMADO |
| **UEL (Unidade Escoteira Local)** | Grupo Escoteiro ou Seção Autônoma onde o jovem ou adulto participa. | 🟢 CONFIRMADO |
| **Ramo** | Faixa etária pedagógica do Movimento Escoteiro: Lobinho (6,5 a 10 anos), Escoteiro (11 a 14 anos), Sênior (15 a 17 anos) e Pioneiro (18 a 20 anos). | 🟢 CONFIRMADO |
| **Seção** | A unidade operacional do ramo (Alcateia para Lobinhos, Tropa Escoteira, Tropa Sênior, Clã Pioneiro). | 🟢 CONFIRMADO |
| **Eixos de Desenvolvimento** | As 4 dimensões de crescimento pessoal do jovem: **Conhecer** (intelectual), **Fazer** (corporal/habilidades), **Conviver** (social/afetivo) e **Ser** (caráter/espiritual). | 🟢 CONFIRMADO |
| **Bloco de Progressão** | Etapas progressivas de insígnias e distintivos dentro de cada ramo (ex.: Pistas, Trilha, Rumo, Travessia; Escalada, Conquista, Azimute). | 🟢 CONFIRMADO |
| **Ciclo de Desenvolvimento** | Período de tempo (geralmente semestral) em que o jovem pactua atividades e metas de competência com seus escotistas. | 🟢 CONFIRMADO |
| **Especialidade** | Habilidade ou conhecimento específico em uma das 5 áreas (Ciência e Tecnologia, Cultura, Desportos, Habilidades Escoteiras, Serviços), conquistada em 3 níveis. | 🟢 CONFIRMADO |
| **Insígnia de Interesse Especial** | Reconhecimento de esforço aprofundado em temas transversais (Aprender, Lusofonia, Cone Sul, Campeões da Natureza, etc.). | 🟢 CONFIRMADO |
| **APF (Acompanhamento Pessoal de Formação)** | Sistema de desenvolvimento e capacitação continuada do adulto voluntário (Escotista ou Dirigente). | 🟢 CONFIRMADO |
| **Assessor Pessoal de Formação** | Escotista experiente que orienta o adulto no cumprimento de suas competências e rotas de aprendizagem. | 🟢 CONFIRMADO |
| **Revisão / Homologação** | Ato pedagógico pelo qual o escotista avalia um item ou especialidade cumprido pelo jovem antes da validação oficial no Paxtu. | 🟢 CONFIRMADO |

---

## 2. Regras de Negócio Centrais

### 2.1. Autenticação e Associação Institucional
- **RN-01 (Registro Único):** O login no mAPPa requer o número de registro na UEB e a senha unificada do Paxtu. 🟢
- **RN-02 (Roteamento de Papel):** O perfil do usuário (`tipoAssociado`) dita as telas iniciais: membros juvenis acessam o painel de progressão (`WelcomeHomeView`), enquanto escotistas e dirigentes acessam o painel de gestão (`MonitorHomeView`). 🟢
- **RN-03 (Imutabilidade Cadastral Mobile):** Dados cadastrais civis, transferências de seção e status financeiro são somente-leitura no aplicativo móvel. 🟢

### 2.2. Progressão do Jovem
- **RN-04 (Pactuação em Ciclo):** Cada ciclo de atividades possui competências associadas aos 4 eixos educativos e uma lista de atividades fixas e variáveis. 🟢
- **RN-05 (Autoavaliação e Submissão):** O jovem assinala os itens que considera cumpridos, alterando seu estado para `Pendente de Revisão`. 🟢
- **RN-06 (Transição de Ramo):** Ao atingir a idade limite de um ramo, o jovem inicia a etapa de transição para o ramo seguinte, mantendo seu histórico de conquistas registrado no Paxtu. 🟡

### 2.3. Especialidades Escoteiras
- **RN-07 (Proporcionalidade de Requisitos):**
  - **Nível 1:** Mínimo de $\frac{1}{3}$ dos itens da especialidade cumpridos. 🟢
  - **Nível 2:** Mínimo de $\frac{2}{3}$ dos itens cumpridos. 🟢
  - **Nível 3:** Todos os itens da especialidade cumpridos. 🟢
- **RN-08 (Validação de Especialidade):** A concessão formal de cada nível de especialidade depende da aprovação do escotista responsável no painel de revisão. 🟢

### 2.4. Formação de Adultos (APF)
- **RN-09 (Linhas Formativas Distintas):** Adultos optam pela Linha Escotista (pedagógica) ou Linha Dirigente (gestão institucional). 🟢
- **RN-10 (Ciclo de Competências do Adulto):** O adulto realiza autoavaliação sobre competências de segurança, aplicação do método e gestão de equipe, alinhando suas ações com seu Assessor Pessoal. 🟢

### 2.5. Papel do Escotista e Governança de Seção
- **RN-11 (Escopo de Seção):** Um escotista só tem visibilidade e poder de homologação sobre os jovens pertencentes às seções em que ele está formalmente nomeado no Paxtu. 🟢
- **RN-12 (Retorno Pedagógico):** Ao recusar ou devolver um item na fila de revisão, o escotista deve fornecer justificativa textual para orientar o jovem sobre como demonstrar a competência no próximo encontro. 🟢
