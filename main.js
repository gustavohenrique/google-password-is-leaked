'use strict';

var messages = {
    found: {
        text: 'Infelizmente seu e-mail est&aacute; na lista. Mude sua senha imediatamente.',
        cls: 'ui red message'
    },
    notFound: {
        text: 'Fique tranquilo(a), seu e-mail não está na lista',
        cls: 'ui green message'
    },
    validation: {
        text: 'E-mail inv&aacute;lido',
        cls: 'ui red message'
    }
};

var showMessage = function (message) {
    var div = $('#message');
    div.removeClass(messages.found.cls);
    div.removeClass(messages.notFound.cls);
    div.addClass(message.cls);
    div.html(message.text);
};

var isValid = function (email) {
    if ($.trim(email).length === 0 || email === '') return false;
    var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return filter.test(email);
};

var checkemail = function () {
    var email = $('#email').val();

    if (isValid(email)) {
        $.post('http://localhost:3000/checkemail', {'email': email})
         .done(function (data) { showMessage(messages.found); })
         .fail(function (data) { showMessage(messages.notFound); });
    }
    else {
        showMessage(messages.validation);
    }
    $('#email').focus();
};