<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="UserControl1.ascx.cs" Inherits="Weather.ControlTemplates.Weather.UserControl1" %>
<style>
    .wi-fw {
        transform: scale(2, 2);
    }
</style>

<div id="weatherCont" style="float: right; padding-right: 150px;">
    <i runat="server" id="spbWeatherIcon"></i>
    <p>
        <asp:Label ID="spbWeatherDescription" runat="server" Text="Label"></asp:Label>
        <asp:Label ID="spbWeatherDegrees" runat="server" Text="Label"></asp:Label>
    </p>
    <a href="#" id="weatherOtherСityes" data-toggle="modal" data-target="#myModal">Другие города</a>
</div>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Погода на сегодня</h4>
            </div>
            <div class="modal-body">

                <table align="center" style="width: 400px;" >
                    <tbody>
                        <tr>
                            <td align="center">
                                <strong>Санкт-Петербург</strong>
                                <br>
                                <br>
                                <i runat="server" id="spbIconDuplicat"></i>
                                <br>
                                <asp:Label ID="spbDescriptionDuplicat" runat="server" Text="Label"></asp:Label>
                                <br>
                                <asp:Label ID="spbDegreesDuplicat" runat="server" Text="Label"></asp:Label>
                                <br>                                
                            </td> 
                            <td align="center">
                                <strong>Москва</strong>
                                <br>
                                <br>
                                <i runat="server" id="mscWeatherIcon"></i>
                                <br>
                                <asp:Label ID="mscWeatherDescription" runat="server" Text="Label"></asp:Label>
                                <br>
                                <asp:Label ID="mscWeatherDegrees" runat="server" Text="Label"></asp:Label>
                                <br>
                            </td>
                            <td align="center" >
                                <strong>Учалы</strong>
                                <br>
                                <br>
                                <i runat="server" id="uchalyWeatherIcon"></i>
                                <br>
                                <asp:Label ID="uchalyWeatherDescription" runat="server" Text="Label"></asp:Label>
                                <br>
                                <asp:Label ID="uchalyWeatherDegrees" runat="server" Text="Label"></asp:Label>
                                <br>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" >
                                <strong>Ереван</strong>
                                <br>
                                <br>
                                <i runat="server" id="erevanWeatherIcon"></i>
                                <br>
                                <asp:Label ID="erevanWeatherDescription" runat="server" Text="Label"></asp:Label>
                                <br>
                                <asp:Label ID="erevanWeatherDegrees" runat="server" Text="Label"></asp:Label>
                                <br>
                            </td>
                            <td align="center" >
                                <strong>Эрденет</strong>
                                <br>
                                <br>
                                <i runat="server" id="erdenetWeatherIcon"></i>
                                <br>
                                <asp:Label ID="erdenetWeatherDescription" runat="server" Text="Label"></asp:Label>
                                <br>
                                <asp:Label ID="erdenetWeatherGegrees" runat="server" Text="Label"></asp:Label>
                                <br>
                                
                            </td>
                            <td align="center" >
                                <strong>Ташкент</strong>
                                <br>
                                <br>
                                <i runat="server" id="tashkentWeatherIcon"></i>
                                <br>
                                <asp:Label ID="tashkentWeatherDescription" runat="server" Text="Label"></asp:Label>
                                <br>
                                <asp:Label ID="tashkentWeatherDergrees" runat="server" Text="Label"></asp:Label>
                                <br>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
            </div>
        </div>
    </div>
</div>
