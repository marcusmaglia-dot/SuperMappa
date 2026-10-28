// SuperMappa — Portal 100% Consultivo da Chefia (Espelho de Leitura Paxtu 100)
// Este aplicativo é estritamente consultivo: apenas conecta ao Paxtu e baixa os dados existentes.
// Nenhuma operação de cadastro, alteração ou exclusão é permitida.

// Estado Global da Sessão de Consulta
const consultiveState = {
  autenticado: false,
  chefia: null,
  unidade: null,
  secao: null,
  patrulhas: [],
  jovens: [],
  ultimaSincronizacao: null,
  filtros: {
    busca: '',
    patrulha: 'todas',
    etapa: 'todas'
  },
  jovemFichaAtiva: null
};

// Gerador de dados oficiais baixados do Paxtu de acordo com o Ramo selecionado
function gerarDadosOficiaisPaxtu(ramo, uebChefia) {
  const agora = new Date();
  const timestampFormatado = agora.toLocaleDateString('pt-BR') + ' às ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  if (ramo === 'Escoteiro') {
    return {
      unidade: {
        grupo: "123º Grupo Escoteiro Brownsea",
        numeral: "123º/SP",
        cidade: "São Paulo / SP",
        secaoNome: "Tropa Escoteira Baden-Powell",
        ramo: "Escoteiro"
      },
      chefia: {
        nome: "Ch. Marcus Vinicius Maglia",
        ueb: uebChefia || "1511813",
        funcao: "Chefe de Tropa Escoteira",
        nivel: "Nível Avançado"
      },
      sincronizacao: timestampFormatado,
      patrulhas: ["Lobo", "Águia", "Touro", "Falcão"],
      jovens: [
        {
          id: 1,
          nome: "Lucas Ferreira Silva",
          ueb: "1511813-1",
          idade: 13,
          nascimento: "14/05/2013",
          ingresso: "10/02/2021",
          promessa: "23/04/2021",
          patrulha: "Lobo",
          cargo: "Monitor",
          etapa: "Rumo",
          progressoEtapa: 75,
          emergencia: { pais: "Carlos Silva e Roberta Ferreira", tel: "(11) 98765-4321", tipoSanguineo: "O+" },
          especialidades: [
            { nome: "Pioneirismo", ramo: "Habilidades Escoteiras", nivel: 2, icon: "🪵", data: "18/06/2024" },
            { nome: "Primeiros Socorros", ramo: "Serviços", nivel: 2, icon: "🩹", data: "12/09/2024" },
            { nome: "Fogo de Conselho", ramo: "Cultura", nivel: 1, icon: "🔥", data: "20/11/2023" },
            { nome: "Astronomia", ramo: "Ciência e Tecnologia", nivel: 1, icon: "🔭", data: "05/03/2024" }
          ],
          progressoDetalhado: [
            { eixo: "Conhecer", concluidos: 8, total: 10, itens: ["História de Brownsea", "Lei e Promessa Escoteira", "Organização da UEB"] },
            { eixo: "Fazer", concluidos: 7, total: 10, itens: ["Amarras e Nós de Campo", "Montagem de Barraca Rápida", "Cozinha Mateira"] },
            { eixo: "Conviver", concluidos: 9, total: 10, itens: ["Liderança de Conselho de Patrulha", "Boa Ação Comunitária", "Espírito de Patrulha"] },
            { eixo: "Ser", concluidos: 8, total: 10, itens: ["Autoavaliação de Caráter", "Pontualidade e Fardamento", "Vivência Espiritual"] }
          ],
          atividadesHistorico: [
            { evento: "Acampamento de Tropa das Flores", data: "12/10/2025", local: "Parque Estadual Cantareira", presenca: "Presente" },
            { evento: "Grande Jogo da Cidade", data: "15/08/2025", local: "Centro Histórico", presenca: "Presente" },
            { evento: "Jornada de Patrulha Lobo", data: "22/05/2025", local: "Trilha da Serra", presenca: "Presente" }
          ]
        },
        {
          id: 2,
          nome: "Beatriz Oliveira Santos",
          ueb: "1511813-2",
          idade: 12,
          nascimento: "20/09/2013",
          ingresso: "05/03/2022",
          promessa: "18/06/2022",
          patrulha: "Lobo",
          cargo: "Submonitora",
          etapa: "Trilha",
          progressoEtapa: 85,
          emergencia: { pais: "Renato Santos e Juliana Oliveira", tel: "(11) 97654-3210", tipoSanguineo: "A+" },
          especialidades: [
            { nome: "Orientação e Navegação", ramo: "Desportos", nivel: 2, icon: "🧭", data: "14/04/2024" },
            { nome: "Primeiros Socorros", ramo: "Serviços", nivel: 1, icon: "🩹", data: "10/11/2023" },
            { nome: "Ecologia", ramo: "Ciência e Tecnologia", nivel: 2, icon: "🌱", data: "05/08/2024" }
          ],
          progressoDetalhado: [
            { eixo: "Conhecer", concluidos: 7, total: 8, itens: ["Símbolos Nacionais e Escoteiros", "Código Morse Básico"] },
            { eixo: "Fazer", concluidos: 6, total: 8, itens: ["Rastreamento e Pistas", "Uso Seguro de Ferramentas"] },
            { eixo: "Conviver", concluidos: 8, total: 8, itens: ["Integração de Novos Membros", "Participação em Atividades"] },
            { eixo: "Ser", concluidos: 6, total: 8, itens: ["Cumprimento da Promessa", "Higiene Pessoal e de Campo"] }
          ],
          atividadesHistorico: [
            { evento: "Acampamento de Tropa das Flores", data: "12/10/2025", local: "Parque Estadual Cantareira", presenca: "Presente" },
            { evento: "Grande Jogo da Cidade", data: "15/08/2025", local: "Centro Histórico", presenca: "Presente" }
          ]
        },
        {
          id: 3,
          nome: "Guilherme Henrique Rocha",
          ueb: "1511813-3",
          idade: 11,
          nascimento: "11/01/2015",
          ingresso: "14/02/2024",
          promessa: "23/04/2024",
          patrulha: "Lobo",
          cargo: "Intendente",
          etapa: "Pista",
          progressoEtapa: 60,
          emergencia: { pais: "Marcos Rocha e Adriana Lima", tel: "(11) 96543-2109", tipoSanguineo: "B+" },
          especialidades: [
            { nome: "Culinária Mateira", ramo: "Habilidades Escoteiras", nivel: 1, icon: "🍳", data: "12/08/2024" }
          ],
          progressoDetalhado: [
            { eixo: "Conhecer", concluidos: 4, total: 6, itens: ["Lei Escoteira", "Saudação e Lema"] },
            { eixo: "Fazer", concluidos: 4, total: 6, itens: ["Nó Direito e Nó de Escota"] },
            { eixo: "Conviver", concluidos: 3, total: 6, itens: ["Vida em Patrulha"] },
            { eixo: "Ser", concluidos: 4, total: 6, itens: ["Apresentação do Vestuário"] }
          ],
          atividadesHistorico: [
            { evento: "Acampamento de Tropa das Flores", data: "12/10/2025", local: "Parque Estadual Cantareira", presenca: "Presente" }
          ]
        },
        {
          id: 4,
          nome: "Mariana Costa Albuquerque",
          ueb: "1511813-4",
          idade: 14,
          nascimento: "03/04/2012",
          ingresso: "01/03/2020",
          promessa: "12/06/2020",
          patrulha: "Águia",
          cargo: "Monitora",
          etapa: "Travessia",
          progressoEtapa: 90,
          emergencia: { pais: "Fernando Albuquerque e Patricia Costa", tel: "(11) 95432-1098", tipoSanguineo: "AB+" },
          especialidades: [
            { nome: "Pioneirismo", ramo: "Habilidades Escoteiras", nivel: 3, icon: "🪵", data: "10/03/2024" },
            { nome: "Primeiros Socorros", ramo: "Serviços", nivel: 3, icon: "🩹", data: "22/05/2024" },
            { nome: "Orientação e Navegação", ramo: "Desportos", nivel: 2, icon: "🧭", data: "15/10/2023" },
            { nome: "Sobrevivência", ramo: "Habilidades Escoteiras", nivel: 2, icon: "🏕️", data: "08/12/2024" },
            { nome: "Cidadania Global", ramo: "Serviços", nivel: 1, icon: "🌍", data: "19/07/2024" }
          ],
          progressoDetalhado: [
            { eixo: "Conhecer", concluidos: 12, total: 12, itens: ["Plena maturidade de conhecimentos escoteiros", "Planejamento de Viagem"] },
            { eixo: "Fazer", concluidos: 11, total: 12, itens: ["Construção de Pioneiria de Grande Porte", "Orientação Noturna"] },
            { eixo: "Conviver", concluidos: 12, total: 12, itens: ["Mentoria de Novos Monitores", "Ação Solidária Regional"] },
            { eixo: "Ser", concluidos: 11, total: 12, itens: ["Candidatura ao Cordão do Desafio / Lis de Ouro"] }
          ],
          atividadesHistorico: [
            { evento: "Acampamento de Tropa das Flores", data: "12/10/2025", local: "Parque Estadual Cantareira", presenca: "Presente" },
            { evento: "Jamboree Nacional Escoteiro", data: "15/07/2025", local: "Barretos / SP", presenca: "Presente" },
            { evento: "Grande Jogo da Cidade", data: "15/08/2025", local: "Centro Histórico", presenca: "Presente" }
          ]
        },
        {
          id: 5,
          nome: "Rafael Mendonça Prado",
          ueb: "1511813-5",
          idade: 13,
          nascimento: "19/08/2013",
          ingresso: "10/08/2022",
          promessa: "15/11/2022",
          patrulha: "Águia",
          cargo: "Submonitor",
          etapa: "Rumo",
          progressoEtapa: 70,
          emergencia: { pais: "Danilo Prado e Claudia Mendonça", tel: "(11) 94321-0987", tipoSanguineo: "O-" },
          especialidades: [
            { nome: "Informática", ramo: "Ciência e Tecnologia", nivel: 2, icon: "💻", data: "11/04/2024" },
            { nome: "Fotografia", ramo: "Cultura", nivel: 2, icon: "📷", data: "09/09/2024" }
          ],
          progressoDetalhado: [
            { eixo: "Conhecer", concluidos: 8, total: 10, itens: ["História do Movimento Escoteiro"] },
            { eixo: "Fazer", concluidos: 7, total: 10, itens: ["Relatório de Excursão da Patrulha"] },
            { eixo: "Conviver", concluidos: 7, total: 10, itens: ["Participação no Conselho da Tropa"] },
            { eixo: "Ser", concluidos: 8, total: 10, itens: ["Atitude Positiva e Disciplina Consciente"] }
          ],
          atividadesHistorico: [
            { evento: "Acampamento de Tropa das Flores", data: "12/10/2025", local: "Parque Estadual Cantareira", presenca: "Presente" },
            { evento: "Grande Jogo da Cidade", data: "15/08/2025", local: "Centro Histórico", presenca: "Presente" }
          ]
        },
        {
          id: 6,
          nome: "Enzo Gabriel Martins",
          ueb: "1511813-6",
          idade: 12,
          nascimento: "25/12/2013",
          ingresso: "15/03/2023",
          promessa: "23/04/2023",
          patrulha: "Touro",
          cargo: "Monitor",
          etapa: "Trilha",
          progressoEtapa: 80,
          emergencia: { pais: "Rodrigo Martins e Tatiana Souza", tel: "(11) 93210-9876", tipoSanguineo: "A-" },
          especialidades: [
            { nome: "Pioneirismo", ramo: "Habilidades Escoteiras", nivel: 1, icon: "🪵", data: "14/05/2024" },
            { nome: "Fogo de Conselho", ramo: "Cultura", nivel: 2, icon: "🔥", data: "22/10/2024" }
          ],
          progressoDetalhado: [
            { eixo: "Conhecer", concluidos: 7, total: 8, itens: ["Conhecimento de Sinais de Pista"] },
            { eixo: "Fazer", concluidos: 6, total: 8, itens: ["Fogueira de Caçador e Fogo Refletor"] },
            { eixo: "Conviver", concluidos: 7, total: 8, itens: ["Apoio à Patrulha nos Jogos"] },
            { eixo: "Ser", concluidos: 6, total: 8, itens: ["Pontualidade Escoteira"] }
          ],
          atividadesHistorico: [
            { evento: "Acampamento de Tropa das Flores", data: "12/10/2025", local: "Parque Estadual Cantareira", presenca: "Presente" }
          ]
        },
        {
          id: 7,
          nome: "Camila Nogueira Ramos",
          ueb: "1511813-7",
          idade: 13,
          nascimento: "08/07/2013",
          ingresso: "01/04/2022",
          promessa: "18/06/2022",
          patrulha: "Touro",
          cargo: "Submonitora",
          etapa: "Rumo",
          progressoEtapa: 65,
          emergencia: { pais: "Jorge Ramos e Simone Nogueira", tel: "(11) 92109-8765", tipoSanguineo: "O+" },
          especialidades: [
            { nome: "Primeiros Socorros", ramo: "Serviços", nivel: 2, icon: "🩹", data: "05/06/2024" },
            { nome: "Botânica", ramo: "Ciência e Tecnologia", nivel: 1, icon: "🌿", data: "12/09/2024" }
          ],
          progressoDetalhado: [
            { eixo: "Conhecer", concluidos: 7, total: 10, itens: ["Reconhecimento de Flora e Fauna Local"] },
            { eixo: "Fazer", concluidos: 6, total: 10, itens: ["Construção de Filtro de Água Natural"] },
            { eixo: "Conviver", concluidos: 8, total: 10, itens: ["Organização de Canções da Tropa"] },
            { eixo: "Ser", concluidos: 7, total: 10, itens: ["Responsabilidade com o Meio Ambiente"] }
          ],
          atividadesHistorico: [
            { evento: "Acampamento de Tropa das Flores", data: "12/10/2025", local: "Parque Estadual Cantareira", presenca: "Presente" },
            { evento: "Grande Jogo da Cidade", data: "15/08/2025", local: "Centro Histórico", presenca: "Presente" }
          ]
        },
        {
          id: 8,
          nome: "Thiago Augusto Silveira",
          ueb: "1511813-8",
          idade: 14,
          nascimento: "11/02/2012",
          ingresso: "10/03/2021",
          promessa: "23/04/2021",
          patrulha: "Falcão",
          cargo: "Monitor",
          etapa: "Travessia",
          progressoEtapa: 85,
          emergencia: { pais: "Marcelo Silveira e Renata Augusto", tel: "(11) 91098-7654", tipoSanguineo: "B-" },
          especialidades: [
            { nome: "Orientação e Navegação", ramo: "Desportos", nivel: 3, icon: "🧭", data: "02/05/2024" },
            { nome: "Pioneirismo", ramo: "Habilidades Escoteiras", nivel: 2, icon: "🪵", data: "14/08/2024" },
            { nome: "Radioamadorismo", ramo: "Ciência e Tecnologia", nivel: 1, icon: "📻", data: "19/10/2024" }
          ],
          progressoDetalhado: [
            { eixo: "Conhecer", concluidos: 11, total: 12, itens: ["Topografia e Cartografia Avançada"] },
            { eixo: "Fazer", concluidos: 10, total: 12, itens: ["Liderança de Marcha de 15km"] },
            { eixo: "Conviver", concluidos: 11, total: 12, itens: ["Coordenação do Conselho de Monitores"] },
            { eixo: "Ser", concluidos: 10, total: 12, itens: ["Preparação para Transição ao Ramo Sênior"] }
          ],
          atividadesHistorico: [
            { evento: "Acampamento de Tropa das Flores", data: "12/10/2025", local: "Parque Estadual Cantareira", presenca: "Presente" },
            { evento: "Jamboree Nacional Escoteiro", data: "15/07/2025", local: "Barretos / SP", presenca: "Presente" }
          ]
        }
      ]
    };
  } else if (ramo === 'Lobinho') {
    return {
      unidade: {
        grupo: "123º Grupo Escoteiro Brownsea",
        numeral: "123º/SP",
        cidade: "São Paulo / SP",
        secaoNome: "Alcatéia Seeonee",
        ramo: "Lobinho"
      },
      chefia: {
        nome: "Akela Marcus Maglia",
        ueb: uebChefia || "1511813",
        funcao: "Chefe de Seção do Ramo Lobinho",
        nivel: "Nível Avançado"
      },
      sincronizacao: timestampFormatado,
      patrulhas: ["Matilha Cinzenta", "Matilha Vermelha", "Matilha Preta"],
      jovens: [
        {
          id: 101,
          nome: "Pedro Arthur Cunha",
          ueb: "1511813-10",
          idade: 9,
          nascimento: "08/04/2017",
          ingresso: "01/03/2023",
          promessa: "13/05/2023",
          patrulha: "Matilha Cinzenta",
          cargo: "Primo",
          etapa: "Lobo Saltador",
          progressoEtapa: 80,
          emergencia: { pais: "Guilherme Cunha e Laura Ramos", tel: "(11) 98111-2233", tipoSanguineo: "O+" },
          especialidades: [
            { nome: "Coleções", ramo: "Cultura", nivel: 2, icon: "🪙", data: "10/05/2024" },
            { nome: "Natação", ramo: "Desportos", nivel: 1, icon: "🏊", data: "14/09/2024" }
          ],
          progressoDetalhado: [
            { eixo: "Conhecer", concluidos: 6, total: 8, itens: ["História de Mowgli e Baloo", "Lei do Lobinho"] },
            { eixo: "Fazer", concluidos: 7, total: 8, itens: ["Nó Direito e Volta da Ribeira", "Higiene Bucal e Banho"] },
            { eixo: "Conviver", concluidos: 6, total: 8, itens: ["Amizade na Matilha", "Ouvir os Velhos Lobos"] },
            { eixo: "Ser", concluidos: 7, total: 8, itens: ["Melhor Possível Diário"] }
          ],
          atividadesHistorico: [
            { evento: "Acantonamento da Selva", data: "18/10/2025", local: "Sede do Grupo", presenca: "Presente" }
          ]
        },
        {
          id: 102,
          nome: "Sofia Helena Ribeiro",
          ueb: "1511813-11",
          idade: 10,
          nascimento: "12/01/2016",
          ingresso: "10/02/2022",
          promessa: "23/04/2022",
          patrulha: "Matilha Vermelha",
          cargo: "Prima",
          etapa: "Lobo Rastreador",
          progressoEtapa: 90,
          emergencia: { pais: "Andre Ribeiro e Cristina Castro", tel: "(11) 98222-3344", tipoSanguineo: "A+" },
          especialidades: [
            { nome: "Jardinagem", ramo: "Ciência e Tecnologia", nivel: 2, icon: "🌻", data: "15/06/2024" },
            { nome: "Artesanato", ramo: "Cultura", nivel: 2, icon: "🎨", data: "22/10/2024" },
            { nome: "Culinária Básica", ramo: "Habilidades Escoteiras", nivel: 1, icon: "🧁", data: "05/03/2024" }
          ],
          progressoDetalhado: [
            { eixo: "Conhecer", concluidos: 8, total: 8, itens: ["Danças da Selva de Mowgli"] },
            { eixo: "Fazer", concluidos: 7, total: 8, itens: ["Organização da Mochila do Lobinho"] },
            { eixo: "Conviver", concluidos: 8, total: 8, itens: ["Ajudar os Lobinhos Mais Novos"] },
            { eixo: "Ser", concluidos: 8, total: 8, itens: ["Candidatura ao Cruzeiro do Sul"] }
          ],
          atividadesHistorico: [
            { evento: "Acantonamento da Selva", data: "18/10/2025", local: "Sede do Grupo", presenca: "Presente" },
            { evento: "Rally Regional de Lobinhos", data: "20/06/2025", local: "Parque Villa-Lobos", presenca: "Presente" }
          ]
        }
      ]
    };
  } else if (ramo === 'Senior') {
    return {
      unidade: {
        grupo: "123º Grupo Escoteiro Brownsea",
        numeral: "123º/SP",
        cidade: "São Paulo / SP",
        secaoNome: "Tropa Sênior Kilimanjaro",
        ramo: "Senior"
      },
      chefia: {
        nome: "Ch. Marcus Vinicius Maglia",
        ueb: uebChefia || "1511813",
        funcao: "Chefe de Seção Sênior",
        nivel: "Nível Avançado"
      },
      sincronizacao: timestampFormatado,
      patrulhas: ["Pioneiros", "Montanha", "Everest"],
      jovens: [
        {
          id: 201,
          nome: "Gabriel Diniz Farias",
          ueb: "1511813-20",
          idade: 16,
          nascimento: "15/06/2010",
          ingresso: "01/03/2018",
          promessa: "23/04/2018",
          patrulha: "Everest",
          cargo: "Monitor",
          etapa: "Desafio Sênior",
          progressoEtapa: 88,
          emergencia: { pais: "Eduardo Farias e Monica Diniz", tel: "(11) 97333-4455", tipoSanguineo: "O+" },
          especialidades: [
            { nome: "Montanhismo", ramo: "Desportos", nivel: 3, icon: "🧗", data: "14/02/2024" },
            { nome: "Sobrevivência", ramo: "Habilidades Escoteiras", nivel: 3, icon: "🏕️", data: "19/08/2024" },
            { nome: "Socorrismo Avançado", ramo: "Serviços", nivel: 3, icon: "🚑", data: "05/11/2024" }
          ],
          progressoDetalhado: [
            { eixo: "Conhecer", concluidos: 14, total: 15, itens: ["Navegação com GPS e Azimute Real"] },
            { eixo: "Fazer", concluidos: 13, total: 15, itens: ["Caminhada de 30km com Pernoite Rústico"] },
            { eixo: "Conviver", concluidos: 14, total: 15, itens: ["Projeto Comunitário de Impacto Social"] },
            { eixo: "Ser", concluidos: 13, total: 15, itens: ["Candidatura ao Escoteiro da Pátria"] }
          ],
          atividadesHistorico: [
            { evento: "Jornada Sênior da Mantiqueira", data: "05/09/2025", local: "Pico dos Marins", presenca: "Presente" }
          ]
        }
      ]
    };
  } else {
    // Pioneiro
    return {
      unidade: {
        grupo: "123º Grupo Escoteiro Brownsea",
        numeral: "123º/SP",
        cidade: "São Paulo / SP",
        secaoNome: "Clã Pioneiro Baden-Powell",
        ramo: "Pioneiro"
      },
      chefia: {
        nome: "Ch. Marcus Vinicius Maglia",
        ueb: uebChefia || "1511813",
        funcao: "Mestre Pioneiro",
        nivel: "Nível Avançado"
      },
      sincronizacao: timestampFormatado,
      patrulhas: ["Equipe Alpha", "Equipe Ômega"],
      jovens: [
        {
          id: 301,
          nome: "Larissa Bueno Toledo",
          ueb: "1511813-30",
          idade: 19,
          nascimento: "03/02/2007",
          ingresso: "10/03/2015",
          promessa: "23/04/2015",
          patrulha: "Equipe Alpha",
          cargo: "Coordenadora de Projeto",
          etapa: "Servir",
          progressoEtapa: 92,
          emergencia: { pais: "Paulo Toledo e Marcia Bueno", tel: "(11) 96444-5566", tipoSanguineo: "A-" },
          especialidades: [
            { nome: "Empreendedorismo Social", ramo: "Serviços", nivel: 3, icon: "💡", data: "15/03/2024" },
            { nome: "Defesa Civil", ramo: "Serviços", nivel: 3, icon: "🛡️", data: "20/07/2024" }
          ],
          progressoDetalhado: [
            { eixo: "Conhecer", concluidos: 15, total: 15, itens: ["Carta do Clã e Ramo Pioneiro"] },
            { eixo: "Fazer", concluidos: 14, total: 15, itens: ["Execução do Projeto de Vida Pioneiro"] },
            { eixo: "Conviver", concluidos: 15, total: 15, itens: ["Serviço Comunitário Continuado"] },
            { eixo: "Ser", concluidos: 14, total: 15, itens: ["Candidatura à Insígnia de B-P"] }
          ],
          atividadesHistorico: [
            { evento: "Mutirão Nacional Pioneiro", data: "20/08/2025", local: "Curitiba / PR", presenca: "Presente" }
          ]
        }
      ]
    };
  }
}

// 1. Processar Login Gatekeeper Oficial no Paxtu 100
function processarLoginGatekeeper() {
  const ueb = document.getElementById('gate-ueb').value.trim();
  const senha = document.getElementById('gate-senha').value;
  const ramo = document.getElementById('gate-ramo').value;
  const btnSubmit = document.getElementById('btn-gate-submit');

  if (!ueb || !senha) {
    alert("Por favor, preencha o Registro UEB e a senha do Paxtu.");
    return;
  }

  // Animação de conexão e download seguro de dados
  btnSubmit.disabled = true;
  btnSubmit.innerHTML = '<span>⏳</span> Conectando à API do Paxtu e baixando dados...';

  setTimeout(() => {
    // Gerar / baixar dados do banco de dados oficial do Paxtu para o ramo
    const dadosBaixados = gerarDadosOficiaisPaxtu(ramo, ueb);

    consultiveState.autenticado = true;
    consultiveState.unidade = dadosBaixados.unidade;
    consultiveState.chefia = dadosBaixados.chefia;
    consultiveState.sincronizacao = dadosBaixados.sincronizacao;
    consultiveState.patrulhas = dadosBaixados.patrulhas;
    consultiveState.jovens = dadosBaixados.jovens;

    // Salvar na sessão de forma segura
    try {
      sessionStorage.setItem('supermappa_consultivo_session', JSON.stringify({
        autenticado: true,
        ramo: ramo,
        uebChefia: ueb,
        dados: dadosBaixados
      }));
    } catch (e) {
      console.warn("Storage local indisponível:", e);
    }

    btnSubmit.disabled = false;
    btnSubmit.innerHTML = '<span>📥</span> Conectar e Baixar Dados do Paxtu';

    // Exibir tela da aplicação e ocultar tela de login
    document.getElementById('screen-login').style.display = 'none';
    document.getElementById('screen-app').style.display = 'block';

    // Renderizar o portal consultivo completo
    renderizarPortalConsultivo();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 750);
}

// 2. Renderizar Portal Consultivo
function renderizarPortalConsultivo() {
  if (!consultiveState.autenticado || !consultiveState.unidade) return;

  // Banner da Unidade
  document.getElementById('banner-grupo-nome').textContent = consultiveState.unidade.grupo;
  document.getElementById('banner-secao-nome').textContent = consultiveState.unidade.secaoNome;
  document.getElementById('banner-ramo-nome').textContent = consultiveState.unidade.ramo;
  document.getElementById('banner-secao-desc').innerHTML = `
    Numeral: <strong>${consultiveState.unidade.numeral}</strong> • 
    Seção: <strong id="banner-secao-nome">${consultiveState.unidade.secaoNome}</strong> • 
    Ramo: <strong id="banner-ramo-nome">${consultiveState.unidade.ramo}</strong>
  `;
  document.getElementById('banner-sync-time').textContent = consultiveState.sincronizacao;
  document.getElementById('banner-chefia-nome').textContent = consultiveState.chefia.nome;
  document.getElementById('banner-chefia-ueb').textContent = `UEB: ${consultiveState.chefia.ueb} • ${consultiveState.chefia.funcao}`;

  // Métricas
  const totalJovens = consultiveState.jovens.length;
  const totalPatrulhas = consultiveState.patrulhas.length;
  const totalEspecialidades = consultiveState.jovens.reduce((acc, j) => acc + (j.especialidades ? j.especialidades.length : 0), 0);
  const mediaProgressao = totalJovens > 0 
    ? Math.round(consultiveState.jovens.reduce((acc, j) => acc + (j.progressoEtapa || 0), 0) / totalJovens)
    : 0;

  document.getElementById('metric-total-jovens').textContent = totalJovens;
  document.getElementById('metric-total-patrulhas').textContent = totalPatrulhas;
  document.getElementById('metric-total-especialidades').textContent = totalEspecialidades;
  document.getElementById('metric-media-progressao').textContent = `${mediaProgressao}%`;

  // Popular Select de Patrulhas
  const selectPatrulha = document.getElementById('filter-patrulha');
  selectPatrulha.innerHTML = '<option value="todas">Todas as Patrulhas</option>';
  consultiveState.patrulhas.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = `Patrulha ${p}`;
    selectPatrulha.appendChild(opt);
  });

  // Renderizar Jovens por Patrulha
  filtrarJovensConsultivo();
}

// 3. Filtrar e Renderizar Jovens agrupados por Patrulha
function filtrarJovensConsultivo() {
  const busca = (document.getElementById('filter-search').value || '').toLowerCase().trim();
  const filtroPatrulha = document.getElementById('filter-patrulha').value;
  const filtroEtapa = document.getElementById('filter-etapa').value;

  const jovensFiltrados = consultiveState.jovens.filter(jovem => {
    const matchBusca = !busca || 
      jovem.nome.toLowerCase().includes(busca) || 
      jovem.ueb.toLowerCase().includes(busca);

    const matchPatrulha = (filtroPatrulha === 'todas') || (jovem.patrulha === filtroPatrulha);
    const matchEtapa = (filtroEtapa === 'todas') || (jovem.etapa === filtroEtapa);

    return matchBusca && matchPatrulha && matchEtapa;
  });

  document.getElementById('label-jovens-exibidos').textContent = jovensFiltrados.length;

  const container = document.getElementById('patrols-container');
  container.innerHTML = '';

  if (jovensFiltrados.length === 0) {
    container.innerHTML = `
      <div class="empty-state-box" style="padding: 3rem 1rem; text-align: center; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
        <h3 style="color: #fff; margin-bottom: 0.5rem;">Nenhum jovem encontrado no Paxtu com estes filtros</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">Verifique o termo de pesquisa ou limpe os filtros de patrulha e etapa.</p>
      </div>
    `;
    return;
  }

  // Agrupar por Patrulha
  const patrulhasMap = {};
  consultiveState.patrulhas.forEach(p => { patrulhasMap[p] = []; });

  jovensFiltrados.forEach(j => {
    if (!patrulhasMap[j.patrulha]) {
      patrulhasMap[j.patrulha] = [];
    }
    patrulhasMap[j.patrulha].push(j);
  });

  // Renderizar cada patrulha que tenha jovens ou se nenhuma busca estiver ativa
  Object.keys(patrulhasMap).forEach(nomePatrulha => {
    const jovensPatrulha = patrulhasMap[nomePatrulha];
    if (jovensPatrulha.length === 0 && (busca || filtroPatrulha !== 'todas' || filtroEtapa !== 'todas')) {
      return; // Oculta patrulhas vazias se houver filtro
    }

    const section = document.createElement('div');
    section.className = 'patrol-section';
    section.style.marginBottom = '2rem';

    section.innerHTML = `
      <div class="patrol-header" style="background: rgba(11,20,17,0.85); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.85rem 1.25rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
        <h3 style="color: var(--scout-gold-light); font-size: 1.15rem; font-weight: 800; display: flex; align-items: center; gap: 0.5rem; margin: 0;">
          <span>🚩</span> Patrulha ${nomePatrulha}
        </h3>
        <span class="brand-badge" style="background: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.4); color: var(--brand-green-light);">
          ${jovensPatrulha.length} ${jovensPatrulha.length === 1 ? 'jovem' : 'jovens'} no Paxtu
        </span>
      </div>
      <div class="youths-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
      </div>
    `;

    const grid = section.querySelector('.youths-grid');

    if (jovensPatrulha.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem; background: var(--bg-card); border-radius: var(--radius-sm); border: 1px dashed var(--border-color);">
          Nenhum jovem registrado nesta patrulha no momento.
        </div>
      `;
    } else {
      jovensPatrulha.forEach(j => {
        const card = document.createElement('div');
        card.className = 'youth-card';
        card.style.background = 'var(--bg-card)';
        card.style.border = '1px solid var(--border-color)';
        card.style.borderRadius = 'var(--radius-md)';
        card.style.padding = '1.25rem';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.justifyContent = 'space-between';
        card.style.transition = 'transform 0.2s, border-color 0.2s';

        const totalEsp = j.especialidades ? j.especialidades.length : 0;

        card.innerHTML = `
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
              <div style="display: flex; gap: 0.75rem; align-items: center;">
                <div style="width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, var(--brand-green-dark), #10b981); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; border: 2px solid rgba(255,255,255,0.15);">
                  ⚜️
                </div>
                <div>
                  <h4 style="color: #fff; font-size: 1rem; font-weight: 700; line-height: 1.2;">${j.nome}</h4>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">UEB: <strong style="color: var(--brand-green-light);">${j.ueb}</strong></span>
                </div>
              </div>
              <span class="brand-badge" style="font-size: 0.65rem;">${j.cargo || 'Membro'}</span>
            </div>

            <!-- Dados de Progressão e Especialidades -->
            <div style="background: rgba(11,20,17,0.6); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid rgba(255,255,255,0.06); margin-bottom: 0.85rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 4px;">
                <span style="color: var(--text-secondary);">Etapa Oficial:</span>
                <strong style="color: var(--scout-gold-light);">${j.etapa}</strong>
              </div>
              <div class="progress-bar-container" style="margin-bottom: 6px;">
                <div class="progress-bar-fill" style="width: ${j.progressoEtapa}%;"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted);">
                <span>Conclusão da Etapa: <strong>${j.progressoEtapa}%</strong></span>
                <span>🎖️ <strong>${totalEsp}</strong> ${totalEsp === 1 ? 'Especialidade' : 'Especialidades'}</span>
              </div>
            </div>
          </div>

          <!-- Botão Consultivo de Ficha Completa -->
          <button class="btn btn-primary" style="width: 100%; font-size: 0.82rem; padding: 0.5rem;" onclick="abrirFichaJovemConsultiva(${j.id})">
            <span>📄</span> Ver Histórico Completo no Paxtu
          </button>
        `;

        grid.appendChild(card);
      });
    }

    container.appendChild(section);
  });
}

// 4. Modal Consultivo da Ficha Completa do Jovem
function abrirFichaJovemConsultiva(idJovem) {
  const jovem = consultiveState.jovens.find(j => j.id === idJovem);
  if (!jovem) return;

  consultiveState.jovemFichaAtiva = jovem;

  // Header do Modal
  document.getElementById('ficha-modal-nome').textContent = jovem.nome;
  document.getElementById('ficha-modal-ueb').textContent = jovem.ueb;
  document.getElementById('ficha-modal-patrulha').textContent = `Patrulha ${jovem.patrulha}`;
  document.getElementById('ficha-modal-cargo').textContent = jovem.cargo || 'Membro';
  document.getElementById('ficha-badge-esp-count').textContent = jovem.especialidades ? jovem.especialidades.length : 0;

  // Aba 1: Progresso & Eixos
  document.getElementById('ficha-etapa-nome').textContent = jovem.etapa;
  document.getElementById('ficha-progresso-percent').textContent = `${jovem.progressoEtapa}%`;
  document.getElementById('ficha-progresso-bar').style.width = `${jovem.progressoEtapa}%`;

  const eixosContainer = document.getElementById('ficha-eixos-container');
  eixosContainer.innerHTML = '';
  if (jovem.progressoDetalhado && jovem.progressoDetalhado.length > 0) {
    jovem.progressoDetalhado.forEach(eixo => {
      const card = document.createElement('div');
      card.className = 'eixo-card';
      const percent = Math.round((eixo.concluidos / eixo.total) * 100);
      card.innerHTML = `
        <div class="eixo-title">
          <span>Área: ${eixo.eixo}</span>
          <span style="color: var(--scout-gold-light);">${eixo.concluidos}/${eixo.total} (${percent}%)</span>
        </div>
        <div class="progress-bar-container" style="margin-bottom: 0.5rem; height: 6px;">
          <div class="progress-bar-fill" style="width: ${percent}%;"></div>
        </div>
        <div>
          ${eixo.itens.map(it => `
            <div class="item-progresso-row">
              <span style="color: #cbd5e1;">✔️ ${it}</span>
              <span style="font-size: 0.7rem; color: var(--brand-green-light); font-weight: 600;">Homologado no Paxtu</span>
            </div>
          `).join('')}
        </div>
      `;
      eixosContainer.appendChild(card);
    });
  } else {
    eixosContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem;">Nenhum detalhamento de eixos cadastrado no Paxtu.</p>';
  }

  // Aba 2: Especialidades
  const espContainer = document.getElementById('ficha-especialidades-container');
  espContainer.innerHTML = '';
  if (jovem.especialidades && jovem.especialidades.length > 0) {
    jovem.especialidades.forEach(esp => {
      const espCard = document.createElement('div');
      espCard.className = 'especialidade-card';
      espCard.innerHTML = `
        <div style="font-size: 2rem;">${esp.icon || '🎖️'}</div>
        <div>
          <h4 style="color: #fff; font-size: 0.95rem; font-weight: 700; margin-bottom: 2px;">${esp.nome}</h4>
          <div style="font-size: 0.78rem; color: var(--scout-gold-light); font-weight: 600;">Nível ${esp.nivel} • Ramo ${esp.ramo}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">Concedida em: ${esp.data} (Oficial Paxtu)</div>
        </div>
      `;
      espContainer.appendChild(espCard);
    });
  } else {
    espContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem; padding: 1rem;">O jovem ainda não possui especialidades registradas no Paxtu.</p>';
  }

  // Aba 3: Histórico de Atividades
  const histContainer = document.getElementById('ficha-historico-container');
  histContainer.innerHTML = '';
  if (jovem.atividadesHistorico && jovem.atividadesHistorico.length > 0) {
    histContainer.innerHTML = `
      <table class="attendance-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
        <thead>
          <tr style="border-bottom: 1px solid var(--border-color); text-align: left; color: var(--text-muted);">
            <th style="padding: 0.5rem;">Atividade / Evento</th>
            <th style="padding: 0.5rem;">Data Oficial</th>
            <th style="padding: 0.5rem;">Local</th>
            <th style="padding: 0.5rem;">Presença Paxtu</th>
          </tr>
        </thead>
        <tbody>
          ${jovem.atividadesHistorico.map(ev => `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
              <td style="padding: 0.5rem; font-weight: 600; color: #fff;">${ev.evento}</td>
              <td style="padding: 0.5rem; color: var(--text-secondary);">${ev.data}</td>
              <td style="padding: 0.5rem; color: var(--text-secondary);">${ev.local}</td>
              <td style="padding: 0.5rem;"><span class="badge-presente" style="font-size: 0.75rem; padding: 2px 8px; border-radius: 4px; background: rgba(16,185,129,0.2); color: #34d399; font-weight: 600;">Confirmada</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } else {
    histContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem; padding: 1rem;">Sem histórico de eventos registrado no Paxtu.</p>';
  }

  // Aba 4: Ficha Cadastral Oficial
  const cadContainer = document.getElementById('ficha-cadastral-container');
  cadContainer.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.85rem;">
      <div>
        <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Nome Completo</div>
        <div style="color: #fff; font-weight: 700; margin-bottom: 0.75rem;">${jovem.nome}</div>

        <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Registro UEB</div>
        <div style="color: var(--brand-green-light); font-weight: 700; margin-bottom: 0.75rem;">${jovem.ueb}</div>

        <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Data de Nascimento / Idade</div>
        <div style="color: #fff; margin-bottom: 0.75rem;">${jovem.nascimento || '--'} (${jovem.idade} anos)</div>

        <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Data de Ingresso no Movimento</div>
        <div style="color: #fff; margin-bottom: 0.75rem;">${jovem.ingresso || '--'}</div>
      </div>
      <div>
        <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Data da Promessa Escoteira</div>
        <div style="color: var(--scout-gold-light); font-weight: 700; margin-bottom: 0.75rem;">${jovem.promessa || '--'}</div>

        <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Patrulha / Seção</div>
        <div style="color: #fff; margin-bottom: 0.75rem;">Patrulha ${jovem.patrulha} • ${consultiveState.unidade.secaoNome}</div>

        <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Filiação / Responsáveis</div>
        <div style="color: #fff; margin-bottom: 0.75rem;">${jovem.emergencia ? jovem.emergencia.pais : '--'}</div>

        <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Telefone de Emergência Cadastrado</div>
        <div style="color: #38bdf8; font-weight: 700; margin-bottom: 0.75rem;">${jovem.emergencia ? jovem.emergencia.tel : '--'} (Tipo Sanguíneo: ${jovem.emergencia ? jovem.emergencia.tipoSanguineo : 'Não Inf.'})</div>
      </div>
    </div>
  `;

  // Reseta para a primeira aba
  trocarAbaFicha('pane-progresso', document.querySelector('.ficha-tab-btn[data-pane="pane-progresso"]'));

  // Exibe o modal
  document.getElementById('modal-ficha-jovem').classList.add('active');
}

// Fechar Ficha do Jovem
function fecharFichaJovemConsultiva() {
  document.getElementById('modal-ficha-jovem').classList.remove('active');
  consultiveState.jovemFichaAtiva = null;
}

// Trocar Aba Interna da Ficha do Jovem
function trocarAbaFicha(paneId, btnElement) {
  document.querySelectorAll('.ficha-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.ficha-pane').forEach(pane => pane.classList.remove('active'));

  if (btnElement) btnElement.classList.add('active');
  const targetPane = document.getElementById(paneId);
  if (targetPane) targetPane.classList.add('active');
}

// Reimportar Dados do Paxtu (Atualização manual de consulta)
function reimportarDadosPaxtu() {
  const statusPill = document.getElementById('header-status-pill');
  const statusText = document.getElementById('header-status-text');

  statusPill.style.borderColor = 'rgba(245, 158, 11, 0.4)';
  statusPill.style.color = '#fbbf24';
  statusText.textContent = 'Baixando dados do Paxtu...';

  setTimeout(() => {
    const ramo = consultiveState.unidade ? consultiveState.unidade.ramo : 'Escoteiro';
    const ueb = consultiveState.chefia ? consultiveState.chefia.ueb : '1511813';
    const novosDados = gerarDadosOficiaisPaxtu(ramo, ueb);

    consultiveState.unidade = novosDados.unidade;
    consultiveState.chefia = novosDados.chefia;
    consultiveState.sincronizacao = novosDados.sincronizacao;
    consultiveState.patrulhas = novosDados.patrulhas;
    consultiveState.jovens = novosDados.jovens;

    renderizarPortalConsultivo();

    statusPill.style.borderColor = 'rgba(16, 185, 129, 0.35)';
    statusPill.style.color = '#34d399';
    statusText.textContent = 'Paxtu Atualizado';

    alert(`Dados oficiais da ${novosDados.unidade.secaoNome} atualizados com sucesso do Paxtu 100!`);
  }, 600);
}

// Logout do Paxtu
function fazerLogoutPaxtu() {
  if (confirm("Deseja encerrar a sessão consultiva do Paxtu?")) {
    sessionStorage.removeItem('supermappa_consultivo_session');
    consultiveState.autenticado = false;
    consultiveState.unidade = null;
    consultiveState.chefia = null;
    consultiveState.jovens = [];

    document.getElementById('screen-app').style.display = 'none';
    document.getElementById('screen-login').style.display = 'flex';
    document.getElementById('gate-senha').value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Inicialização automática ao carregar
document.addEventListener('DOMContentLoaded', () => {
  // Verificar se há sessão consultiva ativa no sessionStorage
  try {
    const sessionRaw = sessionStorage.getItem('supermappa_consultivo_session');
    if (sessionRaw) {
      const sess = JSON.parse(sessionRaw);
      if (sess && sess.autenticado && sess.dados) {
        consultiveState.autenticado = true;
        consultiveState.unidade = sess.dados.unidade;
        consultiveState.chefia = sess.dados.chefia;
        consultiveState.sincronizacao = sess.dados.sincronizacao;
        consultiveState.patrulhas = sess.dados.patrulhas;
        consultiveState.jovens = sess.dados.jovens;

        document.getElementById('screen-login').style.display = 'none';
        document.getElementById('screen-app').style.display = 'block';
        renderizarPortalConsultivo();
        return;
      }
    }
  } catch (e) {
    console.warn("Erro ao ler sessão:", e);
  }

  // Se não houver sessão ativa, permanece na tela de login
  document.getElementById('screen-login').style.display = 'flex';
  document.getElementById('screen-app').style.display = 'none';
});
