$(document).ready(function() {
    $('#go_back').click(function() {
      window.history.back();
    });
  
    $('form').submit(function(event) {
      event.preventDefault();
  
      let inputText = $('#inputText').val();
  
      $.post('/translate', {inputText: inputText}, function(data) {
        $('#output').text(data.output);
      });
    });
  
    $('.btn_clear').click(function() {
      $('#output').empty();
      $('#inputText').val('');
    });
  });
  