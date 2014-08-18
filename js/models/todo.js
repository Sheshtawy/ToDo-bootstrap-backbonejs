var app = app || {};

 app.Todo = Backbone.Model.extend({


    defaults: {
      title: '',
      completed: false,
      dueDate: moment("12-25-2020", "MM-DD-YYYY")

    },


    toggle: function() {
      this.save({
        completed: !this.get('completed')
      });
    }

  });
