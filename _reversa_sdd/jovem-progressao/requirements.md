# Progressão do Jovem (jovem-progressao) — Requisitos

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído diretamente dos use cases de progressão e ramos)

---

## Visão Geral
O módulo `jovem-progressao` é o coração pedagógico do mAPPa para os beneficiários do Movimento Escoteiro. Ele gerencia o mapa de desenvolvimento pessoal nos 4 ramos (Lobinho, Escoteiro, Sênior e Pioneiro), distribuído nos 4 eixos educativos (Conhecer, Fazer, Conviver, Ser), blocos de etapas e ciclos semestrais de competências.

---

## Responsabilidades
- Exibir a trilha visual de progressão e distintivos conquistados pelo jovem.
- Apresentar competências e itens práticos agrupados pelos 4 eixos educativos.
- Permitir que o jovem assinale itens realizados e submeta evidências para homologação do escotista.
- Gerenciar ciclos de desenvolvimento (pactuação semestral de metas).

---

## Regras de Negócio
- **RN-PROG-01:** O conteúdo de progressão (competências e distintivos) varia estritamente conforme o ramo atual do jovem (Lobinho, Escoteiro, Sênior ou Pioneiro). 🟢
- **RN-PROG-02:** Os itens cumpridos entram em estado `Pendente de Revisão` até que o escotista responsável avalie e aprove no painel de monitoramento. 🟢
- **RN-PROG-03:** A conquista de um distintivo de progressão requer a conclusão da porcentagem regulamentar de competências de cada eixo educativo. 🟢

---

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| **RF-PROG-01** | Visualização de Blocos e Distintivos | Must | Carrossel e linha do tempo de progressão por ramo (`MinhaProgressaoView`). |
| **RF-PROG-02** | Navegação por Eixos Educativos | Must | Abas para Conhecer, Fazer, Conviver e Ser (`ProgressaoEixoView`). |
| **RF-PROG-03** | Marcação e Submissão de Itens | Must | Checkbox de item com envio para `/api/salvar-item` / `/api/salvar-itens-competencia`. |
| **RF-PROG-04** | Acompanhamento de Ciclos Semestrais | Should | Consulta de ciclos ativos e criação de novo ciclo (`/api/ciclos`, `/api/criar-ciclo`). |

---

## Critérios de Aceitação

```gherkin
Cenário: Jovem marca item de competência concluído
  Dado que o jovem está autenticado no ramo Escoteiro
  Quando navega até o eixo "Fazer" e seleciona a competência "Pioneirias Básicas"
  E marca o item "Fazer um nó de barqueiro aplicado a uma amarra"
  Então o aplicativo envia a atualização para /api/salvar-item
  E o status do item passa para "Pendente de Revisão"
  E o item entra na fila de revisão do escotista da seção
```
