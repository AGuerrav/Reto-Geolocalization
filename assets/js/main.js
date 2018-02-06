function initMap() {
  var lab = {lat: -12.1191427,
    lng: -77.0349046};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: miUbicacion
  });
  var markLab = new google.maps.Marker({
    position: lab,
    map: map
  });
}

function findMe() {
  // verificamos si el navegador soporta la geolocalización
//   var output = document.getElementById('map');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(funExito, funError);
  }
  // primera funcion que utilizaremos como parametro para getCurrentPosition
  var latitud, longitud;
  var funExito = function(position) {
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;
  };
  var miUbicacion = new google.maps.Marker({
    position: {lat: latitud,
      lng: longitud},
    map: map
  });

  // segundo parametro para getCurrentPosition
  var funError = function(error) {
    alert('tenemos un problema para encontrar tu ubicación');
  }
}
