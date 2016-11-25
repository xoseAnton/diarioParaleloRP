// Variable globales
var listaDiarios;
var datosGrabar; // Contienen los datos que se quieren modificar



/*
 * Establece los eventos de foco para los botones de la página
 * @returns {undefined}
 */
function establecerEventosPagina(){
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
        if (miID == "#bloqueCrearAsientos")
            mostrarBloqueCrearAsientos();

        // Paramos la propagación indeseada del evento
        evento.stopPropagation();
    });    
}


/*
 * Función que desactiva los campos para que no se produzcan dobles peticiones
 * @returns {undefined}
 */
function desactivarCampos(miEvento) {
    // Desactivamos los eventos sobre los botones de control
    $(".botonMenu").off("focus mouseenter focusout mouseleave");
    $("#botonMostrarMenu").off("focus mouseenter focusout mouseleave");
    $("#zonaControl").off("focus mouseenter focusout mouseleave");
    $(".contenBotonActivar").off("focus mouseenter focusout mouseleave click");
    
    // Cambiamos la opacidad de los botones de administración del diario
    $(".contenBotonActivar").css("opacity", "0.2");
    $(miEvento).css("opacity", "");
    
}


/*
 * Función que activa los campos para poder acceder al menú de administración diario
 * @returns {undefined}
 */
function activarCampos() {    
    // Establecemos los eventos
    establecerEventosPagina();    
    
    // Cambiamos las propiedades del elemento a las iniciales    
    $(".contenBotonActivar").css({
        "opacity": "",
        "border": "",
        "border-radius": "",
        "color": "",
        "cursor": ""
    });
    $(".contenTextoBoton").css({
        "color": "",
        "cursor": ""
    });    
}


/*
 * Función para incluir dos digitos en el dia y fecha
 * @param {type} dato
 * @returns {listarAsientos.operacionesAsientoDiarioJS_L251.digitosFecha.digito|String}
 */
function digitosFecha(datoFecha) {
    var digitos = new String(datoFecha);
    if (digitos.length < 2)
        digitos = '0' + datoFecha;
    return digitos;
}


function mostraCampoConfirmacion(miID, texto){
    $(miID + " .contenConfirmacion").empty().append(            
            "<div class='zonaConfirmacion'>"+
                "<div class='zonaConfirmacion1'></div>"+
                "<div class='zonaConfirmacion2'>"+
                    "<div class='zonaTextoConfirmacion'>"+
                        "<input type='text' class='textoConfir' name='textoConfir' value='"+texto+"' readonly />"+
                    "</div>"+
                    "<div class='zonaBotonesConfirmacion'>"+
                        "<div class='zonaBotonGuardarConfirmacion'>"+
                            "<input type='button' class='botonConfirmaGrabar' name='botonGuardar' data-id='" + miID + "' value='Si' title='Guardar los datos'/>"+
                        "</div>"+
                        "<div class='zonaBotonCancelarConfirmacion'>"+
                            "<input type='button' class='botonConfirmaCerrar' name='botonCancelar' data-id='" + miID + "' value='No' title='Cancelar grabación de los datos' />"+
                        "</div>"+
                        "<div class='cancelarFlotantes'></div>"+
                    "</div>"+
                    "<div class='cancelarFlotantes'></div>"+
                "</div>"+
            "</div>");
    // Ocultamos los datos
    $(miID + " .contenZonaDatos").css("display", "none");
    // Mostramos la confirmación
    $(miID + " .contenConfirmacion").css("display", "block");
}

function mostrarCampoResultadoGrabar(resultado, miID,texto) {
    
    // Cargamos el campo que contiene el texto
    $(miID + " .zonaConfirmacion").empty().append("<input type='text' class='textoExitoGrabar' name='textoExitoGrabar' value='" + texto + "' readonly />");
    
    // Compruebo que tivo de resultado muestro
    if (resultado == "correcto") {
        $(miID + " .zonaConfirmacion").css({
            "background-color": "green",
            "border-color": "purple"
        });
    }
    if (resultado == "error") {
        $(miID + " .zonaConfirmacion").css("background-color", "#ffff00");
        $(miID + " .textoExitoGrabar").css({
            "background-color": "#ffff00",
            "color": "red"
        });
    }
    
    
    // Mostramos el resultado
    $(miID + " .contenConfirmacion").css("display", "block");
    
    // Ocultamos los errores pasados 3 segundos.
    setTimeout(function (){
        $(miID + " .contenConfirmacion").empty().css("display", "none");
        activarCampos();
        $(".bloqueAdministrar").css("display", "");
        $(miID + " .contenZonaDatos").css("display", "");            
    }, 3000);
}

/*
 * Función para mostrar los datos de un DIARIO SELECCIONADO
 * @param {type} id
 * @returns {undefined}
 */
function mostrarDatosDiario(id) {
    
    // Recuperamos los datos:
    var fechaAsiento = new Date(listaDiarios[id].fechaAsiento);

    var formatoFechaAsiento = digitosFecha(fechaAsiento.getDate()) + " / " + digitosFecha((fechaAsiento.getMonth() + 1)) + " / " + fechaAsiento.getFullYear();
    
    //Vaciamos la información anterior y cargamos la nueva
    $("#bloqueCrearAsientos .contenInformeDiario").empty().append(
            
            "<div class='contenDatosInforme'>"+
                "<div class='datosInformeDiario'>"+
                    "<label class='tituloDatosInforme'>Diario: </label>"+
                    "<input type='text' class='textoNumeroAsientosDiario' name='textoNumeroDiario' value='"+listaDiarios[id].diario+"' readonly/>"+
                "</div>"+
                "<div class='datosInformeDiario'>"+
                    "<label class='tituloDatosInforme'>Último asiento: </label>"+
                    "<input type='text' class='textoNumeroAsientosDiario' name='totalAsientosDiario' value='"+listaDiarios[id].asientos+"' readonly/>"+
                "</div>"+
                "<div class='datosInformeDiario'>"+                        
                    "<label class='tituloDatosInforme'>Fecha: </label><label class='textoDatosInforme'>"+formatoFechaAsiento+"</label>"+
                "</div>"+
            "</div>"
            );
}

function mostrarInicialFinalAsientos(id, nAsientos){
    
    /* Comprobamos si introducimos un número para realizar el calculo de asientos
    * que se crearán
    */
    if (isNaN(nAsientos) || nAsientos < 1 || nAsientos == "") {
        // Eliminamos los resultados
        $("#textoAsientoInicial").val("");
        $("#textoAsientoFinal").val("");
    } else {
        var primerAsiento = parseInt(listaDiarios[id].asientos) + 1;
        var ultimoAsiento = parseInt(listaDiarios[id].asientos) + nAsientos;

        // Mostramos los valores en los campos correspondientes
        $("#textoAsientoInicial").val(primerAsiento);
        $("#textoAsientoFinal").val(ultimoAsiento);

    }
}


/*
 * Función para mostrar datos en el campo ADMINISTRAR-CREAR ASIENTOS
 * 
 */

function  mostrarBloqueCrearAsientos() {
    
    // Recuperamos la lista de diarios
    $.ajax({
        url: "./miAjax/listarDiarios.php",
        type: 'POST',
        dataType: 'json',        
    }).done(function (diarios){        
        // Guardamos en la variable golbal
        listaDiarios = diarios;
        
        // Borramos los datos anteriores
        $("#bloqueCrearAsientos #diario").empty();
        
        // Recorremos todos los diarios
        for (var i in diarios) {            
            // Solo introducimos los diarios activos
            if(diarios[i].cerrado == 1)
                $("#bloqueCrearAsientos #diario").append("<option value='" + i + "'>" + diarios[i].diario + "</option>");
        }
        
        // Mostramos los datos del primer diario seleccionado
        mostrarDatosDiario(0);
        
        // Recuperamos el valor del número de asientos que se quiere crear
        var nAsientos = parseInt($("#numeroAsientos").val());
        
        // Mostramos los datos de los asientos que se crearan
        mostrarInicialFinalAsientos(0, nAsientos);        
        
    }).fail(function() {
         alert("No su pudo listar los DIARIOS de la base de datos!");
    }).always(function (){
        // FALTA CODIGO
    });
    
    $("#bloqueCrearAsientos").show("slow");
}


function  validarDatosNuevosAsientos(miID) {
    // Variable de control
    var validado = true;
    // Inicializamos el array
    datosGrabar = new Array(); 
    
    /*
     * VALIDO LOS DATOS INTRODUCIDOS
     * @type jQuery
     */
    
    var idDiario = $(miID + " #diario").val(); 
    // Valido el número de Diario
    var miDiario = parseInt(listaDiarios[idDiario].diario);    
    if (isNaN(miDiario) || miDiario == "" || miDiario < 1) {
        validado = false;   // Cambiamos la variable de control
        // Mostramos el error            
        $(miID + " #diario").focus().after("<span class='campoError'>Número incorrecto!</span>");
    }  
    
    var nAsientos = $(miID + " #numeroAsientos").val(); 
    // Valido el número de Asientos    
    if (isNaN(nAsientos) || nAsientos == "" || nAsientos < 1) {
        validado = false;   // Cambiamos la variable de control
        // Mostramos el error            
        $(miID + " #numeroAsientos").focus().after("<span class='campoError'>Número incorrecto!</span>");
    }  
    
    // Recupero el valor introducido
    var miFecha = new Date($(miID + " #fechaAsientos").val());
    
    // Compruebo que el formato introducido de la fecha es correcto
    if (validado && ((miFecha.getDate() < 1 || miFecha.getDate() > 31) || ((miFecha.getMonth() + 1) < 1 || (miFecha.getMonth() + 1) > 12) || miFecha.getFullYear() < 2016 || $(miID + " #fechaAsientos").val() == "")) {
        validado = false;   // Cambiamos la variable de control            
        // Mostramos el error            
        $(miID + " #fechaAsientos").focus().after("<span class='campoError'>Fecha no valida!</span>");
    } else {
        // Comprobamos que la fecha ahora introducida es mayor o igual que la del último asiento grabado
        var fechaUltimoAsiento = new Date(listaDiarios[idDiario].fechaAsiento);
        if (miFecha < fechaUltimoAsiento) {
            validado = false;   // Cambiamos la variable de control            
            // Mostramos el error            
            $(miID + " #fechaAsientos").focus().after("<span class='campoError'>Fecha no valida!</span>");
        }
    }
    
     // Devolvemos el resultado
    if(validado){        
        datosGrabar = {idDiario: listaDiarios[idDiario].id, diario: miDiario, ultimoAsiento: listaDiarios[idDiario].asientos, nAsientos: nAsientos , fechaAsiento: $(miID + " #fechaAsientos").val()};        
        return validado;
    }
    else {
        // Ocultamos los errores pasados 3 segundos.
        setTimeout("$('.campoError').hide('slow');", 3000);       
    }
    
}


function crearNuevosAsientos(miID){
    $.ajax({
        url: "./miAjax/grabarNuevosAsientos.php",
        type: 'POST',
        dataType: 'json',
        data: {datos: datosGrabar}
    }).done(function (resultado){
        
        if (resultado[0].noGrabados == 0 && resultado[0].grabadoDiario == true) {
            var texto = "¡ Creados correctamente: " + datosGrabar.nAsientos + " asientos en el diario: " + datosGrabar.diario + " !";
            mostrarCampoResultadoGrabar("correcto", miID, texto);
        } else {
            var texto = "¡ Error al crear los asientos en el diario: " + datosGrabar.diario + " (ver acciones) !";
            mostrarCampoResultadoGrabar("error", miID, texto);
        }                
    }).fail(function() {
         alert("No su pudo grabar los nuevos asientos!");
    }).always(function (){
        // FALTA CODIGO
    });
    
    
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
    
    establecerEventosPagina();
    
    /*
     * Establecemos el evento para el boton diario de ADMINISTRAR ASIENTOS
     */
    $("#bloqueCrearAsientos #diario, #bloqueCrearAsientos #numeroAsientos").on('change keyup', function(){
        // Recuperamos la posición del diario seleccionado en el array de diarios
        var idDiario = $("#bloqueCrearAsientos #diario").val();        
        
        // Mostramos los datos del diario seleccionado
        mostrarDatosDiario(idDiario);
        
        // Recuperamos el valor del número de asientos que se quiere crear
        var nAsientos = parseInt($("#numeroAsientos").val());
        
        // Mostramos los datos de los asientos que se crearan
        mostrarInicialFinalAsientos(idDiario, nAsientos);        
        
    });
    
    
    /* 
     * Establecemos los eventos para los botones:
     * GUARDAR/CANCELAR las modificaciones      
     */
    $(".botonGuardarConfirma, .botonCerrarConfirma").on('focus mouseenter', function () {
        mostrarBorde(this);
    });
    $(".botonGuardarConfirma, .botonCerrarConfirma").on('focusout mouseleave', function () {
        ocultarBorde(this);
    });
    
    $(".botonCerrarConfirma").click(function () {         
        // Desactivamos los campos de los demás elementos
        activarCampos();        
        // Ocultamos
        $(".bloqueAdministrar").css("display", "");    
    });
    
    $(".botonGuardarConfirma").click(function (evento) {
        // Detenemos la acción predeterminada del evento
        evento.preventDefault();
        
        // Borramos las posibles notificaciones de errores existentes
        $(".campoError").remove();
        
        // Recupero el ID asignado al campo seleccionado para modificar
        var miID = $(this).data("id");
        
        // Comprobamos que evento fué seleccionado
        if (miID == "#bloqueCrearAsientos") {
            if (validarDatosNuevosAsientos(miID)) {
                // Formo el texto para mostrar en el campo confirmación
                var asientoInicial = $(miID + " #textoAsientoInicial").val();
                var asientoFinal = $(miID + " #textoAsientoFinal").val();
                var miFecha = new Date($(miID + " #fechaAsientos").val());
                var formatoFechaAsientos = digitosFecha(miFecha.getDate()) + "/" + digitosFecha((miFecha.getMonth() + 1)) + "/" + miFecha.getFullYear();
                var idDiario = $(miID + " #diario").val();                 
                var miDiario = listaDiarios[idDiario].diario;    
                
                var texto = "Crear asientos Nº: " + asientoInicial + " al " + asientoFinal + " con fecha: " + formatoFechaAsientos + " en diario: " + miDiario + " ?";
                mostraCampoConfirmacion(miID, texto);
            }
        }
        
        // Paramos la propagación indeseada del evento
        evento.stopPropagation();
    });
    
    
    // Eventos para los botones GRABAR/CANCELAR nuevos datos
    $(".contenConfirmacion").on('focus mouseenter', ".botonConfirmaGrabar, .botonConfirmaCerrar", function () {
        $(this).css("border-color", "red");
        $(this).css("color", "red");
    });
    $(".contenConfirmacion").on('focusout mouseleave', ".botonConfirmaGrabar, .botonConfirmaCerrar", function () {
        $(this).css("border-color", "");
        $(this).css("color", "");
    });    
    
    $(".contenConfirmacion").on('click', ".botonConfirmaCerrar", function () {
        // Recupero el ID asignado al campo seleccionado para modificar
        var miID = $(this).data("id");
        
        // Comprobamos que evento fué seleccionado
        if (miID == "#bloqueCrearAsientos") {
            //Oculto y vacío el campo de confirmación
            $(miID + " .contenConfirmacion").empty().css("display", "none");
            // Mostramos los datos nuevamente
            $(miID + " .contenZonaDatos").css("display", "block");
        }
        
    });
    
    $(".contenConfirmacion").on('click', ".botonConfirmaGrabar", function () {
        // Recupero el ID asignado al campo seleccionado para modificar
        var miID = $(this).data("id");
        
        // Ocultamos el campo de confirmación
        $(miID + " .contenConfirmacion").css("display", "none");
        
        // Comprobamos que evento fué seleccionado
        if (miID == "#bloqueCrearAsientos") {
            // Grabo los datos correspondientes
            crearNuevosAsientos(miID);
        }
        
    });
    
    
    
    
    /*
     * FIN DE LA DEFINICIÓN DE EVENTOS
     */
    


}); // Fin de la página preparada