<%-- Следующие 4 строки представляют собой директивы ASP.NET, необходимые при использовании компонентов SharePoint --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%-- Разметка и скрипт из следующего элемента Content будут помещены в элемент <head> страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-2.2.0.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery-ui.min.js"></script>
    <script type="text/javascript" src="../Scripts/moment.min.js"></script>
    <script type="text/javascript" src="../Scripts/moment-with-locales.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validate.min.js"></script>
    <script type="text/javascript" src="../Scripts/IsCurrentUserMemberOfGroup.js"></script>
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
    <div id="titlePage"> </div>
</asp:Content>

<%-- Разметка и скрипт из следующего элемента Content будут помещены в элемент <body> страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div class="bootstrap-scope">
        <div class="bootstrap-html">
            <div id="main" class="bootstrap-body">
                <div id="supportButton" hidden="true">
                    <input id="pressButtonSupport" type="button" class="btn btn-primary" value="Подать заявку"/>
                </div>
                <div id="supportForm" hidden="true">
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
                <div class="clearfix"></div>
                <div>
                    <div id ="tablesGuest" hidden="true">
                        <h2>Ваши заявки</h2>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th align="center" style ="width:100px;">Дата Создания</th>
                                    <th align="center" style ="width:100px;">Время</th>
                                    <th align="center" style ="width:500px;">Описание</th>
                                    <th align="center"  style ="width:200px;">Срочность</th>
                                    <th align="center"  style ="width:200px;">Категория</th>
                                    <th align="center"  style ="width:200px;">Приложенный файл</th>
                                    <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div id ="tablesBoss" hidden="true">
                        <h2>Новые заявки</h2>
                        <br/>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th align="center">#</th>
                                    <th align="center" style ="width:100px;">Дата Создания</th>
                                    <th align="center" style ="width:100px;">Время</th>
                                    <th align="center"  style ="width:200px;">Автор</th>
                                    <th align="center" style ="width:500px;">Описание</th>
                                    <th align="center"  style ="width:200px;">Срочность</th>
                                    <th align="center"  style ="width:200px;">Категория</th>
                                    <th align="center"  style ="width:200px;">Приложенный файл</th>
                                    <th align="center" style ="width:200px;">Принять на выполнение</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                     <td></td>
                                     <td></td>
                                     <td></td>
                                     <td></td>
                                    <td><button class="acceptIssue">Принять</button></td>
                                </tr>
                            </tbody>
                        </table>
                        <p>&nbsp;</p>
                        <hr/>
                        <h2>Принятые заявки</h2>
                        <br/>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th align="center">#</th>
                                    <th align="center" style ="width:100px;">Дата Создания</th>
                                    <th align="center" style ="width:100px;">Время</th>
                                    <th align="center"  style ="width:200px;">Автор</th>
                                    <th align="center" style ="width:500px;">Описание</th>
                                    <th align="center"  style ="width:200px;">Срочность</th>
                                    <th align="center"  style ="width:200px;">Приложенный файл</th>
                                    <th align="center">Сотрудник ИТ отдела</th>
                                    <th align="center">Выполняется с</th>
                                    <th align="center">Выполнено</th>
                                    <th align="center">Комментарий</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <p>&nbsp;</p>
                        <hr/>
                        <h2>Выполненные заявки</h2>
                        <br/>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th align="center">#</th>
                                    <th align="center" style ="width:100px;">Дата Создания</th>
                                    <th align="center" style ="width:100px;">Время</th>
                                    <th align="center"  style ="width:200px;">Автор</th>
                                    <th align="center" style ="width:500px;">Описание</th>
                                    <th align="center"  style ="width:200px;">Срочность</th>
                                    <th align="center"  style ="width:200px;">Категория</th>
                                    <th align="center">Оценка</th>
                                    <th align="center">Комментарий пользователя</th>
                                    <th align="center">Принята</th>
                                    <th align="center">Выполнена</th>
                                    <th align="center">Сотрудник ИТ отдела</th>
                                    <th align="center">Комментарий сотрудника ИТ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td align="center">Otto</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    </div>

</asp:Content>