var $qaCheckList = $("#qa_checklist").find("input[type=checkbox]");
var $checkListOptionsField = $("#qa_checklist_options")
var qaSelectedOptions = [];

function qaChecklistIsFilled(){
  var checkedOptions = $qaCheckList.not(":checked").length;

  return (checkedOptions==0) ? true : false;
};

$qaCheckList.click(function(e){
  var elementIndex = qaSelectedOptions.indexOf(this.name.toString());
  if(elementIndex < 0){
    qaSelectedOptions.push(this.name.toString());
  }else{
    qaSelectedOptions.splice(elementIndex, 1);
  }
  $checkListOptionsField.val(qaSelectedOptions.join(", "));
});
