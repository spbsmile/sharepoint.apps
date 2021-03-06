using System;
using System.Runtime.InteropServices;
using System.Security.Permissions;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Utilities;

namespace PersonalPageRivs.Features.Site_ApplyCustomMasterPage
{
    /// <summary>
    /// Этот класс обрабатывает события, возникающие в ходе активации, деактивации, установки, удаления и обновления компонентов.
    /// </summary>
    /// <remarks>
    /// GUID, присоединенный к этому классу, может использоваться при создании пакета и не должен изменяться.
    /// </remarks>

    [Guid("b2681fe9-75e1-4ea6-9c94-35fc34822d3c")]
    public class Site_ApplyCustomMasterPageEventReceiver : SPFeatureReceiver
    {
        public override void FeatureActivated(SPFeatureReceiverProperties properties)
        {
            var siteCollection = (SPSite)properties.Feature.Parent;
            var masterUrl = SPUrlUtility.CombineUrl(siteCollection.ServerRelativeUrl, "_catalogs/masterpage/CustomMySite.master");

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
            var siteCollection = (SPSite)properties.Feature.Parent;
            var masterUrl = SPUrlUtility.CombineUrl(siteCollection.ServerRelativeUrl, "_catalogs/masterpage/mysite15.master");

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
