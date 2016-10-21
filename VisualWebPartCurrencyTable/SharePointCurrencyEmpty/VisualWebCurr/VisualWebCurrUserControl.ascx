<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="VisualWebCurrUserControl.ascx.cs" Inherits="SharePointCurrencyEmpty.VisualWebCurr.VisualWebCurrUserControl" %>

<SharePoint:CssRegistration Name="/_layouts/15/CustomCss/jquery-ui.min.css" runat="server" />

<SharePoint:ScriptLink Language="javascript" Name="CustomjsLibs/jquery-2.1.4.min.js" Defer="false" runat="server" Localizable="false" />
<SharePoint:ScriptLink Language="javascript" Name="CustomjsLibs/jquery-ui.min.js" Defer="false" runat="server" Localizable="false" />
<SharePoint:ScriptLink Language="javascript" Name="CustomjsLibs/jquery.ui.datepicker-ru.js" Defer="false" runat="server" Localizable="false"/>
<SharePoint:ScriptLink Language="javascript" Name="CustomjsLibs/1.devsp/currencies_table.js" Defer="false" runat="server" Localizable="false"/>

<div id="rowChangeDate">
<div class="form-group">
    <asp:TextBox ID="dtDatePicker" runat="server" CssClass="form-control dtDatePicker" Style="width: 100px; float: left; margin-left: 45%;"/>
</div>
<asp:Button ID="BtnDatechange" Text="Изменить" CssClass="btn btn-default btnDateChange" OnClick="BtnDatechange_Click" runat="server" />
</div>

<!-- log html tag with display none:  -->
<asp:Label runat="server" CssClass="log" id="Log"></asp:Label>

<div class="bootstrap-scope">
    <div class="bootstrap-html">
        <div class="bootstrap-body">
            <table id="tablecurrency" class="table table-condensed table-hover">
                <tr class="firstRowTable">
                    <td class="columnFixedWidth">Цифр. код</td>
                    <td class="columnFixedWidth">Обозначение</td>
                    <td class="columnFixedWidth">Едениц</td>
                    <td>Валюта</td>
                    <td class="columnFixedWidth">Курс</td>
                </tr>
                <!-- todo: change on dynamic asp table -->
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode1"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode1"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal1"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name1"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value1"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode2"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode2"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal2"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name2"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value2"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode3"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode3"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal3"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name3"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value3"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode4"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode4"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal4"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name4"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value4"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode5"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode5"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal5"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name5"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value5"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode6"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode6"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal6"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name6"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value6"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode7"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode7"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal7"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name7"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value7"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode8"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode8"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal8"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name8"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value8"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode9"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode9"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal9"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name9"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value9"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode10"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode10"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal10"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name10"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value10"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode11"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode11"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal11"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name11"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value11"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode12"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode12"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal12"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name12"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value12"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode13"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode13"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal13"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name13"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value13"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode14"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode14"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal14"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name14"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value14"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode15"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode15"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal15"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name15"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value15"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode16"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode16"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal16"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name16"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value16"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode17"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode17"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal17"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name17"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value17"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode18"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode18"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal18"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name18"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value18"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode19"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode19"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal19"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name19"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value19"></asp:Label></td>
                </tr>
                <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode20"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode20"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal20"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name20"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value20"></asp:Label></td>
                </tr>
                   <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode21"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode21"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal21"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name21"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value21"></asp:Label></td>
                </tr>
                   <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode22"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode22"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal22"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name22"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value22"></asp:Label></td>
                </tr>
                   <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode23"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode23"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal23"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name23"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value23"></asp:Label></td>
                </tr>
                   <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode24"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode24"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal24"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name24"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value24"></asp:Label></td>
                </tr>
                   <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode25"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode25"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal25"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name25"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value25"></asp:Label></td>
                </tr>
                   <tr>
                    <td>
                        <asp:Label runat="server" ID="numCode26"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="charCode26"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="nominal26"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="name26"></asp:Label></td>
                    <td>
                        <asp:Label runat="server" ID="value26"></asp:Label></td>
                </tr>

            </table>

        </div>
    </div>
</div>

