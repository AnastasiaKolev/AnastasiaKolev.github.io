jQuery(document).ready(function () {
  initEventHandlers();
  
  new TodoList();
});

function initEventHandlers() {
  jQuery(document).on("mousedown", function (event) {
    var $context = jQuery("#context");
    var $hidden = jQuery(".hidden");

    if (event.which === 3) {
      $hidden.removeClass("shown");

      if ($(event.target).is("img")) {
        $hidden.addClass("shown");
      }

      $context.css({
        top: event.pageY,
        left: event.pageX,
      });
      $context.fadeIn();

      return false;
    }

    $context.fadeOut();
  });
}

class TodoList {
  constructor(){
    this.tasks = [];
    this.taskType = '';
    this.taskSendType = 'local';

    this.loadTasks();
    this.initialize();
    this.render();
  }

  initialize() {
    document
      .getElementsByClassName("js-add-task")[0]
      .addEventListener("click",  (e) => {
        switch (this.taskSendType) {
          case 'local':
            e.preventDefault();
            this.handleAddTask();
            break;
          case 'server':
          default: break;
        }
      });

    jQuery('.js-task-list').on('click', '.remove', (e) => {
      var index = jQuery(e.currentTarget).data('index');
      this.handleRemoveTask(index);
    });

    jQuery('.js-change-task-type').on('click', 'input', (e) => {
      this.taskType = e.currentTarget.value;
    });

    jQuery('.js-change-task-send-type').on('click', 'input', (e) => {
      this.taskSendType = e.currentTarget.value;
    });
  }

  render() {
    var $tasks = document.getElementsByClassName("js-task-list")[0];
    $tasks.innerHTML = '';

    for (var i = 0; i < this.tasks.length; i++) {
      var task = this.tasks[i];
      var value = task.text;
      var type = task.type;

      var $taskWrapper = document.createElement("div");
      $taskWrapper.className = "task-wrapper " + type;

      var $checkTask = document.createElement("input");
      $checkTask.type = "checkbox";
      $checkTask.className = "checkbox";

      var $task = document.createElement("pre");
      $task.className = "task-item";
      $task.innerHTML = value;

      var $deleteTask = document.createElement("a");
      $deleteTask.className = "remove";
      $deleteTask.innerHTML = "x";
      $deleteTask.setAttribute('data-index', `${i}`);

      $taskWrapper.append($checkTask, $task, $deleteTask);
      $tasks.append($taskWrapper);
    }
  }

  handleAddTask() {
    var text = document.getElementsByClassName("js-new-task-text")[0].value;
    this.tasks.push({ text, type: this.taskType });

    this.saveTasks();
    this.render();
  }

  handleRemoveTask(targetIndex) {
    this.tasks = this.tasks.filter(function (item, index) {
      return index !== targetIndex;
    });
    this.saveTasks();

    this.render();
  }

  saveTasks() {
    console.log('Tasks: ', this.tasks);

    window.localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    this.tasks = JSON.parse(window.localStorage.getItem('tasks') || '[]');
  }
}
