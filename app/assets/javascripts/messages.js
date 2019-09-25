$(function(){
  $(document).on('turbolinks:load', function(){
    function buildMessage(message){
      var image =message.image ? `${message.image}`:``;
        let html = `<div class="message" data-id="${message.id}">
                      <h9 class="contents__right__middle__down__post_name">${message.user_name}</h9>
                      <div class="contents__right__middle__down__area__post_date">${message.created_at}</div>
                        <div class="contents__right__middle__down__area__post_info">
                          <p class="info">${message.content}</p>
                        </div>
                        <div class="contents__right__middle__down__area__post_image">
                          <img class="image" src="${image}" alt="" width="200" height="133">
                        </div>
                    </div>`
      return html;
    }

    
      $("#new_message").on("submit", function(e){
        e.preventDefault();
        let formData = new FormData(this);
        let url = $(this).attr("action");
        $.ajax({
          url: url,
          type: "POST",
          data: formData,
          dataType: 'json',
          processData: false,
          contentType: false
        })
        .done(function(message){
          let html = buildMessage(message);
          $(".contents__right__middle__down__area__post").append(html);
          $('.contents__right__middle').animate({scrollTop: $('.contents__right__middle')[0].scrollHeight}, 'fast');
        })
        
        .fail(function(message){
          alert("エラー");
        })

        .always(function(){
          $('form')[0].reset();
          $(".contents__right__footer3__form_send-btn").prop("disabled",false);
        })
      })

    let reloadMessages = (function() { 
      
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        last_message_id = $('.message:last').data("id");
        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          let insertHTML = '';
          messages.forEach(function (message){
            insertHTML = buildMessage(message);
            $('.contents__right__middle__down__area__post').append(insertHTML);
            $('.contents__right__middle').animate({scrollTop: $('.contents__right__middle')[0].scrollHeight}, 'fast');
          })
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        });
      }
    });
    setInterval(reloadMessages, 5000);
  });
});