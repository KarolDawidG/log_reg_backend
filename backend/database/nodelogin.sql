SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
--
-- Baza danych: `nodelogin`
--
-- --------------------------------------------------------
--
-- Struktura tabeli dla tabeli `accounts`
--
CREATE DATABASE IF NOT EXISTS nodelogin;

CREATE TABLE `accounts` (
  `id` varchar(36) NOT NULL DEFAULT UUID(),
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(70) NOT NULL DEFAULT '',
  `tresc` varchar(500) NOT NULL DEFAULT '',
  `user` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;




