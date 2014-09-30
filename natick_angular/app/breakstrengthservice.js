natickModule.factory('BreakStrengthService', [function() {

  // var fillTest = [];
  // var warpTest = [];

  // var subTestID ?
  // Keep a reference to the subtest ID once we get it so we don't have to
  // query it from the poor DB interface multiple times ... ?

  //Retreieve tests from DB; These are placeholders;

  var fillTest = [];

  var warpTest = [
      {
        strength: '120',
        elongation: '115',
        notes: 'nothing to report',
      },
      {
        strength: '105',
        elongation: '100',
        notes: 'oddities',
      },
      {
        strength: '156',
        elongation: '25',
        notes: 'anomolies',
      },
      {
        strength: '169',
        elongation: '28',
        notes: 'things',
      },
      {
        strength: 'over 9000',
        elongation: '50',
        notes: 'there are a lot of things to say about this sample. I want to write something longer to see how it looks in the text area of the modal that pops up for this sample.',
      }
  ];

  var blankSample = {
        strength: '',
        elongation: '',
        notes: '',
  };

  var BreakStrengthService = {};

  BreakStrengthService.warpTest = function(jobid) {
    // warpTest = $.get() ...
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
    console.log('submit partial form to DB to retain data');
    //$.post(dbUrl + '/SubTest/')
  }

  BreakStrengthService.completeTest = function() {
      console.log('placeholder for submitting break test.');
      // This function should send the final data and change
      // date completed to the current date and time.
  }

  return BreakStrengthService;

}]);