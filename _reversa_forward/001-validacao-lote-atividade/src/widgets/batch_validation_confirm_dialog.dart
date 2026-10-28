// Dialogo de Confirmacao da Validacao em Lote (1 Clique)
// Gerenciado por Reversa Forward — Feature 001 / Tarefa T009

import 'package:flutter/material.dart';
import '../models/atividade_chamada_model.dart';

class BatchValidationConfirmDialog extends StatelessWidget {
  final AtividadeChamadaModel atividade;
  final VoidCallback onConfirmar;

  const BatchValidationConfirmDialog({
    Key? key,
    required this.atividade,
    required this.onConfirmar,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final presentes = atividade.presencas.where((p) => p.statusPresenca == StatusPresenca.presente).toList();
    final ausentes = atividade.presencas.where((p) => p.statusPresenca == StatusPresenca.ausente).toList();
    final justificados = atividade.presencas.where((p) => p.statusPresenca == StatusPresenca.justificado).toList();

    final totalItens = atividade.itens.length;
    final totalValidacoesEstimadas = presentes.length * totalItens;

    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      title: Row(
        children: const [
          Icon(Icons.bolt, color: Colors.amber, size: 28),
          SizedBox(width: 8),
          Expanded(
            child: Text(
              'Confirmar Validação em 1 Clique',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
        ],
      ),
      content: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Atividade: ${atividade.titulo}',
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            const SizedBox(height: 6),
            Text('Data: ${atividade.dataAtividade} | Ramo: ${atividade.ramo.toUpperCase()}'),
            const Divider(height: 24),
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.green.shade50,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: Colors.green.shade200),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '⚡ $totalValidacoesEstimadas registros de homologação',
                    style: TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: Colors.green.shade900,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${presentes.length} jovens presentes receberão a homologação de $totalItens item(ns) simultaneamente.',
                    style: TextStyle(fontSize: 13, color: Colors.green.shade800),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            const Text(
              'Jovens que serão validados:',
              style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
            ),
            const SizedBox(height: 4),
            Container(
              constraints: const BoxConstraints(maxHeight: 120),
              child: ListView.builder(
                shrinkWrap: true,
                itemCount: presentes.length,
                itemBuilder: (ctx, idx) {
                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 2.0),
                    child: Row(
                      children: [
                        const Icon(Icons.check_circle, size: 16, color: Colors.green),
                        const SizedBox(width: 6),
                        Expanded(child: Text(presentes[idx].nomeAssociado, style: const TextStyle(fontSize: 13))),
                      ],
                    ),
                  );
                },
              ),
            ),
            if (ausentes.isNotEmpty || justificados.isNotEmpty) ...[
              const SizedBox(height: 10),
              Text(
                'Nota: ${ausentes.length} ausente(s) e ${justificados.length} justificado(s) NÃO sofrerão alterações.',
                style: const TextStyle(fontSize: 12, color: Colors.grey, fontStyle: FontStyle.italic),
              ),
            ],
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: Colors.amber.shade50,
                borderRadius: BorderRadius.circular(6),
              ),
              child: Row(
                children: const [
                  Icon(Icons.wifi_off, size: 18, color: Colors.orange),
                  SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      'Modo Offline ativo: a gravação local é imediata. A sincronização com o Paxtu ocorrerá assim que houver sinal de internet.',
                      style: TextStyle(fontSize: 11, color: Colors.black87),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Cancelar', style: TextStyle(color: Colors.grey)),
        ),
        ElevatedButton.icon(
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF1B5E20),
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          ),
          icon: const Icon(Icons.done_all),
          label: const Text('Validar em Lote Agora'),
          onPressed: () {
            Navigator.of(context).pop();
            onConfirmar();
          },
        ),
      ],
    );
  }
}
