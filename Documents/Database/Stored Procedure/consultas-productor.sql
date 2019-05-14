DELIMITER //
DROP PROCEDURE IF EXISTS `add_producer`//
CREATE PROCEDURE `add_producer`(
	IN `_name` text,
	IN `_rut` VARCHAR(13)
) BEGIN
  INSERT INTO `producer` (`name`,`rut`) VALUES (_name, _rut);
END//

DROP PROCEDURE IF EXISTS `add_location`//
CREATE PROCEDURE `add_location`(
	IN `_ref_producer` VARCHAR(13),
	IN `_address` text,
	IN `_latitude` VARCHAR(255),
	IN `_longitude` VARCHAR(255),
	IN `_manager` text,
	IN `_managerPhoneNumber` VARCHAR(11)
) BEGIN
  INSERT INTO `location` (`ref_producer`, `address`, `latitude`, `longitude`, `manager`, `managerPhoneNumber`)
  VALUES (_ref_producer, _address, _latitude, _longitude, _manager, _managerPhoneNumber);
END//

DROP PROCEDURE IF EXISTS `update_producer`//
CREATE PROCEDURE `update_producer`(
	IN `_name` text,
	IN `_rut` VARCHAR(13)
) BEGIN
     UPDATE `producer` SET 
      `name` = _name
       WHERE `rut` = _rut;
END//
DELIMITER ;