<?php

// Antes de nada inicio una nueva sesión o reanudo la existente
session_start();

/*
 * 
 * Creo la clase para listar los USUARIOS ACTIVOS
 * 
 */

// Insertamos la clase para utilizar la base de datos
require_once 'operacionesBD.php';
// Insertamos la clase "Usuario"
require_once '/./../clases/Usuario.php'; // Especifico la ruta absoluta

$listaUsuarios = array();

// Compruebo si no consulté previamente los datos
if(!isset($_SESSION['listaUsuarios'])) {
    $listaUsuarios = operacionesBD::listarUsuariosActivos();
    // Guardo la consulta realizada en la Sessión
    $_SESSION['listaUsuarios'] = serialize($listaUsuarios);
}
else {
    // Si ya realizamos la consulta recupero los valores
    $listaUsuarios = unserialize($_SESSION['listaUsuarios']);
}


// Preparo los datos para entregar
$resultado = array();


// Comprobamos si existe un usuario identificado
if (isset($_SESSION['usuario'])) {
    $miId = $_SESSION['usuario']['id'];
    foreach ($listaUsuarios as $miUsuario) {
        if ($miId == $miUsuario->getId())
            $resultado[] = ["id" => $miUsuario->getId(), "nombre" => $miUsuario->getNombre(), "porDefecto" => TRUE];
        else
            $resultado[] = ["id" => $miUsuario->getId(), "nombre" => $miUsuario->getNombre(), "porDefecto" => FALSE];
    }
}
else {
    foreach ($listaUsuarios as $miUsuario) {
        $resultado[] = ["id" => $miUsuario->getId(), "nombre" => $miUsuario->getNombre(), "porDefecto" => FALSE];
    }
}


// Retorno un "string" con los datos optenidos
echo json_encode($resultado);

?>