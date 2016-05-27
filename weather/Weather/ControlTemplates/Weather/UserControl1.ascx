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

                <table id="weatherTableTop" align="center">
                    <tbody>
                        <tr>
                            <td style="width: 164px;">
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
                            
                            <td>
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

                            <td>
                                <strong>Магнитогорск</strong>
                                <br>
                                <br>
                                <i runat="server" id="magnitogorskWeatherIcon"></i>
                                <br>
                                <asp:Label ID="magnitogorskWeatherDescription" runat="server" Text="Label"></asp:Label>
                                <br>
                                <asp:Label ID="magnitogorskWeatherDegrees" runat="server" Text="Label"></asp:Label>
                                <br>
                            </td>

                        </tr>
                    </tbody>
                </table>

                <table id="weatherTableBottom" align="center">
                    <tbody>
                        <tr>

                            <td>
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
                        
                            <td>
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
                            <td>
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
                            <td>
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
