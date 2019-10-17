var adventcalendar = {
	init: function() {
		console.log('init');
		adventcalendar.firstTimeSetup();
		adventcalendar.setupCalendar();
		adventcalendar.initDoors();
		adventcalendar.initActiveDoor();
	},
	initDoors: function() {
		$('.door').each(function(i, v) {
			$($('.door')[i]).on('click', function() {
				var doorObj = adventcalendar.doors[(parseInt($(this).attr('number')) - 1)];
				console.log('door clicked!', doorObj);
				adventcalendar.openDoor(doorObj);
			});
		});
	},
	initActiveDoor: function() {
		var activeDoorClose = $('#activeDoorClose');
		activeDoorClose.on('click', function() {
			var activeDoor = $('#activeDoor');
			var activeDoorContent = $('#activeDoorContent');
			activeDoorContent.html('');
			activeDoor.hide();
		});
	},
	openDoor: function(door) {
		var activeDoor = $('#activeDoor');
		var activeDoorContent = $('#activeDoorContent');
		activeDoorContent.html(door.video);
		activeDoor.show();
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
			positionsUsed.push(randomPosition);
		}

		var vids = ["https://www.youtube.com/watch?v=KdftbYqA_VQ","https://www.youtube.com/watch?v=lfpjXcawG60","https://www.youtube.com/watch?v=w1IhkW1ztFo","https://www.youtube.com/watch?v=pXDlzsKmhn4","https://www.youtube.com/watch?v=gpe3nXpnAZc","https://www.youtube.com/watch?v=pHAqJ4F6NSo","https://www.youtube.com/watch?v=RJDY6fDoSzo","https://www.youtube.com/watch?v=HBBwXAPNLr0","https://www.youtube.com/watch?v=LsL8dGj0BLU","https://www.youtube.com/watch?v=3owSSPoTdaE","https://www.youtube.com/watch?v=QoPofJeWuR0","https://www.youtube.com/watch?v=a8O-iLZM-gA","https://www.youtube.com/watch?v=eKRw0W6UVCQ","https://www.youtube.com/watch?v=ljv1fO4qrIw","https://www.youtube.com/watch?v=ebv51QNm2Bk","https://www.youtube.com/watch?v=iUXAHc-ABoY","https://www.youtube.com/watch?v=xCBT-rRHGmk","https://www.youtube.com/watch?v=OKrRCTvjbEY","https://www.youtube.com/watch?v=7DCz1SgByDM","https://www.youtube.com/watch?v=SEIoYyAoXNg","https://www.youtube.com/watch?v=jluxqXp8J18","https://www.youtube.com/watch?v=29s6fS7Y5dY","https://www.youtube.com/watch?v=QSa8KQtIBhU","https://www.youtube.com/watch?v=FGXDKrUoVrw"];
		var comments = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
		for(var i = 0; i < this.doors.length; i++) {
			this.doors[i].video = vids[i];
			this.doors[i].comment = comments[i];
		}
	},
	setupCalendar: function() {
		var calendarDiv = $('#adventcalendar');
		var doorHtmlDivs = new Array(24);
		for(var i = 0; i < this.doors.length; i++) {
			var door = this.doors[i];
			var doorHtml = '<div class="door' + (door.opened ? ' opened' : ' unopened') + '"';
			doorHtml += ' position="' + door.position + '"';
			doorHtml += ' number="' + door.number + '">' + door.number + '</div>';
			doorHtmlDivs[door.position] = doorHtml;
		}
		for(var i = 0; i < doorHtmlDivs.length; i++) {
			calendarDiv.append(doorHtmlDivs[i]);
		}
	}
};

$(document).ready(function() {
	adventcalendar.init();
});