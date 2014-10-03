natickModule.factory('RetrievalService', function() {
 
  RetrievalService = {};

  RetrievalService.getAllCustomers = function() {
    
    console.log('getting customers');
    var customers = [];
    
    $.ajax({
      url: Global.dbUrl + '/Customer/all/',
      async: false
    }).success(function(data) {
      customers = data;
    });

    return customers;

  }

  RetrievalService.getServiceRequests = function(customerID) {
    
    console.log('getting service requests');
    var serviceRequests = [];

    $.ajax({
      url: Global.dbUrl + '/Customer/' + customerID + '/all/',
      async: false
    }).success(function(data) {
      serviceRequests = data.service_requests;
    });    

    return serviceRequests;

  }

  RetrievalService.getItems = function(serviceRequestID) {

    console.log('getting items');
    var items = [];

    $.ajax({
      url: Global.dbUrl + '/ServiceRequest/' + serviceRequestID + '/all/',
      async: false
    }).success(function(data) {
      items = data.items;
    });    

    return items;    
    
  }

  RetrievalService.getTestRequests = function(itemID) {

    console.log('getting test requests');

    var testRequests = [];

    $.ajax({
      url: Global.dbUrl + '/Item/' + itemID + '/all/',
      async: false
    }).success(function(data) {
     testRequests = data.test_requests;
    }).fail(function(data) {
      $('body').append(data.responseText);
    });    

    return testRequests;        
   
  }

  RetrievalService.getSubTests = function(testRequestID) {

    console.log('getting subtests');

    var subTests = [];

    $.ajax({
      url: Global.dbUrl + '/TestRequest/' + testRequestID + '/all/',
      async: false
    }).success(function(data) {
      subTests = data.sub_tests;
    }).fail(function(data) {
      $('body').append(data.responseText);
    });    

    return subTests;           
   
  }

  RetrievalService.getJobList = function() {

    /* Function should return an array of objects in the form:
     * {id: jobid, customer: customername, tests: list of tests}
     * All properties should be a string
     */

    var jobList = [];
    var customers, serviceRequests , items , testRequests, subTests;   
    console.log('getting jobs');

    customers = RetrievalService.getAllCustomers();

    for(var i = 0; i < customers.length; i++) {
      var customer = customers[i];
      serviceRequests = (RetrievalService.getServiceRequests(customer.id));
      console.log("Service Requests for " + customer.name);
      console.log(serviceRequests);


      for(var j = 0; j < serviceRequests.length; j++) {
        var serviceRequest = serviceRequests[j];
          jobList.push({
            id: serviceRequest.id.toString(),
            dueDate: new Date(serviceRequest.due_date).toLocaleDateString(),
            customer: customer.name,
          });
      }
    }

    if (Global.DEBUG) {
      console.log(customers, serviceRequests, items, testRequests, subTests)
      console.log(jobList);
    }

    return jobList;
  }

  RetrievalService.getPendingTests = function(jobid) {
    console.log('Getting pending tests for job ' + jobid);

    var pendingTests = [];
    var items, testRequests, subTests;

    items = RetrievalService.getItems(jobid);

    for(var i = 0; i < items.length; i++) {
      var item = items[i];
      testRequests = RetrievalService.getTestRequests(item.id);
      for(var j = 0; j < testRequests.length; j++) {
        var testRequest = testRequests[j];
        subTests = RetrievalService.getSubTests(testRequest.id);
        for(var k = 0; k < subTests.length; k++) {
          var subTest = subTests[k];
          console.log(subTest);
          if (subTest.complete_date == '' || subTest.complete_date == null) {
            pendingTests.push(subTest.test_name);
          } 
        }
      }
    }
    console.log('pending test list ', pendingTests)
    return pendingTests;
  }

  RetrievalService.getCompletedTests = function(jobid) {
    var completedTests = [];
    var items, testRequests, subTests;

    items = RetrievalService.getItems(jobid);

    for(var i = 0; i < items.length; i++) {
      var item = items[i];
      testRequests = RetrievalService.getTestRequests(item.id);
      for(var j = 0; j < testRequests.length; j++) {
        var testRequest = testRequests[j];
        subTests = RetrievalService.getSubTests(testRequest.id);
        for(var k = 0; k < subTests.length; k++) {
          var subTest = subTests[k];
          if (subTest.complete_date != '' && subTest.complete_date != null) {
            console.log('COMPEATEETETE');
            console.log(subTest);
            completedTests.push({
              "name": subTest.test_name
              , "completedDate": new Date(subTest.complete_date).toLocaleDateString()
            });
          } 
        }
      }
    }
    return completedTests;
  }

  RetrievalService.getDueDate = function(jobid) {
    var dueDate = '';

    $.ajax({
      url: Global.dbUrl + '/ServiceRequest/' + jobid + '/',
      async: false
    })
    .done(function(data) {
      dueDate = new Date(data.due_date).toLocaleDateString();
    });

    return dueDate;

  }

  RetrievalService.getCustomer = function(jobid) {
    var customer = '';
    
    $.ajax({
      url: Global.dbUrl + '/ServiceRequest/' + jobid,
      async: false
    }).success(function(data) {
      var customerID = data.customer_id;
      $.ajax({
        url: Global.dbUrl + '/Customer/' + customerID,
        async: false
      }).success(function(data) {
        customer = data.name;
      });
    });
    return customer;
  }

  return RetrievalService;

});