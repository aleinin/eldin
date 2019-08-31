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

                    <li>
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
                    <li class="active">
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
                    World of Eldin Buildings / <?php echo $_GET['build']; ?>
                    <small>The Age of Oceans</small>
                </h1>
                <ol class="breadcrumb">
                    <li><a href=""><i class="fa fa-dashboard"></i> Home</a></li>
                    <li><a href="building.php"><i class="fa fa-dashboard"></i>Buildings</a></li>
                    <li class="active">Details</li>
                </ol>
            </section>

            <!-- Main content -->
            <section class="content">

                <!-- Default box -->
                <div class="box box-success">
                    <!-- /.box -->

                    <div class="box box-warning">
                        <div class="box-body" width="50%">
                            <h3>Found in:</h3>
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
                        $build = $_GET['build'];
                        $sql = "SELECT * FROM buildings WHERE `building`='" . $build . "'";
                        $result = $conn->query($sql);

                        if ($result->num_rows > 0) {
                                // output data of each row
                            echo '<table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%" data-toggle="table">
                            <thead>
                                <tr>
                                    <th class="th-sm">Town</th>
                                </tr>
                            </thead>
                            <tbody>';
                            while($row = $result->fetch_assoc()) {
                                echo "<tr>";
                                echo "<td><a class=\"city_link\" color=\"blue\" href=\"citydetails.php?city=" . $row["City Name"] . "\" >" . $row["City Name"] . "</td>";
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