:javascript

  function validateRecommendation($select){
    return function internal(event){
      if($select.prop('selectedIndex') === 0){
        var msg = 'Recommendation must be selected';
        swal(msg, { title: 'Examination outcome', icon: 'error' });
        event.preventDefault();
        return false;
      };

      // QA checklist validation
      if(typeof(qaChecklistIsFilled) !== "undefined" && this.value == "Check"){
        isFilled = qaChecklistIsFilled();

        if(isFilled) return true;

        var msg = 'All QA Checklist options must be selected';
        swal(msg, { title: 'QA Checklist', icon: 'warning' });
        event.preventDefault();

        return false;
      };
    }
  }

  function onDocumentReady() {
    var $span = '<span class="required">*&nbsp;&nbsp;</span>';
    var $communicationSelect = $('#referral_recommendation_id');
    var $form = $('#form-check');
    var $submitSave = $('#submit-save');
    var $submitCheck = $('#submit-check');

    $('#referral_qa_sub_account_id').attr('required', 'required');
    $('.qa-sub-account-verification td').first().css('width', '28%');
    $($span).insertBefore($communicationSelect);
    $submitSave.on('click', validateRecommendation($communicationSelect));
    $submitCheck.on('click', validateRecommendation($communicationSelect));
    $form.on('submit', validateRecommendation($communicationSelect));
  }

  $(document).ready(onDocumentReady);
