<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="WidgetsTask.ascx.cs" Inherits="WidgetTasksUserControl.ControlTemplates.WidgetTasksUserControl.WidgetsTask" %>
<SharePoint:ScriptLink Language="javascript" Name="CustomjsLibs/jquery-2.1.4.min.js" Defer="false" runat="server" Localizable="false" />

<!-- all tasks-->
<div id="all_tasks_container" style="display: none">
    <asp:Label ID="all_tasks" runat="server"></asp:Label>
</div>
<!-- focus tasks-->
<div id="focus_tasks_container" style="display: none">
    <asp:Label ID="focus_tasks" runat="server"></asp:Label>
</div>
<!-- control tasks-->
<div id="control_tasks_container" style="display: none">
    <asp:Label ID="control_tasks" runat="server"></asp:Label>
</div>
<!-- my tasks -->
<div id="my_tasks_container" style="display: none">
    <asp:Label ID="my_tasks" runat="server"></asp:Label>
</div>


<div class="btn_container">
    <input value="Выдать Задачу" class="btn_taskout" type="button">
</div>

<!-- окно: выдать задачу -->
<div id="give_task">
    <div id="give_task_text">
        <div class="userTargetModalContainer">
            <label for="userTarget" class="userTargetModalContainer title">Кому:</label>
            <input class="userTargetModalContainer unit" name="userTarget" id="userTarget" value="" />
        </div>
        <div class="give_task_title">
            <div>
                <asp:Label runat="server" AssociatedControlID="taskTitle" CssClass="labelTitle" Text="Заголовок"></asp:Label>
            </div>
            <asp:TextBox ID="taskTitle" CssClass="textLabelTitle" runat="server"></asp:TextBox>
        </div>
        <div class="give_task_description">
            <div>
                <asp:Label AssociatedControlID="Description" CssClass="labelDescription" runat="server" Text="Текст:"></asp:Label>
            </div>
            <asp:TextBox ID="Description" TextMode="multiline" Columns="50" Rows="5" CssClass="textModalClaim" runat="server"></asp:TextBox>
        </div>

        <div class="give_task_deadline">
            <div>
                <asp:Label AssociatedControlID="dtDatePicker" runat="server" Text="Дата выполнения:"></asp:Label>
            </div>
            <asp:TextBox ID="dtDatePicker" runat="server" CssClass="form-control dtDatePicker"/>
        </div>

        <div class="give_task_file">
            <div>
                <asp:Label AssociatedControlID="give_task_file" CssClass="labelFile" runat="server" Text="Файлы"></asp:Label>
            </div>
            <asp:FileUpload ID="give_task_file" runat="server" />
        </div>

        <div>
            <div>
                <asp:Label AssociatedControlID="DropDownUrgency" CssClass="labelUrgently" runat="server" Text="Срочность выполнения"></asp:Label>
            </div>
            <asp:DropDownList ID="DropDownUrgency" runat="server">
                <asp:ListItem>В течение дня</asp:ListItem>
                <asp:ListItem>Срочно</asp:ListItem>
                <asp:ListItem>В течение 1 часа</asp:ListItem>
                <asp:ListItem>В течение 2 часов</asp:ListItem>
                <asp:ListItem>В течение 4 часов</asp:ListItem>
            </asp:DropDownList>
        </div>

        <asp:HiddenField ID="targetUserId" runat="server" />
        <asp:Button ID="btn_give_task" Text="Выдать Задачу" CssClass="btn btn-default btnGiveTask" OnClick="BtnGiveTask_Click" runat="server" />
    </div>
</div>

<!-- окно: посмотреть задачу -->
<div id="display_task">
    <div id="display_task_text">
        <div class="display_task_sourceUser">
            <div>
                <label>От кого:</label>
            </div>
            <div id="display_task_sourceUser"></div>
        </div>

        <div class="display_task_targetUser">
            <div>
                <label>Кому</label>
            </div>
            <div id="display_task_targetUser"></div>
        </div>

        <div class="display_task_createdDate">
            <div>
                <label>Дата создания</label>
            </div>
            <div id="display_task_createdDate"></div>
        </div>

        <div class="display_task_deadlineDate">
            <div>
                <label>Дата выполнения</label>
            </div>
            <div id="display_task_deadlineDate"></div>
        </div>

        <div class="display_task_title">
            <div>
                <label>Заголовок</label>
            </div>
            <div id="display_task_title"></div>
        </div>

        <div class="display_task_description">                            
            <div>
                <label>Текст</label>
            </div>
                <textarea id="display_task_description"></textarea>            
        </div>

        <div class="display_task_file">
            <div>
                <label class="labelFile">Файлы</label>
            </div>
            <asp:FileUpload ID="display_task_file" runat="server" />
        </div>

        <div class="display_task_receive">
            <div>
                <label>Начать выполнять задачу</label>
            </div>
            <asp:Button ID="btn_task_receive" runat="server" Text="Начать выполнять" OnClick="StartDoingTask"/>
        </div>

        <div class="display_task_comment_receive">
            <div>
                <asp:Label AssociatedControlID="commentTaskReceive" runat="server" Text="Комментарий выполнения"></asp:Label>
            </div>
            <asp:TextBox ID="commentTaskReceive" TextMode="multiline" Columns="50" Rows="5" runat="server"></asp:TextBox>
        </div>

        <div class="display_task_decline">
            <div>
                <label>Отклонить задачу</label>
            </div>
            <asp:Button ID="btn_task_decline" runat="server" Text="Отклонить" OnClick="DeclineTask"/>
        </div>

        <div class="display_task_comment_decline">
            <div>
                <asp:Label  AssociatedControlID="commentTaskDecline" runat="server" Text="Комментарий отклонения"></asp:Label>
            </div>
            <asp:TextBox ID="commentTaskDecline" TextMode="multiline" Columns="50" Rows="5" runat="server"></asp:TextBox>
        </div>
        
          <div class="display_task_confirm_done">
            <div>
                <label>Подтвердить выполнение</label>
            </div>
            <asp:Button ID="btn_confirm_task_done" runat="server" Text="Подтвердить выполнение" OnClick="ConfirmTaskDone"/>
        </div>

    </div>
</div>

<script>
    $(document)
        .ready(function () {
            
            $(function () {
                $('input[id*="dtDatePicker"]').datepicker({
                    dateFormat: 'dd.mm.yy',
                    maxDate: 0
                });
            });

            $("input[name='userTarget']").pickSPUser({
                onPickUser: function () {
                    $("#userTarget").next().find(".pt-pickSPUser-input").hide();
                    document.getElementById('<%=targetUserId.ClientID %>').value = $("#userTarget").val().split(";")[0];
                },
                onRemoveUser: function () {
                    $("#userTarget").next().find(".pt-pickSPUser-input").show();
                },
                filterSuggestions: function (suggestions) {
                    var newSuggestions = [];
                    var prevEmail = null;
                    $.each(suggestions, function (i, userInfo) {
                        if (prevEmail === userInfo.email)
                            return true;
                        prevEmail = userInfo.email;
                        newSuggestions.push(userInfo);
                    });
                    return newSuggestions;
                }
            });
        });

</script>


