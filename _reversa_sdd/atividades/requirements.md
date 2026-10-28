# Atividades de Ciclo (atividades) — Requisitos

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído diretamente do código e use cases)

---

## Visão Geral
O módulo `atividades` gerencia a programação prática dos ciclos de desenvolvimento, diferenciando as **Atividades Fixas** (previstas institucionalmente no programa educativo) das **Atividades Variáveis** (desafios, projetos comunitários e acampamentos propostos pelo próprio jovem ou sua patrulha).

---

## Responsabilidades
- Listar atividades fixas recomendadas para o ciclo.
- Permitir a criação e o registro de atividades variáveis acordadas na patrulha.
- Registrar a participação e conclusão de ações práticas via `/api/salvar-acoes` e `/api/adicionar-variavel`.

---

## Regras de Negócio
- **RN-ATIV-01:** As atividades fixas servem como base curricular para as reuniões semanais da seção. 🟢
- **RN-ATIV-02:** Atividades variáveis exigem título, descrição e associação com o ciclo ativo do jovem. 🟢

---

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| **RF-ATIV-01** | Visualização de Atividades Fixas | Must | Lista de atividades institucionais do ciclo (`AtividadesFixasView`). |
| **RF-ATIV-02** | Criação de Atividade Variável | Should | Formulário para adicionar meta ou desafio personalizado (`AtividadesVariaveisView`). |
| **RF-ATIV-03** | Registro de Cumprimento de Ações | Must | Envio via `POST /api/salvar-acoes`. |

---

## Critérios de Aceitação

```gherkin
Cenário: Jovem cadastra uma atividade variável
  Dado que o jovem está em um ciclo de desenvolvimento ativo
  Quando preenche o título "Construir uma mesa de pioneiria para o acampamento"
  E submete a atividade
  Então o sistema persiste via POST /api/adicionar-variavel
  E a atividade passa a constar na lista de metas do jovem
```
