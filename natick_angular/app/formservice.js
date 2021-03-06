natickModule.factory('FormService', ['$location', function($location) {
  
  var formData = {};

  var emptyForm = {
    subtests: {
      breakstrength: {
        required: false
        , warp: false
        , fill: false
        , warpSpecLimit: ""
        , fillSpecLimit: ""
        , testData: {}
        , testMethod: "0"
        , name: "breakstrength"
        , displayName: "Break strength"
      },
      visualshade: {
        required: false
        , specLimit: ""
        , testData: "[]"
        , testMethod: "0"
        , name: "visualshade"
        , displayName: "Visual shade"
      }
    }
  };

  var preFilledForm = {
    "subtests": {
      "breakstrength": {
        "required": true,
        "warp": false,
        "fill": true,
        "specLimit": {
          "warp": "500",
          "fill": "250",
        },
        "testData": {},
        "testMethod": "ASTM D 5044",
        "name": "breakstrength",
        "displayName": "Break strength"
      },
      "visualshade": {
        "required": true,
        "specLimit": "Don't be red",
        "testData": "[]",
        "testMethod": "AATCC Procedure 9",
        "name": "visualshade",
        "displayName": "Visual shade"
      }
    },
    "customerName": "Prefilled Company",
    "contactName": "No one",
    "contactEmail": "no@one.com",
    "contactPhone": "698-987-5641",
    "contractNo": "123",
    "dueDate": "2014-10-30",
    "costQuote": "15000",
    "itemName": "Big item",
    "itemType": "Physical object",
    "nomenclature": "Rope, 50/50 Carbon Fiber and Rocks",
    "standard": "MIL-C-10001",
    "standardRev": "F",
    "standardLink": "none"
  }  

  angular.copy(emptyForm, formData);
  
  var FormService = {};

  FormService.formData = function() {
    return formData;
  }

  FormService.reset = function() {
    console.log('FormService.reset(): Resetting form ...');
    angular.copy(emptyForm, formData);
  }

  FormService.submit = function(debug) {

    console.log('debug: ', debug);
    if (debug) { angular.copy(preFilledForm, formData); }
    console.log(formData);

    var customer, contact, service_request, 
        item, requirement, test_request, sub_test;
    
    // Create new customer
    var newCustomer = {
      'name'  : formData.customerName
    };

    console.log('SUBMITTING CUSTOMER');

    $.post(Global.dbUrl + '/Customer/0/',
        newCustomer
      )
      .done(function(data) {
        console.log('Customer created: ' + JSON.stringify(data, null, 2));
        customer = data;

        console.log('SUBMITTING CONTACT');
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
        })
        .fail(function(data) {
          $('body').append(data.responseText);
        });

    }

    function createItem() {

      var newItem = {
        'item_name'   : formData.itemName,
        'item_type'   : formData.itemType,
        'nomenclature' : formData.nomenclature,
        'service_request_id'  : service_request.id
      };

      $.post(Global.dbUrl + '/Item/0/',
        newItem
        )
        .done(function(data) {
          console.log('Item created: ' + JSON.stringify(data, null, 2));
          item = data;
          
          createRequirement();
          createTestRequest();          
        })
        .fail(function(data) {
          $('body').append(JSON.stringify(newItem, null, 2));
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
      // Make sure you create the test name correctly. It should have spaces
      // for pretty printing. Remove spaces and uppercase letters when using
      // the name to change to the route (:jobid/testname)
      
      var subTests = formData.subtests;

      for (key in subTests) {
        var test = subTests[key];
        
        console.log('TEST DATA: ', test.testData);

        if(test.required) {
          var newSubTest = {
            'test_name'         : test.displayName,
            'test_options'      : test.testMethod,
            'test_data'         : test.testData,
            'test_area'         : 'unknown',
            'spec_limit'        : angular.toJson(test.specLimit),
            'special_instr'     : '',
            'assignee'          : 'admin',
            'start_date'        : new Date().toISOString(),
            'due_date'          : new Date().toISOString(),
            'test_request_id'   : test_request.id
          };
          if(test.name == 'breakstrength') {
            console.log('we have break strength');
            console.log('warp, fill', test.warp, test.fill);

            if (test.warp) {
              console.log('warp detected adding warp');
              newSubTest.test_data.warp = [];
              console.log(newSubTest.test_data);
            }
            if (test.fill) {
              console.log('fill detected adding fill');
              newSubTest.test_data.fill = [];
              console.log(newSubTest.test_data)
            }
            newSubTest.test_data = JSON.stringify(newSubTest.test_data);
            console.log(newSubTest);            
          }
          $.post(Global.dbUrl + '/SubTest/0/',
          newSubTest
          )
          .done(function(data) {
            console.log('Sub test created: ' + JSON.stringify(data, null, 2));
            sub_test = data;
            FormService.reset();
          });
        }  
      }
    }
  }

  return FormService;

}]);