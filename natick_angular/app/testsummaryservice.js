natickModule.factory('TestSummaryService', 
  ['RetrievalService', function(RetrievalService) {

  var subTestID = '';
  var nomenclature = '';
  var dueDate = '';
  var specLimit = '';
  var testMethod = '';

  var TestSummaryService = {};

  TestSummaryService.retrieveData = function(jobid) {

    // Let's get some data for our form. This should be called first in the
    // test controller. Poor, I know, but we're running out of time.

    console.log('RETREIVING DATA');
    var test      = this.getTest(jobid);
    var test_data = JSON.parse(test.test_data);

    dueDate       = RetrievalService.getDueDate(jobid);
    subTestID     = test.id;
    testMethod    = test.test_options;
    specLimit     = test.spec_limit;

  }

  TestSummaryService.getTest = function(jobid) {
    console.log('Getting break strength test for job ' + jobid);

    var test;

    // We must work our way from items on down to the subtest we want.
    // Clunky but this is the interface provided by the DB ...
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
          if (subTest.test_name == 'Break strength') {
            test = subTest;
            nomenclature = item.nomenclature;
          }
        }
      }
    }
    console.log('break strength test found: ', test)
    return test;
  }

  TestSummaryService.nomenclature = function() {
    return nomenclature;
  }

  TestSummaryService.testMethod = function() {
    return testMethod;
  }

  TestSummaryService.specification = function() {
    return specification;
  }

  TestSummaryService.specLimit = function() {
    return specLimit;
  }  

  TestSummaryService.dueDate = function() {
    return dueDate;
  }

  return TestSummaryService;

}]);