# Insígnias Especiais (insignias) — Requisitos

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído diretamente do código e regras de ramo)

---

## Visão Geral
O módulo `insignias` gerencia o catálogo e os requisitos das **Insígnias de Interesse Especial** (como Insígnia do Aprender, Cone Sul, Lusofonia, Campeões da Natureza) e Distintivos Especiais máximos de cada ramo (Cruzeiro do Sul, Lis de Ouro, Escoteiro da Pátria, Insígnia de B-P).

---

## Responsabilidades
- Listar insígnias aplicáveis ao ramo atual do jovem.
- Apresentar etapas e requisitos para a conquista de cada insígnia especial.
- Permitir submissão de comprovação de requisitos via `/api/salvar-insignia`.
- Exibir distintivos conquistados na galeria de conquistas do perfil.

---

## Regras de Negócio
- **RN-INS-01:** Cada ramo possui seu conjunto específico de insígnias de interesse especial e sua insígnia máxima correspondente. 🟢
- **RN-INS-02:** A concessão formal da insígnia requer aprovação formal da chefia de seção e homologação cadastral no Paxtu. 🟢

---

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| **RF-INS-01** | Catálogo de Insígnias Especiais | Must | Listagem visual de insígnias com ícones e status (`InsigniasHomeView`). |
| **RF-INS-02** | Consulta de Requisitos da Insígnia | Must | Lista detalhada de itens com status de realização (`InsigniasItensView`). |
| **RF-INS-03** | Submissão de Cumprimento de Insígnia | Must | Envio via `POST /api/salvar-insignia`. |

---

## Critérios de Aceitação

```gherkin
Cenário: Jovem consulta requisitos da Insígnia do Aprender
  Dado que o jovem está autenticado no ramo Sênior
  Quando acessa o módulo de insígnias e seleciona "Insígnia do Aprender"
  Então o aplicativo exibe os requisitos específicos da insígnia para o ramo Sênior
  E indica quais itens já foram validados e quais estão pendentes
```
