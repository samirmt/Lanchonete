function getLanches(){
    var url = 'http://localhost:50247/api/lanche/';
    var div = 'showLanches';
    $.ajax({
        type: 'GET',
        url: url,
        async: true,
        cache: false,
        dataType : 'json',        
        success: function(dados) {
            criarTabela(dados);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert('Erro: '+errorThrown+"\nna requisição: "+XMLHttpRequest+"\nStatus: "+textStatus);
        }
    });
}

function criarTabela(dados) {
    var lanche = "";
    var nome = "";
    var preco = "";
    var ing = "";
    var button = "";
    var qtd = "";
    var img = "<img src='img/lanche.png'  class='img-thumbnail' alt='Lanche' width='256' height='256'/>";
    var cnt = 1;
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    tr = table.insertRow(-1);
    var td = document.createElement("td");
    td.rowSpan = 4;
           
    for (var x in dados){                
        nome = '<h2>' + dados[x].Nome + "</h2>";
        preco = '<h5>R$ ' + dados[x].Preco.toFixed(2) + '</h5>'; 
                            
        var array_ing = dados[x].Ingredientes;
        var ing = "";
                
        for(var i in array_ing){
            ing += array_ing[i].Nome + ';';
        }
                
        ingredientes = '<p>' + ing + '</p>';
        qtd = '<input type="number" value="1" min="1" max="10" id="qtd' + cnt + '">';

        var click = "AddCarrinho('" + dados[x].Nome + "', document.getElementById('qtd" + cnt + "').value, '" + dados[x].Preco + "'," + cnt + ")" ;
        button = '<button type="button" class="btn btn-success" id="adicionar1" id="produto1" onclick="' + click + '"> Comprar </button>';
        
        cnt += 1;
        
        lanche = nome + preco + img + ingredientes + qtd + button;       
        
        tr.appendChild(td);
        var tabcell = tr.insertCell(-1);
        tabcell.innerHTML = lanche;
    }
    var divContainer = document.getElementById('showLanches');
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
  }