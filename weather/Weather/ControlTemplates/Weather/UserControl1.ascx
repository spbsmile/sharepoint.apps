<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="UserControl1.ascx.cs" Inherits="Weather.ControlTemplates.Weather.UserControl1" %>
<SharePoint:CssRegistration Name="/_layouts/15/CustomCss/weather.css" runat="server" />

<div id="weatherCont">
    <div id="weatherIcon"><i runat="server" id="spbWeatherIcon"></i></div>
    <div id="weatherTitleCity">Санкт-Петербург</div>
    <div id="weatherDis">
        <asp:Label ID="spbWeatherDescription" runat="server" Text="Label"></asp:Label>
        <asp:Label ID="spbWeatherDegrees" runat="server" Text="Label"></asp:Label>
    </div>
    <div id="weatherCity">
    <a href="#" id="weatherOtherСityes" data-toggle="modal" data-target="#myModal">другие города</a></div>
    <div id="currency" style="display: none">
         <asp:Label ID="USDcurrency" runat="server"></asp:Label>
         <asp:Label ID="EURcurrency" runat="server"></asp:Label>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Погода на сегодня</h4>     
            </div>
            <div class="modal-body">
                
              
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
            </div>
        </div>
    </div>
</div>
