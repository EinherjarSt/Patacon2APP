DELIMITER //
DROP PROCEDURE IF EXISTS `add_producer`//
CREATE PROCEDURE `add_producer`(
	IN `_name` text,
	IN `_rut` VARCHAR(13),
	IN `_manager` text,
	IN `_telephone` VARCHAR(11)
) BEGIN
  INSERT INTO `producer` (`name`,`rut`,`manager`,`telephone`) VALUES (_name, _rut, _telephone, _manager);
END//

DROP PROCEDURE IF EXISTS `update_producer`//
CREATE PROCEDURE `update_producer`(
	IN `_name` text,
	IN `_rut` VARCHAR(13),
	IN `_manager` text,
	IN `_telephone` VARCHAR(11)
) BEGIN
     UPDATE `producer` SET 
      `name` = _name,  
      `manager` = _manager,
      `telephone` = _telephone
       WHERE `rut` = _rut;
END//
DELIMITER ;