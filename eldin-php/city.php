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
                    World of Eldin City Information
                    <small>The Age of Oceans</small>
                </h1>
                <ol class="breadcrumb">
                    <li><a href=""><i class="fa fa-dashboard"></i> Home</a></li>
                    <li class="active">City Information</li>
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
                                    <th class="th-sm">City Name</th>
                                    <th class="th-sm">Owner</th>
                                    <th class="th-sm">City Rank</th>
                                    <th class="th-sm">Total Tiles</th>
                                    <th class="th-sm">Population</th>
                                    <th class="th-sm">Nation</th>
                                    <th class="th-sm">Has Market</th>
                                    <th id="nocontent" class="th-sm">Info</th>
                                </tr>
                            </thead>
                            <tbody>
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

								$sql = "SELECT * FROM cities";
								$result = $conn->query($sql);

								if ($result->num_rows > 0) {
                                    // output data of each row
                                    while($row = $result->fetch_assoc()) {
                                        $city_name = str_replace("'", "''", $row["City Name"]);
                                        $sql = "SELECT Username FROM own WHERE `City Name`='" . $city_name . "'";
                                        $own_result = $conn->query($sql);
                                        $owner = $own_result->fetch_assoc();

                                        $sql = "SELECT * FROM sells WHERE `City Name`='" . $city_name . "'";
                                        $market_result = $conn->query($sql);
                                        $has_market = "No";
                                        if ($market_result->num_rows > 0) {
                                            $has_market = "Yes";
                                        }
                                        echo "<tr>";
                                        //echo "<td>" . $row["City Name"] . "</td>";
                                        echo "<td><a href=\"citydetails.php?city=" . $row["City Name"] . "\" >" . $row["City Name"] . "</td>";
                                        echo "<td data-rank=\"1\"><a href=\userdetails.php?id=" . $owner['Username'] . ">"  . $owner['Username'] . "</a></td>";
                                        echo "<td  align=\"center\">" . $row["City Size"] . "</td>";
                                        echo "<td  align=\"center\"><string>" . $row["Total Tiles"] . "</string></td>";
                                        echo "<td  align=\"center\"><string>" . $row["Population"] . "</string></td>";
                                        echo "<td  align=\"center\"><string>" . str_replace("[Capital]", "♔", $row["Nation"]) . "</string></td>";
                                        echo "<td  align=\"center\"><string>" . $has_market . "</string></td>";
                                        echo "<td align=\"center\"><a href=\"citydetails.php?city=" . $row["City Name"] . "\" class=\"text-white btn btn-primary btn-sm m-0 pt-1 pb-1 pl-3 pr-3\">Details</td>";
                                        echo "</tr>";
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