<!DOCTYPE html>
<html style="height: auto;">

<head>
    <?php
        include($_SERVER['DOCUMENT_ROOT'].'/htmlsnip/links.php');
        ?>
</head>

<body class="skin-blue layout-boxed sidebar-mini" style="height: auto;">
    <!-- Site wrapper -->
    <div class="wrapper" style="overflow: hidden; height: auto;">
        <?php
            include($_SERVER['DOCUMENT_ROOT'].'/htmlsnip/header.php');
            ?>


        <!-- =============================================== -->
        <!-- Left side column. contains the sidebar -->
        <aside class="main-sidebar">
            <!-- sidebar: style can be found in sidebar.less -->
            <section class="sidebar" style="height: auto;">
                <!-- sidebar menu: : style can be found in sidebar.less -->
                <ul class="sidebar-menu">
                    <li class="header">MAIN NAVIGATION</li>

                    <li>
                        <a href="index.php">
                            <i class="fa fa-address-book"></i> <span>Land Table</span>
                        </a>
                    </li>

                    <li class="active">
                        <a href="city.php">
                            <i class="fa fa-map-signs"></i> <span>City Information</span>
                        </a>
                    </li>
                    <li>
                        <a href="market.php">
                            <i class="fa fa-shopping-basket "></i> <span>Market Goods</span>
                        </a>
                    </li>
                    <li>
                        <a href="building.php">
                            <i class="fas fa-landmark "></i> <span> Buildings</span>
                        </a>
                    </li>


                </ul>
            </section>
            <!-- /.sidebar -->
        </aside>

        <!-- =============================================== -->
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper" style="min-height: 843px;">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <h1>
                    World of Eldin City Information / <?php echo $_GET['city']; ?>
                    <small>The Age of Oceans</small>
                </h1>
                <ol class="breadcrumb">
                    <li><a href=""><i class="fa fa-dashboard"></i> Home</a></li>
                    <li><a href="city.php"><i class="fa fa-dashboard"></i>City Information</a></li>
                    <li class="active">Details</li>
                </ol>
            </section>

            <!-- Main content -->
            <section class="content">

                <!-- Default box -->
                <div class="box box-success">
                    <div class="box-header with-border">
                        <h3 class="box-title"><?php echo $_GET['city']; ?> Details</h3>
                        <!--
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
                <i class="fa fa-minus"></i></button>
                <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove">
                <i class="fa fa-times"></i></button>
            </div>
            -->
                    </div>
                    <div class="box-body">


                        <table class="table table-condensed">
                            <tbody>
                                <tr>
                                    <?php
                                        echo '<td valign="top">';
                                        echo '<fieldset>';
                                        echo '<legend><strong>Basic Details</strong></legend>';
                                        include("login.php");
                                        $servername = "localhost";
                                        $username = USERNAME;
                                        $password = PASSWORD;
                                        $dbname = DATABASE;

                                        // Create connection
                                        $conn = new mysqli($servername, $username, $password, $dbname);
                                        // Check connection
                                        if ($conn->connect_error) {
                                                die("Connection failed: " . $conn->connect_error);
                                        }
                                        $cityname = str_replace("'", "''", $_GET['city']);
                                        $sql = "SELECT * FROM cities WHERE `City Name`='" . $cityname . "'";
                                        $result = $conn->query($sql);

                                                // output data of each row
                                        $row = $result->fetch_assoc();
                                        echo "City Name: " . $row["City Name"] . "<br>";
                                        echo "Coordinates: " . str_replace("to", "/", $row["Coordinates"]) . "<br>";
                                        echo "Nation: " . $row["Nation"] . "<br><br>";
                                        
                                        //find owners
                                        str_replace("'", "''", $_GET['city']);
                                        $sql = "SELECT * FROM own WHERE `City Name`='" . $cityname . "'";
                                        $own_result = $conn->query($sql);
                                        $i = 1;
                                        $ownerstr = "";
                                        while($own = $own_result->fetch_assoc()) {
                                            switch ($i) {
                                                case 1: 
                                                $ownerstr = "1st Owner: ";
                                                break;
                                                case 2: 
                                                $ownerstr = "2nd Owner: ";
                                                break;
                                                case 3: 
                                                $ownerstr = "3rd Owner: ";
                                                break;
                                            }
                                            echo $ownerstr;
                                            echo "<a class=\"city_link\" color=\"blue\" href=\"userdetails.php?id=" . $own["Username"] . "\">" . $own["Username"] . "</a><br><br>";
                                            $i++;
                                        }
                                        //find helpers
                                        $sql = "SELECT * FROM helps WHERE `City Name`='" . $cityname . "'";
                                        $help_result = $conn->query($sql);
                                        $i = 1;
                                        $helpstr = "";
                                        while($help = $help_result->fetch_assoc()) {
                                            switch ($i) {
                                                case 1: 
                                                $helpstr = "1st Helper: ";
                                                break;
                                                case 2: 
                                                $helpstr = "2nd Helper: ";
                                                break;
                                                case 3: 
                                                $helpstr = "3rd Helper: ";
                                                break;
                                                case 4: 
                                                $helpstr = "4th Helper: ";
                                                break;
                                                case 5: 
                                                $helpstr = "5th Helper: ";
                                                break;
                                            }
                                            echo $helpstr;
                                            echo "<a class=\"city_link\" color=\"blue\" href=\"userdetails.php?id=" . $help["Username"] . "\">" . $help["Username"] . "</a><br>";
                                            $i++;
                                        }
                                        echo '</fieldset>';
                                        echo '</td>';


                                        echo '<td valign="top">';
                                        echo '<fieldset>';
                                        echo '<legend><strong>Tiles Info</strong></legend>';
                                        echo "City Size: " . $row["City Size"] . "<br>";
                                        echo "Total Tiles: " . $row["Total Tiles"] . "<br>";
                                        echo "Max Sellable: " . $row["Max Sellable"] . "<br>";
                                        echo "Tiles Sold: " . $row["Tiles Sold"] . "<br>";
                                        echo "Population: " . $row["Population"] . "<br>";
                                        echo '</fieldset>';
                                        echo '</td>';
                                        
                                        echo '<td valign="top">';
                                        echo '<fieldset>';
                                        echo '<legend><strong>City Buildings</strong></legend>';
                                        $sql = "SELECT * FROM buildings WHERE `City Name`='" . $cityname . "'";
                                        $buildings_result = $conn->query($sql);
                                        while($build = $buildings_result->fetch_assoc()) {
                                            echo "<a class=\"city_link\" color=\"blue\" href=\"builddetails.php?build=" . $build["building"] . "\"/>" . $build["building"] . "<br>";
                                        }
                                        echo '</fieldset>';
                                        echo '</td>';

                                        echo '<td valign="top">';
                                        echo '<fieldset>';
                                        echo '<legend><strong>Servershop Items</strong></legend>';
                                        $sql = "SELECT * FROM sells WHERE `City Name`='" . $cityname . "'";
                                        $sell_result = $conn->query($sql);
                                        while($sell = $sell_result->fetch_assoc()) {
                                            $boostable_sql = "SELECT * FROM `goods` WHERE `Name` = '" . $sell["good"] . "' AND `Boostable` = 1";
                                            $boostable_result = $conn->query($boostable_sql);
                                            if ($boostable = $boostable_result->fetch_assoc()) {
                                                echo "<a class=\"city_link\" color=\"blue\" href=\"marketdetails.php?good=" . $sell["good"] . "\"/>" . $sell["good"] . " (T" . $sell["tier"] . ")" . "<br>";
                                            } else {
                                                echo "<a class=\"city_link\" color=\"blue\" href=\"marketdetails.php?good=" . $sell["good"] . "\"/>" . $sell["good"] . "<br>";
                                            }
                                        }
                                            
                                        echo '</fieldset>';
                                        echo '</td>';
                                        echo '
                                        </tr>
                                        </tbody>
                                        </table>


                                        </div>
                                        <!-- /.box-body
                                        <!-- /.box-footer-->
                                        </div>
                                        <!-- /.box -->

                                        <div class="box box-warning">
                                            <div class="box-body" width="50%">
                                                <h3>Residents:</h3>';
                                        $sql = "SELECT * FROM livesin WHERE `City Name`='" . $cityname . "'";
                                        $result = $conn->query($sql);

                                        if ($result->num_rows > 0) {
                                            // output data of each row
                                            echo '<table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%" data-toggle="table">
                                            <thead>
                                                <tr>
                                                    <th class="th-sm">Town</th>
                                                    <th class="th-sm">Tiles</th>
                                                </tr>
                                            </thead>
                                            <tbody>';
                                            while($row = $result->fetch_assoc()) {
                                                echo "<tr>";
                                                
                                                echo "<td><a class=\"city_link\" color=\"blue\" href=\"userdetails.php?id=" . $row["Username"] . "\"/>" . $row["Username"] ."</td>";
                                                echo "<td data-rank=\"1\">" . $row["Tiles"] . "</td>";
                                                echo "</tr>";
                                            }
                                            echo '</tbody>
                                            </tfoot>
                                        </table>';  
                                        
                                        include('timestamp.php');
                                        } else {
                                        echo "None<br><br>";
                                        include('timestamp.php');
                                        }
                                        
                                        $conn->close();
                                        ?>

                    </div>
                </div>

            </section>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->

        <?php
            include($_SERVER['DOCUMENT_ROOT'].'/htmlsnip/footer.php');
            ?>


    </div>
    <!-- ./wrapper -->

    <?php
        include($_SERVER['DOCUMENT_ROOT'].'/htmlsnip/scripts.php');
        ?>



</body>

</html>