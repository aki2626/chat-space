$(function(){
  function appendUser(user){
   let html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>
   `;
   $('#user-search-result').append(html);
  }
  function appendErrMsgToHTML( msg){
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`;
    $('#user-search-result').append(html);
  }
  function appendAddUser(user){
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${user.userId}'>  
                  <p class='chat-group-user__name'>${user.userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>
                `;
    $('#chat-group-users').append(html);
  }
  $("#user-search-field").on("keyup", function(){
    let input =  $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input }
    })
    .done(function(users) {
      $('#user-search-result').empty();

      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
      else if (input.length == 0) {
        return false;
      } else {
        appendErrMsgToHTML("ユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert("通信エラーです。ユーザーが表示できません。s");
    });
  });
  $(document).on('click','.chat-group-user__btn--add', function(){
    const addUser = $('.user-search-add').data();
    $(this)
      .parent()
      .remove();
      appendAddUser(addUser);
  });
  $(document).on('click','.chat-group-user__btn--remove', function() {
    $(this)
      .parent()
      .remove();
  });
});