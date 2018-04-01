using ServerSide.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ServerSide.Controllers
{
    public class DadosController : Controller
    {
      
        public DadosController() { }

        public List<LancheModel> GetLanches()
        {
            List<LancheModel> lanches = new List<LancheModel>();
            
            lanches.Add(XBacon());
            lanches.Add(XBurguer());
            lanches.Add(XEgg());
            lanches.Add(XEggBacon());
            
            return lanches;
        }

        public LancheModel GetPorId(int id)
        {
            List<LancheModel> lanches = GetLanches();

            LancheModel lanche = lanches.Find(x => x.Id == id);
            
            return lanche;
        }


        public LancheModel XBacon()
        {
            List<IngredienteModel> ing = new List<IngredienteModel>();
            LancheModel lanche = new LancheModel();


            ing.Add(GetIngredientePorId(4));
            ing.Add(GetIngredientePorId(1));
            ing.Add(GetIngredientePorId(2));
                        
            double total = ing.Sum(x => x.Preco);

            lanche.Id = 1;
            lanche.Nome = "X-Bacon";
            lanche.Preco = total;
            //lanche.Imagem = "/images/xbacon.png";
            lanche.Ingredientes = ing;

            return lanche;
        }

        public LancheModel XBurguer()
        {            
            List<IngredienteModel> ing = new List<IngredienteModel>();
            LancheModel lanche = new LancheModel();
            
            ing.Add(GetIngredientePorId(1));
            ing.Add(GetIngredientePorId(2));

            double total = ing.Sum(x => x.Preco);

            lanche.Id = 2;
            lanche.Nome = "X-Burguer";
            lanche.Preco = total;
            //lanche.Imagem = "/images/xburguer.png";
            lanche.Ingredientes = ing;

            return lanche;
        }


        public LancheModel XEgg()
        {
            List<IngredienteModel> ing = new List<IngredienteModel>();
            LancheModel lanche = new LancheModel();
            
            ing.Add(GetIngredientePorId(1));
            ing.Add(GetIngredientePorId(2));
            ing.Add(GetIngredientePorId(3));
                        
            double total = ing.Sum(x => x.Preco);

            lanche.Id = 3;
            lanche.Nome = "X-Egg";
            lanche.Preco = total;
            //lanche.Imagem = "/images/xegg.png";
            lanche.Ingredientes = ing;

            return lanche;
        }

        public LancheModel XEggBacon()
        {
            List<IngredienteModel> ing = new List<IngredienteModel>();
            LancheModel lanche = new LancheModel();
            string ingString = "";

            ing.Add(GetIngredientePorId(1));
            ing.Add(GetIngredientePorId(2));
            ing.Add(GetIngredientePorId(3));
            ing.Add(GetIngredientePorId(4));
                        
            double total = ing.Sum(x => x.Preco);                    

            lanche.Id = 4;
            lanche.Nome = "X-Egg Bacon";
            lanche.Preco = total;
            //lanche.Imagem = "/images/xeggbacon.png";
            lanche.Ingredientes = ing;

            return lanche;
        }

        public List<IngredienteModel> Ingredientes()
        {   
            return CriaIngredientes();
        }
                     
       
        public IngredienteModel GetIngredientePorId(int id)
        {
            List<IngredienteModel> ing = CriaIngredientes();

            IngredienteModel ingrediente = ing.Find(x => x.Id == id) ;

            return ingrediente;
        }


        public List<IngredienteModel> CriaIngredientes()
        {
            List<IngredienteModel> ing = new List<IngredienteModel>();

            ing.Add(new IngredienteModel { Id=1, Nome = "Hamburguer de Carne", Preco = precoIngrediente("carne") });
            ing.Add(new IngredienteModel { Id=2, Nome = "Queijo", Preco = precoIngrediente("queijo") });
            ing.Add(new IngredienteModel { Id=3, Nome = "Ovo", Preco = precoIngrediente("ovo") });
            ing.Add(new IngredienteModel { Id=4, Nome = "Bacon", Preco = precoIngrediente("bacon") });
            ing.Add(new IngredienteModel { Id=5, Nome = "Alface", Preco = precoIngrediente("alface") });

            return ing;
        }

        public double precoIngrediente(string ingrediente)
        {
            double valor = 0;
            string nome = ingrediente.ToLower();

            switch (nome)
            {
                case "alface":
                    valor = 0.40;
                    break;
                case "bacon":
                    valor = 2.00;
                    break;
                case "carne":
                    valor = 3.00;
                    break;
                case "ovo":
                    valor = 0.80;
                    break;
                case "queijo":
                    valor = 1.50;
                    break;
            }
            return valor;
        }
    }
}