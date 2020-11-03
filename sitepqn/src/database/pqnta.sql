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
  KEY `id_producto_idx` (`id_producto`),
  KEY `id_usuario_idx` (`id_usuario`),
  CONSTRAINT `id_producto` FOREIGN KEY (`id_producto`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Vehiculos',NULL),(2,'Juego de Mesa',NULL),(3,'Muñecos de acción',NULL),(4,'Juegos de Ingenio',NULL),(5,'Muñecas',NULL);
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sku` varchar(45) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(450) NOT NULL,
  `precio` int(11) NOT NULL,
  `categoria` int(11) NOT NULL,
  `subcategoria` int(11) NOT NULL,
  `fotos` varchar(300) NOT NULL,
  `seccion` varchar(45) DEFAULT NULL,
  `descuento` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `img1_UNIQUE` (`fotos`),
  UNIQUE KEY `sku_UNIQUE` (`sku`),
  KEY `idCategoria_idx` (`categoria`),
  KEY `id_subcategoria_idx` (`subcategoria`),
  CONSTRAINT `id_categoria` FOREIGN KEY (`categoria`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_subcategoria` FOREIGN KEY (`subcategoria`) REFERENCES `subcategories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'387958','Camión de Tránsito Urbano Original Roma 1440','Camión de Tránsito Urbano Original Roma 1440¡Volá tu imaginación jugando con estos increíbles juguetes de Roma Rodados!Muchísimos modelos para escoger',1160,1,1,'lego-city-camion.png','Ofertas',5,NULL,NULL),(3,'387960','Auto Roadster Convertible Roma Brinquedos Amarillo','Auto Convertible Roadster.- Cuenta con icreíbles detalles en sus neumáticos y llantas. El techo está rebatido por lo que se puede ver el interior del auto. Diseño deportivo y realista.',799,1,2,'autoamarilloroadster.png','',0,NULL,NULL),(4,'387961','Excavadora De Construccion A Friccion Good Quality','Manos a la obra en tu vehiculo con luces y sonidos. Divertite con los vehículos de tu ciudad! Incluye 3 bateria tipo boton (1,5v)',1530,1,2,'excavadora.png','Visitadas',15,NULL,NULL),(5,'387962','VEHÍCULO A RADIO CONTROL FERRARI','Vehiculo a Radio Control Ferrari 599XX XQ - Contiene: 1 auto con control remoto - Modelo del auto Ferrari. Requiere pilas: vehiculo 3 AAA, control remoto 9V. Marca: XQ',3200,1,5,'autoradiocontrol1.png','Visitadas',0,NULL,NULL),(6,'387963','QUORIDOR','El Quoridor es un juego de mesa abstracto de estrategia para dos o más personas. El objetivo del juego es simple: hay que lograr lleva el peón al otro lado. Para hacerlo, o mejor dicho, para evitar que algún rival lo logre, contamos con barreras que podremos ubicar en el camino para hacer del camino directo un intrincado laberinto. Un juego que requiere estrategia y rapidez mental.',2600,4,7,'quoridor01.jpg','',0,NULL,NULL),(7,'387964','PANIC LAB','Panic Lab es un juego de mesa en el que tenemos que cuidar nuestro preciado laboratorio de la fuga de unas amebas. ¡Las amebas se escaparon y están moviéndose para todos lados, todos juegan juntos y al mismo tiempo. Un juego rápido, de reglas simples para desafiar a los más atentos.',2788,4,9,'panic-lab3.jpg','',0,NULL,NULL),(8,'387965','KATAMINO','Katamino es un juego de construcción al estilo rompecabezas. Contiene múltiples fichas que intentaremos acomodar en el tablero. Más de 500 desafíos para mentes inquietas y creativas.',2809,4,10,'monopoly.jpg','',0,NULL,NULL),(9,'387966','Bumblebee Transformers Cyberverse Hasbro ','Transformers Cyberverse Figura Coleccionable Hasbro E1884. Convierte y ataca fácilmente con juguetes Transformers Cyberverse Action Attackers!',2750,3,18,'transformer.png','Oferta',20,NULL,NULL),(10,'387967','Máscara Iron Man Marvel Avengers B9945 Hasbro','Máscara Iron Man Marvel Avengers B9945 Hasbro Original. Gran máscara de plástico duro.Con elástico ajustable.- Incluye 1 protector de goma para los ojos y para mayor comodidad.Marca: Hasbro',1345,3,19,'mascara iron man.png','',0,NULL,NULL),(11,'387968','Fortnite Battle Karting Combate C/1 Fig Y Acc Int 63554 ','FORTNITE BATTLE ROYALE KARTING Fortnite, el epico videojuego mas conocido de la historia, sale de la pantalla con las figuras de sus personajes.',1734,3,20,'fortnite-battle.png','Visitadas',0,NULL,NULL),(12,'387969','Muñeco Star Wars Rey Skywalker Articulado Marca Hasbro ','ORIGINAL STAR WARS® MARCA HASBRO™',1789,3,21,'muneco-star-wars-rey.png','Campaña',15,NULL,NULL),(13,'387970','Funko Pop First Order Snowtrooper 67 - Star Wars','Funko es la marca de figuras coleccionables más famosa del mundo. ¿El motivo? ¡Podés disfrutar de tus personajes favoritos!  Ideal para coleccionistas y para regalar. ¿Lo mejor de todo? Son perfectos para TODAS las edades.',1999,3,22,'funko-pop-star-wars-snap.png','Campaña',5,NULL,NULL),(14,'38800','Camión Lego','Los niños se convertirán en héroes cotidianos mientras se divierten con el fantástico juego LEGO® City Camión de los Helados',4899,3,8,'foto-1603394117547.png','Ofertas',5,'2020-10-22 19:15:17','2020-10-22 19:15:17'),(15,'387972','Juego Mesa Viaje De Emociones Explora Inteligencia Emocional',' Incluye guia para padres y tutores. Viaje de emociones es una ocasión para compartir lo que sentis, expresar lo que pensas y afianzar la unión y el vinculo con los otros jugadores. Marca: Barco de Papel',979,2,9,'juego-mesa-emociones.jpg','Campaña',10,NULL,NULL),(16,'387973','Juego De Ciencias La Ciencia Del Agua Galileo Italy','JUEGO DE CIENCIAS – LA CIENCIA DEL AGUA. Laboratorio de ciencias para niños. Experimentos divertidos de física y química, para aprender la importancia del agua, valorando y cuidando juntos el medio ambiente.',2750,2,9,'juego-de-ciencias.jpg','Ofertas',5,NULL,NULL),(17,'387974','Señor Y Señora Cara De Papa Toy Story Hasbro','Descubre todas las posibilidades de crear y mezclar los accesorios diferentes, los niños pueden usar su imaginación para un montón de juego creativo armando su propio muñeco de papa.',2290,5,18,'mrPapa2.png','Campaña',15,NULL,NULL),(18,'387975','Piny Pon y sus amigos','Prepárate para un sin fin de nuevas aventuras, acompañando con el resto de tus figuras de la linea Pinypon Mix & Match Queen’s y todas tus figuras Pinypon, todos son bienvenidos en este mágico lugar.',6290,5,18,'PiniPoyDelivery.png','Visitadas',0,NULL,NULL),(19,'387976','Crybabies Llora Con Lagrimas Y Sonido ','Crybabies llora con lagrimas y sonido WABRO - Si le quitas el chupete llorará cada vez más hasta recuperarlo.Diferentes modelos para coleccionar: CHIC, RUTHY, FANCY, PANDY, DOTTY, LADY y NALA.- ¡Lloran lagrimas de verdad!',6809,5,18,'babyCryCaja.png','Ofertas',15,NULL,NULL),(20,'387977','PinyPon Unicornio','PINYPON UNICORNIO VOLADOR Pack de un unicornio volador con una figura de Pinypon Estrella con decoración secreta.El Unicornio tiene un mecanismo manual para mover las alas.',4899,5,18,'PinYponUnicornio2.png','Ofertas',15,NULL,NULL),(21,'387978','Cry Babies Muñeca Llorona Sorpresa Magic Tears Serie 1','Cry Babies Muñeca llorona Sorpresa Magic Tears Serie 1. Ya llegaron las nuevas Cry Babies! ¡Hay 24 para coleccionar y los modelos son sorpresa!¡Divertite jugando con ellos! nen con 6 divertidos accesorios: una botella, un lazo, un muñeco, una silla y 2 accesorios exclusivos para cada muñeca. Marca: Wabro.',1980,5,18,'babyCry.png','Ofertas',10,NULL,NULL),(22,'387979','Cry Babies - Lea','Crybabies llora con lagrimas y sonido WABRO. Crybabies empiezan a llorar con sonidos y lágrimas de verdad. 3- Ponle el chupete y dejará de llorar.Diferentes modelos para coleccionar',6900,5,18,'babyCry3.png','Campaña',5,NULL,NULL),(23,'387980','PEPE LORITO Peluche Interactivo La granja de Zenon','PEPE LORITO Peluche Interactivo La granja de Zenon Peluche lorito pepe interactivo. Camina, canta y repite todo lo que dices. Incluye las canciones: El lorito Pepe',3922,5,18,'pepelorito.png','',8,NULL,NULL),(24,'387981','Funko Pop! Lifeline 541 Apex Legends Coleccionable','Funko es la marca de figuras coleccionables más famosa del mundo. Cómics, peliculas, videojuegos hasta cantantes y shows de TV: Juego de Tronos, Star Wars, todos los protagonistas de Disney, Marvel o DC. ',2500,5,17,'funkopop.png','',5,NULL,NULL),(29,'846532','Producto Prueba añadir','123131jjnjdnj ajskdhjiasd ',10000,5,18,'foto-1603487946503.png','',0,'2020-10-23 21:19:06','2020-10-23 21:19:06'),(34,'389999','Camión Mate','Camión Mate',988,1,14,'foto-1603546272465.png','Ofertas',5,'2020-10-24 13:31:12','2020-10-24 13:31:12'),(46,'400010','Dinosaurio Familia','Prueba de carga de fotos de validación del Frontend',988,4,12,'fotos-1603817988271.png','',0,'2020-10-27 16:53:55','2020-10-27 16:59:48'),(47,'400012','Prueba','Prueba de carga de productos',4444,1,12,'foto-1603852593422.png','Ofertas',5,'2020-10-28 02:36:33','2020-10-28 02:36:33');
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
  `categoria` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCategoria_idx` (`categoria`),
  CONSTRAINT `idCategoria` FOREIGN KEY (`categoria`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Camiones',1),(2,'Autos',1),(3,'Motos',1),(4,'Coleccion',1),(5,'Especiales',1),(6,'Construcción',1),(7,'Ciencia',2),(8,'Bloques',2),(9,'Especiales',2),(10,'Clasicos',4),(11,'Infantil',4),(12,'Adultos',4),(13,'Clasicos',5),(14,'Interactivos',5),(15,'Con sonido y movimientos',5),(16,'Peluche',5),(17,'Funko',5),(18,'Muñecos',3),(19,'Accesorios',3),(20,'Vehiculos de acción',3),(21,'Starwars',3),(22,'Funko',3);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Carito','Barila','cb2@hotmail.com','$2b$10$JUbBpeT93bMDaJYxjqWe2OTo2UGmnI7mYfbr.zqu0vB79j6rgzVPa',NULL,'avatar-1603890457674.jpg',NULL,NULL,NULL,NULL,'admin','2020-10-28 13:07:38','2020-10-28 13:07:38'),(3,'','','menaericdaniel@gmail.com','$2b$10$JSbPlSi48hJ6JeMZE3dbVOHYz5rn7ba.w1ayKqLx8K2cWxOII.EHC','','avatar-1604322406531.jpg','','','',0,'admin','2020-11-02 13:06:46','2020-11-02 13:13:09');
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

-- Dump completed on 2020-11-02 21:57:18
