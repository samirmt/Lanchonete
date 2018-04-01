using ServerSide.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ServerSide.Controllers
{
    [RoutePrefix("api/ingrediente")]
    public class IngredienteController : ApiController
    {
        DadosController dados = new DadosController();

        public IHttpActionResult GetIngredientes()
        {
            List<IngredienteModel> ingredientes = dados.Ingredientes();

            return Ok(ingredientes);
        }
                
        public IHttpActionResult GetIngreduentePorId(int id)
        {
            List<IngredienteModel> ingredientes = dados.Ingredientes();
            IngredienteModel ingrediente = ingredientes.Find(x => x.Id == id);

            return Ok(ingrediente);
        }
    }
}
