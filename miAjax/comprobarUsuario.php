<?php

// Antes de nada inicio una nueva sesión o reanudo la existente
session_start();

// Insertamos la clase para utilizar la base de datos
require_once 'operacionesBD.php';

// Establecemos por defecto la zona horaria
date_default_timezone_set('Europe/Berlin');

//Recupero las variables
$miId = $_GET['id'];
$miContraseña = $_GET['contraseña'];

// Verifico el usuario introducido
$resultado = operacionesBD::verificaUsuario($miId, $miContraseña);

// Compruebo el resultado
if(isset($resultado)) {
    // Si el usuario esta identificado
    if ($resultado['error'] != TRUE) {
        // Si encontramos una coincidencia guardamos el usuario en la variable de sesión
        $_SESSION['usuario'] = array();
        $_SESSION['usuario'] = ["id" => $resultado['id'], "nombre" => $resultado['nombre'], "rol" => $resultado['rol']];        
        
        // Definio el nuevo array de incidencias del usuario
        $_SESSION['incidencias'] = array();
        $_SESSION['incidencias'][] = date("H:i:s") . "-> Se conecta el usuario: " . $resultado['nombre'] . ".";
    }
}
else {
    $resultado = ["error" => TRUE, "textoError" => "Usuario no comprobado!"];
}

// Retornamos el resultado
echo json_encode($resultado);
?>