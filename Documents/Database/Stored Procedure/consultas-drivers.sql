DELIMITER //
DROP PROCEDURE IF EXISTS `add_driver`//
CREATE PROCEDURE `add_driver`(
IN `_run` VARCHAR(13), 
IN `_name` text,
IN `_surname` text,
IN `_surname2` text,
IN `_telephone` text
) BEGIN
  INSERT INTO `driver` (`run`, `name`, `surname`,`surname2`,`telephone`) VALUES (_run, _name, _surname, _surname2, _telephone);
END//

DROP PROCEDURE IF EXISTS `update_driver`//
CREATE PROCEDURE `update_driver`(
IN `_run` VARCHAR(13), 
IN `_name` text,
IN `_surname` text,
IN `_surname2` text,
IN `_telephone` text
) BEGIN
     UPDATE `driver` SET 
     `name` = _name,
     `surname` = _surname,
     `surname2` = _surname2,
     `telephone` = _telephone
     WHERE `run` = _run;
END//
DELIMITER ;

