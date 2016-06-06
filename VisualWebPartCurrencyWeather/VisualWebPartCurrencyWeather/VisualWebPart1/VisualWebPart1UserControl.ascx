<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="VisualWebPart1UserControl.ascx.cs" Inherits="VisualWebPartCurrencyWeather.VisualWebPart1.VisualWebPart1UserControl" %>


<div id="currency" style="display: none">
    <asp:Label ID="USDcurrency" runat="server"></asp:Label>
    <asp:Label ID="EURcurrency" runat="server"></asp:Label>
</div>

<div style="display: none">

    <i runat="server" id="spbIconDuplicat"></i>
    <asp:Label ID="spbDescriptionDuplicat" runat="server" Text="Label"></asp:Label>
    <asp:Label ID="spbDegreesDuplicat" runat="server" Text="Label"></asp:Label>

    <i runat="server" id="uchalyIcon"></i>
    <asp:Label ID="uchalyDescription" runat="server" Text="Label"></asp:Label>
    <asp:Label ID="uchalyDegrees" runat="server" Text="Label"></asp:Label>
    
    <i runat="server" id="kentayIcon"></i>
    <asp:Label ID="kentayDescription" runat="server" Text="Label"></asp:Label>
    <asp:Label ID="kentayDegrees" runat="server" Text="Label"></asp:Label>

    <i runat="server" id="magnitogorskIcon"></i>
    <asp:Label ID="magnitogorskDescription" runat="server" Text="Label"></asp:Label>
    <asp:Label ID="magnitogorskDegrees" runat="server" Text="Label"></asp:Label>

    <i runat="server" id="mscIcon"></i>
    <asp:Label ID="mscDescription" runat="server" Text="Label"></asp:Label>
    <asp:Label ID="mscDegrees" runat="server" Text="Label"></asp:Label>

    <i runat="server" id="erevanIcon"></i>
    <asp:Label ID="erevanDescription" runat="server" Text="Label"></asp:Label>
    <asp:Label ID="erevanDegrees" runat="server" Text="Label"></asp:Label>

    <i runat="server" id="erdenetIcon"></i>
    <asp:Label ID="erdenetDescription" runat="server" Text="Label"></asp:Label>
    <asp:Label ID="erdenetGegrees" runat="server" Text="Label"></asp:Label>

    <i runat="server" id="tashkentIcon"></i>
    <asp:Label ID="tashkentDescription" runat="server" Text="Label"></asp:Label>
    <asp:Label ID="tashkentDergrees" runat="server" Text="Label"></asp:Label>

</div>

