# Interface de Integração — Validação em Lote Paxtu

> Identificador: `001-validacao-lote-atividade`  
> Contrato: `ValidacaoLotePaxtu`  
> Data: `2026-10-28`  
> Escala de Confiança: 🟢 CONFIRMADO (utiliza o contrato unitário mapeado do Paxtu)

---

## 1. Descrição do Protocolo de Lote

A operação em lote é despachada pelo cliente móvel executando chamadas sequenciais controladas contra a API oficial do Paxtu para garantir integridade e rastreabilidade individual por associado.

### Endpoint Alvo
- **URL:** `POST https://paxtu100.escoteiros.org.br/api/marcar-item-revisao` (ou `/api/salvar-item`)
- **Headers:**
  ```http
  Authorization: Bearer <token_sessao_escotista>
  Content-Type: application/json
  ```

### Payload por Item/Associado Presente
```json
{
  "idAssociado": 1511813,
  "idItem": 4201,
  "status": "aprovado",
  "comentario": "Aprovado em lote pela atividade: Reunião de Pioneiria"
}
```

---

## 2. Idempotência e Tratamento de Erros

1. **Idempotência:** Se o jovem já possuir o item com status `aprovado`, o backend retorna 200/OK ou o cliente ignora silenciosamente.
2. **Timeout:** Timeout individual de 10 segundos por chamada. Em caso de perda de conexão no meio da lista, os itens não enviados permanecem na tabela local `presencas_atividade` com status `pendente_sincronizacao`, permitindo retry do lote sem revalidar quem já foi enviado.
