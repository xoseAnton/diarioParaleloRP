<?php

// Antes de nada inicio una nueva sesión o reanudo la existente
session_start();

// Insertamos la clase para utilizar la base de datos
require_once 'operacionesBD.php';


echo json_encode(["id"=>$_GET['id'], "contra"=>$_GET['contra']]);

?>