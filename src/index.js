// Mapeamento de bandeiras com padrões e comprimentos
const bandeiras = [
    {
        nome: "Visa",
        padroes: [/^4/],
        comprimentos: [13, 16, 19],
        iconId: "visa-icon"
    },
    {
        nome: "MasterCard",
        padroes: [/^5[1-5]/, /^2[2-7]/],
        comprimentos: [16],
        iconId: "mastercard-icon"
    },
    {
        nome: "American Express",
        padroes: [/^3[47]/],
        comprimentos: [15],
        iconId: "amex-icon"
    },
    {
        nome: "Discover",
        padroes: [/^6011/, /^64[4-9]/, /^65/],
        comprimentos: [16, 19],
        iconId: "discover-icon"
    },
    {
        nome: "Diners Club",
        padroes: [/^3(0[0-5]|6|8[0-9])/],
        comprimentos: [14, 16],
        iconId: "diners-icon"
    },
    {
        nome: "JCB",
        padroes: [/^35[2-8][0-9]/],
        comprimentos: [16, 17, 18, 19],
        iconId: "jcb-icon"
    },
    {
        nome: "UnionPay",
        padroes: [/^62/],
        comprimentos: [16, 17, 18, 19],
        iconId: "unionpay-icon"
    },
    {
        nome: "Maestro",
        padroes: [/^5018/, /^5020/, /^5038/, /^5893/, /^6304/, /^6759/, /^6761/, /^6762/, /^6763/],
        comprimentos: [12, 13, 14, 15, 16, 17, 18, 19],
        iconId: "maestro-icon"
    }
];

// Algoritmo de Luhn para validação do número do cartão
function validarLuhn(numero) {
    let sum = 0;
    let shouldDouble = false;
    
    // Percorre os dígitos da direita para a esquerda
    for (let i = numero.length - 1; i >= 0; i--) {
        let digit = parseInt(numero.charAt(i));
        
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    
    return sum % 10 === 0;
}

// Identifica a bandeira do cartão
function identificarBandeiraCartao(numero) {
    const numeroLimpo = numero.replace(/\D/g, '');
    
    for (const bandeira of bandeiras) {
        for (const padrao of bandeira.padroes) {
            if (padrao.test(numeroLimpo)) {
                // Verifica se o comprimento é válido para a bandeira
                if (bandeira.comprimentos.includes(numeroLimpo.length)) {
                    return bandeira;
                }
            }
        }
    }
    
    return null;
}

// Atualiza a exibição dos ícones das bandeiras
function atualizarIcones(bandeiraIdentificada) {
    document.querySelectorAll('.card-icon').forEach(icon => {
        icon.classList.remove('active');
    });
    
    if (bandeiraIdentificada) {
        const icon = document.getElementById(bandeiraIdentificada.iconId);
        if (icon) {
            icon.classList.add('active');
        }
    }
}

// Formata o número do cartão com espaços
function formatarNumeroCartao(numero) {
    const numeroLimpo = numero.replace(/\D/g, '');
    let formatado = '';
    
    for (let i = 0; i < numeroLimpo.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formatado += ' ';
        }
        formatado += numeroLimpo[i];
    }
    
    return formatado;
}

// Função principal que identifica e valida o cartão
function identificarBandeira() {
    const numeroCartao = document.getElementById('numeroCartao').value;
    const numeroLimpo = numeroCartao.replace(/\D/g, '');
    const resultado = document.getElementById('resultado');
    
    // Resetar resultado
    resultado.className = '';
    resultado.innerHTML = '';
    
    if (numeroLimpo.length < 4) {
        resultado.textContent = 'Digite pelo menos os 4 primeiros dígitos';
        resultado.classList.add('error');
        atualizarIcones(null);
        return;
    }
    
    if (!/^\d+$/.test(numeroLimpo)) {
        resultado.textContent = 'Número inválido. Digite apenas números';
        resultado.classList.add('error');
        return;
    }
    
    // Identificar a bandeira
    const bandeira = identificarBandeiraCartao(numeroLimpo);
    
    // Validar com algoritmo de Luhn
    const valido = validarLuhn(numeroLimpo);
    
    // Atualizar interface
    atualizarIcones(bandeira);
    
    // Exibir resultados
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('fade-in');
    
    if (bandeira) {
        const cardType = document.createElement('div');
        cardType.classList.add('card-type');
        cardType.textContent = bandeira.nome;
        resultadoDiv.appendChild(cardType);
        
        const cardNumber = document.createElement('div');
        cardNumber.textContent = formatarNumeroCartao(numeroLimpo);
        resultadoDiv.appendChild(cardNumber);
        
        const validation = document.createElement('div');
        validation.classList.add('validation-result');
        validation.classList.add(valido ? 'valid' : 'invalid');
        validation.textContent = valido ? '✓ Número válido' : '✗ Número inválido';
        resultadoDiv.appendChild(validation);
        
        const cardDetails = document.createElement('div');
        cardDetails.classList.add('card-details');
        cardDetails.textContent = `Comprimento: ${numeroLimpo.length} dígitos (${bandeira.comprimentos.join(', ')} esperados)`;
        resultadoDiv.appendChild(cardDetails);
        
        resultado.appendChild(resultadoDiv);
        resultado.classList.add(valido ? 'success' : 'error');
    } else {
        resultadoDiv.textContent = 'Bandeira não identificada';
        resultadoDiv.classList.add('error');
        resultado.appendChild(resultadoDiv);
        resultado.classList.add('error');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Formatação automática do número do cartão
    document.getElementById('numeroCartao').addEventListener('input', function(e) {
        const input = e.target;
        const cursorPosition = input.selectionStart;
        const numero = input.value.replace(/\D/g, '');
        let formatado = '';
        
        for (let i = 0; i < numero.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formatado += ' ';
            }
            formatado += numero[i];
        }
        
        input.value = formatado;
        
        // Manter a posição do cursor correta após formatação
        let cursorOffset = 0;
        if (cursorPosition > 0) {
            const beforeCursor = input.value.substring(0, cursorPosition);
            const spacesBefore = (beforeCursor.match(/ /g) || []).length;
            const numbersBefore = beforeCursor.replace(/\D/g, '').length;
            cursorOffset = spacesBefore;
            
            // Se adicionamos um espaço antes da posição do cursor, movemos o cursor para frente
            if (numbersBefore > 0 && numbersBefore % 4 === 0 && cursorPosition <= formatado.length) {
                cursorOffset += 1;
            }
        }
        
        input.setSelectionRange(cursorPosition + cursorOffset, cursorPosition + cursorOffset);
        
        // Identificação em tempo real após 4 dígitos
        if (numero.length >= 4) {
            const bandeira = identificarBandeiraCartao(numero);
            atualizarIcones(bandeira);
        } else {
            atualizarIcones(null);
        }
    });
    
    // Permitir identificação pressionando Enter
    document.getElementById('numeroCartao').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            identificarBandeira();
        }
    });
    
    // Botão de validação
    document.getElementById('validarBtn').addEventListener('click', identificarBandeira);
});