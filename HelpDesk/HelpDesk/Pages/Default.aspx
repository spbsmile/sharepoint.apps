<%-- Следующие 4 строки представляют собой директивы ASP.NET, необходимые при использовании компонентов SharePoint --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~site/_catalogs/masterpage/rivs.master" Language="C#" %>

<%-- Разметка и скрипт из следующего элемента Content будут помещены в элемент <head> страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-2.2.0.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery-ui.min.js"></script>
    <script type="text/javascript" src="../Scripts/moment.min.js"></script>
    <script type="text/javascript" src="../Scripts/moment-with-locales.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validate.min.js"></script>
    <script type="text/javascript" src="../Scripts/IsCurrentUserMemberOfGroup.js"></script>
    <script type="text/javascript" src="../Scripts/getCurrentUser.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>

    <!-- Добавьте свои стили CSS в следующий файл -->
    <link rel="Stylesheet" type="text/css" href="../Content/jumbortron.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link rel="stylesheet" type="text/css" href="../Content/jquery-ui.min.css" />
    <link href="../Content/bootstrap-scope.min.css" rel="stylesheet" />

    <!-- Добавьте свой код JavaScript в следующий файл -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- Разметка из следующего элемента Content будет помещена в элемент TitleArea страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    <div id="titlePage"></div>
</asp:Content>

<%-- Разметка и скрипт из следующего элемента Content будут помещены в элемент <body> страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div class="bootstrap-scope">
        <div class="bootstrap-html">
            <div id="main" class="bootstrap-body">
                <div class="col-md-2"></div>
                <div id="supportButton">
                    <input id="pressButtonSupport" type="button" class="btn btn-primary" value="Подать заявку">
                </div>
                <div id="supportForm" hidden="true">
                    <!-- <div class="col-md-2"></div> -->
                    <label style="padding-left: 5px">Пожалуйста, заполните форму</label>
                    <div class="row" style="padding-top: 16px">
                        <div class="col-md-2"></div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="category">Выберите категорию</label>
                                <div>
                                    <select id="category" class="form-control">
                                        <option>...</option>
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
                                    <textarea style="height: 155px; margin: 0px -2.67188px 0px 0px; width: 618px;" class="form-control" id="discription" rows="3" name="pswd"></textarea>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="urgentlyValue">Определите срочность:</label>
                                <div>
                                    <select id="urgentlyValue" class="form-control">
                                        <option>В течении дня</option>
                                        <option>В течении 1 часа</option>
                                        <option>В течении 2 часов</option>
                                        <option>В течении 4 часов</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Добавить файл</label>
                                <input type="file" id="getFile">
                                <p class="help-block">Например, скриншот</p>
                            </div>
                            <input id="sendTicket" type="button" class="btn btn-default" value="Отправить">
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
                                        Инструкция по 1 пункту.
                                    </p>
                                    <p>
                                        Инструкция по 2 пункту.
                                    </p>
                                    <p>
                                        Инструкция по 3 пункту.
                                    </p>
                                    <p>
                                        Инструкция по 4 пункту.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div id="modalDialog"></div>
                    </div>
                </div>

                <div id="panelSendClaims" hidden="true">
                    <div class="clearfix"></div>
                    <div class="col-md-2"></div>
                    <div class="col-md-6" style="padding-left: 5px; padding-top: 44px;">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title">Отправленные Заявки</h3>
                            </div>
                            <table class="table table-hover" >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Дата Создания</th>
                                        <th>Время</th>
                                        <th>Описание</th>
                                        <th>Срочность</th>
                                        <th>Категория</th>
                                        <th>Приложенный файл</th>
                                        <th>Статус</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodySendClaims">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div id="panelAcceptedClaims" hidden="true">
                    <div class="clearfix"></div>
                    <div class="col-md-2"></div>
                    <div class="col-md-6" style="padding-left: 5px; padding-top: 44px;">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title">Заявки на рассмотрении</h3>
                            </div>
                            <table class="table table-hover" >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Дата Создания</th>
                                        <th>Время</th>
                                        <th>Описание</th>
                                        <th>Срочность</th>
                                        <th>Категория</th>
                                        <th>Приложенный файл</th>
                                        <th>Статус</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyAcceptedClaims">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div id="panelResolvedClaims" hidden="true">
                    <div class="clearfix"></div>
                    <div class="col-md-2"></div>
                    <div class="col-md-6" style="padding-left: 5px; padding-top: 44px;">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title">Выполненные Заявки</h3>
                            </div>
                            <table class="table table-hover" >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Дата Создания</th>
                                        <th>Время</th>
                                        <th>Описание</th>
                                        <th>Срочность</th>
                                        <th>Категория</th>
                                        <th>Приложенный файл</th>
                                        <th>Статус</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyResolvedClaims">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</asp:Content>
