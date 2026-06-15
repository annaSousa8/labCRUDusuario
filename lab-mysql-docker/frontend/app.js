// Configurações
const API_URL = '/api/games';
const AUTH_URL = '/api/auth';

// Elementos UI
const loginSection = document.getElementById('login-section');
const mainContent = document.getElementById('main-content');
const authHeader = document.getElementById('auth-header');
const loginForm = document.getElementById('login-form');
const usuarioForm = document.getElementById('usuario-form');
const idInput = document.getElementById('usuario-id');
const team_A_Input = document.getElementById('team_A');
const team_B_Input = document.getElementById('team_B');
const tabela = document.getElementById('usuarios-tabela');
const mensagem = document.getElementById('mensagem');
const loginMensagem = document.getElementById('login-mensagem');
const cancelarEdicaoBtn = document.getElementById('cancelar-edicao');
const btnLogout = document.getElementById('btn-logout');

// --- Funções de Autenticação ---

async function handleLogin(event) {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const payload = Object.fromEntries(formData);

  try {
    const resposta = await fetch(`${AUTH_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (resposta.ok) {
      mostrarDashboard();
      carregarUsuarios();
    } else {
      const erro = await resposta.json();
      loginMensagem.textContent = erro.erro || 'Falha ao entrar';
      loginMensagem.style.color = '#b42318';
    }
  } catch (err) {
    loginMensagem.textContent = 'Erro de conexão';
  }
}

async function handleLogout() {
  await fetch(`${AUTH_URL}/logout`, { method: 'POST' });
  mostrarLogin();
}

function mostrarDashboard() {
  loginSection.style.display = 'none';
  mainContent.style.display = 'flex';
  authHeader.style.display = 'block';
  loginForm.reset();
  loginMensagem.textContent = '';
}

function mostrarLogin() {
  loginSection.style.display = 'block';
  mainContent.style.display = 'none';
  authHeader.style.display = 'none';
}

// --- Funções de Usuários ---

function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.style.color = erro ? '#b42318' : '#0b5b55';
  setTimeout(() => { mensagem.textContent = ''; }, 3000);
}

function limparFormulario() {
  idInput.value = '';
  team_A_Input.value = '';
  team_B_Input.value = '';
}

async function carregarUsuarios() {
  try {
    const resposta = await fetch(API_URL);
    if (resposta.status === 401) return mostrarLogin();
    
    const usuarios = await resposta.json();
    tabela.innerHTML = '';

    usuarios.forEach((usuario) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.nome}</td>
        <td>${usuario.email}</td>
        <td>
          <button class="acao" data-editar="${usuario.id}">Editar</button>
          <button class="acao btn-excluir" data-excluir="${usuario.id}">Excluir</button>
        </td>
      `;
      tabela.appendChild(tr);
    });
  } catch (err) {
    console.error('Erro ao carregar:', err);
  }
}

async function salvarUsuario(event) {
  event.preventDefault();

  const id = idInput.value;

  const payload = {
    team_A: team_A_Input.value,
    team_B: team_B_Input.value.trim()
  };

  const metodo = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/${id}` : API_URL;

  const resposta = await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!resposta.ok) {
    const erro = await resposta.json();
    mostrarMensagem(erro.erro || 'Falha ao salvar', true);
    return;
  }

  mostrarMensagem(id ? 'Atualizado com sucesso' : 'Criado com sucesso');
  limparFormulario();
  carregarUsuarios();
}

// --- Event Listeners ---

loginForm.addEventListener('submit', handleLogin);
usuarioForm.addEventListener('submit', salvarUsuario);

btnLogout.addEventListener('click', handleLogout);
cancelarEdicaoBtn.addEventListener('click', () => {
  limparFormulario();
  mostrarMensagem('Edição cancelada');
});

tabela.addEventListener('click', async (event) => {
  const editarId = event.target.getAttribute('data-editar');
  const excluirId = event.target.getAttribute('data-excluir');

  if (editarId) {
    const resposta = await fetch(`${API_URL}/${editarId}`);
    const u = await resposta.json();
    idInput.value = u.id;
    nomeInput.value = u.nome;
    emailInput.value = u.email;
  }

  if (excluirId) {
    if (confirm('Deseja excluir?')) {
      await fetch(`${API_URL}/${excluirId}`, { method: 'DELETE' });
      carregarUsuarios();
    }
  }
});

// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    const resp = await fetch(API_URL);
    if (resp.ok) {
        mostrarDashboard();
        carregarUsuarios();
    } else {
        mostrarLogin();
    }
});