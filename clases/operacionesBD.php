<?php

/*
 * 
 * Creo la clase para operar con la base de datos.
 * 
 */

// Insertamos la clase "Usuario"
require_once 'Usuario.php'; // Especifico la ruta absoluta
require_once 'Diario.php';
require_once 'Asiento.php';


class operacionesBD {
    
    // Variables de usuario de la base de datos
    static protected $usuario = "reg.negreira";    
    static protected $contrasena = "abc123.";
    
    /**
     * Usamos consultas preparadas para limpiar datos introducidos por el usuario y "evitar" ataques SQL injection
     * La consulta debe ser de la forma:
     * --Consulta select--
     * $sql             = SELECT * FROM tabla WHERE p1=? AND p2=?
     * $arrayParametros = array($valor1, $valor2)
     * $tipo            = 'SELECT'
     * --Consulta acción--
     * $sql             = INSERT INTO tabla VALUES (?, ?)
     * $arrayParametros = array($valor1, $valor2)
     * $tipo            = 'ACCION'
     * 
     * @param string $sql Cadena con la consulta en el formato indicado
     * @param array $arrayParametros Array con los parámetros que se le pasarán a la consulta
     * @param string $tipo Puede valer 'ACCION' o 'SELECT' según sea el tipo de la consulta
     * @return string|int El resultado de la consulta, en caso de $tipo = 'SELECT' será un array con todas las filas, en el caso $tipo = 'ACCION' será el número de filas afectadas
     */
    protected static function consultaPreparada($sql, $arrayParametros, $tipo, $baseDatos) {        
        
        $opc = array(
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8", // Codificación de caracteres
            PDO::MYSQL_ATTR_FOUND_ROWS   => TRUE // Dice las filas que fueron encontradas aunque no sean modificadas
                );
        $dsn = "mysql:host=localhost;dbname=" . $baseDatos;
        
        try {
            $bbdd = new PDO($dsn, self::$usuario, self::$contrasena, $opc);
        } catch (PDOException $e) {
            die ("<h1>ERROR</h1><p>".$e->getMessage()."</p>");
        }

        $consulta = $bbdd->prepare($sql);
        if ( $consulta->execute($arrayParametros) ) { // Se ejecutó
            if ( $tipo === 'ACCION' ) {// Según el $tipo escogido, devolvemos una cosa u otra
                $resultadoConsulta = $consulta->rowCount();
            } elseif ( $tipo == 'SELECT' ) {
                $resultadoConsulta = $consulta->fetchAll();
            } else {
                die ("<h1>No puedes llamar a esta función con ese $tipo</h1>");
            }
        } else {
            die ("<h1>ERROR</h1><p>Error al llamar a la consulta:".$sql."</p>");
        }
        return $resultadoConsulta;
    }
    
    
    /*
     * Función para ejecutar consultas en la base de datos
     */

    protected static function ejecutaConsulta($sql, $baseDatos) {
        // Declaro las variables                
        $resultado = null;

        $opc = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
        $dsn = "mysql:host=localhost;dbname=" . $baseDatos;

        // Capturo los posibles errores en la conexión
        try {
            $dwes = new PDO($dsn, self::$usuario, self::$contrasena, $opc);
            if (isset($dwes))
                $resultado = $dwes->query($sql);
            return $resultado;
        } catch (PDOException $error) {
            return $resultado;
        }
    }
    
    
    /*
     * Función para LISTAR USUARIOS ACTIVOS
     */

    public static function listarUsuariosActivos() {

        // Comando para la consulta
        $sql = "SELECT id, nombre, rol FROM usuarios WHERE activo = '1' ORDER BY nombre";

        // Ejecuto la consulta
        $resultado = self::ejecutaConsulta($sql, "negreira");

        // Variable que contendrá un array de objetos "Usuario"
        $listaUsuarios = array();

        // Compruebo el resultado
        if (isset($resultado)) {
            // Añadimos un elemento por cada usuario obtenido
            $row = $resultado->fetch();
            while ($row != null) {
                $listaUsuarios[] = new Usuario($row);
                $row = $resultado->fetch();
            }
        }
        // Retorno un array de objetos de la clase Usuario
        return $listaUsuarios;
    }
    
    
    /*
     * Función para verificar usuarios en la base de datos
     */

    public static function verificaUsuario($nombre, $contrasena) {
        // Defino la variable (que será el valor de retorno)
        $verificado = false;

        /* Introduzco un filtro de saneamiento para los datos que vamos
         * introducir en la base de datos (evitar ataques xss - cross-site Scripting).
         * (Añade un caracter de escape delante de: ', ", \ y NUL)
         */
        $nombreFiltrado = filter_var($nombre, FILTER_SANITIZE_MAGIC_QUOTES);
        $contrasenaFiltrada = filter_var($contrasena, FILTER_SANITIZE_MAGIC_QUOTES);

        // Comando para la consulta
        $sql = "SELECT nombre FROM usuarios "
                . "WHERE nombre='$nombreFiltrado' "
                . "AND clave='" . md5($contrasenaFiltrada) . "'";

        // Ejecuto la consulta
        $resultado = self::ejecutaConsulta($sql, "negreira");

        // Compruebo el resultado
        if (isset($resultado)) {
            $fila = $resultado->fetch();
            if ($fila !== false)
                $verificado = true;
        }
        return $verificado;
    }


}
