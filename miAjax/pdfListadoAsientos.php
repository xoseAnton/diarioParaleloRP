<?php

// Antes de nada inicio una nueva sesión o reanudo la existente
session_start();

// Inserto la clase para trabajar con PDF
// Inserto la clase con funciones propias PDF
require_once '/./../misIncludes/fpdf181/miPDF.php';
// Inserto la clase Asiento
require_once '/./../clases/Asiento.php';
// Insertamos la clase para utilizar la base de datos
require_once 'operacionesBD.php';

// Establecemos por defecto la zona horaria
date_default_timezone_set('Europe/Berlin');

// Cremos la pagina PDF
$pdf = new miPDF();

$pdf->AliasNbPages();   // Para el calculo del número total de páginas
// Establecemos los margenes: izquierda, arriba y derecha
$pdf->SetMargins(10, 10, 10);
// Establecemos el margen inferior
$pdf->SetAutoPageBreak(TRUE, 10);

// Creo la primera página
$pdf->AddPage('L', 'A4');


// Función para insertar la cabecera de la página
function cabeceraHorizontal($pdf, $diario, $fechaListado, $horaListado) {

    // Creamos el título de la página
    $pdf->SetFont('Arial', 'B', 15);
    $pdf->Cell(50, 10, utf8_decode('Diario: ' . $diario . ''), 0, 0, 'L');
    $pdf->SetFont('Arial', '', 8);
    $pdf->Cell(0, 10, utf8_decode(' Fecha listado: '). $fechaListado . utf8_decode('     Consulta: '). $horaListado. utf8_decode(' h') , 0, 0, 'C');
    $pdf->SetFont('Arial', 'BI', 8);
    // El parametro {nb} es generado por la función llamada AliasNbPages()
    $pdf->Cell(0, 10, utf8_decode('Página: ') . $pdf->PageNo() . ' / {nb}', 0, 0, 'R');
    $pdf->Ln(); //Salto de línea para generar otra fila
    // Creo la cabezera de la tabla con el mismo tipo de letra
    $pdf->SetFont('Arial', 'B', 9);

    $pdf->Cell(15, 6, utf8_decode('Asiento'), 1, 0, 'C');
    $pdf->Cell(15, 6, utf8_decode('Fecha'), 1, 0, 'C');
    $pdf->Cell(119, 6, utf8_decode('Situación'), 1, 0, 'C');
    $pdf->Cell(80, 6, utf8_decode('Incidencia'), 1, 0, 'C');
    $pdf->Cell(30, 6, utf8_decode('Otros'), 1, 0, 'C');
    $pdf->Cell(18, 6, utf8_decode('Asignado'), 1, 0, 'C');
    $pdf->Ln(); //Salto de línea para generar otra fila
}


// Función para insertar los datos en una tabla
function datosHorizontal($pdf, $asiento) {

    // Especificamos un tipo de letra distinto para el número de asiento
    $pdf->SetFont('Arial', 'B', 10);
    $pdf->CellFitSpace(15, 6, utf8_decode($asiento->getAsiento()), 1, 0, 'C');

    // Especificamos un mismo tipo de letra para los demas campos
    $pdf->SetFont('Helvetica', '', 6);

    // Cambiamos el formato de fecha
    $fechaAsiento = date_create($asiento->getFecha());
    $formatoFechaAsiento = date_format($fechaAsiento, "d/m/Y");
    $pdf->CellFitSpace(15, 6, utf8_decode($formatoFechaAsiento), 1, 0, 'C');


    $pdf->CellFitSpace(119, 6, utf8_decode($asiento->getSituacion()), 1, 0, 'L');
    $pdf->CellFitSpace(80, 6, utf8_decode($asiento->getIncidencia()), 1, 0, 'L');
    $pdf->CellFitSpace(30, 6, utf8_decode($asiento->getOtroTexto()), 1, 0, 'L');
    $pdf->CellFitSpace(18, 6, utf8_decode($asiento->getAsignado()), 1, 0, 'L');
    $pdf->Ln(); //Salto de línea para generar otra fila
}


// Comprobamos si existen datos 
if (isset($_SESSION['opcionesConsulta']) && isset($_SESSION['usuario'])) {
    
    $opcionesConsulta = $_SESSION['opcionesConsulta'];
    
    // Recuperamos los datos
    $listaAsientos = operacionesBD::listarAsientos($opcionesConsulta);
    
    // Mostramos en el listado la fecha y hora de los datos
    $fechaListado = date("d/m/Y");
    $horaListado = date("H:i");

    $numeroFilas = 0;
    foreach ($listaAsientos as $asiento) {
        // Si empezamos una página nueva le ponemos cabecera
        if ($numeroFilas == 0)
            cabeceraHorizontal($pdf, $asiento->getDiario(), $fechaListado, $horaListado);
        // Mostramos los datos
        datosHorizontal($pdf, $asiento);
        // Incrementamos el contador de filas
        $numeroFilas ++;
        // Al enseñar 29 elementos cambiamos de página
        if($numeroFilas == 29) {
            $numeroFilas = 0;
            // Creo una nueva página
            $pdf->AddPage('L', 'A4');
        }
    }
}

// Genero la salida
$pdf->Output();
?>