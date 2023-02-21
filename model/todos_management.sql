CREATE DATABASE todos_management;
use todos_management;

CREATE TABLE `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45),
  `email` varchar(45),
  `createdAt` datetime,
  `updatedAt` datetime,
  PRIMARY KEY (`id`)
);

CREATE TABLE `todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_group_id` int(11),
  `title` varchar(45),
  `is_active` boolean,
  `priority` varchar(45),
  `createdAt` datetime,
  `updatedAt` datetime,
  PRIMARY KEY (`id`)
);