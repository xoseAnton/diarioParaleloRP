<?php
// Antes de nada inicio una nueva sesión o reanudo la existente
session_start();


// Comprobamos que el usuario está identificado
if (!isset($_SESSION['usuario'])) {    
    // Borramos los datos de la sesión
    session_unset();
    // Redirigimos a la pantalla inicial
    header("Location: index.php");
} 

?>


<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <!-- Primero incluimos los estilos de la página -->
        <link href="estilos/estiloAsientosDiario.css" rel="stylesheet" type="text/css">        
        <link href="estilos/estiloComunProyecto.css" rel="stylesheet" type="text/css">
        <!-- Por último incluimos los Script que utilizaremos -->
        <script src="misIncludes/jquery-3.1.1.js" type="text/javascript"></script>
        <script src="misScript/comunJS.js" type="text/javascript"></script>
        <script src="misScript/operacionesAsientoDiarioJS.js" type="text/javascript"></script>
        <title>Listado de Asientos</title>       
    </head>
    <body>
        <!-- Zona de Información -->
        <div id="bloqueInformacion">
            <div id="contenedorBotonInformacion">
                <input type="button" id="botonInformacion" name="botonInformacion" value="" />
                <div id="contenedorInformacion">
                    <div id="contenedorTextoIndormacion"></div>
                </div>
            </div>           
            <div class="cancelarFlotantes"></div>
        </div>       
        
        
         <!-- Zona de PROGRAMA -->        
        <div id="zonaPrograma"> 
            
            
            
        </div> <!-- Fin de zona PROGRAMA -->

    </body>
</html>
