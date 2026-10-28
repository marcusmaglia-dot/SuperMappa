// Seeder do Catálogo Offline de Especialidades, Progressão e Jovens da Seção
// Gerenciado por Reversa Forward — Feature 001

class OfflineDataSeeder {
  /// Dados iniciais de especialidades oficiais dos Escoteiros do Brasil
  static final List<Map<String, dynamic>> especialidadesSeed = [
    {
      'id_especialidade': 101,
      'nome': 'Pioneirismo',
      'ramo_conhecimento': 'Habilidades Escoteiras',
      'icone_url': 'assets/flutter_assets/assets/mAPPa/images/icons/habilidades_escoteiras.png',
      'itens': [
        {'id_item': 1011, 'ordem': 1, 'descricao': 'Demonstrar nós básicos: direito, escota, correr e volta da ribeira.'},
        {'id_item': 1012, 'ordem': 2, 'descricao': 'Fazer nó de barqueiro aplicado a uma amarra quadrada e amarra diagonal.'},
        {'id_item': 1013, 'ordem': 3, 'descricao': 'Construir com sua patrulha um abrigo suspenso ou mesa de campo.'},
        {'id_item': 1014, 'ordem': 4, 'descricao': 'Fazer uma emenda quadrada e uma falcaça na ponta de um cabo.'},
        {'id_item': 1015, 'ordem': 5, 'descricao': 'Projetar e liderar a construção de uma ponte de pioneiria móvel.'},
        {'id_item': 1016, 'ordem': 6, 'descricao': 'Cuidar do ferramental de pioneiria: manutenção de machadinha, serrote e facão.'}
      ]
    },
    {
      'id_especialidade': 102,
      'nome': 'Primeiros Socorros',
      'ramo_conhecimento': 'Serviços',
      'icone_url': 'assets/flutter_assets/assets/mAPPa/images/icons/conquista.png',
      'itens': [
        {'id_item': 1021, 'ordem': 1, 'descricao': 'Saber os números de emergência (SAMU, Bombeiros, Polícia) e como passar dados.'},
        {'id_item': 1022, 'ordem': 2, 'descricao': 'Demonstrar limpeza e curativo em pequenos cortes e escoriações.'},
        {'id_item': 1023, 'ordem': 3, 'descricao': 'Imobilizar provisoriamente uma fratura no braço com talas e ataduras.'},
        {'id_item': 1024, 'ordem': 4, 'descricao': 'Demonstrar a manobra de Heimlich para desengasgo em adultos e crianças.'},
        {'id_item': 1025, 'ordem': 5, 'descricao': 'Saber agir em casos de insolação, hipotermia e desidratação em acampamento.'},
        {'id_item': 1026, 'ordem': 6, 'descricao': 'Montar um estojo individual de primeiros socorros para jornada escoteira.'}
      ]
    },
    {
      'id_especialidade': 103,
      'nome': 'Fogo de Conselho',
      'ramo_conhecimento': 'Cultura',
      'icone_url': 'assets/flutter_assets/assets/mAPPa/images/icons/cultura.png',
      'itens': [
        {'id_item': 1031, 'ordem': 1, 'descricao': 'Conhecer a tradição e o cerimonial do Fogo de Conselho escoteiro.'},
        {'id_item': 1032, 'ordem': 2, 'descricao': 'Participar e apresentar um esquete de patrulha com canção escoteira.'},
        {'id_item': 1033, 'ordem': 3, 'descricao': 'Aprender e entoar pelo menos 5 canções tradicionais de conselho.'},
        {'id_item': 1034, 'ordem': 4, 'descricao': 'Atuar como guardião do fogo, montando a fogueira com segurança.'}
      ]
    },
    {
      'id_especialidade': 104,
      'nome': 'Astronomia',
      'ramo_conhecimento': 'Ciência e Tecnologia',
      'icone_url': 'assets/flutter_assets/assets/mAPPa/images/icons/ciencia_tecnologia.png',
      'itens': [
        {'id_item': 1041, 'ordem': 1, 'descricao': 'Identificar a constelação do Cruzeiro do Sul e orientar-se para o ponto cardeal Sul.'},
        {'id_item': 1042, 'ordem': 2, 'descricao': 'Identificar as constelações de Órion e Escorpião a olho nu.'},
        {'id_item': 1043, 'ordem': 3, 'descricao': 'Explicar os movimentos da Terra, fases da Lua e estações do ano.'}
      ]
    },
    {
      'id_especialidade': 105,
      'nome': 'Orientação e Navegação',
      'ramo_conhecimento': 'Desportos',
      'icone_url': 'assets/flutter_assets/assets/mAPPa/images/icons/desportos.png',
      'itens': [
        {'id_item': 1051, 'ordem': 1, 'descricao': 'Conhecer a rosa dos ventos e os 16 pontos cardeais, colaterais e subcolaterais.'},
        {'id_item': 1052, 'ordem': 2, 'descricao': 'Medir e navegar azimutes em graus com uma bússola do tipo Silva.'},
        {'id_item': 1053, 'ordem': 3, 'descricao': 'Percorrer uma pista de orientação com mapa topográfico e bússola de 3 km.'}
      ]
    }
  ];

  /// Dados iniciais de progressão dos Ramos e Eixos Educativos
  static final List<Map<String, dynamic>> progressaoSeed = [
    {
      'id_bloco': 201,
      'ramo': 'Escoteiro',
      'nome_bloco': 'Pista / Trilha',
      'ordem': 1,
      'competencias': [
        {
          'id_competencia': 2011,
          'eixo': 'Conhecer',
          'descricao': 'Compreender a história do fundador Baden-Powell e a Promessa Escoteira.',
          'itens': [
            {'id_item': 20111, 'ordem': 1, 'descricao': 'Explicar a Lei Escoteira com suas próprias palavras.'},
            {'id_item': 20112, 'ordem': 2, 'descricao': 'Conhecer a história do início do Escotismo na Ilha de Brownsea.'}
          ]
        },
        {
          'id_competencia': 2012,
          'eixo': 'Fazer',
          'descricao': 'Dominar técnicas de acampamento e vida ao ar livre.',
          'itens': [
            {'id_item': 20121, 'ordem': 1, 'descricao': 'Montar e desmontar uma barraca de patrulha com esmero.'},
            {'id_item': 20122, 'ordem': 2, 'descricao': 'Preparar uma refeição mateira simples sobre fogareiro ou lenha.'}
          ]
        },
        {
          'id_competencia': 2013,
          'eixo': 'Conviver',
          'descricao': 'Viver ativamente o sistema de patrulhas e respeito mútuo.',
          'itens': [
            {'id_item': 20131, 'ordem': 1, 'descricao': 'Participar ativamente das reuniões e do Conselho de Patrulha.'},
            {'id_item': 20132, 'ordem': 2, 'descricao': 'Assumir um encargo na patrulha (ex.: intendente, almoxarife, cronista).'}
          ]
        },
        {
          'id_competencia': 2014,
          'eixo': 'Ser',
          'descricao': 'Demonstrar atitudes alinhadas ao espírito escoteiro.',
          'itens': [
            {'id_item': 20141, 'ordem': 1, 'descricao': 'Praticar diariamente a Boa Ação diária.'},
            {'id_item': 20142, 'ordem': 2, 'descricao': 'Demonstrar pontualidade e apresentação correta do uniforme/vestuário.'}
          ]
        }
      ]
    }
  ];

  /// Jovens da Seção (Exemplo representativo da Tropa Escoteira)
  static final List<Map<String, dynamic>> jovensSecaoSeed = [
    {
      'id_associado': 151181301,
      'registro_ueb': '1511813-1',
      'nome_completo': 'Gabriel Santos Ferreira',
      'ramo': 'Escoteiro',
      'patrulha': 'Lobo',
      'foto_url': 'assets/flutter_assets/assets/mAPPa/images/escoteiro.jpeg'
    },
    {
      'id_associado': 151181302,
      'registro_ueb': '1511813-2',
      'nome_completo': 'Helena Oliveira Rocha',
      'ramo': 'Escoteiro',
      'patrulha': 'Lobo',
      'foto_url': 'assets/flutter_assets/assets/mAPPa/images/escoteiro.jpeg'
    },
    {
      'id_associado': 151181303,
      'registro_ueb': '1511813-3',
      'nome_completo': 'Lucas Silva Mendes',
      'ramo': 'Escoteiro',
      'patrulha': 'Águia',
      'foto_url': 'assets/flutter_assets/assets/mAPPa/images/escoteiro.jpeg'
    },
    {
      'id_associado': 151181304,
      'registro_ueb': '1511813-4',
      'nome_completo': 'Beatriz Lima Souza',
      'ramo': 'Escoteiro',
      'patrulha': 'Águia',
      'foto_url': 'assets/flutter_assets/assets/mAPPa/images/escoteiro.jpeg'
    },
    {
      'id_associado': 151181305,
      'registro_ueb': '1511813-5',
      'nome_completo': 'Thiago Nogueira Duarte',
      'ramo': 'Escoteiro',
      'patrulha': 'Touro',
      'foto_url': 'assets/flutter_assets/assets/mAPPa/images/escoteiro.jpeg'
    },
    {
      'id_associado': 151181306,
      'registro_ueb': '1511813-6',
      'nome_completo': 'Mariana Castro Ramos',
      'ramo': 'Escoteiro',
      'patrulha': 'Touro',
      'foto_url': 'assets/flutter_assets/assets/mAPPa/images/escoteiro.jpeg'
    }
  ];
}
