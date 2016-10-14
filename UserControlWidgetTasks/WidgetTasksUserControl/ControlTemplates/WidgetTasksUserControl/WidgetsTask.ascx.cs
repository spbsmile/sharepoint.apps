using System;
using System.Web.UI;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Utilities;

namespace WidgetTasksUserControl.ControlTemplates.WidgetTasksUserControl
{
    public partial class WidgetsTask : UserControl
    {
        private string SiteUrl = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            SiteUrl = SPContext.Current.Web.Url;

            all_tasks.Text = "";
            focus_tasks.Text = "";
            control_tasks.Text = "";
            my_tasks.Text = "";

            if (IsPostBack)
            {

            }
        }

        private String TargetUserId
        {
            get
            {
                return targetUserId.Value;
            }
            set
            {
                targetUserId.Value = value;
            }
        }

        protected void BtnGiveTask_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(TargetUserId)) return;
            var userTargetInfo = new SPSite(SiteUrl).OpenWeb().SiteUsers.GetByID(Convert.ToInt32(TargetUserId));

            var titleText = "Новая Задача";
            var bodyText = "Добрый день, " + userTargetInfo.Name + "!" +
                           "<br>" + " Для Вас назначена задача" +
                           "<br>" + " Заголовок: " + taskTitle.Text +
                           "<br>" + " Текст: " + Description.Text +
                           "<br>" + " Файлы: " + give_task_file.FileName +
                           "<br>" + " Дата Выполнения: " + dtDatePicker.Text +
                           "<br>" + "Назначил: " + GetCurrentUserInfo().Name +
                           "<br>" + "С уважением, : " + "<br>" +
                           "команда RIVS.";

            using (var objSite = new SPSite(SiteUrl))
            {
                using (var oweb = objSite.OpenWeb())
                {
                    SPUtility.SendEmail(oweb, false, false, userTargetInfo.Email, titleText, bodyText);
                }
            }
        }

        protected void StartDoingTask(object sender, EventArgs e)
        {
            throw new NotImplementedException();
        }

        protected void DeclineTask(object sender, EventArgs e)
        {
            throw new NotImplementedException();
        }

        protected void ConfirmTaskDone(object sender, EventArgs e)
        {
            throw new NotImplementedException();
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
    }
}
