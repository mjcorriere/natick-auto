natickModule.factory('FormService', ['$http', function($http) {
  
  var dbUrl = 'http://natick2.draper.com/main';
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

  FormService.submit = function() {

    var customer, contact, service_request, 
        item, requirement, test_request, sub_test;
    
    // Create new customer
    var newCustomer = {
      'name'  : formData.customerName
    };

    $.post(dbUrl + '/Customer/0/',
        newCustomer
      )
      .done(function(data) {
        console.log('Customer created: ' + JSON.stringify(data, null, 2));
        customer = data;

        createContact();

      });

    // Create customer contact. Fires after customer is created.
    function createContact() {

      var newContact = {
            'contact_name'  :   formData.contactName,
            'email_address'         :   formData.contactEmail,
            'phone'         :   formData.contactPhone,
            'customer_id'   :   customer.id
          };

      $.post(dbUrl + '/Contact/0/',
        newContact
        )
        .done(function(data) {
          console.log('Contact created: ' + JSON.stringify(data, null, 2));
          contact = data;

          createServiceRequest();

        });

    }

    function createServiceRequest() {

      var newServiceRequest = {
        'submission_date'   : new Date().toLocaleString(),
        'cost_quote'        : formData.costQuote,
        'actual_cost'       : '',
        'due_date'          : formData.dueDate,
        'date_completed'    : '',
        'contract_number'   : formData.contractNo,
        'customer_id'       : customer.id
      };

      $.post(dbUrl + '/ServiceRequest/0/',
        newServiceRequest
        )
        .done(function(data) {
          console.log('Service Request created: ' + JSON.stringify(data, null, 2));
          service_request = data;
          
          createItem();
        });

    }

    function createItem() {

      var newItem = {
        'item_name'   : formData.itemName,
        'item_type'   : formData.itemType,
        'nomenclature': formData.nomenclature,
        'request_id'  : service_request.id
      };

      $.post(dbUrl + '/Item/0/',
        newItem
        )
        .done(function(data) {
          console.log('Item created: ' + JSON.stringify(data, null, 2));
          item = data;
          
          createRequirement();
        });

    }

    function createRequirement() {

      var newRequirement = {
        'standard_title'  :   formData.standard,
        'link_to_standard':   formData.standardLink,
        'standard_rev'    :   formData.standardRev,
        'item_id'         :   item.id
      };

      $.post(dbUrl + '/RequirementsStandard/0/',
        newRequirement
        )
        .done(function(data) {
          console.log('Requirement created: ' + JSON.stringify(data, null, 2));
          requirement = data;
          
          createTestRequest();
        });

    }

    function createTestRequest() {

      var newTestRequest = {
        'start_date'        :   '',
        'due_date'          :   '',
        'completion_date'   : '',
        'item_id'           : item.id
      };

      $.post(dbUrl + '/TestRequest/0/',
        newTestRequest
        )
        .done(function(data) {
          console.log('Test Request created: ' + JSON.stringify(data, null, 2));
          test_request = data;
          
          createSubTest();
        });      
    
    }

  }

  return FormService;

}]);