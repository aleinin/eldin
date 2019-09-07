-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 07, 2019 at 06:05 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eldin-new`
--
DROP DATABASE `eldin-new`;
CREATE DATABASE IF NOT EXISTS `eldin-new` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `eldin-new`;

-- --------------------------------------------------------

--
-- Table structure for table `buildings`
--

CREATE TABLE `buildings` (
  `cityName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `building` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `tier` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `cityName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `coordinates` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `citySize` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `totalTiles` int(11) NOT NULL,
  `maxSellable` float NOT NULL,
  `tilesSold` int(11) NOT NULL,
  `population` int(11) NOT NULL,
  `nation` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `goods`
--

CREATE TABLE `goods` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sell` float NOT NULL,
  `buy` float NOT NULL,
  `boostable` tinyint(1) NOT NULL,
  `t1` float DEFAULT NULL,
  `t2` float DEFAULT NULL,
  `t3` float DEFAULT NULL,
  `boostBuilding` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `helps`
--

CREATE TABLE `helps` (
  `userName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cityName` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `livesin`
--

CREATE TABLE `livesin` (
  `userName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cityName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `tiles` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `owns`
--

CREATE TABLE `owns` (
  `userName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cityName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `isPrimary` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `userName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `rank` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `total` int(11) NOT NULL,
  `wild` int(11) NOT NULL,
  `city` int(11) NOT NULL,
  `nether` int(11) NOT NULL,
  `end` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sells`
--

CREATE TABLE `sells` (
  `good` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cityName` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `tier` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `updated`
--

CREATE TABLE `updated` (
  `timestamp` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buildings`
--
ALTER TABLE `buildings`
  ADD KEY `cityName` (`cityName`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`cityName`);

--
-- Indexes for table `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `helps`
--
ALTER TABLE `helps`
  ADD KEY `cityName` (`cityName`),
  ADD KEY `userName` (`userName`);

--
-- Indexes for table `livesin`
--
ALTER TABLE `livesin`
  ADD KEY `cityName` (`cityName`),
  ADD KEY `userName` (`userName`);

--
-- Indexes for table `owns`
--
ALTER TABLE `owns`
  ADD KEY `userName` (`userName`),
  ADD KEY `cityName` (`cityName`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`userName`);

--
-- Indexes for table `sells`
--
ALTER TABLE `sells`
  ADD KEY `cityName` (`cityName`),
  ADD KEY `good` (`good`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buildings`
--
ALTER TABLE `buildings`
  ADD CONSTRAINT `buildings_ibfk_1` FOREIGN KEY (`cityName`) REFERENCES `cities` (`cityName`);

--
-- Constraints for table `helps`
--
ALTER TABLE `helps`
  ADD CONSTRAINT `helps_ibfk_1` FOREIGN KEY (`cityName`) REFERENCES `cities` (`cityName`),
  ADD CONSTRAINT `helps_ibfk_2` FOREIGN KEY (`userName`) REFERENCES `people` (`userName`);

--
-- Constraints for table `livesin`
--
ALTER TABLE `livesin`
  ADD CONSTRAINT `livesIn_ibfk_1` FOREIGN KEY (`cityName`) REFERENCES `cities` (`cityName`),
  ADD CONSTRAINT `livesIn_ibfk_2` FOREIGN KEY (`userName`) REFERENCES `people` (`userName`);

--
-- Constraints for table `owns`
--
ALTER TABLE `owns`
  ADD CONSTRAINT `own_ibfk_1` FOREIGN KEY (`userName`) REFERENCES `people` (`userName`),
  ADD CONSTRAINT `own_ibfk_2` FOREIGN KEY (`cityName`) REFERENCES `cities` (`cityName`);

--
-- Constraints for table `sells`
--
ALTER TABLE `sells`
  ADD CONSTRAINT `sells_ibfk_2` FOREIGN KEY (`good`) REFERENCES `goods` (`name`),
  ADD CONSTRAINT `sells_ibfk_3` FOREIGN KEY (`cityName`) REFERENCES `cities` (`cityName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
