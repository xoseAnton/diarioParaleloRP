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

// Preparo los datos para entregar
$resultado = array();
$asientosNoGrabados = 0;
$grabadoDiario = FALSE;

//Comprobamos que el usuario está identificado para consultar los datos
if (isset($_SESSION['usuario'])) {
    
    // Recupero los datos de la consulta realizada
    $valores = $_POST['datos'];
    
    $totalAsientos = $valores['nAsientos'];
    $ultimoAsientoDiario = $valores['ultimoAsiento'];
    
    // Introducimos los datos para guardar en el array
    $datos['diario'] = $valores['diario'];
    $datos['fecha'] = $valores['fechaAsiento'];
    $datos['situacion'] = "";
    $datos['incidencia'] = "";
    $datos['otroTexto'] = "";
    $datos['asignado'] = "";
    $datos['fechaModificado'] = date("Y-m-d H:i:s");
    $datos['usuarioModifica'] =  $_SESSION['usuario']['nombre'];
    $datos["cerrado"] = 1;

    // Recorremos todo el intervalo de asientos
    for( $i=1; $i<=$totalAsientos; $i++) {
        // Incrementamos el asiento en cada llamada
        $datos['asiento'] = $ultimoAsientoDiario + $i;
        
        // Introducimos los datos en la base de datos
        if (operacionesBD::altaDatosAsiento($datos)) {
            // Se añadió los nuevos datos al asiento, creamos la incidencia
            $_SESSION['incidencias'][] = date("H:i:s") . "-> CREADO el asiento Nº: " . $datos['asiento'] . "/" . $datos['diario'] . ".";
        } else {            
            // No se pudo grabar el asiento en el diario
            $_SESSION['incidencias'][] = date("H:i:s") . "-> ERROR crear asiento Nº: " . $datos['asiento'] . "/" . $datos['diario'] . ".";
            $asientosNoGrabados++; // Incrementamos el número de asientos no grabados en la base de datos            
            // Salimos del bucle 
            break;
        }
    }        
    
    // Actualizamos los valores del diario con los datos introducidos
    // Iniciamos la variable de datos    
    $datosDiario = array();
    $datosDiario['id'] = $valores['idDiario'];
    $datosDiario['asientos'] = $datos['asiento'];
    $datosDiario['fechaAsiento'] = $datos['fecha'];    
    
    if($asientosNoGrabados == 0) {
        if (operacionesBD::modificaDatosDiario($datosDiario))
            $grabadoDiario = TRUE;
        else
            $grabadoDiario = FALSE;
    }else {
        // Si el error se produce en el primer asiento no hacemos nada (no se grabo níngún asiento).
        if($datos['asiento'] > ($ultimoAsientoDiario + 1)){
            if (operacionesBD::modificaDatosDiario($datosDiario))
                $grabadoDiario = TRUE;
            else
                $grabadoDiario = FALSE;
        }
    }

    $resultado[] = ["noGrabados" => $asientosNoGrabados, "grabadoDiario" => $grabadoDiario];
    
    // Retorno un "string" con los datos optenidos
    echo json_encode($resultado);
}

?>