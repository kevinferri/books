var client = function() {
  this.hidePreLoader = function() {
    $('.preloader-wrapper').hide();
  }
}

module.exports = new client();
