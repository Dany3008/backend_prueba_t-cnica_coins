-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 21-07-2025 a las 03:54:06
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `conishub`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamentos`
--

DROP TABLE IF EXISTS `departamentos`;
CREATE TABLE IF NOT EXISTS `departamentos` (
  `depto_id` int NOT NULL AUTO_INCREMENT,
  `empresa_id` int DEFAULT NULL,
  `descripcion` text,
  `nombre` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`depto_id`),
  KEY `FK_b66dbedc1b7354ea37e3931551f` (`empresa_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `departamentos` (`depto_id`, `empresa_id`, `descripcion`, `nombre`, `updated_at`, `deleted_at`, `created_at`) VALUES
(1, 1, 'Fundamental zero administration process improvement', 'Architect interactive deliverables', '2025-07-20 02:35:25.624995', NULL, '2025-07-20 19:55:00.530308'),
(2, 1, 'Horizontal responsive standardization', 'Target global methodologies', '2025-07-20 02:35:25.626554', NULL, '2025-07-20 19:55:00.530308'),
(3, 1, 'Re-engineered user-facing workforce', 'Target visionary deliverables', '2025-07-20 02:35:25.627047', NULL, '2025-07-20 19:55:00.530308'),
(4, 1, 'Down-sized stable help-desk', 'Syndicate viral e-tailers', '2025-07-20 02:35:25.627464', NULL, '2025-07-20 19:55:00.530308'),
(5, 2, 'Grass-roots scalable budgetary management', 'Iterate virtual action-items', '2025-07-20 02:35:25.627822', NULL, '2025-07-20 19:55:00.530308'),
(6, 2, 'Ameliorated zero-defect time-frame', 'Drive scalable architectures', '2025-07-20 02:35:25.628160', NULL, '2025-07-20 19:55:00.530308'),
(7, 2, 'Seamless even-keeled capacity', 'Engage world-class markets', '2025-07-20 02:35:25.628500', NULL, '2025-07-20 19:55:00.530308'),
(8, 2, 'Automated local data-warehouse', 'Seize plug-and-play roi', '2025-07-20 02:35:25.628842', NULL, '2025-07-20 19:55:00.530308'),
(9, 3, 'Integrated mission-critical project', 'Drive compelling vortals', '2025-07-20 02:35:25.629183', NULL, '2025-07-20 19:55:00.530308'),
(10, 3, 'Exclusive impactful projection', 'Transition intuitive e-services', '2025-07-20 02:35:25.629479', NULL, '2025-07-20 19:55:00.530308'),
(11, 3, 'Devolved web-enabled database', 'Visualize magnetic networks', '2025-07-20 02:35:25.629765', NULL, '2025-07-20 19:55:00.530308'),
(12, 3, 'User-friendly stable analyzer', 'Enable real-time communities', '2025-07-20 02:35:25.630044', NULL, '2025-07-20 19:55:00.530308'),
(13, 1, NULL, 'Architect interactive deliverables', '2025-07-20 13:11:19.216424', NULL, '2025-07-20 19:55:00.530308'),
(14, 1, 'Fundamental zero administration process improvement', 'Architect interactive deliverables', '2025-07-20 13:15:14.198838', NULL, '2025-07-20 19:55:00.530308'),
(15, 7, 'Equipo de desarrollo', 'Ingeniería', '2025-07-20 21:53:31.000000', '2025-07-20 21:53:31.000000', '2025-07-20 19:55:00.530308'),
(16, 7, 'Equipo backend', 'Ingeniería electronica', '2025-07-20 22:13:52.000000', NULL, '2025-07-20 19:55:00.530308'),
(17, 7, 'Equipo de desarrollo de sistemas', 'Ingeniería', '2025-07-20 21:27:02.445825', NULL, '2025-07-20 21:27:02.445825');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

DROP TABLE IF EXISTS `empleados`;
CREATE TABLE IF NOT EXISTS `empleados` (
  `empleado_id` int NOT NULL AUTO_INCREMENT,
  `empresa_id` int NOT NULL,
  `depto_id` int NOT NULL,
  `estado` enum('activo','inactivo') NOT NULL DEFAULT 'activo',
  `fecha_contratacion` date NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`empleado_id`),
  KEY `FK_bdfe43384d2c5951524d903bdce` (`empresa_id`),
  KEY `FK_6e7d59f573f30b5444150751930` (`depto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`empleado_id`, `empresa_id`, `depto_id`, `estado`, `fecha_contratacion`, `nombre`, `apellido`, `email`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, 'inactivo', '2023-12-23', 'Dakota', 'Fleming', 'mollymurphy@example.net', '2025-07-20 02:35:25.632661', '2025-07-20 02:35:25.632661', NULL),
(2, 1, 1, 'activo', '2025-01-05', 'Nichole', 'Franco', 'foxshannon@example.org', '2025-07-20 02:35:25.634475', '2025-07-20 02:35:25.634475', NULL),
(3, 1, 1, 'activo', '2024-05-15', 'Hailey', 'Mcgee', 'judylester@example.org', '2025-07-20 02:35:25.635500', '2025-07-20 02:35:25.635500', NULL),
(4, 1, 1, 'activo', '2024-06-28', 'Louis', 'Green', 'jacquelinebrown@example.org', '2025-07-20 02:35:25.636704', '2025-07-20 02:35:25.636704', NULL),
(5, 1, 1, 'activo', '2024-05-13', 'Yolanda', 'Lester', 'bfernandez@example.org', '2025-07-20 02:35:25.637698', '2025-07-20 02:35:25.637698', NULL),
(6, 1, 1, 'activo', '2025-06-04', 'Shaun', 'Baldwin', 'kimberly06@example.com', '2025-07-20 02:35:25.638689', '2025-07-20 02:35:25.638689', NULL),
(7, 1, 2, 'inactivo', '2024-02-27', 'Linda', 'Allison', 'epearson@example.com', '2025-07-20 02:35:25.639629', '2025-07-20 02:35:25.639629', NULL),
(8, 1, 2, 'activo', '2023-12-08', 'Jon', 'Patton', 'richardmooney@example.org', '2025-07-20 02:35:25.640424', '2025-07-20 02:35:25.640424', NULL),
(9, 1, 2, 'activo', '2023-09-17', 'Connie', 'Watson', 'fostermelissa@example.org', '2025-07-20 02:35:25.641093', '2025-07-20 02:35:25.641093', NULL),
(10, 1, 2, 'activo', '2025-06-17', 'Ashley', 'Mejia', 'brandon75@example.com', '2025-07-20 02:35:25.641733', '2025-07-20 02:35:25.641733', NULL),
(11, 1, 2, 'inactivo', '2023-09-12', 'Tammy', 'Wagner', 'debbie92@example.org', '2025-07-20 02:35:25.642620', '2025-07-20 02:35:25.642620', NULL),
(12, 1, 2, 'activo', '2023-10-31', 'Michele', 'Hines', 'nedwards@example.com', '2025-07-20 02:35:25.643440', '2025-07-20 02:35:25.643440', NULL),
(13, 1, 3, 'inactivo', '2025-05-22', 'Christopher', 'Hood', 'kelseyhawkins@example.net', '2025-07-20 02:35:25.644442', '2025-07-20 02:35:25.644442', NULL),
(14, 1, 3, 'inactivo', '2024-08-12', 'Maria', 'Bradshaw', 'samuelwilliams@example.com', '2025-07-20 02:35:25.645121', '2025-07-20 02:35:25.645121', NULL),
(15, 1, 3, 'activo', '2025-01-29', 'Debra', 'Hernandez', 'denniswood@example.net', '2025-07-20 02:35:25.645888', '2025-07-20 02:35:25.645888', NULL),
(16, 1, 3, 'inactivo', '2025-01-12', 'James', 'Barnes', 'heather74@example.net', '2025-07-20 02:35:25.646434', '2025-07-20 02:35:25.646434', NULL),
(17, 1, 3, 'inactivo', '2024-06-21', 'David', 'Villegas', 'summerskatie@example.net', '2025-07-20 02:35:25.647053', '2025-07-20 02:35:25.647053', NULL),
(18, 1, 3, 'inactivo', '2025-06-05', 'Danielle', 'Bond', 'cochranlaura@example.com', '2025-07-20 02:35:25.647647', '2025-07-20 02:35:25.647647', NULL),
(19, 1, 4, 'activo', '2024-03-11', 'Tammy', 'Schmidt', 'allenheather@example.net', '2025-07-20 02:35:25.648237', '2025-07-20 02:35:25.648237', NULL),
(20, 1, 4, 'inactivo', '2024-05-20', 'Thomas', 'Blake', 'jonesnichole@example.net', '2025-07-20 02:35:25.648826', '2025-07-20 02:35:25.648826', NULL),
(21, 1, 4, 'activo', '2023-11-07', 'Gerald', 'Roberts', 'timothyoneal@example.net', '2025-07-20 02:35:25.649414', '2025-07-20 02:35:25.649414', NULL),
(22, 1, 4, 'activo', '2023-10-02', 'Rose', 'Kramer', 'fmoore@example.org', '2025-07-20 02:35:25.650042', '2025-07-20 02:35:25.650042', NULL),
(23, 1, 4, 'inactivo', '2023-10-10', 'Phillip', 'Weber', 'usimmons@example.org', '2025-07-20 02:35:25.650671', '2025-07-20 02:35:25.650671', NULL),
(24, 1, 4, 'inactivo', '2024-09-27', 'Hannah', 'Decker', 'mgreen@example.net', '2025-07-20 02:35:25.651276', '2025-07-20 02:35:25.651276', NULL),
(25, 2, 5, 'activo', '2024-02-18', 'Jessica', 'Williamson', 'matthew83@example.org', '2025-07-20 02:35:25.652128', '2025-07-20 02:35:25.652128', NULL),
(26, 2, 5, 'activo', '2025-06-04', 'Ricardo', 'Martin', 'perryamy@example.net', '2025-07-20 02:35:25.653134', '2025-07-20 02:35:25.653134', NULL),
(27, 2, 5, 'activo', '2023-08-08', 'Tanner', 'Wallace', 'maria31@example.net', '2025-07-20 02:35:25.654449', '2025-07-20 02:35:25.654449', NULL),
(28, 2, 5, 'inactivo', '2024-10-12', 'Maria', 'Miller', 'vpowell@example.net', '2025-07-20 02:35:25.655302', '2025-07-20 02:35:25.655302', NULL),
(29, 2, 5, 'activo', '2024-10-02', 'Heather', 'Henry', 'amber04@example.com', '2025-07-20 02:35:25.655981', '2025-07-20 02:35:25.655981', NULL),
(30, 2, 5, 'activo', '2024-10-14', 'Laurie', 'Bender', 'stephencervantes@example.com', '2025-07-20 02:35:25.656673', '2025-07-20 02:35:25.656673', NULL),
(31, 2, 6, 'activo', '2024-03-08', 'Hannah', 'Williams', 'egreen@example.com', '2025-07-20 02:35:25.657297', '2025-07-20 02:35:25.657297', NULL),
(32, 2, 6, 'inactivo', '2024-10-11', 'Amanda', 'Jackson', 'amberjohnson@example.com', '2025-07-20 02:35:25.657969', '2025-07-20 02:35:25.657969', NULL),
(33, 2, 6, 'activo', '2024-01-22', 'Tracie', 'Blake', 'john07@example.net', '2025-07-20 02:35:25.658550', '2025-07-20 02:35:25.658550', NULL),
(34, 2, 6, 'inactivo', '2024-02-22', 'Allison', 'Cochran', 'martineztodd@example.com', '2025-07-20 02:35:25.659218', '2025-07-20 02:35:25.659218', NULL),
(35, 2, 6, 'inactivo', '2025-04-25', 'Heather', 'Todd', 'sara76@example.net', '2025-07-20 02:35:25.659816', '2025-07-20 02:35:25.659816', NULL),
(36, 2, 6, 'activo', '2023-08-05', 'Sheryl', 'Gibson', 'martinezsamantha@example.net', '2025-07-20 02:35:25.660468', '2025-07-20 02:35:25.660468', NULL),
(37, 2, 7, 'activo', '2025-04-25', 'Tara', 'Gonzalez', 'sheilaharris@example.com', '2025-07-20 02:35:25.661163', '2025-07-20 02:35:25.661163', NULL),
(38, 2, 7, 'activo', '2025-04-27', 'Kayla', 'Ingram', 'elizabeth18@example.com', '2025-07-20 02:35:25.661745', '2025-07-20 02:35:25.661745', NULL),
(39, 2, 7, 'activo', '2023-09-13', 'Janice', 'Davis', 'jillwilson@example.org', '2025-07-20 02:35:25.662431', '2025-07-20 02:35:25.662431', NULL),
(40, 2, 7, 'inactivo', '2023-08-24', 'Robert', 'Holmes', 'waltonronald@example.net', '2025-07-20 02:35:25.663073', '2025-07-20 02:35:25.663073', NULL),
(41, 2, 7, 'activo', '2025-01-07', 'Stephanie', 'Gallegos', 'loriramos@example.net', '2025-07-20 02:35:25.663758', '2025-07-20 02:35:25.663758', NULL),
(42, 2, 7, 'activo', '2024-01-05', 'Lisa', 'Johnson', 'davidsondavid@example.net', '2025-07-20 02:35:25.664477', '2025-07-20 02:35:25.664477', NULL),
(43, 2, 8, 'inactivo', '2024-02-03', 'Richard', 'Ward', 'nathanpitts@example.org', '2025-07-20 02:35:25.665287', '2025-07-20 02:35:25.665287', NULL),
(44, 2, 8, 'inactivo', '2025-02-02', 'Ricky', 'Ray', 'olsonleslie@example.org', '2025-07-20 02:35:25.666021', '2025-07-20 02:35:25.666021', NULL),
(45, 2, 8, 'inactivo', '2023-11-07', 'Ashley', 'Cunningham', 'jessehall@example.net', '2025-07-20 02:35:25.666698', '2025-07-20 02:35:25.666698', NULL),
(46, 2, 8, 'inactivo', '2025-04-08', 'Todd', 'Martinez', 'qreid@example.org', '2025-07-20 02:35:25.667310', '2025-07-20 02:35:25.667310', NULL),
(47, 2, 8, 'inactivo', '2025-05-20', 'Michael', 'Morrison', 'reginalddougherty@example.net', '2025-07-20 02:35:25.668395', '2025-07-20 02:35:25.668395', NULL),
(48, 2, 8, 'activo', '2024-12-31', 'Ricardo', 'Morales', 'maystina@example.net', '2025-07-20 02:35:25.669292', '2025-07-20 02:35:25.669292', NULL),
(49, 3, 9, 'activo', '2024-07-26', 'Rebecca', 'Griffith', 'ecarroll@example.com', '2025-07-20 02:35:25.670484', '2025-07-20 02:35:25.670484', NULL),
(50, 3, 9, 'inactivo', '2023-12-08', 'Michael', 'Carter', 'osbornemanuel@example.org', '2025-07-20 02:35:25.671584', '2025-07-20 02:35:25.671584', NULL),
(51, 3, 9, 'inactivo', '2023-09-23', 'James', 'Soto', 'dawnjohnson@example.net', '2025-07-20 02:35:25.672450', '2025-07-20 02:35:25.672450', NULL),
(52, 3, 9, 'inactivo', '2025-03-16', 'Travis', 'Stone', 'brittanycombs@example.com', '2025-07-20 02:35:25.673133', '2025-07-20 02:35:25.673133', NULL),
(53, 3, 9, 'inactivo', '2024-09-11', 'William', 'Curtis', 'elizabeth16@example.net', '2025-07-20 02:35:25.673812', '2025-07-20 02:35:25.673812', NULL),
(54, 3, 9, 'activo', '2023-12-28', 'Crystal', 'Shea', 'juarezwanda@example.net', '2025-07-20 02:35:25.674588', '2025-07-20 02:35:25.674588', NULL),
(55, 3, 10, 'inactivo', '2025-01-01', 'Jeffrey', 'Reid', 'catherine88@example.org', '2025-07-20 02:35:25.675491', '2025-07-20 02:35:25.675491', NULL),
(56, 3, 10, 'activo', '2024-10-23', 'Kaitlin', 'Roberts', 'byrdrobert@example.org', '2025-07-20 02:35:25.676388', '2025-07-20 02:35:25.676388', NULL),
(57, 3, 10, 'activo', '2025-02-07', 'Mike', 'Lucero', 'bryan12@example.net', '2025-07-20 02:35:25.677019', '2025-07-20 02:35:25.677019', NULL),
(58, 3, 10, 'activo', '2024-09-08', 'Sandra', 'Mendoza', 'sandy50@example.net', '2025-07-20 02:35:25.677632', '2025-07-20 02:35:25.677632', NULL),
(59, 3, 10, 'inactivo', '2023-11-04', 'Jonathon', 'Carlson', 'jennifer96@example.com', '2025-07-20 02:35:25.678263', '2025-07-20 02:35:25.678263', NULL),
(60, 3, 10, 'inactivo', '2024-07-05', 'Christina', 'Brown', 'arianagreen@example.org', '2025-07-20 02:35:25.678910', '2025-07-20 02:35:25.678910', NULL),
(61, 3, 11, 'inactivo', '2024-09-25', 'Holly', 'Salazar', 'joelalvarez@example.org', '2025-07-20 02:35:25.679550', '2025-07-20 02:35:25.679550', NULL),
(62, 3, 11, 'activo', '2025-07-15', 'Sabrina', 'Johnson', 'kleinfrances@example.net', '2025-07-20 02:35:25.680192', '2025-07-20 02:35:25.680192', NULL),
(63, 3, 11, 'activo', '2024-12-16', 'Charles', 'Robinson', 'uhiggins@example.net', '2025-07-20 02:35:25.680793', '2025-07-20 02:35:25.680793', NULL),
(64, 3, 11, 'activo', '2024-02-10', 'Brittany', 'Hodges', 'brittany06@example.org', '2025-07-20 02:35:25.681374', '2025-07-20 02:35:25.681374', NULL),
(65, 3, 11, 'inactivo', '2025-03-16', 'Darius', 'Wade', 'karenking@example.com', '2025-07-20 02:35:25.682020', '2025-07-20 02:35:25.682020', NULL),
(66, 3, 11, 'activo', '2024-04-02', 'Bryan', 'Ward', 'ssmith@example.net', '2025-07-20 02:35:25.682620', '2025-07-20 02:35:25.682620', NULL),
(67, 3, 12, 'activo', '2023-11-27', 'Kyle', 'Wong', 'jacksoncameron@example.org', '2025-07-20 02:35:25.683272', '2025-07-20 02:35:25.683272', NULL),
(68, 3, 12, 'inactivo', '2025-04-03', 'Edward', 'Thomas', 'griffindavid@example.org', '2025-07-20 02:35:25.683892', '2025-07-20 02:35:25.683892', NULL),
(69, 3, 12, 'inactivo', '2024-10-31', 'Samantha', 'Peters', 'danny36@example.net', '2025-07-20 02:35:25.684441', '2025-07-20 02:35:25.684441', NULL),
(70, 3, 12, 'activo', '2025-01-06', 'Annette', 'Calhoun', 'thompsonnicole@example.org', '2025-07-20 02:35:25.685425', '2025-07-20 02:35:25.685425', NULL),
(71, 3, 12, 'activo', '2024-04-02', 'Christopher', 'Gardner', 'ryankey@example.net', '2025-07-20 02:35:25.687044', '2025-07-20 02:35:25.687044', NULL),
(72, 3, 12, 'inactivo', '2023-10-28', 'Lisa', 'Lucas', 'kbennett@example.com', '2025-07-20 02:35:25.688223', '2025-07-20 02:35:25.688223', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado_depto_historial`
--

DROP TABLE IF EXISTS `empleado_depto_historial`;
CREATE TABLE IF NOT EXISTS `empleado_depto_historial` (
  `historial_id` int NOT NULL AUTO_INCREMENT,
  `empleado_id` int NOT NULL,
  `depto_id` int NOT NULL,
  `desde` date NOT NULL,
  `hasta` date DEFAULT NULL,
  PRIMARY KEY (`historial_id`),
  KEY `FK_dcd792d7679207be8a1a03d83f7` (`empleado_id`),
  KEY `FK_93c41bc87a08680b11b5ec2e766` (`depto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `empleado_depto_historial`
--

INSERT INTO `empleado_depto_historial` (`historial_id`, `empleado_id`, `depto_id`, `desde`, `hasta`) VALUES
(1, 1, 1, '2024-12-06', '2025-01-23'),
(2, 2, 1, '2025-04-22', '2025-06-15'),
(3, 2, 1, '2025-06-16', '2025-09-20'),
(4, 2, 1, '2025-09-21', '2026-01-08'),
(5, 3, 1, '2025-05-06', '2025-06-07'),
(6, 4, 1, '2025-02-17', '2025-05-14'),
(7, 4, 1, '2025-05-15', '2025-06-22'),
(8, 5, 1, '2024-08-12', '2024-10-04'),
(9, 6, 1, '2024-09-11', '2024-11-19'),
(10, 6, 1, '2024-11-20', '2025-03-08'),
(11, 6, 1, '2025-03-09', '2025-04-10'),
(12, 7, 2, '2025-02-19', '2025-05-31'),
(13, 8, 2, '2024-08-08', '2024-10-04'),
(14, 8, 2, '2024-10-05', '2025-01-26'),
(15, 9, 2, '2024-10-20', '2025-02-04'),
(16, 9, 2, '2025-02-05', '2025-05-18'),
(17, 10, 2, '2025-03-03', '2025-05-02'),
(18, 10, 2, '2025-05-03', '2025-07-17'),
(19, 10, 2, '2025-07-18', '2025-11-05'),
(20, 11, 2, '2024-12-15', '2025-01-30'),
(21, 11, 2, '2025-01-31', '2025-05-23'),
(22, 12, 2, '2025-03-03', '2025-06-04'),
(23, 12, 2, '2025-06-05', '2025-07-31'),
(24, 12, 2, '2025-08-01', '2025-11-01'),
(25, 13, 3, '2025-03-22', '2025-05-03'),
(26, 14, 3, '2025-06-06', '2025-08-31'),
(27, 14, 3, '2025-09-01', '2025-10-30'),
(28, 15, 3, '2024-08-23', '2024-12-01'),
(29, 16, 3, '2024-09-18', '2024-11-13'),
(30, 17, 3, '2025-01-06', '2025-03-03'),
(31, 18, 3, '2025-01-13', '2025-05-05'),
(32, 19, 4, '2025-03-07', '2025-05-09'),
(33, 19, 4, '2025-05-10', '2025-06-25'),
(34, 20, 4, '2024-11-11', '2025-02-01'),
(35, 21, 4, '2025-06-07', '2025-08-29'),
(36, 21, 4, '2025-08-30', '2025-12-05'),
(37, 21, 4, '2025-12-06', '2026-01-23'),
(38, 22, 4, '2025-02-26', '2025-04-09'),
(39, 23, 4, '2025-01-07', '2025-04-22'),
(40, 23, 4, '2025-04-23', '2025-07-10'),
(41, 24, 4, '2024-08-15', '2024-11-03'),
(42, 24, 4, '2024-11-04', '2025-03-03'),
(43, 25, 5, '2024-11-21', '2025-03-04'),
(44, 26, 5, '2025-02-19', '2025-05-22'),
(45, 27, 5, '2024-07-30', '2024-10-11'),
(46, 28, 5, '2025-04-22', '2025-05-25'),
(47, 28, 5, '2025-05-26', '2025-07-31'),
(48, 28, 5, '2025-08-01', '2025-10-10'),
(49, 29, 5, '2025-04-29', '2025-08-19'),
(50, 29, 5, '2025-08-20', '2025-11-15'),
(51, 30, 5, '2025-06-20', '2025-07-20'),
(52, 30, 5, '2025-07-21', '2025-10-07'),
(53, 30, 5, '2025-10-08', '2025-12-27'),
(54, 31, 6, '2024-11-19', '2024-12-26'),
(55, 32, 6, '2024-10-19', '2024-11-20'),
(56, 32, 6, '2024-11-21', '2025-03-05'),
(57, 32, 6, '2025-03-06', '2025-06-23'),
(58, 33, 6, '2025-04-02', '2025-06-15'),
(59, 33, 6, '2025-06-16', '2025-10-06'),
(60, 34, 6, '2025-05-16', '2025-09-05'),
(61, 34, 6, '2025-09-06', '2025-11-26'),
(62, 35, 6, '2025-04-18', '2025-05-18'),
(63, 36, 6, '2024-12-31', '2025-04-08'),
(64, 36, 6, '2025-04-09', '2025-05-17'),
(65, 37, 7, '2024-10-07', '2025-01-25'),
(66, 37, 7, '2025-01-26', '2025-03-04'),
(67, 37, 7, '2025-03-05', '2025-06-28'),
(68, 38, 7, '2024-07-25', '2024-09-05'),
(69, 38, 7, '2024-09-06', '2024-10-27'),
(70, 38, 7, '2024-10-28', '2025-02-02'),
(71, 39, 7, '2024-08-13', '2024-11-01'),
(72, 40, 7, '2025-06-01', '2025-08-29'),
(73, 41, 7, '2024-12-01', '2025-01-12'),
(74, 41, 7, '2025-01-13', '2025-03-09'),
(75, 42, 7, '2025-02-10', '2025-05-01'),
(76, 42, 7, '2025-05-02', '2025-07-05'),
(77, 42, 7, '2025-07-06', '2025-10-19'),
(78, 43, 8, '2025-02-12', '2025-05-15'),
(79, 44, 8, '2025-03-27', '2025-06-12'),
(80, 45, 8, '2024-09-02', '2024-11-21'),
(81, 45, 8, '2024-11-22', '2025-02-28'),
(82, 45, 8, '2025-03-01', '2025-06-07'),
(83, 46, 8, '2025-05-09', '2025-06-15'),
(84, 46, 8, '2025-06-16', '2025-08-26'),
(85, 47, 8, '2025-02-22', '2025-04-12'),
(86, 48, 8, '2025-03-06', '2025-06-20'),
(87, 48, 8, '2025-06-21', '2025-09-04'),
(88, 49, 9, '2024-09-30', '2024-12-23'),
(89, 49, 9, '2024-12-24', '2025-02-10'),
(90, 50, 9, '2024-07-30', '2024-11-21'),
(91, 50, 9, '2024-11-22', '2025-03-08'),
(92, 51, 9, '2025-03-20', '2025-04-22'),
(93, 51, 9, '2025-04-23', '2025-08-10'),
(94, 51, 9, '2025-08-11', '2025-09-30'),
(95, 52, 9, '2024-12-03', '2025-03-12'),
(96, 53, 9, '2024-08-16', '2024-11-07'),
(97, 54, 9, '2025-05-08', '2025-07-20'),
(98, 54, 9, '2025-07-21', '2025-09-24'),
(99, 54, 9, '2025-09-25', '2025-12-27'),
(100, 55, 10, '2024-09-12', '2024-11-27'),
(101, 56, 10, '2025-04-02', '2025-07-26'),
(102, 57, 10, '2024-12-30', '2025-04-10'),
(103, 57, 10, '2025-04-11', '2025-07-07'),
(104, 57, 10, '2025-07-08', '2025-08-10'),
(105, 58, 10, '2024-08-20', '2024-10-21'),
(106, 59, 10, '2024-10-04', '2025-01-09'),
(107, 59, 10, '2025-01-10', '2025-03-11'),
(108, 59, 10, '2025-03-12', '2025-05-18'),
(109, 60, 10, '2025-05-01', '2025-07-01'),
(110, 60, 10, '2025-07-02', '2025-10-14'),
(111, 61, 11, '2024-09-05', '2024-10-31'),
(112, 61, 11, '2024-11-01', '2025-01-17'),
(113, 62, 11, '2025-06-05', '2025-07-15'),
(114, 62, 11, '2025-07-16', '2025-08-18'),
(115, 62, 11, '2025-08-19', '2025-11-02'),
(116, 63, 11, '2025-06-08', '2025-07-12'),
(117, 63, 11, '2025-07-13', '2025-08-17'),
(118, 64, 11, '2024-08-14', '2024-12-10'),
(119, 64, 11, '2024-12-11', '2025-02-23'),
(120, 64, 11, '2025-02-24', '2025-04-05'),
(121, 65, 11, '2024-08-25', '2024-11-07'),
(122, 65, 11, '2024-11-08', '2024-12-30'),
(123, 65, 11, '2024-12-31', '2025-04-14'),
(124, 66, 11, '2025-03-19', '2025-05-21'),
(125, 66, 11, '2025-05-22', '2025-09-19'),
(126, 66, 11, '2025-09-20', '2025-10-21'),
(127, 67, 12, '2025-02-15', '2025-03-30'),
(128, 67, 12, '2025-03-31', '2025-06-07'),
(129, 68, 12, '2024-12-13', '2025-02-28'),
(130, 68, 12, '2025-03-01', '2025-05-09'),
(131, 69, 12, '2025-04-08', '2025-06-19'),
(132, 69, 12, '2025-06-20', '2025-08-03'),
(133, 69, 12, '2025-08-04', '2025-10-05'),
(134, 70, 12, '2025-03-01', '2025-06-15'),
(135, 71, 12, '2024-12-23', '2025-04-20'),
(136, 71, 12, '2025-04-21', '2025-06-15'),
(137, 71, 12, '2025-06-16', '2025-08-11'),
(138, 72, 12, '2025-04-25', '2025-07-26'),
(139, 72, 12, '2025-07-27', '2025-09-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

DROP TABLE IF EXISTS `empresas`;
CREATE TABLE IF NOT EXISTS `empresas` (
  `empresa_id` int NOT NULL AUTO_INCREMENT,
  `password_hash` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`empresa_id`),
  UNIQUE KEY `IDX_fe5e0374ec6d7d7dfbe0444690` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`empresa_id`, `password_hash`, `nombre`, `email`, `updated_at`, `deleted_at`, `created_at`) VALUES
(1, '$2b$10$FPgHZqXYS7uDagC7zNsWeOqRPUtyTEdRPZbUVdKxiKfyTwuChgLp6', 'Hill-Logan', 'alice51@martinez.com', '2025-07-20 22:27:03.000000', NULL, '2025-07-20 02:35:25.618165'),
(2, '3ee361001d51ae9fe6d429791ceec108b7fd6113c392957db3ebdc001cc27e44', 'Ross PLC', 'samuelmyers@fisher.info', '2025-07-20 02:35:25.620758', NULL, '2025-07-20 02:35:25.620758'),
(3, 'd08b3a7766a3ebce8c579c61dedc523375b5ee62abe38497078a990ab09368ba', 'Miller, Palmer and Tran', 'mosssteven@garcia.com', '2025-07-20 02:35:25.622010', NULL, '2025-07-20 02:35:25.622010'),
(7, '$2b$10$xn39qsRnZS7TphQiTYV9VuTuqLQ1gA18oB9kxntzPdrDDktWtLrrW', 'Empresa Demo2', 'demo@empresa2.com', '2025-07-20 11:54:31.350610', NULL, '2025-07-20 11:54:31.350610');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token_hash` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `expires_at` timestamp NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `companyId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9814e8b0844eb7ca7711c993f80` (`companyId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`id`, `token_hash`, `expires_at`, `created_at`, `companyId`) VALUES
(1, '$2b$10$uBb/TW0q2HGSJ2wmOoP/Fup0p42FhGlYPBk1gIYFQT02bdpKOqjme', '2025-07-20 16:34:56', '2025-07-20 10:34:55.790014', 1),
(2, '$2b$10$d496jZqMBLpa1zTEypI19eGDOih3yWEhNKoR.o/fMESvAFna3gl4a', '2025-07-20 16:35:25', '2025-07-20 10:35:24.682010', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
CREATE TABLE IF NOT EXISTS `refresh_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tokenHash` varchar(255) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `expiresAt` datetime NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `companyId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e3c2f81e4f38bf9733ce01f589c` (`companyId`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `refresh_tokens`
--

INSERT INTO `refresh_tokens` (`id`, `tokenHash`, `expiresAt`, `createdAt`, `companyId`) VALUES
(1, '$2b$10$RlT.nhAHq2mceidhzGFlCOD8Lz5bhACHaaOrx6Ahtzbb/76TLCcYq', '2025-07-27 11:54:20', '2025-07-20 11:54:19.874577', 1),
(2, '$2b$10$wEt1EyE7LJ/nBZHCAPXnt.sPbr5vIBOTz.2Oq3TVRlPlBLI5B6rx6', '2025-07-27 11:54:31', '2025-07-20 11:54:31.434184', 7),
(3, '$2b$10$7JAkcvAt48oH/5lCMEJ3Ou2qv59BIdwc1m28/su38WXGmZ.jP.T.O', '2025-07-27 11:56:01', '2025-07-20 11:56:00.901153', 1),
(4, '$2b$10$s2mJS75ZtctyTcvaW51SA.TvyL1MxlylUT2OBOHCTR1RznZpKfAuG', '2025-07-27 13:09:54', '2025-07-20 13:09:53.732598', 1),
(5, '$2b$10$RvUuZpBWFxLnJbGG4xEMSuV6qXWOyxlnhf/.chq0o90RwKwd8Xne2', '2025-07-27 13:25:56', '2025-07-20 13:25:55.562224', 1),
(6, '$2b$10$fSxJqkg8Sys/anUsFoCCSuogu/YwlKeDXSy7bloEYHTlduyL5AHe6', '2025-07-27 13:48:55', '2025-07-20 13:48:54.810849', 1),
(7, '$2b$10$xlkIWjWBzsfqHZk6fZ8csuLiQFq5hRz/iitfvdnhRO34z9G5SEPdC', '2025-07-27 13:53:24', '2025-07-20 13:53:24.320256', 7),
(8, '$2b$10$h/JexH0zrCEBlMr4oIuSv.okHNttqqcIUUa9XTcpZtD0mYnXnWNxC', '2025-07-27 13:53:52', '2025-07-20 13:53:51.745974', 7),
(9, '$2b$10$RO2W.tp8AZ8y.Y2EbO85IuBRpJxXUgwbAJYdrpWjP9ocGDqWBXndO', '2025-07-27 14:41:29', '2025-07-20 14:41:29.477320', 7),
(10, '$2b$10$oFhi7qVJhul8VqenISHtdOjAPTQzIh7yLLb7r.LeAxTakqBs7Jwfu', '2025-07-27 14:41:43', '2025-07-20 14:41:42.755190', 7),
(11, '$2b$10$FSMOGFAN8.c9z1Rqh1hUmu6Wli2LpDnGyrWknxlS9O3MfxujIc9WS', '2025-07-27 14:59:02', '2025-07-20 14:59:01.566370', 7),
(12, '$2b$10$AJFbOBram0Nas.47VvCuuO8Ww.J5.zZyflxZFWBOzQKTbiw59M74C', '2025-07-27 15:03:21', '2025-07-20 15:03:20.641796', 7),
(13, '$2b$10$LavNJmLKv4cJ3Hpu15z5ee88J4EGm813M3jK9c38RZ28NcnRsfR8e', '2025-07-27 15:15:06', '2025-07-20 15:15:05.970242', 7),
(14, '$2b$10$YawYBf1xYQfDUOCcZn0tHe5KiXjnM8nJHkDUzS33BGvbVw9snBD4y', '2025-07-27 15:57:34', '2025-07-20 15:57:34.098823', 7),
(15, '$2b$10$Q2MVDWN9l1Lbh/7dNCE3wuhFeGC7Ybds86ASBgGLs8XtvL8TA4aj6', '2025-07-27 19:13:15', '2025-07-20 19:13:14.641957', 7),
(16, '$2b$10$B05YF0oZdFyeLrptwYWLl.0l9Y77KJEin58ER/8D8aY/0Ec.RhTrm', '2025-07-27 19:55:12', '2025-07-20 19:55:11.618551', 7),
(17, '$2b$10$NU0hJNPLWfqWXSApW8F.6uXb58bBDKCt62OFQT1pjVPnl9Wq0jHmW', '2025-07-27 20:17:14', '2025-07-20 20:17:14.508560', 7),
(18, '$2b$10$pYchShrjSIUkPvYIwsBD9.aCq0bFvcAbrZ5GRNMfSOdeiYaMBm0Ze', '2025-07-27 20:21:19', '2025-07-20 20:21:19.292173', 7),
(19, '$2b$10$T9s6VpMq46sm7NTTnloEWubc.neYn7K.69QU4d3MW8E4A7MRTnFVu', '2025-07-27 20:34:18', '2025-07-20 20:34:17.581253', 7),
(20, '$2b$10$.1b5iX7A70Ugc7kMNBt4LOf1N5ac4KQrXi2mZ6x2vzLmh.m6mPL6S', '2025-07-27 20:59:54', '2025-07-20 20:59:53.718343', 7),
(21, '$2b$10$ZM2szUWQWJ0Qs/5XO2ZKR.PGkSo53y70QgKbGeFcm4xxqmErsa3xW', '2025-07-27 21:14:12', '2025-07-20 21:14:11.970916', 7),
(22, '$2b$10$p4D0pt27q/yw5iyYc0PXM.S5j1SMRLzaaPf7FpZ0W2pfz/fjHnoSy', '2025-07-27 21:22:34', '2025-07-20 21:22:34.257946', 7),
(23, '$2b$10$xOKub8sorShTQVojk7keIOEkAraAZQtcZCFo1549tegn9G8lgwg0W', '2025-07-27 21:47:51', '2025-07-20 21:47:50.528387', 7),
(24, '$2b$10$G6WTOqyT/o6MUJazOiQMj.739Tmp42hgrZKTpj35Kj/ynQPWD/khO', '2025-07-27 21:48:50', '2025-07-20 21:48:50.480351', 7),
(25, '$2b$10$M.dyojH6E2oyuCgGsmKmMu7KBQT8d3QOgN4Zo0bW1w0T8RpQDyWwi', '2025-07-27 21:53:16', '2025-07-20 21:53:16.012472', 7),
(26, '$2b$10$Nyy6aPgL3OezZtQ63ncMwOnAKaVyoxKooBojZT0hhXMvf1moCs3Iu', '2025-07-27 21:56:31', '2025-07-20 21:56:30.823244', 7),
(27, '$2b$10$a92lXDTMczCdXV3qQwWXHe3vPkviuFClSze25./LLOemCFa6eSLdm', '2025-07-27 22:11:41', '2025-07-20 22:11:40.597660', 7),
(28, '$2b$10$X19kLsw34mHwbz14qdCVHeRd4brSDEDlLVcUr1399oonjT0Z31tVm', '2025-07-27 22:17:11', '2025-07-20 22:17:10.529017', 7),
(29, '$2b$10$SitPYq/BQuRvJUwjaat3hu70vCe59zKkcqg6VN02lfm2xlfDh3Nmy', '2025-07-27 22:20:48', '2025-07-20 22:20:47.663614', 7),
(30, '$2b$10$6zpohkndVfvAZKnTuzv41e4icxNa9J91GLe6Msjj/UiwLhwY29os2', '2025-07-27 22:21:22', '2025-07-20 22:21:21.939485', 7),
(31, '$2b$10$OxHXzQ6jp7DMOlnnsMNon.Kz9RVyERb2iwMp17D3GVVrJ0XjgYz26', '2025-07-27 22:28:14', '2025-07-20 22:28:13.724317', 1);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `departamentos`
--
ALTER TABLE `departamentos`
  ADD CONSTRAINT `FK_b66dbedc1b7354ea37e3931551f` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`empresa_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `FK_6e7d59f573f30b5444150751930` FOREIGN KEY (`depto_id`) REFERENCES `departamentos` (`depto_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_bdfe43384d2c5951524d903bdce` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`empresa_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleado_depto_historial`
--
ALTER TABLE `empleado_depto_historial`
  ADD CONSTRAINT `FK_93c41bc87a08680b11b5ec2e766` FOREIGN KEY (`depto_id`) REFERENCES `departamentos` (`depto_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_dcd792d7679207be8a1a03d83f7` FOREIGN KEY (`empleado_id`) REFERENCES `empleados` (`empleado_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD CONSTRAINT `FK_9814e8b0844eb7ca7711c993f80` FOREIGN KEY (`companyId`) REFERENCES `empresas` (`empresa_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD CONSTRAINT `FK_e3c2f81e4f38bf9733ce01f589c` FOREIGN KEY (`companyId`) REFERENCES `empresas` (`empresa_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
