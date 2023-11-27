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
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `about` varchar(512) NOT NULL,
  `price` bigint(20) NOT NULL,
  `colorScheme` varchar(64) NOT NULL,
  `materials` varchar(64) NOT NULL,
  `elements` varchar(64) NOT NULL,
  `image` varchar(256) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `about`, `price`, `colorScheme`, `materials`, `elements`, `image`, `categoryId`) VALUES
(1, 'Japandi Classic', 'Scandinavian interior illuminated with bright details. Warm and cozy, at the same time simple and minimalistic.', 200000, 'white, light wood', 'paint, white enamel', 'Japanese-style wooden panel in the TV area', 'assets/img/interiors/interior-2.jpg', 1),
(2, 'Tic tac', 'Children\'s room with bright elements and IKEA furniture', 100000, 'Bright shades', 'Paint', 'Colored details in furniture', 'assets/img/interiors/interior-4.jpg', 5),
(3, 'Perfection', 'Very beautiful kitchen', 80000, 'Bright color shadows', 'Wood', 'Wooden, Glass', 'assets/img/interiors/1700520027kam-idris-hYb7kbu4x7E-unsplash.jpg', 3),
(4, 'Revolution', 'Is there any revolutioner ideas?', 120000, 'beige sofas with other elements', 'leather, wood', 'sofas, lights', 'assets/img/interiors/1700520610904.webp', 1),
(5, 'Nevermore', 'Nevermore - is a classic demonstration of something new and interesting', 180000, 'trying new', 'new materials', 'new elements', 'assets/img/users/1700525562r-architecture-95YgOUcqb24-unsplash.jpg', 2),
(7, 'Making estimates', 'We will make an estimate of the project based on the selected rooms, taking into account the features of your apartment and the developed layout. For each item in the estimate, we will select 2 supplier options, specify the name, article and link to the store, and also calculate the required amount of all finishing materials for the project.', 80000, 'none', 'none', 'none', 'assets/img/interiors/1700597488addServ.png', 16),
(8, 'Italian minimal 2', 'Contrasting bedroom in the style of Italian minimalism', 160000, 'warm contrasting shades', 'paint, wood', 'green fabric chairs, large decor', 'assets/img/interiors/170060071235224722.jpg', 1),
(9, 'American classic bedroom', 'A small bedroom in the style of American classics with a pinch of Scandinavian style', 90000, 'light shades', 'paint, moldings', 'accents in furniture and accessories', 'assets/img/interiors/170060079019285822.jpg', 2),
(10, 'White minimal bedroom', 'Minimalistic bedroom in a separate style', 120000, 'light shades', 'decorative plaster', 'accents in furniture and accessories', 'assets/img/interiors/17006008651_6.jpg', 2),
(11, 'Japandi color kitchen', 'Bright modern kitchen', 240000, 'bright shades', 'paint, white enamel, MDF', 'paint, white enamel, MDF', 'assets/img/interiors/170060093401Kitchen_var02_View.jpg', 3),
(12, 'Green shower', 'Bathroom with an unusual mirror and a colored accent wall', 65000, 'grey, emerald', 'porcelain stoneware, paint', 'porcelain stoneware, paint', 'assets/img/interiors/1700601009Sanuzel_View110000_P.jpg', 6),
(13, 'Hotel 2', 'The entrance group is in hotel style with a large mirror, shelves for shoes and a convenient shelf for small things. A combination of white and beige.', 94000, 'white and beige', 'wood', 'large mirror, shelves for shoes', 'assets/img/interiors/1700601101LivingRoom_View11000.jpg', 4),
(14, 'Tender of construction teams', 'We will send your project to the verified construction crews who will make the calculation. If you have builders in mind, our technical supervision specialist will go to their construction sites and check the quality of work, and then give you his opinion.', 20000, 'none', 'none', 'none', 'assets/img/interiors/170062324001_2_2.png', 16),
(15, 'Departure of technical supervision', 'One-time visit to the construction site of a technical supervision specialist. Checking the quality and order of construction work, final conclusion and recommendations.', 10000, 'none', 'none', 'none', 'assets/img/interiors/1700623297image_15.png', 16),
(16, 'Wood mirror', 'Stylish entrance hall with a white wardrobe in the ceiling, wood paneling in the decoration, a combination of large mirrors', 60000, 'brown', 'wood', 'mirrors, wood', 'assets/img/interiors/1700623442IMG_DC62074908D8-13.jpeg', 4),
(17, 'Japandi', 'Minimalistic hall with hidden doors for painting', 65000, 'brown and beige', 'wood', 'coffee table, doors', 'assets/img/interiors/170062348001Entrance_View02_p.jpg', 4),
(18, 'Black glass shower', 'Dark bathroom combined with glossy granite', 50000, 'warm shades', 'porcelain stoneware, glass', 'shower', 'assets/img/interiors/1700623548IMG_DC62074908D8-11.jpeg', 6),
(19, 'Rose', 'Children\'s room with a workplace, it is possible to use a bunk bed', 94000, 'white, pink', 'paint, MDF', 'pink color in the wall decoration, accessories', 'assets/img/interiors/1700623638Bedroom_View120000_P.jpg', 5),
(20, 'Neoclassic Kitchen', 'Bright kitchen in neoclassical style', 110000, 'white, marble', 'MDF paint', 'Table, chairs', 'assets/img/interiors/170062369045487010.jpg', 3),
(22, 'hgfhdfhdf', 'iuhfuifewfewoju', 1231230, 'iejkwi', 'jiodewjo', 'ojifewjofwe', 'assets/img/interiors/17006312492.jpg', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
