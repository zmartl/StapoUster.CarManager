using Newtonsoft.Json.Serialization;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace CarManager.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web-API-Konfiguration und -Dienste
            config.Formatters.Clear();
            config.Formatters.Add(new JsonMediaTypeFormatter());
            // Set kleine Buchstaben für properties (json-Standard)
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // Web-API-Routen
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
