<?php

// Antes de nada inicio una nueva sesión o reanudo la existente
session_start();

// Establecemos por defecto la zona horaria
date_default_timezone_set('Europe/Berlin');

// INFORMACIÓN DEL PROYECTO
$_SESSION['InformacionProyecto'] = array();
$_SESSION['InformacionProyecto'][] = array("Realizado por: ", "Jose Antonio Mariño Outeiro");
$_SESSION['InformacionProyecto'][] = array("Para: ", "Proyecto DAW");
$_SESSION['InformacionProyecto'][] = array("Versión: ", "1.0");
$_SESSION['InformacionProyecto'][] = array("Base de datos: ", "MySQL");
$_SESSION['InformacionProyecto'][] = array ("Servidor web: ", "Microsoft-IIS/8.5");
$_SESSION['InformacionProyecto'][] = array ("Versión de PHP: ", "5.6");


?>

<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <link href="estilos/estiloAcceso.css" rel="stylesheet" type="text/css">
        <title>Acceso Diario Paralelo</title>
    </head>
    <body>
        <?php
        // put your code here
        ?>
    </body>
</html>
