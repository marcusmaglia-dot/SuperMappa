# Matriz de Permissões e Acesso (RBAC) — mAPPa

> **Gerado pelo Detetive (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído do chaveamento de rotas e perfis)

---

## 1. Perfis de Usuário (Roles)

| Papel | Descrição Institucional | Interface Alvo no App |
|-------|-------------------------|------------------------|
| **Jovem (Beneficiário)** | Membro juvenil de 6,5 a 20 anos pertencente a um dos 4 ramos. | `WelcomeHomeView`, `MinhaProgressaoView` |
| **Escotista (Monitor)** | Adulto voluntário que atua diretamente na liderança de uma seção. | `MonitorHomeView`, `RevisaoView` |
| **Assessor Pessoal (APF)** | Adulto experiente responsável por orientar a formação de outros adultos. | `AssessorPerfilView`, `ApfCicloCompetenciaView` |
| **Dirigente (Gestor UEL)** | Membro da diretoria do Grupo Escoteiro (administrativo/institucional). | `AdultHomeView` |

---

## 2. Matriz de Permissões por Funcionalidade

| Funcionalidade / Recurso | Jovem | Escotista | Assessor APF | Dirigente |
|--------------------------|:-----:|:---------:|:------------:|:---------:|
| Consultar o próprio perfil e progressão | ✅ | ✅ | ✅ | ✅ |
| Atualizar a própria foto de perfil | ✅ | ✅ | ✅ | ✅ |
| Marcar itens de competência como realizados | ✅ | ❌ | ❌ | ❌ |
| Submeter especialidades e insígnias para avaliação | ✅ | ❌ | ❌ | ❌ |
| Visualizar jovens da seção/patrulha | ❌ | ✅ (sua seção) | ❌ | ✅ (todas do Grupo) |
| Homologar/Aprovar itens na fila de revisão | ❌ | ✅ (sua seção) | ❌ | ❌ |
| Devolver itens com comentário pedagógico | ❌ | ✅ (sua seção) | ❌ | ❌ |
| Acessar e editar o próprio APF (Plano Pessoal) | ❌ | ✅ | ✅ | ✅ |
| Avaliar e acompanhar APF de assessorados | ❌ | ❌ | ✅ (seus assessorados) | ❌ |
| Enviar mensagens de orientação no app | ❌ | ✅ | ✅ | ❌ |
| Alterar dados civis oficiais do associado | ❌ | ❌ | ❌ | ❌ (Apenas Paxtu Web) |

---

## 3. Escopo de Isolamento de Dados

1. **Jovem:** Acesso restrito aos seus próprios dados de progressão, especialidades e insígnias.
2. **Escotista:** Isolamento por Seção e Grupo Escoteiro. O backend do Paxtu só devolve jovens das seções nas quais o escotista possui vínculo ativo.
3. **Assessor APF:** Acesso restrito à lista explícita de adultos sob sua assessoria formal (`/api/assessorados`).
