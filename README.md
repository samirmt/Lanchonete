# Lanchonete
Sistema de Lanchonete

Sistema composto por um banckend e um frontend.

Backend - desenvolvido em C# MVC, responsavel por trabalhar os dados dos lanches e dos ingredientes a qual os compõe, 
não possui persistencia de dados, os dados são criados em tempo de execução. e devolve os dados em formato JSON.

Frontend - desenvolvido em HTML, CSS, JS, responsavel por consultar o backend via requisição ajax e gerar as telas dos lanches com os dados,
onde possui um pagina com os lanches padroes, ou seja, ja vem montado com os ingredientes, e possui uma pagina para personalizar
o lanche atraves dos ingredientes e quantidades selecionadas, é possivel ter tres formação de preco conforme os ingredientes selecionados.
apos a seleção dos lanches e clicar no botao comprar, o lanche seleiconado e adicionado a um carrinho de compra, onde e possivel ver
alguns detalhes da compra, como lanche, quantidade, preço e valor total.
