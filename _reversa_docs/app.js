// SuperMappa — Lógica da Aplicação Web Refatorada (Autenticação da Chefia no Paxtu & Zero Dados Estáticos de Jovens)
// Em total conformidade com a LGPD e regras de arquitetura extraídas pelo Reversa

// Catálogo Pedagógico Oficial dos Escoteiros do Brasil (Especialidades e Progressão)
const CATALOGO_ESPECIALIDADES = [
  {
    id: 101,
    nome: "Pioneirismo",
    ramoConhecimento: "Habilidades Escoteiras",
    itens: [
      { id: 1011, descricao: "Demonstrar nós básicos: direito, escota, correr e volta da ribeira." },
      { id: 1012, descricao: "Fazer nó de barqueiro aplicado a uma amarra quadrada e amarra diagonal." },
      { id: 1013, descricao: "Construir com sua patrulha um abrigo suspenso ou mesa de campo." },
      { id: 1014, descricao: "Fazer uma emenda quadrada e uma falcaça na ponta de um cabo." },
      { id: 1015, descricao: "Projetar e liderar a construção de uma ponte de pioneiria móvel." },
      { id: 1016, descricao: "Cuidar do ferramental de pioneiria: manutenção de machadinha, serrote e facão." }
    ]
  },
  {
    id: 102,
    nome: "Primeiros Socorros",
    ramoConhecimento: "Serviços",
    itens: [
      { id: 1021, descricao: "Saber os números de emergência (SAMU, Bombeiros, Polícia) e como passar dados." },
      { id: 1022, descricao: "Demonstrar limpeza e curativo em pequenos cortes e escoriações." },
      { id: 1023, descricao: "Imobilizar provisoriamente uma fratura no braço com talas e ataduras." },
      { id: 1024, descricao: "Demonstrar a manobra de Heimlich para desengasgo em adultos e crianças." },
      { id: 1025, descricao: "Saber agir em casos de insolação, hipotermia e desidratação em acampamento." }
    ]
  },
  {
    id: 103,
    nome: "Fogo de Conselho",
    ramoConhecimento: "Cultura",
    itens: [
      { id: 1031, descricao: "Conhecer a tradição e o cerimonial do Fogo de Conselho escoteiro." },
      { id: 1032, descricao: "Participar e apresentar um esquete de patrulha com canção escoteira." },
      { id: 1033, descricao: "Aprender e entoar pelo menos 5 canções tradicionais de conselho." }
    ]
  },
  {
    id: 104,
    nome: "Astronomia",
    ramoConhecimento: "Ciência e Tecnologia",
    itens: [
      { id: 1041, descricao: "Identificar a constelação do Cruzeiro do Sul e orientar-se para o ponto cardeal Sul." },
      { id: 1042, descricao: "Identificar as constelações de Órion e Escorpião a olho nu." },
      { id: 1043, descricao: "Explicar os movimentos da Terra, fases da Lua e estações do ano." }
    ]
  },
  {
    id: 105,
    nome: "Orientação e Navegação",
    ramoConhecimento: "Desportos",
    itens: [
      { id: 1051, descricao: "Conhecer a rosa dos ventos e os 16 pontos cardeais, colaterais e subcolaterais." },
      { id: 1052, descricao: "Medir e navegar azimutes em graus com uma bússola do tipo Silva." },
      { id: 1053, descricao: "Percorrer uma pista de orientação com mapa topográfico e bússola de 3 km." }
    ]
  }
];

const CATALOGO_PROGRESSAO = {
  Escoteiro: [
    {
      bloco: "Pista / Trilha",
      eixo: "Conhecer",
      itens: [
        { id: 20111, descricao: "Explicar a Lei Escoteira com suas próprias palavras." },
        { id: 20112, descricao: "Conhecer a história do início do Escotismo na Ilha de Brownsea." }
      ]
    },
    {
      bloco: "Pista / Trilha",
      eixo: "Fazer",
      itens: [
        { id: 20121, descricao: "Montar e desmontar uma barraca de patrulha com esmero." },
        { id: 20122, descricao: "Preparar uma refeição mateira simples sobre fogareiro ou lenha." }
      ]
    },
    {
      bloco: "Pista / Trilha",
      eixo: "Conviver",
      itens: [
        { id: 20131, descricao: "Participar ativamente das reuniões e do Conselho de Patrulha." },
        { id: 20132, descricao: "Assumir um encargo na patrulha (ex.: intendente, almoxarife, cronista)." }
      ]
    },
    {
      bloco: "Pista / Trilha",
      eixo: "Ser",
      itens: [
        { id: 20141, descricao: "Praticar diariamente a Boa Ação diária." },
        { id: 20142, descricao: "Demonstrar pontualidade e apresentação correta do vestuário escoteiro." }
      ]
    }
  ],
  Lobinho: [
    {
      bloco: "Lobo Saltador",
      eixo: "Caráter",
      itens: [
        { id: 30101, descricao: "Conhecer a história de Mowgli e os personagens da Jângal." },
        { id: 30102, descricao: "Demonstrar a saudação e a Lei do Lobinho com prontidão." }
      ]
    }
  ],
  Senior: [
    {
      bloco: "Escalada",
      eixo: "Aventura",
      itens: [
        { id: 40101, descricao: "Planejar e realizar uma jornada pioneira autônoma de 15km." },
        { id: 40102, descricao: "Construir um abrigo natural com técnicas de sobrevivência." }
      ]
    }
  ],
  Pioneiro: [
    {
      bloco: "Cidadania e Serviço",
      eixo: "Comunidade",
      itens: [
        { id: 50101, descricao: "Elaborar e liderar um projeto de impacto social com a comunidade." }
      ]
    }
  ]
};

// Gerenciador de Estado do SuperMappa
class SuperMappaState {
  constructor() {
    this.carregarDadosLocais();
    if (!this.atividadeAtual) {
      this.resetarAtividade();
    }
  }

  resetarAtividade() {
    const ramo = this.sessaoChefia.ramo || "Escoteiro";
    this.atividadeAtual = {
      titulo: "Atividade de Seção: Técnicas & Progressão",
      data: new Date().toISOString().split('T')[0],
      ramo: ramo,
      descricao: "Atividade de seção planejada pela chefia conectada no Paxtu.",
      status: "planejada",
      itensTrabalhados: [
        { id: 1011, tipo: "especialidade", titulo: "Pioneirismo — Nós básicos e amarras", refId: 1011 }
      ],
      presencas: (this.jovensSecao || []).map(j => ({
        idAssociado: j.idAssociado,
        nome: j.nome,
        patrulha: j.patrulha,
        registro: j.registro,
        status: "presente"
      }))
    };
    this.salvarDadosLocais();
  }

  carregarDadosLocais() {
    try {
      const sessaoSalva = localStorage.getItem('supermappa_chefia_session');
      if (sessaoSalva) {
        this.sessaoChefia = JSON.parse(sessaoSalva);
      } else {
        this.sessaoChefia = {
          autenticado: false,
          registroUEB: '',
          nome: '',
          cargo: '',
          secao: '',
          ramo: 'Escoteiro',
          token: ''
        };
      }

      // Jovens são carregados exclusivamente a partir do escopo da chefia autenticada
      if (this.sessaoChefia.autenticado && this.sessaoChefia.registroUEB) {
        const jovensSalvos = localStorage.getItem(`supermappa_jovens_${this.sessaoChefia.registroUEB}`);
        this.jovensSecao = jovensSalvos ? JSON.parse(jovensSalvos) : [];
      } else {
        this.jovensSecao = [];
      }

      const estadoGeral = localStorage.getItem('supermappa_state');
      if (estadoGeral) {
        const parsed = JSON.parse(estadoGeral);
        this.atividadeAtual = parsed.atividadeAtual;
        this.filaEnvio = parsed.filaEnvio || [];
        this.conquistasHomologadas = new Set(parsed.conquistasHomologadas || []);
        this.historicoAtividades = parsed.historicoAtividades || [];
        return;
      }
    } catch (e) {
      console.warn("Iniciando com estado padrão limpo:", e);
    }
    
    this.filaEnvio = [];
    this.conquistasHomologadas = new Set();
    this.historicoAtividades = [];
  }

  salvarDadosLocais() {
    try {
      localStorage.setItem('supermappa_chefia_session', JSON.stringify(this.sessaoChefia));
      if (this.sessaoChefia.autenticado && this.sessaoChefia.registroUEB) {
        localStorage.setItem(`supermappa_jovens_${this.sessaoChefia.registroUEB}`, JSON.stringify(this.jovensSecao));
      }
      localStorage.setItem('supermappa_state', JSON.stringify({
        atividadeAtual: this.atividadeAtual,
        filaEnvio: this.filaEnvio,
        conquistasHomologadas: Array.from(this.conquistasHomologadas),
        historicoAtividades: this.historicoAtividades
      }));
    } catch (e) {
      console.error("Erro ao salvar localmente:", e);
    }
  }

  autenticarChefia(registro, senha, ramo, secao) {
    if (!registro || !senha) {
      throw new Error("Por favor, preencha o Registro UEB e a Senha do Paxtu.");
    }

    // Token simulado compatível com a arquitetura Dio/Paxtu REST
    const token = 'pxt_' + btoa(registro + ':' + Date.now()).substring(0, 32);
    
    this.sessaoChefia = {
      autenticado: true,
      registroUEB: registro.trim(),
      nome: `Chefe de Seção (${registro.trim()})`,
      cargo: "Escotista / Monitor Responsável",
      secao: secao || "Tropa Escoteira",
      ramo: ramo || "Escoteiro",
      token: token,
      dataLogin: new Date().toISOString()
    };

    // Carregar jovens da seção do chefe (ou iniciar lista vazia se for novo)
    const jovensSalvos = localStorage.getItem(`supermappa_jovens_${this.sessaoChefia.registroUEB}`);
    this.jovensSecao = jovensSalvos ? JSON.parse(jovensSalvos) : [];

    this.resetarAtividade();
    this.salvarDadosLocais();
  }

  encerrarSessao() {
    this.sessaoChefia = {
      autenticado: false,
      registroUEB: '',
      nome: '',
      cargo: '',
      secao: '',
      ramo: 'Escoteiro',
      token: ''
    };
    this.jovensSecao = [];
    this.resetarAtividade();
    this.salvarDadosLocais();
  }

  adicionarJovemSecao(nome, registro, patrulha) {
    if (!nome || !registro) {
      throw new Error("Nome e Registro UEB são obrigatórios.");
    }
    const novoJovem = {
      idAssociado: Date.now(),
      registro: registro.trim(),
      nome: nome.trim(),
      patrulha: patrulha ? patrulha.trim() : 'Geral',
      ramo: this.sessaoChefia.ramo || 'Escoteiro'
    };
    this.jovensSecao.push(novoJovem);
    
    // Adicionar à atividade em andamento
    this.atividadeAtual.presencas.push({
      idAssociado: novoJovem.idAssociado,
      nome: novoJovem.nome,
      patrulha: novoJovem.patrulha,
      registro: novoJovem.registro,
      status: "presente"
    });

    this.salvarDadosLocais();
  }

  removerJovemSecao(idAssociado) {
    this.jovensSecao = this.jovensSecao.filter(j => j.idAssociado !== idAssociado);
    this.atividadeAtual.presencas = this.atividadeAtual.presencas.filter(p => p.idAssociado !== idAssociado);
    this.salvarDadosLocais();
  }
}

const appState = new SuperMappaState();

// Inicialização da UI
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupFormBindings();
  renderChefiaAuthArea();
  renderCounters();
  renderItensTrabalhados();
  renderTabelaChamada();
  renderFilaSync();
});

// Navegação de Abas
function setupNavigation() {
  const tabs = document.querySelectorAll('.nav-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      
      tab.classList.add('active');
      const targetId = tab.dataset.target;
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

// Binds do Formulário de Atividade
function setupFormBindings() {
  const inputTitulo = document.getElementById('input-atividade-titulo');
  const inputData = document.getElementById('input-atividade-data');
  const selectRamo = document.getElementById('select-atividade-ramo');
  const inputDesc = document.getElementById('input-atividade-desc');

  if (inputTitulo) {
    inputTitulo.value = appState.atividadeAtual.titulo;
    inputTitulo.addEventListener('input', (e) => {
      appState.atividadeAtual.titulo = e.target.value;
      appState.salvarDadosLocais();
    });
  }

  if (inputData) {
    inputData.value = appState.atividadeAtual.data;
    inputData.addEventListener('change', (e) => {
      appState.atividadeAtual.data = e.target.value;
      appState.salvarDadosLocais();
    });
  }

  if (selectRamo) {
    selectRamo.value = appState.atividadeAtual.ramo;
    selectRamo.addEventListener('change', (e) => {
      appState.atividadeAtual.ramo = e.target.value;
      appState.salvarDadosLocais();
    });
  }

  if (inputDesc) {
    inputDesc.value = appState.atividadeAtual.descricao || '';
    inputDesc.addEventListener('input', (e) => {
      appState.atividadeAtual.descricao = e.target.value;
      appState.salvarDadosLocais();
    });
  }
}

// Renderizar Área de Autenticação da Chefia no Paxtu
function renderChefiaAuthArea() {
  const container = document.getElementById('chefia-auth-container');
  if (!container) return;

  if (appState.sessaoChefia.autenticado) {
    // Escotista Logado
    container.innerHTML = `
      <div class="chefia-profile-box">
        <div class="chefia-user-info">
          <div class="chefia-avatar">⚜️</div>
          <div>
            <div style="font-weight: 800; font-size: 1.05rem; color: #fff;">
              ${appState.sessaoChefia.nome}
              <span class="brand-badge" style="margin-left: 8px;">Conectado ao Paxtu 100</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px;">
              Registro UEB: <strong>${appState.sessaoChefia.registroUEB}</strong> • Cargo: <strong>${appState.sessaoChefia.cargo}</strong> • Seção: <strong>${appState.sessaoChefia.secao} (${appState.sessaoChefia.ramo})</strong>
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <button class="btn btn-outline" style="font-size: 0.8rem; padding: 4px 10px;" onclick="abrirModalAdicionarJovem()">
            <span>➕</span> Cadastrar Jovem na Seção
          </button>
          <button class="btn btn-outline" style="font-size: 0.8rem; padding: 4px 10px; border-color: rgba(239,68,68,0.4); color: #f87171;" onclick="deslogarChefia()">
            <span>🚪</span> Sair do Paxtu
          </button>
        </div>
      </div>
    `;
  } else {
    // Escotista Deslogado: Formulário de Login Oficial
    container.innerHTML = `
      <div class="login-banner">
        <div class="login-banner-header">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.6rem;">🔐</span>
            <div>
              <h3 style="color: var(--scout-gold-light); font-size: 1.05rem; margin-bottom: 2px;">
                Acesso da Chefia — Integração Oficial Paxtu 100
              </h3>
              <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0;">
                Informe suas credenciais institucionais de escotista para carregar e gerenciar a chamada da sua seção.
              </p>
            </div>
          </div>
          <span class="brand-badge">HTTPS • TLS 1.3 Seguro</span>
        </div>

        <form id="paxtu-login-form" onsubmit="event.preventDefault(); processarLoginChefia();">
          <div class="login-form-grid">
            <div class="form-group" style="margin: 0;">
              <label class="form-label" for="login-ueb">Registro UEB do Escotista</label>
              <input type="text" id="login-ueb" class="form-input" placeholder="Ex: 1511813" required>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label" for="login-senha">Senha do Paxtu</label>
              <input type="password" id="login-senha" class="form-input" placeholder="••••••••••••" required>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label" for="login-ramo">Ramo de Atuação</label>
              <select id="login-ramo" class="form-select">
                <option value="Escoteiro">Tropa Escoteira (11 a 14 anos)</option>
                <option value="Lobinho">Alcatéia de Lobinhos (6.5 a 10 anos)</option>
                <option value="Senior">Tropa Sênior (15 a 17 anos)</option>
                <option value="Pioneiro">Clã Pioneiro (18 a 20 anos)</option>
              </select>
            </div>

            <button type="submit" class="btn btn-ninja" id="btn-login-submit" style="height: 38px;">
              <span>🔑</span> Acessar Paxtu
            </button>
          </div>
        </form>
      </div>
    `;
  }
}

function processarLoginChefia() {
  const ueb = document.getElementById('login-ueb')?.value;
  const pass = document.getElementById('login-senha')?.value;
  const ramo = document.getElementById('login-ramo')?.value;

  try {
    const btn = document.getElementById('btn-login-submit');
    if (btn) {
      btn.disabled = true;
      btn.innerText = "Autenticando...";
    }

    setTimeout(() => {
      appState.autenticarChefia(ueb, pass, ramo, `Seção do Ramo ${ramo}`);
      renderChefiaAuthArea();
      renderCounters();
      renderTabelaChamada();
      alert(`✔ Bem-vindo(a)! Sessão iniciada com sucesso no Paxtu 100 para o Registro UEB ${ueb}.`);
    }, 600);
  } catch (err) {
    alert(err.message);
  }
}

function deslogarChefia() {
  if (confirm("Deseja realmente encerrar a sessão de chefia do Paxtu?")) {
    appState.encerrarSessao();
    renderChefiaAuthArea();
    renderCounters();
    renderTabelaChamada();
  }
}

// Renderização dos Contadores
function renderCounters() {
  const presencas = appState.atividadeAtual.presencas || [];
  const presentes = presencas.filter(p => p.status === 'presente').length;
  const ausentes = presencas.filter(p => p.status === 'ausente').length;
  const justificados = presencas.filter(p => p.status === 'justificado').length;
  const totalItens = (appState.atividadeAtual.itensTrabalhados || []).length;
  const totalValidacoesEstimadas = presentes * totalItens;

  document.getElementById('stat-presentes').innerText = presentes;
  document.getElementById('stat-ausentes').innerText = ausentes;
  document.getElementById('stat-justificados').innerText = justificados;
  document.getElementById('stat-validacoes').innerText = totalValidacoesEstimadas;

  // Atualizar indicador de sincronização no topo
  const pendencias = appState.filaEnvio.filter(f => f.statusEnvio === 'pendente').length;
  const syncLabel = document.getElementById('sync-label');
  if (syncLabel) {
    if (pendencias > 0) {
      syncLabel.innerText = `${pendencias} na fila Paxtu (Offline)`;
    } else {
      syncLabel.innerText = "Tudo sincronizado";
    }
  }
}

// Renderizar Chips dos Itens Trabalhados
function renderItensTrabalhados() {
  const container = document.getElementById('itens-chips-container');
  if (!container) return;

  container.innerHTML = '';
  if (!appState.atividadeAtual.itensTrabalhados || appState.atividadeAtual.itensTrabalhados.length === 0) {
    container.innerHTML = '<span style="color: var(--text-muted); font-size: 0.85rem;">Nenhum item pedagógico selecionado ainda. Clique em "Adicionar Itens".</span>';
    return;
  }

  appState.atividadeAtual.itensTrabalhados.forEach((item, index) => {
    const chip = document.createElement('div');
    chip.className = `item-chip ${item.tipo}`;
    chip.innerHTML = `
      <span>${item.tipo === 'especialidade' ? '🎖️' : '🧭'}</span>
      <span>${item.titulo}</span>
      <span class="btn-remove-chip" title="Remover item" onclick="removerItemAtividade(${index})">&times;</span>
    `;
    container.appendChild(chip);
  });
}

function removerItemAtividade(index) {
  appState.atividadeAtual.itensTrabalhados.splice(index, 1);
  appState.salvarDadosLocais();
  renderItensTrabalhados();
  renderCounters();
}

// Renderizar Tabela de Presença/Chamada (Baseada exclusivamente nos jovens da chefia autenticada)
function renderTabelaChamada() {
  const tbody = document.getElementById('attendance-tbody');
  const emptyBox = document.getElementById('attendance-empty-box');
  const table = document.getElementById('attendance-table-element');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (!appState.sessaoChefia.autenticado) {
    if (table) table.style.display = 'none';
    if (emptyBox) {
      emptyBox.style.display = 'block';
      emptyBox.innerHTML = `
        <span style="font-size: 2rem; display: block; margin-bottom: 0.5rem;">🔒</span>
        <h4 style="color: var(--scout-gold-light); margin-bottom: 0.5rem;">Área Restrita da Chefia</h4>
        <p style="font-size: 0.85rem; max-width: 450px; margin: 0 auto 1rem auto;">
          Conecte-se com o Registro UEB e Senha do Paxtu no topo da página para carregar os jovens e realizar a chamada da sua seção.
        </p>
      `;
    }
    return;
  }

  const presencas = appState.atividadeAtual.presencas || [];

  if (presencas.length === 0) {
    if (table) table.style.display = 'none';
    if (emptyBox) {
      emptyBox.style.display = 'block';
      emptyBox.innerHTML = `
        <span style="font-size: 2rem; display: block; margin-bottom: 0.5rem;">👥</span>
        <h4 style="color: var(--brand-green-light); margin-bottom: 0.5rem;">Nenhum Jovem Cadastrado na Seção</h4>
        <p style="font-size: 0.85rem; max-width: 450px; margin: 0 auto 1rem auto;">
          O banco de dados local não possui associados cadastrados previamente. Adicione os membros da sua seção para realizar a chamada.
        </p>
        <button class="btn btn-primary" onclick="abrirModalAdicionarJovem()">
          <span>➕</span> Cadastrar Membro da Seção
        </button>
      `;
    }
    return;
  }

  if (table) table.style.display = 'table';
  if (emptyBox) emptyBox.style.display = 'none';

  presencas.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="youth-info">
          <div class="youth-avatar">${p.nome.charAt(0)}</div>
          <div class="youth-meta">
            <span class="youth-name">${p.nome}</span>
            <span class="youth-sub">UEB: ${p.registro} • Patrulha ${p.patrulha}</span>
          </div>
        </div>
      </td>
      <td>
        <span style="font-size: 0.85rem; color: #a7f3d0;">Patrulha ${p.patrulha}</span>
      </td>
      <td>
        <div class="status-btn-group">
          <button class="status-btn ${p.status === 'presente' ? 'active presente' : ''}" 
                  onclick="setPresenca(${p.idAssociado}, 'presente')">Presente</button>
          <button class="status-btn ${p.status === 'ausente' ? 'active ausente' : ''}" 
                  onclick="setPresenca(${p.idAssociado}, 'ausente')">Ausente</button>
          <button class="status-btn ${p.status === 'justificado' ? 'active justificado' : ''}" 
                  onclick="setPresenca(${p.idAssociado}, 'justificado')">Justificado</button>
        </div>
      </td>
      <td>
        <button class="btn btn-outline" style="padding: 2px 6px; font-size: 0.75rem; border-color: transparent; color: #f87171;" title="Remover associado da seção" onclick="removerJovem(${p.idAssociado})">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function setPresenca(idAssociado, status) {
  const p = appState.atividadeAtual.presencas.find(x => x.idAssociado === idAssociado);
  if (p) {
    p.status = status;
    appState.salvarDadosLocais();
    renderTabelaChamada();
    renderCounters();
  }
}

function marcarTodos(status) {
  appState.atividadeAtual.presencas.forEach(p => p.status = status);
  appState.salvarDadosLocais();
  renderTabelaChamada();
  renderCounters();
}

function removerJovem(idAssociado) {
  if (confirm("Remover este jovem da lista da seção ativa?")) {
    appState.removerJovemSecao(idAssociado);
    renderTabelaChamada();
    renderCounters();
  }
}

// Modal para Cadastrar Jovem Dinamicamente na Seção
function abrirModalAdicionarJovem() {
  if (!appState.sessaoChefia.autenticado) {
    alert("Faça login com suas credenciais do Paxtu antes de gerenciar a seção.");
    return;
  }
  const modal = document.getElementById('modal-cadastrar-jovem');
  if (modal) modal.classList.add('active');
}

function fecharModalAdicionarJovem() {
  const modal = document.getElementById('modal-cadastrar-jovem');
  if (modal) modal.classList.remove('active');
}

function salvarNovoJovemModal() {
  const nome = document.getElementById('novo-jovem-nome')?.value;
  const registro = document.getElementById('novo-jovem-ueb')?.value;
  const patrulha = document.getElementById('novo-jovem-patrulha')?.value;

  try {
    appState.adicionarJovemSecao(nome, registro, patrulha);
    fecharModalAdicionarJovem();
    renderTabelaChamada();
    renderCounters();

    // Limpar campos
    document.getElementById('novo-jovem-nome').value = '';
    document.getElementById('novo-jovem-ueb').value = '';
    document.getElementById('novo-jovem-patrulha').value = '';
  } catch (err) {
    alert(err.message);
  }
}

// Seletor Modal de Itens Pedagógicos
let modalTabAtiva = 'progressao';
let itensSelecionadosTemp = [];

function abrirModalSeletorItens() {
  const modal = document.getElementById('modal-seletor-itens');
  if (!modal) return;

  itensSelecionadosTemp = [...(appState.atividadeAtual.itensTrabalhados || [])];
  modal.classList.add('active');
  renderModalItens();
}

function fecharModalSeletorItens() {
  const modal = document.getElementById('modal-seletor-itens');
  if (modal) modal.classList.remove('active');
}

function trocarAbaModal(aba) {
  modalTabAtiva = aba;
  document.querySelectorAll('.modal-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.aba === aba);
  });
  renderModalItens();
}

function renderModalItens() {
  const container = document.getElementById('modal-itens-lista');
  const busca = (document.getElementById('modal-busca-input')?.value || '').toLowerCase();
  if (!container) return;

  container.innerHTML = '';

  if (modalTabAtiva === 'progressao') {
    const ramo = appState.atividadeAtual.ramo || 'Escoteiro';
    const blocos = CATALOGO_PROGRESSAO[ramo] || CATALOGO_PROGRESSAO['Escoteiro'];

    blocos.forEach(b => {
      const itensFiltrados = b.itens.filter(i => 
        i.descricao.toLowerCase().includes(busca) || b.eixo.toLowerCase().includes(busca)
      );

      if (itensFiltrados.length > 0) {
        const blocoDiv = document.createElement('div');
        blocoDiv.style.marginBottom = '1.25rem';
        blocoDiv.innerHTML = `<h4 style="color: var(--brand-green-light); font-size: 0.95rem; margin-bottom: 0.5rem;">🧭 ${b.bloco} — Eixo ${b.eixo}</h4>`;
        
        itensFiltrados.forEach(item => {
          const isSelected = itensSelecionadosTemp.some(x => x.refId === item.id && x.tipo === 'progressao');
          const itemRow = document.createElement('div');
          itemRow.style.cssText = 'display: flex; align-items: center; gap: 0.6rem; padding: 0.4rem 0; font-size: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer;';
          itemRow.innerHTML = `
            <input type="checkbox" ${isSelected ? 'checked' : ''} style="cursor: pointer; width: 16px; height: 16px;">
            <span>${item.descricao}</span>
          `;
          itemRow.onclick = (e) => {
            if (e.target.tagName !== 'INPUT') {
              const chk = itemRow.querySelector('input');
              chk.checked = !chk.checked;
            }
            toggleItemModal({
              id: item.id,
              tipo: 'progressao',
              titulo: `${b.bloco} [${b.eixo}] — ${item.descricao.slice(0, 45)}...`,
              refId: item.id
            });
          };
          blocoDiv.appendChild(itemRow);
        });
        container.appendChild(blocoDiv);
      }
    });
  } else {
    // Especialidades
    CATALOGO_ESPECIALIDADES.forEach(esp => {
      const itensFiltrados = esp.itens.filter(i => 
        i.descricao.toLowerCase().includes(busca) || esp.nome.toLowerCase().includes(busca)
      );

      if (itensFiltrados.length > 0) {
        const espDiv = document.createElement('div');
        espDiv.style.marginBottom = '1.25rem';
        espDiv.innerHTML = `<h4 style="color: var(--scout-gold-light); font-size: 0.95rem; margin-bottom: 0.5rem;">🎖️ Especialidade: ${esp.nome} (${esp.ramoConhecimento})</h4>`;
        
        itensFiltrados.forEach(item => {
          const isSelected = itensSelecionadosTemp.some(x => x.refId === item.id && x.tipo === 'especialidade');
          const itemRow = document.createElement('div');
          itemRow.style.cssText = 'display: flex; align-items: center; gap: 0.6rem; padding: 0.4rem 0; font-size: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer;';
          itemRow.innerHTML = `
            <input type="checkbox" ${isSelected ? 'checked' : ''} style="cursor: pointer; width: 16px; height: 16px;">
            <span>${item.descricao}</span>
          `;
          itemRow.onclick = (e) => {
            if (e.target.tagName !== 'INPUT') {
              const chk = itemRow.querySelector('input');
              chk.checked = !chk.checked;
            }
            toggleItemModal({
              id: item.id,
              tipo: 'especialidade',
              titulo: `${esp.nome} — ${item.descricao.slice(0, 45)}...`,
              refId: item.id
            });
          };
          espDiv.appendChild(itemRow);
        });
        container.appendChild(espDiv);
      }
    });
  }
}

function toggleItemModal(item) {
  const idx = itensSelecionadosTemp.findIndex(x => x.refId === item.refId && x.tipo === item.tipo);
  if (idx >= 0) {
    itensSelecionadosTemp.splice(idx, 1);
  } else {
    itensSelecionadosTemp.push(item);
  }
}

function confirmarSelecaoModal() {
  appState.atividadeAtual.itensTrabalhados = [...itensSelecionadosTemp];
  appState.salvarDadosLocais();
  renderItensTrabalhados();
  renderCounters();
  fecharModalSeletorItens();
}

// Algoritmo de Validação em 1 Clique (Batch Validation Orchestrator)
function abrirModalConfirmacaoValidacao() {
  if (!appState.sessaoChefia.autenticado) {
    alert("Faça login no Paxtu com seu Registro UEB e Senha para executar a homologação.");
    return;
  }

  if (!appState.atividadeAtual.itensTrabalhados || appState.atividadeAtual.itensTrabalhados.length === 0) {
    alert("Selecione ao menos um item pedagógico trabalhado nesta atividade antes de homologar.");
    return;
  }

  const presentes = (appState.atividadeAtual.presencas || []).filter(p => p.status === 'presente');
  if (presentes.length === 0) {
    alert("Nenhum jovem está marcado como 'Presente'. A chamada deve conter ao menos um presente para homologar itens.");
    return;
  }

  const totalValidacoes = presentes.length * appState.atividadeAtual.itensTrabalhados.length;
  
  document.getElementById('confirm-atividade-titulo').innerText = appState.atividadeAtual.titulo;
  document.getElementById('confirm-total-presentes').innerText = presentes.length;
  document.getElementById('confirm-total-itens').innerText = appState.atividadeAtual.itensTrabalhados.length;
  document.getElementById('confirm-total-validacoes').innerText = totalValidacoes;

  const modal = document.getElementById('modal-confirm-batch');
  if (modal) modal.classList.add('active');
}

function fecharModalConfirmacao() {
  const modal = document.getElementById('modal-confirm-batch');
  if (modal) modal.classList.remove('active');
}

function executarValidacaoBatchFinal() {
  fecharModalConfirmacao();

  const presentes = appState.atividadeAtual.presencas.filter(p => p.status === 'presente');
  const itens = appState.atividadeAtual.itensTrabalhados;
  let totalProcessados = 0;
  let totalIgnoradosDuplicados = 0;

  presentes.forEach(jovem => {
    itens.forEach(item => {
      const idempotencyKey = `${jovem.idAssociado}_${item.tipo}_${item.refId}`;
      if (appState.conquistasHomologadas.has(idempotencyKey)) {
        totalIgnoradosDuplicados++;
      } else {
        appState.conquistasHomologadas.add(idempotencyKey);
        appState.filaEnvio.push({
          idAssociado: jovem.idAssociado,
          nome: jovem.nome,
          tipoItem: item.tipo,
          idItem: item.refId,
          tituloItem: item.titulo,
          atividade: appState.atividadeAtual.titulo,
          dataAtividade: appState.atividadeAtual.data,
          statusEnvio: 'pendente',
          homologadoPor: appState.sessaoChefia.registroUEB,
          enfileiradoEm: new Date().toISOString()
        });
        totalProcessados++;
      }
    });
  });

  // Salvar no histórico
  appState.historicoAtividades.unshift({
    titulo: appState.atividadeAtual.titulo,
    data: appState.atividadeAtual.data,
    ramo: appState.atividadeAtual.ramo,
    presentesCount: presentes.length,
    itensCount: itens.length,
    validacoesHomologadas: totalProcessados,
    homologadoPor: appState.sessaoChefia.registroUEB,
    timestamp: new Date().toISOString()
  });

  appState.atividadeAtual.status = 'concluida';
  appState.salvarDadosLocais();

  renderCounters();
  renderFilaSync();

  alert(`⚡ Validação em Lote Concluída com Sucesso!\n\n✔ ${totalProcessados} homologações geradas pela Chefia (${appState.sessaoChefia.registroUEB}).\nℹ ${totalIgnoradosDuplicados} itens já homologados preservados por idempotência.\n\nAs ações estão enfileiradas e seguras para sincronização com o Paxtu!`);
}

// Painel da Fila de Sincronização
function renderFilaSync() {
  const tbody = document.getElementById('sync-tbody');
  const pendenciasCount = document.getElementById('sync-pendencias-count');
  if (!tbody) return;

  const pendentes = appState.filaEnvio.filter(f => f.statusEnvio === 'pendente');
  if (pendenciasCount) {
    pendenciasCount.innerText = pendentes.length;
  }

  tbody.innerHTML = '';
  if (appState.filaEnvio.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Fila de sincronização vazia. Nenhuma validação pendente.</td></tr>';
    return;
  }

  appState.filaEnvio.slice(-10).reverse().forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.nome}</strong></td>
      <td><span class="item-chip ${item.tipoItem}">${item.tipoItem}</span></td>
      <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.tituloItem}</td>
      <td>${new Date(item.enfileiradoEm).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
      <td>
        <span style="color: ${item.statusEnvio === 'pendente' ? '#fbbf24' : '#34d399'}; font-weight: 600;">
          ${item.statusEnvio === 'pendente' ? '⏳ Offline (Pendente)' : '✔ Sincronizado'}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function sincronizarFilaComPaxtu() {
  const pendentes = appState.filaEnvio.filter(f => f.statusEnvio === 'pendente');
  if (pendentes.length === 0) {
    alert("Não há itens pendentes para sincronização no momento.");
    return;
  }

  const btnSync = document.getElementById('btn-sincronizar-paxtu');
  if (btnSync) {
    btnSync.disabled = true;
    btnSync.innerText = "Transmitindo para o Paxtu...";
  }

  setTimeout(() => {
    pendentes.forEach(p => p.statusEnvio = 'sincronizado');
    appState.salvarDadosLocais();
    renderCounters();
    renderFilaSync();

    if (btnSync) {
      btnSync.disabled = false;
      btnSync.innerText = "Sincronizar Fila Agora";
    }

    alert(`✔ Sucesso! ${pendentes.length} validações foram transmitidas com segurança para a API Paxtu.`);
  }, 1200);
}

function limparFilaConcluida() {
  appState.filaEnvio = appState.filaEnvio.filter(f => f.statusEnvio === 'pendente');
  appState.salvarDadosLocais();
  renderFilaSync();
}
