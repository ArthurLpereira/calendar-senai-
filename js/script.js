const dias = document.getElementsByClassName('dia');
const data = document.getElementById('data');
for (let dia of dias) {
    dia.addEventListener('click', function () {
        for (let i of dias){
            i.classList.remove('selecionado');
        }
        dia.classList.add('selecionado');

        const mostrar_dia_escolhido = dia.querySelector('p').textContent;
        const mes = 'outubro'
        const ano = '2024'

        data.textContent = `Dia ${mostrar_dia_escolhido} de ${mes} de ${ano}`;
    });
}
