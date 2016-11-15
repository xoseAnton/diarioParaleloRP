<?php

// Inserto la clase para trabajar con PDF
require_once 'fpdf.php';

class miPDF extends FPDF {
    
    // Ajustar texto en las celdas       
    
    function CellFit($w, $h = 0, $txt = '', $border = 0, $ln = 0, $align = '', $fill = false, $link = '', $scale = false, $force = true) {
                
        // Obtenemos el ancho de la cadena de texto
        $str_width = $this->GetStringWidth($txt);
        
        // Para no tener problemas de división por cero
        if($str_width == 0)
            $str_width = 1;

        // Calculamos la proporción con la celda
        if ($w == 0)
            $w = $this->w - $this->rMargin - $this->x;
        $ratio = ($w - $this->cMargin * 2) / $str_width;

        $fit = ($ratio < 1 || ($ratio > 1 && $force));
        if ($fit) {
            if ($scale) {
                // Calculamos la escala horizontal
                $horiz_scale = $ratio * 100.0;
                // Ajuste de la escala horizontal
                $this->_out(sprintf('BT %.2F Tz ET', $horiz_scale));
            } else {
                //Calculamos el espacio entre caracteres
                $char_space = ($w - $this->cMargin * 2 - $str_width) / max($this->MBGetStringLength($txt) - 1, 1) * $this->k;
                //Espacio entre caracteres
                $this->_out(sprintf('BT %.2F Tc ET', $char_space));
            }
            // Ignoramos el uso de alineamiento
            $align = '';
        }

        // Paso los datos a la celda
        $this->Cell($w, $h, $txt, $border, $ln, $align, $fill, $link);

        // Restablezco el espacio entre caracteres, escala horizontal
        if ($fit)
            $this->_out('BT ' . ($scale ? '100 Tz' : '0 Tc') . ' ET');
    }

    function CellFitSpace($w, $h = 0, $txt = '', $border = 0, $ln = 0, $align = '', $fill = false, $link = '') {
        $this->CellFit($w, $h, $txt, $border, $ln, $align, $fill, $link, false, false);
    }

    // Función para trabajar también con CJK texto double-byte
    function MBGetStringLength($s) {
        if ($this->CurrentFont['type'] == 'Type0') {
            $len = 0;
            $nbbytes = strlen($s);
            for ($i = 0; $i < $nbbytes; $i++) {
                if (ord($s[$i]) < 128)
                    $len++;
                else {
                    $len++;
                    $i++;
                }
            }
            return $len;
        } else
            return strlen($s);
    }
 //Fin del código para ajustar texto   
    
}

?>