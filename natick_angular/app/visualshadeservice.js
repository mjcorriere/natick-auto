natickModule.factory('VisualShadeService', [function() { 

    var VisualShadeService = {};
    // var testData = [];
    // var subTestID ?
    
    var testData = [
        {
            color: 'Blue',
            result: '2',
            notes: 'This color is my favorite'
        },
        {
            color: 'Brown',
            result: '0',
            notes: ''
        },
        {
            color: 'Chartruese',
            result: '1',
            notes: 'Lovely.'
        }
    ];

    VisualShadeService.testData = function() {
        //$.get() ...
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
      console.log('submit partial form to DB to retain data');
      //$.post(dbUrl + '/SubTest/')
    }

    VisualShadeService.completeTest = function() {
        console.log('placeholder for submitting visual shade test.');
        // This function should send the final data and change
        // date completed to the current date and time.
    }    

    return VisualShadeService;

}])