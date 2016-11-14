<?php

/*
 * 
 * Creo la clase para operar con la base de datos.
 * 
 */

// Insertamos la clase "Usuario"
require_once '/./../clases/Usuario.php'; // Especifico la ruta absoluta
require_once '/./../clases/Diario.php'; // Insertamos la clase "Diario"
require_once '/./../clases/Asiento.php'; // Insertamos la clase "Asiento"


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
        } catch (PDOException $error) {
            die ("<h1>ERROR</h1><p>".$error->getMessage()."</p>");
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
            die ("<h1>ERROR</h1><p>".$error->getMessage()."</p>");
        }
    }
        
    
    /*
     * Función para introducir un filtro de saneamiento en los datos que vamos
     * grabar en la base de datos (evitar ataques xss - cross-site Scripting).
     * (Añade un caracter de escape delante de: ', ", \ y NUL)
     */

    protected static function filtrar($datos) {
        return filter_var($datos, FILTER_SANITIZE_MAGIC_QUOTES);    
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
    public static function verificaUsuario($miId, $miContraseña) {        
        // Defino la variable de retorno
        $retorno = array();

        /* Introduzco un filtro de saneamiento para los datos que vamos
         * introducir en la base de datos (evitar ataques xss - cross-site Scripting).
         * (Añade un caracter de escape delante de: ', ", \ y NUL)
         */
        $idFiltrado = self::filtrar($miId);
        $contrasenaFiltrada = self::filtrar($miContraseña);

        // Comando para la consulta
        $sql = "SELECT id, nombre, rol FROM usuarios "
                . "WHERE id='$idFiltrado' "
                . "AND clave='" . md5($contrasenaFiltrada) . "'";

        // Ejecuto la consulta
        $resultado = self::ejecutaConsulta($sql, "negreira");

        // Compruebo el resultado
        if (isset($resultado)) {
            $fila = $resultado->fetch();
            if ($fila !== false) {
                $retorno = ["error" => FALSE, "id" => $fila['id'], "nombre" => $fila['nombre'], "rol" => $fila['rol']];
            }
            else
                $retorno = ["error" => TRUE, "textoError" => "Contraseña incorrecta!"];
        }
        return $retorno;
    }
    
    
    /*
     * Función para LISTAR TODOS LOS DIARIOS
     */
    public static function listarTotalDiarios() {

        // Comando para la consulta
        $sql = "SELECT id, diario, asientos, fechaAsiento, fechaCreacion, usuarioCreacion, cerrado FROM diarios ORDER BY diario DESC";

        // Ejecuto la consulta
        $resultado = self::ejecutaConsulta($sql, "diariosparalelos");

        // Variable que contendrá un array de objetos "Diarios"
        $listaDiarios = array();
        
        // Compruebo el resultado
        if (isset($resultado)) {
            // Añadimos un elemento por cada diario obtenido
            $row = $resultado->fetch();
            while ($row != null) {
                $listaDiarios[] = new Diario($row);
                $row = $resultado->fetch();
            }
        }
        // Retorno un array de objetos de la clase Diario
        return $listaDiarios;
    }
    
    
    /*
     * Función para LISTAR LOS ASIENTOS
     */    
    public static function listarAsientos($opcionesConsulta) {  
        
        /* Introduzco un filtro de saneamiento para los datos que vamos
         * introducir en la base de datos (evitar ataques xss - cross-site Scripting).
         * (Añade un caracter de escape delante de: ', ", \ y NUL)
         */
        $diario = $opcionesConsulta['diario'][0]['valor'];
        $diarioFiltrado = self::filtrar($diario);
        
        
        // Para el caso especial que seleccionemos el estado del diario a una fecha determinada
        if ($opcionesConsulta['fechaModifica'][0]['seleccionado'] == "si"  && $opcionesConsulta['horaModifica'][0]['seleccionado'] == "si") {            
            $fecha = date_create($opcionesConsulta['fechaModifica'][0]['valor'] . " " . $opcionesConsulta['horaModifica'][0]['valor']);
            $fecha = date_format($fecha, "Y-m-d H:i");
            $fechaFiltrada = self::filtrar($fecha);
            
            $sql = "SELECT listaAsientos.* FROM `" . $diarioFiltrado . "` listaAsientos INNER JOIN " .
                   "(SELECT asiento, MAX(id) AS ultimaModific FROM `" . $diarioFiltrado . "` WHERE fechaModificado<='" . $fechaFiltrada . "' GROUP BY asiento)" .
                   " listaResulta ON listaAsientos.asiento=listaResulta.asiento AND listaAsientos.id=listaResulta.ultimaModific AND ";            
        }
        else {                        
            // Para todos los demas casos construimos el comando para la consulta
            $sql = "SELECT listaAsientos.* FROM `" . $diarioFiltrado . "` listaAsientos INNER JOIN " .
                    "(SELECT asiento, MAX(id) AS ultimaModific FROM `" . $diarioFiltrado . "` GROUP BY asiento)" .
                    " listaResulta ON listaAsientos.asiento=listaResulta.asiento AND listaAsientos.id=listaResulta.ultimaModific AND ";             
        }
        
        if($opcionesConsulta['asiento'][0]['seleccionado'] == "si") {
            $asientoFiltrado = self::filtrar($opcionesConsulta['asiento'][0]['valor']);
            $sql = $sql ."listaAsientos.asiento='".$asientoFiltrado."' AND ";
        }
        if($opcionesConsulta['fecha'][0]['seleccionado'] == "si") {
            $fechaFiltrada = self::filtrar($opcionesConsulta['fecha'][0]['valor']);
            $sql = $sql ."listaAsientos.fecha='".$fechaFiltrada."' AND ";
        }
        if($opcionesConsulta['texto'][0]['seleccionado'] == "si") {
            $textoFiltrado = self::filtrar($opcionesConsulta['texto'][0]['valor']);
            $sql = $sql ."(listaAsientos.situacion LIKE '%".$textoFiltrado."%' OR listaAsientos.incidencia LIKE '%".$textoFiltrado."%' OR listaAsientos.otroTexto LIKE '%".$textoFiltrado."%') AND ";
        }
        if($opcionesConsulta['usuario'][0]['seleccionado'] == "si") {
            $usuarioFiltrado = self::filtrar($opcionesConsulta['usuario'][0]['valor']);
            $sql = $sql ."listaAsientos.asignado='".$usuarioFiltrado."' AND ";        
        }
        
        if($opcionesConsulta['buscaCerrados'][0]['seleccionado'] == "si")
            $sql = $sql ."listaAsientos.cerrado='0' "; // Para buscar los asientos cerrados
        elseif ($opcionesConsulta['buscaTodos'][0]['seleccionado'] == "si")
            $sql = $sql ."listaAsientos.cerrado>='0' "; // Para buscar todos los asientos       
        else
            $sql = $sql ."listaAsientos.cerrado='1' "; // Por defecto buscamos los asientos activos       
        
        
        // Cerramos el comando para la consulta
        $sql = $sql . "ORDER BY asiento ASC";         
       
        
        // Ejecuto la consulta
        $resultado = self::ejecutaConsulta($sql, "diariosparalelos");        
        
        // Variable de sesion que contendrá un array de objetos "Asiento"
        $listaAsientos = array();
        
        // Compruebo el resultado
        if (!empty($resultado)) {
            // Añadimos un elemento por cada procedimiento
            $row = $resultado->fetch();
            while ($row != null) {
                //Incluimos el diario en los datos obtenidos
                $row['diario'] = $diario;
                $listaAsientos[] = new Asiento($row);
                $row = $resultado->fetch();
            }
        }        
        
        // Devolvemos los valores obtenidos
        return $listaAsientos;
    }
        
    
    /*
     * Función para insertar datos en un Asiento
     */

    public static function altaDatosAsiento($datos) {

        $retorno = FALSE;
        
        // Filtramos los datos introducidos por el usuario
        $filDiario = self::filtrar($datos['diario']);
        $filAsiento = self::filtrar($datos['asiento']);
        $filFecha = self::filtrar($datos['fecha']);
        $filSituacion = self::filtrar($datos['situacion']);
        $filIncidencia = self::filtrar($datos['incidencia']);
        $filOtroTexto = self::filtrar($datos['otroTexto']);
        $filAsignado = self::filtrar($datos['asignado']);
        $filCerrado = self::filtrar($datos["cerrado"]);
        

        $sql = "INSERT INTO `" . $filDiario . "` (`asiento`, `fecha`, `situacion`, `incidencia`, `otroTexto`, `asignado`, `fechaModificado`, `usuarioModifica`, `cerrado`) "
                . "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $arrayParametros = array($filAsiento, $filFecha, $filSituacion, $filIncidencia, $filOtroTexto, $filAsignado, $datos['fechaModificado'], $datos['usuarioModifica'], $filCerrado);
        $resultado = self::consultaPreparada($sql, $arrayParametros, 'ACCION', 'diariosparalelos');

        if ($resultado === 1 || $resultado === "1")            
            $retorno = TRUE;
        
        // Retornamos el resultado
        return $retorno;
    }

} // Fin de la clase "operacionesBD"
