natickModule.factory('BreakStrengthService', 
  ['RetrievalService', function(RetrievalService) {

  var subTestID = '';
  var warpTest = [];
  var fillTest = [];
  var isWarpRequired = false;
  var isFillRequired = false;

  var blankSample = {
        strength: '',
        elongation: '',
        notes: '',
  };

  var BreakStrengthService = {};

  BreakStrengthService.retrieveData = function(jobid) {

    // Let's get some data for our form. This should be called first in the
    // break strength controller. Poor, I know, but we're running out of time.

    console.log('RETREIVING DATA');
    var test      = this.getTest(jobid);
    var test_data = JSON.parse(test.test_data);

    subTestID     = test.id;
    
    if(test_data.hasOwnProperty('warp')) {
      warpTest = test_data.warp;
      isWarpRequired = true;
    }

    if(test_data.hasOwnProperty('fill')) {
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
    console.log('iswarp ' + isWarpRequired);
    return isWarpRequired;
  }

  BreakStrengthService.isFillRequired = function() {
    console.log('isfill ' + isFillRequired);
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

  BreakStrengthService.nomenclature = function() {
    return nomenclature;
  }

  BreakStrengthService.testMethod = function() {
    return testMethod;
  }

  BreakStrengthService.specification = function() {
    return specification;
  }

  BreakStrengthService.specLimit = function() {
    return specLimit;
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

    // var newTestData = {
    //   "test_data": angular.toJson({
    //     "warp": warpTest,
    //     "fill": fillTest,
    //   })
    // };

    var newTestData = {
      "test_data": {}
    };

    if(isWarpRequired) {
      newTestData.test_data.warp = warpTest;
    }

    if(isFillRequired) {
      newTestData.test_data.fill = fillTest;
    }

    newTestData.test_data = angular.toJson(newTestData.test_data);

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
      console.log('completing breaktest subtestID', subTestID);
      // This function should send the final data and change
      // date completed to the current date and time.

      var completeDate = {
        "complete_date": new Date().toISOString()
      };      

      $.post(Global.dbUrl + '/SubTest/' + subTestID + '/',
        completeDate
        )
        .done(function(data) {
          console.log('breaktest subID', subTestID, 'completed');
        });

  }

  return BreakStrengthService;

}]);