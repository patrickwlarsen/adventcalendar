var debug = false;
var adventcalendar = {
	init: function() {
		console.log('init');
		adventcalendar.firstTimeSetup();
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
			var name = 'adventcalendar';
			var value = 'PTEST';
			adventcalendar.persistence.setCookie(name, value, 365);
		},
		load: function() {
			var name = 'adventcalendar';
			var value = adventcalendar.persistence.getCookie(name);
		    console.log('loaded: ', value);
		},
		setCookie: function(cname,cvalue,exdays) {
		  var d = new Date();
		  d.setTime(d.getTime() + (exdays*24*60*60*1000));
		  var expires = "expires="+ d.toUTCString();
		  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		},
		getCookie: function(cname) {
		  var name = cname + "=";
		  var decodedCookie = decodeURIComponent(document.cookie);
		  console.log('decodedCookie:',decodedCookie);
		  var ca = decodedCookie.split(';');
		  for(var i = 0; i <ca.length; i++) {
		    var c = ca[i];
		    while (c.charAt(0) == ' ') {
		      c = c.substring(1);
		    }
		    if (c.indexOf(name) == 0) {
		      return c.substring(name.length, c.length);
		    }
		  }
		  return "";
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
			activeDoor.show();
		} else {
			var vidContent = '<iframe width="420" height="315" src="https://www.youtube.com/embed/l9bLoheF3uc?start=10&autoplay=true"></iframe>';
			activeDoorVideo.html(vidContent);
			activeDoorComment.html('<p>Hey hey! Ikke snyde!</p>');
			activeDoorImage.html('<img src="img/dennis.gif"></img>');
			activeDoor.show();
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
				openDate: null,
				position: randomPosition
			};
			this.doors.push(door);
			positionsUsed.push(randomPosition);
		}

		var vids = ["vwrvbjBF7YQ","lfpjXcawG60","8xeBGx2bfxc","pXDlzsKmhn4","gpe3nXpnAZc","pHAqJ4F6NSo","RJDY6fDoSzo","HBBwXAPNLr0","LsL8dGj0BLU","3owSSPoTdaE","QoPofJeWuR0","a8O-iLZM-gA","eKRw0W6UVCQ","ljv1fO4qrIw","ebv51QNm2Bk","iUXAHc-ABoY","xCBT-rRHGmk","OKrRCTvjbEY","7DCz1SgByDM","SEIoYyAoXNg","29s6fS7Y5dY","QSa8KQtIBhU","FGXDKrUoVrw", "SFpiOoWFNNg"];
		var comments = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","YMAL bliver gratis!","Glaedelig jul!!"];
		//var comments = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
		for(var i = 0; i < this.doors.length; i++) {
			this.doors[i].video = vids[i];
			this.doors[i].comment = comments[i];
			this.doors[i].openDate = new Date(2019, 11, i+1);
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