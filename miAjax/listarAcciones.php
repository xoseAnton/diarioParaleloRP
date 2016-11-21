<?php

// Antes de nada inicio una nueva sesión o reanudo la existente
session_start();

// Preparo los datos para entregar
$resultado = array();

// Comprobamos si existe un usuario identificado
if (isset($_SESSION['usuario'])) {
    if (isset($_SESSION['incidencias'])) {
        $invertido = array_reverse($_SESSION['incidencias']);        
        foreach ($invertido as $miAccion) {        
            $resultado[] = ["accion" => $miAccion];
    }
    } else
        $resultado[] = ["accion" => ""];
} else
    $resultado[] = ["accion" => ""];

// Retorno un "string" con los datos optenidos
echo json_encode($resultado);

?>