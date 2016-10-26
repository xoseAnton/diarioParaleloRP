/*
 * Cuando la página este preparada
 */

// Defino el array global con los datos del Proyecto
var informeProyecto = new Array(["Realizado por: ", "Jose Antonio Mariño Outeiro"],
                                ["Para: ", "Proyecto DAW"],
                                ["Versión: ", "1.0 Diario Paralelo Registro"],
                                ["Base de datos: ", "MySQL"],
                                ["Servidor web: ", "Microsoft-IIS/8.5"],
                                ["Versión de PHP: ", "5.6"]);

var listaUsuario = new Array();

/*
 * Función para mostrar la información del Proyecto
 * @returns {undefined}
 */
function mostrarInformacion() {
    // Comprobamos que esta definido el array de datos
    if(typeof informeProyecto != "undefined") {
        // Recorro todo el array
        for(var i=0; i<informeProyecto.length; i++) {
            $("#contenedorTextoIndormacion").append("<p class='textoInformacion'><span class='textoTituloInformacion'>"+informeProyecto[i][0]+"</span>"+informeProyecto[i][1]+"</p>");
        }
    }
    else {
         $("#contenedorTextoIndormacion").html("<p class='textoInformacion'><span class='textoTituloInformacion'>Aviso: </span>Información no disponible!</p>");
    }
}

/*
 * Función que lista los usuarios activos de la base de datos
 * @returns Lista de usuarios de la base de datos
 */
function listarUsuario(miUsuario) {
    // Enviamos la solicitud ajax a la página del servidor
    $.getJSON("./miAjax/listarUsuarios.php", function (resultado){
        // Recorro todos los valores optenidos
        $.each(resultado, function (i, usuario){
            $("#usuario").append("<option value='"+usuario.id+"'>"+usuario.nombre+"</option>")
        });
    });
    
}


$(function (){
    
    // Introducimos la información del proyecto en su campo
    mostrarInformacion();
    
    // Introducimos los usuarios activos en la página
    listarUsuario("");
    
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