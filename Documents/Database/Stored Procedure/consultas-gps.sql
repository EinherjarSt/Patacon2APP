DELIMITER //
DROP PROCEDURE IF EXISTS `add_gps`//
CREATE PROCEDURE `add_gps`(
IN `_imei` VARCHAR(100), 
IN `_simNumber` VARCHAR(255), 
IN `_brand` VARCHAR(255), 
IN `_model` VARCHAR(255)
) BEGIN
  INSERT INTO `gps` (`imei`, `simNumber`, `brand`, `model`) VALUES (_imei, _simNumber, _brand, _model);
END//

DROP PROCEDURE IF EXISTS `update_gps`//
CREATE PROCEDURE `update_gps`(
IN `_imei` VARCHAR(100), 
IN `_simNumber` VARCHAR(255), 
IN `_brand` VARCHAR(255), 
IN `_model` VARCHAR(255)
) BEGIN
     UPDATE `gps` SET 
      `simNumber` = _simNumber, 
      `brand` = _brand,
      `model` = _model
       WHERE `gps`.`imei` = _imei;
END//

DROP PROCEDURE IF EXISTS `delete_gps`//
CREATE PROCEDURE `delete_gps`(
IN `_imei` VARCHAR(100)
) BEGIN
     DELETE from `gps` WHERE `imei`=_imei;
END//
DELIMITER ;
