-- moveabout
CREATE DATABASE movie_about;

use movie_about;

CREATE TABLE `Posts` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `date` DATETIME,
    `content` TEXT,
    `anonymous` BOOLEAN,
    `mediaType` VARCHAR(255) NOT NULL,
    `addedBy` VARCHAR(255),
    PRIMARY KEY (`id`)
);

CREATE TABLE `Comments` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `postId` INT NOT NULL,
    `content` TEXT,
    `addedBy` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`postId`) REFERENCES `{Posts}`(`id`)
);

CREATE TABLE `Users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `Roles` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(60),
    PRIMARY KEY (`id`)
);

CREATE TABLE `user_roles` (
    `user_id` BIGINT NOT NULL,
    `role_id` BIGINT NOT NULL,
    PRIMARY KEY (`user_id`, `role_id`),
    FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`),
    FOREIGN KEY (`role_id`) REFERENCES `Roles`(`id`)
);

INSERT INTO roles VALUES(1,'ROLE_USER');
INSERT INTO roles VALUES(2,'ROLE_ADMIN');