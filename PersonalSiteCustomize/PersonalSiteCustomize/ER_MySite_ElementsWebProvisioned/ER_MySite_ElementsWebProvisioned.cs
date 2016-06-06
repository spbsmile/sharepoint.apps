using System;
using System.Security.Permissions;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Utilities;
using Microsoft.SharePoint.Workflow;

namespace PersonalSiteCustomize.ER_MySite_ElementsWebProvisioned
{
    /// <summary>
    /// Web Events
    /// </summary>
    public class ER_MySite_ElementsWebProvisioned : SPWebEventReceiver
    {
        public override void WebProvisioned(SPWebEventProperties properties)
        {
            SPWeb web = properties.Web;
            SPWeb rootWeb = web.Site.RootWeb;
            web.MasterUrl = rootWeb.MasterUrl;
            web.CustomMasterUrl = rootWeb.CustomMasterUrl;
            web.Update();
        }
    }
}