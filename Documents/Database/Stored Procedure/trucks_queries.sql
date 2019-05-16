DELIMITER //
DROP PROCEDURE IF EXISTS `add_truck`//
CREATE PROCEDURE `add_truck`(
IN `_licencePlate` VARCHAR(13), 
IN `_brand` text, 
IN `_model` text, 
IN `_year` text, 
IN `_maxLoad` text,
IN `_owner` text, 
IN `_color` text
) BEGIN
  INSERT INTO `truck` (`licencePlate`, `brand`, `model`, `year`,`maxLoad`, `owner`, `color`) VALUES (_licencePlate, _brand, _model, _year, _maxLoad, _owner, _color);
END//

DELIMITER //
DROP PROCEDURE IF EXISTS `update_truck`//
CREATE PROCEDURE `update_truck`(
IN `_licencePlate` VARCHAR(13), 
IN `_brand` text, 
IN `_model` text, 
IN `_year` text, 
IN `_maxLoad` text,
IN `_owner` text, 
IN `_color` text
) BEGIN
  UPDATE `truck` SET 
     `licencePlate` = _licencePlate,
     `brand` = _brand,
     `model` = _model,
     `year` =  _year,
     `maxLoad` = _maxLoad,
     `owner` = _owner,
     `color` = _color
     WHERE `licencePlate` = _licencePlate;
END//

DELIMITER //
DROP PROCEDURE IF EXISTS `disable_truck`//
CREATE PROCEDURE `disable_truck`(
IN `_licencePlate` VARCHAR(13),
IN `_disabled` TINYINT
) BEGIN
     UPDATE `truck` SET 
      `disabled` = _disabled
       WHERE `licencePlate` = _licencePlate;
END//

DELIMITER //
DROP PROCEDURE IF EXISTS `delete_truck`//
CREATE PROCEDURE `disable_truck`(
IN `_licencePlate` VARCHAR(13),
) BEGIN
     DELETE `truck` WHERE `licencePlate` = _licencePlate;
END//

DELIMITER ;