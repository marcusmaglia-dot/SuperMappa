# Perfil e Dados do Associado (associado) — Tarefas de Implementação

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO

---

## Tarefas de Construção

- [ ] **T-ASSOC-01:** Modelar a entidade `AssociateInfoModel` com campos cadastrais e serialização JSON.
  - *Origem:* `package:maapa/newmAPPa/presentation/views/new_profile_view.dart`
  - *Critério de pronto:* Parsing de campos de nome, registro UEB, ramo, seção e URL da foto.
  - *Confiança:* 🟢

- [ ] **T-ASSOC-02:** Implementar use cases `GetPerfilCase` e `GetAssociadoHomeCase`.
  - *Origem:* `libapp.so` (`/api/perfil`, `/api/associado-home`)
  - *Critério de pronto:* Integração com cliente Dio e injeção de token de sessão.
  - *Confiança:* 🟢

- [ ] **T-ASSOC-03:** Desenvolver tela `NewProfileView` e componente de avatar com cache de rede (`CachedNetworkImage`).
  - *Origem:* `package:maapa/newmAPPa/presentation/views/new_profile_view.dart`
  - *Critério de pronto:* Exibição de dados institucionais e placeholder durante o carregamento.
  - *Confiança:* 🟢

- [ ] **T-ASSOC-04:** Implementar fluxo de upload de foto de perfil via `image_picker` e chamada multipart para `/api/perfil-foto`.
  - *Origem:* `libapp.so` (`/api/perfil-foto`)
  - *Critério de pronto:* Compressão de imagem e atualização dinâmica do avatar após confirmação do backend.
  - *Confiança:* 🟢
