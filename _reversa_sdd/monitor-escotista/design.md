# Painel do Escotista e Revisão (monitor-escotista) — Design Técnico

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído dos widgets de revisão e use cases)

---

## Contratos de API REST

| Método | Caminho | Entrada | Saída | Status Codes |
|--------|---------|---------|-------|--------------|
| `GET` | `/api/secoes` | Headers de Sessão | Lista de seções do escotista logado | 200, 401 |
| `GET` | `/api/favoritos-associado` | `idSecao: int` | Lista de IDs de jovens favoritados | 200, 401 |
| `POST` | `/api/favoritar-associado` | `{"idAssociado": int, "favorito": bool}` | Confirmação de alteração de favorito | 200, 400 |
| `GET` | `/api/itens-revisao` | `idSecao: int` | Lista consolidada de pendências de revisão (`List<ItensRevisaoModel>`) | 200, 401 |
| `POST` | `/api/marcar-item-revisao` | `{"idItem": int, "status": "aprovado" \| "devolvido", "comentario": string}` | Confirmação da ação de revisão | 200, 400 |

---

## Estrutura de Classes e Componentes

| Classe | Camada | Papel |
|--------|--------|-------|
| `MonitorHomeView` | Apresentação | Dashboard principal do escotista |
| `MonitorJovensView` | Apresentação | Grid/Lista dos jovens da seção |
| `RevisaoView` | Apresentação | Fila de homologações pedagógicas |
| `RevisaoItemWidgetMappa1` | Apresentação | Componente com detalhes do item e botões de ação |
| `GetItensRevisaoMappa1Case` | Domínio | Busca itens pendentes de revisão |
| `PostMarcarRevisaoMappa1Case` | Domínio | Executa a homologação ou devolução |
| `ItensRevisaoModel` | Dados | Mapeamento do item a ser revisado |
