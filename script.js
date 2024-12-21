
function limiteCaracter(element, maxLength) {
    if (element.value.length > maxLength) {
        element.value = element.value.slice(0, maxLength);
    }
}

function buscarCEP() {
    const cep = document.getElementById("cep").value;
    
    // Remove qualquer caractere não numérico
    const cepFormatado = cep.replace(/\D/g, '');

    // Valida se o CEP tem 8 caracteres
    if (cepFormatado.length !== 8) {
        alert('CEP inválido!');
        return;
    }

    // URL da API ViaCEP
    const url = `https://viacep.com.br/ws/${cepFormatado}/json/`;

    // Faz a requisição para a API ViaCEP
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar o CEP');
            }
            return response.json();
        })
        .then(data => {
            // Verifica se o CEP é válido
            if (data.erro) {
                alert('CEP não encontrado');
                document.querySelector('.resultado').innerHTML = '';
                return;
            }

            // Monta o HTML com os dados
            const resultadoHTML = `
                <h3>Resultado:</h3>
                <p><strong>Rua:</strong> ${data.logradouro || 'Não encontrado'}</p>
                <p><strong>Bairro:</strong> ${data.bairro || 'Não encontrado'}</p>
                <p><strong>Cidade:</strong> ${data.localidade || 'Não encontrado'}</p>
                <p><strong>Estado:</strong> ${data.uf || 'Não encontrado'}</p>
                <p><strong>Região:</strong> ${data.regiao || 'Não encontrado'}</p>
                <p><strong>Numero:</strong> ${data.complemento || 'Não encontrado'}</p>
            `;

            // Exibe os dados na div de resultado
            document.getElementById('resultado').innerHTML = resultadoHTML;
        })
        .catch(error => {
            console.error(error);
            document.querySelector('.resultado').innerHTML = 'Erro ao buscar o CEP. Tente novamente.';
        });
}

