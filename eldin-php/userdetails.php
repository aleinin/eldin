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
        <aside class="main-sidebar">
            <!-- sidebar: style can be found in sidebar.less -->
            <section class="sidebar" style="height: auto;">
                <!-- sidebar menu: : style can be found in sidebar.less -->
                <ul class="sidebar-menu">
                    <li class="header">MAIN NAVIGATION</li>

                    <li class="active">
                        <a href="index.php">
                            <i class="fa fa-address-book"></i> <span>Land Table</span>
                        </a>
                    </li>

                    <li>
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
                    World of Eldin Land Table / <?php echo $_GET['id']; ?>
                    <small>The Age of Oceans</small>
                </h1>
                <ol class="breadcrumb">
                    <li><a href=""><i class="fa fa-dashboard"></i> Home</a></li>
                    <li><a href="index.php"><i class="fa fa-dashboard"></i>Land Table</a></li>
                    <li class="active">Details</li>
                </ol>
            </section>

            <!-- Main content -->
            <section class="content">

                <!-- Default box -->
                <div class="box box-success">
                    <div class="box-header with-border">
                        <h3 class="box-title"><?php echo $_GET['id']; ?> Details</h3>
                    </div>
                    <div class="box-body">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td valign="top">
                                        <fieldset>
                                            <legend><strong>Info</strong></legend>
                                            <?php
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
                                            $un = $_GET['id'];
                                            $sql = "SELECT * FROM people WHERE `Username`='" . $un . "'";
                                            $result = $conn->query($sql);

                                            if ($result->num_rows > 0) {
                                                    // output data of each row
                                                while($row = $result->fetch_assoc()) {
                                                    echo "Rank: " . $row["Rank"] . "<br><br>";
                                                    echo "<legend><strong>Tile Ownership:</strong></legend>";
                                                    echo "Total Tiles: " . $row["Total"] . "<br>";
                                                    echo "Wild Tiles: " . $row["Wild"] . "<br>";
                                                    echo "City Tiles: " . $row["City"] . "<br>";
                                                    echo "Nether Tiles: " . $row["Nether"] . "<br>";
                                                    echo "End Tiles: " . $row["End"] . "<br>";
                                                }
                                            } else {
                                                echo "None";
                                            }
                                            echo 
                                            '   </fieldset>
                                            </td>
                                            <td valign="top">
                                                <fieldset>
                                                    <legend><strong>Helper in</strong></legend>';

                                            $sql = "SELECT * FROM helps WHERE `Username`='" . $un . "'";
                                            $result = $conn->query($sql);

                                            if ($result->num_rows > 0) {
                                                // output data of each row
                                                while($row = $result->fetch_assoc()) {
                                                    echo "<a class=\"city_link\" color=\"blue\" href=\"citydetails.php?city=" . $row["City Name"] . "\"/>" . $row["City Name"];
                                                }
                                            } else {
                                                echo "None";
                                            }
                                            echo 
                                            '   </fieldset>
                                            </td>
                                            <td valign="top">
                                                <fieldset>
                                                    <legend><strong>Owner of</strong></legend>';


                                            $sql = "SELECT * FROM own WHERE `Username`='" . $un . "'";
                                            $result = $conn->query($sql);

                                            if ($result->num_rows > 0) {
                                                // output data of each row
                                                while($row = $result->fetch_assoc()) {
                                                    echo "<a class=\"city_link\" href=\"citydetails.php?city=" . $row["City Name"] . "\"/>" . $row["City Name"];
                                                }
                                            } else {
                                                echo "None";
                                            }
                                            $conn->close();
                                            ?>
                                        </fieldset>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- /.box -->

                <div class="box box-warning">
                    <div class="box-body" width="50%">
                        <h3>Resident of:</h3>
                        <?php
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
                        $un = $_GET['id'];
                        $sql = "SELECT * FROM livesin WHERE `Username`='" . $un . "'";
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
                                        
                                        echo "<td>" . "<a class=\"city_link\" color=\"blue\" href=\"citydetails.php?city=" . $row["City Name"] . "\">" . $row["City Name"] . "</a>" . "</td>";
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