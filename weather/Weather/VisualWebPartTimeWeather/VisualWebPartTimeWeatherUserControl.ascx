<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="VisualWebPartTimeWeatherUserControl.ascx.cs" Inherits="Weather.VisualWebPartTimeWeather.VisualWebPartTimeWeatherUserControl" %>

<div id="currency" style="display: none">
    <asp:Label ID="USDcurrency" runat="server"></asp:Label>
    <asp:Label ID="EURcurrency" runat="server"></asp:Label>
</div>

<h4>Погода на сегодня</h4>

<table id="weatherTableTime" align="center">
    <tbody>
        <tr>
            <td style="width: 130px;">
                <strong>Санкт-Петербург</strong>
                <br>
                <div id="timeSpb"></div>
                 <br>
                 <br>
                <i runat="server" id="spbIconDuplicat"></i>
                <br>
                <asp:Label ID="spbDescriptionDuplicat" runat="server" Text="Label"></asp:Label>
                <br>
                <asp:Label ID="spbDegreesDuplicat" runat="server" Text="Label"></asp:Label>
                <br>
            </td>

            <td style="width: 110px;">
                <strong>Учалы</strong>
                <br>
                <div id="timeUchaly"></div>
                 <br>
                <br>
                <i runat="server" id="uchalyWeatherIcon"></i>
                <br>
                <asp:Label ID="uchalyWeatherDescription" runat="server" Text="Label"></asp:Label>
                <br>
                <asp:Label ID="uchalyWeatherDegrees" runat="server" Text="Label"></asp:Label>
                <br>
            </td>

            <td style="width: 110px;">
                <strong>Магнитогорск</strong>
                <br>
                <div id="timeMagnitogorsk"></div>
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

<div style="display: none">
    <strong>Москва</strong>
    <br>
    <br>
    <i runat="server" id="mscWeatherIcon"></i>
    <br>
    <asp:Label ID="mscWeatherDescription" runat="server" Text="Label"></asp:Label>
    <br>
    <asp:Label ID="mscWeatherDegrees" runat="server" Text="Label"></asp:Label>
    <br>

    <strong>Ереван</strong>
    <br>
    <br>
    <i runat="server" id="erevanWeatherIcon"></i>
    <br>
    <asp:Label ID="erevanWeatherDescription" runat="server" Text="Label"></asp:Label>
    <br>
    <asp:Label ID="erevanWeatherDegrees" runat="server" Text="Label"></asp:Label>
    <br>

    <strong>Эрденет</strong>
    <br>
    <br>
    <i runat="server" id="erdenetWeatherIcon"></i>
    <br>
    <asp:Label ID="erdenetWeatherDescription" runat="server" Text="Label"></asp:Label>
    <br>
    <asp:Label ID="erdenetWeatherGegrees" runat="server" Text="Label"></asp:Label>
    <br>

    <strong>Ташкент</strong>
    <br>
    <br>
    <i runat="server" id="tashkentWeatherIcon"></i>
    <br>
    <asp:Label ID="tashkentWeatherDescription" runat="server" Text="Label"></asp:Label>
    <br>
    <asp:Label ID="tashkentWeatherDergrees" runat="server" Text="Label"></asp:Label>
    <br>
</div>

<script>

    $(document)
        .ready(function () {
            moment.locale(window.navigator.userLanguage || window.navigator.language);
            moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6");

            $("#timeSpb").text();
            $("#timeUchaly").text();
            $("#timeMagnitogorsk").text();

            displayTime();
            console.log("ready weather time !");
        });

    function displayTime() {

        $('#timeSpb').text(moment().format('HH:mm'));
        $('#timeUchaly').text(moment().format('HH:mm'));
        $('#timeMagnitogorsk').text(moment().format('HH:mm'));

        setTimeout(displayTime, 1000);
    }

</script>

