$(function(){
  function buildMessage(message){
    let html = `<h9 class="contents__right__middle__down__post_name">${message.user_name}</h9>
                <div class="contents__right__middle__down__area__post_date">${message.created_at}</div>
                  <div class="contents__right__middle__down__area__post_info">
                    <p class="info">${message.content}</p>
                  </div>
                  <div class="contents__right__middle__down__area__post_image">
                    <img class="image" src="${message.image}" alt="" width="200" height="133">
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
      $('form')[0].reset();
      $(".contents__right__footer3__form_send-btn").prop("disabled",false);
      $('.contents__right__middle').animate({scrollTop: $('.contents__right__middle')[0].scrollHeight}, 'fast');
    })
    .fail(function(message){
      alert("エラー");
    })
  })
});