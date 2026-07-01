let tempo = 600;
let intervalo = null;

const cronometro = document.getElementById("cronometro");
const btnIniciar = document.getElementById("btnIniciar");
const btnReset = document.getElementById("btnReset");

const quartos = document.querySelectorAll(".quarto");
const btnProximoQuarto = document.getElementById("btn-proximo-quarto");

let quartoAtual = 0;

function atualizarCronometro() {
  const minutos = Math.floor(tempo / 60);
  const segundos = tempo % 60;

  cronometro.textContent =
    `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

function iniciarParar() {

  if (intervalo) {

    clearInterval(intervalo);
    intervalo = null;

    btnIniciar.textContent = "▶ Iniciar";

    return;
  }

  btnIniciar.textContent = "⏸ Pausar";

  intervalo = setInterval(() => {

    tempo--;

    atualizarCronometro();

    if (tempo <= 0) {

      clearInterval(intervalo);
      intervalo = null;

      btnIniciar.textContent = "▶ Iniciar";

      alert("Fim do quarto");
    }

  }, 1000);
}

function resetar() {

  clearInterval(intervalo);

  intervalo = null;

  tempo = 600;

  atualizarCronometro();

  btnIniciar.textContent = "▶ Iniciar";
}

btnIniciar.addEventListener("click", iniciarParar);
btnReset.addEventListener("click", resetar);

atualizarCronometro();

let pontosA = 0;
let pontosB = 0;

const placarA = document.getElementById("pontos-time-a");
const placarB = document.getElementById("pontos-time-b");

document.querySelectorAll(".btn-ponto").forEach((botao) => {

  botao.addEventListener("click", () => {

    const pontos = Number(botao.dataset.pontos);
    const time = botao.dataset.time;

    if (time === "a") {

      pontosA += pontos;

      placarA.textContent = String(pontosA).padStart(2, "0");

    } else {

      pontosB += pontos;

      placarB.textContent = String(pontosB).padStart(2, "0");

    }

  });

});


function atualizarBotaoQuarto() {

  if (quartoAtual === quartos.length - 1) {

    btnProximoQuarto.textContent = "Encerrar Jogo";

  } else {

    btnProximoQuarto.textContent = "Próximo Quarto →";

  }

}

function trocarQuarto(novoQuarto) {

  quartos[quartoAtual].classList.remove("ativo");

  quartoAtual = novoQuarto;

  quartos[quartoAtual].classList.add("ativo");

  clearInterval(intervalo);
  intervalo = null;

  tempo = 600;

  atualizarCronometro();

  btnIniciar.textContent = "▶ Iniciar";

  atualizarBotaoQuarto();
}

btnProximoQuarto.addEventListener("click", () => {

  if (quartoAtual < quartos.length - 1) {

    trocarQuarto(quartoAtual + 1);

  } else {

    clearInterval(intervalo);

    alert("Jogo encerrado!");

  }

});

quartos.forEach((quarto, indice) => {

  quarto.addEventListener("click", () => {

    trocarQuarto(indice);

  });

});

atualizarBotaoQuarto();