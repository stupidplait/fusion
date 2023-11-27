-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 28, 2023 at 04:34 AM
-- Server version: 5.7.39-log
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `z680`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `login` varchar(64) NOT NULL,
  `email` varchar(256) NOT NULL,
  `name` varchar(64) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `password` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL DEFAULT 'assets/img/common/user-placeholder.png',
  `roleId` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `login`, `email`, `name`, `phone`, `password`, `image`, `roleId`) VALUES
(1, 'login', 'login@mail.ru', 'Peter', '88888888888', '$2y$10$xpOvNhQORHb.iN9XS4R05eA6wTvuCOGdSbYcrckzBdQuUJMaWhdVe', 'assets/img/users/1700597177ernest-flowers-XKn3cxtDQ_w-unsplash.jpg', 1),
(2, 'ruslan', 'ruslan@mail.ru', 'Ruslan', '89872356171', '$2y$10$xpOvNhQORHb.iN9XS4R05eA6wTvuCOGdSbYcrckzBdQuUJMaWhdVe', 'assets/img/users/1700598321stefan-stefancik-aoB1B2kkyIw-unsplash.jpg', 2),
(3, 'name', 'name@mail.ru', 'Fedyafefe', '89877777772', '$2y$10$ZX3YiSSQHAKXATO09AjeG.ZmY6bkBy9n/gFBgbfX7X4cz8oqSGkOm', 'assets/img/users/17006312792 (1).jpg', 2),
(4, 'admin', 'admin@mail.ru', 'Admin', '89872355555', '$2y$10$Mzqw2ie7wuj4sp8QeX7re.1SWvWDFzGkatPjH1QQPGwlMKEtdliyW', 'assets/img/common/user-placeholder.png', 2),
(5, 'mary128', 'mary128@mail.ru', 'Mary', '89888937353', '$2y$10$oX1s/gIrersbbtn7QZ3CAeKmvAwNqavZLg4e8LTepk9VuX33mzZc.', 'assets/img/users/1700599093rafaella-mendes-diniz-et_78QkMMQs-unsplash.jpg', 1),
(6, 'dim4ik', 'dim4ik@mail.ru', 'Dima', '89876424566', '$2y$10$NOYfFOc0KReB475Hm8xFX.sxijKIzj0V65VCI/bxsXFvGQI8kkXRu', 'assets/img/users/1700627711IMG_20230527_194029_046.jpg', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roleId` (`roleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
