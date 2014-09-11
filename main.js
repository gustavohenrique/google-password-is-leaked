'use strict';

var config = {
    url: 'http://localhost:3000/checkemail',
    i18n: {
        enUS : {
            found: {
                text: 'Sorry! Your account was compromised.',
                cls: 'ui red message'
            },
            notFound: {
                text: 'Keep calm, your account was not compromised.',
                cls: 'ui green message'
            },
            validation: {
                text: 'Invalid e-mail.',
                cls: 'ui red message'
            },
            about: 'Nearly 5 Million Google Passwords Leaked on Russian Site.<br/>Check if your was compromised.'
        },
        ptBR : {
            found: {
                text: 'Infelizmente sua conta foi comprometida.',
                cls: 'ui red message'
            },
            notFound: {
                text: 'Fique tranquilo(a), sua conta n&atilde;o foi comprometida.',
                cls: 'ui green message'
            },
            validation: {
                text: 'E-mail inv&aacute;lido',
                cls: 'ui red message'
            },
            about: 'Quase 5 milh&otilde;es de senhas de contas do Google vazaram num site Russo.<br/>Verifique se a sua foi comprometida.'
        }
    },
    messages: {}
};

var app = {
    showMessage: function (message) {
        var div = $('#message');
        div.removeClass(config.messages.found.cls);
        div.removeClass(config.messages.notFound.cls);
        div.addClass(message.cls);
        div.html('<i class="close icon"></i><div class="header"></div>' + message.text);
    },

    isValid: function (email) {
        if ($.trim(email).length === 0 || email === '') return false;
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    },

    checkEmail: function () {
        var $this = this,
            email = $('#email').val();

        if ($this.isValid(email)) {
            $.post(URL, {'email': email})
             .done(function (data) { $this.showMessage(config.messages.found); })
             .fail(function (data) { $this.showMessage(config.messages.notFound); });
        }
        else {
            $this.showMessage(config.messages.validation);
        }
        $('#email').focus();
    },

    load: function (language) {
        config.messages = config.i18n[language];
        $('#about').html(config.messages.about);
    },

};

$(document).ready(function () {
    app.load('ptBR');
});
