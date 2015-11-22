<%-- Следующие 4 строки представляют собой директивы ASP.NET, необходимые при использовании компонентов SharePoint --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%-- Разметка и скрипт из следующего элемента Content будут помещены в элемент <head> страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>

    <!-- Добавьте свои стили CSS в следующий файл -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css"/>
    <link href="../Content/bootstrap-scope.min.css" rel="stylesheet"/>

    <!-- Добавьте свой код JavaScript в следующий файл -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- Разметка из следующего элемента Content будет помещена в элемент TitleArea страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Заявка в техподдержку
</asp:Content>

<%-- Разметка и скрипт из следующего элемента Content будут помещены в элемент <body> страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div class="bootstrap-scope">
        <div class="bootstrap-html">
            <div class="bootstrap-body">
                <!-- <div class="container">-->
                <label>Пожалуйста, заполните форму</label>
                <br><br>
                <form>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="category">Выберите категорию</label>
                                <div>
                                    <select id="category" class="form-control">
                                        <option>Починка оборудования</option>
                                        <option>Починка ПО</option>
                                        <option>Интернет</option>
                                        <option>Lync</option>
                                        <option>Документы</option>
                                        <option>Другое</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="discription">Описание</label>
                                <div>
                                    <textarea style="height: 100px;" class="form-control" id="discription" rows="3"></textarea>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="howfast"> Определите срочность:</label>
                                <div>
                                    <select id="howfast" class="form-control">
                                        <option>в течении дня</option>
                                        <option>в течении 1 часа</option>
                                        <option>в течении 2 часов</option>
                                        <option>в течении 4 часов</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                   
                            </div>
                            <input id="Button1" type="button" class="btn btn-default" OnClick="processSendEmails();" runat="server" value="Отправить"/>
                            <input id="Button2" type="button" class="btn btn-default" OnClick="getEmailCurrentUser();" runat="server" value="Получить текущий email"/>
                            <input id="Button3" type="button" class="btn btn-default" OnClick="anotherAttempt();" runat="server" value="Отправить"/>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label>
                                    FAQ:
                                </label>
                                <div class="panel-footer">
                                    Добро пожаловать на страницу техподдержки.
                                    <p>Через обратную форму Вы можете отправить нам заявку.</p>
                                    <p>
                                        Интсрукция по 1 пункту.
                                    </p>
                                    <p>
                                        Интсрукция по 2 пункту.
                                    </p>
                                    <p>
                                        Интсрукция по 3 пункту.
                                    </p>
                                    <p>
                                        Интсрукция по 4 пункту.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            
                </div>
                
                <div id="test">
                    
                </div>
            
            <div>
         <input id="showButton" type="button" value="Show Movies2" />
                
                 <input id="showButton2" type="button" value="Movies2 ajax" />
    </div>

    <div id="resultsDiv">
    </div>

            
        </div>
    </div>

</asp:Content>