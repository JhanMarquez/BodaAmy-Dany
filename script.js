// CUENTA REGRESIVA

var fechaBoda = new Date("April 25, 2026 15:00:00").getTime();

var x = setInterval(function(){

var ahora = new Date().getTime();
var distancia = fechaBoda - ahora;

var dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
var horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
var segundos = Math.floor((distancia % (1000 * 60)) / 1000);

document.getElementById("countdown").innerHTML =
dias + " días " + horas + " hrs " + minutos + " min " + segundos + " seg";

},1000);


// FORMULARIO RSVP

document.getElementById("form").addEventListener("submit", function(e){

e.preventDefault();

document.getElementById("mensaje").innerHTML =
"¡Gracias por confirmar tu asistencia!";

});