# Especialidades (especialidades) — Design Técnico

> **Gerado pelo Redator (Reversa)**  
> **Data:** 2026-10-28  
> **Escala de Confiança:** 🟢 CONFIRMADO (extraído do binário AOT e views)

---

## Contratos de API REST

| Método | Caminho | Entrada | Saída | Status Codes |
|--------|---------|---------|-------|--------------|
| `GET` | `/api/especialidades` | Headers de Sessão | Catálogo geral com áreas e nomes | 200, 401 |
| `GET` | `/api/eixo/especialidades` | `idEixo: int` | Especialidades filtradas por área | 200, 401 |
| `GET` | `/api/eixo/especialidades/itens/associado` | `idAssociado: int, idEspecialidade: int` | Lista de requisitos com status de cumprimento | 200, 401 |
| `POST` | `/api/salvar-especialidade` | `{"idAssociado": int, "idEspecialidade": int, "idItem": int}` | Confirmação de submissão do item de especialidade | 200, 400 |

---

## Estrutura de Classes e Componentes

| Classe | Camada | Papel |
|--------|--------|-------|
| `EspecialidadesHomeView` | Apresentação | Grid das 5 áreas temáticas com ícones vetoriais |
| `EspecialidadesItensView` | Apresentação | Detalhamento dos itens da especialidade selecionada |
| `GetPostEspecialidadesEixoCase` | Domínio | Caso de uso que busca especialidades de uma área |
| `GetPostEspecialidadesEixoItensCase` | Domínio | Caso de uso que busca requisitos e progresso do jovem |
| `PostAcaoEspecialidadeCase` | Domínio | Envia a marcação de item para o backend |
| `EspecialidadeModel` | Dados | Mapeamento JSON de especialidade e nível |

---

## Algoritmo de Cálculo de Nível

$$\text{totalItens} = \text{itens.length}$$
$$\text{itensCumpridos} = \text{itens.where((i) => i.concluido).length}$$
$$\text{nivel} = \begin{cases} 3 & \text{se } \text{itensCumpridos} = \text{totalItens} \\ 2 & \text{se } \text{itensCumpridos} \ge \lceil \frac{2}{3} \times \text{totalItens} \rceil \\ 1 & \text{se } \text{itensCumpridos} \ge \lceil \frac{1}{3} \times \text{totalItens} \rceil \\ 0 & \text{caso contrário} \end{cases}$$
