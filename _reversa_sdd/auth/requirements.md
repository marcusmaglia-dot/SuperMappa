# Autenticação e Sessão (auth) — Requisitos

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído diretamente do código e use cases)

---

## Visão Geral
O módulo `auth` gerencia a identificação institucional dos membros (Jovens, Escotistas, Dirigentes), autenticação contra a API REST do Paxtu 100, persistência da sessão local e roteamento da interface com base no papel do usuário.

---

## Responsabilidades
- Coletar as credenciais do usuário (Registro UEB e Senha).
- Validar formato de entrada e submeter ao endpoint `/api/login` do Paxtu.
- Armazenar de forma segura o token de sessão retornado e dados de identificação (`idAssociado`, `tipoAssociado`).
- Rotear o usuário autenticado para o fluxo correspondente (Jovem vs. Escotista/Adulto).
- Gerenciar expiração e renovação de sessão.

---

## Regras de Negócio
- **RN-01:** O login exige número de registro UEB numérico válido e senha cadastrada no Paxtu. 🟢
- **RN-02:** Sessões ativas devem persistir tokens e cookies de autorização para consumo das APIs subsequentes. 🟢
- **RN-03:** Redirecionamento condicional pós-login: `tipoAssociado == "jovem"` é direcionado para `WelcomeHomeView`; `tipoAssociado == "adulto"` (ou escotista) é direcionado para `MonitorHomeView` / `AdultHomeView`. 🟢
- **RN-04:** Falha na autenticação deve exibir mensagem de erro amigável sem expor dados internos do servidor. 🟢

---

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| **RF-AUTH-01** | Tela de Login com campos de Registro UEB e Senha | Must | Formulário interativo com validação de preenchimento. |
| **RF-AUTH-02** | Integração com endpoint `POST /api/login` | Must | Requisição HTTPS enviando `user` e `pass`, tratando respostas 200, 401 e 500. |
| **RF-AUTH-03** | Persistência de Sessão e Token | Must | Armazenamento de sessão local via `CookieJar` e SharedPreferences/GetStorage. |
| **RF-AUTH-04** | Redirecionamento baseado em Role | Must | Jovem acessa tela de ramos; Escotista acessa gestão de seção. |
| **RF-AUTH-05** | Logout e Encerramento de Sessão | Should | Limpeza de cache de sessão e retorno à `LoginPage`. |

---

## Requisitos Não Funcionais

| Tipo | Requisito inferido | Evidência no código | Confiança |
|------|--------------------|---------------------|-----------|
| **Segurança** | Tráfego obrigatoriamente criptografado via TLS/HTTPS | `env.json` (`https://paxtu100.escoteiros.org.br`) | 🟢 |
| **Segurança** | Sanitização e envio protegido de credenciais | `package:maapa/mAPPa/welcome/auth/domain/params/login_params.dart` | 🟢 |
| **Performance** | Timeout de rede configurado para evitar bloqueio da UI | Configurações do cliente Dio | 🟢 |
| **Confiabilidade** | Fallback de conexão para o novo backend | `env.json` (`NEWBASEURL`) | 🟡 |

---

## Critérios de Aceitação

```gherkin
Cenário: Autenticação de Escotista com Sucesso
  Dado que o escotista está na tela de login
  Quando preenche o registro UEB "1511813" e a senha correta
  E toca no botão "Entrar"
  Então o sistema autentica junto ao endpoint /api/login
  E armazena o token de sessão
  E redireciona para a tela inicial de gestão (MonitorHomeView)

Cenário: Falha de Autenticação por Credenciais Inválidas
  Dado que o usuário insere uma senha incorreta
  Quando toca no botão "Entrar"
  Então o servidor Paxtu rejeita a requisição com HTTP 401
  E o aplicativo exibe mensagem de alerta informando erro de credenciais
  E mantém o usuário na tela de login
```

---

## Prioridade (MoSCoW)

| Requisito | MoSCoW | Justificativa |
|-----------|--------|---------------|
| Autenticação no Paxtu (`/api/login`) | Must | Ponto de entrada de todos os dados do sistema. |
| Roteamento por Tipo de Associado | Must | Garante isolamento de interface entre jovens e adultos. |
| Persistência Segura de Token | Must | Impede login repetitivo a cada abertura do app. |
| Link "Esqueci minha senha" | Should | Redireciona para o portal web oficial do Paxtu. |

---

## Rastreabilidade de Código

| Arquivo do Legado | Classe / Função | Cobertura |
|-------------------|-----------------|-----------|
| `package:maapa/mAPPa/welcome/auth/presentation/views/login_page.dart` | `LoginPage` | 🟢 |
| `package:maapa/mAPPa/welcome/auth/presentation/controllers/login_controller.dart` | `LoginController`, `validateLogin` | 🟢 |
| `package:maapa/mAPPa/welcome/auth/domain/usecases/login_case.dart` | `LoginCase.call` | 🟢 |
| `package:maapa/mAPPa/welcome/auth/domain/params/login_params.dart` | `LoginParams` | 🟢 |
