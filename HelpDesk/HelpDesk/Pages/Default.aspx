<%-- Следующие 4 строки представляют собой директивы ASP.NET, необходимые при использовании компонентов SharePoint --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="../Content/rivs.master" Language="C#" %>

<%-- Разметка и скрипт из следующего элемента Content будут помещены в элемент <head> страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-2.2.0.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery-ui.min.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.validate.min.js"></script>
    <script type="text/javascript" src="../Scripts/core/IsCurrentUserMemberOfGroup.js"></script>
    <script type="text/javascript" src="../Scripts/core/getCurrentUser.js"></script>
    <script type="text/javascript" src="../Scripts/core/uploadFile.js"></script>
    <script type="text/javascript" src="../Scripts/core/recallClaim.js"></script>
    <script type="text/javascript" src="../Scripts/core/displayClaimsCurrentUser.js"></script>
    <script type="text/javascript" src="../Scripts/core/addClaim.js"></script>
     <script type="text/javascript" src="../Scripts/core/utils.js"></script>
    <script type="text/javascript" src="../Scripts/core/logs.js"></script>
    <script type="text/javascript" src="../Scripts/bootstrap.js"></script>
    <script type="text/javascript" src="../Scripts/searchRightTopCorner.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script> 

    <!-- Добавьте свои стили CSS в следующий файл -->
    <link rel="Stylesheet" type="text/css" href="../Content/jumbortron.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link rel="stylesheet" type="text/css" href="../Content/jquery-ui.min.css" />
    <link rel="stylesheet" type="text/css" href="../Content/bootstrap-scope.min.css"/>
    <link rel="stylesheet" type="text/css" href="../Content/font-awesome.css"/> 
    <link rel="stylesheet" type="text/css" href="../Content/hint.css"/> 
    <link rel="stylesheet" type="text/css" href="../Content/weather-icons.min.css"/>   

    <!-- Добавьте свой код JavaScript в следующий файл -->
    <script type="text/javascript" src="../Scripts/core/App.js"></script>
</asp:Content>

<%-- Разметка из следующего элемента Content будет помещена в элемент TitleArea страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    <div id="titlePage"></div>
</asp:Content>

<%-- Разметка и скрипт из следующего элемента Content будут помещены в элемент <body> страницы --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    
    <div class="ms-rtestate-field"><span class="ms-rteFontSize-5"><span class="ms-rteFontSize-6" style="margin-left: 45%">&#8203;&#8203;</span>&#8203;Техподдержка&#8203;&#8203;&#8203;&nbsp;&#8203;</span></div>

    <div class="bootstrap-scope">
        <div class="bootstrap-html">
            <div id="main" class="bootstrap-body">

                <div class="col-md-2"></div>
                <div id="supportButton">
                    <input id="pressButtonSupport" type="button" class="btn btn-primary hint--bottom-left hint--info" data-hint="Вы сами справились с задачей" value="Подать заявку">
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
                                        <option value="#">...</option>
                                        <option value="1">Оборудование</option>
                                        <option value="2">Починка ПО</option>
                                        <option value="3">Интернет</option>
                                        <option value="4">Skype for Business</option>
                                        <option value="5">Документы</option>
                                        <option value="6">Другое</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="discription">Описание</label>
                                <div>
                                    <textarea style="height: 155px; margin: 0px -2.67188px 0px 0px; width: 618px; resize: none;" class="form-control" id="discription" rows="3" name="pswd" ></textarea>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="urgentlyValue">Определите срочность:</label>
                                <div>
                                    <select id="urgentlyValue" class="form-control">
                                        <option>Срочно</option>
                                        <option>В течение 1 часа</option>
                                        <option>В течение 2 часов</option>
                                        <option>В течение 4 часов</option>
                                        <option>В течение дня</option>
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
                                </div>
                                <div id="1" class="panel-footer">
                                    <p>Оборудование</p>
                                    <p>
                                        Описание
                                    </p>
                                </div>
                                <div id="2"  class="panel-footer">
                                    <p>Починка ПО</p>
                                    <p>
                                        Описание
                                    </p>
                                </div>
                                <div id="3"  class="panel-footer">
                                    <p>Интернет</p>
                                    <p>
                                        Описание
                                    </p>
                                </div>
                                <div id="4" class="panel-footer">
                                    <p>Skype for Business</p>
                                    <p>
                                        Описание
                                    </p>
                                </div>
                                <div id="5" class="panel-footer">
                                    <p>Документы</p>
                                    <p>
                                        Описание
                                    </p>
                                </div>
                                <div id="6" class="panel-footer">
                                    <p>Другое</p>
                                    <p>
                                        Описание
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
                    <div class="col-md-8" style="padding-left: 5px; padding-top: 44px;">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title">Отправленные Заявки</h3>
                            </div>
                            <table id="tableSend" class="table table-hover">
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
                                        <th>Сотрудник ИТ</th>
                                        <th>Действие</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodySendClaims">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div id="panelResolvedClaims" hidden="true">
                    <div class="clearfix"></div>
                    <div class="col-md-2"></div>
                    <div class="col-md-8" style="padding-left: 5px; padding-top: 44px;">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title">Выполненные Заявки</h3>
                            </div>
                            <table id="tableResolved" class="table table-hover" >
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
                                        <th>Сотрудник ИТ</th>
                                        <th>Действие</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyResolvedClaims">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Modal send claim -->
                <div class="modal fade" id="modalSendClaim" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Оповещение</h4>
                            </div>
                            <div class="modal-body">
                                 <ul id="loader" class="fa-ul">
                                    <li><i class="fa-li fa fa-spinner fa-spin"></i>Отправка Заявки</li>
                                </ul>
                                <div id="msgResultLoader" hidden="true"></div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Modal recall claim  -->
                <div class="modal fade" id="modalCallClaim" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Отменить заявку</h4>
                            </div>

                            <div class="modal-body">
                                
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>
                            </div>
                        </div>
                    </div>
                </div>

                
                
                

            </div>
        </div>
    </div>

</asp:Content>
