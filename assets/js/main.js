function findMe() {
  // verificamos si el navegador soporta la geolocalización
  var output = document.getElementById('map');
  if (navigator.geolocation) {
    output.innerHTML = '<p>tu navegador soporta Geolocalización</p>';
  } else {
    output.innerHTML = '<p>tu navegador no soporta Geolocalización</p>';
  }
  // primera funcion que utilizaremos como parametro para getCurrentPosition
  function localization(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitud : ' + latitude + '<br>Longitud : ' + longitude + '</p>';
  }
  // segundo parametro para getCurrentPosition
  function error() {
    output.innerHTML = '<p>no se pudo obtener tu geolocalización</p>';
  }
  navigator.geolocation.getCurrentPosition(localization, error);
}
