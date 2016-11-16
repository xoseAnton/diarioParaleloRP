<?php

// Antes de nada inicio una nueva sesión o reanudo la existente
session_start();

/*
 * 
 * Creo la clase para listar los detalles del ASIENTO SELECCIONADO.
 * 
 */

// Insertamos la clase para utilizar la base de datos
require_once 'operacionesBD.php';
// Insertamos la clase "Asientos"
require_once '/./../clases/Asiento.php'; // Especifico la ruta absoluta

$listaAsientos = array();



//Comprobamos que el usuario está identificado para consultar los datos
if (isset($_SESSION['usuario'])) {

    // Recupero los datos de la consulta realizada
    $datosConsulta = $_POST['opciones'];

    // Consultamos en la base de datos
    $listaAsientos = operacionesBD::listarAsientos($datosConsulta);

    // Retorno un "string" con los datos optenidos
    echo json_encode($listaAsientos);
}
?>