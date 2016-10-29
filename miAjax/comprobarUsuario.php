<?php

// Antes de nada inicio una nueva sesión o reanudo la existente
session_start();

// Insertamos la clase para utilizar la base de datos
require_once 'operacionesBD.php';

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
    }
}
else {
    $resultado = ["error" => TRUE, "textoError" => "Usuario no comprobado!"];
}

// Retornamos el resultado
echo json_encode($resultado);
?>