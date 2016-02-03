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
	/*
    $.validator.addClassRules('album', {
        required: true,
        minlength: 2
    });

    $.validator.addClassRules('price', {
        required: true,
        number: true,
        min: 0
    });

    // Initialize validation plugin
    $("#tblPrinterAppendGrid").validate({
        errorLabelContainer: '#ulError',
        wrapper: 'li'
    });
    */
});  