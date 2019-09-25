$(function() {
  $(document).on('turbolinks:load', function () {
    let search_list = $("#user-search-result");
    let selected_list = $("#chat-group-users");
  
    function appendList(user){
      let html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-id = ${ user.id } data-name = ${ user.name }>追加</div>
                  </div>`;
                  search_list.append(html);
    }

    function appendUser(user_name, user_id){
      let html = `<div class="chat-group-user">
                    <input type = "hidden", value = ${ user_id }, name = "group[user_ids][]", id ="group_user_ids_${user_id}">
                    <p class='chat-group-user__name'>${user_name}</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`;
                  selected_list.append(html);
    }
  
    function appendUserNone(none){
      let html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${none}</p>
                  </div>`;
                  search_list.append(html);
    }



    $("#user-search-field").on("keyup", function() {
      users = [];
      $('input[name="group[user_ids][]"]').each(function(i, user){
        users.push($(user).val());
      });
      let input = $('#user-search-field').val();
  
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input,
                user_ids: users 
              },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendList(user);
          });
        }
        else {
          appendUserNone("一致するユーザーが見つかりません");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    });
    
    $("#user-search-result").on("click", ".chat-group-user__btn--add", function(){
      let user_name = $(this).data('name');
      let user_id = $(this).data('id');
      appendUser(user_name, user_id);
      $(this).parent().remove();
    });

    $("#chat-group-users").on("click", ".chat-group-user__btn--remove", function(){
      $(this).parent().remove();
    });
  });
});




// .done(function(users){
//   if (input.length === 0){
//     $("#user-search-result").empty();
//   }

//   else if (input.length !== 0){
//     $("#user-search-result").empty();
//     users.forEach(function(user){
//     appendList(user);
//     });
//   }

//   else {
//     $("#user-search-result").empty();
//     appendUserNone("一致するユーザーが見つかりません");
//   }
 
// })

