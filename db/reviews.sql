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
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `productId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `text` varchar(256) NOT NULL,
  `date` bigint(20) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`productId`, `userId`, `text`, `date`, `rating`) VALUES
(3, 3, 'Very great! Thank you for fast cooperation', 1700536933000, 5),
(3, 3, 'Very great! Thank you for fast cooperation', 1700536982000, 5),
(5, 3, 'Blah blah blah!', 1700537089000, 3),
(1, 3, 'Thank you very much for that fast cooperation and consultation that helped me alot', 1700596828000, 5),
(1, 3, 'Absolutely love my new living room design! Thank you for the amazing work.', 1700597799000, 4),
(2, 2, 'I was blown away by the level of creativity and attention to detail in my kitchen redesign. Highly recommend this company!', 1700598245000, 4),
(3, 2, 'I am so impressed with the way this company incorporated my personal style into their design. The end result is truly unique and beautiful.', 1700598277000, 5),
(1, 1, 'The designers at this company are true professionals. They took the time to understand my needs and preferences, and the result is a space that feels like home.', 1700598713000, 4),
(4, 1, 'I can\'t say enough good things about this interior design company. They exceeded my expectations and created a space that I am proud to show off to guests.', 1700598734000, 5),
(4, 5, 'Thanks to this company, my home feels like a luxurious retreat. The design is both functional and beautiful, and I couldn\'t be happier with the end result.', 1700599116000, 5),
(2, 5, 'The attention to detail in every aspect of the design process was impressive. I would definitely use this company again in the future', 1700599612000, 5),
(4, 5, 'The attention to detail in every aspect of the design process was impressive. I would definitely use this company again in the future', 1700599637000, 4),
(2, 5, 'The team at this company is talented, creative, and easy to work with. I would recommend them to anyone looking for a top-quality interior design service.', 1700600497000, 5),
(7, 3, 'Nice! I\'m happy', 1700606796000, 4),
(13, 2, 'Very beautiful!', 1700622706000, 5),
(1, 6, 'Very great to see such professionals as you', 1700627687000, 5),
(5, 3, 'ghtrhtdrhtdrhr', 1700631337000, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD KEY `productId` (`productId`),
  ADD KEY `userId` (`userId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
