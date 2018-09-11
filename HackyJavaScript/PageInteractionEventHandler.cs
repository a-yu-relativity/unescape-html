using System;
using System.Runtime.InteropServices;
using kCura.EventHandler;
using kCura.EventHandler.CustomAttributes;
using kCura.Relativity.Client;
using Relativity.API;
using Relativity.Services.Objects;

namespace HackyJavaScript
{
    [kCura.EventHandler.CustomAttributes.Description("Show HTML Doc Viewer List")]
    [System.Runtime.InteropServices.Guid("fa6dcfa3-6507-4198-9c34-911f4da28aba")]
    public class PageInteractionEventhandler : kCura.EventHandler.PageInteractionEventHandler
    {
        public override Response PopulateScriptBlocks()
        {

            // Create a response object with default values
            kCura.EventHandler.Response retVal = new Response
            {
                Success = true,
                Message = string.Empty
            };

            int currentWorkspaceArtifactID = Helper.GetActiveCaseID();


            // js file compiled into string
            string htmlScript = $"<script type=\"text/javascript\">\n {javascripts.htmlscript} \n</script>";
            this.RegisterClientScriptBlock(new kCura.EventHandler.ScriptBlock() { Key = "hackyPieh", Script = htmlScript });

            //// call the function directly (at startup)
            //string callScript = "<script type=\"text/javascript\"> showHtml();</script>";
            //this.RegisterStartupScriptBlock(new kCura.EventHandler.ScriptBlock() { Key = "call", Script = callScript });

            return retVal;
        }
    }
}