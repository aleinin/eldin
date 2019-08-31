 <?php
    echo '<!-- JQuery -->
    <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
    <!-- Bootstrap tooltips -->
    <script type="text/javascript" src="js/popper.min.js"></script>
    <!-- Bootstrap core JavaScript -->
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <!-- MDB core JavaScript -->
    <script type="text/javascript" src="js/mdb.js"></script>
    <script type="text/javascript" src="js/datatables.min.js"></script>
    <!-- Select2 -->
    <script src="js/select2.js"></script>
    <!-- SlimScroll -->
    <script src="js/jquery.js"></script>
    <!-- FastClick -->
    <script src="js/fastclick.js"></script>
    <!-- AdminLTE App -->
    <script src="js/app.js"></script>
    <!-- AdminLTE for demo purposes -->
    <script src="js/demo.js"></script>
    <script>
    $(document).ready(function() {
        $(\'#dtBasicExample\').DataTable({
            "paging": false // false to disable pagination (or any other option)
            
            
        });
        $(\'.dataTables_length\').addClass(\'bs-select\');
    });
    </script>
    <script>
    function rankSorter(a, b) {
        console.log(a + " " + b)
        if (a.rank < b.rank) return -1;
        if (a.rank > b.rank) return 1;
        return 0;
    }
    </script>
    <script>
    $(document).ready(function() {
        var element = document.getElementById("timestamp");
        //var currentTime = new Date(parseInt(element.innerHTML));
        var utc = element.innerHTML;
        var d = new Date(0);
        d.setUTCSeconds(utc);
        element.innerHTML = "Data last updated on " + d.toString();
    });
    </script>
    
    
    ';
?>