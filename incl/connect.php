<?
    try {
        $connect = new PDO('mysql:host=localhost;dbname=z680', 'z680', 'b5bnCE8YJXBfycCZ');
    } catch (PDOException $e) {
        echo $e;
    }
?>