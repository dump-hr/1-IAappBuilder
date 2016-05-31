using System.Web;
using System.Web.Optimization;

namespace AirCloud.Web
{
    public class BundleConfig
    {
        // temporary, should be replaced with gulp
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/vendorJs")
                .IncludeDirectory("~/Scripts", "*.js", searchSubdirectories: true));
        }
    }
}
