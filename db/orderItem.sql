-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 28, 2023 at 04:33 AM
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
-- Table structure for table `orderItem`
--

CREATE TABLE `orderItem` (
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderItem`
--

INSERT INTO `orderItem` (`orderId`, `productId`) VALUES
(12, 1),
(12, 2),
(12, 4),
(12, 3),
(12, 5),
(14, 2),
(15, 3),
(15, 1),
(16, 3),
(16, 4),
(19, 1),
(22, 1),
(23, 2),
(23, 5),
(23, 3),
(24, 1),
(24, 4),
(24, 7),
(25, 4),
(25, 2),
(25, 7),
(27, 1),
(27, 4),
(28, 4),
(28, 2),
(28, 3),
(28, 7),
(31, 2),
(31, 3),
(33, 1),
(34, 8),
(35, 8),
(36, 7),
(36, 10),
(37, 8),
(37, 12),
(38, 13),
(38, 9),
(39, 1),
(41, 2),
(41, 4),
(41, 1),
(42, 9),
(42, 5),
(42, 18);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orderItem`
--
ALTER TABLE `orderItem`
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderItem`
--
ALTER TABLE `orderItem`
  ADD CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
