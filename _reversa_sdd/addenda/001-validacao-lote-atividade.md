# Adendo SDD 001: Validação em Lote por Atividade com Chamada e Homologação Automática

> Data de Integração: `2026-10-28`  
> Módulos Impactados: `atividades`, `jovem-progressao`, `especialidades`  
> Status: `Implementado (Ciclo Forward Concluído)`

---

## 1. Contexto & Motivação

No aplicativo original mAPPa 1.0.5, a validação de progressão e especialidades era estritamente individual (o escotista precisava abrir a ficha de cada jovem separadamente, navegar pela árvore de requisitos e marcar item a item). Em atividades de campo com 20 a 30 jovens, esse processo exigia centenas de cliques repetitivos e conexão permanente com o Paxtu.

O Adendo 001 introduz o conceito pedagógico de **Atividade Integrada com Chamada**, onde:
1. O escotista planeja ou registra a atividade da semana.
2. Associa os itens trabalhados (da progressão do ramo e/ou do catálogo de especialidades).
3. Realiza a chamada rápida dos presentes (com suporte a Ausentes e Justificados).
4. Em **1 clique**, todos os jovens presentes recebem a validação de todos os itens vinculados àquela atividade.
5. Todo o catálogo e as validações funcionam em modo **100% Offline**, persistidos em SQLite local e sincronizados sob demanda com o backend Paxtu.

---

## 2. Novos Componentes e Artefatos Gerados

| Componente | Caminho | Função |
|------------|---------|--------|
| **Schema SQLite Local** | `_reversa_forward/001-validacao-lote-atividade/src/database/db_helper.dart` | Tabelas `atividades_chamada`, `presencas_atividade`, `itens_atividade` e `fila_sincronizacao_paxtu`. |
| **Catálogo Offline** | `_reversa_forward/001-validacao-lote-atividade/src/database/offline_data_seeder.dart` | Banco offline pré-populado com os 4 ramos (Lobinho, Escoteiro, Sênior, Pioneiro), eixos de competência e catálogo oficial de especialidades (5 áreas). |
| **Modelos / DTOs** | `_reversa_forward/001-validacao-lote-atividade/src/models/atividade_chamada_model.dart` | Mapeamento orientado a objetos com serialização SQLite/JSON. |
| **Orquestrador de Lote** | `_reversa_forward/001-validacao-lote-atividade/src/orchestrators/batch_validation_orchestrator.dart` | Algoritmo de validação com garantia de idempotência e isolamento de ausentes. |
| **Serviço de Domínio** | `_reversa_forward/001-validacao-lote-atividade/src/services/atividade_service.dart` | Gerenciamento de ciclo de vida das atividades e despacho para sincronização Paxtu. |
| **Seletor de Itens** | `_reversa_forward/001-validacao-lote-atividade/src/widgets/item_selector_widget.dart` | Interface de busca com abas para Progressão e Especialidades. |
| **Diálogo de Confirmação** | `_reversa_forward/001-validacao-lote-atividade/src/widgets/batch_validation_confirm_dialog.dart` | Modal de revisão com resumo estatístico pré-validação. |
| **Painel de Sincronização** | `_reversa_forward/001-validacao-lote-atividade/src/widgets/sync_pending_widget.dart` | Monitoramento visual da fila offline e transmissão ao Paxtu. |
| **Tela de Gestão e Chamada** | `_reversa_forward/001-validacao-lote-atividade/src/views/atividade_chamada_view.dart` | Interface de usuário completa para o escotista. |
| **Suíte de Testes** | `_reversa_forward/001-validacao-lote-atividade/test/batch_validation_test.dart` | Testes automatizados cobrindo presença, ausência e idempotência. |

---

## 3. Rastreabilidade com as Especificações Originais

- `_reversa_sdd/modules/atividades/requirements.md`: Complementado com REQ-ATV-007 (Validação por Presença).
- `_reversa_sdd/modules/jovem-progressao/design.md`: Ampliado com o fluxo de homologação em lote via cliente offline.
- `_reversa_sdd/modules/especialidades/requirements.md`: Integrado à seleção pedagógica por atividade.
