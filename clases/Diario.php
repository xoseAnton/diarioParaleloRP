<?php

/*
 * 
 * Clase Diario.
 * 
 * Como la clase Diario tiene variables protected, implemento la función
 * jsonSerializable para mostrar esas variables cuando codifico con "json_encode"
 * 
 */

class Diario implements JsonSerializable {
    
    // Variables de clase
    protected $id;
    protected $diario;
    protected $asientos;
    protected $fechaAsiento;
    protected $fechaCreacion;
    protected $usuarioCreacion;
    protected $cerrado;
    
    // Constructor
    function __construct($fila) {
        $this->id = $fila['id'];
        $this->diario = $fila['diario'];
        $this->asientos = $fila['asientos'];
        $this->fechaAsiento = $fila['fechaAsiento'];
        $this->fechaCreacion = $fila['fechaCreacion'];
        $this->usuarioCreacion = $fila['usuarioCreacion'];
        $this->cerrado = $fila['cerrado'];
    }
    
    // Métodos get y set
    function getId() {
        return $this->id;
    }

    function getDiario() {
        return $this->diario;
    }

    function getAsientos() {
        return $this->asientos;
    }

    function getFechaAsiento() {
        return $this->fechaAsiento;
    }

    function getFechaCreacion() {
        return $this->fechaCreacion;
    }

    function getUsuarioCreacion() {
        return $this->usuarioCreacion;
    }

    function getCerrado() {
        return $this->cerrado;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setDiario($diario) {
        $this->diario = $diario;
    }

    function setAsientos($asientos) {
        $this->asientos = $asientos;
    }

    function setFechaAsiento($fechaAsiento) {
        $this->fechaAsiento = $fechaAsiento;
    }

    function setFechaCreacion($fechaCreacion) {
        $this->fechaCreacion = $fechaCreacion;
    }

    function setUsuarioCreacion($usuarioCreacion) {
        $this->usuarioCreacion = $usuarioCreacion;
    }

    function setCerrado($cerrado) {
        $this->cerrado = $cerrado;
    }
    
    
    /* 
     * Función para implementar la serialización del objeto y mostrar
     * aquellos atributos que tenga definidos como "protected" o "private".
     */
    public function jsonSerialize() {
        return [
        'id' => $this->getId(),
        'diario' => $this->getDiario(),
        'asientos' => $this->getAsientos(),        
        'fechaAsiento' => $this->getFechaAsiento(),
        'fechaCreacion' => $this->getFechaCreacion(),        
        'cerrado' => $this->getCerrado()        
        ];
    }

}

?>