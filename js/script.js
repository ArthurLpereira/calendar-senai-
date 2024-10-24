const atual = document.getElementById('atual');
const dias = document.getElementById('dias');
const btnVoltar = document.getElementById('anterior');
const btnProximo = document.getElementById('proximo');
const DivData = document.getElementById('data');
const abrir_menu = document.getElementsByClassName('hamburguer')[0];
const menu = document.getElementsByClassName('menu')[0];
const mudarTema = document.getElementById('TrocarTema');

let MesAtual = 9;
let ano = 2024;

const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function GerarDias(mes, ano) {
    dias.innerHTML = "";
    const DiaSTotal = new Date(ano, mes + 1, 0).getDate();
    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();

    for (let i = 0; i < primeiroDiaSemana; i++) {
        const outro_mes = document.createElement('div');
        outro_mes.classList.add('vazio');
        dias.appendChild(outro_mes);
    }

    for (let dia = 1; dia <= DiaSTotal; dia++) {
        const diaElemento = document.createElement('div');
        diaElemento.classList.add('dia');
        diaElemento.textContent = dia;

        const final_semana = new Date(ano, mes, dia).getDay();
        if (final_semana === 0 || final_semana === 6) {
            diaElemento.classList.add('fim_semana');
        }

        diaElemento.addEventListener('click', () => {
            document.querySelectorAll('.dia').forEach(i => i.classList.remove('selecionado'));
            diaElemento.classList.add('selecionado');

            const nomeMes = meses[mes];
            const dataSelecionada = `Dia ${dia} de ${nomeMes} de ${ano}`;
            DivData.textContent = dataSelecionada;
        });

        dias.appendChild(diaElemento);
    }

    const ultimo_dia = new Date(ano, mes, DiaSTotal).getDay();
    const faltam_semana = 6 - ultimo_dia;

    for (let i = 1; i <= faltam_semana; i++) {
        const outro_mes = document.createElement('div');
        outro_mes.classList.add('vazio');
        dias.appendChild(outro_mes);
    }
}

function CarregarCalendario(transicao) {
    atual.textContent = `${meses[MesAtual]} ${ano}`;
    TransicaoMes(transicao);
    GerarDias(MesAtual, ano);
}

function TransicaoMes() {
    dias.style.opacity = '0';

    setTimeout(() => {
        atual.textContent = `${meses[MesAtual]} ${ano}`;
        GerarDias(MesAtual, ano);

        dias.style.opacity = '1';
    }, 400);
}

btnVoltar.addEventListener('click', () => {
    MesAtual--;
    if (MesAtual < 0) {
        MesAtual = 11;
        ano--;
    }
    CarregarCalendario('saindo-mes');
});

btnProximo.addEventListener('click', () => {
    MesAtual++;
    if (MesAtual > 11) {
        MesAtual = 0;
        ano++;
    }
    CarregarCalendario('entrando-mes');
});

CarregarCalendario('mes-atual');

abrir_menu.addEventListener('click', () => {
    abrir_menu.classList.toggle('aberto');
    menu.classList.toggle('ativo');

    // Verificar se o menu está ativo
    if (menu.classList.contains('ativo')) {
        menu.style.backgroundColor = 'white'; // Fundo do menu ativo
        menu.style.color = 'black'; // Texto do menu ativo
    } else {
        const temaAtual = localStorage.getItem('tema') || 'claro';
        mudarCores(temaAtual); // Restabelecer cores com base no tema
    }
});

// Função para mudar cores
function mudarCores(tema) {
    if (tema === 'escuro') {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        mudarTema.style.backgroundColor = 'black'; // Cor do botão

        document.querySelectorAll('.dia').forEach(dia => {
            dia.style.backgroundColor = 'black'; // Fundo da seção
            dia.style.color = 'white'; // Cor do texto
            dia.style.borderColor = 'white'; // Cor da borda para dias
        });

        document.querySelectorAll('.vazio').forEach(vazio => {
            vazio.style.backgroundColor = 'black'; // Cor do fundo para os vazios
            vazio.style.borderColor = 'white'; // Cor da borda para vazios
        });

        document.querySelectorAll('.barra').forEach(barra => {
            barra.style.backgroundColor = 'white'; 
        });

        document.querySelectorAll('.div_semana').forEach(div_semana => {
            div_semana.style.backgroundColor = 'white'; // Cor do fundo para as semanas
            div_semana.style.color = 'black'; // Cor do texto para as semanas
        });

        menu.style.backgroundColor = 'white'; // Cor do fundo do menu
        menu.style.color = 'black'; // Cor do texto do menu
    } else {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        mudarTema.style.backgroundColor = 'white'; // Cor do botão
        
        document.querySelectorAll('.dia').forEach(dia => {
            dia.style.backgroundColor = 'white'; // Fundo da seção
            dia.style.color = 'black'; // Cor do texto
            dia.style.borderColor = 'black'; // Cor da borda para dias
        });

        document.querySelectorAll('.vazio').forEach(vazio => {
            vazio.style.backgroundColor = 'transparent'; // Cor do fundo para os vazios
            vazio.style.borderColor = 'black'; // Cor da borda para vazios
        });

        document.querySelectorAll('.barra').forEach(barra => {
            barra.style.backgroundColor = 'black'; 
        });

        document.querySelectorAll('.div_semana').forEach(div_semana => {
            div_semana.style.backgroundColor = 'black'; // Cor do fundo para as semanas
            div_semana.style.color = 'white'; // Cor do texto para as semanas
        });

        menu.style.backgroundColor = 'black'; // Cor do fundo do menu
        menu.style.color = 'white'; // Cor do texto do menu
    }
}

// Evento para trocar tema
mudarTema.addEventListener('click', () => {
    const temaAtual = localStorage.getItem('tema') === 'escuro' ? 'claro' : 'escuro';
    mudarCores(temaAtual);

    // Salvar tema no localStorage
    localStorage.setItem('tema', temaAtual);
});

// Ao carregar a página, verificar o tema salvo
window.addEventListener('load', () => {
    const temaSalvo = localStorage.getItem('tema') || 'claro';
    mudarCores(temaSalvo);
});
