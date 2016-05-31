using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AirCloud.Web.Controllers
{
    public interface ITestService
    {
        string TestMsg { get; set; }
    }

    public class Test : ITestService
    {
        public string TestMsg { get; set; } = "test";
    }
    public class ValuesController : ApiController
    {
        public ValuesController(ITestService test)
        {
            this.test = test;
        }

        private readonly ITestService test;
        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2", test.TestMsg };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
