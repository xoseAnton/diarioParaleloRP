/*
 * Función introduce los usuarios activos definidos en la base de datos
 * en un "select". Si estamos identificados selecciona por defecto el usuario.
 * @returns Lista de usuarios de la base de datos
 */
function listarUsuarios() {
    // Enviamos la solicitud ajax a la página del servidor
    $.getJSON("./miAjax/listarUsuarios.php", function (resultado) {
        // Recorro todos los valores optenidos
        $.each(resultado, function (i, usuario) {
            if(usuario.porDefecto == true)
                $("#usuario").append("<option value='" + usuario.nombre + "' selected='true'>" + usuario.nombre + "</option>");
            else
                $("#usuario").append("<option value='" + usuario.nombre + "'>" + usuario.nombre + "</option>");
        });
    });
}


/*
 * Función introduce los diarios activos definidos en la base de datos
 * en un "select". Selecciona por defecto el último diario.
 * @returns Lista de los diarios activos de la base de datos.
 */
function listarDiarios() {
    // Enviamos la solicitud ajax a la página del servidor
    $.getJSON("./miAjax/listarDiarios.php", function (resultado) {
        // Recorro todos los valores optenidos
        $.each(resultado, function (i, miDiario) {
            if(miDiario.cerrado == 1)
                $("#diario").append("<option value='" + miDiario.diario + "'>" + miDiario.diario + "</option>");
        });
    });
}

function validarDatosListar(){
    // Variable de control
    var validado = true;
    
    // Valido el diario
    var miDiario = $("#diario").val();      
    if (isNaN(miDiario) || miDiario == "" || miDiario == true) {        
        validado = false;   // Cambiamos la variable de control
        // Mostramos el error            
        $("#diario").focus().after("<span class='campoError'>Diario incorrecto!</span>");       
    }
    
    // Valido el asiento si esta seleccionado
    if(validado && $("#buscaPorAsiento").is(':checked')){
        var miAsiento = $("#asiento").val();         
         if (isNaN(miAsiento) || miAsiento < 1 || miAsiento == "") {
            validado = false;   // Cambiamos la variable de control            
            // Mostramos el error            
            $("#asiento").focus().after("<span class='campoError'>Asiento incorrecto!</span>");
        }
    }
    
    // Valido la fecha de asiento si esta seleccionado
    if(validado && $("#buscaPorFecha").is(':checked')){
        var miFecha = new Date($("#fecha").val());         
         // Compruebo que el formato introducido de la fecha es correcto
        if ((miFecha.getDate()<1 || miFecha.getDate()>31) || ((miFecha.getMonth()+1)<1 || (miFecha.getMonth()+1)>12) || miFecha.getFullYear()<2016 || $("#fecha").val()=="") {
            validado = false;   // Cambiamos la variable de control            
            // Mostramos el error            
            $("#fecha").focus().after("<span class='campoError'>Fecha no valida!</span>");
        }
    }
    
    // Devolvemos el resultado
    if(validado){
        return validado;
    }
    else {
        // Lo ocultamos pasados 3 segundos, y lo borramos
        setTimeout("$('.campoError').hide('slow');", 3000);       
    }
}


/*
 * Cuando la página esté preparada
 * @returns {undefined}
 */

$(function() {
    // Introducimos la información del proyecto en su campo
    mostrarInformacion();
    
     /* 
      * Establecemos los eventos para los botones      
      */
    $(".botonMenu").on('focus', function () {
        mostrarBorde(this);
    });
    $(".botonMenu").on('focusout', function () {
        ocultarBorde(this);
    });
    $(".botonMenu").hover( function () {
        mostrarBorde(this);
    }, function () {
        ocultarBorde(this);
    });
    
    /* 
      * Establecemos los eventos de los campos de selección de busqueda
      */    
     $(".contenedorBusqueda").on('focus', '*', function() {
        mostrarBordeContenBusqueda(this);
    });
    $(".contenedorBusqueda").on('focusout', '*', function() {
        ocultarBordeContenBusqueda(this);
    });
    $(".contenedorBusqueda").hover( function() {
        mostrarBordeContenBusqueda(this);
    }, function() {
        ocultarBordeContenBusqueda(this);
    });
    
    /*
     * Establecemos el evento "click" para el "checkbox" de las zonas de busqueda
     */
    $(".checkBusqueda").click(function (){
       // Recupero la información del contenedor 
       var contenedor = $(this).data("contenedor");
       // Compruebo si está seleccionado
       if($(this).is(':checked')){
           if($(this).attr('type') == 'radio') { // Para el caso de que el selector sea de tipo "radio"              
              // Ponemos todos los elementos tipo "radio" como no seleccionados
              $("#buscaEstadoActivo, #buscaEstadoCerrado, #buscaEstadoTodos").css("background-color", "#eee");
              // Ponemos el elemento tipo "radio" como seleccionado
              $(contenedor).css("background-color", "#93C572");              
           }
            else {
                // Recupero los elementos que controla el check.
                var elemento = JSON.parse('['+$(this).data("controla")+']');                
                $(contenedor).css("background-color", "#93C572");
                // Recorremos todos los elementos por si tenemos más de uno               
                for (i in elemento) {
                    $(elemento[i]).attr("disabled", false);
                    $(elemento[i]).css("background-color", "white");
                }
            }
       }
       else { // Si el elemento no está seleccionado los deshabilito
            // Recupero los elementos que controla el check.
            var elemento = JSON.parse('['+$(this).data("controla")+']');
            $(contenedor).css("background-color", "#eee");
            // Recorremos todos los elementos por si tenemos más de uno               
            for (i in elemento) {                
                $(elemento[i]).attr("disabled", true);                
                $(elemento[i]).css("background-color", "");
            }
       }
    });
    
    /*
     * Establecemos el evento "click" para el botón listar
     */
    $("#listar").click( function(evento){
       // Detenemos la acción del botón input
       evento.preventDefault();
       // Borramos las posibles notificaciones de errores existentes
       $(".campoError").remove();
       // Validamos los datos introducidos
       if(validarDatosListar()) {
           
           
       }
       
   });
    
});

// Cunado la página esta cargada
$(document).ready(function (){
    // Cargamos los usuarios
    listarUsuarios();
    // Cargamos los diarios
    listarDiarios();
});