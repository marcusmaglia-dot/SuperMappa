// Orquestrador de Validação em Lote por Atividade
// Gerenciado por Reversa Forward — Feature 001

import '../models/atividade_chamada_model.dart';

class BatchValidationOrchestrator {
  /// Filtra apenas os associados que responderam PRESENTE na chamada
  List<PresencaModel> filtrarJovensPresentes(List<PresencaModel> presencas) {
    return presencas.where((p) => p.statusPresenca == StatusPresenca.presente).toList();
  }

  /// Calcula o total previsto de validações (jovens presentes * itens contemplados)
  int calcularTotalValidacoes(AtividadeChamadaModel atividade) {
    final presentes = filtrarJovensPresentes(atividade.presencas);
    return presentes.length * atividade.itens.length;
  }

  /// Gera a lista individualizada de comandos de homologação
  List<Map<String, dynamic>> gerarComandosValidacaoLote(AtividadeChamadaModel atividade) {
    final presentes = filtrarJovensPresentes(atividade.presencas);
    final comandos = <Map<String, dynamic>>[];

    for (final presenca in presentes) {
      for (final item in atividade.itens) {
        comandos.add({
          'idAssociado': presenca.idAssociado,
          'nomeAssociado': presenca.nomeAssociado,
          'idItem': item.idReferencia,
          'tipoItem': item.tipoItem,
          'tituloItem': item.tituloItem,
          'status': 'aprovado',
          'comentario': 'Homologado em lote pela atividade: ${atividade.titulo}',
          'dataAtividade': atividade.dataAtividade,
        });
      }
    }

    return comandos;
  }

  /// Aplica a regra de idempotência: descarta itens que o jovem já possui conquistados
  List<Map<String, dynamic>> filtrarItensJaConquistados(
    List<Map<String, dynamic>> comandos,
    Set<String> conquistasExistentes,
  ) {
    return comandos.where((c) {
      final key = '${c['idAssociado']}_${c['tipoItem']}_${c['idItem']}';
      return !conquistasExistentes.contains(key);
    }).toList();
  }

  /// Executa o algoritmo de 1 clique:
  /// - Atualiza banco local
  /// - Enfileira na fila de sincronização Paxtu
  Future<Map<String, dynamic>> executarValidacaoEmLote({
    required AtividadeChamadaModel atividade,
    required Set<String> conquistasExistentes,
    required Future<void> Function(List<Map<String, dynamic>> comandosFiltrados) persistirLocalmente,
  }) async {
    final comandosBrutos = gerarComandosValidacaoLote(atividade);
    final comandosValidos = filtrarItensJaConquistados(comandosBrutos, conquistasExistentes);

    // Persistência local atômica
    await persistirLocalmente(comandosValidos);

    atividade.status = 'concluida';
    atividade.concluidoEm = DateTime.now().toIso8601String();

    return {
      'sucesso': true,
      'totalPresentes': filtrarJovensPresentes(atividade.presencas).length,
      'totalItens': atividade.itens.length,
      'validacoesProcessadas': comandosValidos.length,
      'duplicatasIgnoradas': comandosBrutos.length - comandosValidos.length,
      'status': atividade.status,
    };
  }
}
