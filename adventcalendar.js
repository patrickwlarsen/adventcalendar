var adventcalendar = {
	debug: false,
	init: function() {
		if(adventcalendar.persistence.load() != null) {
			var data = adventcalendar.persistence.load();
			this.doors = data.doors;
		} else {
			adventcalendar.firstTimeSetup();
		}
		if(this.doors)

		adventcalendar.setupCalendar();
		adventcalendar.initDoors();
		adventcalendar.initActiveDoor();
		if(adventcalendar.debug) {
			//adventcalendar.testVideos();	
		}
	},
	initDoors: function() {
		$('.door').each(function(i, v) {
			$($('.door')[i]).on('click', function() {
				var doorObj = adventcalendar.doors[(parseInt($(this).attr('number')) - 1)];
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
			localStorage.setItem('adventcalendar2021v1', JSON.stringify(data));
		},
		load: function() {
			return JSON.parse(localStorage.getItem('adventcalendar2021v1'));
		}
	},
	openDoor: function(door) {
		var activeDoor = $('#activeDoor');
		var activeDoorContent = $('#activeDoorContent');
		var activeDoorVideo = $('#activeDoorVideo');
		var activeDoorComment = $('#activeDoorComment');
		var activeDoorImage = $('#activeDoorImage');
		var doorMonth = door.openDate.toString().substring(5,7);
		var doorDate = parseInt(door.openDate.toString().substring(8,10));

		var doorCanOpen = false;
		var doorOpenDate = new Date(door.openDate);
		if(doorOpenDate.getFullYear() < new Date().getFullYear() || (doorOpenDate.getFullYear() <= new Date().getFullYear() && doorOpenDate.getMonth() == new Date().getMonth() && doorOpenDate.getDate() <= new Date().getDate())) {
			doorCanOpen = true;
		}

		if(doorCanOpen || adventcalendar.debug) {
			$($('.door')[door.position-1]).removeClass('unopened');
			$($('.door')[door.position-1]).addClass('opened');
			var vidContent = '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + door.video + '" autoplay="true"></iframe>';
			activeDoorVideo.html(vidContent);
			activeDoorComment.html('<p></p>');
			/*if([6, 13, 20].indexOf(door.number) > -1) {
				console.log('yes');
				activeDoorComment.append('<a class="pluglink" href="https://plug.dj/tardokings" target="_blank">Plug DJ</a>');
			}*/
			activeDoorImage.html('');
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

		//fredag = 6, 13, 20
		var vids2020 = ["HJbAHjA7nPI","du-TY1GUFGk","BW1aX0IbZOE","Wn4Kxy6bPI4","9UsRtnVXn6U","HHFFdy2NSdE","G7RgN9ijwE4","7zpxgyG7eGk","Oct2xKMGOno","oawUi9s3ENE","IdoD2147Fik","lKMDvCf1IUE","XLj9QtidiTo","dEI7oX0XxJw","Fuz26mUN2m0","WZy02_OFErk","71tBoyCs-Nc","qblUCI20v_0","B8uBR7nHgls","Rvp0wkUerAg","TiC8pig6PGE","IdyXKJ8NcNI","24e8Y3Vi0Ao","EKqIBDHnqHE"];
		var vids = ["dhbjsmtz0oU","0XvnWxnivS8","Y4Z7Ds_yv8o","M3j2_vLBzPk","IdYBt4_QiHo","PaFnO5LKTSs","dvyZfa9x3UU","wgTZUU4gJ2U","gCyrKJg-1VM","tYpLDJfG05A","boDSEeGt8hg","enB2QL9Ulus","xCO_SUUMp6A","AnqPfbb0GlA","CIdXPIN3j38","d6gBu2Zd7Bc","lW4ugw_6w-Q","uB0mO42KM6g","LjBUZ43bLjE","9dd_L7gL5ms","yiOqHOgWEEM","lczsxfhh3po","xy1Mihmc_4c","EKqIBDHnqHE"];
		var comments = ["Glaedelig foerste advent!","Hvad er ligheden mellem en munk og et juletrae? - Kuglerne er kun til pynt.","Hvorfor faar julemanden saa meget sex? Fordi han ved hvor de uartige piger bor.","Hvad kalder man en nisse, der arbejder paa et elvaerk? En wattnisse :D","Vidste du at nisser er mere glad for ris end for ros?","Saa var der julemanden der gik til psykiater og sagde: Doktor, jeg tror ikke mere paa mig selv..","Synes du det er OK at spille 'Last Christmas' paa et plejehjem?","Glaedelig anden advent! Husk at taende lysene.","Der er klejne bake-off paa 4. sal idag! Kom op og smag og vurder hvem der har bagt den bedste klejne!","Hvad sagde Jesus da han satte sig ind i taxaen? Soemmet i bund!","En blondine paa jagt efter juletrae i skoven siger efter flere timer: 'Nu gider jeg fandeme ikke mere! Jeg tager sgu det naeste trae, uanset om det er pyntet eller ej!'","..og pludeslig sagde han til svigermor 'Ja, julemanden har i det mindste den rette indstilling; Han kommer kun paa besoeg en gang om aaret.'","Hvor bor julemanden naar han er paa ferie? Paa ho-ho-ho-tel!","Hvad hedder julemandens kone? Marry Christmas!","Glaedelig tredje advent :-)","Hvad faar polske boern i julegave? Din cykel!","Hvorfor gaar aarhusianere altid rundt paa bordet juleaften? - De har hoert der skal gaas paa bordet!","Alle boernene sad paa julemandens skoed, undtagen Mads - der var ikke plads.","Hr. Jensen hvorfor kommer de for sent? Jensen: Fordi julen stod for doeren.","To blondiner staar og snakker. Den ene siger 'I aar ligger juleaften paa en fredag'. Den anden svarer: 'Uha nu er det vel ikke d. 13.?!'","Hvad kalder man en Julemand, so mer klaedt ud som dame? - En pakketrans!","Fjerne advent. Nu er vi der snart!","YMAL bliver gratis!","Glaedelig jul!!"];
		//var comments = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"];
		for(var i = 0; i < this.doors.length; i++) {
			this.doors[i].video = vids[i];
			this.doors[i].comment = comments[i];
			this.doors[i].openDate = new Date(2021, 11, i+1);
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

document.addEventListener("keydown", keyDownTextField, false);
var progress = [];
function keyDownTextField(e) {
	var keyCode = e.keyCode;
	var snyd = false;
	switch(keyCode) {
		case 83: progress = [83]; break;
		case 78: if(progress.length == 1 && progress[0] == 83) { progress.push(78); } else { progress = []; } break;
		case 89: if(progress.length == 2 && progress[0] == 83 && progress[1] == 78) { progress.push(89); } else { progress = []; } break;
		case 68: if(progress.length == 3 && progress[0] == 83 && progress[1] == 78 && progress[2] == 89) { snyd = true; } else { progress = []; } break;
		default: progress = [];
	}
	if(snyd) {
		adventcalendar.debug = true;
		$('body').css('background-image', 'url("https://consequenceofsound.net/wp-content/uploads/2018/09/cage-rage-memes.png?w=807")');
		$('body').css('background-repeat', 'repeat');
	}
}

$(document).ready(function() {
	adventcalendar.init();
});