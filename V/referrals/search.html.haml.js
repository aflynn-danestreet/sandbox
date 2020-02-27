:javascript
  $(document).ready(function() {
    // Active Selects: Client dropdown, Requestor dropdown, Reviewer dropdown
    var allSelects = "#q_client_id_eq, #q_requestor_id_eq, #q_reviewer_id_eq";
    // Hidden selects
    var fakeSelects = "#fake_client, #fake_requestor, #fake_reviewer";
    // Spinner node
    var $spinner = $('.spinner-content');

    function dropDownToggle(element){
      $(element).toggle();
    }

    // Render the data taken from the Ajax Call for each Active Select
    function AddToActiveSelects(data, selectID){
      var options = ['<option></option>'];

      data.map(function(element) {
        options.push('<option value="'+ element[1] +'">'+element[0] +'</option>');
      });

      document.getElementById(selectID).innerHTML = options.join('');
    };

    // Reset to the original behavior after the toggle action
    function resetSelects(selectID, fakeID){
      dropDownToggle('#' + selectID + ', #' + fakeID);
    };

    // Assign the toggle click event
    $('#inactive').click( toggleClickAction );

    // toggle click event function
    function toggleClickAction(){
      $spinner.show();
      $(".td-toggle").toggleClass("inactive-list-r");
      dropDownToggle(allSelects + ", " + fakeSelects);
      $(fakeSelects).prop('disabled', true);
      setTimeout(function(){
        fakeSelects.split(',').forEach(function(id){
          $element = $(id);
          referralActiveOffices($element);
        });
        $(fakeSelects).prop('disabled', false);
        $spinner.hide();
      }, 500);
    };

    // Ajax call
    function referralActiveOffices($element){
      //  Select nodes attributes
      var subject = $element.parent().attr("data-name");
      var selectID = $element.prev().attr("id");
      var fakeID = $element.attr("id");
      // Endpoint URL
      var url = '/referral_active_offices';
      // option based if the toggle is checked or not
      var option = $('#inactive').prop("checked");
      $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        dataType: "json",
        data: {inactive: option, subject: subject},
        async: false,
        success: function(response){
          resetSelects(selectID, fakeID);
          AddToActiveSelects(response.data, selectID);
        },
        error: function(){
          alert("Data cannot be pulled");
          resetSelects(selectID, fakeID);
        }
      });
    };

    $('input[name=commit]').click(function(){
      $spinner.show()
    });

  });
