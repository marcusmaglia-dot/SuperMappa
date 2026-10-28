# Requirements: Validação em Lote por Atividade com Chamada e Homologação de Itens

> Identificador: `001-validacao-lote-atividade`  
> Data: `2026-10-28`  
> Pasta da extração reversa: `_reversa_sdd/`  
> Confidência: 🟢 CONFIRMADO, 🟡 INFERIDO, 🔴 LACUNA / DÚVIDA  

---

## 1. Resumo executivo

Permite aos escotistas registrar atividades de seção (reuniões, acampamentos, jornadas), realizar a lista de presença/chamada da seção (Presentes, Ausentes, Justificados) e associar os itens de progressão e especialidades trabalhados. Ao concluir a atividade, com 1 único clique, todos os jovens presentes têm seus respectivos itens homologados e validados em lote, eliminando dezenas de lançamentos individuais repetitivos por associado.

---

## 2. Contexto a partir do legado

| Fonte | Trecho relevante | Confidência |
|-------|------------------|-------------|
| `_reversa_sdd/architecture.md#secao-1` | Camada de domínio com casos de uso e integração Dio com backend Paxtu | 🟢 |
| `_reversa_sdd/domain.md#rn-05` | Autoavaliação e submissão de itens para revisão da chefia | 🟢 |
| `_reversa_sdd/domain.md#rn-11` | Escopo de governança: o escotista tem visibilidade e autoridade sobre os jovens de sua seção | 🟢 |
| `_reversa_sdd/code-analysis.md#monitor-escotista` | Uso de `GetItensRevisaoMappa1Case` e `PostMarcarRevisaoMappa1Case` | 🟢 |
| `_reversa_sdd/code-analysis.md#atividades` | Estrutura de atividades fixas e variáveis (`post_acao_case.dart`, `atividades_fixas_view.dart`) | 🟢 |
| `_reversa_sdd/code-analysis.md#especialidades` | Estrutura de requisitos e níveis de especialidades (`post_acao_especialidade_case.dart`) | 🟢 |

---

## 3. Personas e cenários de uso

| Persona | Objetivo | Cenário-chave |
|---------|----------|---------------|
| **Escotista / Chefe de Seção** | Planejar a atividade do final de semana, registrar presença e homologar itens coletivamente. | Ao final de uma atividade de pioneiria com 25 escoteiros, o escotista faz a chamada (22 presentes, 3 ausentes) e com 1 clique valida 2 itens de pioneirismo para os 22 presentes. |
| **Jovem / Beneficiário** | Ter seus itens de progressão e especialidades atualizados sem burocracia logo após o término da atividade. | O jovem abre o mAPPa após a atividade e visualiza seus itens já validados e contabilizados em sua progressão. |

---

## 4. Regras de negócio novas ou alteradas

1. **RN-01 (Associação Múltipla de Itens):** Uma atividade pode conter múltiplos itens associados simultaneamente, abrangendo itens de progressão do ramo (blocos e competências) e requisitos de especialidades. 🟢  
   - Origem no legado: `_reversa_sdd/domain.md#rn-07` e `_reversa_sdd/domain.md#rn-04`  
   - Tipo: nova  

2. **RN-02 (Regra de Presença na Homologação):** Somente associados com status `Presente` na lista de chamada recebem a validação e homologação dos itens vinculados à atividade. Associados com status `Ausente` ou `Justificado` não sofrem nenhuma alteração em seu progresso. 🟢  
   - Origem no legado: `_reversa_sdd/permissions.md#secao-2`  
   - Tipo: nova  

3. **RN-03 (Idempotência e Não-Duplicação):** Caso um jovem marcado como `Presente` já possua previamente um dos itens da atividade marcado como concluído/homologado, o sistema deve ignorar o item duplicado para aquele membro específico e prosseguir com a homologação dos itens restantes, sem gerar erro ou duplicação. 🟢  
   - Origem no legado: `_reversa_sdd/domain.md#rn-05`  
   - Tipo: nova  

4. **RN-04 (Auditoria e Rastreabilidade):** Toda validação em lote deve registrar a data, a atividade geradora e o escotista responsável que assinou a homologação coletiva. 🟢  
   - Origem no legado: `_reversa_sdd/domain.md#rn-11`  
   - Tipo: nova  

---

## 5. Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de aceite | Confidência |
|----|-----------|------------|--------------------|-------------|
| **RF-01** | Cadastro de Nova Atividade | Must | Formulário com Nome da Atividade, Data, Seção/Ramo responsável e Descrição. | 🟢 |
| **RF-02** | Seletor de Itens da Atividade | Must | Componente de busca e seleção múltipla permitindo escolher itens de progressão e especialidades. | 🟢 |
| **RF-03** | Lista de Chamada da Seção | Must | Carrega automaticamente todos os jovens da seção ativa com botões de alternância rápida (Presente / Ausente / Justificado), com default `Presente`. | 🟢 |
| **RF-04** | Ação de Validação em Lote (1 Clique) | Must | Botão "Concluir Atividade & Validar em Lote" com diálogo modal exibindo: total de presentes, total de itens e quantidade total de validações a efetuar. | 🟢 |
| **RF-05** | Histórico e Consulta de Chamadas | Should | Tela de histórico permitindo visualizar presenças e itens homologados em atividades anteriores. | 🟡 |
| **RF-06** | Exportação de Relatório de Presença | Could | Opção para exportar a folha de chamada da atividade em formato tabular/PDF. | 🟡 |

---

## 6. Requisitos Não Funcionais

| Tipo | Requisito | Evidência ou justificativa | Confidência |
|------|-----------|----------------------------|-------------|
| **Desempenho** | A validação em lote de até 50 jovens com até 10 itens cada (500 validações) deve ser processada em menos de 3 segundos na UI com barra de progresso. | Evita congelamento de tela e timeouts de rede | 🟢 |
| **Confiabilidade** | Operações de gravação atômica em lote no SQLite local com sincronização com a API Paxtu. | Suporte a trabalho em áreas de acampamento sem sinal | 🟢 |
| **Usabilidade** | Interface com botões táteis grandes (touch-friendly) para preenchimento ágil de presença em campo. | Padrão Material / Flutter do mAPPa | 🟢 |
| **Segurança** | Validação de que o usuário logado possui cargo de escotista na seção da atividade. | `_reversa_sdd/permissions.md` | 🟢 |

---

## 7. Critérios de Aceitação

```gherkin
Cenário: Homologação em 1 clique para jovens presentes
  Dado que o escotista criou a atividade "Reunião de Pioneirias" com 2 itens vinculados
  E a seção possui 10 jovens cadastrados
  E o escotista marcou 8 jovens como "Presente" e 2 jovens como "Ausente"
  Quando toca em "Concluir Atividade & Validar em Lote"
  E confirma a mensagem de resumo
  Então o sistema homologa os 2 itens para cada um dos 8 jovens presentes (totalizando 16 validações)
  E nenhum item é validado para os 2 jovens ausentes
  E o sistema exibe mensagem de sucesso com resumo da operação

Cenário: Tentativa de validação sem itens selecionados
  Dado que o escotista preencheu a lista de chamada mas não selecionou nenhum item
  Quando tenta clicar em "Concluir Atividade & Validar em Lote"
  Então o sistema impede a ação e alerta: "Selecione ao menos um item de progressão ou especialidade trabalhado nesta atividade"
```

---

## 8. Prioridade MoSCoW

| Item | MoSCoW | Justificativa |
|------|--------|---------------|
| RF-01 (Cadastro de Atividade) | Must | Base estrutural para vincular data e seção |
| RF-02 (Seletor Múltiplo de Itens) | Must | Necessário para especificar o que foi realizado |
| RF-03 (Lista de Chamada com Status) | Must | Núcleo da funcionalidade de presença |
| RF-04 (Validação em Lote 1 Clique) | Must | Proposta de valor central solicitada pelo usuário |
| RF-05 (Histórico de Chamadas) | Should | Importante para consulta posterior da chefia |
| RF-06 (Exportação de PDF) | Could | Desejável, mas não essencial na primeira versão |

---

## 9. Esclarecimentos

### Sessão 2026-10-28
- **Q:** Como o aplicativo deve se comportar quando estiver offline (acampamentos/campo)?  
  **R:** Salva localmente em SQLite e exibe um botão explícito "Sincronizar Pendências com o Paxtu" com indicador de lote pendente para o escotista disparar quando tiver conexão estável.
- **Q:** A lista de chamada pode ser retificada pós-conclusão?  
  **R:** Não, após o clique de conclusão a atividade é travada e arquivada como somente-leitura para garantir integridade e evitar inconsistências.
- **Q:** Deve haver campo para detalhar justificativa de ausência?  
  **R:** Não, apenas a marcação do status "Justificado" já atende à rotina da seção.

---

## 10. Lacunas

> Nenhuma dúvida pendente. O documento está totalmente clarificado e pronto para a fase de planejamento técnico (`/reversa-plan`).

---

## 11. Histórico de alterações

| Data | Alteração | Autor |
|------|-----------|-------|
| 2026-10-28 | Versão inicial gerada por `/reversa-requirements` | Marcus (via Reversa) |
| 2026-10-28 | Resolução de dúvidas de sincronização offline e governança via `/reversa-clarify` | Marcus (via Reversa) |

