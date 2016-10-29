// Defino el array global con los datos del Proyecto
var informeProyecto = new Array(["Realizado por: ", "Jose Antonio Mariño Outeiro"],
                                ["Para: ", "Proyecto DAW"],
                                ["Versión: ", "1.0 Diario Paralelo Registro"],
                                ["Base de datos: ", "MySQL"],
                                ["Servidor web: ", "Microsoft-IIS/8.5"],
                                ["Versión de PHP: ", "5.6"]);

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
    
    // Animación para la zona "bloque de Información" 
    $("#botonInformacion").hover(function () { // Cuando gana el foco      
        $("#botonInformacion").css("background-color", "purple");
        $("#contenedorInformacion").fadeIn("slow"); //Aparición progresiva
    }, function () { // Cuando pierde el foco
        $("#botonInformacion").css("background-color", "");
        $("#contenedorInformacion").hide("slow"); //Desaparición con desplazamiento
    }); 
    
}

/*
 * FUNCIÓN PARA MOSTRAR EL BORDE DE UN ELEMENTO
 */
function mostrarBorde(idElemento){
    $(idElemento).css("border", "2px solid purple");
    $(idElemento).css("color", "red");
}

/*
 * FUNCIÓN PARA OCULTAR EL BORDE DE UN ELEMENTO
 */
function ocultarBorde(idElemento){
    $(idElemento).css("border", "");
    $(idElemento).css("color", "");
}