let editandoId = null;
const API_URL = "/api/games";
const AUTH_URL = "/api/auth";

// Elementos UI
// const loginSection = document.getElementById("login-section");
// const mainContent = document.getElementById("main-content");
// const authHeader = document.getElementById("auth-header");
// const loginForm = document.getElementById("login-form");
// const usuarioForm = document.getElementById("usuario-form");
// const idInput = document.getElementById("usuario-id");
// const team_A_Input = document.getElementById("team_A");
// const team_B_Input = document.getElementById("team_B");
// const tabela = document.getElementById("usuarios-tabela");
// const mensagem = document.getElementById("mensagem");
// const loginMensagem = document.getElementById("login-mensagem");
// const cancelarEdicaoBtn = document.getElementById("cancelar-edicao");
// const btnLogout = document.getElementById("btn-logout");
const btnNovoJogo = document.getElementById("btn-novo-jogo");
const modal = document.getElementById("modal");
const btnFechar = document.getElementById("btn-fechar");
const selectTeamA = document.getElementById("team-a");
const selectTeamB = document.getElementById("team-b");
const btnSalvarJogo = document.getElementById("btn-salvar-jogo");
const tabelaJogos = document.getElementById("tabela-jogos");
const btnCancelar = document.querySelector(".btn-cancelar");

// --- Funções de Autenticação ---

async function abrirModal() {
  await carregarTimes();
  modal.classList.add("ativo");
}

function fecharModal() {
  modal.classList.remove("ativo");

  selectTeamA.value = "";
  selectTeamB.value = "";

  editandoId = null;
}

async function carregarTimes() {
  try {
    const resposta = await fetch("/api/teams");

    const times = await resposta.json();

    selectTeamA.innerHTML = '<option value="">Selecione</option>';

    selectTeamB.innerHTML = '<option value="">Selecione</option>';

    times.forEach((time) => {
      selectTeamA.innerHTML += `
        <option value="${time.id}">
          ${time.name}
        </option>
      `;

      selectTeamB.innerHTML += `
        <option value="${time.id}">
          ${time.name}
        </option>
      `;
    });
  } catch (erro) {
    console.error("Erro ao carregar times:", erro);
  }
}

async function salvarJogo() {
  const team_A_id = selectTeamA.value;
  const team_B_id = selectTeamB.value;

  if (!team_A_id || !team_B_id) {
    alert("Selecione os dois times");
    return;
  }

  if (team_A_id === team_B_id) {
    alert("Os times devem ser diferentes");
    return;
  }

  const payload = {
    team_A: team_A_id,
    team_B: team_B_id,
  };

  const metodo = editandoId ? "PUT" : "POST";

  const url = editandoId ? `/api/games/${editandoId}` : "/api/games";

  const resposta = await fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (resposta.ok) {
    fecharModal();

    selectTeamA.value = "";
    selectTeamB.value = "";

    editandoId = null;

    carregarJogos();
  } else {
    alert("Erro ao salvar jogo");
  }
}

async function carregarJogos() {
  try {
    const resposta = await fetch("/api/games");

    const jogos = await resposta.json();

    tabelaJogos.innerHTML = "";

    jogos.forEach((jogo) => {
      tabelaJogos.innerHTML += `
        <tr>
          <td>
            ${jogo.team_A_name}
            x
            ${jogo.team_B_name}
          </td>

          <td>
            <div class="acoes">

              <i
                data-lucide="square-pen"
                class="editar"
                data-id="${jogo.id}">
              </i>

              <i
                data-lucide="trash-2"
                class="excluir"
                data-id="${jogo.id}">
              </i>

            </div>
          </td>
        </tr>
      `;
    });

    lucide.createIcons();
  } catch (erro) {
    console.error("Erro ao carregar jogos:", erro);
  }
}

// async function handleLogin(event) {
//   event.preventDefault();
//   const formData = new FormData(loginForm);
//   const payload = Object.fromEntries(formData);

//   try {
//     const resposta = await fetch(`${AUTH_URL}/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     if (resposta.ok) {
//       mostrarDashboard();
//       carregarJogos();
//     } else {
//       const erro = await resposta.json();
//       loginMensagem.textContent = erro.erro || "Falha ao entrar";
//       loginMensagem.style.color = "#b42318";
//     }
//   } catch (err) {
//     loginMensagem.textContent = "Erro de conexão";
//   }
// }

// async function handleLogout() {
//   await fetch(`${AUTH_URL}/logout`, { method: "POST" });
//   mostrarLogin();
// }

// function mostrarDashboard() {
//   loginSection.style.display = "none";
//   mainContent.style.display = "flex";
//   authHeader.style.display = "block";
//   loginForm.reset();
//   loginMensagem.textContent = "";
// }

// function mostrarLogin() {
//   loginSection.style.display = "block";
//   mainContent.style.display = "none";
//   authHeader.style.display = "none";
// }

// // --- Funções de Usuários ---

// function mostrarMensagem(texto, erro = false) {
//   mensagem.textContent = texto;
//   mensagem.style.color = erro ? "#b42318" : "#0b5b55";
//   setTimeout(() => {
//     mensagem.textContent = "";
//   }, 3000);
// }

btnNovoJogo.addEventListener("click", abrirModal);
btnFechar.addEventListener("click", fecharModal);
btnSalvarJogo.addEventListener("click", salvarJogo);
btnCancelar.addEventListener("click", fecharModal);

document.addEventListener("DOMContentLoaded", () => {
  carregarTimes();
});

document.addEventListener("DOMContentLoaded", () => {
  carregarJogos();
});

tabelaJogos.addEventListener(
  "click",
  async (event) => {

    const excluir =
      event.target.closest(".excluir");

    if (!excluir) return;

    const id = excluir.dataset.id;

    const confirmar = confirm(
      "Deseja excluir este jogo?"
    );

    if (!confirmar) return;

    const resposta = await fetch(
      `/api/games/${id}`,
      {
        method: "DELETE"
      }
    );

    if (resposta.ok) {
      carregarJogos();
    } else {
      alert("Erro ao excluir jogo");
    }
  }
);

tabelaJogos.addEventListener(
  "click",
  async (event) => {

    const editar =
      event.target.closest(".editar");

    if (!editar) return;

    const id = editar.dataset.id;

    const resposta =
      await fetch(`/api/games/${id}`);

    const jogo =
      await resposta.json();

    selectTeamA.value =
      jogo.team_A_id;

    selectTeamB.value =
      jogo.team_B_id;

    editandoId = id;

    abrirModal();
  }
);