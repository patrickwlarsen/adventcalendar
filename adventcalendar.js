var adventcalendar = {
	init: function() {
		console.log('init');
		adventcalendar.firstTimeSetup();

		for(var i = 0; i < this.doors.length; i++) {
			console.log(this.doors[i]);
		}
	},
	firstTimeSetup: function() {
		this.doors = [];
		var positionsUsed = [];
		for(var i = 0; i < 24; i++) {
			var randomPosition = Math.floor(Math.random() * 24)+1;
			var positionTaken = true;
			while(positionTaken) {
				if(positionsUsed.indexOf(randomPosition) == -1) {
					positionTaken = false;
				} else {
					randomPosition = Math.floor(Math.random() * 24)+1;
				}
			}
			var door = {
				opened: false,
				number: i+1,
				video: '',
				image: '',
				comment: '',
				position: randomPosition
			};
			this.doors.push(door);
		}

		//TODO: Put video/image and comment in each door
		//this.doors[0].video = 'PTEST';
	}
};

$(document).ready(function() {
	adventcalendar.init();
});