/*
 * Cuando la página este preparada
 */

$(function (){
   // Animación para la zona "bloque de Información" 
   $("#botonInformacion").hover(function (){ // Cuando gana el foco
      $("#botonInformacion").css("background-color", "purple");
      $("#contenedorInformacion").fadeIn("slow"); //Aparición progresiva
   }, function (){ // Cuando pierde el foco
       $("#botonInformacion").css("background-color", "");
      $("#contenedorInformacion").hide("slow"); //Desaparición con desplazamiento
   });  
});


/*
 * Función para desplazar elemento
 */
function desplaza(idElemento) {
    $(idElemento).show(800);
}

/*
 * Función para ocultar errores
 */
function ocultarErrores(idElemento) {
    // Desaparición progresiva-rapida
    $(idElemento).fadeOut("fast");
}