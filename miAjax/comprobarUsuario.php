<?php

// Antes de nada inicio una nueva sesión o reanudo la existente
session_start();

// Insertamos la clase para utilizar la base de datos
require_once 'operacionesBD.php';

// Defino la variable de control
$verificado = false;
// Defino la variable de retorno
$retorno = array();

//Recupero las variables
$miId = $_GET['id'];
$miContraseña = $_GET['contraseña'];

/* Introduzco un filtro de saneamiento para los datos que vamos introducir
 * en la base de datos (evitar ataques xss - cross-site Scripting).
 * (Añade un caracter de escape delante de: ', ", \ y NUL)
 */
$idFiltrado = filter_var($miId, FILTER_SANITIZE_MAGIC_QUOTES);
$contrasenaFiltrada = filter_var($miContraseña, FILTER_SANITIZE_MAGIC_QUOTES);

// Comando para la consulta
$sql = "SELECT id, nombre, rol FROM usuarios "
        . "WHERE id='$idFiltrado' "
        . "AND clave='" . md5($contrasenaFiltrada) . "'";

// Ejecuto la consulta
$resultado = operacionesBD::ejecutaConsulta($sql, "negreira");

// Compruebo el resultado
if (isset($resultado)) {
    $fila = $resultado->fetch();
    if ($fila !== false) {
        // Si encontramos una coincidencia guardamos el usuario en la variable de sesión
        $_SESSION['usuario'] = array();
        $_SESSION['usuario'] = ["id" => $fila['id'], "nombre" => $fila['nombre'], "rol" => $fila['rol']];
        $verificado = true;
    }
}

// Si encontramos una coincidencia
if ($verificado)
    $retorno[] = ["error" => FALSE];
else
    $retorno[] = ["error" => TRUE, "textoError" => "Usuario y contraseña incorrectos!"];


// Retornamos el resultado
echo json_encode($retorno);
?>