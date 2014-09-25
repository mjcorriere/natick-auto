natickModule.factory('RetrievalService', function() {

  var jobs = [
    {
      'id'              : '00145',
      'customer'        : 'Draper Laboratory',
      'tests'           : {
        'pending'       : ['Break strength', 'Color fastness'],
        'completed'     : ['Moisture absorption']
      }
    }];
  
  RetrievalService = {};

  RetrievalService.getAllCustomers = function() {
    
    // $.get('***customer request***')
    //   .done(function(data) {
    //     return data;
    //   })
    //   .fail(function(data) {
    //     console.log('Request for all customers failed.');
    //   });

    // promise = $.get(Global.dbUrl + '/Customer/' + customerID + '/all/');
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


    // var promise;

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
    for(var i = 0; i < jobs.length; i++) {
      if(jobs[i].id == jobid) {
        return jobs[i].tests.pending;
      }
    }
  }

  RetrievalService.getCompletedTests = function(jobid) {
    for(var i = 0; i < jobs.length; i++) {
      if(jobs[i].id == jobid) {
        return jobs[i].tests.completed;
      }
    }
  }

  RetrievalService.getCustomer = function(jobid) {
    for(var i = 0; i < jobs.length; i++) {
      if(jobs[i].id == jobid) {
        return jobs[i].customer;
      }
    }    
  }

  return RetrievalService;

});