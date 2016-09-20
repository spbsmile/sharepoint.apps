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

<div id="dialog-form">
    <div id="dialogText">

        <div class="userTargetModalContainer">
            <label class="userTargetModalContainer title">Назначить сотруднику:</label>
            <input class="userTargetModalContainer unit" name="userTarget" id="userTarget" value="" />
        </div>
        <div class="discriptionContainerModal">
            <div>
                <label class="labelDiscription">Текст:</label>
            </div>
            <asp:TextBox ID="Discription" CssClass="textModalClaim" runat="server"></asp:TextBox>            
        </div>
        <div>
            <div>
                <label class="labelCategory" for="categoryModalClaim">Категория</label></div>
            <asp:DropDownList ID="ListBox1" runat="server" OnSelectedIndexChanged="ListBox1_SelectedIndexChanged">
                <asp:ListItem>Программное обеспечение</asp:ListItem>
                <asp:ListItem>Оборудование</asp:ListItem>
                <asp:ListItem>Принтеры</asp:ListItem>
                <asp:ListItem>Интернет</asp:ListItem>
                <asp:ListItem>Почта</asp:ListItem>
                <asp:ListItem>Телефония</asp:ListItem>
                <asp:ListItem>Другое</asp:ListItem>
            </asp:DropDownList>
        </div>
        <div>
            <label class="labelFile">
                Добавить файл</label>
        </div>
        <input type="file" id="getFile">
        <div>
            <div>
                <label class="labelUrgently" for="urgencyModalClaim">Срочность выполнения</label></div>         
            <asp:DropDownList ID="DropDownUrgency" runat="server">
                <asp:ListItem>В течение дня</asp:ListItem>
                <asp:ListItem>Срочно</asp:ListItem>
                <asp:ListItem>В течение 1 часа</asp:ListItem>
                <asp:ListItem>В течение 2 часов</asp:ListItem>
                <asp:ListItem>В течение 4 часов</asp:ListItem>
            </asp:DropDownList>
        </div>

        <ul id="loaderClaimGive" class="fa-ul" hidden="true">
            <li>
                <i class="fa-li fa fa-spinner fa-spin"></i>Выполнение
            </li>
        </ul>
        
        <asp:HiddenField ID="hidden" runat="server" />
        
        <asp:Button ID="BtnGiveTask" Text="Выдать Задачу" CssClass="btn btn-default btnGiveTask" OnClick="BtnGiveTask_Click" runat="server" />
    </div>
</div>

<script>
    $(document)
        .ready(function () {

            $("#dialog-form").hide();

            $("#dialog-form")
                .click(function() {
                    $(".btn_taskout").show();
                });

            $("input[name='userTarget']").pickSPUser({
                onPickUser: function () {
                    $("#userTarget").next().find(".pt-pickSPUser-input").hide();

                    $(".damp_user_id").text($("#userTarget").val().split(";")[0]);
                    document.getElementById('<%=hidden.ClientID %>').value = $("#userTarget").val().split(";")[0];
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


