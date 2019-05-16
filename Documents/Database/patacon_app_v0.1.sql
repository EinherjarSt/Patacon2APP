-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-04-2019 a las 17:26:54
-- Versión de PHP: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `patacon_app`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrator`
--

CREATE TABLE `administrator` (
  `run` varchar(13) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(320) NOT NULL,
  `password` varchar(10) NOT NULL,
  `position` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `driver`
--

CREATE TABLE `driver` (
  `run` varchar(13) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job`
--

CREATE TABLE `job` (
  `code` int(11) NOT NULL,
  `location` text NOT NULL,
  `variety` text NOT NULL,
  `kilos` int(6) NOT NULL,
  `container` text NOT NULL,
  `harvest` int(11) NOT NULL,
  `quality` int(11) NOT NULL,
  `freight` int(11) NOT NULL,
  `comment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `location`
--

CREATE TABLE `location` (
  `id_location` int(11) NOT NULL,
  `ref_producer` varchar(13) NOT NULL,
  `location_info` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perform`
--

CREATE TABLE `perform` (
  `ref_driver` varchar(13) NOT NULL,
  `ref_trip` int(11) NOT NULL,
  `ref_truck` varchar(6) NOT NULL,
  `currentLoad` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `predefined_route`
--

CREATE TABLE `predefined_route` (
  `id_route` int(11) NOT NULL,
  `initalPoint` text NOT NULL,
  `finalPoint` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producer`
--

CREATE TABLE `producer` (
  `rut` varchar(13) NOT NULL,
  `name` text NOT NULL,
  `manager` text NOT NULL,
  `telephone` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `request_by`
--

CREATE TABLE `request_by` (
  `ref_job` int(11) NOT NULL,
  `ref_producer` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trip`
--

CREATE TABLE `trip` (
  `id_trip` int(11) NOT NULL,
  `state` text NOT NULL,
  `ref_job` int(11) NOT NULL,
  `departurePlace` text NOT NULL,
  `arrivalPlace` text NOT NULL,
  `departureTime` time NOT NULL,
  `arrivalTime` time NOT NULL,
  `date` date NOT NULL,
  `load` int(5) NOT NULL,
  `coordinatedBy` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `truck`
--

CREATE TABLE `truck` (
  `licencePlate` varchar(6) NOT NULL,
  `brand` text NOT NULL,
  `model` text NOT NULL,
  `year` int(4) NOT NULL,
  `maxLoad` int(6) NOT NULL,
  `color` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`run`);

--
-- Indices de la tabla `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`run`);

--
-- Indices de la tabla `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`code`);

--
-- Indices de la tabla `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id_location`),
  ADD KEY `location_ibfk_1` (`ref_producer`);

--
-- Indices de la tabla `perform`
--
ALTER TABLE `perform`
  ADD KEY `ref_driver` (`ref_driver`),
  ADD KEY `ref_trip` (`ref_trip`),
  ADD KEY `ref_truck` (`ref_truck`);

--
-- Indices de la tabla `predefined_route`
--
ALTER TABLE `predefined_route`
  ADD PRIMARY KEY (`id_route`);

--
-- Indices de la tabla `producer`
--
ALTER TABLE `producer`
  ADD PRIMARY KEY (`rut`);

--
-- Indices de la tabla `request_by`
--
ALTER TABLE `request_by`
  ADD KEY `ref_job` (`ref_job`),
  ADD KEY `ref_producer` (`ref_producer`);

--
-- Indices de la tabla `trip`
--
ALTER TABLE `trip`
  ADD PRIMARY KEY (`id_trip`),
  ADD KEY `ref_job` (`ref_job`),
  ADD KEY `coordinatedBy` (`coordinatedBy`);

--
-- Indices de la tabla `truck`
--
ALTER TABLE `truck`
  ADD PRIMARY KEY (`licencePlate`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `job`
--
ALTER TABLE `job`
  MODIFY `code` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `location`
--
ALTER TABLE `location`
  MODIFY `id_location` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `predefined_route`
--
ALTER TABLE `predefined_route`
  MODIFY `id_route` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `trip`
--
ALTER TABLE `trip`
  MODIFY `id_trip` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`ref_producer`) REFERENCES `producer` (`rut`) ON DELETE CASCADE;

--
-- Filtros para la tabla `perform`
--
ALTER TABLE `perform`
  ADD CONSTRAINT `perform_ibfk_1` FOREIGN KEY (`ref_driver`) REFERENCES `driver` (`run`),
  ADD CONSTRAINT `perform_ibfk_2` FOREIGN KEY (`ref_trip`) REFERENCES `trip` (`id_trip`),
  ADD CONSTRAINT `perform_ibfk_3` FOREIGN KEY (`ref_truck`) REFERENCES `truck` (`licencePlate`);

--
-- Filtros para la tabla `request_by`
--
ALTER TABLE `request_by`
  ADD CONSTRAINT `request_by_ibfk_1` FOREIGN KEY (`ref_job`) REFERENCES `job` (`code`),
  ADD CONSTRAINT `request_by_ibfk_2` FOREIGN KEY (`ref_producer`) REFERENCES `producer` (`rut`);

--
-- Filtros para la tabla `trip`
--
ALTER TABLE `trip`
  ADD CONSTRAINT `trip_ibfk_1` FOREIGN KEY (`ref_job`) REFERENCES `job` (`code`),
  ADD CONSTRAINT `trip_ibfk_2` FOREIGN KEY (`coordinatedBy`) REFERENCES `administrator` (`run`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
