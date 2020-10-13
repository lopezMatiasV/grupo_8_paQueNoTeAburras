CREATE DATABASE  IF NOT EXISTS `pqnotaburras_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `pqnotaburras_db`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pqnotaburras_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `ordenCompra` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ordenCompra_UNIQUE` (`ordenCompra`),
  KEY `id_usuario_idx` (`id_usuario`),
  CONSTRAINT `id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `medio_de_pago` varchar(45) NOT NULL,
  `tarjeta_tipo` varchar(45) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_ordenCompra` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_idx` (`id_ordenCompra`),
  CONSTRAINT `usuario` FOREIGN KEY (`id_ordenCompra`) REFERENCES `cart` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `sku` int(11) DEFAULT NULL,
  `categoria` text DEFAULT NULL,
  `fotos` text DEFAULT NULL,
  `descuento` text DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `seccion` text DEFAULT NULL,
  `subcategoria` text DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `nombre` text DEFAULT NULL,
  `id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (387958,'Vehículos','lego-city-camion.png','5',1160,'ofertas','Camiones','Camión de Tránsito Urbano Original Roma 1440¡Volá tu imaginación jugando con estos increíbles juguetes de Roma Rodados!Muchísimos modelos para escoger','Camión de Tránsito Urbano Original Roma 1440',1),(387959,'Vehículos','pinypon-moto-.png','',2680,'ofertas','Motos','Con el Coche de Pinypon podés llevar a tus muñecas / os a pasear y vivir una tarde genial!','Pinypon Moto Con Figura Y Accesorios',2),(387960,'Vehículos','autoamarilloroadster.png','',799,'','Colección','Auto Convertible Roadster.- Cuenta con icreíbles detalles en sus neumáticos y llantas. El techo está rebatido por lo que se puede ver el interior del auto. Diseño deportivo y realista.','Auto Roadster Convertible Roma Brinquedos Amarillo',3),(387961,'Vehículos','excavadora.png','15',1530,'visitadas','Construcción','Manos a la obra en tu vehiculo con luces y sonidos. Divertite con los vehículos de tu ciudad! Incluye 3 bateria tipo boton (1,5v)','Excavadora De Construccion A Friccion Good Quality',4),(387962,'Vehículos','autoradiocontrol1.png','',3200,'visitadas','Vehículos especiales','Vehiculo a Radio Control Ferrari 599XX XQ - Contiene: 1 auto con control remoto - Modelo del auto Ferrari. Requiere pilas: vehiculo 3 AAA, control remoto 9V. Marca: XQ','VEHÍCULO A RADIO CONTROL FERRARI',5),(387968,'Juegos de Mesa','quoridor01.jpg','',2600,'','Clásicos','El Quoridor es un juego de mesa abstracto de estrategia para dos o más personas. El objetivo del juego es simple: hay que lograr lleva el peón al otro lado. Para hacerlo, o mejor dicho, para evitar que algún rival lo logre, contamos con barreras que podremos ubicar en el camino para hacer del camino directo un intrincado laberinto. Un juego que requiere estrategia y rapidez mental.','QUORIDOR',6),(387969,'Juegos de Mesa','panic-lab3.jpg','',2788,'','Infantiles','Panic Lab es un juego de mesa en el que tenemos que cuidar nuestro preciado laboratorio de la fuga de unas amebas. ¡Las amebas se escaparon y están moviéndose para todos lados, todos juegan juntos y al mismo tiempo. Un juego rápido, de reglas simples para desafiar a los más atentos.','PANIC LAB',7),(387970,'Juegos de Mesa','monopoly.jpg','',2809,'','Adultos','Katamino es un juego de construcción al estilo rompecabezas. Contiene múltiples fichas que intentaremos acomodar en el tablero. Más de 500 desafíos para mentes inquietas y creativas.','KATAMINO',8),(387963,'Muñecos de acción','transformer.png','20',2750,'oefrta','Muñecos','Transformers Cyberverse Figura Coleccionable Hasbro E1884. Convierte y ataca fácilmente con juguetes Transformers Cyberverse Action Attackers!','Bumblebee Transformers Cyberverse Hasbro ',9),(387964,'Muñecos de acción','mascara iron man.png','',1345,'','Accesorios','Máscara Iron Man Marvel Avengers B9945 Hasbro Original. Gran máscara de plástico duro.Con elástico ajustable.- Incluye 1 protector de goma para los ojos y para mayor comodidad.Marca: Hasbro','Máscara Iron Man Marvel Avengers B9945 Hasbro',10),(387965,'Muñecos de acción','fortnite-battle.png','',1734,'visitadas','Vehículos de acción','FORTNITE BATTLE ROYALE KARTING Fortnite, el epico videojuego mas conocido de la historia, sale de la pantalla con las figuras de sus personajes.','Fortnite Battle Karting Combate C/1 Fig Y Acc Int 63554 ',11),(387966,'Muñecos de acción','muneco-star-wars-rey.png','15',1789,'campaña','Star Wars','ORIGINAL STAR WARS® MARCA HASBRO™','Muñeco Star Wars Rey Skywalker Articulado Marca Hasbro ',12),(387967,'Muñecos de acción','funko-pop-star-wars-snap.png','5',1999,'campaña','Funko','Funko es la marca de figuras coleccionables más famosa del mundo. ¿El motivo? ¡Podés disfrutar de tus personajes favoritos!  Ideal para coleccionistas y para regalar. ¿Lo mejor de todo? Son perfectos para TODAS las edades.','Funko Pop First Order Snowtrooper 67 - Star Wars',13),(387957,'Juegos de Ingenio','lego-city-camion.png','',4899,'','Bloques','Los niños se convertirán en héroes cotidianos mientras se divierten con el fantástico juego LEGO® City Camión de los Helados (60253). ¡Hay que alegrar el día a los sofocados ','Lego® City - Camión De Los Helados (60253)',14),(387958,'Juegos de Ingenio','juego-mesa-emociones.jpg','',979,'','Ciencia',' Incluye guia para padres y tutores. Viaje de emociones es una ocasión para compartir lo que sentis, expresar lo que pensas y afianzar la unión y el vinculo con los otros jugadores. Marca: Barco de Papel','Juego Mesa Viaje De Emociones Explora Inteligencia Emocional',15),(387956,'Juegos de Ingenio','juego-de-ciencias.jpg','',2750,'','Especiales','JUEGO DE CIENCIAS – LA CIENCIA DEL AGUA. Laboratorio de ciencias para niños. Experimentos divertidos de física y química, para aprender la importancia del agua, valorando y cuidando juntos el medio ambiente.','Juego De Ciencias La Ciencia Del Agua Galileo Italy',16),(387959,'Muñecas','mrPapa2.png','',2290,'','Muñecas','Descubre todas las posibilidades de crear y mezclar los accesorios diferentes, los niños pueden usar su imaginación para un montón de juego creativo armando su propio muñeco de papa.','Señor Y Señora Cara De Papa Toy Story Hasbro',17),(387960,'Muñecas','PiniPoyDelivery.png','',6290,'visitadas','Muñecas','Prepárate para un sin fin de nuevas aventuras, acompañando con el resto de tus figuras de la linea Pinypon Mix & Match Queen’s y todas tus figuras Pinypon, todos son bienvenidos en este mágico lugar.','Piny Pon y sus amigos',18),(387971,'Muñecas','babyCryCaja.png','15',6809,'ofertas','Muñecas','Crybabies llora con lagrimas y sonido WABRO - Si le quitas el chupete llorará cada vez más hasta recuperarlo.Diferentes modelos para coleccionar: CHIC, RUTHY, FANCY, PANDY, DOTTY, LADY y NALA.- ¡Lloran lagrimas de verdad!','Crybabies Llora Con Lagrimas Y Sonido ',19),(3737373,'Muñecas','PinYponUnicornio2.png','15',4899,'ofertas','Clásicas','PINYPON UNICORNIO VOLADOR Pack de un unicornio volador con una figura de Pinypon Estrella con decoración secreta.El Unicornio tiene un mecanismo manual para mover las alas.','PinyPon Unicornio',20),(387961,'Muñecas','babyCry.png','',1980,'','Interactivos','Cry Babies Muñeca llorona Sorpresa Magic Tears Serie 1. Ya llegaron las nuevas Cry Babies! ¡Hay 24 para coleccionar y los modelos son sorpresa!¡Divertite jugando con ellos! nen con 6 divertidos accesorios: una botella, un lazo, un muñeco, una silla y 2 accesorios exclusivos para cada muñeca. Marca: Wabro.','Cry Babies Muñeca Llorona Sorpresa Magic Tears Serie 1',21),(387962,'Muñecas','babyCry3.png','5',6900,'campaña','Con sonido y movimiento','Crybabies llora con lagrimas y sonido WABRO. Crybabies empiezan a llorar con sonidos y lágrimas de verdad. 3- Ponle el chupete y dejará de llorar.Diferentes modelos para coleccionar','Cry Babies - Lea',22),(387963,'Muñecas','pepelorito.png','',3922,'','Peluches','PEPE LORITO Peluche Interactivo La granja de Zenon Peluche lorito pepe interactivo. Camina, canta y repite todo lo que dices. Incluye las canciones: El lorito Pepe','PEPE LORITO Peluche Interactivo La granja de Zenon',23),(387964,'Muñecas','funkopop.png','5',2500,'campaña','Funko','Funko es la marca de figuras coleccionables más famosa del mundo. Cómics, peliculas, videojuegos hasta cantantes y shows de TV: Juego de Tronos, Star Wars, todos los protagonistas de Disney, Marvel o DC. ','Funko Pop! Lifeline 541 Apex Legends Coleccionable',24);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_subcategoria_idx` (`id_categoria`),
  CONSTRAINT `id_subcategoria` FOREIGN KEY (`id_categoria`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `dni` char(8) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `provincia` varchar(100) DEFAULT NULL,
  `telefono` int(20) DEFAULT NULL,
  `rol` varchar(45) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `fecha_UNIQUE` (`dni`),
  UNIQUE KEY `direccion_UNIQUE` (`direccion`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Carolina','Barila','cb@hotmail.com','$2b$10$PJv4v5c.awmdYR8U/KFU6e5SVc7Ie5f9IMK5dSLLZODvNDpvDA/A.','','default.png','San Miguel','San Miguel','Bs As',34446577,'usuario','2020-10-10 14:54:13','2020-10-10 16:00:22'),(4,'Carito','Prueba','cb2@hotmail.com','$2b$10$OXfwnXhb4FEYN6ppaK0n2OdVVpTxE4FTX5Vk16d9wZe9EfW7KrGq6',NULL,'default.png',NULL,NULL,NULL,NULL,'usuario','2020-10-12 15:12:13','2020-10-12 15:12:13');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-13 14:12:31
