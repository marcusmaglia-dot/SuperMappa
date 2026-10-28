// Modelos de Dados (DTOs) da Funcionalidade de Validação em Lote por Atividade
// Gerenciado por Reversa Forward — Feature 001

enum StatusPresenca {
  presente,
  ausente,
  justificado;

  static StatusPresenca fromString(String value) {
    switch (value.toLowerCase()) {
      case 'ausente':
        return StatusPresenca.ausente;
      case 'justificado':
        return StatusPresenca.justificado;
      case 'presente':
      default:
        return StatusPresenca.presente;
    }
  }

  String toDbString() {
    return name;
  }
}

class ItemAtividadeModel {
  final int? idItemAtividade;
  final int idAtividade;
  final String tipoItem; // 'progressao' | 'especialidade'
  final int idReferencia; // idItem da progressão ou idItem da especialidade
  final String tituloItem;
  final String? descricaoRequisito;

  ItemAtividadeModel({
    this.idItemAtividade,
    required this.idAtividade,
    required this.tipoItem,
    required this.idReferencia,
    required this.tituloItem,
    this.descricaoRequisito,
  });

  Map<String, dynamic> toMap() {
    return {
      if (idItemAtividade != null) 'id_item_atividade': idItemAtividade,
      'id_atividade': idAtividade,
      'tipo_item': tipoItem,
      'id_referencia': idReferencia,
      'titulo_item': tituloItem,
      'descricao_requisito': descricaoRequisito,
    };
  }

  factory ItemAtividadeModel.fromMap(Map<String, dynamic> map) {
    return ItemAtividadeModel(
      idItemAtividade: map['id_item_atividade'] as int?,
      idAtividade: map['id_atividade'] as int,
      tipoItem: map['tipo_item'] as String,
      idReferencia: map['id_referencia'] as int,
      tituloItem: map['titulo_item'] as String,
      descricaoRequisito: map['descricao_requisito'] as String?,
    );
  }
}

class PresencaModel {
  final int? idPresenca;
  final int idAtividade;
  final int idAssociado;
  final String nomeAssociado;
  StatusPresenca statusPresenca;

  PresencaModel({
    this.idPresenca,
    required this.idAtividade,
    required this.idAssociado,
    required this.nomeAssociado,
    this.statusPresenca = StatusPresenca.presente,
  });

  Map<String, dynamic> toMap() {
    return {
      if (idPresenca != null) 'id_presenca': idPresenca,
      'id_atividade': idAtividade,
      'id_associado': idAssociado,
      'nome_associado': nomeAssociado,
      'status_presenca': statusPresenca.toDbString(),
    };
  }

  factory PresencaModel.fromMap(Map<String, dynamic> map) {
    return PresencaModel(
      idPresenca: map['id_presenca'] as int?,
      idAtividade: map['id_atividade'] as int,
      idAssociado: map['id_associado'] as int,
      nomeAssociado: map['nome_associado'] as String,
      statusPresenca: StatusPresenca.fromString(map['status_presenca'] as String),
    );
  }
}

class AtividadeChamadaModel {
  final int? idAtividade;
  final String titulo;
  final String? descricao;
  final String dataAtividade;
  final int idSecao;
  final String ramo;
  String status; // 'planejada', 'concluida', 'sincronizada'
  final String criadoEm;
  String? concluidoEm;

  List<PresencaModel> presencas;
  List<ItemAtividadeModel> itens;

  AtividadeChamadaModel({
    this.idAtividade,
    required this.titulo,
    this.descricao,
    required this.dataAtividade,
    required this.idSecao,
    required this.ramo,
    this.status = 'planejada',
    required this.criadoEm,
    this.concluidoEm,
    this.presencas = const [],
    this.itens = const [],
  });

  Map<String, dynamic> toMap() {
    return {
      if (idAtividade != null) 'id_atividade': idAtividade,
      'titulo': titulo,
      'descricao': descricao,
      'data_atividade': dataAtividade,
      'id_secao': idSecao,
      'ramo': ramo,
      'status': status,
      'criado_em': criadoEm,
      'concluido_em': concluidoEm,
    };
  }

  factory AtividadeChamadaModel.fromMap(Map<String, dynamic> map) {
    return AtividadeChamadaModel(
      idAtividade: map['id_atividade'] as int?,
      titulo: map['titulo'] as String,
      descricao: map['descricao'] as String?,
      dataAtividade: map['data_atividade'] as String,
      idSecao: map['id_secao'] as int,
      ramo: map['ramo'] as String,
      status: map['status'] as String? ?? 'planejada',
      criadoEm: map['criado_em'] as String,
      concluidoEm: map['concluido_em'] as String?,
    );
  }
}
