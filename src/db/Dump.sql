-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: pokedex
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pokemons`
--

DROP TABLE IF EXISTS `pokemons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `hp` int NOT NULL,
  `cp` int NOT NULL,
  `picture` varchar(255) NOT NULL,
  `types` varchar(255) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemons`
--

LOCK TABLES `pokemons` WRITE;
/*!40000 ALTER TABLE `pokemons` DISABLE KEYS */;
INSERT INTO `pokemons` VALUES (1,'Bulbizarre',25,5,'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png','Plante,Poison','2023-07-12 07:19:22'),(3,'Carapuce',21,4,'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png','Eau','2023-07-12 07:19:22'),(4,'Roucool',30,7,'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png','Normal,Vol','2023-07-12 07:19:22'),(5,'Rattata',18,6,'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/019.png','Normal','2023-07-12 07:19:22'),(6,'Piafabec',14,5,'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/021.png','Normal,Vol','2023-07-12 07:19:22'),(7,'Abo',16,4,'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/023.png','Poison','2023-07-12 07:19:22'),(8,'Pikachu',21,7,'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png','Electrik','2023-07-12 07:19:22'),(9,'Sabelette',19,3,'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/027.png','Normal','2023-07-12 07:19:22'),(10,'Mélofée',25,5,'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/035.png','Fée','2023-07-12 07:19:22'),(11,'Groupix',17,8,'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/037.png','Feu','2023-07-12 07:19:22'),(12,'Aspicot',16,2,'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/013.png','Insecte,Poison','2023-07-12 07:19:22'),(14,'Bahamut',25,5,'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png','vol','2023-07-12 07:19:22');
/*!40000 ALTER TABLE `pokemons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'pikachu','$2b$10$TrbqF9GtLG1qwf/i18To3uRjUIAI9rKtoJ3T4vC2tl86FWCdDnN3m','2023-07-12 07:19:23','2023-07-12 07:19:23');
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

-- Dump completed on 2023-07-12 11:02:37
insert into pokemons values (16"anneso", 30, 30, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png", "anne, so", "2023-07-13");