natickModule.factory('FormService', function() {
  
  var formData = {};

  var emptyForm = {
    subtests: {
      breakstrength: {
        required: false
        , warp: false
        , fill: false
        , testMethod: '0'
      },
      visualshade: {
        required: false
        , testMethod: '0'
      }
    }
  };

  angular.copy(emptyForm, formData);
  
  var FormService = {};

  FormService.formData = function() {
    return formData;
  }

  FormService.reset = function() {
    console.log('FormService.reset(): Resetting form ...');
    angular.copy(emptyForm, formData);
  }

  return FormService;

});