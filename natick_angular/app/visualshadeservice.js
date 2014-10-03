natickModule.factory('VisualShadeService', [function() { 

  var VisualShadeService = {};
  var testData = [];
  var subTestID = '';
  
  // var testData = [
  //     {
  //         "color": "Blue",
  //         "result": "2",
  //         "notes": "This color is my favorite"
  //     },
  //     {
  //         "color": "Brown",
  //         "result": "0",
  //         "notes": ""
  //     },
  //     {
  //         "color": "Chartruese",
  //         "result": "1",
  //         "notes": "Lovely."
  //     }
  // ];

  VisualShadeService.retrieveData = function(jobid) {

    // Let's get some data for our form. This should be called first in the
    // break strength controller. Poor, I know, but we're running out of time.

    console.log('RETREIVING DATA');
    var test      = this.getTest(jobid);

    testData      = JSON.parse(test.test_data);
    subTestID     = test.id;

  }

  VisualShadeService.getTest = function(jobid) {
    console.log('Getting visual shade test for job ' + jobid);

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
          if (subTest.test_name == 'Visual shade') {
            test = subTest;
          }
        }
      }
    }
    console.log('visual shade test found: ', test)
    return test;
  }

  VisualShadeService.testData = function() {
    return testData;
  }

  VisualShadeService.addSample = function() {
    testData.push({
      color: '',
      result: '0',
      notes: ''
    });
  }

  VisualShadeService.removeSample = function() {
    testData.pop();
  }

  VisualShadeService.saveData = function() {
    console.log('user moved away from the visual shade test');
    console.log('saving subtestID ' + subTestID);

    var newTestData = {
      "test_data": angular.toJson(testData)
    };

  //newTestData.test_data = angular.toJson(newTestData.test_data);

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

  VisualShadeService.completeTest = function() {
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
        console.log('visual shade subID', subTestID, 'completed');
      });
  }    

  return VisualShadeService;

}])