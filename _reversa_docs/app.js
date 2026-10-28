// SuperMappa — Lógica da Aplicação Web Completa & Visualizador de Specs SDD
// Baseado na Engenharia Reversa do mAPPa e Feature 001 (Validação em Lote)

// Catálogo de Dados Extraído do Sistema Legado
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

const JOVENS_SECAO = [
  { id: 151181301, registro: "1511813-1", nome: "Gabriel Santos Ferreira", patrulha: "Lobo", ramo: "Escoteiro" },
  { id: 151181302, registro: "1511813-2", nome: "Helena Oliveira Rocha", patrulha: "Lobo", ramo: "Escoteiro" },
  { id: 151181303, registro: "1511813-3", nome: "Lucas Silva Mendes", patrulha: "Águia", ramo: "Escoteiro" },
  { id: 151181304, registro: "1511813-4", nome: "Beatriz Lima Souza", patrulha: "Águia", ramo: "Escoteiro" },
  { id: 151181305, registro: "1511813-5", nome: "Thiago Nogueira Duarte", patrulha: "Touro", ramo: "Escoteiro" },
  { id: 151181306, registro: "1511813-6", nome: "Mariana Castro Ramos", patrulha: "Touro", ramo: "Escoteiro" }
];

// Estado da Aplicação
class SuperMappaState {
  constructor() {
    this.carregarDadosLocais();
    if (!this.atividadeAtual) {
      this.resetarAtividade();
    }
  }

  resetarAtividade() {
    this.atividadeAtual = {
      titulo: "Atividade de Campo: Pioneiria e Segurança",
      data: new Date().toISOString().split('T')[0],
      ramo: "Escoteiro",
      descricao: "Treinamento prático de amarras, nós e primeiros socorros em patrulhas.",
      status: "planejada",
      itensTrabalhados: [
        { id: 1011, tipo: "especialidade", titulo: "Pioneirismo — Nó direito, escota e volta da ribeira", refId: 1011 },
        { id: 20121, tipo: "progressao", titulo: "Pista/Trilha [Fazer] — Montar barraca de patrulha", refId: 20121 }
      ],
      presencas: JOVENS_SECAO.map(j => ({
        idAssociado: j.id,
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
      const saved = localStorage.getItem('supermappa_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.atividadeAtual = parsed.atividadeAtual;
        this.filaEnvio = parsed.filaEnvio || [];
        this.conquistasHomologadas = new Set(parsed.conquistasHomologadas || []);
        this.historicoAtividades = parsed.historicoAtividades || [];
        return;
      }
    } catch (e) {
      console.warn("Iniciando com estado novo:", e);
    }
    this.filaEnvio = [];
    this.conquistasHomologadas = new Set();
    this.historicoAtividades = [];
  }

  salvarDadosLocais() {
    try {
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
}

const appState = new SuperMappaState();

// Inicialização da UI
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupFormBindings();
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

// Renderização dos Contadores
function renderCounters() {
  const presencas = appState.atividadeAtual.presencas;
  const presentes = presencas.filter(p => p.status === 'presente').length;
  const ausentes = presencas.filter(p => p.status === 'ausente').length;
  const justificados = presencas.filter(p => p.status === 'justificado').length;
  const totalItens = appState.atividadeAtual.itensTrabalhados.length;
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
  if (appState.atividadeAtual.itensTrabalhados.length === 0) {
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

// Renderizar Tabela de Presença/Chamada
function renderTabelaChamada() {
  const tbody = document.getElementById('attendance-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  appState.atividadeAtual.presencas.forEach(p => {
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

// Seletor Modal de Itens Pedagógicos
let modalTabAtiva = 'progressao';
let itensSelecionadosTemp = [];

function abrirModalSeletorItens() {
  const modal = document.getElementById('modal-seletor-itens');
  if (!modal) return;

  itensSelecionadosTemp = [...appState.atividadeAtual.itensTrabalhados];
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
  if (appState.atividadeAtual.itensTrabalhados.length === 0) {
    alert("Selecione ao menos um item pedagógico trabalhado nesta atividade antes de homologar.");
    return;
  }

  const presentes = appState.atividadeAtual.presencas.filter(p => p.status === 'presente');
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
          tentativas: 0,
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
    timestamp: new Date().toISOString()
  });

  appState.atividadeAtual.status = 'concluida';
  appState.salvarDadosLocais();

  renderCounters();
  renderFilaSync();

  // Exibir Feedback Toast
  alert(`⚡ Validação em Lote Concluída com Sucesso!\n\n✔ ${totalProcessados} homologações geradas e salvas no banco offline.\nℹ ${totalIgnoradosDuplicados} itens já homologados foram preservados (regra de idempotência).\n\nAs ações estão enfileiradas e seguras para sincronização com o Paxtu!`);
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

// Limpar Fila
function limparFilaConcluida() {
  appState.filaEnvio = appState.filaEnvio.filter(f => f.statusEnvio === 'pendente');
  appState.salvarDadosLocais();
  renderFilaSync();
}
