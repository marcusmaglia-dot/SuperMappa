# Especialidades (especialidades) — Requisitos

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído diretamente do código e regras de negócio)

---

## Visão Geral
O módulo `especialidades` gerencia o catálogo oficial de especialidades dos Escoteiros do Brasil, divididas em 5 áreas de conhecimento (Ciência e Tecnologia, Cultura, Desportos, Habilidades Escoteiras, Serviços), a avaliação e o cumprimento progressivo de itens para a conquista dos Níveis 1, 2 e 3.

---

## Responsabilidades
- Listar especialidades por área e pesquisar especialidades por nome/termo.
- Apresentar a relação completa de itens/requisitos de cada especialidade.
- Permitir que o jovem assinale itens cumpridos e submeta para homologação do escotista.
- Calcular dinamicamente o nível atingido com base no percentual de itens concluídos.

---

## Regras de Negócio
- **RN-ESP-01:** As especialidades são distribuídas estritamente em 5 ramos de conhecimento: Ciência e Tecnologia, Cultura, Desportos, Habilidades Escoteiras e Serviços. 🟢
- **RN-ESP-02 (Cálculo de Níveis):**
  - **Nível 1:** Conquistado ao cumprir no mínimo $\frac{1}{3}$ dos itens da especialidade. 🟢
  - **Nível 2:** Conquistado ao cumprir no mínimo $\frac{2}{3}$ dos itens da especialidade. 🟢
  - **Nível 3:** Conquistado ao cumprir $100\%$ dos itens da especialidade. 🟢
- **RN-ESP-03:** Cada nível só é homologado formalmente no Paxtu após aprovação do escotista responsável no painel de revisão. 🟢

---

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| **RF-ESP-01** | Catálogo e Filtro por Área | Must | Exibição das 5 áreas com contagem de especialidades e busca textual (`EspecialidadesHomeView`). |
| **RF-ESP-02** | Detalhe da Especialidade e Requisitos | Must | Lista numerada de itens com checkboxes de conclusão (`EspecialidadesItensView`). |
| **RF-ESP-03** | Submissão de Itens e Especialidade | Must | Chamada a `POST /api/salvar-especialidade` com atualização do status de revisão. |

---

## Critérios de Aceitação

```gherkin
Cenário: Jovem atinge Nível 2 de Especialidade
  Dado que a especialidade possui 9 itens no total
  Quando o jovem conclui e submete 6 itens (2/3)
  E o escotista homologa a submissão
  Então o sistema atualiza o status da especialidade para "Nível 2 Conquistado"
```
