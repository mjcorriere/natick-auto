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
      'id'  : '00145',
      'customer' : 'Draper Laboratory',
      'tests' : 'Break strength, Color fastness, Moisture absorption'
    },
    {
      'id'  : '00148',
      'customer' : 'Aperture Science',
      'tests' : 'Compressive strength, Rockwell hardness'
    },
    {
      'id'  : '00206',
      'customer' : 'Global Flight Systems',
      'tests' : 'Wind tunnel, flame retardance, impact resistance'
    }
  ];  
  
  var MockRetrievalService = {};

  MockRetrievalService.getAllCustomers = function() {
    return mockDB.customers;
  }

  MockRetrievalService.getAllJobs = function() {
    return angular.copy(jobs);
  }

  return MockRetrievalService;

});