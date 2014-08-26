var ID = 0;

function Square() {
	
	var MIN_WIDTH 		= 50
		, MAX_WIDTH 	= 150
		, MAX_X 		= 600
		, MAX_Y			= 400
	;

	this.id 			= ++ID;
	this.name 			= 'Square ' + this.id;
	this.defaultColor	= this.randomColor();
	this.color 			= this.defaultColor;
	this.hoverColor 	= 'rgb(225, 225, 255)';
	this.width 			= this.randomWidth(MIN_WIDTH, MAX_WIDTH);
	this.x 				= Math.random() * (MAX_X - this.width);
	this.y 				= Math.random() * (MAX_Y - this.width);
	this.isHovered		= false;
	this.selected		= false;

}

Square.prototype.randomColor = function() {
	var red = Math.floor(Math.random() * 255)
		, green = Math.floor(Math.random() * 255)
		, blue = Math.floor(Math.random() * 255)
	;
	return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

Square.prototype.randomWidth = function(min, max) {
	return Math.floor(min + Math.random() * (max - min));
}

Square.prototype.setHovered = function(hoverState) {
	this.isHovered = hoverState;
	console.log('hovered: ' + hoverState);
	console.log('default: ' + this.defaultColor);
	console.log('current: ' + this.color);
	if (this.isHovered) {
		this.color = this.hoverColor;
		console.log('default: ' + this.defaultColor);
		console.log('current: ' + this.color);
	} else {
		this.color = this.defaultColor;
		console.log('default: ' + this.defaultColor);
		console.log('current: ' + this.color);		
	}
}

