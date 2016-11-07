// Variable globales
var opcionesConsulta;
var asientos;

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

/*
 * Fución que valida los datos introducidos en la zona "Listar por:"
 * @returns {Boolean}
 */
function validarDatosListar(){
    // Variable de control
    var validado = true;
    // Inicializamos el array
    opcionesConsulta = new Array(); 
        
    // Definimos el array JSON con los indices
    opcionesConsulta = {diario:[], asiento:[], fecha:[], texto:[], usuario:[], fechaModifica:[], horaModifica:[], buscaCerrados:[], buscaTodos:[], buscaActivos:[]};
    
    // Valido el diario
    var miDiario = $("#diario").val();      
    if (isNaN(miDiario) || miDiario == "" || miDiario == true) {        
        validado = false;   // Cambiamos la variable de control
        // Mostramos el error            
        $("#diario").focus().after("<span class='campoError'>Diario incorrecto!</span>");       
    }
    else { //Guardamos la opción
        opcionesConsulta.diario.push({seleccionado: "si", valor: miDiario});
    }
    
    
    // Valido el asiento si esta seleccionado
    if(validado && $("#buscaPorAsiento").is(':checked')){
        // Recupero el valor introducido
        var miAsiento = $("#asiento").val();         
         if (isNaN(miAsiento) || miAsiento < 1 || miAsiento == "") {
            validado = false;   // Cambiamos la variable de control            
            // Mostramos el error            
            $("#asiento").focus().after("<span class='campoError'>Asiento incorrecto!</span>");
        }
        else {//Guardamos la opción            
            opcionesConsulta.asiento.push({seleccionado: "si", valor: miAsiento});
        }
    }
    else {//Guardamos la opción        
        opcionesConsulta.asiento.push({seleccionado: "no", valor: ""});
    }
    
    
    // Valido la fecha de asiento si esta seleccionado
    if(validado && $("#buscaPorFecha").is(':checked')){
        // Recupero el valor introducido
        var miFecha = new Date($("#fecha").val());         
         // Compruebo que el formato introducido de la fecha es correcto
        if ((miFecha.getDate()<1 || miFecha.getDate()>31) || ((miFecha.getMonth()+1)<1 || (miFecha.getMonth()+1)>12) || miFecha.getFullYear()<2016 || $("#fecha").val()=="") {
            validado = false;   // Cambiamos la variable de control            
            // Mostramos el error            
            $("#fecha").focus().after("<span class='campoError'>Fecha no valida!</span>");
        }
        else {//Guardamos la opción
            opcionesConsulta.fecha.push({seleccionado: "si", valor: $("#fecha").val()}); 
        }
    }
    else {//Guardamos la opción
        opcionesConsulta.fecha.push({seleccionado: "no", valor: ""});         
    }
    
    
    // Valido que tengamos texto de búsqueda
    if(validado && $("#buscaPorTexto").is(':checked')){
        // Recupero el valor introducido
        var miTexto = new String($("#textoBusca").val());
        
        /* Expresión regular para encontrar espacios en blanco: (uno o más) */
        var cadena = /^\s+$/;
        // Compruebo la expresión. Coincide = true
        var compruebo = miTexto.match(cadena) ? true : false;
        
         // Compruebo si no está vacío
        if (miTexto.length == 0 || miTexto == null || compruebo) {
            validado = false;   // Cambiamos la variable de control            
            // Mostramos el error            
            $("#textoBusca").focus().after("<span class='campoError'>Introduce algún texto!</span>");
        }
        else {//Guardamos la opción            
            opcionesConsulta.texto.push({seleccionado: "si", valor: miTexto});
        }
    }
    else {//Guardamos la opción
        opcionesConsulta.texto.push({seleccionado: "no", valor: ""});        
    }
    
    
    // Valido que tengamos texto, usuarios, en el campo "asignado"
    if(validado && $("#buscaPorUsuario").is(':checked')){
        // Recupero el valor introducido
        var miUsuario = new String($("#usuario").val());
        
        /* Expresión regular para encontrar espacios en blanco: (uno o más) */
        var cadena = /^\s+$/;
        // Compruebo la expresión. Coincide = true
        var compruebo = miUsuario.match(cadena) ? true : false;
        
         // Compruebo si no está vacío
        if (miUsuario.length == 0 || miUsuario == null || compruebo) {
            validado = false;   // Cambiamos la variable de control            
            // Mostramos el error            
            $("#usuario").focus().after("<span class='campoError'>No existe usuario!</span>");
        }
        else {//Guardamos la opción
            opcionesConsulta.usuario.push({seleccionado: "si", valor: miUsuario});            
        }
    }
    else {//Guardamos la opción
        opcionesConsulta.usuario.push({seleccionado: "no", valor: ""});
    }
    
    
    // Valido la fecha y hora de modificación introducida
    if(validado && $("#buscaPorFechaModifica").is(':checked')){
        // Recupero el valor introducido
        var miFecha = new Date($("#fechaModifica").val());                 
        
         // Compruebo que el formato introducido de la fecha es correcto
        if ((miFecha.getDate()<1 || miFecha.getDate()>31) || ((miFecha.getMonth()+1)<1 || (miFecha.getMonth()+1)>12) || miFecha.getFullYear()<2016 || $("#fechaModifica").val()=="") {
            validado = false;   // Cambiamos la variable de control            
            // Mostramos el error            
            $("#fechaModifica").focus().after("<span class='campoError'>Fecha no valida!</span>");
        }
        else { // Compruebo la hora
            // Recupero el valor introducido
            var horaMinutos = $("#horaModifica").val();
            if (horaMinutos == "") {
                validado = false;   // Cambiamos la variable de control
                // Mostramos el error            
                $("#horaModifica").focus().after("<span class='campoError'>Hora no valida!</span>");
            }
            else { // Compruebo que la hora introducida esté en los intervalos                
                var datosHora = horaMinutos.split(":");
                // Convierto a entero los datos optenidos
                var miHora = parseInt(datosHora[0]);
                var miMinuto = parseInt(datosHora[1]);                
                
                if ((miHora < 0 || miHora > 23) || (miMinuto < 0 || miMinuto > 59)) {
                    validado = false;   // Cambiamos la variable de control
                    // Mostramos el error            
                    $("#horaModifica").focus().after("<span class='campoError'>Fecha no valida!</span>");
                }
                else {//Guardamos la opción
                    opcionesConsulta.fechaModifica.push({seleccionado: "si", valor: $("#fechaModifica").val()}); 
                    opcionesConsulta.horaModifica.push({seleccionado: "si", valor: horaMinutos});                                         
                }
            }
        }
    }
    else {
        //Guardamos la opción
        opcionesConsulta.fechaModifica.push({seleccionado: "no", valor: ""}); 
        opcionesConsulta.horaModifica.push({seleccionado: "no", valor: ""});
    }
    
    // Busca por asientos ACTIVOS/CERRADOS/TODOS
    if ($("#buscaCerrados").is(':checked')) { // Asientos cerrados
        opcionesConsulta.buscaCerrados.push({seleccionado: "si", valor: ""});
        opcionesConsulta.buscaTodos.push({seleccionado: "no", valor: ""});
        opcionesConsulta.buscaActivos.push({seleccionado: "no", valor: ""});
    } else if ($("#buscaTodos").is(':checked')) { // Todos los asientos
        opcionesConsulta.buscaTodos.push({seleccionado: "si", valor: ""});
        opcionesConsulta.buscaCerrados.push({seleccionado: "no", valor: ""});
        opcionesConsulta.buscaActivos.push({seleccionado: "no", valor: ""});
    } else { // Por defecto buscamos los asientos activos
        opcionesConsulta.buscaActivos.push({seleccionado: "si", valor: ""});
        opcionesConsulta.buscaCerrados.push({seleccionado: "no", valor: ""});
        opcionesConsulta.buscaTodos.push({seleccionado: "no", valor: ""});
    }
    
    // Devolvemos el resultado
    if(validado){
        return validado;
    }
    else {
        // Ocultamos los errores pasados 3 segundos.
        setTimeout("$('.campoError').hide('slow');", 3000);       
    }
}

/*
 * Función para consultar en la base de datos los datos de los asientos.
 * @param {type} consulta
 * @returns {Muestra la informacion de los asientos según la consulta}
 */

function listarAsientos(consulta){     
    $.ajax({
        url: "./miAjax/listarAsientos.php",
        type: 'POST',
        dataType: 'json',
        data: {opciones: consulta}
    }).done(function (asientos){                
        // Calculo el número de elementos recibido
        var numeroAsientos = Object.keys(asientos).length;

        if (numeroAsientos == 0) {
            $("#zonaRelacionAsientos").append(
                // Zona para mostrar que no existen datos -->
                "<div id='zonaNoDatos'>"+
                    "<div id='textoNoDatos'>¡NO EXISTEN DATOS PARA ESTA CONSULTA!</div>"+
                "</div>"                
                );

        } else {

            /*
             * Para el caso en que se consiga respuesta de la página php, recorremos todo el array
             * y mostramos la información de cada asiento
             * @type listarAsientos.operacionesAsientoDiarioJS_L231.asientos
             */
            for (var i in asientos) {
                // Recuperamos los datos
                var fechaAsiento = new Date(asientos[i].fecha);
                var formatoFechaAsiento = fechaAsiento.getDate() + " / " + (fechaAsiento.getMonth() + 1) + " / " + fechaAsiento.getFullYear();
                var condicionCerrado = ""
                // Comprobamos si está cerrado el asiento
                if (asientos[i].cerrado == 1)
                    condicionCerrado = "checked />";
                else
                    condicionCerrado = "/>"; 
            
                // Incluimos un nuevo asiento en su contenedor
                $("#zonaRelacionAsientos").append(                        

                        //MOSTRAMOS UN ASIENTO
                    "<div class='asiento'>"+
                        "<form id='formularioID"+ i +"' name='formularioID'>"+
                            "<div class='contenAsiento'>"+
                                "<label class='mostraAsiento' data-asiento='"+asientos[i].asiento+"' data-diario='"+asientos[i].diario+"' title='Número de asiento'>"+ asientos[i].asiento+"</label>"+
                            "</div>"+
                            "<div class='contenBotons'>"+
                                "<div class='contenBotonsArriba'>"+
                                    "<input type='submit' class='botonAbrir' name='botonAbrir' value='' title='Apertura de los datos del asiento para poder modificar' />"+                                    
                                "</div>"+
                                "<div class='contenBotonsBaixo'>"+
                                    "<input type='submit' class='botonDetalle' name='botonDetalle' value='' title='Informacion detallada del asiento' />"+
                                "</div>"+
                            "</div>"+

                            "<div class='contenDatos'>"+
                                "<div class='contenDatosSuperior'>"+
                                    "<div class='contenFecha'>"+                                        
                                        "<label class='mostrarTitulo'>Fecha:</label><label class='mostrarFecha' data-fechaAsiento='"+asientos[i].fecha+"' title='Fecha presentación del asiento'>"+formatoFechaAsiento+"</label>"+                                        
                                    "</div>"+
                                    "<div class='contenSituacion'>"+
                                        "<label class='mostrarTitulo'>Situación:</label>"+
                                        "<input type='text' class='textoSituacion' name='textoSituacion' value='"+asientos[i].situacion+"' readonly title='Texto sobre la situación del asiento'/>"+
                                    "</div>"+
                                    "<div class='cancelarFlotantes'></div>"+
                                "</div>"+
                                "<div class='contenDatosInferior'>"+

                                    "<div class='contenAsignado'>"+                                        
                                        "<label class='mostrarTitulo'>Asignado:</label>"+
                                        "<input type='text' class='asignado' name='asignado' value='"+asientos[i].asignado+"' readonly title='Persona que despacha el asiento'/>"+                                        
                                        "<div class='contenBotonAsignado'>"+
                                            "<input type='button' class='botonAsignado' name='escogeAsignado' value='' disabled title='Cambia la persona que despacha el asiento' />"+
                                        "</div>"+
                                    "</div>"+

                                    "<div class='contenIncidencia'>"+
                                        "<label class='mostrarTitulo'>Incidencia:</label>"+
                                        "<input type='text' class='textoIncidencia' name='textoIncidencia' readonly value='"+asientos[i].incidencia+"' title='Texto sobre las incidencias del asiento' />"+
                                    "</div>"+

                                    "<div class='contenOtros'>"+
                                        "<label class='mostrarTitulo'>Otros:</label>"+
                                        "<input type='text' class='textoOtros' name='textoOtros' readonly value='"+asientos[i].otroTexto+"' title='Texto para otras incidencias'/>"+
                                    "</div>"+

                                    "<div class='contenActivos'>"+
                                        "<label class='mostrarTitulo'>Activo:</label>"+
                                        "<input type='checkbox' class='checkActivo' name='checkActivo' disabled title='Asiento abierto o cerrado' "+ condicionCerrado +
                                    "</div>"+

                                    "<div class='cancelarFlotantes'></div>"+
                                "</div>"+
                            "</div>"+
                            "<div class='cancelarFlotantes'></div>"+
                        "</form>"+
                    "</div>"                            
                );
           };     
       }
           
           
    }).fail(function() {
        alert("FALLO LA RESPUESTA");
    }).always(function (){
        // FALTA CODIGO
    });      
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
    $(".botonMenu").on('focus mouseenter', function () {
        mostrarBorde(this);
    });
    $(".botonMenu").on('focusout mouseleave', function () {
        ocultarBorde(this);
    });
    
    
    /* 
      * Establecemos los eventos para los botones:
      * Modificar asientos e informe asientos
      */
    $("#zonaRelacionAsientos").on('focus mouseenter', ".botonAbrir, .botonDetalle", function () {
        $(this).css("padding", "15px");
    });
    $("#zonaRelacionAsientos").on('focusout mouseleave', ".botonAbrir, .botonDetalle", function () {
        $(this).css("padding", "");
    });
    
    
    /* 
      * Establecemos los eventos de los campos de selección de busqueda
      */    
     $(".contenedorBusqueda").on('focus mouseenter', '*', function() {
        mostrarBordeContenBusqueda(this);
    });
    $(".contenedorBusqueda").on('focusout mouseleave', '*', function() {
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
       
       // Borramos los posibles datos de otras consultas
       $(".asiento").remove();
       
       // Borramos el posible mensaje de NO DATOS de consultas anteriores
       $("#zonaNoDatos").remove();
       
       // Validamos los datos introducidos
       if(validarDatosListar()) {          
            // Realizamos la consulta                   
            listarAsientos(opcionesConsulta);
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