jQuery(document).ready(function () {

    // var s = new xquery("my-selector");
    // xQuery("tasks-container").addClass("yes");

    // Кастомное контекстное меню
    $(document).on("contextmenu", function () {
        return false;
    })

    $(document).on("mousedown", function (event) {
        //event.preventDefault();
        //console.log(event.which);

        if (event.which == 3) {
            $(".hidden").removeClass("shown");

            if ($(event.target).is("img")) {
                $(".hidden").addClass("shown");
            }

            console.log(event.pageX, event.pageY);
            $("#context").css({
                top: event.pageY,
                left: event.pageX
            })
            $("#context").fadeIn();
            return false;
        }
        $("#context").fadeOut();

    })

});

// Выпадающее меню
$("[data-trigger='dropdown']").on("mouseenter", function () {
    var submenu = $(this).parent().find(".submenu");
    //submenu.addClass("active");
    submenu.fadeIn(300);

    $(".profile-menu").on("mouseleave", function () {
        //submenu.removeClass("active");
        submenu.fadeOut(300);
    })
});

//Создание массива с задачами
var tasks = [];

//Добавление задач в блок на сайт
function render() {
    var $tasks = document.getElementsByClassName("js-task-list")[0];
    $tasks.innerHTML = '';

    for (var i = 0; i < tasks.length; i++) {
        var value = tasks[i];
        var $taskWrapper = document.createElement("div");
        $taskWrapper.className = "task-wrapper";

        var $checkTask = document.createElement("input");
        $checkTask.type = "checkbox";
        $checkTask.className = "checkbox";

        var $task = document.createElement("pre");
        $task.className = "task-item";
        $task.innerHTML = value;

        var $deleteTask = document.createElement("a");
        $deleteTask.className = "remove";
        $deleteTask.innerHTML = "x";

        $taskWrapper.append($checkTask, $task, $deleteTask);
        $tasks.append($taskWrapper);
    }
};

function handleAddTask(value) {
    tasks.push(value); //Добавление задач в массив
    render();
}

function initTaskModule() {
    var add = function add() {
        handleAddTask(document.getElementsByClassName("js-new-task-text")[0].value);
    }

    document
        .getElementById("addTask-button")
        .addEventListener("click", add);
}

(function () {
    initTaskModule();

    handleAddTask("My-task\n example 1");
    handleAddTask("My-task2");
    handleAddTask("My-task\t example 3");
})();
