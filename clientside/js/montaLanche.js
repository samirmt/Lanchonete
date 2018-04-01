

function getIngredientes(){
    var url = 'http://localhost:50247/api/ingrediente/';
    $.ajax({
        type: 'GET',
        url: url,
        async: true,
        cache: false,
        dataType : 'json',        
        success: function(dados) {
            start(dados);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          atualizaQtds();
          alert('Erro: '+errorThrown+"\nna requisição: "+XMLHttpRequest+"\nStatus: "+textStatus);
        }
    });
}

  function start(dados) {
    localStorage.clear(); 
    var armazenaValores = '';
    var total = 0;
    var totalGeral = 0;
     var cnt = 1;
     var table = '<table class="table">'; 
     table += '<tr><th>Descrição</th><th>Valor</th><th>Qtd</th><th>Total</th><th></th>';     
        for (var i in dados){
            var idValor, idQtd, idTotal;
            idValor = 'vl' + cnt;
            idQtd = 'qt' + cnt;
            idTotal = 'tot' + cnt;

            var chaveValor = 'ingval' + cnt;
            var chaveTotal = 'ingtotal' + cnt;
            var chaveQtd = 'ingqt' + cnt;
            var posicao = cnt;
            var nome = dados[i].Nome;
            var preco = dados[i].Preco;   


            var parCalc = "'" + chaveValor + "','" + chaveQtd + "','" + chaveTotal + "','" + idQtd + "','" + posicao + "'";
            var qtd = '<input type="number" value="1" min="1" max="10" id="' + idQtd + '" onchange="calcular('+ parCalc + ');">';
            
            table += '<tr><td>';  
            table += nome;
            table += '</td><td>';
            table += preco.toFixed(2);
            table += '</td><td>';
            table += qtd;
            table += '</td><td>';
            total = calcularTotalParcial(preco,1);
            totalGeral = (totalGeral + parseFloat(total));
            table += total;
            table += '</td></td>';           
            
            AddIngredientes(nome, 1, preco.toFixed(2) ,cnt, total);
             
            cnt += 1;       
        }
    table += '</table>';
    table += '<input type="hidden" id="totalP" value="' + totalGeral.toFixed(2) + '">';
    document.getElementById("showIngredientes").innerHTML = table;        
    document.getElementById("totalGeral").innerHTML = 'Total: R$ ' + totalGeral.toFixed(2); 
     
    setValoresDescontosIniciais();

    var descLight = parseFloat(localStorage.getItem("light"));
    var descCarne = parseFloat(localStorage.getItem("muitacarne"));
    var descQueijo = parseFloat(localStorage.getItem("muitoqueijo"));
    var tDesconto = parseFloat(localStorage.getItem("totalcomdesconto"));

    document.getElementById("descontoLight").innerHTML = 'R$ ' + descLight.toFixed(2);
    document.getElementById("descontoMuitaCarne").innerHTML = 'R$ ' + descCarne.toFixed(2);
    document.getElementById("descontoMuitoQueijo").innerHTML = 'R$ ' + descQueijo.toFixed(2); 
    document.getElementById("totalComDescontos").innerHTML = 'R$ ' + tDesconto.toFixed(2);    
    
    var click = "AddCarrinho('Personalizado " + getIdLanchePersonalizado() + "',document.getElementById('quantidade').value," + getIdLanchePersonalizado() + ", localStorage.getItem('totalcomdesconto'))" ;
    button = '<button type="button" class="btn btn-success" id="adicionar1" id="produto1" onclick="' + click + '"> Comprar </button>';
    buttonCancelar = '&nbsp;<button type="button" class="btn btn-default" id="btnCancelar" onclick="getIngredientes();">Cancelar</button>';
    button += buttonCancelar;
    document.getElementById('botaoComprar').innerHTML = button;
    localStorage.setItem("quantidade", 1);
    document.getElementById("quantidade").value = 1;
    formaPreco(); 
}


function calcularTotalParcial(valor, qtd){
    var result = parseFloat(valor) * qtd;
    return result.toFixed(2);
}

function setValoresDescontosIniciais(){
    localStorage.setItem("light", 0);
    localStorage.setItem("muitacarne", 0);
    localStorage.setItem("muitoqueijo", 0);
    localStorage.setItem("totalcomdesconto", 0);
}


function AddIngredientes(produto, qtd, valor, posicao, total) {
    localStorage.setItem("ing" + posicao, produto);
    localStorage.setItem("ingqt" + posicao, qtd);
    valor = valor * qtd;
    localStorage.setItem("ingval" + posicao, valor);
    localStorage.setItem("ingtotal" + posicao, total);
}

function carregaIngredientes(){
    var totalGeral = 0;
    var total = 0; // variável que retorna o total dos produtos que estão na LocalStorage.
    var cnt = 1;   
    var table = '<table class="table">'; 
    table += '<tr><th>Descrição</th><th>Valor</th><th>Qtd</th><th>Total</th><th></th>';      
    for(i=1; i<=99; i++) // verifica até 99 produtos registrados na localStorage
    {
        var prod = localStorage.getItem("ing" + i + ""); // verifica se há recheio nesta posição. 
        if(prod != null)
        {	 
            var qtd = localStorage.getItem("ingqt" + i);
            var nome = localStorage.getItem("ing" + i);
            var preco = localStorage.getItem("ingval" + i); 
            var t = parseFloat(localStorage.getItem("ingtotal" + i));
                         
            var varQtd = qtd;
            var idValor, idQtd, idTotal;
            idValor = 'ingval' + cnt;
            idQtd = 'qt' + cnt;
            idTotal = 'tot' + cnt;
            var chaveValor = 'ingval' + cnt;
            var chaveTotal = 'ingtotal' + cnt;
            var chaveQtd = 'ingqt' + cnt;
            var posicao = cnt;
            
            var parCalc = "'" + chaveValor + "','" + chaveQtd + "','" + chaveTotal + "','" + idQtd + "','" + posicao + "'";
            var qtd = '<input type="number" value="' + varQtd + '" min="1" max="10" id="' + idQtd + '" onchange="calcular('+ parCalc + ');">';
            
            table += '<tr><td>';  
            table += nome;
            table += '</td><td>';
            table += parseFloat(preco).toFixed(2);
            table += '</td><td>';
            table += qtd;
            table += '</td><td>';
            total = t.toFixed(2);
            totalGeral = (totalGeral + parseFloat(t));
            table += total;
            table += '</td></td>';      
            cnt += 1;
        }
    } 
    table += '</table>';
    table += '<input type="hidden" id="totalP" value="' + totalGeral.toFixed(2) + '">';
    document.getElementById("showIngredientes").innerHTML = table;        
    
    var qtdAtual = localStorage.getItem("quantidade");
    document.getElementById("quantidade").value = qtdAtual;
        
    var tg = parseFloat(localStorage.getItem("totalGeral"));

    document.getElementById("totalGeral").innerHTML = 'Total: R$ ' + totalGeral.toFixed(2); 
    document.getElementById("totalP").value = totalGeral;

    var descLight = parseFloat(localStorage.getItem("light"));
    var descCarne = parseFloat(localStorage.getItem("muitacarne"));
    var descQueijo = parseFloat(localStorage.getItem("muitoqueijo"));
    var tDesconto = parseFloat(localStorage.getItem("totalcomdesconto"));

    document.getElementById("descontoLight").innerHTML = 'R$ ' + descLight.toFixed(2);
    document.getElementById("descontoMuitaCarne").innerHTML = 'R$ ' + descCarne.toFixed(2);
    document.getElementById("descontoMuitoQueijo").innerHTML = 'R$ ' + descQueijo.toFixed(2); 
    document.getElementById("totalComDescontos").innerHTML = 'R$ ' + tDesconto.toFixed(2); 

    var click = "AddCarrinho('Personalizado " + getIdLanchePersonalizado() + "',document.getElementById('quantidade').value," + getIdLanchePersonalizado() + ", localStorage.getItem('totalcomdesconto'))" ;
    button = '<button type="button" class="btn btn-success" id="adicionar1" id="produto1" onclick="' + click + '"> Comprar </button>';
    buttonCancelar = '&nbsp;<button type="button" class="btn btn-default" id="btnCancelar" onclick="getIngredientes();">Cancelar</button>';
       
    button += buttonCancelar;
    document.getElementById('botaoComprar').innerHTML = button;
    formaPreco(); 
}


function getIdLanchePersonalizado(){
    var r = parseInt(Math.random() * 50) + 30;
    return r;
}

function atualizaQtds(){
    for(i =1; i < 6; i++){
        localStorage.setItem("ingqt" + i, 1);
    }
    setValoresDescontosIniciais();
    getIngredientes();
    location.reload();
}
