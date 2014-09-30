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
    
    promise = $.get(Global.dbUrl + '/Customer/26/');

    return promise;

  }

  RetrievalService.getServiceRequests = function(customerID) {

    promise = $.get(Global.dbUrl + '/Customer/' + customerID + '/all/');

    return promise;

  }

  RetrievalService.getItems = function(serviceRequestID) {

    promise = $.get(Global.dbUrl + '/ServiceRequest/' + serviceRequestID + '/all/');
    
    return promise;

  }

  RetrievalService.getTestRequests = function(itemID) {

    promise = $.get(Global.dbUrl + '/Item/' + itemID + '/all/');

    return promise;

  }

  RetrievalService.getSubTests = function(testRequestID) {

    promise = $.get(Global.dbUrl + '/TestRequest/' + testRequestID + '/all/');

    return promise;

  }

  RetrievalService.getJobList = function() {

    /* Function should return an array of objects in the form:
     * {id: jobid, customer: customername, tests: list of tests}
     * All properties should be a string
     */

    var jobList = [];
    
    console.log('getting jobs');

    this.getAllCustomers()
      .done(function(customers) {
        console.log('getting customers');
        customers = [customers];  // *** REMOVE ME
        console.log(customers);
        for (var i = 0; i < customers.length; i++) {
          RetrievalService.getServiceRequests(customers[i].id)
            .done(function(data) {
              console.log('getting service requests');
              var serviceRequests = data.service_requests;
              console.log(serviceRequests);
              for (var i = 0; i < serviceRequests.length; i++) {
                RetrievalService.getItems(serviceRequests[i].id)
                  .done(function(data) {
                    console.log('getting items');
                    items = data.items;
                    console.log(items);
                    for (var i = 0; i < items.length; i++) {
                      RetrievalService.getTestRequests(items[i].id)
                        .done(function(testRequests) {
                          console.log('getting test requests');
                          console.log(testRequests);
                          for (var i = 0; i < testRequests.length; i++) {
                            RetrievalService.getSubTests(testRequests[i].id)
                              .done(function(subTests) {
                                console.log(subTests);
                              });
                          }
                        });
                    }
                  });
              }
            });
        }
      }); 


    return jobList;

    // for(var i = 0; i < jobs.length; i++) {
    //   jobList.push({
    //     'id'          : jobs[i].id,
    //     'customer'    : jobs[i].customer,
    //     'tests'       : jobs[i].tests.pending
    //                       .concat(jobs[i].tests.completed)
    //                       .join(', ')
    //   });
    // }

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