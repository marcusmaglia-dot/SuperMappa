# Comunicação e Mensagens (comunicacao) — Requisitos

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído diretamente do código e use cases)

---

## Visão Geral
O módulo `comunicacao` implementa o canal de mensageria e notificações entre escotistas e jovens/famílias, permitindo orientações pedagógicas, esclarecimento de dúvidas sobre itens e registro de conversas formativas.

---

## Responsabilidades
- Listar notificações e mensagens recebidas via `/api/mensagem-associado` e `/api/notificacoes`.
- Permitir ao escotista enviar mensagens e feedbacks via `/api/conversar` e `/api/conversar-adulto`.
- Registrar histórico de diálogos vinculados ao acompanhamento de progressão.

---

## Regras de Negócio
- **RN-COM-01:** As mensagens são estritamente contextuais ao desenvolvimento escoteiro e acompanhamento da seção. 🟢
- **RN-COM-02:** O histórico de interações fica acessível tanto para o jovem quanto para a equipe de chefia da seção. 🟢

---

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| **RF-COM-01** | Central de Notificações | Must | Tela listando alertas e avisos do sistema (`NotificacaoView`). |
| **RF-COM-02** | Envio de Mensagem de Orientação | Must | Modal de mensagem para jovem ou adulto (`/api/conversar`). |
| **RF-COM-03** | Histórico de Conversas | Should | Linha do tempo de mensagens trocadas (`/api/historico`). |

---

## Critérios de Aceitação

```gherkin
Cenário: Escotista envia mensagem sobre item de progressão
  Dado que o escotista está revisando uma atividade
  Quando clica no botão "Conversar com o Jovem"
  E digita orientações sobre o item
  Então o sistema envia a mensagem via POST /api/conversar
  E o jovem recebe a notificação em sua central de mensagens
```
