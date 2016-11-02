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
        var contenedor = $(this).data("contenedor");
       if($(this).is(':checked')){
           if($(this).attr('type') == 'radio') {               
              // Ponemos todos los elementos tipo "radio" como no seleccionados
              $("#buscaEstadoActivo, #buscaEstadoCerrado, #buscaEstadoTodos").css("background-color", "#eee");
              // Ponemos el elemento tipo "radio" como seleccionado
              $(contenedor).css("background-color", "#93C572");              
           }
            else {
                var elemento = JSON.parse('['+$(this).data("controla")+']');                
                $(contenedor).css("background-color", "#93C572");
                // Recorremos todos los elementos por si tenemos más de uno               
                for (i in elemento) {
                    $(elemento[i]).attr("disabled", false);
                    $(elemento[i]).css("background-color", "white");
                    $(elemento[i]).attr("required", true);
                }
            }
       }
       else {
            var elemento = JSON.parse('['+$(this).data("controla")+']');
            $(contenedor).css("background-color", "#eee");
            // Recorremos todos los elementos por si tenemos más de uno               
            for (i in elemento) {                
                $(elemento[i]).attr("disabled", true);
                $(elemento[i]).attr("required", false);
                $(elemento[i]).css("background-color", "");
            }
       }
    });
    
});