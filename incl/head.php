<?
    // DB connect
    include('connect.php');

    session_start();

    // last user info
    if (isset($_SESSION['uid'])) {
        $userId = $_SESSION['uid'];
        $sql = "SELECT * FROM user WHERE id = '$userId'";
        $user = $connect->query($sql)->fetch(PDO::FETCH_ASSOC);
    }

    // unauthorize
    if (isset($_GET['exit'])) {
        session_unset();

        echo '<script>document.location.href="./"</script>';
    }
?>