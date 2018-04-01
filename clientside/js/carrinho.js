function carregaCarrinho(){
    var totalGeral = 0; // variável que retorna o total dos produtos que estão na LocalStorage.
    var t = 0;
    var i = 0;     // variável que irá percorrer as posições
    var valor = 0; // variável que irá receber o preço do produto convertido em Float.
    
    var table = '<table class="table">'; 
    table += '<tr><th>Descrição</th><th>Valor</th><th>Qtd</th><th>Total</th><th>Ação</th><th></th>';


    for(i=1; i<=99; i++) // verifica até 99 produtos registrados na localStorage
    {
        var prod = localStorage.getItem("produto" + i + ""); // verifica se há recheio nesta posição. 
        if(prod != null) 
        {	
           var item = '';
           var qtd = localStorage.getItem("qtd" + i);
           var produto = localStorage.getItem("produto" + i);
           var valor = parseFloat(localStorage.getItem("valor" + i));
           var click = "removerItem('produto" + i + "')";
           var button = '<button type="button" class="btn btn-danger" onclick="' + click + '">X</button>';
           var total = parseFloat(localStorage.getItem("total" + i));
           
                      
           totalGeral = parseFloat(total) + parseFloat(totalGeral); // arredonda para 2 casas decimais com o .toFixed(2)
           
           table += '<tr><td>'; 
           table += produto;
           table += '</td><td>';
           table += valor.toFixed(2);
           table += '</td><td>';
           table += qtd;
           table += '</td><td>';
           table += total.toFixed(2);
           table += '</td><td>';
           table += button;
           table += '</td></td>'; 
        }
    } 
    table += '</table>';
     // exibe os dados da lista dentro da div itens    
     document.getElementById("itens").innerHTML = table;   
    // exibe o total dos recheios
    document.getElementById("total").innerHTML = 'R$ ' + totalGeral.toFixed(2); 
}

function limparCarrinho(){
    localStorage.clear(); 
    location.reload();
}

function removerItem(item){
    localStorage.removeItem(item);
    location.reload();
}