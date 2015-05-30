var Book = Backbone.Model.extend({
  defaults: {
    title: 'foobar',
    author: 'banana'
  }
});

var BookView = Backbone.View.extend({
  tagName: 'section',

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.model.get('title'));
  }

});

var book = new Book();
var bookView = new BookView({ model: book });