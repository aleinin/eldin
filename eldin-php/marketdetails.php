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
                    <li class="active">
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
                    World of Eldin Market Goods / <?php echo $_GET['good']; ?>
                    <small>The Age of Oceans</small>
                </h1>
                <ol class="breadcrumb">
                    <li><a href=""><i class="fa fa-dashboard"></i> Home</a></li>
                    <li><a href="city.php"><i class="fa fa-dashboard"></i>Market Goods</a></li>
                    <li class="active">Details</li>
                </ol>
            </section>

            <!-- Main content -->
            <section class="content">

                <!-- Default box -->
                <div class="box box-success">
                    <div class="box-header with-border">
                        <h3 class="box-title"><?php echo $_GET['good']; ?> Details</h3>
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
                                            $good = $_GET['good'];
                                            $sql = "SELECT * FROM goods WHERE `Name`='" . $good . "'";
                                            $result = $conn->query($sql);

                                            if ($result->num_rows > 0) {
                                                    // output data of each row
                                                while($row = $result->fetch_assoc()) {
                                                    $boostable = "";
                                                    if ($row["Boostable"]) {
                                                        $boostable = "Yes";
                                                    } else {
                                                        $boostable = "No";
                                                    }
                                                    echo "Base Buy: " . $row["Buy"] . "<br>";
                                                    echo "Base Sell: " . $row["Sell"] . "<br>";
                                                    echo "Boostable?: " . $boostable . "<br><br>";
                                                    echo '</fieldset>
                                                    </td>';
                                                    if ($row["Boostable"]) {
                                                        echo '<td valign="top">
                                                        <fieldset>
                                                            <legend><strong>Boosted Prices</strong></legend>';
                                                        echo "T1 Sell: " . $row["T1"] . "<br>";
                                                        echo "T2 Sell: " . $row["T2"] . "<br>";
                                                        echo "T3 Sell: " . $row["T3"] . "<br>";
                                                        echo '</fieldset>
                                                    </td>';
                                                    }
                                                    
                                                }
                                            } else {
                                                echo "None";
                                            }
                                            $conn->close();
                                            ?>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- /.box -->

                <div class="box box-warning">
                    <div class="box-body" width="50%">
                        <h3>Traded in:</h3>
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
                        $good = $_GET['good'];
                        $sql = "SELECT * FROM sells WHERE `good`='" . $good . "'";
                        $result = $conn->query($sql);

                        if ($result->num_rows > 0) {
                                // output data of each row
                            echo '<table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%" data-toggle="table">
                            <thead>
                                <tr>
                                    <th class="th-sm">Town</th>
                                    <th class="th-sm">Buy</th>
                                    <th class="th-sm">Sell</th>
                                    <th class="th-sm">Tier</th>
                                </tr>
                            </thead>
                            <tbody>';
                            while($row = $result->fetch_assoc()) {
                                $price = 0;
                                $sql = "SELECT * FROM goods WHERE `Name`='" . $good . "'";
                                $price_query = $conn->query($sql);
                                $price_row = $price_query->fetch_assoc();
                                $tier = $row["tier"];
                                $tier_str = "T" . $tier;
                                if ($tier == 0) {
                                    $price = $price_row["Sell"];
                                    if ($price_row["Boostable"] == 0) {
                                        $tier_str = "Base (Not Boostable)";
                                    } 
                                } else {
                                    $price = $price_row[$tier_str];
                                }
                                echo "<tr>";
                                
                                echo "<td><a class=\"city_link\" color=\"blue\" href=\"citydetails.php?city=" . $row["City Name"] . "\"/>" . $row["City Name"] ."</td>";
                                echo "<td data-rank=\"1\">" . $price_row["Buy"] . "</td>";
                                echo "<td data-rank=\"1\">" . $price . "</td>";
                                echo "<td data-rank=\"1\">" . $tier_str . "</td>";
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