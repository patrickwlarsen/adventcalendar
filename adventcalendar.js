var debug = true;
var adventcalendar = {
	init: function() {
		console.log('init');
		if(adventcalendar.persistence.load() != null) {
			var data = adventcalendar.persistence.load();
			this.doors = data.doors;
		} else {
			adventcalendar.firstTimeSetup();
		}
		adventcalendar.setupCalendar();
		adventcalendar.initDoors();
		adventcalendar.initActiveDoor();
		if(debug) {
			//adventcalendar.testVideos();	
		}
	},
	initDoors: function() {
		$('.door').each(function(i, v) {
			$($('.door')[i]).on('click', function() {
				var doorObj = adventcalendar.doors[(parseInt($(this).attr('number')) - 1)];
				console.log('door clicked!', doorObj);
				$($('.door')[i]).removeClass('unopened');
				$($('.door')[i]).addClass('opened');
				adventcalendar.openDoor(doorObj);
			});
		});
	},
	initActiveDoor: function() {
		var activeDoorClose = $('#activeDoorClose');
		activeDoorClose.on('click', function() {
			var activeDoor = $('#activeDoor');
			var activeDoorVideo = $('#activeDoorVideo');
			activeDoorVideo.html('');
			activeDoor.hide();
		});
	},
	testVideos: function() {
		var vids = ["SFpiOoWFNNg"];
		for(var i = 0; i < vids.length; i++) {
			var vidContent = '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + vids[i] + '" autoplay="true"></iframe>';
			$('body').append(vidContent);
		}
	},
	persistence: {
		save: function() {
			var data = {
				doors: adventcalendar.doors
			};
			localStorage.setItem('adventcalendar', JSON.stringify(data));
		},
		load: function() {
			return JSON.parse(localStorage.getItem('adventcalendar'));
		}
	},
	openDoor: function(door) {
		var activeDoor = $('#activeDoor');
		var activeDoorContent = $('#activeDoorContent');
		var activeDoorVideo = $('#activeDoorVideo');
		var activeDoorComment = $('#activeDoorComment');
		var activeDoorImage = $('#activeDoorImage');
		if(new Date() >= door.openDate || debug) {
			var vidContent = '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + door.video + '" autoplay="true"></iframe>';
			activeDoorVideo.html(vidContent);
			activeDoorComment.html('<p>' + door.comment + '</p>');
			if([6, 13, 20].indexOf(door.number) > -1) {
				console.log('yes');
				activeDoorComment.append('<a class="pluglink" href="https://plug.dj/tardokings" target="_blank">Plug DJ</a>');
			}
			activeDoor.show();
			door.opened = true;
			adventcalendar.persistence.save();
			console.log(door);
		} else {
			var vidContent = '<iframe width="420" height="315" src="https://www.youtube.com/embed/l9bLoheF3uc?start=10&autoplay=true"></iframe>';
			activeDoorVideo.html(vidContent);
			activeDoorComment.html('<p>Hey hey! Ikke snyde!</p>');
			activeDoorImage.html('<img src="img/dennis.gif"></img>');
			activeDoor.show();
		}
	},
	firstTimeSetup: function() {
		console.log('generating new data');
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
				openDate: null,
				position: randomPosition
			};
			this.doors.push(door);
			positionsUsed.push(randomPosition);
		}

		var vids = ["vwrvbjBF7YQ","lfpjXcawG60","8xeBGx2bfxc","pXDlzsKmhn4","gpe3nXpnAZc","pHAqJ4F6NSo","RJDY6fDoSzo","HBBwXAPNLr0","LsL8dGj0BLU","3owSSPoTdaE","QoPofJeWuR0","a8O-iLZM-gA","eKRw0W6UVCQ","ljv1fO4qrIw","ebv51QNm2Bk","iUXAHc-ABoY","xCBT-rRHGmk","OKrRCTvjbEY","7DCz1SgByDM","SEIoYyAoXNg","29s6fS7Y5dY","QSa8KQtIBhU","FGXDKrUoVrw", "SFpiOoWFNNg"];
		var comments = ["1","2","3","4","5","Idag er der julemusik paa pluggen :-)","7","8","9","10","11","12","Julemusik paa pluggen woohooo!","14","15","16","17","18","19","Julemanden er DJ paa pluggen - og han har lovet at han ikke spiller Wham!","21","22","YMAL bliver gratis!","Glaedelig jul!!"];
		//fredag = 6, 13, 20
		//var comments = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
		for(var i = 0; i < this.doors.length; i++) {
			this.doors[i].video = vids[i];
			this.doors[i].comment = comments[i];
			this.doors[i].openDate = new Date(2019, 11, i+1);
		}
		adventcalendar.persistence.save();

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