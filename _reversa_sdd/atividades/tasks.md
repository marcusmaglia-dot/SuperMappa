# Atividades de Ciclo (atividades) — Tarefas de Implementação

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO

---

## Tarefas de Construção

- [ ] **T-ATIV-01:** Implementar entidade `AtividadeModel` com campos de identificador, título, tipo (fixa/variável) e status.
  - *Origem:* `package:maapa/newmAPPa/presentation/views/atividades_fixas_view.dart`
  - *Critério de pronto:* Parsing dos modelos de atividades.
  - *Confiança:* 🟢

- [ ] **T-ATIV-02:** Implementar casos de uso `PostAcaoCase` e `PostAcaoVariavelCase`.
  - *Origem:* `package:maapa/newmAPPa/usecases/post_acao_case.dart`, `post_acao_variavel_case.dart`
  - *Critério de pronto:* Integração com `/api/salvar-acoes` e `/api/adicionar-variavel`.
  - *Confiança:* 🟢

- [ ] **T-ATIV-03:** Desenvolver telas `AtividadesFixasView` e `AtividadesVariaveisView`.
  - *Origem:* `package:maapa/newmAPPa/presentation/views/atividades_variaveis_view.dart`
  - *Critério de pronto:* Exibição de cards de desafios e formulário de adição rápida.
  - *Confiança:* 🟢
