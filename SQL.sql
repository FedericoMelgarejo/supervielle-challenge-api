-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema api_supervielle
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema api_supervielle
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `api_supervielle` DEFAULT CHARACTER SET utf8 ;
USE `api_supervielle` ;

-- -----------------------------------------------------
-- Table `api_supervielle`.`pais`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `api_supervielle`.`pais` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `api_supervielle`.`tipo_de_documento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `api_supervielle`.`tipo_de_documento` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `tipo_de_documento` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `api_supervielle`.`personas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `api_supervielle`.`personas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `documento` VARCHAR(45) NOT NULL,
  `sexo` VARCHAR(45) NOT NULL,
  `edad` VARCHAR(45) NOT NULL,
  `contacto` VARCHAR(45) NOT NULL,
  `fk_tipo_de_documento_id` INT(11) NOT NULL,
  `fk_pais_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_persona_tipo_de_documento1_idx` (`fk_tipo_de_documento_id` ASC),
  INDEX `fk_personas_pais1_idx` (`fk_pais_id` ASC),
  CONSTRAINT `fk_persona_tipo_de_documento1`
    FOREIGN KEY (`fk_tipo_de_documento_id`)
    REFERENCES `api_supervielle`.`tipo_de_documento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_personas_pais1`
    FOREIGN KEY (`fk_pais_id`)
    REFERENCES `api_supervielle`.`pais` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `api_supervielle`.`tipo_de_relacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `api_supervielle`.`tipo_de_relacion` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `tipo_de_relacion` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `api_supervielle`.`relaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `api_supervielle`.`relaciones` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `persona_relacionada` INT(11) NULL DEFAULT NULL,
  `fk_tipo_de_relacion_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_relaciones_tipo_de_relacion1_idx` (`fk_tipo_de_relacion_id` ASC),
  CONSTRAINT `fk_relaciones_tipo_de_relacion1`
    FOREIGN KEY (`fk_tipo_de_relacion_id`)
    REFERENCES `api_supervielle`.`tipo_de_relacion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `api_supervielle`.`relaciones_por_persona`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `api_supervielle`.`relaciones_por_persona` (
  `fk_personas_id` INT(11) NOT NULL,
  `fk_relaciones_id` INT(11) NOT NULL,
  PRIMARY KEY (`fk_personas_id`, `fk_relaciones_id`),
  INDEX `fk_personas_has_relaciones_relaciones1_idx` (`fk_relaciones_id` ASC),
  INDEX `fk_personas_has_relaciones_personas1_idx` (`fk_personas_id` ASC),
  CONSTRAINT `fk_personas_has_relaciones_personas1`
    FOREIGN KEY (`fk_personas_id`)
    REFERENCES `api_supervielle`.`personas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_personas_has_relaciones_relaciones1`
    FOREIGN KEY (`fk_relaciones_id`)
    REFERENCES `api_supervielle`.`relaciones` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
