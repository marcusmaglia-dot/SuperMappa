# Análise Técnica de Código — mAPPa (Escoteiros do Brasil)

> **Gerado pelo Archaeologist (Reversa)**  
> **Data:** 2026-10-28  
> **Nível de Documentação:** Essencial  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído diretamente do binário compilado AOT `libapp.so`, assets e bytecode Android)

---

## 1. Visão Geral da Arquitetura de Software

O código-fonte do mAPPa (`package:maapa`) adota os princípios de **Clean Architecture** combinados com o ecossistema **GetX** para injeção de dependência e gerenciamento de estado reativo, além do pacote **Dio** para a camada de infraestrutura de rede HTTP.

O projeto apresenta duas camadas históricas de evolução bem visíveis na estrutura:
1. `package:maapa/mAPPa/`: Núcleo original (v1), concentrando componentes fundamentais de autenticação, sessões e fluxos legados de login.
2. `package:maapa/newmAPPa/`: Reformulação modular (v2), com divisão rigorosa em camadas:
   - **`domain/` & `usecases/`:** Casos de uso desacoplados (ex.: `get_blocos_case.dart`, `get_especialidades_marcadas_case.dart`, `post_ppf_case.dart`).
   - **`data/` & `models/`:** Modelos de serialização JSON e mappers para a API REST do Paxtu.
   - **`presentation/views/` & `presentation/widgets/`:** Telas e componentes visuais desacoplados por papel do usuário (Jovem vs. Adulto/Escotista).

---

## 2. Análise Modular Aprofundada

### 2.1. Módulo `auth` (Autenticação e Sessão)
- **Caminho:** `package:maapa/mAPPa/welcome/auth/`
- **Responsabilidade:** Autenticar o usuário contra o backend oficial Paxtu, capturar a sessão e rotear o usuário conforme seu perfil institucional.
- **Classes Principais:**
  - `LoginPage`: Tela de login com campos de Registro UEB e Senha.
  - `LoginController`: Gerencia o estado da autenticação, loading, feedback de erro e redirecionamento.
  - `LoginCase`: Caso de uso que executa a chamada ao endpoint `/api/login` via Dio.
  - `LoginParams`: DTO que empacota `user` (número de registro UEB) e `pass` (senha).
- **Fluxo de Controle:**
  1. O usuário digita o número de registro e a senha.
  2. `LoginController.validateLogin()` valida que os campos não estão vazios.
  3. `LoginCase.call(LoginParams)` executa requisição HTTP `POST /api/login`.
  4. O servidor do Paxtu valida as credenciais e retorna o token de sessão e os dados do usuário (`idAssociado`, `tipoAssociado`).
  5. Se `tipoAssociado == "jovem"`, o app navega para `WelcomeHomeView` / `YoungHomePage`.
  6. Se `tipoAssociado == "adulto"` ou escotista, o app navega para `MonitorHomeView` ou `AdultHomeView`.

### 2.2. Módulo `associado` (Perfil e Dados Institucionais)
- **Caminho:** `package:maapa/newmAPPa/presentation/views/new_profile_view.dart`
- **Responsabilidade:** Exibir dados cadastrais do associado, Unidade Escoteira Local (UEL), Seção, Numeral do Grupo e foto.
- **Endpoints:** `GET /api/perfil`, `POST /api/perfil-foto`, `GET /api/associado-home`.
- **Regras:**
  - A maior parte dos dados cadastrais é somente-leitura no app (alterações oficiais são restritas à secretaria do Grupo no Paxtu Web).
  - O app permite ao usuário atualizar a foto de perfil (`/api/perfil-foto`) utilizando a câmera ou galeria do celular.

### 2.3. Módulo `jovem-progressao` (Progressão Escoteira dos Ramos)
- **Caminho:** `package:maapa/newmAPPa/presentation/views/minha_progressao_view.dart`
- **Responsabilidade:** Acompanhamento do desenvolvimento pessoal do jovem nos 4 ramos:
  - **Ramo Lobinho** (6,5 a 10 anos): Pistas, Caminho da Jângal, Cruzeiro do Sul.
  - **Ramo Escoteiro** (11 a 14 anos): Pista, Trilha, Rumo, Travessia, Lis de Ouro.
  - **Ramo Sênior** (15 a 17 anos): Escalada, Conquista, Azimute, Escoteiro da Pátria.
  - **Ramo Pioneiro** (18 a 20 anos): Integração, Cidadania, Insígnia de B-P.
- **Estrutura Pedagógica (Eixos de Desenvolvimento):**
  - **Conhecer:** Desenvolvimento intelectual e conhecimento técnico.
  - **Fazer:** Habilidades práticas, nós, acampamento, pioneirias.
  - **Conviver:** Relações sociais, vida em patrulha, trabalho em equipe.
  - **Ser:** Desenvolvimento espiritual, valores e caráter.
- **Classes e Casos de Uso:**
  - `MinhaProgressaoView`, `MinhaProgressaoItensView`, `ProgressaoEixoView`.
  - `GetBlocosAssociadoCase`: Busca os blocos de progressão do jovem ativo.
  - `GetCiclosCase` e `PostCriarCicloCase`: Gerenciam ciclos de desenvolvimento.
  - `GetCompetenciasCase`: Lista competências e seus itens específicos.

### 2.4. Módulo `especialidades` (Áreas de Conhecimento e Níveis)
- **Caminho:** `package:maapa/newmAPPa/presentation/views/especialidades_view.dart`
- **Responsabilidade:** Gestão do catálogo oficial de especialidades dos Escoteiros do Brasil.
- **5 Áreas de Conhecimento:**
  1. **Ciência e Tecnologia**
  2. **Cultura**
  3. **Desportos**
  4. **Habilidades Escoteiras**
  5. **Serviços**
- **Regras de Nível:**
  - Cada especialidade possui uma lista de requisitos práticos/teóricos.
  - **Nível 1:** Cumprimento de 1/3 dos requisitos estipulados.
  - **Nível 2:** Cumprimento de 2/3 dos requisitos.
  - **Nível 3:** Cumprimento de todos os requisitos.
- **Endpoints:** `GET /api/especialidades`, `GET /api/eixo/especialidades/itens/associado`, `POST /api/salvar-especialidade`.

### 2.5. Módulo `insignias` (Insígnias de Interesse Especial)
- **Caminho:** `package:maapa/newmAPPa/presentation/views/insignias_home_view.dart`
- **Responsabilidade:** Submissão e conferência de requisitos para distintivos especiais.
- **Insígnias Mapeadas no Binário:**
  - **Insígnia do Aprender** (específica para cada ramo: Lobinho, Escoteiro, Sênior, Pioneiro, Escotista).
  - **Insígnia Cone Sul** (integração entre os países do Cone Sul).
  - **Insígnia da Lusofonia** (países de língua portuguesa).
  - **Campeões da Natureza** (preservação ambiental / Earth Tribe).
  - **Insígnias Máximas:** Cruzeiro do Sul, Lis de Ouro, Escoteiro da Pátria, B-P.
- **Endpoints:** `GET /api/insignias`, `GET /api/insignia/itens`, `POST /api/salvar-insignia`.

### 2.6. Módulo `adulto-apf` (Plano Pessoal de Formação)
- **Caminho:** `package:maapa/newmAPPa/presentation/views/plano_pessoal_formacao_view.dart`
- **Responsabilidade:** Gestão do ciclo de formação contínua dos adultos voluntários.
- **Conceitos:**
  - **Linhas de Formação:** Linha Escotista (atuação direta com os jovens na seção) e Linha Dirigente (gestão do grupo/UEL).
  - **Níveis Formativos:** Nível Preliminar, Nível Básico e Nível Avançado (Insígnia de Madeira).
  - **Ciclo de Competências:** Autoavaliação de competências de liderança, método escoteiro, segurança em atividades e acompanhamento com o assessor pessoal de formação (APF).
- **Endpoints:** `GET /api/adulto-progressao/`, `POST /api/salvar-linha-formacao`, `POST /api/salvar-plano-pessoal`.

### 2.7. Módulo `monitor-escotista` (Gestão de Seção e Revisão)
- **Caminho:** `package:maapa/newmAPPa/presentation/views/monitor_home_view.dart`
- **Responsabilidade:** O ambiente do escotista responsável por acompanhar a sua seção/patrulha.
- **Funcionalidades:**
  - Visualização de todos os jovens da seção (`MonitorJovensView`).
  - Marcação de jovens favoritos (`/api/favoritar-associado`) para acesso rápido.
  - **Fila de Revisão (`RevisaoView` / `NewRevisaoView`):** Lista todos os itens de progressão, especialidades e insígnias que os jovens marcaram no app e que aguardam homologação do escotista.
  - Ações do Escotista: **Aprovar**, **Devolver com comentário pedagógico** ou **Marcar para demonstração presencial** no próximo encontro/acampamento.
- **Endpoints:** `GET /api/secoes`, `GET /api/itens-revisao`, `POST /api/marcar-item-revisao`.

### 2.8. Módulo `atividades` (Atividades Fixas e Variáveis)
- **Caminho:** `package:maapa/newmAPPa/presentation/views/atividades_fixas_view.dart`
- **Responsabilidade:** Gerenciar a programação de atividades dos ciclos de desenvolvimento.
- **Tipos de Atividades:**
  - **Atividades Fixas:** Atividades institucionais pré-definidas no programa educativo.
  - **Atividades Variáveis:** Projetos e desafios propostos pelo próprio jovem ou sua patrulha/equipe para um ciclo específico.
- **Endpoints:** `GET /api/acoes/associado`, `POST /api/salvar-acoes`, `POST /api/adicionar-variavel`.

### 2.9. Módulo `comunicacao` (Mensagens e Notificações)
- **Caminho:** `package:maapa/newmAPPa/presentation/views/notificacao_view.dart`
- **Responsabilidade:** Canal direto de mensageria contextualizada entre o escotista e o jovem/família.
- **Endpoints:** `POST /api/conversar`, `POST /api/conversar-adulto`, `GET /api/mensagem-associado`, `GET /api/historico`.

---

## 3. Dicionário de Dados Resumido

Tabela consolidada das principais entidades identificadas no código Dart compilado:

| Entidade | Campos Principais | Tipos | Descrição de Negócio |
|----------|-------------------|-------|----------------------|
| **`LoginParams`** | `user`, `pass` | `String`, `String` | Credenciais enviadas no login (Registro UEB e Senha) |
| **`AuthSession`** | `token`, `idAssociado`, `tipoAssociado` | `String`, `int`, `String` | Sessão autenticada retornada pelo Paxtu |
| **`AssociateInfo`** | `idAssociado`, `nomeCompleto`, `registroUeb`, `ramoAtual`, `grupoEscoteiro`, `secao`, `fotoUrl` | `int`, `String`, `String`, `String`, `String`, `String`, `String` | Dados cadastrais do membro |
| **`BlocoProgressao`** | `idBloco`, `nomeBloco`, `ordem`, `concluido` | `int`, `String`, `int`, `bool` | Etapa formativa dentro do ramo do jovem |
| **`Competencia`** | `idCompetencia`, `eixo`, `descricao`, `itens` | `int`, `String`, `String`, `List<Item>` | Competência educativa associada a um dos 4 eixos |
| **`ItemCompetencia`** | `idItem`, `titulo`, `descricao`, `status` | `int`, `String`, `String`, `String` | Requisito específico que o jovem cumpre e submete |
| **`Especialidade`** | `idEspecialidade`, `nome`, `ramoConhecimento`, `nivelConquistado`, `itens` | `int`, `String`, `String`, `int`, `List<Item>` | Especialidade e seus 3 níveis possíveis |
| **`Insignia`** | `idInsignia`, `nome`, `descricao`, `ramo`, `iconeUrl`, `concluida` | `int`, `String`, `String`, `String`, `String`, `bool` | Insígnia de Interesse Especial |
| **`PlanoPessoalFormacao`**| `idPlano`, `idAdulto`, `linhaFormacao`, `ramoAtuacao`, `competencias` | `int`, `int`, `String`, `String`, `List` | APF do escotista ou dirigente |
| **`ItemRevisao`** | `idItemRevisao`, `idAssociado`, `nomeJovem`, `itemDescricao`, `tipo`, `dataSubmissao` | `int`, `int`, `String`, `String`, `String`, `String` | Item na fila de revisão do escotista |
| **`Atividade`** | `idAtividade`, `titulo`, `tipo`, `realizada` | `int`, `String`, `String`, `bool` | Atividade de ciclo (fixa ou variável) |
| **`Mensagem`** | `idMensagem`, `remetente`, `texto`, `dataEnvio` | `int`, `String`, `String`, `String` | Notificação ou feedback entre escotista e jovem |

---

## 4. Algoritmos e Regras de Negócio Críticas

1. **Cálculo de Nível de Especialidade:**
   $$\text{Nível 1} \iff \frac{\text{requisitos cumpridos}}{\text{total de requisitos}} \ge \frac{1}{3}$$
   $$\text{Nível 2} \iff \frac{\text{requisitos cumpridos}}{\text{total de requisitos}} \ge \frac{2}{3}$$
   $$\text{Nível 3} \iff \text{requisitos cumpridos} = \text{total de requisitos}$$

2. **Máquina de Estado de Itens de Progressão:**
   ```mermaid
   stateDiagram-v2
       [*] --> NaoIniciado: Início de Ciclo
       NaoIniciado --> EmAndamento: Jovem inicia atividade
       EmAndamento --> PendenteRevisao: Jovem submete no app
       PendenteRevisao --> Conquistado: Escotista aprova
       PendenteRevisao --> EmAndamento: Escotista devolve com feedback
       Conquistado --> [*]
   ```

3. **Validação de Permissão do Escotista:**
   O escotista autenticado só recebe na lista de revisão (`/api/itens-revisao`) os itens correspondentes a jovens que pertencem à sua seção e grupo escoteiro homologados na base do Paxtu.
