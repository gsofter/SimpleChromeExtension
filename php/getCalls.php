<?php
   $dbhost = 'localhost:3306';
   // $dbhost = 'https://dial4.tiresandoil.com:2083';
   $dbuser = 'dial4_report';
   $dbpass = 'Password123';
   $database = 'dial4_clicktocall';
   
   $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$database);
   
   if(! $conn ) {
      die('Could not connect: ' . mysqli_error());
   }
   if (!isset($_POST['id'])) {
     die('undefined');
   }
   $id = $_POST['id'];
   $curDate = Date("Y-m-d");

   $sql = 'SELECT * FROM Calls where updated_at like "'.$curDate.'%" and user_id = '.$id;
   $retval = mysqli_query( $conn,$sql );
   
   if(! $retval ) {
      die('Could not get data: ' . mysqli_error());
   }
   
   $numOfRows = mysqli_num_rows($retval);

   echo json_encode($numOfRows);
   mysqli_close($conn);
?>