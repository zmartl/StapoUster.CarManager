
using System.Web.Http;
using CarManager.Api;
using CarManager.Api.App_Start;
using CarManager.Shared.AutomatedMappings;
using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Microsoft.Practices.Unity.WebApi;
using Owin;

[assembly: OwinStartup(typeof(Startup))]

namespace CarManager.Api
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            WebApiConfig.Register(config);

            config.DependencyResolver = new UnityDependencyResolver(UnityConfig.GetConfiguredContainer());
            AutoMapperGenerator.GenerateMappings();

            var physicalFileSystem = new PhysicalFileSystem(@".\wwwroot");
            var options = new FileServerOptions
            {
                RequestPath = PathString.Empty,
                EnableDefaultFiles = true,
                FileSystem = physicalFileSystem
            };
            options.DefaultFilesOptions.DefaultFileNames = new[] { "index.html" };
            options.StaticFileOptions.FileSystem = physicalFileSystem;
            options.StaticFileOptions.ServeUnknownFileTypes = true;
            app.UseFileServer(options);

            app.Use(async (context, next) => {
                await next();

                if (context.Response.StatusCode == 404 && !System.IO.Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = new PathString("/wwwroot/index.html"); // Put your Angular root page here 
                    await next();
                }
            });

            app.UseWebApi(config);
            app.UseStaticFiles();
        }
    }
}