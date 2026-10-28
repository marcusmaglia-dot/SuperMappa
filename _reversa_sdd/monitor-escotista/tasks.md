# Painel do Escotista e Revisão (monitor-escotista) — Tarefas de Implementação

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO

---

## Tarefas de Construção

- [ ] **T-MON-01:** Implementar modelo `ItensRevisaoModel` e enum `TipoItemRevisao` (Progressão, Especialidade, Insígnia).
  - *Origem:* `package:maapa/newmAPPa/presentation/views/revisao_view.dart`
  - *Critério de pronto:* Parsing de dados do jovem, data de envio e descrição do requisito.
  - *Confiança:* 🟢

- [ ] **T-MON-02:** Implementar casos de uso `GetItensRevisaoMappa1Case` e `PostMarcarRevisaoMappa1Case`.
  - *Origem:* `package:maapa/newmAPPa/usecases/get_itens_revisao_mappa1_case.dart`
  - *Critério de pronto:* Consulta e envio de status de homologação ao Paxtu.
  - *Confiança:* 🟢

- [ ] **T-MON-03:** Desenvolver tela `MonitorHomeView` com lista de seções e jovens favoritados.
  - *Origem:* `package:maapa/newmAPPa/presentation/views/monitor_home_view.dart`
  - *Critério de pronto:* Exibição de cards de jovens com foto e atalho para o perfil.
  - *Confiança:* 🟢

- [ ] **T-MON-04:** Construir tela `RevisaoView` e widget interativo `RevisaoItemWidgetMappa1`.
  - *Origem:* `package:maapa/newmAPPa/presentation/widgets/revisao_item_widget_mappa1.dart`
  - *Critério de pronto:* Modal de confirmação, campo de comentário em caso de devolução e remoção fluida do item revisado.
  - *Confiança:* 🟢
