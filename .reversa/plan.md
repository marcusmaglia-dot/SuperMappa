# Plano de Exploração — Mappa

> Criado pelo Reversa em 2026-10-28
> Marque cada tarefa com ✅ quando concluída.
> Você pode editar este plano antes de iniciar: adicione, remova ou reordene tarefas conforme necessário.

---

## Fase 1: Reconhecimento 🔍

- [x] **Scout** — Mapeamento de estrutura de pastas e tecnologias ✅
- [x] **Scout** — Análise de dependências e gerenciadores de pacotes ✅
- [x] **Scout** — Identificação de entry points, CI/CD e configurações ✅

## Decisão de organização das specs 🗂️

> Entre o Scout e o Arqueólogo, o Reversa pergunta como você quer organizar as specs (por módulo, caso de uso, endpoint, híbrida, por features ou customizada). A escolha fica persistida em `.reversa/config.toml` na seção `[specs]` e não será reperguntada em execuções futuras. Para reapresentar o menu, remova manualmente a seção.

## Fase 2: Escavação 🏗️

- [x] **Arqueólogo** — Análise do módulo `auth` (Autenticação Paxtu e Sessão) ✅
- [x] **Arqueólogo** — Análise do módulo `associado` (Perfil e Dados do Membro) ✅
- [x] **Arqueólogo** — Análise do módulo `jovem-progressao` (Ramos, Ciclos e Competências) ✅
- [x] **Arqueólogo** — Análise do módulo `especialidades` (Áreas, Níveis e Conquistas) ✅
- [x] **Arqueólogo** — Análise do módulo `insignias` (Insígnias de Interesse Especial) ✅
- [x] **Arqueólogo** — Análise do módulo `adulto-apf` (Plano Pessoal de Formação do Escotista) ✅
- [x] **Arqueólogo** — Análise do módulo `monitor-escotista` (Gestão de Seção, Assessorados e Revisão) ✅
- [x] **Arqueólogo** — Análise do módulo `atividades` (Atividades Fixas e Variáveis) ✅
- [x] **Arqueólogo** — Análise do módulo `comunicacao` (Mensagens, Notificações e Histórico) ✅

## Fase 3: Interpretação 🧠

- [x] **Detetive** — Arqueologia Git e ADRs retroativos (N/A — pacote compilado sem git) ✅
- [x] **Detetive** — Regras de negócio implícitas e máquinas de estado ✅
- [x] **Detetive** — Matriz de permissões (RBAC/ACL) ✅
- [x] **Arquiteto** — Diagramas C4 (Contexto em c4-context.md) ✅
- [x] **Arquiteto** — ERD completo e integrações externas (em architecture.md) ✅
- [x] **Arquiteto** — Spec Impact Matrix (incorporada na visão de arquitetura) ✅

## Fase 4: Geração 📝

- [x] **Redator** — Specs SDD por componente (9 units: auth, associado, jovem-progressao, especialidades, insignias, adulto-apf, monitor-escotista, atividades, comunicacao) ✅
- [x] **Redator** — OpenAPI (N/A — nível essencial) ✅
- [x] **Redator** — User Stories (incorporadas nos critérios de aceite Gherkin em requirements.md) ✅
- [x] **Redator** — Code/Spec Matrix (incorporada na rastreabilidade por unit) ✅

## Fase 5: Revisão ✅

- [x] **Revisor** — Revisão cruzada de specs (auditoria de consistência das 9 units) ✅
- [x] **Revisor** — Resolução de lacunas com o usuário (regras não-bloqueantes documentadas) ✅
- [x] **Revisor** — Relatório de confiança final (em confidence-report.md) ✅

---

## Agentes Independentes

> Execute estes agentes quando os recursos estiverem disponíveis — podem rodar em qualquer fase.

- [ ] **Visor** — Análise de interface via screenshots
- [ ] **Data Master** — Análise completa do banco de dados
- [ ] **Design System** — Extração de tokens de design
- [ ] **Tracer** — Análise dinâmica (requer sistema acessível)

---

## Próximo passo

Após o Time de Descoberta concluir e o `_reversa_sdd/` estar populado, você pode disparar um dos fluxos seguintes:

- `/reversa-migrate`: orquestrador do **Time de Migração** (Paradigm Advisor → Curator → Strategist → Designer → Screen Translator → Inspector). Gera as specs do sistema novo. Saída em `_reversa_sdd/migration/` e `_reversa_sdd/screens/`.
- `/reversa-reconstructor`: gera plano bottom-up para reimplementar o software a partir das specs do legado (uma tarefa por sessão).
