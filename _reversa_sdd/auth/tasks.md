# Autenticação e Sessão (auth) — Tarefas de Implementação

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (tarefas com rastreabilidade direta)

---

## Pré-requisitos
- [x] Cliente HTTP configurado com base URL `https://paxtu100.escoteiros.org.br` 🟢
- [x] Injeção de dependências e gerenciador de rotas configurados 🟢
- [x] Certificados SSL e políticas de tráfego de rede habilitados 🟢

---

## Tarefas de Construção

- [ ] **T-AUTH-01:** Implementar DTO de credenciais `LoginParams` com campos `user` e `pass`.
  - *Origem:* `package:maapa/mAPPa/welcome/auth/domain/params/login_params.dart`
  - *Critério de pronto:* Validação de obrigatoriedade de campos e serialização para JSON.
  - *Confiança:* 🟢

- [ ] **T-AUTH-02:** Implementar Caso de Uso `LoginCase` integrado ao cliente HTTP Dio.
  - *Origem:* `package:maapa/mAPPa/welcome/auth/domain/usecases/login_case.dart`
  - *Critério de pronto:* Chamada `POST /api/login`, captura de token e mapeamento para `AuthSessionModel`.
  - *Confiança:* 🟢

- [ ] **T-AUTH-03:** Desenvolver `LoginController` para gestão de estado reativo da tela de login.
  - *Origem:* `package:maapa/mAPPa/welcome/auth/presentation/controllers/login_controller.dart`
  - *Critério de pronto:* Loading observável, tratamento de erros e redirecionamento condicional por `tipoAssociado`.
  - *Confiança:* 🟢

- [ ] **T-AUTH-04:** Construir interface `LoginPage` com tema institucional dos Escoteiros do Brasil.
  - *Origem:* `package:maapa/mAPPa/welcome/auth/presentation/views/login_page.dart`
  - *Critério de pronto:* Campos de entrada, logo dos Escoteiros do Brasil e link para recuperação de senha no Paxtu.
  - *Confiança:* 🟢

- [ ] **T-AUTH-05:** Configurar persistência segura de token e cabeçalhos de autorização (`CookieJar` / SharedPreferences).
  - *Origem:* `package:maapa/mAPPa/welcome/auth/bindings/login_binding.dart`
  - *Critério de pronto:* Sessão reidratada na inicialização do aplicativo sem necessidade de novo login.
  - *Confiança:* 🟢

---

## Tarefas de Teste

- [ ] **TT-AUTH-01:** Teste unitário de `LoginParams.toJson()` e validações de campo.
- [ ] **TT-AUTH-02:** Teste de integração do `LoginCase` simulando respostas de sucesso (200) e erro (401, 500).
- [ ] **TT-AUTH-03:** Teste de roteamento pós-login (usuário jovem $\to$ `WelcomeHomeView`; usuário escotista $\to$ `MonitorHomeView`).
