# Actions: Validação em Lote por Atividade com Chamada e Homologação de Itens

> Identificador: `001-validacao-lote-atividade`  
> Data: `2026-10-28`  
> Roadmap: `_reversa_forward/001-validacao-lote-atividade/roadmap.md`  

---

## Resumo

| Métrica | Valor |
|---------|-------|
| Total de ações | 10 |
| Paralelizáveis (`[//]`) | 4 |
| Maior cadeia de dependência | 5 (T001 $\to$ T003 $\to$ T005 $\to$ T006 $\to$ T008) |

---

## Fase 1, Preparação

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T001 | Criar schema do banco SQLite local (`db_helper.dart`) com suporte a catálogo offline de especialidades, progressão, jovens e tabelas da atividade (`atividades_chamada`, `presencas_atividade`, `itens_atividade`) | - | `[//]` | `_reversa_forward/001-validacao-lote-atividade/src/database/db_helper.dart` | 🟢 | `[X]` |
| T002 | Implementar o carregador/seeder de dados locais offline (`offline_data_seeder.dart`) populando o catálogo completo de ramos, eixos, competências e especialidades | T001 | - | `_reversa_forward/001-validacao-lote-atividade/src/database/offline_data_seeder.dart` | 🟢 | `[X]` |
| T003 | Criar modelos de dados DTOs (`AtividadeChamadaModel`, `PresencaModel`, `ItemAtividadeModel`) com mapeamento JSON e SQLite | - | `[//]` | `_reversa_forward/001-validacao-lote-atividade/src/models/atividade_chamada_model.dart` | 🟢 | `[X]` |

---

## Fase 2, Testes

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T004 | Escrever testes unitários para a regra de negócio da chamada: validação restrita aos jovens presentes e preservação de ausentes | T003 | `[//]` | `_reversa_forward/001-validacao-lote-atividade/test/batch_validation_test.dart` | 🟢 | `[X]` |

---

## Fase 3, Núcleo

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T005 | Implementar repositório e serviço de atividades (`AtividadeService.dart`) com métodos de criar atividade, salvar chamada e consultar catálogo offline | T001, T003 | - | `_reversa_forward/001-validacao-lote-atividade/src/services/atividade_service.dart` | 🟢 | `[X]` |
| T006 | Desenvolver o `BatchValidationOrchestrator` responsável pelo algoritmo de 1 clique: itera sobre jovens presentes, valida itens no banco local e enfileira chamadas de sincronização | T005 | - | `_reversa_forward/001-validacao-lote-atividade/src/orchestrators/batch_validation_orchestrator.dart` | 🟢 | `[X]` |

---

## Fase 4, Integração

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T007 | Construir componente seletor múltiplo de itens (`ItemSelectorWidget.dart`) permitindo buscar e vincular itens de progressão e especialidades à atividade | T002, T005 | `[//]` | `_reversa_forward/001-validacao-lote-atividade/src/widgets/item_selector_widget.dart` | 🟢 | `[X]` |
| T008 | Desenvolver a tela de chamada de presença (`AtividadeChamadaView.dart`) com alternância rápida de botões (Presente, Ausente, Justificado) | T005 | - | `_reversa_forward/001-validacao-lote-atividade/src/views/atividade_chamada_view.dart` | 🟢 | `[X]` |
| T009 | Criar botão de ação de 1 clique com diálogo modal de confirmação e resumo de validações (`BatchValidationConfirmDialog.dart`) | T006, T008 | - | `_reversa_forward/001-validacao-lote-atividade/src/widgets/batch_validation_confirm_dialog.dart` | 🟢 | `[X]` |

---

## Fase 5, Polimento

| ID | Descrição | Dependências | Paralelismo | Arquivo alvo | Confidência | Status |
|----|-----------|--------------|-------------|--------------|-------------|--------|
| T010 | Implementar barra de progresso do lote, notificações de sucesso e painel visual de sincronização offline/online (`SyncPendingWidget.dart`) | T009 | - | `_reversa_forward/001-validacao-lote-atividade/src/widgets/sync_pending_widget.dart` | 🟢 | `[X]` |

---

## Notas de execução

- O catálogo offline de especialidades e progressões será abastecido diretamente a partir do conhecimento mapeado em `_reversa_sdd/`, garantindo funcionamento 100% autônomo e sem sinal.

---

## Histórico de alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 2026-10-28 | Decomposição inicial gerada por `/reversa-to-do` | Marcus (via Reversa) |
