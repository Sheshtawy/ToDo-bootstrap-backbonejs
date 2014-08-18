var app = app || {};

  app.TodoView = Backbone.View.extend({

    tagName: 'li',
    className: "list-group-item" ,

    template: _.template( $('#item-template').html() ),

    events: {
      'dblclick label': 'edit',
      'keypress .edit': 'updateOnEnter',
      'blur .edit': 'close',
      'click .toggle': 'togglecompleted',
      'click .destroy': 'clear'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);       
      this.listenTo(this.model, 'visible', this.toggleVisible);
      
    },

    render: function() {
      this.$el.html( this.template( this.model.attributes ) );
      this.$input = this.$('.edit');
      this.$el.toggleClass( 'completed', this.model.get('completed') ); 
      this.toggleVisible();
      var nw = moment();
      var deb = new moment(this.model.get('dueDate'));
      var def = moment.duration(Math.abs(nw - deb).asMinutes());
      if( def/1000 < 10){
         this.$el.addClass('list-group-item-danger');
       }                                       

      return this;
    },
    toggleVisible : function () {
      this.$el.toggleClass( 'hidden',  this.isHidden());
    },

    // NEW - Determines if item should be hidden
    isHidden : function () {
      var isCompleted = this.model.get('completed');
      return ( // hidden cases only
        (!isCompleted && app.TodoFilter === 'completed')
        || (isCompleted && app.TodoFilter === 'active')
      );
    },

    // NEW - Toggle the `"completed"` state of the model.
    togglecompleted: function() {
      this.model.toggle();
    },

    edit: function() {
      this.$el.addClass('editing');
      this.$input.focus();
    },

    close: function() {
      var value = this.$input.val().trim();

      if ( value ) {
        this.model.save({ title: value });
      }

      this.$el.removeClass('editing');
    },

    updateOnEnter: function( e ) {
      if ( e.which === ENTER_KEY ) {
        this.close();
      }
    },
 clear: function() {
      this.model.destroy();
    }
  });
