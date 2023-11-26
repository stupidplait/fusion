<? include('incl/head.php'); ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">
    <!-- scripts -->
    <script src="assets/js/common.js" defer></script>
    <?
        if (isset($_GET['page']) && ($_GET['page'] == 'catalog' || ($_GET['page'] == 'profile' && isset($user) && $user['roleId'] == 2))) {?>
            <script src="assets/js/swiper.js" defer></script>
        <?}

        if (!isset($_GET['page'])) {?>
            <script src="assets/js/home.js" defer></script>
        <?} else if (isset($_GET['page']) && $_GET['page'] == 'profile' && !isset($_SESSION['uid'])) {?>
            <script src="assets/js/authentication.js" defer></script>
        <?} else if (isset($_GET['page']) && ($_GET['page'] == 'about' || $_GET['page'] == 'catalog')) {?>
            <script src="assets/js/observer.js" defer></script>
        <?} else if (isset($_GET['page']) && $_GET['page'] == 'profile') {?>
            <script src="assets/js/profile.js" defer></script>
        <?}

        if (isset($_GET['page']) && $_GET['page'] == 'catalog') {?>
            <script src="assets/js/catalog.js" defer></script>
        <?}
    ?>
    <title>fusion</title>
</head>

<body>
    <!-- header -->
    <? include('incl/header.php'); ?>
    <!-- content -->
    <main>
        <?
            if (isset($_GET['page'])) {
                // profile
                if ($_GET['page'] == 'profile') include('incl/pages/profile.php');
                // about
                else if ($_GET['page'] == 'about') include('incl/pages/about.php');
                // catalog
                else if ($_GET['page'] == 'catalog') include('incl/pages/catalog.php');
                // to home
                else echo '<script>document.location.href="./"</script>';
            } else {
                // home
                include('incl/pages/home.php');
            }
        ?>
    </main>
    <?
        // footer
        include('incl/footer.php');
        // navigation
        include('incl/navigation.php');
    ?>
</body>

</html>