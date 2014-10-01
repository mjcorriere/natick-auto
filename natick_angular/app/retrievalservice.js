natickModule.factory('RetrievalService', function() {

  var jobs = [
    {
      'id'              : '00145',
      'customer'        : 'Draper Laboratory',
      'tests'           : {
        'pending'       : ['Break strength', 'Visual shade'],
        'completed'     : ['Moisture absorption']
      }
    }];
  
  RetrievalService = {};

  // RetrievalService.getGeneric = function() {
  //   var generic = [];
  //   $.get(dbUrl + '/Resource/id')
  //     .done(function(response) {
  //       generic = response;
  //     });

  //   // Hopefully, the magic of closures will update the $scope variable in the
  //   // calling controller. This way we don't have to expose the idea of
  //   // promises to the controller. It just gets a placeholder variable until
  //   // the request completes.

  //   return generic;
  // }

  RetrievalService.getAllCustomers = function() {
    
    console.log('getting customers');
    var customers = [];
    
    $.ajax({
      url: Global.dbUrl + '/Customer/26/',
      async: false
    }).success(function(data) {
      customers = [data];
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

      for(var j = 0; j < serviceRequests.length; j++) {
        var serviceRequest = serviceRequests[j];

        jobList[j] = {
          id: serviceRequest.id.toString(),
          customer: customer.name,
          tests: ''
        }

        items = RetrievalService.getItems(serviceRequest.id);

        for(var k = 0; k < items.length; k++) {
          var item = items[k];
          testRequests = RetrievalService.getTestRequests(item.id);

          for(var m = 0; m < testRequests.length; m++) {
            var testRequest = testRequests[m];
            subTests = RetrievalService.getSubTests(testRequest.id);

            for(var n = 0; n < subTests.length; n++) {
              var subTest = subTests[n];
              if (jobList[j].tests == '') {
                jobList[j].tests = subTest.test_name;
              } else {
                jobList[j].tests = jobList[j].tests + ', ' + subTest.test_name;
              }
            }

          }
        }

      }

    }

    if (Global.DEBUG) {
      console.log(customers, serviceRequests, items, testRequests, subTests)
      console.log(jobList);
    }

    return jobList;

  }

  RetrievalService.getPendingTests = function(jobid) {
    var pendingTests = [];

    // DB Query

    return pendingTests;
  }

  RetrievalService.getCompletedTests = function(jobid) {
    var completedTests = [];

    // DB Query

    return completedTests;
  }

  RetrievalService.getCustomer = function(jobid) {
    var customer = '';

    // DB Query

    return customer;

  }

  return RetrievalService;

});