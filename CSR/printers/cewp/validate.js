/**
 * Created by Administrator on 31.01.2016.
 */

$(document).ready(function () {


    $("#dialogform").validate({
        rules: {
            pswd: {
                required: true,
                digits: true
            }
        },
        messages: {
            pswd: {
                required: "Поле 'Количество' обязательно для заполнения",
                digits: "Должны быть цифры"
            }
        }
    });

});  