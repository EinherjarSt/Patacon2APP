DELIMITER //
DROP PROCEDURE IF EXISTS `add_driver`//
CREATE PROCEDURE `add_driver`(
IN `_run` VARCHAR(13), 
IN `_name` text
) BEGIN
  INSERT INTO `driver` (`run`, `name`) VALUES (_run, _name);
END//

DROP PROCEDURE IF EXISTS `update_driver`//
CREATE PROCEDURE `update_driver`(
IN `_run` VARCHAR(13), 
IN `_name` text
) BEGIN
     UPDATE `driver` SET 
     `name` = _name
     WHERE `run` = _run;
END//
DELIMITER ;

