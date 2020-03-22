$(function(){
  function buildHTML(message){
    if ( message.image ){
      var html = `<div class="message">
                    <div class="UserData">
                      <div class="UserData__name">
                        ${message.user_name}
                      </div>
                      <div class="UserData__CreateDate">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="massage__text">
                      ${message.content}
                      <img src= ${message.image}>
                    </div>
                  </div>`
      return html;
    } else {
    var html = `<div class="message">
                  <div class="UserData">
                    <div class="UserData__name">
                      ${message.user_name}
                    </div>
                    <div class="UserData__CreateDate">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="massage__text">
                    ${message.content}
                  </div>
                </div>`
    return html;}
   }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.FormArea__SendBtn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました。");
    })
  });
});