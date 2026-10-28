// Testes Unitários de Regra de Negócio: Validação em Lote por Atividade
// Gerenciado por Reversa Forward — Feature 001

import '../src/models/atividade_chamada_model.dart';
import '../src/orchestrators/batch_validation_orchestrator.dart';

void main() {
  print('Iniciando testes unitários de Validação em Lote por Atividade...');

  // Cenário de Teste: Atividade com 6 jovens e 2 itens selecionados
  final atividade = AtividadeChamadaModel(
    idAtividade: 1,
    titulo: 'Acampamento de Patrulha - Nós e Amarras',
    dataAtividade: '2026-10-28',
    idSecao: 10,
    ramo: 'Escoteiro',
    criadoEm: '2026-10-28T08:00:00Z',
    presencas: [
      PresencaModel(idAtividade: 1, idAssociado: 101, nomeAssociado: 'Gabriel', statusPresenca: StatusPresenca.presente),
      PresencaModel(idAtividade: 1, idAssociado: 102, nomeAssociado: 'Helena', statusPresenca: StatusPresenca.presente),
      PresencaModel(idAtividade: 1, idAssociado: 103, nomeAssociado: 'Lucas', statusPresenca: StatusPresenca.ausente),
      PresencaModel(idAtividade: 1, idAssociado: 104, nomeAssociado: 'Beatriz', statusPresenca: StatusPresenca.justificado),
      PresencaModel(idAtividade: 1, idAssociado: 105, nomeAssociado: 'Thiago', statusPresenca: StatusPresenca.presente),
      PresencaModel(idAtividade: 1, idAssociado: 106, nomeAssociado: 'Mariana', statusPresenca: StatusPresenca.presente),
    ],
    itens: [
      ItemAtividadeModel(idAtividade: 1, tipoItem: 'especialidade', idReferencia: 1011, tituloItem: 'Pioneirismo - Nós Básicos'),
      ItemAtividadeModel(idAtividade: 1, tipoItem: 'especialidade', idReferencia: 1012, tituloItem: 'Pioneirismo - Amarra Quadrada'),
    ],
  );

  final orchestrator = BatchValidationOrchestrator();

  // Teste 1: Filtro de Jovens Presentes
  final presentes = orchestrator.filtrarJovensPresentes(atividade.presencas);
  assert(presentes.length == 4, 'Erro: Esperava 4 jovens presentes, obteve ${presentes.length}');
  assert(!presentes.any((p) => p.statusPresenca == StatusPresenca.ausente), 'Erro: Jovem ausente não pode constar na lista');
  assert(!presentes.any((p) => p.statusPresenca == StatusPresenca.justificado), 'Erro: Jovem justificado não pode constar na lista');
  print('✅ Teste 1 passou: Filtro de jovens presentes correto (4 presentes, 2 ignorados).');

  // Teste 2: Cálculo de Validações Totais
  final totalValidacoes = orchestrator.calcularTotalValidacoes(atividade);
  assert(totalValidacoes == 8, 'Erro: Esperava 8 validações (4 presentes * 2 itens), obteve $totalValidacoes');
  print('✅ Teste 2 passou: Cálculo de validações correto (8 validações planejadas).');

  // Teste 3: Geração de Comandos de Homologação em Lote
  final comandos = orchestrator.gerarComandosValidacaoLote(atividade);
  assert(comandos.length == 8, 'Erro: Quantidade de comandos deve ser 8');
  assert(comandos.every((c) => c['status'] == 'aprovado'), 'Erro: Status deve ser aprovado');
  print('✅ Teste 3 passou: Comandos de homologação gerados com sucesso.');

  // Teste 4: Idempotência (Ignorar se o jovem já tem o item conquistado)
  final conquistasExistentes = <String>{'101_especialidade_1011'}; // Gabriel já tinha o item 1011
  final comandosIdempotentes = orchestrator.filtrarItensJaConquistados(comandos, conquistasExistentes);
  assert(comandosIdempotentes.length == 7, 'Erro: Esperava 7 comandos após ignorar conquista existente do Gabriel');
  print('✅ Teste 4 passou: Idempotência respeitada (1 duplicata ignorada, 7 comandos mantidos).');

  print('🎉 Todos os testes de validação em lote foram concluídos com 100% de sucesso!');
}
