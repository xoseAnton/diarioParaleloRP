/*
 * Función que desactiva los campos para que no se produzcan dobles peticiones
 * @returns {undefined}
 */
function desactivarCampos(miEvento) {
    // Desactivamos los eventos sobre los botones de control
    $(".botonMenu").off("focus mouseenter focusout mouseleave");
    $("#botonMostrarMenu").off("focus mouseenter focusout mouseleave");
    $(".contenBotonActivar").off("focus mouseenter focusout mouseleave click");
    
    // Cambiamos la opacidad de los botones de administración del diario
    $(".contenBotonActivar").css("opacity", "0.2");
    $(miEvento).css("opacity", "");
    
}


function  mostrarBloqueCrearAsientos() {
    
    $("#bloqueCrearAsientos .contenZonaDatos").append(
            //-- Formulario para el envio: Añadir Asientos --
                "<form id='formularioAñadirAsientos' name='formularioAñadirAsientos'>"+
                        
                    "<div id='contenTextoDiario'>"+
                        "<label>Diario:</label>"+
                    "</div>"+
                    "<div class='contenDiario'>"+
                        "<select id='diario' name='diario' required title='Número de diario' disabled>"+                        
                        "</select>"+
                    "</div>"+
                    "<div class='contenInformeDiario'></div>"+
                    

                //-- Introducimos los datos para añadir al diario --
                    "<div id='contenIntroducirDatos'>"+
                        "<fieldset id='introducirDatosAsiento'>"+
                            "<legend>Datos para añadir al diario:</legend>"+
                            "<div id='contenNumeroAsientos'>"+
                                "<label class='textoIntroducirDatos'>Número de asientos:</label>"+
                                "<input type='number' id='numeroAsientos' name='numeroAsientos' value='1' min='1' max='9999' step='1' required onchange='calculaIntervaloAsientos()' disabled/>"+
                                "<div class='cancelarFlotantes'></div>"+
                            "</div>"+
                            "<div id='contenFechaAsientos'>"+
                                "<label class='textoIntroducirDatos'>Fecha presentacion:</label>"+
                                "<input type='date' id='fechaAsientos' name='fechaAsientos' required disabled/>"+
                                "<div class='cancelarFlotantes'></div>"+
                            "</div>"+
                        "</fieldset>"+
                    "</div>"+

                    "<div id='contenResultadoBotones' onfocus='calculaIntervaloAsientos()' onmouseover='calculaIntervaloAsientos()' >"+
                        "<div id='contenResultadosAsientos'>"+
                            "<div class='contenTextoResultadosAsientos'><label class='textoResultadosAsientos'>Se crearán los asientos números:</label></div>"+
                            "<div class='contenTextoResultadosAsientos'>"+
                                "<input type='text' id='textoAsientoInicial' name='textoAsientoInicial' value='' readonly />"+
                                "<div class='contenTextoResultadosIntermedio'><label class='textoResultadosAsientos'>al</label></div>"+
                                "<input type='text' id='textoAsientoFinal' name='textoAsientoFinal' value='' readonly />"+
                                "<div class='cancelarFlotantes'></div>"+
                            "</div>"+
                        "</div>"+
                        "<div id='contenBotonsAsientos'>"+
                            "<div id='zonaBotonGuardarAsientosID' class='zonaBotonGuardar'>"+
                                "<input type='button' id='botonGuardarAsientosID' class='botonGuardarConfirma' name='botonGuardarAsientos' value='Guardar' onclick='mostrarConfirmarCreacionAsientos()' title='Guardar los asientos nuevos en el diario'/>"+
                            "</div>"+
                            "<div id='zonaBotonCancelarAsientosID' class='zonaBotonCancelar'>"+
                                "<input type='reset' id='botonCancelarGuardarAsientosID' class='botonCerrarConfirma' name='botonCancelar' value='Cancelar' onclick='ocultarCreacionNuevosAsientos()' title='Cancelar la operación de guardar nuevos asientos'/>"+
                            "</div>"+
                            "<div class='cancelarFlotantes'></div>"+
                        "</div>"+
                    "</div>"+            
                    "<div class='cancelarFlotantes'></div>"+
                "</form>"
            //-- Fin formulario: Añadir Asientos --
            );
    
    $("#bloqueCrearAsientos").show("slow");
    
}


/*
 * Cuando la página esté preparada
 * 
 */

$(function () {
    
    // Introducimos la información del proyecto en su campo
    mostrarInformacion();

    /*
     * 
     * DEFINIMOS LOS EVENTOS:
     * 
     */
    
    /* 
     * Establecemos los eventos para los botones      
     */
    $(".botonMenu").on('focus mouseenter', function () {
        mostrarBorde(this);
    });
    $(".botonMenu").on('focusout mouseleave', function () {
        ocultarBorde(this);
    });
    
    /*
     * Eventos para mostrar/ocultar el menu de botones
     */
    $("#botonMostrarMenu").on('focus mouseenter', function () {
        $("#zonaControl").slideDown("slow"); // Muestro el menu de botones
        $("#zonaBotonMenu").slideUp("slow"); // Oculto el botón para mostrar
    });    
    
    $("#zonaControl").on('focusout mouseleave', function () {
        $("#zonaBotonMenu").slideDown("slow"); // Muestro el botón
        $("#zonaControl").slideUp("slow");  // Oculto el menu de botones
    });    
    
    
     /* 
      * Establecemos los eventos para los botones de control del diario
      * 
      */
    $(".contenBotonActivar").on('focus mouseenter', function () {
        $(this).css({
            "border": "2px solid purple",
            "border-radius": "15em",
        });
        $(this).children(".contenTextoBoton").css({
            "color": "red",
            "cursor": "default"
        });
    });
    $(".contenBotonActivar").on('focusout mouseleave', function () {
        $(this).css({
            "border": "",
            "border-radius": "",
            "color": "",
            "cursor": ""
        });
        $(this).children(".contenTextoBoton").css({
            "color": "",
            "cursor": ""
        });

    }); 
    
    
    /*
     * Establecemos el evento "click" para el botón ADMINISTRAR DIARIO
     */
    $(".contenBotonActivar").click(function (evento) {
        
        // Detenemos la acción predeterminada del evento
        evento.preventDefault();       
        
        // Recupero el ID asignado al campo seleccionado para modificar
        var miID = $(this).data("id");        
        
        // Desactivamos los campos de los demás elementos
        desactivarCampos(this);
        
        // Comprobamos que evento fué seleccionado
        if(miID == "#bloqueCrearAsientos")
            mostrarBloqueCrearAsientos();
        
        // Paramos la propagación indeseada del evento
        evento.stopPropagation();
    });
    
    /*
     * FIN DE LA DEFINICIÓN DE EVENTOS
     */
    


}); // Fin de la página preparada