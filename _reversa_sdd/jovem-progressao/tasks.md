# Progressão do Jovem (jovem-progressao) — Tarefas de Implementação

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO

---

## Tarefas de Construção

- [ ] **T-PROG-01:** Implementar entidades `BlocoProgressaoModel`, `CompetenciaModel` e `ItemCompetenciaModel`.
  - *Origem:* `package:maapa/newmAPPa/presentation/views/minha_progressao_view.dart`
  - *Critério de pronto:* Desserialização correta dos modelos de dados retornados por `/api/blocos` e `/api/competencias`.
  - *Confiança:* 🟢

- [ ] **T-PROG-02:** Implementar casos de uso `GetBlocosAssociadoCase` e `GetCompetenciasCase`.
  - *Origem:* `package:maapa/newmAPPa/usecases/get_blocos_associado_case.dart`, `get_competencias_case.dart`
  - *Critério de pronto:* Integração com a API do Paxtu e cache local em SQLite.
  - *Confiança:* 🟢

- [ ] **T-PROG-03:** Desenvolver telas `MinhaProgressaoView` e `ProgressaoEixoView` com navegação pelos 4 eixos (Conhecer, Fazer, Conviver, Ser).
  - *Origem:* `package:maapa/newmAPPa/presentation/views/progressao_eixo_view.dart`
  - *Critério de pronto:* Layout com abas dos eixos e lista expansível de competências.
  - *Confiança:* 🟢

- [ ] **T-PROG-04:** Implementar caso de uso `PostSalvarItemCase` com tratamento de feedback visual para status pendente de revisão.
  - *Origem:* `package:maapa/newmAPPa/presentation/views/minha_progressao_itens_view.dart`
  - *Critério de pronto:* Atualização assíncrona da UI e envio ao backend `/api/salvar-item`.
  - *Confiança:* 🟢
