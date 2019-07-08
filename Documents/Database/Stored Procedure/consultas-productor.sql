DELIMITER //
DROP PROCEDURE IF EXISTS `add_producer`//
CREATE PROCEDURE `add_producer`(
	IN `_name` text,
	IN `_rut` VARCHAR(13)
) 
BEGIN
	DECLARE producer_num integer default 0;

	SET producer_num = (SELECT COUNT(rut) FROM `producer` WHERE producer.rut = _rut);

	IF( producer_num = 1) THEN
		UPDATE `producer` SET `name` = _name, `disabled` = 0 WHERE `rut` = _rut;
	ELSE
		INSERT INTO `producer` (`name`,`rut`, `disabled`) VALUES (_name, _rut, 0);
	END IF;
END//

DROP PROCEDURE IF EXISTS `add_location`//
CREATE PROCEDURE `add_location`(
	IN `_ref_producer` VARCHAR(13),
	IN `_address` text,
	IN `_latitude` VARCHAR(255),
	IN `_longitude` VARCHAR(255),
	IN `_manager` text,
	IN `_managerPhoneNumber` VARCHAR(12)
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
       WHERE `producer`.`rut` = _rut;
END//

DROP PROCEDURE IF EXISTS `delete_producer`//
CREATE PROCEDURE `delete_producer`(
	IN `_rut` VARCHAR(13)
) BEGIN
     UPDATE `producer` SET 
      `disabled` = 1
       WHERE `producer`.`rut` = _rut;
END//

DROP PROCEDURE IF EXISTS `update_location`//
CREATE PROCEDURE `update_location`(
	IN `_id_location` int(11),
	IN `_ref_producer` VARCHAR(13),
	IN `_address` text,
	IN `_latitude` VARCHAR(255),
	IN `_longitude` VARCHAR(255),
	IN `_manager` text,
	IN `_managerPhoneNumber` VARCHAR(12)
) BEGIN
     UPDATE `location` SET 
      `address` = _address,
      `latitude` = _latitude,
      `longitude` = _longitude,
      `manager` = _manager,
      `managerPhoneNumber` = _managerPhoneNumber
       WHERE `location`.`id_location` = _id_location;
END//
DELIMITER ;