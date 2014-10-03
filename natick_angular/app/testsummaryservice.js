natickModule.factory('TestSummaryService', 
  ['RetrievalService', function(RetrievalService) {

  var subTestID = '';
  var nomenclature = '';
  var dueDate = '';
  var specLimit = '';
  var testMethod = '';

  var TestSummaryService = {};

  TestSummaryService.retrieveData = function(jobid, testName) {

    // Let's get some data for our form. This should be called first in the
    // test controller. Poor, I know, but we're running out of time.

    console.log('RETREIVING DATA for', testName);
    var test      = this.getTest(jobid, testName);

    dueDate       = RetrievalService.getDueDate(jobid);
    subTestID     = test.id;
    testMethod    = test.test_options;
    specLimit     = test.spec_limit;

  }

  TestSummaryService.getTest = function(jobid, testName) {
    console.log('Getting', testName, 'for job', jobid);

    var test;

    // We must work our way from items on down to the subtest we want.
    // Clunky but this is the interface provided by the DB ...
    items = RetrievalService.getItems(jobid, testName);

    for(var i = 0; i < items.length; i++) {
      var item = items[i];
      testRequests = RetrievalService.getTestRequests(item.id);
      for(var j = 0; j < testRequests.length; j++) {
        var testRequest = testRequests[j];
        subTests = RetrievalService.getSubTests(testRequest.id);
        for(var k = 0; k < subTests.length; k++) {
          var subTest = subTests[k];
          console.log(subTest);
          if (subTest.test_name == testName) {
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

  TestSummaryService.specLimit = function() {
    return specLimit;
  }  

  TestSummaryService.dueDate = function() {
    return dueDate;
  }

  return TestSummaryService;

}]);