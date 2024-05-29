
var btn = document.querySelector('#btn');
const key = process.env.API_KEY;

const city_one = document.querySelector('#city_one');
const city_two = document.querySelector('#city_two');

/**
 * Função para validar o campo, impedindo a entrada de números
 * @param {Event} e - O evento de teclado que é disparado quando uma tecla é pressionada.
 */
function validate_field(e) {
	const charCode = (typeof e.which == "number") ? e.which : e.keyCode;

	if (charCode >= 48 && charCode <= 57)
		e.preventDefault();
}

/**
 * Função para procurar um atributo específico dentro de um objeto de dados
 * 
 * @param {Object} data - O objeto de dados retornado pela API
 * @param {String} attribute - O nome do atributo a ser procurado
 * @returns {Any} - O valor do atributo encontrado ou null se não encontrado
 */
function search_field(data, attribute) {

	var keys = Object.keys(data);

	if (data.hasOwnProperty(attribute))
        return data[attribute];

	if (data["weather"][0][attribute] != undefined) 
		return JSON.parse(JSON.stringify(data["weather"][0][attribute]));

	for (var i = 0; i < keys.length; i++) {
		if (data[keys[i]][attribute] != undefined)
			return JSON.parse(JSON.stringify(data[keys[i]][attribute]));
	}

	return null;
}

/**
 * Função para exibir a tabela de resultados
 */
function display_table() {
	document.querySelector('main').style.display = "block";
}

/**
 * Função para esconder a tabela de resultados
 */
function hide_table() {
	document.querySelector('main').style.display = "none";
}

/**
 * Evento de tecla para disparar a busca ao pressionar Enter no campo city_two
 */
city_two.addEventListener('keyup', function (e) {
	if (e.keyCode == 13)
		btn.click();
});

/**
 * Evento de clique para iniciar a busca das citys
 */
btn.addEventListener("click", function () {

	if (city_one.value == "" || city_two.value == "") {

		if (city_one.value == "") {

			city_one.style.borderColor = "red";
			city_one.focus();
			hide_table();
		}

		if (city_two.value == "") {

			city_two.style.borderColor = "red";
			city_two.focus();
			hide_table();
		}
	} else {
		city_one.style.borderColor = "blue";
		city_two.style.borderColor = "blue";

		query_city(city_one, "one");
		query_city(city_two, "two");

		city_one.value = "";
		city_two.value = "";
	}
});

/**
 * Função para realizar a consulta da city
 * 
 * @param {HTMLInputElement} city - O campo de input da city
 * @param {String} id - O identificador da city ('um' ou 'dois')
 */
function query_city(city, id) {

	var req = new XMLHttpRequest();
	
	req.onloadend = function () {
	
		if (this.readyState === 4 && this.status === 200) {
		    var resp = this.responseText;
		    var resp_obj = JSON.parse(resp);
		
		    city.style.borderColor = "blue";
		
		    show_datas(resp_obj, id);
		    display_table();
		    scroll_to_table();
		
		} else {
		    city.style.borderColor = "red";
		    city.focus();
		    hide_table();
		}
	}
	
	req.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + city.value + '&appid=' + key);
	req.send();
}

/**
 * Função para exibir os dados da city
 * 
 * @param {Object} response - O objeto de dados retornado pela API
 * @param {String} id - O identificador da city ('um' ou 'dois')
 */
function show_datas(response, id) {

	const UNAVAILABLE = "Indisponível";

	// Nome
	document.querySelector(`#name_${id}`).innerHTML = response.name;

	//País da cidade
	document.querySelector(`#country_${id}`).innerHTML = search_field(response, "country") || UNAVAILABLE;

	//Distância até Barbacena
	const lat_barbacena = -21.2258;
	const lon_barbacena = -43.7736;
	
	const latitude = search_field(response, "lat");
	const longitude = search_field(response, "lon");

	document.querySelector(`#distance_barbacena_${id}`).innerHTML = latitude && longitude 
				? (distance_latitude_longitude ( { lat: lat_barbacena, lon: lon_barbacena }, { lat: latitude, lon: longitude } )) + ' Km' 
				: UNAVAILABLE;

	//Descrição do tempo 
	document.querySelector(`#weather_description_${id}`).innerHTML = search_field(response, "description") || UNAVAILABLE;

	//Imagem do tempo (icon) 
	const icon_response = search_field(response, "icon");
	document.querySelector(`#icon_${id}`).innerHTML = icon_response ? `<img id="imagem_icone" src="http://openweathermap.org/img/wn/${icon_response}@2x.png">` : UNAVAILABLE;

	//Temperatura 
	const temperature = search_field(response, "temp");
	document.querySelector(`#temperature_${id}`).innerHTML = temperature ? convert_temperature(temperature) + " Celsius" : UNAVAILABLE;

	//Sensação térmica 
	const feels_like = search_field(response, "feels_like");
	document.querySelector(`#feels_like_temperature_${id}`).innerHTML = feels_like ? convert_temperature(feels_like) + ' Celsius' : UNAVAILABLE;

	//Umidade 
	document.querySelector(`#humidity_${id}`).innerHTML = search_field(response, "humidity") + '%' || UNAVAILABLE;
	
	//Visibilidade 
	document.querySelector(`#visibility_${id}`).innerHTML = search_field(response, "visibility") || UNAVAILABLE;
	
	//Velocity do vento 
	document.querySelector(`#wind_speed_${id}`).innerHTML = search_field(response, "speed") + "Km/h" || UNAVAILABLE;
	
	//Horário do nascer do sol
	const sunrise = search_field(response, "sunrise");
	document.querySelector(`#sunrise_time_${id}`).innerHTML = sunrise ? convert_date(sunrise) : UNAVAILABLE;
	
	//Horário do pôr do sol
	const sunset = search_field(response, "sunset");
	document.querySelector(`#sunset_time_${id}`).innerHTML = sunset ? convert_date(sunset) : UNAVAILABLE;
}

/**
 * Função para calcular a distância entre duas coordenadas de latitude e longitude
 * 
 * @param {Object} loc1 - O primeiro local com propriedades lat e lon
 * @param {Object} loc2 - O segundo local com propriedades lat e lon
 * @returns {Number} - A distância em quilômetros
 */
function distance_latitude_longitude(loc1, loc2) {

	const R = 6371; // Raio da Terra em Km
	const dLat = degrees_to_radian(loc2.lat - loc1.lat);
	const dLon = degrees_to_radian(loc2.lon - loc1.lon);
	
	const a =
	Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	Math.cos(degrees_to_radian(loc1.lat)) * Math.cos(degrees_to_radian(loc2.lat)) *
	Math.sin(dLon / 2) * Math.sin(dLon / 2);
	
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	
	return parseFloat(R * c).toFixed(2);
}

/**
 * Função para converter graus em radianos
 * 
 * @param {Number} graus - O valor em graus
 * @returns {Number} - O valor em radianos
 */
function degrees_to_radian(graus) {
	return graus * (Math.PI / 180);
}

/**
 * Função para converter temperatura de Kelvin para Celsius
 * 
 * @param {Number} temp - A temperatura em Kelvin
 * @returns {Number} - A temperatura em Celsius
 */
function convert_temperature(temp) {
	return parseFloat(temp - 273).toFixed(2);
}

/**
 * Função para converter data Unix para uma string legível
 * 
 * @param {Number} timestamp - O timestamp Unix
 * @returns {String} - A data formatada
 */
function convert_date(timestamp) {
	return new Date(timestamp * 1000).toLocaleTimeString();
}

/**
 * Função para rodar o scroll, quando a tabela aparecer
 */
function scroll_to_table() {
	const altura_header = document.querySelector('header').offsetHeight;
	window.scrollBy({
		top: altura_header,
		left: 100,
		behavior: 'smooth'
	});
}
