var app = app || {};

 app.Todo = Backbone.Model.extend({


    defaults: {
      title: '',
      completed: false,
      dueDate: moment({y: 2020, M: 3, d: 5, h: 15, m: 10, s: 3, ms: 123})

    },


    toggle: function() {
      this.save({
        completed: !this.get('completed')
      });
    }

  });
