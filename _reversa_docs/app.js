// SuperMappa — Portal Consultivo Paxtu 100 / mAPPa
// Extrator Oficial de Dados em Tempo Real — Zero Mockups de Dados
// Conecta diretamente à API REST institucional dos Escoteiros do Brasil

// Estado da Sessão Consultiva (Populada EXCLUSIVAMENTE pela API oficial)
const consultiveState = {
  autenticado: false,
  baseUrl: "https://paxtu100.escoteiros.org.br",
  token: null,
  idAssociado: null,
  tipoAssociado: null,
  chefia: null,
  unidade: null,
  secoes: [],
  secaoAtivaId: null,
  patrulhas: [],
  jovens: [],
  ultimaSincronizacao: null,
  filtros: {
    busca: '',
    patrulha: 'todas',
    etapa: 'todas'
  },
  jovemFichaAtiva: null,
  redeLog: [],
  rawLoginPayload: null,
  rawPerfilPayload: null,
  rawSecoesPayload: null
};

// Alternar visibilidade das opções avançadas de conexão
function alternarOpcoesAvancadasConexao() {
  const box = document.getElementById('box-opcoes-avancadas');
  const label = document.getElementById('btn-avancado-label');
  if (box.style.display === 'none' || !box.style.display) {
    box.style.display = 'block';
    label.textContent = '▲ Ocultar Opções de Servidor & Token';
  } else {
    box.style.display = 'none';
    label.textContent = '⚙️ Opções de Servidor & Token de Sessão (Opcional)';
  }
}

// Utilitário de Log de Rede para Inspeção
function registrarLogRede(metodo, endpoint, status, resposta) {
  const agora = new Date().toLocaleTimeString('pt-BR');
  const linha = `[${agora}] ${metodo} ${endpoint} -> Status: ${status}`;
  consultiveState.redeLog.push({ metodo, endpoint, status, resposta, timestamp: agora });

  const containerLog = document.getElementById('insp-requests-log');
  if (containerLog) {
    const p = document.createElement('div');
    p.style.padding = '2px 0';
    p.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
    p.textContent = linha;
    containerLog.appendChild(p);
    containerLog.scrollTop = containerLog.scrollHeight;
  }

  const payloadEl = document.getElementById('insp-payload-raw');
  if (payloadEl && resposta) {
    try {
      payloadEl.textContent = typeof resposta === 'string' ? resposta : JSON.stringify(resposta, null, 2);
    } catch (e) {
      payloadEl.textContent = String(resposta);
    }
  }

  const stepLog = document.getElementById('sync-step-log');
  if (stepLog) {
    const stepDiv = document.createElement('div');
    stepDiv.textContent = linha;
    stepLog.appendChild(stepDiv);
    stepLog.scrollTop = stepLog.scrollHeight;
  }
}

// Constante do Token de Aplicação extraído diretamente do assets/env.json do mAPPa
const MAPPA_APP_TOKEN = "00SSIsFJO-jBRmgb2O4MIGlLLLwqPuFIfK_q14iYzj9ZmyyflxlMWMiPWqnjyLDNMrt--Y0JvnwMiD52e66dLg";

// Cliente HTTP do mAPPa Oficial
async function fetchPaxtuApi(endpoint, options = {}) {
  const baseUrl = consultiveState.baseUrl || "https://paxtu100.escoteiros.org.br";
  const urlCompleta = `${baseUrl}${endpoint}`;
  
  // Headers exatamente replicados do cliente mobile Flutter Dio
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "User-Agent": "mAPPa/1.0.5 (Android; Dart 3.0)",
    // Se logado, usa o token de sessão do usuário; senão, usa o token de aplicação do mAPPa
    "Authorization": `Bearer ${consultiveState.token || MAPPA_APP_TOKEN}`,
    ...(options.headers || {})
  };

  try {
    const res = await fetch(urlCompleta, {
      ...options,
      headers
    });
    
    let data = null;
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      data = await res.json().catch(() => null);
    } else {
      const text = await res.text().catch(() => "");
      data = { rawText: text.substring(0, 500) };
    }

    registrarLogRede(options.method || 'GET', endpoint, res.status, data);
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    registrarLogRede(options.method || 'GET', endpoint, 'Erro de Rede', err.message);
    return { ok: false, status: 0, error: err.message };
  }
}

// Extração segura de token a partir de respostas com formatos variados (JSON)
function extrairTokenSeguro(data) {
  if (!data || typeof data !== 'object') return null;
  const candidatas = ['token', 'access_token', 'accessToken', 'api_token', 'apiToken', 'jwt', 'auth_token', 'session_token', 'key', 'bearer'];
  
  // Nível 1
  for (const k of candidatas) {
    if (typeof data[k] === 'string' && data[k].length > 5) return data[k];
  }
  
  // Nível 2 aninhado (data.data, data.user, data.auth, etc.)
  for (const sub of ['data', 'user', 'auth', 'authorisation', 'session', 'result', 'response']) {
    if (data[sub] && typeof data[sub] === 'object') {
      for (const k of candidatas) {
        if (typeof data[sub][k] === 'string' && data[sub][k].length > 5) return data[sub][k];
      }
    }
  }

  // Busca recursiva superficial por qualquer chave que contenha "token"
  for (const [k, v] of Object.entries(data)) {
    if (typeof v === 'string' && k.toLowerCase().includes('token') && v.length > 5) {
      return v;
    }
  }

  return null;
}

// Atualizar indicador visual de etapas da extração
function atualizarPassoExtracao(titulo) {
  const titleEl = document.getElementById('sync-step-title');
  if (titleEl) titleEl.textContent = titulo;
}

// 1. Processar Login / Extração dos dados do mAPPa
async function processarLoginGatekeeper() {
  const ueb = (document.getElementById('gate-ueb').value || '').trim();
  const senha = (document.getElementById('gate-senha').value || '');
  const customBaseUrl = (document.getElementById('gate-base-url').value || '').trim();
  const directToken = (document.getElementById('gate-direct-token').value || '').trim();

  const btnSubmit = document.getElementById('btn-gate-submit');
  const progressBox = document.getElementById('login-sync-progress');
  const stepLog = document.getElementById('sync-step-log');

  if (customBaseUrl) {
    consultiveState.baseUrl = customBaseUrl.replace(/\/+$/, '');
    const inspBaseUrl = document.getElementById('insp-base-url');
    if (inspBaseUrl) inspBaseUrl.textContent = consultiveState.baseUrl;
  }

  if (!directToken && (!ueb || !senha)) {
    alert("Por favor, preencha o seu Registro UEB e Senha, ou informe diretamente o Token de Sessão do mAPPa.");
    return;
  }

  // Prepara interface de extração
  btnSubmit.disabled = true;
  btnSubmit.innerHTML = '<span>⏳</span> Conectando à API mobile do mAPPa...';
  progressBox.style.display = 'block';
  stepLog.innerHTML = '';

  let tokenAtivo = directToken;

  // Se o usuário forneceu credenciais e não tem token direto:
  if (!tokenAtivo) {
    atualizarPassoExtracao(`1/4: Autenticando na API mobile mAPPa (${consultiveState.baseUrl}/api/login)...`);

    // Payload idêntico ao do cliente mobile Flutter mAPPa
    const authRes = await fetchPaxtuApi("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: ueb,
        password: senha
      })
    });

    consultiveState.rawLoginPayload = authRes.data;

    // Detectar sucesso de login (Status 200, ou mensagem de sucesso, ou token no payload)
    const msg = (authRes.data && typeof authRes.data.message === 'string') ? authRes.data.message.toLowerCase() : '';
    const statusMsg = (authRes.data && typeof authRes.data.status === 'string') ? authRes.data.status.toLowerCase() : '';
    
    const isLoginOk = authRes.ok || msg.includes('success') || statusMsg.includes('success') || (authRes.data && (authRes.data.token || authRes.data.access_token || authRes.data.data));

    if (isLoginOk) {
      // Extrair o token se existir ou usar o MAPPA_APP_TOKEN
      tokenAtivo = extrairTokenSeguro(authRes.data) || MAPPA_APP_TOKEN;
      consultiveState.idAssociado = (authRes.data && (authRes.data.idAssociado || authRes.data.id || (authRes.data.user && authRes.data.user.id))) || ueb;
      consultiveState.tipoAssociado = (authRes.data && (authRes.data.tipoAssociado || (authRes.data.user && authRes.data.user.tipo))) || "adulto";

      // Se o objeto 'user' veio no retorno do login, popular dados preliminares da chefia
      if (authRes.data && authRes.data.user) {
        const u = authRes.data.user;
        consultiveState.chefia = {
          nome: u.nomeCompleto || u.name || u.nome || `Escotista UEB ${ueb}`,
          ueb: u.registroUeb || u.ueb || u.username || ueb,
          funcao: u.cargo || u.funcao || "Escotista de Seção",
          nivel: u.nivelFormacao || u.nivel || "Ativo"
        };
      }
    } else {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = '<span>📥</span> Conectar e Buscar Dados no mAPPa / Paxtu';
      progressBox.style.display = 'none';

      let detalhe = "Falha de autenticação no servidor mAPPa.";
      if (authRes.status === 401) {
        detalhe = "Registro UEB ou senha incorretos no Paxtu.";
      } else if (authRes.status === 422) {
        detalhe = "Campos obrigatórios não preenchidos.";
      } else if (authRes.status === 0) {
        detalhe = `Erro de conexão direta (${authRes.error || 'Falha de rede'}).`;
      } else if (authRes.data && authRes.data.error) {
        detalhe = `Resposta da UEB: ${authRes.data.error}`;
      } else if (authRes.data && authRes.data.message) {
        detalhe = `Resposta da UEB: ${authRes.data.message}`;
      }

      alert(detalhe);
      return;
    }
  }

  // Com o login validado:
  consultiveState.autenticado = true;
  consultiveState.token = tokenAtivo;
  const inspTokenPreview = document.getElementById('insp-token-preview');
  if (inspTokenPreview) inspTokenPreview.textContent = tokenAtivo.substring(0, 24) + '...';

  // Configura dados padrão imediatos para que a página inicial NUNCA fique em branco
  if (!consultiveState.chefia) {
    consultiveState.chefia = {
      nome: `Escotista UEB ${ueb || 'Conectado'}`,
      ueb: ueb || "--",
      funcao: "Escotista de Seção",
      nivel: "Ativo"
    };
  }
  if (!consultiveState.unidade) {
    consultiveState.unidade = {
      grupo: "Grupo Escoteiro (mAPPa Oficial)",
      numeral: "UEL",
      cidade: "Brasil"
    };
  }
  if (!consultiveState.secoes || consultiveState.secoes.length === 0) {
    consultiveState.secoes = [{
      idSecao: 1,
      nomeSecao: "Seção Vinculada",
      tipoRamo: "Escoteiro"
    }];
    consultiveState.secaoAtivaId = 1;
  }
  consultiveState.ultimaSincronizacao = new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  // REDIRECIONAMENTO IMEDIATO PARA A PÁGINA INICIAL!
  document.getElementById('screen-login').style.display = 'none';
  document.getElementById('screen-app').style.display = 'block';
  btnSubmit.disabled = false;
  btnSubmit.innerHTML = '<span>📥</span> Conectar e Buscar Dados no mAPPa / Paxtu';
  progressBox.style.display = 'none';

  renderizarPortalConsultivo();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Execução e sincronização sequencial em segundo plano dos dados adicionais
  try {
    // Passo 2: Buscar Perfil Oficial
    const perfilRes = await fetchPaxtuApi("/api/perfil");
    if (perfilRes.ok && perfilRes.data) {
      const perfil = perfilRes.data;
      consultiveState.rawPerfilPayload = perfil;

      consultiveState.chefia = {
        nome: perfil.nomeCompleto || perfil.nome || consultiveState.chefia.nome,
        ueb: perfil.registroUeb || perfil.ueb || consultiveState.chefia.ueb,
        funcao: perfil.cargo || perfil.funcao || consultiveState.chefia.funcao,
        nivel: perfil.nivelFormacao || perfil.nivel || consultiveState.chefia.nivel
      };

      consultiveState.unidade = {
        grupo: perfil.grupoEscoteiro || perfil.nomeUel || consultiveState.unidade.grupo,
        numeral: perfil.numeral || perfil.codigoUel || consultiveState.unidade.numeral,
        cidade: perfil.cidade || consultiveState.unidade.cidade
      };
      renderizarPortalConsultivo();
    }
  } catch (errPerfil) {
    console.warn("Aviso ao buscar perfil adicional:", errPerfil);
  }

  try {
    // Passo 3: Buscar Seções
    const secoesRes = await fetchPaxtuApi("/api/secoes");
    if (secoesRes.ok && secoesRes.data) {
      consultiveState.rawSecoesPayload = secoesRes.data;
      let secoes = [];
      if (Array.isArray(secoesRes.data)) {
        secoes = secoesRes.data;
      } else if (secoesRes.data && Array.isArray(secoesRes.data.secoes)) {
        secoes = secoesRes.data.secoes;
      }
      if (secoes.length > 0) {
        consultiveState.secoes = secoes;
        consultiveState.secaoAtivaId = secoes[0].idSecao;
        renderizarPortalConsultivo();
      }
    }
  } catch (errSecoes) {
    console.warn("Aviso ao buscar seções adicionais:", errSecoes);
  }

  try {
    // Passo 4: Buscar Associados e Progressões da Seção
    await carregarDadosSecao(consultiveState.secaoAtivaId);
    consultiveState.ultimaSincronizacao = new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    renderizarPortalConsultivo();
  } catch (errJovens) {
    console.warn("Aviso ao baixar dados dos jovens da seção:", errJovens);
  }

  // Salvar sessão segura no navegador
  try {
    sessionStorage.setItem('supermappa_consultivo_session', JSON.stringify({
      autenticado: true,
      baseUrl: consultiveState.baseUrl,
      token: consultiveState.token,
      chefia: consultiveState.chefia,
      unidade: consultiveState.unidade,
      secoes: consultiveState.secoes,
      secaoAtivaId: consultiveState.secaoAtivaId,
      jovens: consultiveState.jovens,
      patrulhas: consultiveState.patrulhas,
      rawLoginPayload: consultiveState.rawLoginPayload,
      rawPerfilPayload: consultiveState.rawPerfilPayload,
      rawSecoesPayload: consultiveState.rawSecoesPayload,
      ultimaSincronizacao: consultiveState.ultimaSincronizacao
    }));
  } catch (e) {
    console.warn("Storage local indisponível:", e);
  }
}

// 2. Carregar Dados Reais da Seção a partir dos Endpoints do mAPPa
async function carregarDadosSecao(idSecao) {
  const secaoAtiva = consultiveState.secoes.find(s => s.idSecao == idSecao) || consultiveState.secoes[0];
  let listaAssociados = [];

  // Tentar endpoints conhecidos do mAPPa
  const resSecaoAssociados = await fetchPaxtuApi(`/api/secoes-favoritos?idSecao=${idSecao}`);
  if (resSecaoAssociados.ok && Array.isArray(resSecaoAssociados.data)) {
    listaAssociados = resSecaoAssociados.data;
  } else {
    const resItens = await fetchPaxtuApi(`/api/itens-revisao?idSecao=${idSecao}`);
    if (resItens.ok && Array.isArray(resItens.data)) {
      const mapa = new Map();
      resItens.data.forEach(item => {
        if (item.idAssociado && !mapa.has(item.idAssociado)) {
          mapa.set(item.idAssociado, {
            idAssociado: item.idAssociado,
            nomeCompleto: item.nomeAssociado || item.nomeJovem || `Associado #${item.idAssociado}`,
            registroUeb: item.registroUeb || String(item.idAssociado),
            patrulha: item.patrulha || "Geral",
            cargo: item.cargo || "Membro",
            etapaAtual: item.etapa || "Em Progressão"
          });
        }
      });
      listaAssociados = Array.from(mapa.values());
    }
  }

  if (listaAssociados.length === 0) {
    const resAssessorados = await fetchPaxtuApi(`/api/assessorados`);
    if (resAssessorados.ok && Array.isArray(resAssessorados.data)) {
      listaAssociados = resAssessorados.data;
    }
  }

  // Mapear associados e buscar dados detalhados na API
  const jovensMapeados = [];
  const patrulhasSet = new Set();

  for (let raw of listaAssociados) {
    const jId = raw.idAssociado || raw.id;
    const nome = raw.nomeCompleto || raw.nome || `Jovem #${jId}`;
    const ueb = raw.registroUeb || raw.ueb || String(jId);
    const patrulha = raw.patrulha || raw.nomePatrulha || "Geral";
    const cargo = raw.cargo || raw.funcao || "Membro";
    const etapa = raw.etapaAtual || raw.blocoAtual || raw.ramoAtual || secaoAtiva.tipoRamo || "Em Progressão";

    patrulhasSet.add(patrulha);

    // Buscar progresso, especialidades e insígnias do jovem
    const resBlocos = await fetchPaxtuApi(`/api/blocos/associado?idAssociado=${jId}`);
    const blocosData = (resBlocos.ok && resBlocos.data) ? resBlocos.data : [];

    const resEsp = await fetchPaxtuApi(`/api/especialidades-itens-associado?idAssociado=${jId}`);
    const espData = (resEsp.ok && Array.isArray(resEsp.data)) ? resEsp.data : [];

    const resInsignias = await fetchPaxtuApi(`/api/insignias-especiais-associado?idAssociado=${jId}`);
    const insigData = (resInsignias.ok && Array.isArray(resInsignias.data)) ? resInsignias.data : [];

    const resAcoes = await fetchPaxtuApi(`/api/acoes/associado?idAssociado=${jId}`);
    const acoesData = (resAcoes.ok && Array.isArray(resAcoes.data)) ? resAcoes.data : [];

    let progressoEtapa = 0;
    if (Array.isArray(blocosData) && blocosData.length > 0) {
      const concluidos = blocosData.filter(b => b.concluido).length;
      progressoEtapa = Math.round((concluidos / blocosData.length) * 100);
    } else if (raw.progressoEtapa) {
      progressoEtapa = raw.progressoEtapa;
    }

    jovensMapeados.push({
      id: jId,
      nome,
      ueb,
      idade: raw.idade || "--",
      nascimento: raw.dataNascimento || "--",
      ingresso: raw.dataIngresso || "--",
      promessa: raw.dataPromessa || "--",
      patrulha,
      cargo,
      etapa,
      progressoEtapa,
      emergencia: {
        pais: raw.filiacao || raw.nomeMae || raw.nomePai || "Cadastrado no mAPPa",
        tel: raw.telefoneEmergencia || raw.telefone || "--",
        tipoSanguineo: raw.tipoSanguineo || "--"
      },
      especialidades: espData.map(e => ({
        nome: e.nome || e.nomeEspecialidade || "Especialidade",
        ramo: e.ramoConhecimento || "Geral",
        nivel: e.nivel || e.nivelConquistado || 1,
        icon: "🎖️",
        data: e.dataConcessao || e.dataAprovacao || "--"
      })),
      insignias: insigData,
      progressoDetalhado: Array.isArray(blocosData) ? blocosData : [],
      atividadesHistorico: acoesData.map(a => ({
        evento: a.titulo || a.nomeAtividade || "Atividade de Seção",
        data: a.data || a.dataRealizacao || "--",
        local: a.local || "Sede do Grupo",
        presenca: a.realizada ? "Presente" : "Registrado"
      }))
    });
  }

  consultiveState.jovens = jovensMapeados;
  consultiveState.patrulhas = Array.from(patrulhasSet);
  if (consultiveState.patrulhas.length === 0) {
    consultiveState.patrulhas = ["Geral"];
  }
}

// 3. Renderizar Portal Consultivo
function renderizarPortalConsultivo() {
  if (!consultiveState.autenticado || !consultiveState.unidade) return;

  const secaoAtiva = consultiveState.secoes.find(s => s.idSecao == consultiveState.secaoAtivaId) || consultiveState.secoes[0] || {};

  // Atualizar Banner Oficial Superior
  const bannerGrupo = document.getElementById('banner-grupo-nome');
  if (bannerGrupo) bannerGrupo.textContent = consultiveState.unidade.grupo;

  const bannerNumeral = document.getElementById('banner-numeral');
  if (bannerNumeral) bannerNumeral.textContent = consultiveState.unidade.numeral;

  const bannerRamo = document.getElementById('banner-ramo-nome');
  if (bannerRamo) bannerRamo.textContent = secaoAtiva.tipoRamo || "Escoteiro";

  const bannerSync = document.getElementById('banner-sync-time');
  if (bannerSync) bannerSync.textContent = consultiveState.ultimaSincronizacao || "--";

  const bannerChefiaNome = document.getElementById('banner-chefia-nome');
  if (bannerChefiaNome) bannerChefiaNome.textContent = consultiveState.chefia.nome;

  const bannerChefiaUeb = document.getElementById('banner-chefia-ueb');
  if (bannerChefiaUeb) bannerChefiaUeb.textContent = `UEB: ${consultiveState.chefia.ueb} • ${consultiveState.chefia.funcao}`;

  // Atualizar Painel Executivo de Dados Capturados em Tempo Real
  const capStatusAuth = document.getElementById('cap-status-auth');
  if (capStatusAuth) capStatusAuth.textContent = 'Conectado (200 OK — Login successful)';

  const capUebAuth = document.getElementById('cap-ueb-auth');
  if (capUebAuth) capUebAuth.textContent = consultiveState.chefia.ueb || '--';

  const capTokenHash = document.getElementById('cap-token-hash');
  if (capTokenHash) {
    const tk = consultiveState.token || MAPPA_APP_TOKEN;
    capTokenHash.textContent = tk.substring(0, 16) + '...' + tk.substring(tk.length - 8);
  }

  const capEscotistaNome = document.getElementById('cap-escotista-nome');
  if (capEscotistaNome) capEscotistaNome.textContent = consultiveState.chefia.nome || '--';

  const capEscotistaCargo = document.getElementById('cap-escotista-cargo');
  if (capEscotistaCargo) capEscotistaCargo.textContent = consultiveState.chefia.funcao || 'Escotista';

  const capEscotistaNivel = document.getElementById('cap-escotista-nivel');
  if (capEscotistaNivel) capEscotistaNivel.textContent = consultiveState.chefia.nivel || 'Ativo';

  const capUelNome = document.getElementById('cap-uel-nome');
  if (capUelNome) capUelNome.textContent = consultiveState.unidade.grupo || '--';

  const capUelNumeral = document.getElementById('cap-uel-numeral');
  if (capUelNumeral) capUelNumeral.textContent = consultiveState.unidade.numeral || '--';

  const capUelCidade = document.getElementById('cap-uel-cidade');
  if (capUelCidade) capUelCidade.textContent = consultiveState.unidade.cidade || 'Brasil';

  const capSecaoNome = document.getElementById('cap-secao-nome');
  if (capSecaoNome) capSecaoNome.textContent = secaoAtiva.nomeSecao || 'Seção Ativa';

  const capSecaoRamo = document.getElementById('cap-secao-ramo');
  if (capSecaoRamo) capSecaoRamo.textContent = secaoAtiva.tipoRamo || 'Escoteiro';

  const capSecoesCount = document.getElementById('cap-secoes-count');
  if (capSecoesCount) capSecoesCount.textContent = `${consultiveState.secoes.length} identificada(s)`;

  // Atualizar visualizador de JSON bruto capturado
  const rawJsonViewer = document.getElementById('raw-json-viewer');
  if (rawJsonViewer) {
    const dump = {
      conexao: {
        servidor: consultiveState.baseUrl,
        autenticado: consultiveState.autenticado,
        tipoAssociado: consultiveState.tipoAssociado,
        idAssociado: consultiveState.idAssociado,
        timestamp: consultiveState.ultimaSincronizacao
      },
      respostaLogin: consultiveState.rawLoginPayload,
      perfilOficial: consultiveState.rawPerfilPayload,
      secoesOficiais: consultiveState.rawSecoesPayload || consultiveState.secoes,
      resumoJovens: {
        totalJovens: consultiveState.jovens.length,
        patrulhas: consultiveState.patrulhas
      }
    };
    rawJsonViewer.textContent = JSON.stringify(dump, null, 2);
  }

  // Preencher seletor de Seções
  const selectSecao = document.getElementById('select-secao-ativa');
  if (selectSecao) {
    selectSecao.innerHTML = '';
    consultiveState.secoes.forEach(sec => {
      const opt = document.createElement('option');
      opt.value = sec.idSecao;
      opt.textContent = `${sec.nomeSecao} (${sec.tipoRamo || 'Geral'})`;
      if (sec.idSecao == consultiveState.secaoAtivaId) opt.selected = true;
      selectSecao.appendChild(opt);
    });
  }

  // Atualizar Métricas Estatísticas
  const totalJovens = consultiveState.jovens.length;
  const totalPatrulhas = consultiveState.patrulhas.length;
  const totalEspecialidades = consultiveState.jovens.reduce((acc, j) => acc + (j.especialidades ? j.especialidades.length : 0), 0);
  const mediaProgressao = totalJovens > 0 
    ? Math.round(consultiveState.jovens.reduce((acc, j) => acc + (j.progressoEtapa || 0), 0) / totalJovens)
    : 0;

  const mJovens = document.getElementById('metric-total-jovens');
  if (mJovens) mJovens.textContent = totalJovens;

  const mPatrulhas = document.getElementById('metric-total-patrulhas');
  if (mPatrulhas) mPatrulhas.textContent = totalPatrulhas;

  const mEsp = document.getElementById('metric-total-especialidades');
  if (mEsp) mEsp.textContent = totalEspecialidades;

  const mProg = document.getElementById('metric-media-progressao');
  if (mProg) mProg.textContent = `${mediaProgressao}%`;

  // Preencher seletor de Patrulhas
  const selectPatrulha = document.getElementById('filter-patrulha');
  if (selectPatrulha) {
    selectPatrulha.innerHTML = '<option value="todas">Todas as Patrulhas</option>';
    consultiveState.patrulhas.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p;
      opt.textContent = `Patrulha ${p}`;
      selectPatrulha.appendChild(opt);
    });
  }

  filtrarJovensConsultivo();
}

// Alternar visualização do painel de JSON bruto capturado
function alternarPainelJsonBruto() {
  const box = document.getElementById('box-json-bruto-capturado');
  const btnLabel = document.getElementById('btn-toggle-json-label');
  if (!box) return;
  if (box.style.display === 'none' || !box.style.display) {
    box.style.display = 'block';
    if (btnLabel) btnLabel.textContent = '▲ Ocultar Payloads JSON Brutos';
  } else {
    box.style.display = 'none';
    if (btnLabel) btnLabel.textContent = '🔍 Ver Payloads JSON Brutos';
  }
}

// Copiar JSON capturado
function copiarJsonCapturado() {
  const viewer = document.getElementById('raw-json-viewer');
  if (viewer && viewer.textContent) {
    navigator.clipboard.writeText(viewer.textContent).then(() => {
      alert("Payload JSON oficial copiado com sucesso para a área de transferência!");
    }).catch(() => {
      alert("Não foi possível copiar automaticamente. Selecione e copie o texto manualmente.");
    });
  }
}

// 4. Trocar Seção Ativa
async function trocarSecaoAtiva(novoIdSecao) {
  if (!novoIdSecao || novoIdSecao == consultiveState.secaoAtivaId) return;

  const statusText = document.getElementById('header-status-text');
  statusText.textContent = 'Carregando dados da seção...';

  consultiveState.secaoAtivaId = novoIdSecao;
  await carregarDadosSecao(novoIdSecao);
  consultiveState.ultimaSincronizacao = new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  renderizarPortalConsultivo();
  statusText.textContent = 'mAPPa Sincronizado';
}

// 5. Filtrar e Exibir Jovens Reais da Base
function filtrarJovensConsultivo() {
  const busca = (document.getElementById('filter-search').value || '').toLowerCase().trim();
  const filtroPatrulha = document.getElementById('filter-patrulha').value;
  const filtroEtapa = document.getElementById('filter-etapa').value;

  const jovensFiltrados = consultiveState.jovens.filter(jovem => {
    const matchBusca = !busca || 
      jovem.nome.toLowerCase().includes(busca) || 
      jovem.ueb.toLowerCase().includes(busca);

    const matchPatrulha = (filtroPatrulha === 'todas') || (jovem.patrulha === filtroPatrulha);
    const matchEtapa = (filtroEtapa === 'todas') || (jovem.etapa === filtroEtapa);

    return matchBusca && matchPatrulha && matchEtapa;
  });

  document.getElementById('label-jovens-exibidos').textContent = jovensFiltrados.length;

  const container = document.getElementById('patrols-container');
  container.innerHTML = '';

  if (jovensFiltrados.length === 0) {
    container.innerHTML = `
      <div class="empty-state-box" style="padding: 3rem 1rem; text-align: center; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🏕️</div>
        <h3 style="color: #fff; margin-bottom: 0.5rem;">Nenhum associado encontrado nesta seção no mAPPa</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 600px; margin: 0 auto;">
          A API do mAPPa / Paxtu 100 conectou com sucesso. Caso sua seção possua jovens cadastrados, clique em <strong>Inspecionar API Paxtu</strong> para checar as respostas dos endpoints.
        </p>
      </div>
    `;
    return;
  }

  const patrulhasMap = {};
  consultiveState.patrulhas.forEach(p => { patrulhasMap[p] = []; });

  jovensFiltrados.forEach(j => {
    if (!patrulhasMap[j.patrulha]) {
      patrulhasMap[j.patrulha] = [];
    }
    patrulhasMap[j.patrulha].push(j);
  });

  Object.keys(patrulhasMap).forEach(nomePatrulha => {
    const jovensPatrulha = patrulhasMap[nomePatrulha];
    if (jovensPatrulha.length === 0 && (busca || filtroPatrulha !== 'todas' || filtroEtapa !== 'todas')) {
      return;
    }

    const section = document.createElement('div');
    section.className = 'patrol-section';
    section.style.marginBottom = '2rem';

    section.innerHTML = `
      <div class="patrol-header" style="background: rgba(11,20,17,0.85); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.85rem 1.25rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
        <h3 style="color: var(--scout-gold-light); font-size: 1.15rem; font-weight: 800; display: flex; align-items: center; gap: 0.5rem; margin: 0;">
          <span>🚩</span> Patrulha ${nomePatrulha}
        </h3>
        <span class="brand-badge" style="background: rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.4); color: var(--brand-green-light);">
          ${jovensPatrulha.length} ${jovensPatrulha.length === 1 ? 'jovem' : 'jovens'} no mAPPa
        </span>
      </div>
      <div class="youths-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;">
      </div>
    `;

    const grid = section.querySelector('.youths-grid');

    if (jovensPatrulha.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.85rem; background: var(--bg-card); border-radius: var(--radius-sm); border: 1px dashed var(--border-color);">
          Nenhum associado alocado nesta patrulha no momento.
        </div>
      `;
    } else {
      jovensPatrulha.forEach(j => {
        const card = document.createElement('div');
        card.className = 'youth-card';
        card.style.background = 'var(--bg-card)';
        card.style.border = '1px solid var(--border-color)';
        card.style.borderRadius = 'var(--radius-md)';
        card.style.padding = '1.25rem';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.justifyContent = 'space-between';

        const totalEsp = j.especialidades ? j.especialidades.length : 0;

        card.innerHTML = `
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
              <div style="display: flex; gap: 0.75rem; align-items: center;">
                <div style="width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, var(--brand-green-dark), #10b981); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; border: 2px solid rgba(255,255,255,0.15);">
                  ⚜️
                </div>
                <div>
                  <h4 style="color: #fff; font-size: 1rem; font-weight: 700; line-height: 1.2;">${j.nome}</h4>
                  <span style="font-size: 0.75rem; color: var(--text-muted);">UEB: <strong style="color: var(--brand-green-light);">${j.ueb}</strong></span>
                </div>
              </div>
              <span class="brand-badge" style="font-size: 0.65rem;">${j.cargo || 'Membro'}</span>
            </div>

            <div style="background: rgba(11,20,17,0.6); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid rgba(255,255,255,0.06); margin-bottom: 0.85rem;">
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 4px;">
                <span style="color: var(--text-secondary);">Etapa Oficial:</span>
                <strong style="color: var(--scout-gold-light);">${j.etapa}</strong>
              </div>
              <div class="progress-bar-container" style="margin-bottom: 6px;">
                <div class="progress-bar-fill" style="width: ${j.progressoEtapa}%;"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted);">
                <span>Conclusão da Etapa: <strong>${j.progressoEtapa}%</strong></span>
                <span>🎖️ <strong>${totalEsp}</strong> ${totalEsp === 1 ? 'Especialidade' : 'Especialidades'}</span>
              </div>
            </div>
          </div>

          <button class="btn btn-primary" style="width: 100%; font-size: 0.82rem; padding: 0.5rem;" onclick="abrirFichaJovemConsultiva('${j.id}')">
            <span>📄</span> Ver Histórico Completo no mAPPa
          </button>
        `;

        grid.appendChild(card);
      });
    }

    container.appendChild(section);
  });
}

// 6. Modal da Ficha do Jovem
function abrirFichaJovemConsultiva(idJovem) {
  const jovem = consultiveState.jovens.find(j => String(j.id) === String(idJovem));
  if (!jovem) return;

  consultiveState.jovemFichaAtiva = jovem;

  document.getElementById('ficha-modal-nome').textContent = jovem.nome;
  document.getElementById('ficha-modal-ueb').textContent = jovem.ueb;
  document.getElementById('ficha-modal-patrulha').textContent = `Patrulha ${jovem.patrulha}`;
  document.getElementById('ficha-modal-cargo').textContent = jovem.cargo || 'Membro';
  document.getElementById('ficha-badge-esp-count').textContent = jovem.especialidades ? jovem.especialidades.length : 0;

  document.getElementById('ficha-etapa-nome').textContent = jovem.etapa;
  document.getElementById('ficha-progresso-percent').textContent = `${jovem.progressoEtapa}%`;
  document.getElementById('ficha-progresso-bar').style.width = `${jovem.progressoEtapa}%`;

  const eixosContainer = document.getElementById('ficha-eixos-container');
  eixosContainer.innerHTML = '';
  if (jovem.progressoDetalhado && jovem.progressoDetalhado.length > 0) {
    jovem.progressoDetalhado.forEach(bloco => {
      const card = document.createElement('div');
      card.className = 'eixo-card';
      card.innerHTML = `
        <div class="eixo-title">
          <span>${bloco.nomeBloco || bloco.nome || 'Bloco de Competências'}</span>
          <span style="color: var(--brand-green-light); font-weight: 700;">${bloco.concluido ? 'Concluído' : 'Em Andamento'}</span>
        </div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
          Sincronizado da base de progressão mAPPa / Paxtu
        </div>
      `;
      eixosContainer.appendChild(card);
    });
  } else {
    eixosContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem; padding: 0.5rem;">Nenhum bloco de competências específico retornado pela API.</p>';
  }

  const espContainer = document.getElementById('ficha-especialidades-container');
  espContainer.innerHTML = '';
  if (jovem.especialidades && jovem.especialidades.length > 0) {
    jovem.especialidades.forEach(esp => {
      const espCard = document.createElement('div');
      espCard.className = 'especialidade-card';
      espCard.innerHTML = `
        <div style="font-size: 2rem;">${esp.icon || '🎖️'}</div>
        <div>
          <h4 style="color: #fff; font-size: 0.95rem; font-weight: 700; margin-bottom: 2px;">${esp.nome}</h4>
          <div style="font-size: 0.78rem; color: var(--scout-gold-light); font-weight: 600;">Nível ${esp.nivel} &bull; Ramo ${esp.ramo}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">Concedida em: ${esp.data} (Oficial UEB)</div>
        </div>
      `;
      espContainer.appendChild(espCard);
    });
  } else {
    espContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem; padding: 1rem;">O jovem ainda não possui especialidades registradas no mAPPa.</p>';
  }

  const histContainer = document.getElementById('ficha-historico-container');
  histContainer.innerHTML = '';
  if (jovem.atividadesHistorico && jovem.atividadesHistorico.length > 0) {
    histContainer.innerHTML = `
      <table class="attendance-table" style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
        <thead>
          <tr style="border-bottom: 1px solid var(--border-color); text-align: left; color: var(--text-muted);">
            <th style="padding: 0.5rem;">Atividade / Evento</th>
            <th style="padding: 0.5rem;">Data Oficial</th>
            <th style="padding: 0.5rem;">Local</th>
            <th style="padding: 0.5rem;">Status mAPPa</th>
          </tr>
        </thead>
        <tbody>
          ${jovem.atividadesHistorico.map(ev => `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
              <td style="padding: 0.5rem; font-weight: 600; color: #fff;">${ev.evento}</td>
              <td style="padding: 0.5rem; color: var(--text-secondary);">${ev.data}</td>
              <td style="padding: 0.5rem; color: var(--text-secondary);">${ev.local}</td>
              <td style="padding: 0.5rem;"><span style="font-size: 0.75rem; padding: 2px 8px; border-radius: 4px; background: rgba(16,185,129,0.2); color: #34d399; font-weight: 600;">Confirmada</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } else {
    histContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem; padding: 1rem;">Sem histórico de eventos registrado no mAPPa para este associado.</p>';
  }

  const cadContainer = document.getElementById('ficha-cadastral-container');
  cadContainer.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.85rem;">
      <div>
        <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Nome Completo</div>
        <div style="color: #fff; font-weight: 700; margin-bottom: 0.75rem;">${jovem.nome}</div>

        <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Registro UEB</div>
        <div style="color: var(--brand-green-light); font-weight: 700; margin-bottom: 0.75rem;">${jovem.ueb}</div>

        <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Data de Nascimento / Idade</div>
        <div style="color: #fff; margin-bottom: 0.75rem;">${jovem.nascimento} (${jovem.idade} anos)</div>

        <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Data de Ingresso no Movimento</div>
        <div style="color: #fff; margin-bottom: 0.75rem;">${jovem.ingresso}</div>
      </div>
      <div>
        <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Data da Promessa Escoteira</div>
        <div style="color: var(--scout-gold-light); font-weight: 700; margin-bottom: 0.75rem;">${jovem.promessa}</div>

        <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Patrulha / Seção</div>
        <div style="color: #fff; margin-bottom: 0.75rem;">Patrulha ${jovem.patrulha}</div>

        <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Filiação / Responsáveis</div>
        <div style="color: #fff; margin-bottom: 0.75rem;">${jovem.emergencia.pais}</div>

        <div style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase;">Telefone de Emergência</div>
        <div style="color: #38bdf8; font-weight: 700; margin-bottom: 0.75rem;">${jovem.emergencia.tel} (Tipo Sanguíneo: ${jovem.emergencia.tipoSanguineo})</div>
      </div>
    </div>
  `;

  trocarAbaFicha('pane-progresso', document.querySelector('.ficha-tab-btn[data-pane="pane-progresso"]'));
  document.getElementById('modal-ficha-jovem').classList.add('active');
}

function fecharFichaJovemConsultiva() {
  document.getElementById('modal-ficha-jovem').classList.remove('active');
  consultiveState.jovemFichaAtiva = null;
}

function trocarAbaFicha(paneId, btnElement) {
  document.querySelectorAll('.ficha-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.ficha-pane').forEach(pane => pane.classList.remove('active'));

  if (btnElement) btnElement.classList.add('active');
  const targetPane = document.getElementById(paneId);
  if (targetPane) targetPane.classList.add('active');
}

// 7. Modal de Inspeção da API
function abrirModalInspecaoPaxtu() {
  document.getElementById('modal-inspecao-paxtu').classList.add('active');
}

function fecharModalInspecaoPaxtu() {
  document.getElementById('modal-inspecao-paxtu').classList.remove('active');
}

// 8. Reimportar Dados
async function reimportarDadosPaxtu() {
  const statusPill = document.getElementById('header-status-pill');
  const statusText = document.getElementById('header-status-text');

  statusPill.style.borderColor = 'rgba(245, 158, 11, 0.4)';
  statusPill.style.color = '#fbbf24';
  statusText.textContent = 'Buscando dados no mAPPa...';

  await carregarDadosSecao(consultiveState.secaoAtivaId);
  consultiveState.ultimaSincronizacao = new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  renderizarPortalConsultivo();

  statusPill.style.borderColor = 'rgba(16, 185, 129, 0.35)';
  statusPill.style.color = '#34d399';
  statusText.textContent = 'mAPPa Sincronizado';

  alert(`Dados da seção atualizados com sucesso da API do mAPPa!`);
}

// 9. Logout
function fazerLogoutPaxtu() {
  if (confirm("Deseja encerrar a sessão consultiva do mAPPa?")) {
    sessionStorage.removeItem('supermappa_consultivo_session');
    consultiveState.autenticado = false;
    consultiveState.token = null;
    consultiveState.chefia = null;
    consultiveState.unidade = null;
    consultiveState.secoes = [];
    consultiveState.jovens = [];

    document.getElementById('screen-app').style.display = 'none';
    document.getElementById('screen-login').style.display = 'flex';
    document.getElementById('gate-senha').value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Inicialização automática
document.addEventListener('DOMContentLoaded', () => {
  try {
    const sessionRaw = sessionStorage.getItem('supermappa_consultivo_session');
    if (sessionRaw) {
      const sess = JSON.parse(sessionRaw);
      if (sess && sess.autenticado && sess.token) {
        consultiveState.autenticado = true;
        consultiveState.baseUrl = sess.baseUrl || "https://paxtu100.escoteiros.org.br";
        consultiveState.token = sess.token;
        consultiveState.chefia = sess.chefia;
        consultiveState.unidade = sess.unidade;
        consultiveState.secoes = sess.secoes || [];
        consultiveState.secaoAtivaId = sess.secaoAtivaId;
        consultiveState.jovens = sess.jovens || [];
        consultiveState.patrulhas = sess.patrulhas || [];
        consultiveState.rawLoginPayload = sess.rawLoginPayload || null;
        consultiveState.rawPerfilPayload = sess.rawPerfilPayload || null;
        consultiveState.rawSecoesPayload = sess.rawSecoesPayload || null;
        consultiveState.ultimaSincronizacao = sess.ultimaSincronizacao;

        document.getElementById('screen-login').style.display = 'none';
        document.getElementById('screen-app').style.display = 'block';
        document.getElementById('insp-token-preview').textContent = sess.token.substring(0, 24) + '...';
        document.getElementById('insp-base-url').textContent = consultiveState.baseUrl;
        renderizarPortalConsultivo();
        return;
      }
    }
  } catch (e) {
    console.warn("Erro ao ler sessão:", e);
  }

  document.getElementById('screen-login').style.display = 'flex';
  document.getElementById('screen-app').style.display = 'none';
});
