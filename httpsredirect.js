$(document).ready(function() {
	if(!window.location.href.startsWith('https')) {
		console.log('redirecting to htpps');
		if(!window.location.href.startsWith('file')) {
			window.location.replace('https' + window.location.href.substr(4));
		}
	}
});