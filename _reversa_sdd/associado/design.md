# Perfil e Dados do Associado (associado) — Design Técnico

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído do binário AOT e views)

---

## Contratos de API REST

| Método | Caminho | Entrada | Saída | Status Codes |
|--------|---------|---------|-------|--------------|
| `GET` | `/api/perfil` | Headers: `Authorization: Bearer <token>` | `AssociateInfoModel` (JSON com dados cadastrais) | 200, 401 |
| `GET` | `/api/associado-home` | Headers de Sessão | Dados resumidos de progresso, ramo e pendências | 200, 401 |
| `POST` | `/api/perfil-foto` | Multipart Form: `file` (imagem PNG/JPEG) | `{"success": true, "fotoUrl": "string"}` | 200, 400, 413 |

---

## Estrutura de Classes e Componentes

| Classe | Camada | Papel |
|--------|--------|-------|
| `NewProfileView` | Apresentação | Tela principal de exibição de dados cadastrais |
| `ProfileController` | Controle | Gerenciamento de estado, requisições de perfil e seleção de imagem |
| `AssociateInfoModel` | Dados | Mapeamento JSON dos dados do associado |
| `ImagePickerService` | Infraestrutura | Captura e compressão de imagens antes do upload |
