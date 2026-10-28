# Formação do Adulto (adulto-apf) — Design Técnico

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído dos use cases em Dart)

---

## Contratos de API REST

| Método | Caminho | Entrada | Saída | Status Codes |
|--------|---------|---------|-------|--------------|
| `GET` | `/api/adulto-progressao/` | `idAdulto: int` | Dados consolidados de formação do adulto | 200, 401 |
| `GET` | `/api/adulto-progressao-atividade`| `idAdulto: int` | Atividades formativas e cursos realizados | 200, 401 |
| `POST` | `/api/salvar-linha-formacao` | `{"idAdulto": int, "linha": string}` | Confirmação da linha (Escotista/Dirigente) | 200, 400 |
| `POST` | `/api/salvar-plano-pessoal` | Payload completo do APF em JSON | Confirmação de persistência no Paxtu | 200, 400 |

---

## Estrutura de Classes e Componentes

| Classe | Camada | Papel |
|--------|--------|-------|
| `PlanoPessoalFormacaoView` | Apresentação | Visão geral da trilha de formação do adulto |
| `ApfCompetenciasView` | Apresentação | Lista de competências formativas |
| `ApfAutoavaliacaoView` | Apresentação | Interface de reflexão e autoavaliação |
| `GetItensPPFCase` | Domínio | Busca os itens pactuados no APF |
| `PostPPFCase` | Domínio | Persiste as atualizações do plano pessoal |
| `PlanoPessoalFormacaoModel` | Dados | Mapeamento JSON do plano formativo |
