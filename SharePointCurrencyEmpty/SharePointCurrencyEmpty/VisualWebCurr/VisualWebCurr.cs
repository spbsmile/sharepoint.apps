using System;
using System.ComponentModel;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

namespace SharePointCurrencyEmpty.VisualWebCurr
{
    [ToolboxItemAttribute(false)]
    public class VisualWebCurr : WebPart
    {
        // Visual Studio может автоматически обновлять этот путь при изменении элемента проекта веб-части Visual.
        private const string _ascxPath = @"~/_CONTROLTEMPLATES/15/SharePointCurrencyEmpty/VisualWebCurr/VisualWebCurrUserControl.ascx";

        protected override void CreateChildControls()
        {
            Control control = Page.LoadControl(_ascxPath);
            Controls.Add(control);
        }
    }
}
