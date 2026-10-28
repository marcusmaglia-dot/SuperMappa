# Comunicação e Mensagens (comunicacao) — Design Técnico

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído do binário AOT e views)

---

## Contratos de API REST

| Método | Caminho | Entrada | Saída | Status Codes |
|--------|---------|---------|-------|--------------|
| `GET` | `/api/mensagem-associado` | `idAssociado: int` | Lista de mensagens recebidas | 200, 401 |
| `POST` | `/api/conversar` | `{"idAssociado": int, "mensagem": string}` | Confirmação de envio | 200, 400 |
| `POST` | `/api/conversar-adulto` | `{"idAdulto": int, "mensagem": string}` | Confirmação de envio entre adultos | 200, 400 |
| `GET` | `/api/historico` | `idAssociado: int` | Linha do tempo de interações | 200, 401 |

---

## Estrutura de Classes e Componentes

| Classe | Camada | Papel |
|--------|--------|-------|
| `NotificacaoView` | Apresentação | Central de avisos e notificações |
| `PostItemChamarConversarCase` | Domínio | Envio de mensagem contextuada com item de progressão |
| `GetNotificacoesCase` | Domínio | Busca de notificações do usuário |
| `MensagemModel` | Dados | Mapeamento JSON de mensagens |
