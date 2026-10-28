# Formação do Adulto (adulto-apf) — Requisitos

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído diretamente do código e regras do APF)

---

## Visão Geral
O módulo `adulto-apf` gerencia o **Plano Pessoal de Formação (APF)** dos adultos voluntários (Escotistas e Dirigentes), acompanhando sua rota de aprendizagem, autoavaliação de competências de liderança, gestão e aplicação do método escoteiro.

---

## Responsabilidades
- Permitir ao adulto escolher e registrar sua Linha de Formação (Escotista ou Dirigente) e Ramo de Atuação.
- Apresentar o ciclo de competências do adulto estruturado por níveis formativos (Preliminar, Básico, Avançado).
- Disponibilizar instrumento de autoavaliação e pactuação com o Assessor Pessoal de Formação.
- Sincronizar o plano de formação com o Paxtu via `/api/salvar-plano-pessoal`.

---

## Regras de Negócio
- **RN-APF-01:** O adulto opta entre a Linha Escotista (pedagógica com os ramos) ou Linha Dirigente (institucional/administrativa). 🟢
- **RN-APF-02:** A validação final das competências do adulto para concessão de níveis formativos (incluindo a Insígnia de Madeira) é realizada em conjunto com o Assessor Pessoal de Formação designado. 🟢

---

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| **RF-APF-01** | Visualização do Plano Pessoal de Formação | Must | Tela principal com status da rota de aprendizagem (`PlanoPessoalFormacaoView`). |
| **RF-APF-02** | Autoavaliação de Competências do Adulto | Must | Interface de checklist e reflexão pedagógica (`ApfAutoavaliacaoView`). |
| **RF-APF-03** | Ciclo de Competências e Metas | Should | Detalhe de ações formativas pactuadas (`ApfCicloCompetenciaView`). |

---

## Critérios de Aceitação

```gherkin
Cenário: Escotista realiza autoavaliação no APF
  Dado que o escotista está autenticado em sua conta adulta
  Quando acessa a área do APF e avalia suas competências de aplicação do método
  E salva as metas acordadas
  Então o sistema persiste o plano via POST /api/salvar-plano-pessoal
  E disponibiliza os dados para consulta pelo seu Assessor Pessoal
```
