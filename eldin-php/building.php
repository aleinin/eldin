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
                    World of Eldin Buildings
                    <small>The Age of Oceans</small>
                </h1>
                <ol class="breadcrumb">
                    <li><a href=""><i class="fa fa-dashboard"></i> Home</a></li>
                    <li class="active">Buildings</li>
                </ol>
            </section>

            <!-- Main content -->
            <section class="content">

                <!-- Post Form Confirmation -->
                <!-- Default Password Warning -->

                <!-- Default box -->
                <div class="box">
                    <div class="box-body">
                        <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0"
                            width="100%" data-toggle="table">
                            <thead>
                                <tr>
                                    <th class="th-sm">Building Name</th>
                                    <th class="th-sm">Found in ___ cities</th>
                                    <th id="nocontent" class="th-sm">More Info</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                include("login.php");
                                include("whitelist.php");
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

								$sql = "SELECT DISTINCT `building` FROM `buildings`"; 
								$result = $conn->query($sql);

								if ($result->num_rows > 0) {
                                    // output data of each row
                                    while($row = $result->fetch_assoc()) {
                                        $num_landmark = "SELECT * FROM buildings WHERE building = '" . $row["building"] . "'";
                                        $num_result = $conn->query($num_landmark);
                                        $num_contains = $num_result->num_rows;
                                        if (in_array($row["building"], $whitelist)) {
                                            echo "<tr>";
                                            //echo "<td>" . $row["City Name"] . "</td>";
                                            echo "<td><a href=\"builddetails.php?build=" . $row["building"] . "\" >" . $row["building"] . "</td>";
                                            //echo "<td>" . $row["building"] . "</td>";
                                            echo "<td>" . $num_contains . "</td>";
                                            echo "<td><a href=\"builddetails.php?build=" . $row["building"] . "\" class=\"text-white btn btn-primary btn-sm m-0 pt-1 pb-1 pl-3 pr-3\">More Details</td>";
                                            echo "</tr>";
                                        }
                                        
                                    }
								} else {
                                    echo "0 results";
								}
								$conn->close();
								?>
                            </tbody>
                            </tfoot>
                        </table>
                        <?php
                        include('timestamp.php');
                        ?>
                    </div>
                    <!-- /.box-body -->
                    <!-- /.box-footer-->
                </div>
                <!-- /.box -->

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