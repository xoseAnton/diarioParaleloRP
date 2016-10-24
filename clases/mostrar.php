<?php

/*
 * 
 * Clase que crea código html con el resultado de las consultas a la base
 * de datos.
 * 
 */


// Insertamos la clase "Usuario"
require_once 'Usuario.php'; // Especifico la ruta absoluta
// Insertamos la clase "Diario"
require_once 'Diario.php';
// Insertamos la clase "Asiento"
require_once 'Asiento.php';
// Insertamos la clase para utilizar la base de datos
require_once 'operacionesBD.php';


class mostrar {
    
    // Función para mostrar LA INFORMACIÓN DEL PROGRAMA
    public static function mostrarInformacion() {        

        // Si tenemos la información sobre el programa la mostramos
        if (isset($_SESSION['InformacionProyecto'])) {
            foreach ($_SESSION['InformacionProyecto'] as $miInformacion) {
                echo "<p class='textoInformacion'><span class='textoTituloInformacion'>".$miInformacion[0]."</span>".$miInformacion[1]."</p>";
            }
        }
        else
            echo "<p class='textoInformacion'><span class='textoTituloInformacion'>Aviso: </span>Información no disponible!</p>";
    }    
    
    
    // Función para mostrar los usuarios en un "select"
    public static function optionUsuarios($selecUsuario) {

        $listaUsuarios = unserialize($_SESSION['listaUsuarios']);                
        $encontrado = FALSE; // Variable que controla el caso que no esté definido el usuario en activos
        
        if (!empty($listaUsuarios)) {
            foreach ($listaUsuarios as $miUsuario) {
                if ($miUsuario->getNombre() == $selecUsuario) {
                    echo "<option value='" . $miUsuario->getNombre() . "' selected='true'>" . $miUsuario->getNombre() . "</option>";
                    $encontrado = TRUE;
                } else
                    echo "<option value='" . $miUsuario->getNombre() . "'>" . $miUsuario->getNombre() . "</option>";
            }
        }
        
        // Para el caso de que encontremos el usuario, mostramos uno vacio
        if($encontrado) {
            if($selecUsuario != "")
                echo "<option value=''></option>";
        }
        else { // Para el caso de que no encontremos un usuario
            if($selecUsuario != "") {
                echo "<option value='".$selecUsuario."' selected='true'>".$selecUsuario."</option>";
                echo "<option value=''></option>";
            }
            else
                echo "<option value='' selected='true'></option>";
        }
    } 
   
}
