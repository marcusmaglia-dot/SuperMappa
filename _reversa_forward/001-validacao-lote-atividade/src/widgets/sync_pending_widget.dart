// Widget Indicador de Pendencias e Painel de Sincronizacao Offline/Paxtu
// Gerenciado por Reversa Forward — Feature 001 / Tarefa T010

import 'package:flutter/material.dart';

class SyncPendingWidget extends StatefulWidget {
  final int totalPendencias;
  final Future<void> Function() onSincronizar;

  const SyncPendingWidget({
    Key? key,
    required this.totalPendencias,
    required this.onSincronizar,
  }) : super(key: key);

  @override
  State<SyncPendingWidget> createState() => _SyncPendingWidgetState();
}

class _SyncPendingWidgetState extends State<SyncPendingWidget> {
  bool _sincronizando = false;
  String? _mensagemStatus;

  Future<void> _executarSync() async {
    setState(() {
      _sincronizando = true;
      _mensagemStatus = 'Transmitindo validações para o Paxtu...';
    });

    try {
      await widget.onSincronizar();
      if (mounted) {
        setState(() {
          _mensagemStatus = 'Sincronização concluída com sucesso!';
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _mensagemStatus = 'Erro ao sincronizar. As validações continuam seguras no banco offline.';
        });
      }
    } finally {
      if (mounted) {
        setState(() {
          _sincronizando = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (widget.totalPendencias == 0 && _mensagemStatus == null) {
      return Container(
        margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: Colors.green.shade50,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: Colors.green.shade200),
        ),
        child: Row(
          children: const [
            Icon(Icons.cloud_done, color: Colors.green, size: 20),
            SizedBox(width: 8),
            Text(
              'Tudo sincronizado com o Paxtu.',
              style: TextStyle(color: Colors.green, fontWeight: FontWeight.w500, fontSize: 13),
            ),
          ],
        ),
      );
    }

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.orange.shade50,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.orange.shade300),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.cloud_upload_outlined, color: Colors.deepOrange, size: 24),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  '${widget.totalPendencias} homologações salvas localmente',
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                ),
              ),
              if (_sincronizando)
                const SizedBox(
                  width: 20,
                  height: 20,
                  child: CircularProgressIndicator(strokeWidth: 2, color: Colors.deepOrange),
                )
              else
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.deepOrange,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    minimumSize: Size.zero,
                  ),
                  onPressed: widget.totalPendencias > 0 ? _executarSync : null,
                  child: const Text('Enviar ao Paxtu', style: TextStyle(fontSize: 12)),
                ),
            ],
          ),
          if (_mensagemStatus != null) ...[
            const SizedBox(height: 6),
            Text(
              _mensagemStatus!,
              style: TextStyle(
                fontSize: 12,
                color: _mensagemStatus!.contains('sucesso') ? Colors.green.shade800 : Colors.deepOrange.shade800,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
