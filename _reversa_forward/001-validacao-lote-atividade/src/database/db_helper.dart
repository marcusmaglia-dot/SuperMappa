// Database Helper para SQLite Local (sqflite)
// Gerenciado por Reversa Forward — Feature 001: Validação em Lote por Atividade
import 'dart:async';

class DbHelper {
  static const String databaseName = 'mappa_local.db';
  static const int databaseVersion = 1;

  // Singleton pattern
  static final DbHelper instance = DbHelper._internal();
  DbHelper._internal();

  /// Script de criação das tabelas locais
  static const String createSchemaSql = '''
    -- Catálogo Offline de Especialidades
    CREATE TABLE IF NOT EXISTS catalogo_especialidades (
      id_especialidade INTEGER PRIMARY KEY,
      nome TEXT NOT NULL,
      ramo_conhecimento TEXT NOT NULL,
      icone_url TEXT
    );

    CREATE TABLE IF NOT EXISTS catalogo_itens_especialidade (
      id_item INTEGER PRIMARY KEY,
      id_especialidade INTEGER NOT NULL,
      ordem INTEGER NOT NULL,
      descricao TEXT NOT NULL,
      FOREIGN KEY (id_especialidade) REFERENCES catalogo_especialidades(id_especialidade)
    );

    -- Catálogo Offline de Progressão e Competências
    CREATE TABLE IF NOT EXISTS catalogo_blocos (
      id_bloco INTEGER PRIMARY KEY,
      ramo TEXT NOT NULL,
      nome_bloco TEXT NOT NULL,
      ordem INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS catalogo_competencias (
      id_competencia INTEGER PRIMARY KEY,
      id_bloco INTEGER NOT NULL,
      eixo TEXT NOT NULL, -- Conhecer, Fazer, Conviver, Ser
      descricao TEXT NOT NULL,
      FOREIGN KEY (id_bloco) REFERENCES catalogo_blocos(id_bloco)
    );

    CREATE TABLE IF NOT EXISTS catalogo_itens_competencia (
      id_item INTEGER PRIMARY KEY,
      id_competencia INTEGER NOT NULL,
      ordem INTEGER NOT NULL,
      descricao TEXT NOT NULL,
      FOREIGN KEY (id_competencia) REFERENCES catalogo_competencias(id_competencia)
    );

    -- Jovens da Seção (Cache Local)
    CREATE TABLE IF NOT EXISTS jovens_secao (
      id_associado INTEGER PRIMARY KEY,
      registro_ueb TEXT NOT NULL,
      nome_completo TEXT NOT NULL,
      ramo TEXT NOT NULL,
      patrulha TEXT,
      foto_url TEXT
    );

    -- Histórico Local de Conquistas do Jovem
    CREATE TABLE IF NOT EXISTS associado_itens_conquistados (
      id_associado INTEGER NOT NULL,
      tipo_item TEXT NOT NULL, -- 'progressao' | 'especialidade'
      id_referencia INTEGER NOT NULL,
      data_conquista TEXT NOT NULL,
      PRIMARY KEY (id_associado, tipo_item, id_referencia)
    );

    -- Atividades e Chamada em Lote
    CREATE TABLE IF NOT EXISTS atividades_chamada (
      id_atividade INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      data_atividade TEXT NOT NULL,
      id_secao INTEGER NOT NULL,
      ramo TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'planejada', -- planejada, concluida, sincronizada
      criado_em TEXT NOT NULL,
      concluido_em TEXT
    );

    CREATE TABLE IF NOT EXISTS presencas_atividade (
      id_presenca INTEGER PRIMARY KEY AUTOINCREMENT,
      id_atividade INTEGER NOT NULL,
      id_associado INTEGER NOT NULL,
      nome_associado TEXT NOT NULL,
      status_presenca TEXT NOT NULL DEFAULT 'presente', -- presente, ausente, justificado
      FOREIGN KEY (id_atividade) REFERENCES atividades_chamada(id_atividade) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS itens_atividade (
      id_item_atividade INTEGER PRIMARY KEY AUTOINCREMENT,
      id_atividade INTEGER NOT NULL,
      tipo_item TEXT NOT NULL, -- 'progressao' | 'especialidade'
      id_referencia INTEGER NOT NULL,
      titulo_item TEXT NOT NULL,
      descricao_requisito TEXT,
      FOREIGN KEY (id_atividade) REFERENCES atividades_chamada(id_atividade) ON DELETE CASCADE
    );

    -- Fila de Sincronização com o Paxtu
    CREATE TABLE IF NOT EXISTS fila_sincronizacao_paxtu (
      id_fila INTEGER PRIMARY KEY AUTOINCREMENT,
      id_atividade INTEGER NOT NULL,
      id_associado INTEGER NOT NULL,
      id_item INTEGER NOT NULL,
      tipo_item TEXT NOT NULL,
      status_envio TEXT NOT NULL DEFAULT 'pendente', -- pendente, enviado, erro
      tentativas INTEGER NOT NULL DEFAULT 0,
      erro_mensagem TEXT,
      criado_em TEXT NOT NULL
    );
  ''';
}
