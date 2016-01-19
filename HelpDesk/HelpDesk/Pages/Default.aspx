﻿<%-- Следующие 4 строки представляют собой директивы ASP.NET, необходимые при использовании компонентов SharePoint --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%-- Разметка и скрипт из следующего элемента Content будут помещены в элемент <head> страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-2.2.0.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery-ui.min.js"></script>
    <script type="text/javascript" src="../Scripts/moment.min.js"></script>
    <script type="text/javascript" src="../Scripts/moment-with-locales.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validate.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>

    <!-- Добавьте свои стили CSS в следующий файл -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css"/>
    <link rel="stylesheet" type="text/css" href="../Content/jquery-ui.min.css"/>
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
                <div id ="supportButton">
                    <input id="pressButtonSupport" type="button" class="btn btn-primary" value="Подать заявку"/>
                </div>
                <div id ="supportForm">
                <label>Пожалуйста, заполните форму</label>
                <br><br>
                <form>
                    <div class="row">
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
                                <form id="mainform" name="mainform">

                                 </form>
                                 <form id="dialogform">
                                    <div>
                                        <textarea style="height: 100px;" class="form-control" id="discription" rows="3" name="pswd"></textarea>
                                    </div>
                                </form>
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
                            <input id="sendTicket" type="button" class="btn btn-default" value="Отправить"/>
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
                </form>
                </div>
                <h3>Принятые заявки</h3>
                <h3>Выполненные заявки</h3>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Дата</th>
                            <th>Пользователь</th>
                            <th>Текст</th>
                             <th>Оценка</th>
                            <th>Комментарий пользователя</th>
                            <th>Принята</th>
                            <th>Выполнена</th>
                            <th>Сотрудник ИТ отдела</th>
                            <th>Комментарий сотрудника ИТ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
            </div>
        </div>
    </div>

</asp:Content>