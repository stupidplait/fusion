<?
    include('head.php');

    $receiver = json_decode(file_get_contents('php://input'), true);
    
    if ($receiver['action'] == 'showProducts') {
        $productsPerPage = 4;
        $startPosition = $receiver['counter'];

        $categories = $receiver['indexes'];
        $name = $receiver['name'];

        $sql = "SELECT * FROM product";
        if (count($categories)) {
            $sql .= " WHERE categoryId IN (" . implode(',', $categories) . ")";

            if ($name) $sql .= " AND name LIKE '%$name%'";
        } else if ($name) $sql .= " WHERE name LIKE '%$name%'";

        $sql .= " LIMIT $startPosition,$productsPerPage";

        $products = $connect->query($sql)->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($products);
    } else if ($receiver['action'] == 'showProduct') {
        $productId = $receiver['id'];

        $sql = "SELECT product.*, category.name AS category FROM product INNER JOIN category ON product.categoryId = category.id WHERE product.id = '$productId'";
        $product = $connect->query($sql)->fetch(PDO::FETCH_ASSOC);

        echo json_encode($product);
    } else if ($receiver['action'] == 'showReviews') {
        $productId = $receiver['productId'];

        $sql = "SELECT reviews.text, reviews.date, reviews.rating, user.name, user.image FROM reviews INNER JOIN user ON reviews.userId = user.id WHERE reviews.productId = '$productId'";

        switch ($receiver['sort']) {
            case 'Date ASC':
                $sql .= ' ORDER BY reviews.date';
                break;
            case 'Date DESC':
                $sql .= ' ORDER BY reviews.date DESC';
                break;       
            case 'Rating ASC':
                $sql .= ' ORDER BY reviews.rating';
                break;
            case 'Rating DESC':
                $sql .= ' ORDER BY reviews.rating DESC';
                break;
        }

        $reviews = $connect->query($sql)->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($reviews);
    } else if ($receiver['action'] == 'addToCart') {
        if (isset($_SESSION['uid'])) {
            $productId = $receiver['productId'];

            $sql = "SELECT * FROM cart WHERE userId = '$userId'";
            $cartId = $connect->query($sql)->fetch(PDO::FETCH_ASSOC)['id'];

            $sql = "SELECT * FROM cartItem WHERE cartId = '$cartId' AND productId = '$productId'";
            $existingItem = $connect->query($sql)->fetch(PDO::FETCH_ASSOC);

            if ($existingItem) {
                $response['message'] = 'Product is already in the cart';
            } else {
                $sql = "INSERT INTO cartItem (cartId, productId) VALUES ('$cartId', '$productId')";
                $connect->query($sql);

                $response['message'] = 'Product added successfully!';
            }
        } else {
            $response['message'] = 'You don\'t have permission!';
        }

        echo json_encode($response);
    } else if ($receiver['action'] == 'showCart') {
        $sql = "SELECT * FROM cart WHERE userId = '$userId'";
        $cartId = $connect->query($sql)->fetch(PDO::FETCH_ASSOC)['id'];

        $sql = "SELECT SUM(product.price) AS total FROM cartItem INNER JOIN product ON cartItem.productId = product.id WHERE cartItem.cartId = '$cartId'";
        $cartTotal = $connect->query($sql)->fetch(PDO::FETCH_ASSOC)['total'];

        $sql = "SELECT * FROM cartItem INNER JOIN product ON cartItem.productId = product.id WHERE cartItem.cartId = '$cartId'";
        $cartItems = $connect->query($sql)->fetchAll(PDO::FETCH_ASSOC);

        $response['userId'] = $userId;
        $response['id'] = $cartId;
        $response['total'] = $cartTotal;
        $response['cartItems'] = $cartItems;

        echo json_encode($response);
    } else if ($receiver['action'] == 'deleteCart') {
        $sql = "SELECT * FROM cart WHERE userId = '$userId'";
        $cartId = $connect->query($sql)->fetch(PDO::FETCH_ASSOC)['id'];

        $sql = "DELETE FROM cartItem WHERE cartId = '$cartId'";
        $connect->query($sql);
    } else if ($receiver['action'] == 'makeOrder') {
        $timestamp = time() * 1000;

        $sql = "SELECT * FROM cart WHERE userId = '$userId'";
        $cartId = $connect->query($sql)->fetch(PDO::FETCH_ASSOC)['id'];

        $sql = "SELECT SUM(product.price) AS total FROM cartItem INNER JOIN product ON cartItem.productId = product.id WHERE cartItem.cartId = '$cartId'";
        $cartTotal = $connect->query($sql)->fetch(PDO::FETCH_ASSOC)['total'];

        $sql = "INSERT INTO `order` (userId, date, total) VALUES ('$userId', '$timestamp', '$cartTotal')";
        $connect->query($sql);

        $sql = "SELECT * FROM `order` WHERE userId = '$userId' ORDER BY id DESC LIMIT 1";
        $orderId = $connect->query($sql)->fetch(PDO::FETCH_ASSOC)['id'];

        $sql = "SELECT * FROM cartItem WHERE cartId = '$cartId'";
        $cartItems = $connect->query($sql)->fetchAll(PDO::FETCH_ASSOC);

        foreach ($cartItems as $cartItem) {
            $productId = $cartItem['productId'];

            $sql = "INSERT INTO orderItem (orderId, productId) VALUES ('$orderId', '$productId')";
            $connect->query($sql);
        }

        $sql = "DELETE FROM cartItem WHERE cartId = '$cartId'";
        $connect->query($sql);

        $response['message'] = 'We accepted your order!';

        echo json_encode($response);
    } else if ($receiver['action'] == 'showOrders') {
        $sql = "SELECT * FROM `order` WHERE userId = '$userId' ORDER BY id DESC";
        $orders = $connect->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        $response = [];

        foreach($orders as $order) {
            $orderId = $order['id'];

            $sql = "SELECT * FROM orderItem INNER JOIN product ON orderItem.productId = product.id WHERE orderItem.orderId = '$orderId'";
            $orderItems = $connect->query($sql)->fetchAll(PDO::FETCH_ASSOC);

            array_push($response, (object) [
                'order' => $order,
                'orderItems' => $orderItems
            ]);
        }

        echo json_encode($response);
    } else if ($receiver['action'] == 'cancelOrder') {
        $orderId = $receiver['orderId'];

        $sql = "SELECT * FROM cart WHERE userId = '$userId'";
        $cartId = $connect->query($sql)->fetch(PDO::FETCH_ASSOC)['id'];

        $sql = "SELECT * FROM orderItem WHERE orderId = '$orderId'";
        $orderItems = $connect->query($sql)->fetchAll(PDO::FETCH_ASSOC);

        foreach ($orderItems as $orderItem) {
            $productId = $orderItem['productId'];

            $sql = "SELECT * FROM cartItem WHERE cartId = '$cartId' AND productId = '$productId'";
            $existingCartItem = $connect->query($sql)->fetch(PDO::FETCH_ASSOC);

            if (!$existingCartItem) {
                $sql = "INSERT INTO cartItem (cartId, productId) VALUES ('$cartId', '$productId')";
                $connect->query($sql);
            }
        }

        $sql = "DELETE FROM `order` WHERE id = '$orderId'";
        $connect->query($sql);

        $response['message'] = 'Order has been cancelled';

        echo json_encode($response);
    } else if ($receiver['action'] == 'deleteCategory') {
        $categoryId = $receiver['categoryId'];

        $sql = "DELETE FROM category WHERE id = '$categoryId'";
        $connect->query($sql);

        $response['message'] = 'Category has been deleted';

        echo json_encode($response);
    } else if ($receiver['action'] == 'deleteProduct') {
        $productId = $receiver['productId'];

        $sql = "DELETE FROM product WHERE id = '$productId'";
        $connect->query($sql);

        $response['message'] = 'Product has been deleted';

        echo json_encode($response);
    } else if ($receiver['action'] == 'getProductInfo') {
        $productId = $receiver['productId'];

        $sql = "SELECT * FROM product WHERE id = '$productId'";
        $product = $connect->query($sql)->fetch(PDO::FETCH_ASSOC);

        echo json_encode($product);
    } else if ($receiver['action'] == 'deleteOrder') {
        $orderId = $receiver['orderId'];

        $sql = "DELETE FROM `order` WHERE id = '$orderId'";
        $connect->query($sql);

        $response['message'] = 'Order has been deleted';

        echo json_encode($response);
    } else if ($receiver['action'] == 'acceptOrder') {
        $orderId = $receiver['orderId'];

        $sql = "UPDATE `order` SET statusId = '2' WHERE id = '$orderId'";
        $connect->query($sql);

        $response['message'] = 'Order has been accepted';

        echo json_encode($response);
    } else if ($receiver['action'] == 'getOptions') {
        $orderId = $receiver['orderId'];

        $sql = "SELECT product.id, product.name FROM orderItem INNER JOIN product ON orderItem.productId = product.id WHERE orderItem.orderId = '$orderId'";
        $products = $connect->query($sql)->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($products);
    }
?>