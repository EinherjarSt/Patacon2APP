DELIMITER //
DROP PROCEDURE IF EXISTS `add_administrator`//
CREATE PROCEDURE `add_administrator`(
IN `_run` VARCHAR(13), 
IN `_name` text, 
IN `_email` VARCHAR(320),
IN `_password` VARCHAR(70), 
IN `_position` text
) BEGIN
  INSERT INTO `administrator` (`run`, `name`, `email`, `password`, `position`) VALUES (_run, _name, _email, _password, _position);
END//

DROP PROCEDURE IF EXISTS `update_administrator`//
CREATE PROCEDURE `update_administrator`(
IN `_run` VARCHAR(13), 
IN `_name` text, 
IN `_email` VARCHAR(320),
IN `_password` VARCHAR(70), 
IN `_position` text
) BEGIN
  IF ISNULL(TRIM(`_password`)) OR (`_password` = '') THEN
      UPDATE `administrator` SET `name` = _name, 
      `email` = _email, 
      `position` = _position
       WHERE `administrator`.`run` = _run;
  ELSE
     UPDATE `administrator` SET `name` = _name, 
      `email` = _email,
      `password` = _password,
      `position` = _position
       WHERE `administrator`.`run` = _run;
  END IF;
END//
DELIMITER ;

