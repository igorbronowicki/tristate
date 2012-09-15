$(function () {

    var AppState = {
        username: ""
    }

    var Family = ["Саша", "Юля", "Вася"]; // Моя семья

    var Controller = Backbone.Router.extend({
        routes: {
            "": "start", // Пустой hash-тэг
            "!/": "start", // Начальная страница
            "!/success": "success", // Блок удачи
            "!/error": "error" // Блок ошибки
        },

        start: function () {
            if (Views.start != null) {
                Views.start.render();
            }
        },

        success: function () {
            if (Views.success != null) {
                Views.success.render();
            }
        },

        error: function () {
            if (Views.error != null) {
                Views.error.render();
            }
        }
    });

    var controller = new Controller(); // Создаём контроллер

    var Views = { };

    var Start = Backbone.View.extend({
        el: $("#block"), // DOM элемент widget'а

        template: _.template($('#start').html()),

        events: {
            "click input:button": "check" // Обработчик клика на кнопке "Проверить"
        },

        check: function () {
            AppState.username = this.el.find("input:text").val(); // Сохранение имени пользователя
            if (_.detect(Family, function (elem) { return elem == AppState.username })) // Проверка имени пользователя
                controller.navigate("!/success", true); // переход на страницу success
            else
                controller.navigate("!/error", true); // переход на страницу error
        },

        render: function () {
            $(this.el).html(this.template());
        }
    });

    var Success = Backbone.View.extend({
        el: $("#block"), // DOM элемент widget'а

        template: _.template($('#success').html()),

        render: function () {
            $(this.el).html(this.template(AppState));
        }
    });

    var Error = Backbone.View.extend({
        el: $("#block"), // DOM элемент widget'а

        template: _.template($('#error').html()),

        render: function () {
            $(this.el).html(this.template(AppState));
        }
    });

    Views = { 
                start: new Start(),
                success: new Success(),
                error: new Error()
            };

    Views.start.render();

    Backbone.history.start(); // Запускаем HTML5 History push

});