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
function initMap() {
  var lab = {lat: -12.1191427,
    lng: -77.0349046};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: lab
  });
  var markLab = new google.maps.Marker({
    position: lab,
    map: map
  });
  var map = document.getElementById('map');
  document.getElementById('findMe').addEventListener('click', findMe);
  function findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funExito, funError);
    }
  }
  function funError() {
    alert('tenemos un problema para encontrar tu ubicación');
  }
  function funExito(respuesta) {
    // obtengo latitud y longitud de posicion actual
    var lat = respuesta.coords.latitude;
    var lon = respuesta.coords.longitude;
    // le doy mis  parametros a google ( creo objeto google latitud longitud)
    var gLatLon = new google.maps.LatLng(lat, lon);
    // creo el mapa de google con la configuracion  que yo quiera para que se renderice
    var objConfig = {
      zoom: 17,
      center: gLatLon
    };
    var gMapa = new google.maps.Map(map, objConfig);
    // creo el marcador
    var objConfigMarker = {
      position: gLatLon,
      map: gMapa,
      title: 'Usted está aquí'
    };
    var gMarker = new google.maps.Marker(objConfigMarker);
  };
};
