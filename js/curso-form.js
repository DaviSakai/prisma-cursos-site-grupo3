document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('cursoForm');
    const successCard = document.getElementById('formSuccess');
    const btnVoltar = document.getElementById('btnVoltar');
    const telefoneInput = document.querySelector('input[name="telefone"]');

    // Telefone
    telefoneInput.addEventListener('input', function (e) {
        let num = e.target.value.replace(/\D/g, ''); 
        
        //formatação (XX) XXXXX-XXXX
        let formatado = num;
        if (num.length > 2) {
            formatado = `(${num.substring(0, 2)}) ${num.substring(2, 7)}`;
            if (num.length > 7) {
                formatado += `-${num.substring(7, 11)}`;
            }
        }
        e.target.value = formatado;
    });

    // Transição
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.style.display = 'none';
        successCard.style.display = 'block';
    });

    // Botão Voltar
    btnVoltar.addEventListener('click', function() {
        successCard.style.display = 'none';
        form.style.display = 'flex';
        form.reset();
    });
});