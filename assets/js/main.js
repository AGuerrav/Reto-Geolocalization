/* mostrarObjeto(navigator.geolocation.getCurrentPosition);
// recorrer el objeto (navigator es un objeto inherente a js)
function mostrarObjeto(obj) {
  for (var prop in obj) {
    console.log(prop + ': ' + obj [prop]);
  }
};
navigator.geolocation.getCurrentPosition(funExito, funError);
var map = document.getElementById('map');
function funError() {
  map.innerHTML = 'tenemos un problema para encontrar tu ubicación';
}
// funcion que se desencadenara cuando el usuario acepte verificar su ubicacion
// parametro respuesta es obtenida atuomaticamente
function funExito(respuesta) {
  // mostrarObjeto(respuesta.coords);
  // map.innerHTML = 'podemos encontrar tu ubicación';
  var lat = respuesta.coords.latitude;
  var lon = respuesta.coords.longitude;
  map.innerHTML = lat + ',' + lon ;
}
*/
var gMapa;
var pos;
var gMarker;
var icono;
function initMap() {
  // var labPeru = {lat: -12.1191427,
  //   lng: -77.0349046};
  // var map = new google.maps.Map(document.getElementById('map'), {
  //   zoom: 18,
  //   center: labPeru
  // });
  // var markLab = new google.maps.Marker({
  //   position: labPeru,
  //   animation: google.maps.Animation.DROP,
  //   map: map
  // });
  var map = document.getElementById('map');

  navigator.geolocation.getCurrentPosition(funExito, funError);
  // Mi ubicacion
  document.getElementById('findMe').addEventListener('click', findMe);
  function findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funExito, funError);
    }
  }
  function funError() {
    alert('Tenemos un problema para encontrar tu ubicación.Lamentablemente no podremos trazar una ruta para tí');
  }
  function funExito(respuesta) {
    // obtengo latitud y longitud de posicion actual
    var lat = respuesta.coords.latitude;
    var lon = respuesta.coords.longitude;
    pos = {lat: lat,
      lng: lon};
    // le doy mis  parametros a google ( creo objeto google latitud longitud)
    var gLatLon = new google.maps.LatLng(lat, lon);
    // creo el mapa de google con la configuracion  que yo quiera para que se renderice
    var objConfig = {
      zoom: 17,
      center: gLatLon
    };
    gMapa = new google.maps.Map(map, objConfig);
    // creo el marcador
    var objConfigMarker = {
      position: gLatLon,
      animation: google.maps.Animation.DROP,
      map: gMapa,
      icon: 'assets/img/bicycle-rider.png',

      title: 'Usted está aquí'
    };

    gMarker = new google.maps.Marker(objConfigMarker);
  };
  // Autocompletado
  var inputInitial = document.getElementById('inputInitial');
  var autocompleteInitial = new google.maps.places.Autocomplete(inputInitial);
  var inputArrival = document.getElementById('inputArrival');
  var autocompleteArrival = new google.maps.places.Autocomplete(inputArrival);
  // Ruta
  var directionsService = new google.maps.DirectionsService; // verifica los trazos a seguir
  var directionsDisplay = new google.maps.DirectionsRenderer; // traduce las coordenadas a dibujo

  document.getElementById('drawMap').addEventListener('click', function() {
    drawMap(directionsService, directionsDisplay);
  });
};
  function drawMap(directionsService, directionsDisplay) {
    var origin = inputInitial.value;
    var destination = inputArrival.value;

    if (destination !== '' && destination !== '') {
      directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
      },
      function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setMap(gMapa);
          directionsDisplay.setDirections(response);
        } else {
          window.alert('No encontramos una ruta');
        }
      });
    }
  }
  function crearMarcador(gMapa) {
        icono = {
            url: 'http://icons.iconarchive.com/icons/sonya/swarm/128/Bike-icon.png',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        };

        var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            icon: icono,
            anchorPoint: new google.maps.Point(0, -29)
        });

        return marker;
    }
