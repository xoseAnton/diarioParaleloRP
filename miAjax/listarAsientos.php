<?php
// Antes de nada inicio una nueva sesión o reanudo la existente
session_start();

/*
 * 
 * Creo la clase para listar los ASIENTOS según las opciones
 * seleccionadas.
 * 
 */

// Insertamos la clase para utilizar la base de datos
require_once 'operacionesBD.php';
// Insertamos la clase "Asientos"
require_once '/./../clases/Asiento.php'; // Especifico la ruta absoluta

$listaAsientos = array();



// Comprobamos que el usuario está identificado
if (isset($_SESSION['usuario'])) {
    
    $diario = json_decode($_POST['diario']);
    $asiento = json_decode($_POST['asiento']);
    $fecha = json_decode($_POST['fecha']);
    $texto = json_decode($_POST['texto']);
    $usuario = json_decode($_POST['usuario']);
    $fechaModifica = json_decode($_POST['fechaModifica']);
    $horaModifica = json_decode($_POST['horaModifica']);
    $buscaCerrados = json_decode($_POST['buscaCerrados']);
    $buscaTodos = json_decode($_POST['buscaTodos']);
    $buscaActivos = json_decode($_POST['buscaActivos']);
    
    echo var_dump($diario['valor']);

    // $listaAsientos = operacionesBD::listarAsientos($diario, $asiento, $fecha, $texto, $usuario, $fechaModifica, $horaModifica, $buscaCerrados, $buscaTodos, $buscaActivos);


    // Retorno un "string" con los datos optenidos
    // echo json_encode($listaAsientos);
}

?>