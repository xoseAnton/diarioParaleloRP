<?php

/*
 * 
 * Creo la clase para listar los USUARIOS ACTIVOS
 * 
 */

// Insertamos la clase para utilizar la base de datos
require_once 'operacionesBD.php';

// Retorno un "string" con los datos optenidos
echo json_encode(operacionesBD::listarUsuariosActivos());

?>