
/*
 * Función introduce los usuarios activos definidos en la base de datos
 * en un "select".
 * @returns Lista de usuarios de la base de datos
 */
function listarUsuario() {
    // Enviamos la solicitud ajax a la página del servidor
    $.getJSON("./miAjax/listarUsuarios.php", function (resultado){
        // Recorro todos los valores optenidos
        $.each(resultado, function (i, usuario){
            $("#usuario").append("<option value='"+usuario.id+"'>"+usuario.nombre+"</option>")
        });
    });
    
    // Añadimos un campo vacio
    $("#usuario").append("<option value='' selected='true'></option>");    
}


$(function (){    
    // Introducimos la información del proyecto en su campo
    mostrarInformacion();
    
    // Introducimos los usuarios activos en la página
    listarUsuario();
        
   // Animación para la zona "bloque de Información" 
   $("#botonInformacion").hover(function (){ // Cuando gana el foco      
      $("#botonInformacion").css("background-color", "purple");
      $("#contenedorInformacion").fadeIn("slow"); //Aparición progresiva
   }, function (){ // Cuando pierde el foco
       $("#botonInformacion").css("background-color", "");
      $("#contenedorInformacion").hide("slow"); //Desaparición con desplazamiento
   }); 
   
   
   /* Cargamos la función de validación para el formulario
    * 
    * @param {type} idElemento
    * @returns {undefined}
    */ 
   $("#usuario, #contraseña").on("change keyup", function (){
      
      if(contenDatos("#usuario") && contenDatos("#contraseña")) {            
            $("#botonEntrar").removeAttr("disabled");
      }
      else {
          $("#botonEntrar").attr("disabled", "disabled");
      }
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

/*
 * Función para comprobar si un elemento tiene datos
 */

function contenDatos(idElemento) {
    /* Obtengo el valor contenido en el elemento y lo 
     * tranformo en un string
     */
   
    var valor = new String($(idElemento).val());
    /*Expresión reguar para encontrar espacios en blanco: \s+ (uno o más)
     * al principio: ^
     * o al fina: $
     */   
    var cadena = /^\s+$/;    
    // Compruebo la expresión. Coincide = true
    var compruebo = valor.match(cadena) ? true : false;
    
    /*
     * Comprobamos también que no tenga níngún valor (null)
     * o una longitud de 0.
     */
    if(valor == null || valor.length == 0 || compruebo){
        return false;
    }
    else 
        return true;
}