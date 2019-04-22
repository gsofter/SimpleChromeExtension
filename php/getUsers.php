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
   
   $sql = 'SELECT * FROM Users';
   $retval = mysqli_query( $conn,$sql );
   
   if(! $retval ) {
      die('Could not get data: ' . mysqli_error());
   }
   
   $row = mysqli_fetch_array($retval,MYSQLI_ASSOC);

   $data = array();
   $curDate = Date("Y-m-d");
   if (mysqli_num_rows($retval) > 0) {
       // output data of each row
      $index = 0;
       while($row = mysqli_fetch_assoc($retval)) {

            $id = $row['id'];
            $data[$index] = $row;
            $squery = 'SELECT * FROM Calls where updated_at like "'.$curDate.'%" and user_id = '.$id;
            $result = mysqli_query( $conn,$squery );
            $data[$index]['numOfCalls'] = mysqli_num_rows($result);
            $index++;
       }
   } else {
       echo "0 results";
   }

   echo json_encode($data);
   mysqli_close($conn);
?>