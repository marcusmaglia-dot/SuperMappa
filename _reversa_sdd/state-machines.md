# Máquinas de Estado — mAPPa

> **Gerado pelo Detetive (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído do fluxo de use cases e widgets de revisão)

---

## 1. Ciclo de Vida do Item de Progressão / Competência

O item de progressão passa por estados que refletem o diálogo educativo entre o jovem e o escotista:

```mermaid
stateDiagram-v2
    [*] --> NaoIniciado: Registro no Ciclo
    NaoIniciado --> EmAndamento: Jovem inicia prática
    EmAndamento --> PendenteRevisao: Jovem submete via app (post_salvar_item)
    
    state RevisaoEscotista <<choice>>
    PendenteRevisao --> RevisaoEscotista: Escotista avalia no painel
    
    RevisaoEscotista --> Aprovado: postMarcarRevisao(status: "aprovado")
    RevisaoEscotista --> Devolvido: postMarcarRevisao(status: "devolvido", comentario)
    RevisaoEscotista --> PendentePratico: postMarcarRevisao(status: "demonstrar_presencial")
    
    Devolvido --> EmAndamento: Jovem aprimora e estuda
    PendentePratico --> Aprovado: Demonstração em campo concluída
    Aprovado --> Conquistado: Sincronização Paxtu
    Conquistado --> [*]
```

### Transições e Gatilhos:
- **`NaoIniciado` $\to$ `EmAndamento`:** O jovem seleciona a competência no ciclo vigente.
- **`EmAndamento` $\to$ `PendenteRevisao`:** O jovem marca o item como realizado no app (`MinhaProgressaoItensView`).
- **`PendenteRevisao` $\to$ `Aprovado`:** O escotista clica em aprovar no widget de revisão (`RevisaoItemWidget`). O item é computado para a conquista do bloco/distintivo.
- **`PendenteRevisao` $\to$ `Devolvido`:** O escotista envia mensagem explicando o que falta para completar a atividade.

---

## 2. Ciclo de Vida da Especialidade Escoteira

```mermaid
stateDiagram-v2
    [*] --> Nivel0: Selecionada pelo Jovem
    Nivel0 --> Nivel1_Pendente: Submete >= 1/3 dos itens
    Nivel1_Pendente --> Nivel1_Conquistado: Escotista aprova Nível 1
    
    Nivel1_Conquistado --> Nivel2_Pendente: Submete >= 2/3 dos itens
    Nivel2_Pendente --> Nivel2_Conquistado: Escotista aprova Nível 2
    
    Nivel2_Conquistado --> Nivel3_Pendente: Submete todos os itens
    Nivel3_Pendente --> Nivel3_Conquistado: Escotista aprova Nível 3
    
    Nivel3_Conquistado --> [*]
```

---

## 3. Ciclo de Desenvolvimento Semestral (Jovem)

```mermaid
stateDiagram-v2
    [*] --> Planejamento: Início do semestre / criar ciclo
    Planejamento --> Ativo: Pactuação de atividades e eixos
    Ativo --> Avaliacao: Fim do período de atividades
    Avaliacao --> Encerrado: Balanço com a patrulha e escotistas
    Encerrado --> [*]
```
