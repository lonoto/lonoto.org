-- phpMyAdmin SQL Dump
-- version 3.3.9.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 08, 2012 at 11:46 PM
-- Server version: 5.5.9
-- PHP Version: 5.3.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `lonoto_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `marker`
--

CREATE TABLE `marker` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lat` float(10,6) NOT NULL,
  `lng` float(10,6) NOT NULL,
  `icon` varchar(100) NOT NULL DEFAULT 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=A|9999FF|000000',
  `draggable` varchar(6) NOT NULL DEFAULT 'FALSE',
  `animation` varchar(10) NOT NULL DEFAULT 'DROP',
  `onclick` varchar(50) NOT NULL,
  `link` varchar(100) NOT NULL,
  `user` varchar(20) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` varchar(300) NOT NULL,
  `fuente` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `marker`
--

INSERT INTO `marker` VALUES(1, '0000-00-00 00:00:00', 41.396763, -4.713379, '', '', '', '', 'http://internacional.elpais.com/internacional/2012/03/01/actualidad/1330633569_161701.html', '', 'El Eurogrupo retrasa la concesión de ayudas a Grecia', 'Los ministros esperarán a que se concrete la quita de la deuda de Atenas en manos de inversores privados. El veredicto definitivo de Bruselas llegará el próximo 9 de marzo', 'El Pais');
INSERT INTO `marker` VALUES(2, '0000-00-00 00:00:00', 41.456764, -3.513379, '', '', '', '', 'http://elpais.com/economia/2012/03/01/actualidad/1330599676_740230.html', '', 'Hacienda reforzará la persecución al fraude de artistas y deportistas', 'La Agencia Tributaria vigilará a las personas que muestren signos de riqueza e investigará las importaciones provenientes de Asia. El organismo controlará las operaciones elevadas en efectivo', 'El Pais');
INSERT INTO `marker` VALUES(3, '0000-00-00 00:00:00', 40.456764, -3.113379, '', '', '', '', 'http://elpais.com/ccaa/2012/03/01/catalunya/1330589254_613854.html', '', 'El rector de Barcelona pide el desalojo de estudiantes a Interior', '200 jóvenes se encierran en la Universidad. El presidente de la Generalitat llama a la prudencia y la serenidad', 'El Pais');
INSERT INTO `marker` VALUES(4, '0000-00-00 00:00:00', 40.345764, -3.233379, '', '', '', '', 'http://elpais.com/internacional/2012/03/01/actualidad/1330596319_340395.html', '', 'Garzón, ovacionado en el inicio del curso político argentino', 'Repsol y las Malvinas marcan la inauguración de la legislatura, que ha arrancado con un discurso de Cristina Fernández', 'El Pais');
INSERT INTO `marker` VALUES(5, '0000-00-00 00:00:00', 40.463669, -3.749220, 'test icon', 'FALSE', 'DROP', '', 'http://www.elmundo.es/elmundo/2012/03/01/internacional/1330616668.html', '', 'El régimen de Irán intensifica la censura en Internet por las elecciones', 'Las páginas de ELMUNDO.es, Facebook y Twitter tienen bloqueado el acceso y aumenta el control en los cibercafés por todo el país.', 'El Mundo');
INSERT INTO `marker` VALUES(6, '0000-00-00 00:00:00', 40.463669, -3.749220, 'test icon sent2', 'FALSE', 'DROP', '', 'http://www.elmundo.es/elmundo/2012/03/01/espana/1330611274.html', '', 'La Iglesia católica sólo pagará el IBI si la obligan con un cambio en la ley', 'Dice que esta exención afecta a las demás confesiones religiosas, así como asociaciones de utilidad pública, fundaciones o las ONG.', 'El Mundo');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `slug` varchar(128) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `slug` (`slug`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `news`
--

INSERT INTO `news` VALUES(1, 'title 1', '1', 'text 1');
INSERT INTO `news` VALUES(2, 'title 2', '2', 'text 2');
INSERT INTO `news` VALUES(3, 'title 3', '3', 'text 3');
INSERT INTO `news` VALUES(4, 'new created', 'new-created', 'this is the text');
