# Impacto no Sistema Legado: Validação em Lote por Atividade

> Feature: `001-validacao-lote-atividade`  
> Data: `2026-10-28`  
> Referência SDD: `_reversa_sdd/modules/atividades/` e `_reversa_sdd/modules/jovem-progressao/`

---

## 1. Visão Geral

A funcionalidade evoluída adiciona capacidade operacional em lote e funcionamento offline nativo, sem alterar a semântica dos endpoints existentes do Paxtu ou comprometer a integridade dos dados históricos do mAPPa.

## 2. Superfície de Contato com o Legado

| Componente Legado | Tipo de Contato | Risco | Mitigação Adotada |
|-------------------|-----------------|-------|-------------------|
| Banco SQLite local | Aditivo (tabelas novas) | 🟢 Nulo | Uso de prefixos próprios (`atividades_chamada`, `presencas_atividade`, `itens_atividade`, `fila_sincronizacao_paxtu`) sem modificar tabelas nativas de cache do app. |
| Endpoint `/api/marcar-item-revisao` | Reuso via cliente HTTP Dio | 🟡 Baixo | Como o Paxtu não possui rota de lote em lote único, o orquestrador do app transmite individualmente de forma idempotente e assíncrona, respeitando rate limits. |
| Módulo de Jovens (`/api/secao/jovens`) | Somente Leitura | 🟢 Nulo | Dados de jovens e patrulhas são consultados e mantidos em cache offline seguro local. |
| Catálogo de Progressão e Especialidades | Somente Leitura Local | 🟢 Nulo | Populado a partir do seeder local baseado na matriz oficial dos Escoteiros do Brasil (Ramos Lobinho, Escoteiro, Sênior e Pioneiro). |

## 3. Segurança e Privacidade (LGPD)

- **Dados Sensíveis:** Nenhuma senha ou token de associado é gravado em arquivos de log ou texto plano.
- **Isolamento:** Toda a operação ocorre no dispositivo do escotista (`localhost` / SQLite sandbox do aplicativo móvel).
- **Offline First:** O aplicativo não tenta enviar dados quando a rede estiver indisponível, evitando erros 500 ou repetições que sobrecarreguem o Paxtu.
