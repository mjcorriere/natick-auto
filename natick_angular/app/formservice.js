natickModule.factory('FormService', [function() {
  
  var formData = {};

  var emptyForm = {
    subtests: {
      breakstrength: {
        required: false
        , warp: false
        , fill: false
        , testMethod: '0'
        , name: 'breakstrength'
      },
      visualshade: {
        required: false
        , testMethod: '0'
        , name: 'visualshade'
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

    $.post(Global.dbUrl + '/Customer/0/',
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
            'email_address' :   formData.contactEmail,
            'phone'         :   formData.contactPhone,
            'customer_id'   :   customer.id
          };

      $.post(Global.dbUrl + '/Contact/0/',
        newContact
        )
        .done(function(data) {
          console.log('Contact created: ' + JSON.stringify(data, null, 2));
          contact = data;

          createServiceRequest();

        });

    }

    function createServiceRequest() {

      console.log(formData.dueDate);
      var newServiceRequest = {
        'submission_date'   : new Date().toISOString(),
        'cost_quote'        : formData.costQuote,
        'actual_cost'       : '0',
        'due_date'          : formData.dueDate,
        'completed_date'    : new Date().toISOString(),
        'contract_number'   : formData.contractNo,
        'customer_id'       : customer.id
      };

      $.post(Global.dbUrl + '/ServiceRequest/0/',
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
        // FIELD MISSPELLED IN DB. TIRED OF REQUESTING FIXES. LEAVING AS NOMECLATURE
        'nomeclature' : formData.nomenclature,
        'service_request_id'  : service_request.id
      };

      $.post(Global.dbUrl + '/Item/0/',
        newItem
        )
        .done(function(data) {
          console.log('Item created: ' + JSON.stringify(data, null, 2));
          item = data;
          
          createRequirement();
        })
        .fail(function(data) {
          $('body').append(data.responseText);
        });

    }

    function createRequirement() {

      var newRequirement = {
        'standard_title'  :   formData.standard,
        'link_to_standard':   formData.standardLink,
        'standard_rev'    :   formData.standardRev,
        'item_id'         :   item.id
      };

      $.post(Global.dbUrl + '/RequirementsStandard/0/',
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
        'start_date'        : new Date().toISOString(),
        'due_date'          : new Date().toISOString(),
        'completion_date'   : new Date().toISOString(),
        'item_id'           : item.id
      };

      $.post(Global.dbUrl + '/TestRequest/0/',
        newTestRequest
        )
        .done(function(data) {
          console.log('Test Request created: ' + JSON.stringify(data, null, 2));
          test_request = data;
          
          createSubTest();
        });
    
    }

    function createSubTest() {
      console.log('Placeholder. Need to implement subtest');
    }

  }

  return FormService;

}]);