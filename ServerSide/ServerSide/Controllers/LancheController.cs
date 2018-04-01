using ServerSide.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ServerSide.Controllers
{
    [RoutePrefix("api/lanche")]
    public class LancheController : ApiController
    {

        DadosController dados = new DadosController();

        public IHttpActionResult Get()
        {
            List<LancheModel> lanches = new List<LancheModel>();

            lanches = dados.GetLanches();
                        
            return Ok(lanches);
        }


        public IHttpActionResult Get(int id)
        {
            if(id == 0)
            {
                return BadRequest();
            }
            
            LancheModel lanche = dados.GetPorId(id);

            return Ok(lanche);
        }
                        
    }
}
