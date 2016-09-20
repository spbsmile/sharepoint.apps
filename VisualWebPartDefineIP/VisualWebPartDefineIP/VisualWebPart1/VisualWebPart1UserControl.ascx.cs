using System;
using System.Net;
using System.Web.UI;

namespace VisualWebPartDefineIP.VisualWebPart1
{
    public partial class VisualWebPart1UserControl : UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {                
                IP_client.Text = Page.Request.UserHostAddress;
                MachineName_client.Text = Dns.GetHostEntry(Page.Request.UserHostAddress).HostName;
            }
            catch (Exception m)
            {
                MachineName_client.Text = m.Message;
            }
        }
    }
}
