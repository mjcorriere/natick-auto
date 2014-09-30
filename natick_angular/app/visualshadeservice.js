natickModule.factory('VisualShadeService', [function() { 

	var VisualShadeService = {};
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

	return VisualShadeService;

}])