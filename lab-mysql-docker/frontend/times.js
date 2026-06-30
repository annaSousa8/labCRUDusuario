const API_URL = "/api/teams";

const tabela = document.getElementById("tabela-times");
const btnNovoTime = document.getElementById("btn-novo-time");
const modal = document.getElementById("modal");
const btnFechar = document.getElementById("btn-fechar");
const btnSalvarTime = document.getElementById("btn-salvar-time");
const nomeTime = document.getElementById("nome-time");

let editandoId = null;

function abrirModal() {
  modal.classList.add("ativo");
}

function fecharModal() {
  modal.classList.remove("ativo");
  nomeTime.value = "";
  editandoId = null;
}

async function carregarTimes() {
  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error("Erro ao buscar times");
    }

    const times = await resposta.json();

    tabela.innerHTML = "";

    times.forEach((time) => {
      tabela.innerHTML += `
        <tr>
          <td>${time.name}</td>
          <td>${time.id}</td>
          <td>
            <div class="acoes">

              <i
                data-lucide="square-pen"
                class="editar"
                data-id="${time.id}">
              </i>

              <i
                data-lucide="trash-2"
                class="excluir"
                data-id="${time.id}">
              </i>

            </div>
          </td>
        </tr>
      `;
    });

    lucide.createIcons();
  } catch (erro) {
    console.error("Erro ao carregar times:", erro);
  }
}

async function salvarTime() {
  const name = nomeTime.value.trim();

  if (!name) {
    alert("Digite o nome do time");
    return;
  }

  const metodo = editandoId ? "PUT" : "POST";

  const url = editandoId ? `/api/teams/${editandoId}` : "/api/teams";

  const resposta = await fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (resposta.ok) {
    nomeTime.value = "";
    editandoId = null;

    fecharModal();
    carregarTimes();
  } else {
    alert("Erro ao salvar time");
  }
}

tabela.addEventListener("click", async (event) => {
  const target = event.target;

  if (!(target instanceof Element)) return;

  const editar = target.closest(".editar");

  if (editar) {
    const id = editar.dataset.id;

    const resposta = await fetch(`/api/teams/${id}`);

    if (!resposta.ok) {
      alert("Erro ao buscar time");
      return;
    }

    const time = await resposta.json();

    nomeTime.value = time.name;
    editandoId = id;

    abrirModal();

    return;
  }

  const excluir = target.closest(".excluir");

  if (excluir) {
    const id = excluir.dataset.id;

    const confirmar = confirm("Deseja realmente excluir este time?");

    if (!confirmar) return;

    const resposta = await fetch(`/api/teams/${id}`, {
      method: "DELETE",
    });

    if (resposta.ok) {
      carregarTimes();
    } else {
      alert("Erro ao excluir time");
    }
  }
});

btnNovoTime.addEventListener("click", abrirModal);

btnFechar.addEventListener("click", fecharModal);

btnSalvarTime.addEventListener("click", salvarTime);

document.addEventListener("DOMContentLoaded", () => {
  carregarTimes();
});
