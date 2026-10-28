# Painel do Escotista e Revisão (monitor-escotista) — Requisitos

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído diretamente do fluxo de revisão e gestão de seção)

---

## Visão Geral
O módulo `monitor-escotista` é o ambiente de trabalho do chefe de seção (Escotista). Ele permite acompanhar a lista completa de jovens da sua seção (Alcateia, Tropa Escoteira, Tropa Sênior, Clã), favoritar membros para acesso ágil, e operar a **Fila de Revisão**, onde são homologados ou devolvidos os itens de progressão, especialidades e insígnias submetidos pelos jovens.

---

## Responsabilidades
- Listar todas as seções e jovens vinculados ao escotista logado.
- Permitir favoritar/desfavoritar jovens para facilitar o acompanhamento em reuniões e acampamentos.
- Consolidar a fila de itens pendentes de revisão (`/api/itens-revisao`).
- Permitir ações pedagógicas: **Aprovar**, **Devolver com comentário orientador** ou **Marcar para demonstração presencial**.

---

## Regras de Negócio
- **RN-MON-01:** O escotista só tem acesso aos jovens e à fila de revisão das seções nas quais possui nomeação oficial ativa no Paxtu. 🟢
- **RN-MON-02:** A homologação no app (`postMarcarRevisaoMappa1`) valida imediatamente a conquista no backend central Paxtu 100. 🟢
- **RN-MON-03:** Em caso de devolução de item, o escotista é obrigado a inserir uma mensagem orientadora para guiar o aprendizado do jovem. 🟢

---

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| **RF-MON-01** | Painel Principal de Seção | Must | Lista de seções e jovens com fotos, ramos e progresso (`MonitorHomeView`, `MonitorJovensView`). |
| **RF-MON-02** | Gestão de Favoritos | Should | Marcação rápida de jovens com persistência em `/api/favoritar-associado`. |
| **RF-MON-03** | Fila de Revisão de Itens | Must | Lista unificada de submissões pendentes (`RevisaoView`). |
| **RF-MON-04** | Ações de Homologação e Feedback | Must | Botões de Aprovar, Devolver e Conversar (`revisao_item_widget_mappa1.dart`). |

---

## Critérios de Aceitação

```gherkin
Cenário: Escotista homologa especialidade de um jovem
  Dado que o escotista está na tela de Fila de Revisão
  Quando seleciona a submissão do jovem da sua tropa
  E clica em "Aprovar"
  Então o sistema envia a confirmação para POST /api/marcar-item-revisao
  E o item é removido da fila de pendências
  E o status da especialidade do jovem é atualizado para homologado no Paxtu
```
