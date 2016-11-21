<?php
// Antes de nada inicio una nueva sesión o reanudo la existente
session_start();


// Establecemos por defecto la zona horaria
date_default_timezone_set('Europe/Berlin');


if (!isset($_SESSION['usuario'])) {    
    // Borramos los datos de la sesión
    session_unset();
    // Redirigimos a la pantalla inicial
    header("Location: index.php");
}


// Comprobamos si queremos regresar a la página anterior
if (isset($_POST['regresar'])) {
    // Redirigimos a la pantalla de Asientos Diario
    header("Location: asientosDiario.php");
}


// Comprobamos si queremos desconectar la página
if (isset($_POST['desconectar'])) {
    // Borramos los datos de la sesión
    session_unset();
    // Redirigimos a la pantalla inicial
    header("Location: index.php");
}

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <!-- Primero incluimos los estilos de la página -->
        <link href="estilos/estiloAdminDiario.css" rel="stylesheet" type="text/css">
        <link href="estilos/estiloComunProyecto.css" rel="stylesheet" type="text/css">
        <!-- Por último incluimos los Script que utilizaremos -->
        <script src="misIncludes/jquery-3.1.1.js" type="text/javascript"></script>
        <script src="misScript/comunJS.js" type="text/javascript"></script>
        <script src="misScript/operacionesAdminDiarioJS.js" type="text/javascript"></script>
        <title>Administrar Diario Paralelo</title>
    </head>
    <body>
        
        <!-- Zona de Información -->
        <div id="bloqueInformacion">
            <div id="contenedorBotonInformacion">
                <input type="button" id="botonInformacion" name="botonInformacion" value="" />
                <div id="contenedorInformacion">
                    <div id="contenedorTextoIndormacion"></div>
                </div>
            </div>           
            <div class="cancelarFlotantes"></div>
        </div>
        

        <!-- Zona para mostrar las acciones realizadas -->
        <div id="contenedorZonaAcciones">                
            <div id="zonaAcciones">
                <div id="zonaTextoAcciones">
                    <label id="portadaAcciones">Acciones:</label>
                    <div id="contenedorTextoIncidencias">
                        <textarea class='contenedorIncidencias' cols='54' rows='22' readonly></textarea>
                    </div>                                
                </div>
                <div id="zonaBotonAcciones">
                    <input type="button" id="cerrarAcciones" name="cerrarAcciones"/>
                </div>
            </div>
        </div>


        <!-- Zona para mostrar los botones Generales de Control -->
        <div id="zonaControl">
            <form id="formularioControl" name="formularioBusqueda" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">

                <!-- Zona de MENU - BOTONES -->
                <div id="menuBotones">
                    <div id="menuBotones1">                                                         
                        <div id="botonRegresar" class="contenBotonMenu"> 
                            <input type="submit" id="regresar" class="botonMenu" name="regresar" value="Volver"/>                                                                                              
                        </div>
                        <div id="botonMostrarAcciones" class="contenBotonMenu"> 
                            <input type="button" id="mostrarAcciones" class="botonMenu" name="mostrarAcciones" value="Acciones" />
                        </div>
                        <div class="cancelarFlotantes"></div>
                    </div>
                    <div id = "menuBotones2">
                        <div id="botonDesconectar">
                            <input type="submit" id="desconectar" class="botonMenu" name="desconectar" value="Desconectar" />
                        </div>  
                        <div class="cancelarFlotantes"></div>
                    </div>                        
                    <div class="cancelarFlotantes"></div>
                </div>  

            </form>
        </div>

        <!-- ZONA PARA MOSTRAR LOS CONTROLES DEL DIARIO PARALELO -->
        <div id="zonaMostrar">                
            <fieldset id="contenZonaMostrar">
                <legend id="legendAñadir">Control sobre los Diarios Paralelos:</legend>
                <div id="zonaRelacionControles">

                    <?php
                    if (isset($_SESSION['usuario'])) {
                        // Si tenemos el rol adecuado mostramos la posibilidad de crear nuevos asientos
                        if ($_SESSION['usuario']['rol'] == 0 || $_SESSION['usuario']['rol'] == 1){
                            
                            //-- Zona de control PARA ASIENTOS --
                            echo "<div class='bloqueControl'>";
                                echo "<div class='contenBotonActivar'>";
                                    echo "<div class='contenTextoBoton'>Añadir</br>Asientos</div>";
                                echo "</div>";
                                echo "<div id='contenZonaUnioID' class='contenZonaUnion'>";
                                    echo "<div class='contenUnionDivision'></div>";
                                echo "</div>";
                                echo "<div id='contenZonaDatosAsiento' class='contenZonaDatos'></div>";
                                echo "<div class='cancelarFlotantes'></div>";
                            echo "</div>";                
                            
                        }

                        // Si tenemos el rol adecuado mostramos la posibilidad de crear nuevos diarios
                        if ($_SESSION['usuario']['rol'] == 0 || $_SESSION['usuario']['rol'] == 1) {
                            
                            //-- Zona de control PARA CREAR NUEVO DIARIO --
                            echo "<div class='bloqueControl'>";
                                echo "<div class='contenBotonActivar'>";
                                    echo "<div class='contenTextoBoton'>Crear</br>Diario</div>";
                                echo "</div>";
                                echo "<div id='contenZonaUnionCrearDiario' class='contenZonaUnion'>";
                                    echo "<div class='contenUnionDivision'></div>";
                                echo "</div>";

                                echo "<div id='contenZonaDatosCrearDiario' class='contenZonaDatos'></div>";
                                echo "<div class='cancelarFlotantes'></div>";
                            echo "</div>";
                        }

                        // Si tenemos el rol adecuado mostramos la posibilidad de cerrar/abrir diarios
                        if ($_SESSION['usuario']['rol'] == 0 || $_SESSION['usuario']['rol'] == 1){
                            
                            //-- Zona de control ABRIR/CERRAR DIARIOS --
                            echo "<div class='bloqueControl'>";
                                echo "<div class='contenBotonActivar'>";
                                    echo "<div class='contenTextoBoton'><label>Abrir</br>Cerrar</br>Diario</label></div>";
                                echo "</div>";
                                echo "<div id='contenZonaUnionAbrirCerrarDiario' class='contenZonaUnion'>";
                                    echo "<div class='contenUnionDivision'></div>";
                                echo "</div>";

                                echo "<div id='contenZonaDatosAbrirCerrarDiario' class='contenZonaDatos'></div>";
                                echo "<div class='cancelarFlotantes'></div>";
                            echo "</div>";                            
                        }
                    }
                    ?>

                </div>
            </fieldset>
        </div>         

    </body>
</html>
