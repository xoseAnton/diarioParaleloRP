<?php

/*
 * Clase Asiento.
 */

class Asiento {
    
    // Variables de clase
    protected $id;
    protected $asiento;
    protected $diario;
    protected $fecha;
    protected $situacion;
    protected $incidencia;
    protected $otroTexto;
    protected $asignado;
    protected $fechaModificado;
    protected $usuarioModifica;
    protected $cerrado;
    
    // Constructor
    function __construct($fila) {
        $this->id = $fila['id'];
        $this->asiento = $fila['asiento'];
        $this->diario = $fila['diario'];
        $this->fecha = $fila['fecha'];
        $this->situacion = $fila['situacion'];
        $this->incidencia = $fila['incidencia'];
        $this->otroTexto = $fila['otroTexto'];
        $this->asignado = $fila['asignado'];
        $this->fechaModificado = $fila['fechaModificado'];
        $this->usuarioModifica = $fila['usuarioModifica'];
        $this->cerrado = $fila['cerrado'];
    }
    
    // Métodos Get y Set
    function getId() {
        return $this->id;
    }

    function getAsiento() {
        return $this->asiento;
    }

    function getDiario() {
        return $this->diario;
    }

    function getFecha() {
        return $this->fecha;
    }

    function getSituacion() {
        return $this->situacion;
    }

    function getIncidencia() {
        return $this->incidencia;
    }

    function getOtroTexto() {
        return $this->otroTexto;
    }

    function getAsignado() {
        return $this->asignado;
    }

    function getFechaModificado() {
        return $this->fechaModificado;
    }

    function getUsuarioModifica() {
        return $this->usuarioModifica;
    }

    function getCerrado() {
        return $this->cerrado;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setAsiento($asiento) {
        $this->asiento = $asiento;
    }

    function setDiario($diario) {
        $this->diario = $diario;
    }

    function setFecha($fecha) {
        $this->fecha = $fecha;
    }

    function setSituacion($situacion) {
        $this->situacion = $situacion;
    }

    function setIncidencia($incidencia) {
        $this->incidencia = $incidencia;
    }

    function setOtroTexto($otroTexto) {
        $this->otroTexto = $otroTexto;
    }

    function setAsignado($asignado) {
        $this->asignado = $asignado;
    }

    function setFechaModificado($fechaModificado) {
        $this->fechaModificado = $fechaModificado;
    }

    function setUsuarioModifica($usuarioModifica) {
        $this->usuarioModifica = $usuarioModifica;
    }

    function setCerrado($cerrado) {
        $this->cerrado = $cerrado;
    }
  
}

?>