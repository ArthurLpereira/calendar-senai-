const atual = document.getElementById('atual');
const dias = document.getElementById('dias');
const btnVoltar = document.getElementById('anterior');
const btnProximo = document.getElementById('proximo')
let  MesAtual = 9;
let ano = 2024;

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho","Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function GerarDias(mes, ano){
    dias.innerHTML = "";
    const DiaSTotal = new Date (ano, mes + 1, 0).getDate();
    const primeiroDiaSemana = new Date (ano, mes, 1).getDay();

    for (let i = 0; i <primeiroDiaSemana; i++){
        const outro_mes = document.createElement('div');
        outro_mes.classList.add('vazio')
        dias.appendChild(outro_mes);
    }

    
    for(let dia = 1; dia <=DiaSTotal; dia++){
        const diaElemento = document.createElement('div');
        diaElemento.classList.add('dia');
        diaElemento.textContent = dia;

        const final_semana = new Date(ano,mes,dia).getDay()
        if (final_semana === 0 || final_semana === 6){
            diaElemento.classList.add('fim_semana');
        }

        diaElemento.addEventListener('click',  () =>{
            document.querySelectorAll('.dia').forEach(i => i.classList.remove('selecionado'));
            diaElemento.classList.add('selecionado');
        });

        dias.appendChild(diaElemento);
    }
}

function CarregarCalendario(){
    atual.textContent = `${meses[MesAtual]} ${ano}`
    GerarDias(MesAtual, ano);
}

btnVoltar.addEventListener('click', () =>{
    MesAtual--;
    if(MesAtual < 0){
        MesAtual = 11;
        ano --
    }
    CarregarCalendario()
})

btnProximo.addEventListener('click', () =>{
    MesAtual++
    if(MesAtual > 11){
        MesAtual = 0
        ano++
    }
    CarregarCalendario()
})

CarregarCalendario()