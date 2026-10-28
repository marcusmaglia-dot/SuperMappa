// Servico de Gerenciamento de Atividades, Presenca e Catalogo Offline
// Gerenciado por Reversa Forward — Feature 001

import '../database/offline_data_seeder.dart';
import '../models/atividade_chamada_model.dart';
import '../orchestrators/batch_validation_orchestrator.dart';

class AtividadeService {
  final List<AtividadeChamadaModel> _atividades = [];
  final Set<String> _conquistasLocais = {};
  final List<Map<String, dynamic>> _filaEnvioPaxtu = [];

  final BatchValidationOrchestrator _orchestrator = BatchValidationOrchestrator();

  /// Carrega o catálogo offline de especialidades pré-populado
  List<Map<String, dynamic>> obterCatalogoEspecialidades() {
    return OfflineDataSeeder.especialidadesSeed;
  }

  /// Carrega a matriz offline de progressão por ramo
  List<Map<String, dynamic>> obterMatrizProgressao(String ramo) {
    return OfflineDataSeeder.progressaoSeed
        .where((p) => (p['ramo'] as String).toLowerCase() == ramo.toLowerCase())
        .toList();
  }

  /// Carrega os jovens da seção ativa
  List<Map<String, dynamic>> obterJovensDaSecao(String ramo) {
    return OfflineDataSeeder.jovensSecaoSeed
        .where((j) => (j['ramo'] as String).toLowerCase() == ramo.toLowerCase())
        .toList();
  }

  /// Cria uma nova atividade e inicializa a lista de chamada com todos os jovens presentes
  AtividadeChamadaModel criarAtividade({
    required String titulo,
    String? descricao,
    required String dataAtividade,
    required int idSecao,
    required String ramo,
  }) {
    final jovens = obterJovensDaSecao(ramo);
    final presencasIniciais = jovens.map((j) {
      return PresencaModel(
        idAtividade: _atividades.length + 1,
        idAssociado: j['id_associado'] as int,
        nomeAssociado: j['nome_completo'] as String,
        statusPresenca: StatusPresenca.presente,
      );
    }).toList();

    final novaAtividade = AtividadeChamadaModel(
      idAtividade: _atividades.length + 1,
      titulo: titulo,
      descricao: descricao,
      dataAtividade: dataAtividade,
      idSecao: idSecao,
      ramo: ramo,
      status: 'planejada',
      criadoEm: DateTime.now().toIso8601String(),
      presencas: presencasIniciais,
      itens: [],
    );

    _atividades.add(novaAtividade);
    return novaAtividade;
  }

  /// Alterna o status de presença de um jovem na chamada
  void alternarPresenca(AtividadeChamadaModel atividade, int idAssociado, StatusPresenca novoStatus) {
    final presenca = atividade.presencas.firstWhere((p) => p.idAssociado == idAssociado);
    presenca.statusPresenca = novoStatus;
  }

  /// Vincula um item pedagógico (progressão ou especialidade) à atividade
  void adicionarItemNaAtividade(AtividadeChamadaModel atividade, ItemAtividadeModel item) {
    if (!atividade.itens.any((i) => i.idReferencia == item.idReferencia && i.tipoItem == item.tipoItem)) {
      atividade.itens.add(item);
    }
  }

  /// Remove um item pedagógico da atividade
  void removerItemDaAtividade(AtividadeChamadaModel atividade, int idReferencia, String tipoItem) {
    atividade.itens.removeWhere((i) => i.idReferencia == idReferencia && i.tipoItem == tipoItem);
  }

  /// Executa a Validação em Lote (1 Clique)
  Future<Map<String, dynamic>> concluirEValidarEmLote(AtividadeChamadaModel atividade) async {
    if (atividade.itens.isEmpty) {
      throw Exception('Selecione ao menos um item pedagógico trabalhado nesta atividade.');
    }

    final resultado = await _orchestrator.executarValidacaoEmLote(
      atividade: atividade,
      conquistasExistentes: _conquistasLocais,
      persistirLocalmente: (comandos) async {
        for (final cmd in comandos) {
          final key = '${cmd['idAssociado']}_${cmd['tipoItem']}_${cmd['idItem']}';
          _conquistasLocais.add(key);
          _filaEnvioPaxtu.add({
            ...cmd,
            'statusEnvio': 'pendente',
            'tentativas': 0,
            'enfileiradoEm': DateTime.now().toIso8601String(),
          });
        }
      },
    );

    return resultado;
  }

  /// Retorna as pendências de sincronização com o Paxtu
  List<Map<String, dynamic>> obterFilaSincronizacao() {
    return _filaEnvioPaxtu.where((f) => f['statusEnvio'] == 'pendente').toList();
  }

  /// Lista todas as atividades cadastradas
  List<AtividadeChamadaModel> listarAtividades() {
    return _atividades;
  }
}
