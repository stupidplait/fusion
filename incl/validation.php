<?
    include('head.php');

    $response = ['flag' => true];
    $params = [];

    if (isset($_POST['signup'])) {
        $params['name'] = $_POST['userName'];
        $params['login'] = $_POST['login'];
        $params['email'] = $_POST['email'];
        $params['phone'] = $_POST['phone'];
        $params['password'] = $_POST['password'];

        $sql = "SELECT * FROM user WHERE login = :login";

        $prepare = $connect->prepare($sql);
        $prepare->execute(['login' => $params['login']]);

        $existingLogin = $prepare->fetch(PDO::FETCH_ASSOC);

        if ($existingLogin) {
            $response['login'] = 'Login already taken';
            $response['flag'] = false;
        }

        $sql = "SELECT * FROM user WHERE email = :email";

        $prepare = $connect->prepare($sql);
        $prepare->execute(['email' => $params['email']]);

        $existingEmail = $prepare->fetch(PDO::FETCH_ASSOC);
        
        if ($existingEmail) {
            $response['email'] = 'Email already taken';
            $response['flag'] = false;
        }

        if ($response['flag']) {
            $params['password'] = password_hash($params['password'], PASSWORD_DEFAULT);
            $response['result'] = 'You\'ve successfully signed up!';

            $sql = "INSERT INTO user (name, login, email, phone, password) VALUES (:name, :login, :email, :phone, :password)";
            $connect->prepare($sql)->execute($params);

            $sql = "SELECT * FROM user WHERE login = :login";
            
            $prepare = $connect->prepare($sql);
            $prepare->execute(['login' => $params['login']]);

            $userId = $prepare->fetch(PDO::FETCH_ASSOC)['id'];

            $sql = "INSERT INTO cart (userId) VALUES ('$userId')";
            $connect->query($sql);
        }
    } else if (isset($_POST['signin'])) {
        $login = $_POST['login'];
        $password = $_POST['password'];

        $sql = "SELECT * FROM user WHERE login = :login";

        $prepare = $connect->prepare($sql);
        $prepare->execute(['login' => $login]);

        $existingUser = $prepare->fetch(PDO::FETCH_ASSOC);

        if (!$existingUser) {
            $response['login'] = 'Incorrect login';
            $response['flag'] = false;
        } else if (!password_verify($password, $existingUser['password'])) {
            $response['password'] = 'Wrong password';
            $response['flag'] = false;
        }

        if ($response['flag']) {
            $response['result'] = 'You\'ve successfully signed in!';
            $_SESSION['uid'] = $existingUser['id'];
        }
    } else if (isset($_POST['updateProfile'])) {
        $params['name'] = $_POST['userName'];
        $params['email'] = $_POST['email'];
        $params['phone'] = $_POST['phone'];
        $params['password'] = $_POST['newPassword'];
        $oldPassword = $_POST['oldPassword'];

        if ($_FILES['userImage']['name'] == null) {
            $params['image'] = $user['image'];
        } else {
            if ($user['image'] != 'assets/img/common/user-placeholder.png') unlink('../' . $user['image']);

            $params['image'] = '../assets/img/users/' . time() . $_FILES['userImage']['name'];
            move_uploaded_file($_FILES['userImage']['tmp_name'], $params['image']);

            $params['image'] = substr($params['image'], 3);
        }

        $sql = "SELECT * FROM user WHERE email = :email AND id != '$userId'";

        $prepare = $connect->prepare($sql);
        $prepare->execute(['email' => $params['email']]);

        $existingEmail = $prepare->fetch(PDO::FETCH_ASSOC);

        if ($existingEmail) {
            $response['email'] = 'Email already busy';
            $response['flag'] = false;
        } else if ($oldPassword && !password_verify($oldPassword, $user['password'])) {
            $response['password'] = 'Wrong password';
            $response['flag'] = false;
        }

        if($response['flag']) {
            $response['result'] = 'Data successfully updated!';

            if ($params['password']) {
                $params['password'] = password_hash($params['password'], PASSWORD_DEFAULT);
            } else {
                $params['password'] = $user['password'];
            }

            $sql = "UPDATE user SET name = :name,
                                    email = :email,
                                    phone = :phone,
                                    password = :password,
                                    image = :image
                                    WHERE id = '$userId'";

            $prepare = $connect->prepare($sql);
            $prepare->execute($params);
        }
    } else if (isset($_POST['consultate']) || isset($_POST['consultateModal'])) {
        $params['phone'] = $_POST['phone'];
        $params['name'] = $_POST['userName'];

        $sql = "SELECT * FROM consultation WHERE phone = :phone";

        $prepare = $connect->prepare($sql);
        $prepare->execute(['phone' => $params['phone']]);

        $existingPhone = $prepare->fetch(PDO::FETCH_ASSOC);

        if ($existingPhone) {
            $response['phone'] = 'Phone is already exists';
            $response['flag'] = false;
        }

        if ($response['flag']) {
            $response['result'] = 'Thanks for your subscription!';

            $sql = "INSERT INTO consultation (name, phone) VALUES (:name, :phone)";

            $prepare = $connect->prepare($sql);
            $prepare->execute($params);
        }
    } else if (isset($_POST['addCategory'])) {
        $params['categoryName'] = $_POST['userName'];

        $sql = "INSERT INTO category (name) VALUES (:categoryName)";

        $prepare = $connect->prepare($sql);
        $prepare->execute($params);

        $sql = "SELECT * FROM category ORDER BY id DESC LIMIT 1";
        $categoryId = $connect->query($sql)->fetch(PDO::FETCH_ASSOC)['id'];

        $response['result'] = 'Category added successfully!';
        $response['name'] = $params['categoryName'];
        $response['id'] = $categoryId;
    } else if (isset($_POST['addProduct'])) {
        $params['productName'] = $_POST['productName'];
        $params['about'] = $_POST['about'];
        $params['price'] = $_POST['price'];
        $params['colorScheme'] = $_POST['colorScheme'];
        $params['materials'] = $_POST['materials'];
        $params['elements'] = $_POST['elements'];
        $params['categoryId'] = $_POST['categoryId'];
        $params['image'] = '../assets/img/interiors/' . time() . $_FILES['productImage']['name'];
        move_uploaded_file($_FILES['productImage']['tmp_name'], $params['image']);

        $params['image'] = substr($params['image'], 3);

        $sql = "SELECT * FROM category WHERE id = :categoryId";

        $prepare = $connect->prepare($sql);
        $prepare->execute(['categoryId' => $params['categoryId']]);

        $existingCategory = $prepare->fetch(PDO::FETCH_ASSOC);

        if (!$existingCategory) {
            $response['flag'] = false;
            $response['categoryId'] = 'Invalid category';
        }

        if ($response['flag']) {
            $response['result'] = 'Product added successfully!';

            $sql = "INSERT INTO product (name, about, price, colorScheme, materials, elements, image, categoryId) VALUES (:productName, :about, :price, :colorScheme, :materials, :elements, :image, :categoryId)";

            $prepare = $connect->prepare($sql);
            $prepare->execute($params);

            $sql = "SELECT id FROM product ORDER BY id DESC LIMIT 1";
            $productId = $connect->query($sql)->fetch(PDO::FETCH_ASSOC)['id'];

            $response['id'] = $productId;
            $response['name'] = $params['productName'];
            $response['price'] = $params['price'];
            $response['image'] = $params['image'];
        }
    } else if (isset($_POST['editProduct'])) {
        $productId = $_POST['productId'];

        $params['productName'] = $_POST['productName'];
        $params['about'] = $_POST['about'];
        $params['price'] = $_POST['price'];
        $params['colorScheme'] = $_POST['colorScheme'];
        $params['materials'] = $_POST['materials'];
        $params['elements'] = $_POST['elements'];
        $params['categoryId'] = $_POST['categoryId'];

        $sql = "SELECT image FROM product WHERE id = '$productId'";
        $productImage = $connect->query($sql)->fetch(PDO::FETCH_ASSOC)['image'];

        if ($_FILES['userImage']['name'] == null) {
            $params['image'] = $productImage;
        } else {
            unlink('../' . $productImage);

            $params['image'] = '../assets/img/users/' . time() . $_FILES['userImage']['name'];
            move_uploaded_file($_FILES['userImage']['tmp_name'], $params['image']);

            $params['image'] = substr($params['image'], 3);
        }

        $sql = "SELECT * FROM category WHERE id = :categoryId";

        $prepare = $connect->prepare($sql);
        $prepare->execute(['categoryId' => $params['categoryId']]);

        $existingCategory = $prepare->fetch(PDO::FETCH_ASSOC);

        if (!$existingCategory) {
            $response['flag'] = false;
            $response['categoryId'] = 'Invalid category';
        }

        if ($response['flag']) {
            $response['result'] = 'Product edited successfully!';

            $sql = "UPDATE product SET name = :productName,
                                        about = :about,
                                        price = :price,
                                        colorScheme = :colorScheme,
                                        materials = :materials,
                                        elements = :elements,
                                        categoryId = :categoryId,
                                        image = :image
                                        WHERE id = '$productId'";

            $prepare = $connect->prepare($sql);
            $prepare->execute($params);

            $response['id'] = $productId;
            $response['name'] = $params['productName'];
            $response['price'] = $params['price'];
            $response['image'] = $params['image'];
        }
    } else if (isset($_POST['createOrder'])) {
        $userId = $_POST['userId'];
        $products = array_unique($_POST['productId']);
        $statusId = $_POST['statusId'];
        $price = $_POST['price'];
        $date = time() * 1000;

        $sql = "INSERT INTO `order` (userId, statusId, date, total) VALUES ('$userId', '$statusId', '$date', '$price')";
        $connect->query($sql);

        $sql = "SELECT `order`.*, orderStatus.name AS statusName, user.name FROM `order` INNER JOIN orderStatus ON `order`.statusId = orderStatus.id INNER JOIN user ON `order`.userId = user.id ORDER BY id DESC LIMIT 1";
        $order = $connect->query($sql)->fetch(PDO::FETCH_ASSOC);
        $orderId = $order['id'];

        foreach ($products as $productId) {
            $sql = "INSERT INTO orderItem (orderId, productId) VALUES ('$orderId', '$productId')";
            $connect->query($sql);
        }

        $sql = "SELECT orderItem.*, product.*, category.name AS category FROM orderItem INNER JOIN product ON orderItem.productId = product.id INNER JOIN category ON product.categoryId = category.id WHERE orderId = '$orderId'";
        $orderItems = $connect->query($sql)->fetchAll(PDO::FETCH_ASSOC);

        $response['result'] = 'Order created!';
        array_push($response, (object) [
            'order' => $order,
            'orderItems' => $orderItems
        ]);
    } else if (isset($_POST['makeReview'])) {
        $orderId = $_POST['orderId'];
        $params['text'] = $_POST['text'];
        $params['rating'] = $_POST['rating'];
        $params['productId'] = $_POST['productId'];
        $date = time() * 1000;

        $sql = "INSERT INTO reviews (userId, productId, text, rating, date) VALUES ('$userId', :productId, :text, :rating, '$date')";

        $prepare = $connect->prepare($sql);
        $prepare->execute($params);

        $sql = "UPDATE `order` SET statusId = '3' WHERE id = '$orderId'";
        $connect->query($sql);


        $response['result'] = 'Thanks for review! :)';
    }

    echo json_encode($response);
?>