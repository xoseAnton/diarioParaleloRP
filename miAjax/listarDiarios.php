<?php

/*
 * 
 * Creo la clase para listar todos los DIARIOS
 * 
 */

// Insertamos la clase para utilizar la base de datos
require_once 'operacionesBD.php';
// Insertamos la clase "Usuario"
require_once '/./../clases/Diario.php'; // Especifico la ruta absoluta

$listaDiarios = array();

$listaDiarios = operacionesBD::listarTotalDiarios();


// Preparo los datos para entregar
$resultado = array();

// Recorro todos los datos obtenidos
foreach ($listaDiarios as $miDiario) {
    $resultado[] = ["id" => $miDiario->getId(), "diario" => $miDiario->getDiario(), "asientos" => $miDiario->getAsientos(), "fechaAsiento" => $miDiario->getFechaAsiento(), "cerrado" =>$miDiario->getCerrado()];
}

// Retorno un "string" con los datos optenidos
echo json_encode($resultado);

?>