const form = document.getElementById('form-rodape');
const botao = document.getElementById('btn-rodape');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (botao.innerText.includes('Enviado!')) {
        form.reset();
        botao.innerText = 'Enviar';
    } else {
        botao.innerText = 'Enviado! | Voltar';
    }
});