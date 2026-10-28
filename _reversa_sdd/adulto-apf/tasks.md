# Formação do Adulto (adulto-apf) — Tarefas de Implementação

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO

---

## Tarefas de Construção

- [ ] **T-APF-01:** Implementar entidades `PlanoPessoalFormacaoModel` e `CompetenciaAdultoModel`.
  - *Origem:* `package:maapa/newmAPPa/presentation/views/plano_pessoal_formacao_view.dart`
  - *Critério de pronto:* Parsing dos campos de linha formativa, ramo de atuação e competências.
  - *Confiança:* 🟢

- [ ] **T-APF-02:** Implementar casos de uso `GetItensPPFCase` e `PostPPFCase`.
  - *Origem:* `package:maapa/newmAPPa/usecases/get_itens_ppf_case.dart`, `post_ppf_case.dart`
  - *Critério de pronto:* Consulta e envio do plano de formação via cliente HTTP Dio.
  - *Confiança:* 🟢

- [ ] **T-APF-03:** Desenvolver tela `PlanoPessoalFormacaoView` e seletor de linha formativa.
  - *Origem:* `package:maapa/newmAPPa/presentation/views/plano_pessoal_formacao_view.dart`
  - *Critério de pronto:* Alternância visual entre linha Escotista e linha Dirigente.
  - *Confiança:* 🟢

- [ ] **T-APF-04:** Desenvolver tela de autoavaliação `ApfAutoavaliacaoView` com componentes de reflexão e notas.
  - *Origem:* `package:maapa/newmAPPa/presentation/views/apf_autoavaliacao_view.dart`
  - *Critério de pronto:* Salvar autoavaliação com sucesso no Paxtu.
  - *Confiança:* 🟢
