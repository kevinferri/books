var Book = Backbone.Model.extend({
  defaults: {
    title: 'Game of Thrones',
    author: 'George RR Martin'
  }
});

var BookView = Backbone.View.extend({
  tagName: 'li',
  
  template: _.template($('#bookTemplate').html()),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  }

});

var book = new Book();
var bookView = new BookView({ model: book });