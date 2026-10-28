# Perfil e Dados do Associado (associado) — Requisitos

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído diretamente do código)

---

## Visão Geral
O módulo `associado` é responsável pela consulta dos dados cadastrais do membro, vínculo com a Unidade Escoteira Local (UEL / Grupo Escoteiro), exibição da carteira/identificação institucional e envio de foto de perfil.

---

## Responsabilidades
- Consultar dados cadastrais consolidados via `/api/perfil` e `/api/associado-home`.
- Exibir dados do membro: Nome completo, Registro UEB, Grupo Escoteiro, Seção, Ramo Atual e Patrulha/Equipe.
- Permitir upload e atualização da foto de perfil via `/api/perfil-foto`.

---

## Regras de Negócio
- **RN-ASSOC-01:** Os dados mestres de cadastro (nome, data de nascimento, UEL, ramo oficial) são controlados pelo Paxtu e não podem ser alterados pelo app móvel. 🟢
- **RN-ASSOC-02:** A foto de perfil pode ser capturada pela câmera ou galeria do dispositivo e deve ser enviada via multipart para `/api/perfil-foto`. 🟢

---

## Requisitos Funcionais

| ID | Requisito | Prioridade | Critério de Aceite |
|----|-----------|------------|-------------------|
| **RF-ASSOC-01** | Visualização de Perfil | Must | Tela exibindo nome, registro UEB, ramo, grupo e seção. |
| **RF-ASSOC-02** | Consulta de Dados Consolidados da Home | Must | Chamada a `/api/associado-home` para carregar dados do usuário na inicialização. |
| **RF-ASSOC-03** | Upload de Foto de Perfil | Should | Integração com câmera/galeria e envio para `/api/perfil-foto`. |

---

## Critérios de Aceitação

```gherkin
Cenário: Consulta dos Dados do Membro
  Dado que o usuário está autenticado
  Quando acessa a tela de perfil
  Então o sistema exibe seu nome completo, registro UEB, ramo e grupo escoteiro
```
