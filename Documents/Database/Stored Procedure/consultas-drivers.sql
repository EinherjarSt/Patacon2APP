DELIMITER //
DROP PROCEDURE IF EXISTS `add_driver`//
CREATE PROCEDURE `add_driver`(
IN `_run` VARCHAR(13), 
IN `_name` text,
IN `_surname` text,
IN `_surname2` text,
IN `_phoneNumber` text
) BEGIN
  INSERT INTO `driver` (`run`, `name`, `surname`,`surname2`,`phoneNumber`) VALUES (_run, _name, _surname, _surname2, _phoneNumber);
END//

DROP PROCEDURE IF EXISTS `update_driver`//
CREATE PROCEDURE `update_driver`(
IN `_run` VARCHAR(13), 
IN `_name` text,
IN `_surname` text,
IN `_surname2` text,
IN `_phoneNumber` text
) BEGIN
     UPDATE `driver` SET 
     `name` = _name,
     `surname` = _surname,
     `surname2` = _surname2,
     `phoneNumber` = _phoneNumber
     WHERE `run` = _run;
END//

DROP PROCEDURE IF EXISTS `disable_driver`//
CREATE PROCEDURE `disable_driver`(
IN `_run` VARCHAR(13), 
IN `_disabled` TINYINT
) BEGIN
     UPDATE `driver` SET 
      `disabled` = _disabled
       WHERE `run` = _run;
END//

DROP PROCEDURE IF EXISTS `delete_driver`//
CREATE PROCEDURE `delete_driver`(
IN `_run` VARCHAR(13)
) BEGIN
     DELETE FROM driver
     WHERE `run` = _run;
END//
DELIMITER ;