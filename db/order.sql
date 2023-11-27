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
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `statusId` int(11) NOT NULL DEFAULT '1',
  `date` bigint(20) NOT NULL,
  `total` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `userId`, `statusId`, `date`, `total`) VALUES
(12, 3, 3, 1700533172000, 1714566),
(14, 2, 3, 1700533433000, 123),
(15, 3, 3, 1700533500000, 123123),
(16, 1, 3, 1700533635000, 123123),
(19, 3, 3, 1700565572000, 200000),
(22, 3, 3, 1700589089000, 67646),
(23, 2, 3, 1700597910000, 360000),
(24, 1, 3, 1700598463000, 9000),
(25, 5, 3, 1700598861000, 80000),
(27, 3, 1, 1700598886000, 9000),
(28, 5, 3, 1700598909000, 900000),
(31, 5, 3, 1700599922000, 80999),
(33, 5, 1, 1700600395000, 123),
(34, 1, 2, 1700606726000, 123),
(35, 3, 2, 1700606745000, 123),
(36, 3, 3, 1700606759000, 89000),
(37, 2, 3, 1700622627000, 800000),
(38, 2, 3, 1700622652000, 120000),
(39, 6, 3, 1700627613000, 200000),
(41, 3, 1, 1700631305000, 420000),
(42, 3, 3, 1700631324000, 654645);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `statusId` (`statusId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`statusId`) REFERENCES `orderStatus` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
