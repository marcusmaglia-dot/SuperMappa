# Investigação Técnica — Validação em Lote por Atividade

> Identificador: `001-validacao-lote-atividade`  
> Data: `2026-10-28`  
> Escala de Confiança: 🟢 CONFIRMADO

---

## 1. Problema de Fundo no Legado

No fluxo padrão do aplicativo mAPPa:
- O jovem assinala itens em seu aparelho.
- O escotista abre a tela `RevisaoView` e avalia cada submissão de forma 100% individual e serial.
- Em atividades práticas de final de semana (ex.: reunião de pioneiria ou acampamento de tropa), todos os 25 membros da seção realizam os mesmos nós e amarras simultaneamente.
- Fazer a homologação individual no app exige que o escotista abra 25 perfis diferentes e execute de 50 a 100 toques na tela, gerando fadiga e atraso no registro oficial.

---

## 2. Alternativas Técnicas Avaliadas

### Alternativa 1: Endpoint de Lote no Backend Paxtu
- **Descrição:** Requisitar ao backend dos Escoteiros do Brasil uma rota como `POST /api/lote/validar`.
- **Veredito:** **Descartada.** O backend Paxtu é um sistema legado mantido pela equipe de TI da UEB; não temos permissão para alterar o código do servidor em produção.

### Alternativa 2: Orquestrador de Lote Client-Side com Persistência Local (Escolhida)
- **Descrição:** O app móvel mantém a entidade `Atividade` e a lista de presença localmente. Quando o escotista toca em "Validar em Lote", o app despacha chamadas atômicas assíncronas utilizando a mesma API já validada pelo Paxtu (`/api/marcar-item-revisao`).
- **Veredito:** **Aprovada.** Respeita a governança, não exige backend novo e funciona perfeitamente offline com fila de sincronização.
