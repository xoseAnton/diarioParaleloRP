// Variable globales
var opcionesConsulta;

// Objeto para las obciones de consulta
function PreferenciaConsulta(consultaPor, seleccionado, valor) {
    this.consultaPor = consultaPor;
    this.seleccionado = seleccionado;
    this.valor = valor;
}

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
    // Array que contendrá los objetos de la consulta
    opcionesConsulta = new Array();
    
    
    // Valido el diario
    var miDiario = $("#diario").val();      
    if (isNaN(miDiario) || miDiario == "" || miDiario == true) {        
        validado = false;   // Cambiamos la variable de control
        // Mostramos el error            
        $("#diario").focus().after("<span class='campoError'>Diario incorrecto!</span>");       
    }
    else { //Guardamos la opción como un nuevo objeto en el final del array
        opcionesConsulta["diario"] = new PreferenciaConsulta("diario", true, miDiario);
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
        else {//Guardamos la opción como un nuevo objeto en el final del array
            opcionesConsulta["asiento"]=new PreferenciaConsulta("asiento", true, miAsiento);
        }
    }
    else {//Guardamos la opción como un nuevo objeto en el final del array
        opcionesConsulta["asiento"]=new PreferenciaConsulta("asiento", false, "");  
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
        else {//Guardamos la opción como un nuevo objeto en el final del array
            opcionesConsulta["fecha"]= new PreferenciaConsulta("fecha", true, $("#fecha").val()); 
        }
    }
    else {//Guardamos la opción como un nuevo objeto en el final del array
        opcionesConsulta["fecha"]=new PreferenciaConsulta("fecha", false, "");
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
        else {//Guardamos la opción como un nuevo objeto en el final del array
            opcionesConsulta["texto"]=new PreferenciaConsulta("texto", true, miTexto);
        }
    }
    else {//Guardamos la opción como un nuevo objeto en el final del array
        opcionesConsulta["texto"]= new PreferenciaConsulta("texto", false, "");
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
        else {//Guardamos la opción como un nuevo objeto en el final del array
            opcionesConsulta["usuario"]=new PreferenciaConsulta("usuario", true, miUsuario);
        }
    }
    else {//Guardamos la opción como un nuevo objeto en el final del array
        opcionesConsulta["usuario"]=new PreferenciaConsulta("usuario", false, "");
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
                else {//Guardamos la opción como un nuevo objeto en el final del array
                    opcionesConsulta["fechaModifica"]=new PreferenciaConsulta("fechaModifica", true, $("#fechaModifica").val());
                    opcionesConsulta["horaModifica"]=new PreferenciaConsulta("horaModifica", true, horaMinutos);
                }
            }
        }
    }
    else {
        //Guardamos la opción como un nuevo objeto en el final del array
        opcionesConsulta["fechaModifica"]=new PreferenciaConsulta("fechaModifica", false, "");
        opcionesConsulta["horaModifica"]=new PreferenciaConsulta("horaModifica", false, "");
    }
    
    // Busca por asientos ACTIVOS/CERRADOS/TODOS
    if($("#buscaCerrados").is(':checked')) // Asientos cerrados
        opcionesConsulta["buscaCerrados"]=new PreferenciaConsulta("buscaCerrados", true, "");
    else if($("#buscaTodos").is(':checked')) // Todos los asientos
        opcionesConsulta["buscaTodos"]=new PreferenciaConsulta("buscaTodos", true, "");
    else // Por defecto buscamos los asientos activos
        opcionesConsulta["buscaActivos"]=new PreferenciaConsulta("buscaActivos", true, "");
    
    // Devolvemos el resultado
    if(validado){
        return validado;
    }
    else {
        // Ocultamos los errores pasados 3 segundos.
        setTimeout("$('.campoError').hide('slow');", 3000);       
    }
}


function listarAsientos(diarioJson, asientoJson, fechaJson, textoJson, usuarioJson, fechaModificaJson, horaModificaJson, buscaCerradosJson, buscaTodosJson, buscaActivosJson){
    alert(diarioJson);
    // Realizamos la petición al servidor
    $.post("./miAjax/listarAsientos.php", {
        diario: diarioJson,
        asiento: asientoJson,
        fecha: fechaJson,
        texto: textoJson,
        usuario: usuarioJson,
        fechaModifica: fechaModificaJson,
        horaModifica: horaModificaJson,
        buscaCerrados: buscaCerradosJson,
        buscaTodos: buscaTodosJson,
        buscaActivos: buscaActivosJson
    }, function(listadoAsientos){
        
        // FALTA CODIGO **************************************************
        
    }).error(function(){
        alert("Error al ejecutar la petición de listado!");
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
            // Convertimos los datos a una cadena JSON.
            var diarioJson = JSON.stringify(opcionesConsulta["diario"]);
            var asientoJson = JSON.stringify(opcionesConsulta["asiento"]);
            var fechaJson = JSON.stringify(opcionesConsulta["fecha"]);
            var textoJson = JSON.stringify(opcionesConsulta["texto"]);
            var usuarioJson = JSON.stringify(opcionesConsulta["usuario"]);
            var fechaModificaJson = JSON.stringify(opcionesConsulta["fechaModifica"]);
            var horaModificaJson = JSON.stringify(opcionesConsulta["horaModifica"]);
            var buscaCerradosJson = JSON.stringify(opcionesConsulta["buscaCerrados"]);
            var buscaTodosJson = JSON.stringify(opcionesConsulta["buscaTodos"]);
            var buscaActivosJson = JSON.stringify(opcionesConsulta["buscaActivos"]);
            
            // Realizamos la consulta
            listarAsientos( diarioJson, asientoJson, fechaJson, textoJson, usuarioJson, fechaModificaJson, horaModificaJson, buscaCerradosJson, buscaTodosJson, buscaActivosJson);
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