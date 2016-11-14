<?php
// Antes de nada inicio una nueva sesión o reanudo la existente
session_start();


// Establecemos por defecto la zona horaria
date_default_timezone_set('Europe/Berlin');


/*
 * 
 * Creo la clase para listar los ASIENTOS según las opciones
 * seleccionadas.
 * 
 */

// Insertamos la clase para utilizar la base de datos
require_once 'operacionesBD.php';

//Comprobamos que el usuario está identificado para consultar los datos
if (isset($_SESSION['usuario'])) {
    
    // Recupero los datos de la consulta realizada
    $datos = $_POST['datos'];
    
    $datos['fechaModificado'] = date("Y-m-d H:i:s");
    $datos['usuarioModifica'] = $_SESSION['usuario']['nombre'];
        
    // Introducimos los datos en la base de datos
    if(operacionesBD::altaDatosAsiento($datos)){
        // Se añadió los nuevos datos al asiento, creamos la incidencia
        $_SESSION['incidencias'][] = date("H:i:s") . "-> Se MODIFICO el asiento Nº: " . $datos['asiento'] . "/" . $datos['diario'] . ".";
        // Retorno un "string" con el resultado
        echo json_encode(["resultado" => TRUE]);
    }
    else
        echo json_encode(["resultado" => FALSE]);
}

?>