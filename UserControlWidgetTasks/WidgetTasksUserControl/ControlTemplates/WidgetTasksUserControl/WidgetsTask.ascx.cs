using System;
using System.Web.UI;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Utilities;

namespace WidgetTasksUserControl.ControlTemplates.WidgetTasksUserControl
{
    public partial class WidgetsTask : UserControl
    {
        private const string SiteUrl = "http://devsp/sites/search";

        protected void Page_Load(object sender, EventArgs e)
        {
            all_tasks.Text = "";
            focus_tasks.Text = "";
            control_tasks.Text = "";
            my_tasks.Text = "";

            if (IsPostBack)
            {

            }
        }

        protected String TargetUserId
        {
            get
            {
                return hidden.Value;
            }
            set
            {
                hidden.Value = value;
            }
        }

        protected void BtnGiveTask_Click(object sender, EventArgs e)
        {
            var userTargetInfo = new SPSite(SiteUrl).OpenWeb().SiteUsers.GetByID(Convert.ToInt32(TargetUserId));

            var titleText = "Новая Задача";
            var bodyText = "Добрый день, " + userTargetInfo.Name + "!" + "<br>" + " Для Вас назначена задача" + "<br>" 
              + Discription.Text +  
             "<br>" + " Имя отправителя " +
                           GetCurrentUserInfo().Name;

            using (var objSite = new SPSite(SiteUrl))
            {
                using (var oweb = objSite.OpenWeb())
                {
                    SPUtility.SendEmail(oweb, false, false, userTargetInfo.Email, titleText, bodyText);
                }
            }
        }

        private SPUser GetCurrentUserInfo()
        {            
            var site = new SPSite(SiteUrl);
            return site.OpenWeb().CurrentUser;
        }

        public void SendEmail()
        {
            
        }

        public static void FetchAllTasks(string userId, string filter)
        {

        }

        public static void FetchControlTasks(string userId, string filter)
        {
            
        }

        public static void FetchMyTasks(string userId, string filter)
        {
            
        }

        public static void FetchFocusesTasks(string userId, string filter)
        {
            
        }

        public static void GiveTask()
        {
            
        }

        protected void ListBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
    }
}
