# Identificador de Bandeira de Cartão de Crédito

![Preview do Identificador de Cartão](https://via.placeholder.com/600x400?text=Preview+do+Identificador+de+Cart%C3%A3o)

Uma aplicação web que identifica a bandeira de cartões de crédito/débito e valida os números utilizando o algoritmo de Luhn.

---

## Funcionalidades

- Identificação automática da bandeira pelo número
- Validação do número do cartão com algoritmo de Luhn
- Visualização em tempo real da bandeira detectada
- Design responsivo para todos os dispositivos
- Animações e feedback visual intuitivo
- Formatação automática do número do cartão

---

## Bandeiras Suportadas

- Visa
- MasterCard
- American Express
- Discover
- Diners Club
- JCB
- UnionPay
- Maestro

---

## Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis e media queries)
- JavaScript ES6+
- GitHub Copilot (assistente de codificação)

---

## Como Usar

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/identificador-cartao.git
    ```
2. Abra o arquivo `index.html` no seu navegador.
3. Digite o número do cartão no campo indicado.
4. A bandeira será identificada automaticamente após 4 dígitos.
5. Clique em **Identificar e Validar** ou pressione Enter para ver a validação completa.

---

## Estrutura do Projeto

```text
/identificador-cartao
├── public/
│   ├── index.html        # Estrutura principal da aplicação
│   └── styles/
│       └── index.css     # Estilos da aplicação
└── src/
    └── index.js          # Lógica de identificação e validação
```

---

## Algoritmo de Luhn

O sistema implementa o algoritmo de Luhn para validação de números de cartão:

1. Comece pelo último dígito e mova para a esquerda
2. Dobre o valor de cada segundo dígito
3. Se o dobro for maior que 9, subtraia 9
4. Some todos os dígitos
5. Se o total for múltiplo de 10, o número é válido

---

## Personalização

Você pode facilmente adicionar novas bandeiras editando o array bandeiras no arquivo `script.js`:

```javascript
{
    nome: "Nova Bandeira",
    padroes: [/^padrao1/, /^padrao2/],  // Regex para identificar a bandeira
    comprimentos: [16, 19],             // Tamanhos aceitos
    iconId: "id-da-imagem"              // ID da imagem no HTML
}
```

---

## Requisitos

Navegador moderno com suporte a:

- JavaScript ES6+
- CSS Variables
- Flexbox

---

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

---

## Contribuição

Contribuições são bem-vindas! Siga estes passos:

1. Faça um fork do projeto
2. Crie sua branch (git checkout -b feature/AmazingFeature)
3. Commit suas mudanças (git commit -m 'Add some AmazingFeature')
4. Push para a branch (git push origin feature/AmazingFeature)
5. Abra um Pull Request

---

## Autor

Thiago Berti

Nota: Este projeto foi desenvolvido para fins educacionais. Não armazenamos ou transmitimos os números de cartão digitados.