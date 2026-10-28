# Insígnias Especiais (insignias) — Design Técnico

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído do binário AOT e assets)

---

## Contratos de API REST

| Método | Caminho | Entrada | Saída | Status Codes |
|--------|---------|---------|-------|--------------|
| `GET` | `/api/insignias` | `idAssociado: int` | Catálogo de insígnias disponíveis | 200, 401 |
| `GET` | `/api/insignia/itens` | `idInsignia: int, idAssociado: int` | Itens e status da insígnia | 200, 401 |
| `GET` | `/api/insignias-especiais-associado`| `idAssociado: int` | Insígnias já conquistadas pelo membro | 200, 401 |
| `POST` | `/api/salvar-insignia` | `{"idAssociado": int, "idInsignia": int, "idItem": int}` | Confirmação de submissão do requisito | 200, 400 |

---

## Estrutura de Classes e Componentes

| Classe | Camada | Papel |
|--------|--------|-------|
| `InsigniasHomeView` | Apresentação | Grid com cards de insígnias especiais e badges |
| `InsigniasItensView` | Apresentação | Visualização de requisitos e evidências |
| `GetInsigniasCase` | Domínio | Busca de catálogo de insígnias |
| `GetInsigniasItensCase` | Domínio | Busca de requisitos específicos |
| `InsigniaModel` | Dados | Mapeamento JSON de insígnia |
| `CachedNetworkImage` | Infraestrutura | Carregamento otimizado de imagens no S3 da UEB |
