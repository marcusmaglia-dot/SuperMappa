# Especialidades (especialidades) — Tarefas de Implementação

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO

---

## Tarefas de Construção

- [ ] **T-ESP-01:** Implementar entidades `EspecialidadeModel` e `ItemEspecialidadeModel`.
  - *Origem:* `package:maapa/newmAPPa/presentation/views/especialidades_view.dart`
  - *Critério de pronto:* Parsing de campos, IDs e status de cumprimento de itens.
  - *Confiança:* 🟢

- [ ] **T-ESP-02:** Implementar casos de uso de busca e submissão (`GetPostEspecialidadesEixoCase` e `PostAcaoEspecialidadeCase`).
  - *Origem:* `package:maapa/newmAPPa/usecases/get_post_especialidades_eixo_case.dart`
  - *Critério de pronto:* Integração com os endpoints do Paxtu via Dio.
  - *Confiança:* 🟢

- [ ] **T-ESP-03:** Desenvolver tela `EspecialidadesHomeView` com catálogo e filtro por área de conhecimento.
  - *Origem:* `package:maapa/newmAPPa/presentation/views/especialidades_home_view.dart`
  - *Critério de pronto:* Navegação fluida entre áreas e busca em tempo real.
  - *Confiança:* 🟢

- [ ] **T-ESP-04:** Desenvolver tela de requisitos `EspecialidadesItensView` com indicador dinâmico de nível (1, 2 ou 3).
  - *Origem:* `package:maapa/newmAPPa/presentation/views/especialidades_itens_view.dart`
  - *Critério de pronto:* Marcação de checkboxes e feedback imediato de nível atingido.
  - *Confiança:* 🟢
