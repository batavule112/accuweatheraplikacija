var trazi = new XMLHttpRequest();
var trazi1 = new XMLHttpRequest();
var string = "";
var string1 = "";
var minuti = String(new Date()).substring(19, 21);
function fToC(fahrenheit) {
  		var fTemp = fahrenheit;
  		var fToCel = (fTemp - 32) * 5 / 9;
  		var ovo = Math.round(fToCel) + '\xB0C';
    return ovo;
}
window.onload = function() {
	nadjiLokaciju();
}
function nadjiLokaciju() {
    navigator.geolocation.getCurrentPosition(prikaziPoziciju);
}
function prikaziPoziciju(pozicija) {
    var lat = parseFloat(pozicija.coords.latitude).toFixed(3)
    var long = parseFloat(pozicija.coords.longitude).toFixed(3)
    var urlLoc = "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=%09CUIJALV2AY2W5LxbnZ4wjW6A9rHJbfjG&q="+ lat +"%2C%20"+ long +"";
    // pocetak lokacijskog requesta
	trazi.open('GET', urlLoc, true);
	trazi.onload = function(){
	if(this.status === 200){
		var data = JSON.parse(this.responseText);
		console.log(data);
		document.getElementById('lokacija').insertAdjacentHTML('afterbegin', data.EnglishName);
		var url5day = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/"+ data.Key +"?apikey=CUIJALV2AY2W5LxbnZ4wjW6A9rHJbfjG";
		// pocetak 5 day requesta
 		trazi.open('GET', url5day, true);
		trazi.onload = function(){
		if(this.status === 200){
			var data = JSON.parse(this.responseText);
			console.log(data);
			for ( var i = 0; i < data.DailyForecasts.length; i++ ) {
				var elem = data.DailyForecasts[i];
				var date = String(new Date(elem.EpochDate*1000));
	    		string += "<div class='donji-dani'>";
	    		string += "<h6 class='center-vertical'>"+ date.substring(0,10) +"</h6>";
	    		string += "<div class='between'>";
				string += "<img src='https://developer.accuweather.com/sites/default/files/"+ ('0' + elem.Day.Icon).slice(-2) +"-s.png'/>";
				string += "<h5 class='center-vertical'>"+ fToC(elem.Temperature.Minimum.Value)  +" / "+ fToC(elem.Temperature.Maximum.Value) +"</h5>";
				string += "</div>";
				string += "</div>";
			document.getElementById('donji-deo').innerHTML = string;
			}
			document.getElementById('prvi-minmax').insertAdjacentHTML('afterbegin', fToC(data.DailyForecasts[0].Temperature.Minimum.Value)  +' / '+ fToC(data.DailyForecasts[0].Temperature.Maximum.Value));
				}
			}
			trazi.send();
			// kraj 5 day requesta
			var url12hour = "https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/"+ data.Key +"?apikey=CUIJALV2AY2W5LxbnZ4wjW6A9rHJbfjG";
			// pocetak 12 sati requesta
			trazi1.open('GET', url12hour, true);
			trazi1.onload = function(){
			if(this.status === 200){
				var data1 = JSON.parse(this.responseText);
				console.log(data1);
				for ( var i = 0; i < data1.length; i++ ) {
					var data = data1[i];
					string1 += "<div class='swiper-slide'>";
					string1 += "<div class='mala-kutija'>";
					string1 += "<p>"+ data.DateTime.substring(11,16) +"</p>";
					string1 += "<img src='https://developer.accuweather.com/sites/default/files/"+ ('0' + data.WeatherIcon).slice(-2) +"-s.png'/>";
					string1 += "<p>"+ fToC(data.Temperature.Value) +"</p>";
					string1 += "</div>";
					string1 += "</div>";
					document.getElementById('sweeper').innerHTML = string1;
				}
				if (data1[0].WeatherIcon == 1 ||
					data1[0].WeatherIcon == 2 ||
					data1[0].WeatherIcon == 30 ||
					data1[0].WeatherIcon == 33 ||
					data1[0].WeatherIcon == 34 ) {
						if (data1[0].IsDaylight == true) {
						document.getElementsByClassName('omotac')[0].classList.add('dan');
						document.getElementsByClassName('sunce')[0].style.display = "block";
						} else {
						document.getElementsByClassName('omotac')[0].classList.add('noc');
						document.getElementsByClassName('mesec')[0].style.display = "block";
						}
				}
				if (data1[0].WeatherIcon == 3 ||
					data1[0].WeatherIcon == 4 ||
					data1[0].WeatherIcon == 35 ||
					data1[0].WeatherIcon == 36 ) {
						if (data1[0].IsDaylight == true) {
						document.getElementsByClassName('omotac')[0].classList.add('dan');
						document.getElementsByClassName('sunce')[0].style.display = "block";
						document.getElementsByClassName('oblak')[0].style.display = "block";
						} else {
						document.getElementsByClassName('omotac')[0].classList.add('noc');
						document.getElementsByClassName('mesec')[0].style.display = "block";
						document.getElementsByClassName('oblak')[0].style.display = "block";
						}
				}
				if (data1[0].WeatherIcon == 5 ||
					data1[0].WeatherIcon == 6 ||
					data1[0].WeatherIcon == 20 ||
					data1[0].WeatherIcon == 21 ||
					data1[0].WeatherIcon == 23 ||
					data1[0].WeatherIcon == 37 ||
					data1[0].WeatherIcon == 38 ) {
						if (data1[0].IsDaylight == true) {
						document.getElementsByClassName('omotac')[0].classList.add('dan');
						document.getElementsByClassName('sunce')[0].style.display = "block";
						document.getElementsByClassName('oblak')[1].style.display = "block";
						} else {
						document.getElementsByClassName('omotac')[0].classList.add('noc');
						document.getElementsByClassName('mesec')[0].style.display = "block";
						document.getElementsByClassName('oblak')[1].style.display = "block";
						}
				}
				if (data1[0].WeatherIcon == 7 ||
					data1[0].WeatherIcon == 8 ||
					data1[0].WeatherIcon == 19 ||
					data1[0].WeatherIcon == 30 ) {
						if (data1[0].IsDaylight == true) {
						document.getElementsByClassName('omotac')[0].classList.add('dan');
						document.getElementsByClassName('oblak')[2].style.display = "block";
						document.getElementsByClassName('oblak')[3].style.display = "block";
						} else {
						document.getElementsByClassName('omotac')[0].classList.add('noc');
						document.getElementsByClassName('oblak')[2].style.display = "block";
						document.getElementsByClassName('oblak')[3].style.display = "block";
						}
				}
				if (data1[0].WeatherIcon == 11 ) {
					document.getElementsByClassName('omotac')[0].classList.add('magla');	
				}
				if (data1[0].WeatherIcon == 12 ||
					data1[0].WeatherIcon == 15 ||
					data1[0].WeatherIcon == 18 ||
					data1[0].WeatherIcon == 26 ||
					data1[0].WeatherIcon == 29 ) {
						if (data1[0].IsDaylight == true) {
						document.getElementsByClassName('omotac')[0].classList.add('dan');
						document.getElementsByClassName('oblak')[2].style.display = "block";
						document.getElementsByClassName('oblak')[3].style.display = "block";
						document.getElementsByClassName('kisa')[0].style.display = "block";
						for (var i = 0; i < document.getElementsByClassName('kap').length; i++) {
							document.getElementsByClassName('kap')[i].style.display = "block";
							}
						} else {
						document.getElementsByClassName('omotac')[0].classList.add('noc');
						document.getElementsByClassName('oblak')[2].style.display = "block";
						document.getElementsByClassName('oblak')[3].style.display = "block";
						document.getElementsByClassName('kisa')[0].style.display = "block";
						for (var i = 0; i < document.getElementsByClassName('kap').length; i++) {
							document.getElementsByClassName('kap')[i].style.display = "block";
							}
						}
				}
				if (data1[0].WeatherIcon == 13 ||
					data1[0].WeatherIcon == 14 ||
					data1[0].WeatherIcon == 16 ||
					data1[0].WeatherIcon == 17 ||
					data1[0].WeatherIcon == 39 ||
					data1[0].WeatherIcon == 40 ||
					data1[0].WeatherIcon == 41 ||
					data1[0].WeatherIcon == 42 ||
					data1[0].WeatherIcon == 43 ||
					data1[0].WeatherIcon == 44 ) {
						if (data1[0].IsDaylight == true) {
						document.getElementsByClassName('omotac')[0].classList.add('dan');
						document.getElementsByClassName('sunce')[0].style.display = "block";
						document.getElementsByClassName('oblak')[2].style.display = "block";
						document.getElementsByClassName('oblak')[3].style.display = "block";
						document.getElementsByClassName('kisa')[0].style.display = "block";
						for (var i = 0; i < document.getElementsByClassName('kap').length; i++) {
							document.getElementsByClassName('kap')[i].style.display = "block";
							}
						} else {
						document.getElementsByClassName('omotac')[0].classList.add('noc');
						document.getElementsByClassName('mesec')[0].style.display = "block";
						document.getElementsByClassName('oblak')[2].style.display = "block";
						document.getElementsByClassName('oblak')[3].style.display = "block";
						document.getElementsByClassName('kisa')[0].style.display = "block";
						for (var i = 0; i < document.getElementsByClassName('kap').length; i++) {
							document.getElementsByClassName('kap')[i].style.display = "block";
							}
						}
				}
				if (data1[0].WeatherIcon == 22 ||
					data1[0].WeatherIcon == 23 ||
					data1[0].WeatherIcon == 24 ||
					data1[0].WeatherIcon == 25 ||
					data1[0].WeatherIcon == 26 ) {
						if (data1[0].IsDaylight == true) {
						document.getElementsByClassName('omotac')[0].classList.add('dan');
						document.getElementsByClassName('oblak')[2].style.display = "block";
						document.getElementsByClassName('oblak')[3].style.display = "block";
						document.getElementsByClassName('sneg')[0].style.display = "block";
						for (var i = 0; i < document.getElementsByClassName('pahulja').length; i++) {
							document.getElementsByClassName('pahulja')[i].style.display = "block";
							}
						
						} else {
						document.getElementsByClassName('omotac')[0].classList.add('noc');
						document.getElementsByClassName('oblak')[2].style.display = "block";
						document.getElementsByClassName('oblak')[3].style.display = "block";
						document.getElementsByClassName('sneg')[0].style.display = "block";
						for (var i = 0; i < document.getElementsByClassName('pahulja').length; i++) {
							document.getElementsByClassName('pahulja')[i].style.display = "block";
							}
						
						}
				}
				document.getElementsByClassName('gornji-glavni')[0].insertAdjacentHTML('afterbegin', '<h1>'+ fToC(data1[0].Temperature.Value) +'</h1><h3>'+ data1[0].IconPhrase +'</h3>');
				document.getElementById('prvi-minmax').insertAdjacentHTML('afterend', '<div class="gornji-dno"><div class="dno"><p>Updated '+ minuti +' minutes ago</p><p>AccuWeather</p></div></div>');
				var mySwiper = new Swiper ('.swiper-container', {
    				slidesPerView: 6
					})
				}
			}
		trazi1.send();
		// kraj 12 sati requesta
			}
		}
	trazi.send();
	// kraj lokacijskog requesta
}
