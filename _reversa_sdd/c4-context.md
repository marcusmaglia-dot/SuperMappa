# Diagrama C4 — Nível 1: Contexto do Sistema

> **Gerado pelo Arquiteto (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (integrações extraídas diretamente de `env.json` e `libapp.so`)

---

## 1. Visão Geral de Contexto

O diagrama abaixo ilustra o aplicativo **mAPPa** no centro do ecossistema escoteiro, seus usuários (Jovens, Escotistas, Assessores e Dirigentes) e as integrações com os sistemas da **União dos Escoteiros do Brasil (UEB)** e serviços em nuvem:

```mermaid
C4Context
    title Diagrama de Contexto de Sistema (C4 - Nível 1) — mAPPa

    Person(jovem, "Jovem / Beneficiário", "Lobinho, Escoteiro, Sênior ou Pioneiro. Acompanha sua progressão e conquistas.")
    Person(escotista, "Escotista / Chefe de Seção", "Acompanha os jovens, homologa itens de progressão e orienta atividades.")
    Person(assessor, "Assessor Pessoal (APF)", "Orienta o Plano Pessoal de Formação (APF) de adultos voluntários.")

    System(mappa, "mAPPa (Mobile App)", "Aplicativo Flutter para acompanhamento pedagógico escoteiro e gestão do plano de formação.")

    System_Ext(paxtu, "Sistema Paxtu 100", "Backend central e banco de dados oficial dos Escoteiros do Brasil (paxtu100.escoteiros.org.br).")
    System_Ext(paxtu_new, "Novo Backend Paxtu (Codebit)", "Camada de APIs modernas e serviços de dados (paxtu100-ueb.codebit.biz).")
    System_Ext(aws_s3, "AWS S3 (Mídia UEB)", "Repositório de mídia para imagens de especialidades e insígnias.")

    Rel(jovem, mappa, "Consulta progressão, marca itens realizados e especialidades", "HTTPS")
    Rel(escotista, mappa, "Acompanha seção, avalia e homologa revisões", "HTTPS")
    Rel(assessor, mappa, "Avalia APF e competências do adulto", "HTTPS")

    Rel(mappa, paxtu, "Autenticação, dados cadastrais e registro oficial de progressão", "HTTPS / JSON REST")
    Rel(mappa, paxtu_new, "Consultas e sincronizações de serviços", "HTTPS / JSON REST")
    Rel(mappa, aws_s3, "Download de imagens, distintivos e logos em cache", "HTTPS")
```

---

## 2. Descrição das Fronteiras e Protocolos

- **Clientes Mobile (iOS/Android):** Aplicativo compilado em Flutter com armazenamento SQLite local offline-first.
- **Protocolo de Comunicação:** Todas as comunicações utilizam HTTPS seguro com headers de autorização e cookies de sessão gerenciados via `CookieJar`.
- **Servidores Oficiais:**
  - `https://paxtu100.escoteiros.org.br`: Provedor de identidade e repositório mestre de dados de associados.
  - `https://paxtu100-ueb.codebit.biz`: Provedor de serviços e endpoints auxiliares.
  - `https://paxtu100.s3.us-east-1.amazonaws.com`: CDN de mídia estática.
