// Tela Principal de Gestao da Atividade com Chamada e Validacao em 1 Clique
// Gerenciado por Reversa Forward — Feature 001 / Tarefa T008

import 'package:flutter/material.dart';
import '../models/atividade_chamada_model.dart';
import '../services/atividade_service.dart';
import '../widgets/item_selector_widget.dart';
import '../widgets/batch_validation_confirm_dialog.dart';
import '../widgets/sync_pending_widget.dart';

class AtividadeChamadaView extends StatefulWidget {
  final AtividadeChamadaModel atividadeInicial;

  const AtividadeChamadaView({
    Key? key,
    required this.atividadeInicial,
  }) : super(key: key);

  @override
  State<AtividadeChamadaView> createState() => _AtividadeChamadaViewState();
}

class _AtividadeChamadaViewState extends State<AtividadeChamadaView> {
  late AtividadeChamadaModel _atividade;
  final AtividadeService _service = AtividadeService();
  bool _processandoLote = false;

  @override
  void initState() {
    super.initState();
    _atividade = widget.atividadeInicial;
  }

  void _abrirSeletorItens() {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => ItemSelectorWidget(
          ramo: _atividade.ramo,
          idAtividade: _atividade.idAtividade ?? 1,
          itensJaSelecionados: List.from(_atividade.itens),
          onItensConfirmados: (novosItens) {
            setState(() {
              _atividade.itens = novosItens;
            });
          },
        ),
      ),
    );
  }

  void _atualizarStatusPresenca(int idAssociado, StatusPresenca novoStatus) {
    setState(() {
      _service.alternarPresenca(_atividade, idAssociado, novoStatus);
    });
  }

  Future<void> _executarValidacaoEmLote() async {
    setState(() {
      _processandoLote = true;
    });

    try {
      final resultado = await _service.concluirEValidarEmLote(_atividade);
      setState(() {
        _atividade.status = 'concluida';
      });

      if (!mounted) return;

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: const Color(0xFF1B5E20),
          duration: const Duration(seconds: 4),
          content: Text(
            '🎉 Sucesso! ${resultado['totalValidacoesRealizadas']} itens homologados em 1 clique para os jovens presentes.',
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
        ),
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: Colors.red.shade700,
          content: Text('Erro na validação: $e'),
        ),
      );
    } finally {
      if (mounted) {
        setState(() {
          _processandoLote = false;
        });
      }
    }
  }

  void _abrirConfirmacaoLote() {
    if (_atividade.itens.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          backgroundColor: Colors.orange,
          content: Text('Adicione ao menos um item pedagógico (progressão ou especialidade) antes de validar.'),
        ),
      );
      return;
    }

    final presentes = _atividade.presencas.where((p) => p.statusPresenca == StatusPresenca.presente).length;
    if (presentes == 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          backgroundColor: Colors.orange,
          content: Text('Marque ao menos um jovem como presente para homologar.'),
        ),
      );
      return;
    }

    showDialog(
      context: context,
      builder: (context) => BatchValidationConfirmDialog(
        atividade: _atividade,
        onConfirmar: _executarValidacaoEmLote,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final presentes = _atividade.presencas.where((p) => p.statusPresenca == StatusPresenca.presente).length;
    final ausentes = _atividade.presencas.where((p) => p.statusPresenca == StatusPresenca.ausente).length;
    final justificados = _atividade.presencas.where((p) => p.statusPresenca == StatusPresenca.justificado).length;
    final filaSync = _service.obterFilaSincronizacao();
    final isConcluida = _atividade.status == 'concluida';

    return Scaffold(
      appBar: AppBar(
        title: Text(_atividade.titulo),
        backgroundColor: const Color(0xFF1B5E20),
        actions: [
          IconButton(
            icon: const Icon(Icons.info_outline),
            tooltip: 'Detalhes da Atividade',
            onPressed: () {},
          )
        ],
      ),
      body: Column(
        children: [
          // Banner Offline / Sincronização
          SyncPendingWidget(
            totalPendencias: filaSync.length,
            onSincronizar: () async {
              // Simulação de transmissão com Paxtu
              await Future.delayed(const Duration(seconds: 2));
              setState(() {
                filaSync.clear();
              });
            },
          ),

          // Seção 1: Itens Pedagógicos Trabalhados
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            color: Colors.grey.shade100,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Itens Trabalhados (${_atividade.itens.length})',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                    ),
                    if (!isConcluida)
                      TextButton.icon(
                        style: TextButton.styleFrom(foregroundColor: const Color(0xFF1B5E20)),
                        icon: const Icon(Icons.add_circle_outline, size: 18),
                        label: const Text('Vincular Itens'),
                        onPressed: _abrirSeletorItens,
                      ),
                  ],
                ),
                if (_atividade.itens.isEmpty)
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 6.0),
                    child: Text(
                      'Nenhum item associado. Clique em "Vincular Itens" para selecionar do catálogo offline.',
                      style: TextStyle(color: Colors.grey.shade600, fontSize: 13, fontStyle: FontStyle.italic),
                    ),
                  )
                else
                  Wrap(
                    spacing: 6,
                    runSpacing: 4,
                    children: _atividade.itens.map((item) {
                      final isProg = item.tipoItem == 'progressao';
                      return Chip(
                        avatar: Icon(
                          isProg ? Icons.hiking : Icons.military_tech,
                          size: 16,
                          color: isProg ? Colors.green.shade900 : Colors.amber.shade900,
                        ),
                        backgroundColor: isProg ? Colors.green.shade50 : Colors.amber.shade50,
                        label: Text(
                          item.tituloItem,
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w500,
                            color: isProg ? Colors.green.shade900 : Colors.amber.shade900,
                          ),
                        ),
                        deleteIcon: isConcluida ? null : const Icon(Icons.close, size: 14),
                        onDeleted: isConcluida
                            ? null
                            : () {
                                setState(() {
                                  _service.removerItemDaAtividade(_atividade, item.idReferencia, item.tipoItem);
                                });
                              },
                      );
                    }).toList(),
                  ),
              ],
            ),
          ),

          // Resumo da Chamada de Presença
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border(bottom: BorderSide(color: Colors.grey.shade300)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Chamada de Presença:',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                ),
                Row(
                  children: [
                    _buildBadge('P', presentes, Colors.green),
                    const SizedBox(width: 8),
                    _buildBadge('A', ausentes, Colors.red),
                    const SizedBox(width: 8),
                    _buildBadge('J', justificados, Colors.orange),
                  ],
                ),
              ],
            ),
          ),

          // Lista de Jovens e Botões Táteis
          Expanded(
            child: ListView.separated(
              itemCount: _atividade.presencas.length,
              separatorBuilder: (_, __) => const Divider(height: 1),
              itemBuilder: (context, index) {
                final presenca = _atividade.presencas[index];
                return ListTile(
                  dense: true,
                  leading: CircleAvatar(
                    backgroundColor: Colors.blueGrey.shade100,
                    child: Text(
                      presenca.nomeAssociado.isNotEmpty ? presenca.nomeAssociado[0] : 'J',
                      style: const TextStyle(color: Colors.blueGrey, fontWeight: FontWeight.bold),
                    ),
                  ),
                  title: Text(
                    presenca.nomeAssociado,
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      decoration: presenca.statusPresenca == StatusPresenca.ausente
                          ? TextDecoration.lineThrough
                          : TextDecoration.none,
                      color: presenca.statusPresenca == StatusPresenca.ausente
                          ? Colors.grey
                          : Colors.black87,
                    ),
                  ),
                  subtitle: Text(
                    'Registro: #${presenca.idAssociado}',
                    style: const TextStyle(fontSize: 11),
                  ),
                  trailing: isConcluida
                      ? _buildStatusFinal(presenca.statusPresenca)
                      : Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            _buildBotaoPresenca(
                              label: 'P',
                              status: StatusPresenca.presente,
                              atual: presenca.statusPresenca,
                              corAtiva: Colors.green,
                              onTap: () => _atualizarStatusPresenca(presenca.idAssociado, StatusPresenca.presente),
                            ),
                            const SizedBox(width: 4),
                            _buildBotaoPresenca(
                              label: 'A',
                              status: StatusPresenca.ausente,
                              atual: presenca.statusPresenca,
                              corAtiva: Colors.red,
                              onTap: () => _atualizarStatusPresenca(presenca.idAssociado, StatusPresenca.ausente),
                            ),
                            const SizedBox(width: 4),
                            _buildBotaoPresenca(
                              label: 'J',
                              status: StatusPresenca.justificado,
                              atual: presenca.statusPresenca,
                              corAtiva: Colors.orange,
                              onTap: () => _atualizarStatusPresenca(presenca.idAssociado, StatusPresenca.justificado),
                            ),
                          ],
                        ),
                );
              },
            ),
          ),

          // Rodapé de Ação: Validação em 1 Clique
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(color: Colors.black.withOpacity(0.08), blurRadius: 8, offset: const Offset(0, -3)),
              ],
            ),
            child: SafeArea(
              child: SizedBox(
                width: double.infinity,
                child: isConcluida
                    ? Container(
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        decoration: BoxDecoration(
                          color: Colors.green.shade100,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: const [
                            Icon(Icons.check_circle, color: Color(0xFF1B5E20)),
                            SizedBox(width: 8),
                            Text(
                              'Atividade Concluída e Homologada',
                              style: TextStyle(
                                color: Color(0xFF1B5E20),
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              ),
                            ),
                          ],
                        ),
                      )
                    : ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF1B5E20),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          elevation: 3,
                        ),
                        icon: _processandoLote
                            ? const SizedBox(
                                width: 20,
                                height: 20,
                                child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                              )
                            : const Icon(Icons.bolt, color: Colors.amber, size: 24),
                        label: Text(
                          _processandoLote
                              ? 'Processando Validações...'
                              : 'Concluir e Validar em 1 Clique (${presentes * _atividade.itens.length})',
                          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                        onPressed: _processandoLote ? null : _abrirConfirmacaoLote,
                      ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBadge(String label, int total, Color cor) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: cor.withOpacity(0.12),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: cor.withOpacity(0.4)),
      ),
      child: Text(
        '$label: $total',
        style: TextStyle(color: cor, fontWeight: FontWeight.bold, fontSize: 12),
      ),
    );
  }

  Widget _buildBotaoPresenca({
    required String label,
    required StatusPresenca status,
    required StatusPresenca atual,
    required Color corAtiva,
    required VoidCallback onTap,
  }) {
    final isSelected = atual == status;
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(6),
      child: Container(
        width: 32,
        height: 32,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: isSelected ? corAtiva : Colors.transparent,
          borderRadius: BorderRadius.circular(6),
          border: Border.all(color: isSelected ? corAtiva : Colors.grey.shade400),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: isSelected ? Colors.white : Colors.grey.shade700,
            fontWeight: FontWeight.bold,
            fontSize: 13,
          ),
        ),
      ),
    );
  }

  Widget _buildStatusFinal(StatusPresenca status) {
    Color cor;
    String label;
    switch (status) {
      case StatusPresenca.presente:
        cor = Colors.green;
        label = 'Presente';
        break;
      case StatusPresenca.ausente:
        cor = Colors.red;
        label = 'Ausente';
        break;
      case StatusPresenca.justificado:
        cor = Colors.orange;
        label = 'Justificado';
        break;
    }
    return Chip(
      label: Text(label, style: TextStyle(color: cor, fontSize: 11, fontWeight: FontWeight.bold)),
      backgroundColor: cor.withOpacity(0.1),
      visualDensity: VisualDensity.compact,
    );
  }
}
