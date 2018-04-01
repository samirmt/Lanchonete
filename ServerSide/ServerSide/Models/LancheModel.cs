using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ServerSide.Models
{
    public class LancheModel
    {
        public int Id;
        public string Nome;
        public double Preco;
        public List<IngredienteModel> Ingredientes;
    }
}