DELIMITER //
DROP PROCEDURE IF EXISTS `add_user`//
CREATE PROCEDURE `add_user`(
IN `_run` VARCHAR(13), 
IN `_name` text, 
IN `_surname` text, 
IN `_surname2` text, 
IN `_email` VARCHAR(320),
IN `_password` VARCHAR(70), 
IN `_position` text
) BEGIN
  INSERT INTO `user` (`run`, `name`, `surname`, `surname2`,`email`, `password`, `position`) VALUES (_run, _name, _surname, _surname2, _email, _password, _position);
END//

DROP PROCEDURE IF EXISTS `update_user`//
CREATE PROCEDURE `update_user`(
IN `_run` VARCHAR(13), 
IN `_name` text, 
IN `_surname` text, 
IN `_surname2` text, 
IN `_email` VARCHAR(320),
IN `_password` VARCHAR(70), 
IN `_position` text
) BEGIN
  IF ISNULL(TRIM(`_password`)) OR (`_password` = '') THEN
      UPDATE `user` SET 
      `name` = _name, 
      `surname` = _surname, 
      `surname2` = _surname2, 
      `email` = _email, 
      `position` = _position
       WHERE `user`.`run` = _run;
  ELSE
     UPDATE `user` SET 
      `name` = _name, 
      `surname` = _surname, 
      `surname2` = _surname2,
      `email` = _email,
      `password` = _password,
      `position` = _position
       WHERE `user`.`run` = _run;
  END IF;
END//

DROP PROCEDURE IF EXISTS `update_user_status`//
CREATE PROCEDURE `update_user_status`(
IN `_run` VARCHAR(13), 
IN `_status` TINYINT
) BEGIN
     UPDATE `user` SET 
      `status` = _status
       WHERE `user`.`run` = _run;
END//
DELIMITER ;

