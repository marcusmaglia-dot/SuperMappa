# Insígnias Especiais (insignias) — Tarefas de Implementação

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO

---

## Tarefas de Construção

- [ ] **T-INS-01:** Implementar entidades `InsigniaModel` e `InsigniaItemModel`.
  - *Origem:* `package:maapa/newmAPPa/presentation/views/insignias_home_view.dart`
  - *Critério de pronto:* Parsing de campos, ramo aplicável e ícones remotos.
  - *Confiança:* 🟢

- [ ] **T-INS-02:** Implementar casos de uso `GetInsigniasCase` e `GetInsigniasItensCase`.
  - *Origem:* `package:maapa/newmAPPa/usecases/get_insignias_case.dart`
  - *Critério de pronto:* Integração com `/api/insignias` e `/api/insignia/itens`.
  - *Confiança:* 🟢

- [ ] **T-INS-03:** Desenvolver tela `InsigniasHomeView` com layout em cards e distinção visual para insígnias conquistadas vs. em andamento.
  - *Origem:* `package:maapa/newmAPPa/presentation/views/insignias_home_view.dart`
  - *Critério de pronto:* Exibição de insígnias oficiais da UEB.
  - *Confiança:* 🟢

- [ ] **T-INS-04:** Desenvolver tela `InsigniasItensView` com fluxo de submissão e feedback visual.
  - *Origem:* `package:maapa/newmAPPa/presentation/views/insignias_itens_view.dart`
  - *Critério de pronto:* Submissão via `POST /api/salvar-insignia`.
  - *Confiança:* 🟢
