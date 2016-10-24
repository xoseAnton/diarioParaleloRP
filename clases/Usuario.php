<?php

/*
 * 
 * Clase Usuario.
 * 
 */

class Usuario {
    
    // Variables de clase
    protected $id;    
    protected $nombre;
    protected $rol;
    
    // Constructor
    function __construct($row) {
        $this->id = $row['id'];
        $this->nombre = $row['nombre'];
        $this->rol = $row['rol'];
    }
    
    // Métodos get
    function getId() {
        return $this->id;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getRol() {
        return $this->rol;
    }
    
    // Métodos set
    function setId($id) {
        $this->id = $id;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setRol($rol) {
        $this->rol = $rol;
    }
    
    // Método para buscar el rol de un usuario
    public static function buscarRol($listaUsuarios, $nombre){        
        if (isset($listaUsuarios)) {
            $listaUsuarios = unserialize($listaUsuarios);        
            
            foreach ($listaUsuarios as $miUsuario) {
                if ($miUsuario->getNombre() == $nombre) {
                    return $miUsuario->getRol();
                }
            }
        }
    }
    
}

?>