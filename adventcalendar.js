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
		var vidContent = '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + door.video + '"></iframe>';
		activeDoorContent.html(vidContent);
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

		var vids = ["KdftbYqA_VQ","lfpjXcawG60","w1IhkW1ztFo","pXDlzsKmhn4","gpe3nXpnAZc","pHAqJ4F6NSo","RJDY6fDoSzo","HBBwXAPNLr0","LsL8dGj0BLU","3owSSPoTdaE","QoPofJeWuR0","a8O-iLZM-gA","eKRw0W6UVCQ","ljv1fO4qrIw","ebv51QNm2Bk","iUXAHc-ABoY","xCBT-rRHGmk","OKrRCTvjbEY","7DCz1SgByDM","SEIoYyAoXNg","jluxqXp8J18","29s6fS7Y5dY","QSa8KQtIBhU","FGXDKrUoVrw"];
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