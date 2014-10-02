natickModule.factory('BreakStrengthService', 
  ['RetrievalService', function(RetrievalService) {

  // var fillTest = [];
  // var warpTest = [];

  // var subTestID ?
  // Keep a reference to the subtest ID once we get it so we don't have to
  // query it from the poor DB interface multiple times ... ?

  // Retreieve tests from DB; These are placeholders;

  var subTestID = '';
  var warpTest = [];
  var fillTest = [];
  var isWarpRequired = false;
  var isFillRequired = false;
  var nomenclature = '';
  var specification = '';
  var testMethod = '';

  var blankSample = {
        strength: '',
        elongation: '',
        notes: '',
  };

  var BreakStrengthService = {};

  BreakStrengthService.retrieveData = function(jobid) {

    // Let's get some data for our form. This should be called first in the
    // break strength controller. Poor, I know, but we're running out of time.

    var test = this.getTest(jobid);
    var test_data = JSON.parse(test.test_data);

    subTestID = test.id;

    if(test_data.warp != []) {
      warpTest = test_data.warp;
      isWarpRequired = true;
    }

    if(test_data.fill != []) {
      fillTest = test_data.fill;
      isFillRequired = true;
    }

  }

  BreakStrengthService.getTest = function(jobid) {
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
          }
        }
      }
    }
    console.log('break strength test found: ', test)
    return test;
  }

  BreakStrengthService.isWarpRequired = function() {
    return isWarpRequired;
  }

  BreakStrengthService.isFillRequired = function() {
    return isFillRequired;
  }

  BreakStrengthService.warpTest = function(jobid) {
    // warpTest = $.get() ...
    // 
    return warpTest;
  }

  BreakStrengthService.fillTest = function(jobid) {
    // fillTest = $.get() ...
    return fillTest;
  }

  BreakStrengthService.addWarpSample = function() {
    warpTest.push(angular.copy(blankSample));
  }

  BreakStrengthService.addFillSample = function() {
    fillTest.push(angular.copy(blankSample));
  }  

  BreakStrengthService.removeWarpSample = function() {
    warpTest.pop();
  }
  
  BreakStrengthService.removeFillSample = function() {
    fillTest.pop();
  }  

  BreakStrengthService.saveData = function() {
    console.log('user moved away from the break test');
    console.log('saving subtestID ' + subTestID);

    var newTestData = {
      "test_data": angular.toJson({
        "warp": warpTest,
        "fill": fillTest,
      })
    };

//    newTestData.test_data = angular.toJson(newTestData.test_data);

    $.post(Global.dbUrl + '/SubTest/' + subTestID + '/',
          newTestData
          )
          .done(function(data) {
            console.log('Test Data saved: ' + JSON.stringify(data, null, 2));
          })
          .fail(function(data) {
            $('body').append(data.responseText);
          });    
  }

  BreakStrengthService.completeTest = function() {
      console.log('placeholder for submitting break test.');
      // This function should send the final data and change
      // date completed to the current date and time.
  }

  return BreakStrengthService;

}]);