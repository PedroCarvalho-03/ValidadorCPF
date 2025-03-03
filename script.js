const validarCPF = (cpf) => {
    // Remover caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Verificar se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return "CPF inválido! Deve conter 11 dígitos.";
    }

    // Verificar se o CPF é uma sequência repetida
    if (/^(\d)\1{10}$/.test(cpf)) {
        return "CPF inválido!";
    }

    // Função para calcular o próximo dígito verificador
    const proximoDigitoVerificador = (cpfIncompleto) => {
        let soma = 0;
        let peso = cpfIncompleto.length + 1;

        for (let i = 0; i < cpfIncompleto.length; i++) {
            soma += parseInt(cpfIncompleto.charAt(i)) * peso--;
        }

        let resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    };

    // Calcular os dois dígitos verificadores corretamente
    let primeiroDigitoVerificador = proximoDigitoVerificador(cpf.slice(0, 9));
    let segundoDigitoVerificador = proximoDigitoVerificador(cpf.slice(0, 9) + primeiroDigitoVerificador);

    // Criar o CPF esperado
    let cpfEsperado = cpf.slice(0, 9) + primeiroDigitoVerificador + segundoDigitoVerificador;

    // Comparar com o CPF informado
    if (cpf !== cpfEsperado) {
        return "CPF inválido!";
    }

    return "CPF válido!";
};

// Função para exibir no HTML
function validar() {
    let cpf = document.getElementById("cpf").value;
    let mensagem = validarCPF(cpf);
    document.getElementById("mensagem").innerText = mensagem;
}
