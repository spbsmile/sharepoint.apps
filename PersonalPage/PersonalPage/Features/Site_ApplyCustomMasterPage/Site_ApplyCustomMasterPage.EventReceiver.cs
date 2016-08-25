using System.Runtime.InteropServices;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Utilities;

namespace PersonalPage.Features.Site_ApplyCustomMasterPage
{
    /// <summary>
    /// Этот класс обрабатывает события, возникающие в ходе активации, деактивации, установки, удаления и обновления компонентов.
    /// </summary>
    /// <remarks>
    /// GUID, присоединенный к этому классу, может использоваться при создании пакета и не должен изменяться.
    /// </remarks>

    [Guid("b1ee6af8-e476-437b-9630-4768c06f32a7")]
    public class Site_ApplyCustomMasterPageEventReceiver : SPFeatureReceiver
    {
        public override void FeatureActivated(SPFeatureReceiverProperties properties)
        {
            SPSite siteCollection = (SPSite)properties.Feature.Parent;
            string masterUrl = SPUrlUtility.CombineUrl(siteCollection.ServerRelativeUrl, "_catalogs/masterpage/CustomMySite.master");

            foreach (SPWeb web in siteCollection.AllWebs)
            {
                try
                {
                    web.MasterUrl = masterUrl;
                    web.CustomMasterUrl = masterUrl;
                    web.Update();
                }
                catch
                {
                    if (web != null)
                        web.Dispose();

                    throw;
                }

                if (web != null)
                    web.Dispose();
            }
        }

        public override void FeatureDeactivating(SPFeatureReceiverProperties properties)
        {
            SPSite siteCollection = (SPSite)properties.Feature.Parent;
            string masterUrl = SPUrlUtility.CombineUrl(siteCollection.ServerRelativeUrl, "_catalogs/masterpage/mysite15.master");

            foreach (SPWeb web in siteCollection.AllWebs)
            {
                try
                {
                    web.MasterUrl = masterUrl;
                    web.CustomMasterUrl = masterUrl;
                    web.Update();
                }
                catch
                {
                    if (web != null)
                        web.Dispose();

                    throw;
                }

                if (web != null)
                    web.Dispose();
            }
        }
    }
}
