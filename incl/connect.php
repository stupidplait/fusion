<?
    try {
        $connect = new PDO('mysql:host=localhost;dbname=fusion', 'root', '');
    } catch (PDOException $e) {
        echo $e;
    }
?>