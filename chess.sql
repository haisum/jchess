-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 09, 2012 at 03:47 PM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `chess`
--

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE IF NOT EXISTS `games` (
  `gameID` smallint(6) NOT NULL AUTO_INCREMENT,
  `whitePlayer` mediumint(9) NOT NULL DEFAULT '0',
  `blackPlayer` mediumint(9) NOT NULL DEFAULT '0',
  `status` mediumint(9) NOT NULL DEFAULT '0',
  `winner` mediumint(9) NOT NULL DEFAULT '0',
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`gameID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`gameID`, `whitePlayer`, `blackPlayer`, `status`, `winner`, `dateCreated`) VALUES
(1, 1, 9, 3, 9, '2010-11-26 17:39:04'),
(2, 1, 9, 2, 0, '2010-11-26 17:42:57'),
(3, 1, 9, 3, 1, '2010-11-26 17:44:35'),
(4, 23, 22, 3, 23, '2012-12-09 19:34:52'),
(5, 23, 22, 1, 0, '2012-12-09 19:36:22');

-- --------------------------------------------------------

--
-- Table structure for table `game_moves`
--

CREATE TABLE IF NOT EXISTS `game_moves` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `gameID` int(10) DEFAULT NULL,
  `player` int(10) DEFAULT NULL,
  `color` int(10) DEFAULT NULL,
  `fromColumn` varchar(10) DEFAULT NULL,
  `toColumn` varchar(10) DEFAULT NULL,
  `dateTimeMoved` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=34 ;

--
-- Dumping data for table `game_moves`
--

INSERT INTO `game_moves` (`id`, `gameID`, `player`, `color`, `fromColumn`, `toColumn`, `dateTimeMoved`) VALUES
(1, 1, 1, NULL, 'd7', 'd5', '2010-11-26 17:39:41'),
(2, 1, 1, NULL, 'd7', 'd5', '2010-11-26 17:39:42'),
(3, 1, 1, NULL, 'e2', 'e4', '2010-11-26 17:40:05'),
(4, 1, 1, NULL, 'e2', 'e4', '2010-11-26 17:40:08'),
(5, 1, 1, NULL, 'd5', 'e4', '2010-11-26 17:40:24'),
(6, 1, 1, NULL, 'd5', 'e4', '2010-11-26 17:40:26'),
(7, 1, 1, NULL, 'c2', 'c4', '2010-11-26 17:41:01'),
(8, 1, 1, NULL, 'c2', 'c4', '2010-11-26 17:41:04'),
(9, 3, 1, NULL, 'd7', 'd5', '2010-11-26 17:45:00'),
(10, 3, 1, NULL, 'd7', 'd5', '2010-11-26 17:45:01'),
(11, 3, 1, NULL, 'e2', 'e4', '2010-11-26 17:45:08'),
(12, 3, 1, NULL, 'e2', 'e4', '2010-11-26 17:45:09'),
(13, 3, 1, NULL, 'c7', 'c6', '2010-11-26 17:45:25'),
(14, 3, 1, NULL, 'c7', 'c6', '2010-11-26 17:45:27'),
(15, 3, 1, NULL, 'f1', 'b5', '2010-11-26 17:45:36'),
(16, 3, 1, NULL, 'f1', 'b5', '2010-11-26 17:45:37'),
(17, 3, 1, NULL, 'c6', 'b5', '2010-11-26 17:46:15'),
(18, 3, 1, NULL, 'c6', 'b5', '2010-11-26 17:46:17'),
(19, 1, 1, NULL, 'c2', 'c4', '2010-11-29 01:50:20'),
(20, 5, 1, NULL, 'a7', 'a6', '2012-12-09 19:37:11'),
(21, 5, 1, NULL, 'a7', 'a6', '2012-12-09 19:38:32'),
(22, 5, 1, NULL, 'a7', 'a6', '2012-12-09 19:39:02'),
(23, 5, 1, NULL, 'a7', 'a6', '2012-12-09 19:39:19'),
(24, 5, 1, NULL, 'e2', 'e3', '2012-12-09 19:39:35'),
(25, 5, 1, NULL, 'e2', 'e3', '2012-12-09 19:39:35'),
(26, 5, 1, NULL, 'e7', 'e5', '2012-12-09 19:39:41'),
(27, 5, 1, NULL, 'e7', 'e5', '2012-12-09 19:39:43'),
(28, 5, 1, NULL, 'b1', 'c3', '2012-12-09 19:39:49'),
(29, 5, 1, NULL, 'b1', 'c3', '2012-12-09 19:39:51'),
(30, 5, 1, NULL, 'e5', 'e4', '2012-12-09 19:39:57'),
(31, 5, 1, NULL, 'e5', 'e4', '2012-12-09 19:39:57'),
(32, 5, 1, NULL, 'c3', 'e4', '2012-12-09 19:40:03'),
(33, 5, 1, NULL, 'c3', 'e4', '2012-12-09 19:40:05');

-- --------------------------------------------------------

--
-- Table structure for table `game_status`
--

CREATE TABLE IF NOT EXISTS `game_status` (
  `id` int(10) NOT NULL DEFAULT '0',
  `state` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `game_status`
--

INSERT INTO `game_status` (`id`, `state`) VALUES
(-1, 'rejected'),
(0, 'invited'),
(1, 'waiting'),
(2, 'resigned'),
(3, 'timeout');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `sender` varchar(50) NOT NULL,
  `recipient` varchar(50) NOT NULL,
  `message` varchar(400) NOT NULL,
  `datetimeSent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isRead` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender`, `recipient`, `message`, `datetimeSent`, `isRead`) VALUES
(1, 'ehmad11', 'test', 'You are invited for a game by ehmad11(200)<br> <a href=''http://localhost:333/play/1''> Accept invitaion </a> | <a class=''rejectGameLink'' href=''javascript:rejectgame(1)''> Cancel </a>', '2010-11-26 17:39:04', 1),
(2, 'ehmad11', 'test', 'You are invited for a game by ehmad11(200)<br> <a href=''http://localhost:333/play/2''> Accept invitaion </a> | <a class=''rejectGameLink'' href=''javascript:rejectgame(2)''> Cancel </a>', '2010-11-26 17:42:57', 1),
(3, 'ehmad11', 'test', 'You are invited for a game by ehmad11(200)<br> <a href=''http://localhost:333/play/3''> Accept invitaion </a> | <a class=''rejectGameLink'' href=''javascript:rejectgame(3)''> Cancel </a>', '2010-11-26 17:44:35', 1),
(4, 'test', 'ehmad11', 'sdsff', '2010-11-28 23:42:37', 1),
(5, 'test', 'ehmad11', '12121 ggfg hghghj', '2010-11-28 23:42:46', 1),
(6, 'test', 'ehmad11', ' hggfhhgjghjghjg j thgfhfhgf hjh j', '2010-11-28 23:46:20', 1),
(7, 'test', 'ehmad11', 'erfg gffd h', '2010-11-29 01:18:29', 1),
(8, 'test', 'ehmad11', 'f gh gfhgh gj', '2010-11-29 01:19:13', 1),
(9, 'ehmad11', 'test', 'g fhgfghghjh ghj', '2010-11-29 01:21:21', 1),
(10, 'ehmad11', 'test', 'g gdfg h!!!', '2010-11-29 01:21:47', 1),
(11, 'test', 'ehmad11', 'bg haha haa ah ah', '2010-11-29 01:24:08', 1),
(12, 'ehmad11', 'test', ' ha aha aha h', '2010-11-29 01:24:49', 1),
(13, 'ehmad11', 'test', 'ha ha ah a', '2010-11-29 01:26:47', 1),
(14, 'ehmad11', 'test', ' hohohah ahah ah', '2010-11-29 01:27:04', 1),
(15, 'haisum2', 'haisum1', 'You are invited for a game by haisum2(200)<br> <a href=''http://localhost/chess/play/4''> Accept invitaion </a> | <a class=''rejectGameLink'' href=''javascript:rejectgame(4)''> Cancel </a>', '2012-12-09 19:34:52', 1),
(16, 'haisum2', 'haisum1', 'You are invited for a game by haisum2(200)<br> <a href=''http://localhost/chess/play/5''> Accept invitaion </a> | <a class=''rejectGameLink'' href=''javascript:rejectgame(5)''> Cancel </a>', '2012-12-09 19:36:22', 1);

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE IF NOT EXISTS `players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `alias` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `points` bigint(20) NOT NULL DEFAULT '200',
  `isActive` tinyint(1) DEFAULT '0',
  `isAvailaible` int(1) DEFAULT '1',
  `lastSeen` datetime DEFAULT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `alias` (`alias`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `email`, `alias`, `password`, `points`, `isActive`, `isAvailaible`, `lastSeen`, `dateCreated`) VALUES
(22, 'haisum@haisum.info', 'haisum1', 'qwerty', 200, 1, 1, '2012-12-09 19:47:24', '2012-12-09 19:47:24'),
(23, 'haisum2@haisum.info', 'haisum2', 'qwerty', 200, 1, 1, '2012-12-09 19:47:24', '2012-12-09 19:47:24');
