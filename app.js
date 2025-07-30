/*
let titulo = document.querySelector('h1');    //seleciona o elemento h1 no HTML
titulo.innerHTML = 'Jogo do número secreto';  //permite que você altere o conteúdo de texto desse elemento

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
*/
//PRÁTICA BOA: mesma estrutura se repetindo, posso escrever como menos linhas de código
//exemplo na função exibirTextoNaTela

let listaDeNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
//essa função tem parâmetro, mas não tem retorno
//exibe informação na tela, ou seja,
//ela executa, mas não vai devolver nenhuma informação
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); //{rate:1.2}) altera a velocidade da fala
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();



//essa função que não tem parâmetro e não tem retorno
function verificarChute() {
    let chute = document.querySelector('input').value; //value: pegar o valor para comparar na condicional
    
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }  
        tentativas++;
        limparCampo();
    }  
}

//essa função não tem parâmetro, porém tem retorno
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt((Math.random() * numeroLimite) + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumeroSorteados = [];
    }

    if (listaDeNumeroSorteados.includes(numeroEscolhido)){ //verifica se o número já foi escolhido
        return gerarNumeroAleatorio();
    } else {
        listaDeNumeroSorteados.push(numeroEscolhido);
        console.log(listaDeNumeroSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input'); //NÃO tem "value", pois só queremos selecionar o campo
    chute.value = '';                        //chute.value corresponde ao campo com valor digitado
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    
}
