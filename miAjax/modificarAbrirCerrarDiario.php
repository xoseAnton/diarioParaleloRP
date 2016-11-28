<?php
// Antes de nada inicio una nueva sesión o reanudo la existente
session_start();


// Establecemos por defecto la zona horaria
date_default_timezone_set('Europe/Berlin');


/*
 * 
 * Clase para MODIFICAR APERTURA O CIERRE DEL DIARIO
 * 
 */

// Insertamos la clase para utilizar la base de datos
require_once 'operacionesBD.php';

// Preparo los datos para entregar
$grabadoDiario = FALSE;

//Comprobamos que el usuario está identificado para modificar los datos
if (isset($_SESSION['usuario'])) {
    
    // Recupero los datos de la consulta realizada
    $valores = $_POST['datos'];        
    
    // Introducimos los datos en la base de datos
    if (operacionesBD::modificaAbrirCerrarDiario($valores)) {
        $grabadoDiario = TRUE;
        $textoCerradoAbierto = "";
        if($valores['cerrado']==0)
            $textoCerradoAbierto = "Cerrado";
        else
            $textoCerradoAbierto = "Abierto";
        // Se modifico el diario
        $_SESSION['incidencias'][] = date("H:i:s") . "-> ".$textoCerradoAbierto." el diario Nº: " . $valores['diario'] . ".";
    } else {        
        $grabadoDiario = FALSE;
    }
    
    $resultado[] = ["grabadoDiario" => $grabadoDiario];
    
    // Retorno un "string" con los datos optenidos
    echo json_encode($resultado);
}

?>