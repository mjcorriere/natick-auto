natickModule.factory('MockRetrievalService', function() {

  var id = 0;

  function Customer(name) {
    this.name = name;
    this.id = ++id;
  }

  function Contact(name, email, phone, customer_id) {
    this.name = name;
    this.email = email;
    this.phone = phone
    this.customer_id = customer_id;
    this.id = ++id;
  }

  var customers = [
      new Customer('A'),
      new Customer('B'),
      new Customer('C')
  ];

  var contacts = [
      new Contact('asdf', 'asdf', '234', customers[0]),
      new Contact('asdf', 'asdf', '234', customers[1]),
      new Contact('asdf', 'asdf', '234', customers[2]),
  ];

  var mockDB = {
    'customers' : customers,
    'contacts'  : contacts
  };

  var jobs = [
    {
      'id'              : '00145',
      'customer'        : 'Draper Laboratory',
      'tests'           : {
        'pending'       : ['Break strength', 'Color fastness'],
        'completed'     : ['Moisture absorption']
      }
    },
    {
      'id'              : '00148',
      'customer'        : 'Aperture Science',
      'tests'           : {
        'pending'       : ['Compressive strength', 'Rockwell hardness'],
        'completed'     : []
      }
    },
    {
      'id'              : '00206',
      'customer'        : 'Global Flight Systems',
      'tests'           : {
        'pending'       : ['Wind tunnel'],
        'completed'     : ['Flame retardance', 'Impact resistance']
      }
    }
  ];  
  
  var MockRetrievalService = {};

  MockRetrievalService.getAllCustomers = function() {
    return mockDB.customers;
  }

  MockRetrievalService.getJobList = function() {

    var jobList = [];

    for(var i = 0; i < jobs.length; i++) {
      jobList.push({
        'id'          : jobs[i].id,
        'customer'    : jobs[i].customer,
        'tests'       : jobs[i].tests.pending
                          .concat(jobs[i].tests.completed)
                          .join(', ')
      });
    }

    console.log(jobList);

    return jobList;
  }

  MockRetrievalService.getPendingTests = function(jobid) {
    for(var i = 0; i < jobs.length; i++) {
      if(jobs[i].id == jobid) {
        return jobs[i].tests.pending;
      }
    }
  }

  MockRetrievalService.getCompletedTests = function(jobid) {
    for(var i = 0; i < jobs.length; i++) {
      if(jobs[i].id == jobid) {
        return jobs[i].tests.completed;
      }
    }
  }

  MockRetrievalService.getCustomer = function(jobid) {
    for(var i = 0; i < jobs.length; i++) {
      if(jobs[i].id == jobid) {
        return jobs[i].customer;
      }
    }    
  }

  return MockRetrievalService;

});