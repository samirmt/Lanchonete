function formaPreco(){
    var precoTotal = parseFloat(document.getElementById("totalP").value);
    var tCarne = 0;
    var tQueijo = 0;
    var tLight = 0;
    var descontoLight = 10;
    var carne = document.getElementById("qt1").value;
    var queijo = document.getElementById("qt2").value;
    var ovo = document.getElementById("qt3").value;
    var bacon = document.getElementById("qt4").value;
    var alface = document.getElementById("qt5").value;
    var carnePreco = parseFloat(localStorage.getItem("ingval1"));
    var queijoPreco = parseFloat(localStorage.getItem("ingval2"));
    //Muita Carne
    var rCarne = carne % 3;
    if(rCarne == 0){
        var fator = 2;
        var calc = ((carne * fator) / 3);
        
        var r = carne * carnePreco;
        var r1 = calc * carnePreco;
        
        tCarne = (r - r1);

        localStorage.setItem("muitacarne", tCarne);
        document.getElementById("descontoMuitaCarne").innerHTML = "R$ " + tCarne.toFixed(2);
    }else{
        localStorage.setItem("muitacarne", 0);
        document.getElementById("descontoMuitaCarne").innerHTML = "R$ 0.00";
    }

    //Muito Queijo
    var rQueijo = queijo % 3;
    if(rQueijo == 0){
        var fator = 2;
        var calc = ((queijo * fator) / 3);

        var r = queijo * queijoPreco;
        var r1 = calc * queijoPreco;

        tQueijo = (r - r1);
        localStorage.setItem("muitoqueijo", tQueijo);
        document.getElementById("descontoMuitoQueijo").innerHTML = "R$ " + tQueijo.toFixed(2);
    }else{
        localStorage.setItem("muitoqueijo", 0);
        document.getElementById("descontoMuitoQueijo").innerHTML = "R$ 0.00";
    }

    //Light
    if(alface > 0 && bacon == 0){
        tLight = parseFloat((precoTotal * descontoLight)/100);
        localStorage.setItem("light", tLight);
        document.getElementById("descontoLight").innerHTML = "R$ " + tLight.toFixed(2);
        
        //alert('Voce escolheu a versão Light, irá pagar R$ ' + total.toFixed(2));                
    }else{
        localStorage.setItem("light", 0);
        document.getElementById("descontoLight").innerHTML = 'R$ 0.00';
    }

   var t =  (parseFloat(tCarne) + parseFloat(tQueijo) + parseFloat(tLight));
   var totalAtual = parseFloat(document.getElementById('totalP').value);
   var totalComDesconto = (totalAtual - t);

   localStorage.setItem("totalcomdesconto", totalComDesconto);
   document.getElementById('totalComDescontos').innerHTML = 'R$ ' + totalComDesconto.toFixed(2);
   
        
}

