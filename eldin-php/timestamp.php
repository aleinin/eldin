<?php
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM updated";
$result = $conn->query($sql);

$row = $result->fetch_assoc();
echo "<p id=\"timestamp\">" . $row["timestamp"] . "</p>";
?>