# Roadmap: Validação em Lote por Atividade com Chamada e Homologação de Itens

> Identificador: `001-validacao-lote-atividade`  
> Data: `2026-10-28`  
> Requirements: `_reversa_forward/001-validacao-lote-atividade/requirements.md`  
> Confidência: 🟢 CONFIRMADO, 🟡 INFERIDO, 🔴 LACUNA  

---

## 1. Resumo da abordagem

A funcionalidade introduz um fluxo de **Homologação em Lote Orientada a Eventos/Atividades**. No legado (`_reversa_sdd/architecture.md`), a validação de competências e especialidades ocorre estritamente de forma individual, onde o escotista revisa item por item na tela `RevisaoView`.

A nova solução adiciona:
1. Um modelo local e persistente de **Sessão de Atividade com Presença** (`AtividadeChamada`).
2. Um seletor multimodal de itens de progressão e requisitos de especialidades vinculados à atividade.
3. Um orquestrador de execução em lote (`BatchValidationOrchestrator`), que itera sobre os membros marcados como `Presente` e despacha requisições atômicas de homologação para o backend Paxtu (`/api/marcar-item-revisao` e `/api/salvar-item`), salvando em fila local offline (`sqflite`) caso não haja conectividade.

---

## 2. Princípios aplicados

| Princípio | Como a feature se relaciona | Status |
|-----------|------------------------------|--------|
| **Non-Destructive** | Não altera estruturas legadas do Paxtu; opera como orquestração sobre os contratos de homologação já existentes. | Respeita 🟢 |
| **Integridade de Dados** | Apenas jovens marcados com `Presente` têm seus itens validados; jovens ausentes têm sua integridade preservada. | Respeita 🟢 |
| **Resiliência em Campo** | Operação offline com sincronização manual orientada a lotes. | Respeita 🟢 |

---

## 3. Decisões técnicas

| ID | Decisão | Justificativa | Alternativas descartadas | Confidência |
|----|---------|----------------|--------------------------|-------------|
| **D-01** | Orquestração cliente de lote reaproveitando endpoints `/api/marcar-item-revisao` | Não exige alterações de schema no servidor central do Paxtu (que é externo e somente-leitura para nós). | Criar endpoint de lote proprietário no servidor central (inviável por governança externa). | 🟢 |
| **D-02** | Tabela local SQLite `atividade_chamada_lote` para persistência offline | Permite que o escotista realize a chamada e homologue no meio da mata sem sinal 4G. | Exigir conexão contínua em tempo real (prejudicaria acampamentos). | 🟢 |
| **D-03** | Fila de envio com indicador de progresso e idempotência | Previne duplicação de requisições e fornece feedback visual para o usuário durante o lote. | Disparo cego sem confirmação. | 🟢 |

---

## 4. Premissas

Nenhuma premissa pendente. Todos os pontos de dúvida foram resolvidos no `/reversa-clarify`.

---

## 5. Delta arquitetural

| Componente | Arquivo de origem no legado | Tipo de mudança | Resumo |
|------------|------------------------------|-----------------|--------|
| `BatchValidationOrchestrator` | `_reversa_sdd/code-analysis.md#monitor-escotista` | Componente Novo | Orquestra a iteração de homologação em lote para todos os jovens presentes. |
| `AtividadeChamadaView` | `_reversa_sdd/code-analysis.md#atividades` | Componente Novo | Tela de chamada rápida com botões Presente/Ausente/Justificado. |
| `ItemSelectorWidget` | `_reversa_sdd/code-analysis.md#especialidades` | Componente Novo | Seletor múltiplo unificado de itens de progressão e especialidades. |
| `RevisaoItemWidgetMappa1` | `_reversa_sdd/code-analysis.md#monitor-escotista` | Regra Reutilizada | Reutiliza a lógica de validação unitária já validada no legado. |

---

## 6. Delta no modelo de dados

- **Resumo:** Adição de 3 tabelas no SQLite local do app (`sqflite`): `atividades_chamada`, `presencas_atividade` e `itens_atividade`.
- **Detalhe completo em:** `_reversa_forward/001-validacao-lote-atividade/data-delta.md`

---

## 7. Delta de contratos externos

| Contrato | Tipo | Arquivo de detalhe |
|----------|------|--------------------|
| `ValidacaoLotePaxtu` | HTTP REST (Lote sequencial controlado) | `_reversa_forward/001-validacao-lote-atividade/interfaces/validacao-lote-paxtu.md` |

---

## 8. Plano de migração

Não aplicável (`n/a`). A funcionalidade é puramente incremental e aditiva sobre a base local e os serviços existentes.

---

## 9. Riscos e mitigações

| Risco | Impacto | Probabilidade | Mitigação |
|-------|---------|---------------|-----------|
| **Instabilidade de rede durante o envio do lote** | Médio | Média | Envio sequencial com retry e persistência local garantida; o lote registra status `Pendente de Sincronização` se houver falha de rede. |
| **Duplicação de item previamente conquistado** | Baixo | Alta | Verificação de idempotência antes do envio: itens já conquistados pelo jovem são ignorados. |

---

## 10. Critério de pronto

- [ ] Todas as ações de `actions.md` marcadas como `[X]`.
- [ ] Modelos de banco local SQLite implementados e migrados.
- [ ] Interface de chamada e seletor de itens integrada com GetX.
- [ ] Teste do fluxo completo de 1 clique validado.
