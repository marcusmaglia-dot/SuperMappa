# Atividades de Ciclo (atividades) — Design Técnico

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído do binário AOT e views)

---

## Contratos de API REST

| Método | Caminho | Entrada | Saída | Status Codes |
|--------|---------|---------|-------|--------------|
| `GET` | `/api/acoes/associado` | `idAssociado: int` | Lista de ações realizadas pelo membro | 200, 401 |
| `POST` | `/api/salvar-acoes` | `{"idAssociado": int, "idAcao": int, "concluido": bool}` | Confirmação de registro da ação | 200, 400 |
| `POST` | `/api/adicionar-variavel` | `{"idCiclo": int, "titulo": string, "descricao": string}` | `{"idAtividade": int, "sucesso": true}` | 201, 400 |

---

## Estrutura de Classes e Componentes

| Classe | Camada | Papel |
|--------|--------|-------|
| `AtividadesFixasView` | Apresentação | Exibição de desafios estruturados do ramo |
| `AtividadesVariaveisView` | Apresentação | Formulário e lista de desafios customizados |
| `PostAcaoCase` | Domínio | Registra conclusão de ação |
| `PostAcaoVariavelCase` | Domínio | Persiste nova atividade variável |
| `AtividadeModel` | Dados | Mapeamento JSON da atividade |
