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
});