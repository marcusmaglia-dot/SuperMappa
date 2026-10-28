# Pontos de Atenção para Regressão (Regression Watch)

> Feature: `001-validacao-lote-atividade`  
> Data: `2026-10-28`

---

## 1. Regras Críticas para Monitoramento

1. **Jovens Ausentes e Justificados:**
   - Sob nenhuma hipótese um jovem marcado como `Ausente` ou `Justificado` deve ter seus itens validados.
   - O teste unitário `test/batch_validation_test.dart` garante que apenas jovens com status `presente` são selecionados na iteração do lote.

2. **Idempotência de Validação:**
   - Se um jovem já tiver conquistado um item anteriormente, o `BatchValidationOrchestrator` deve detectar a chave composta `(idAssociado, tipoItem, idItem)` e registrar `jaHomologado: true`, impedindo duplicidade ou reenvio desnecessário ao Paxtu.

3. **Imutabilidade pós-Conclusão:**
   - Uma vez que a atividade receba status `concluida`, a interface bloqueia remoção ou inclusão de itens e alteração de presença, assegurando rastreabilidade da chamada no momento em que ocorreu a sessão.

4. **Resiliência da Fila Offline:**
   - Itens que falharem durante o envio ao Paxtu (queda de conexão no campo) devem permanecer com status `pendente` no SQLite local, permitindo reenvio sob demanda pelo `SyncPendingWidget`.
