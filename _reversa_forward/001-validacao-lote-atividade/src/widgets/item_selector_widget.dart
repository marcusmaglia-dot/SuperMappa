// Widget Seletor de Itens Pedagogicos (Progressao e Especialidades)
// Gerenciado por Reversa Forward — Feature 001 / Tarefa T007

import 'package:flutter/material.dart';
import '../models/atividade_chamada_model.dart';
import '../services/atividade_service.dart';

class ItemSelectorWidget extends StatefulWidget {
  final String ramo;
  final int idAtividade;
  final List<ItemAtividadeModel> itensJaSelecionados;
  final Function(List<ItemAtividadeModel>) onItensConfirmados;

  const ItemSelectorWidget({
    Key? key,
    required this.ramo,
    required this.idAtividade,
    required this.itensJaSelecionados,
    required this.onItensConfirmados,
  }) : super(key: key);

  @override
  State<ItemSelectorWidget> createState() => _ItemSelectorWidgetState();
}

class _ItemSelectorWidgetState extends State<ItemSelectorWidget> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final AtividadeService _service = AtividadeService();

  late List<Map<String, dynamic>> _listaProgressao;
  late List<Map<String, dynamic>> _listaEspecialidades;

  final Set<String> _selecionadosChaves = {};
  final List<ItemAtividadeModel> _itensSelecionados = [];

  String _filtroTexto = '';

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    _listaProgressao = _service.obterMatrizProgressao(widget.ramo);
    _listaEspecialidades = _service.obterCatalogoEspecialidades();

    // Carregar itens já selecionados
    for (final item in widget.itensJaSelecionados) {
      final key = '${item.tipoItem}_${item.idReferencia}';
      _selecionadosChaves.add(key);
      _itensSelecionados.add(item);
    }
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _toggleItem({
    required String tipoItem,
    required int idReferencia,
    required String titulo,
    String? descricao,
  }) {
    final key = '${tipoItem}_$idReferencia';
    setState(() {
      if (_selecionadosChaves.contains(key)) {
        _selecionadosChaves.remove(key);
        _itensSelecionados.removeWhere((i) => i.tipoItem == tipoItem && i.idReferencia == idReferencia);
      } else {
        _selecionadosChaves.add(key);
        _itensSelecionados.add(
          ItemAtividadeModel(
            idAtividade: widget.idAtividade,
            tipoItem: tipoItem,
            idReferencia: idReferencia,
            tituloItem: titulo,
            descricaoRequisito: descricao,
          ),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Selecionar Itens da Atividade'),
        backgroundColor: const Color(0xFF1B5E20), // Verde Escoteiro
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: Colors.amber,
          tabs: const [
            Tab(icon: Icon(Icons.hiking), text: 'Progressão do Ramo'),
            Tab(icon: Icon(Icons.military_tech), text: 'Especialidades'),
          ],
        ),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Filtrar por nome, requisito ou área...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(8.0)),
                contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              ),
              onChanged: (val) {
                setState(() {
                  _filtroTexto = val.toLowerCase();
                });
              },
            ),
          ),
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildAbaProgressao(),
                _buildAbaEspecialidades(),
              ],
            ),
          ),
          _buildRodapeConfirmacao(),
        ],
      ),
    );
  }

  Widget _buildAbaProgressao() {
    final itensFiltrados = _listaProgressao.where((p) {
      final titulo = (p['titulo'] as String).toLowerCase();
      final eixo = (p['eixo'] as String).toLowerCase();
      return _filtroTexto.isEmpty || titulo.contains(_filtroTexto) || eixo.contains(_filtroTexto);
    }).toList();

    if (itensFiltrados.isEmpty) {
      return const Center(child: Text('Nenhum item de progressão encontrado.'));
    }

    return ListView.builder(
      itemCount: itensFiltrados.length,
      itemBuilder: (context, index) {
        final item = itensFiltrados[index];
        final id = item['id_item'] as int;
        final titulo = item['titulo'] as String;
        final eixo = item['eixo'] as String;
        final descricao = item['descricao'] as String?;
        final key = 'progressao_$id';
        final isSelected = _selecionadosChaves.contains(key);

        return CheckboxListTile(
          value: isSelected,
          activeColor: const Color(0xFF1B5E20),
          title: Text(titulo, style: const TextStyle(fontWeight: FontWeight.bold)),
          subtitle: Text('Eixo: $eixo\n${descricao ?? ""}', maxLines: 2, overflow: TextOverflow.ellipsis),
          secondary: CircleAvatar(
            backgroundColor: Colors.green.shade100,
            child: Text('${index + 1}', style: const TextStyle(color: Colors.green)),
          ),
          onChanged: (_) {
            _toggleItem(
              tipoItem: 'progressao',
              idReferencia: id,
              titulo: titulo,
              descricao: descricao,
            );
          },
        );
      },
    );
  }

  Widget _buildAbaEspecialidades() {
    final itensFiltrados = _listaEspecialidades.where((e) {
      final nome = (e['nome'] as String).toLowerCase();
      final area = (e['area'] as String).toLowerCase();
      return _filtroTexto.isEmpty || nome.contains(_filtroTexto) || area.contains(_filtroTexto);
    }).toList();

    if (itensFiltrados.isEmpty) {
      return const Center(child: Text('Nenhuma especialidade encontrada no catálogo.'));
    }

    return ListView.builder(
      itemCount: itensFiltrados.length,
      itemBuilder: (context, index) {
        final esp = itensFiltrados[index];
        final id = esp['id_especialidade'] as int;
        final nome = esp['nome'] as String;
        final area = esp['area'] as String;
        final totalRequisitos = esp['total_requisitos'] as int? ?? 9;
        final key = 'especialidade_$id';
        final isSelected = _selecionadosChaves.contains(key);

        return CheckboxListTile(
          value: isSelected,
          activeColor: Colors.amber.shade800,
          title: Text(nome, style: const TextStyle(fontWeight: FontWeight.bold)),
          subtitle: Text('Área: $area • $totalRequisitos requisitos cadastrados'),
          secondary: CircleAvatar(
            backgroundColor: Colors.amber.shade100,
            child: const Icon(Icons.star, color: Colors.orange),
          ),
          onChanged: (_) {
            _toggleItem(
              tipoItem: 'especialidade',
              idReferencia: id,
              titulo: 'Especialidade $nome',
              descricao: 'Área: $area',
            );
          },
        );
      },
    );
  }

  Widget _buildRodapeConfirmacao() {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 6,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            '${_itensSelecionados.length} itens vinculados',
            style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
          ),
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF1B5E20),
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            ),
            icon: const Icon(Icons.check),
            label: const Text('Confirmar Seleção'),
            onPressed: () {
              widget.onItensConfirmados(_itensSelecionados);
              Navigator.of(context).pop();
            },
          ),
        ],
      ),
    );
  }
}
