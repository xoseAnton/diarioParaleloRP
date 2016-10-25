<?php

// Antes de nada inicio una nueva sesión o reanudo la existente
session_start();

// Inserto la clase para mostra datos
require_once '/./clases/mostrar.php';

// Establecemos por defecto la zona horaria
date_default_timezone_set('Europe/Berlin');


// Variables generales
$mensaje = "";
$selecUsuario = "";

// INFORMACIÓN DEL PROYECTO
$_SESSION['InformacionProyecto'] = array();
$_SESSION['InformacionProyecto'][] = array("Realizado por: ", "Jose Antonio Mariño Outeiro");
$_SESSION['InformacionProyecto'][] = array("Para: ", "Proyecto DAW");
$_SESSION['InformacionProyecto'][] = array("Versión: ", "1.0");
$_SESSION['InformacionProyecto'][] = array("Base de datos: ", "MySQL");
$_SESSION['InformacionProyecto'][] = array ("Servidor web: ", "Microsoft-IIS/8.5");
$_SESSION['InformacionProyecto'][] = array ("Versión de PHP: ", "5.6");


// Compruebo que no tenemos cargados los usuarios:
if (!isset($_SESSION['listaUsuarios'])) {
    // Creamos el array de objetos usuarios y lo serializamos
    $_SESSION['listaUsuarios'] = serialize(operacionesBD::listarUsuariosActivos());   
}

// Comprobamos si hemos enviado el formulario con el usuario
if (isset($_POST['entrar'])) {
    if (!empty($_POST['usuario'])) {
        // Guardamos el intento de entrada del usuario para seleccionarlo nuevamente si introduce mal la contraseña
        $selecUsuario = $_POST['usuario'];

        // Verifico el usuario y contraseña en la base de datos
        if (operacionesBD::verificaUsuario($_POST['usuario'], $_POST['contraseña'])) {
            // Verificado el usuario lo introduzco en una variable de la sesión
            $_SESSION['usuario'] = $_POST['usuario'];   
            $_SESSION['rolUsuario'] = Usuario::buscarRol($_SESSION['listaUsuarios'], $_POST['usuario']);
            
            // Definio el nuevo array de incidencias del usuario
            $_SESSION['incidencias'] = array();            
            $_SESSION['incidencias'][] = date("H:i:s")."-> Se conecta el usuario: ".$_POST['usuario'].".";
            
            // Redirijo a la pantalla consultas de asientos
            header("Location: asientosDiario.php");
        } else {
            $mensaje = "Usuario y contraseña incorrectos!";
        }
    }
    else
        $mensaje = "Deberá seleccionar un Usuario!";
}

?>

<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <!-- Primero incluimos los estilos de la página -->
        <link href="estilos/estiloIndex.css" rel="stylesheet" type="text/css">        
        <link href="estilos/estiloInformeProyecto.css" rel="stylesheet" type="text/css">
        <!-- Por último incluimos los Script que utilizaremos -->
        <script src="misIncludes/jquery-3.1.1.js" type="text/javascript"></script>
        <script src="misScript/operacionesJS.js" type="text/javascript"></script>
        <title>Acceso Diario Paralelo</title>        
    </head>
    <body onload="desplaza('#zonaControlUsuario')">
        
            <!-- Zona de Información -->
            <div id="bloqueInformacion">
                <div id="contenedorBotonInformacion">
                    <input type="button" id="botonInformacion" name="botonInformacion" value="" />
                    <div id="contenedorInformacion">
                        <div id="contenedorTextoIndormacion">
                            <?php mostrar::mostrarInformacion() ?>                         
                        </div>
                    </div>
                </div>           
                <div class="cancelarFlotantes"></div>
            </div>

            <!-- Zona de control de Usuario -->
            <div id="zonaControlUsuario">
                <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
                    <fieldset>
                        <legend><span id="textoAcceso">Acceso - </span><span id="textoDiario">Diario Paralelo</span></legend>

                        <!-- Zona de MENSAJES -->
                        <div>
                            <span class="error"><?php echo $mensaje; ?></span>
                        </div>

                        <!-- Zona de USUARIO -->
                        <div class="campo">
                            <label>Usuario:</label><br/>                         
                            <select id="usuario" name="usuario" onchange="ocultarErrores('.error')" required>
                                <?php mostrar::optionUsuarios($selecUsuario); ?>
                            </select><br/>
                        </div>

                        <!-- Zona de CONTRASEÑA -->
                        <div class="campo">
                            <label for="password" >Contraseña:</label><br/>
                            <input type="password" name="contraseña" id="contraseña" onkeypress="ocultarErrores('.error')" required /><br/>
                        </div>

                        <!-- Zona de BOTONES -->
                        <div class="campo">                       
                            <input type="submit" id="botonEntrar" name="entrar" value="Entrar" />                                                                                              
                        </div>

                    </fieldset>            
                </form>            
            </div>
        
    </body>
</html>
