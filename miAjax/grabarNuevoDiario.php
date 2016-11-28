<?php
// Antes de nada inicio una nueva sesión o reanudo la existente
session_start();


// Establecemos por defecto la zona horaria
date_default_timezone_set('Europe/Berlin');


/*
 * 
 * Clase para CREAR NUEVOS DIARIOS 
 * 
 */

// Insertamos la clase para utilizar la base de datos
require_once 'operacionesBD.php';

// Preparo los datos para entregar
$grabadoDiario = FALSE;

//Comprobamos que el usuario está identificado para consultar los datos
if (isset($_SESSION['usuario'])) {
    
    // Recupero los datos de la consulta realizada
    $valores = $_POST['datos'];    
    $datos = array();
    
    // Introducimos los datos para guardar en el array
    $datos['diario'] = $valores['diario'];
    $datos['asientos'] = 0;
    $datos['fechaAsiento'] = $valores['fechaAsiento'];    
    $datos['fechaCreacion'] = date("Y-m-d H:i:s");
    $datos['usuarioCreacion'] =  $_SESSION['usuario']['nombre'];
    $datos["cerrado"] = 1;
    
    // Introducimos los datos en la base de datos
    if (operacionesBD::creaNuevaTablaDiario($datos)) {
        $grabadoDiario = TRUE;
        // Se añadió los nuevos datos al asiento, creamos la incidencia
        $_SESSION['incidencias'][] = date("H:i:s") . "-> CREADO el diario Nº: " . $datos['diario'] . ".";
    } else {
        $grabadoDiario = FALSE;
    }
    
    $resultado[] = ["grabadoDiario" => $grabadoDiario];
    
    // Retorno un "string" con los datos optenidos
    echo json_encode($resultado);
}

?>