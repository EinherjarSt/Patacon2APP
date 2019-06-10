DELIMITER //
DROP PROCEDURE IF EXISTS `add_planification`//
CREATE PROCEDURE `add_planification`(
IN `_ref_producer` VARCHAR(13),
IN `_ref_location` int,
IN `_grapeVariety` text,
IN `_harvestingType` text,
IN `_containerType` VARCHAR(255),
IN `_kilograms` int,
IN `_quality` int,
IN `_freight`int,
IN `_comment` text,
IN `_date` text

) BEGIN
  INSERT INTO `planification` ( `ref_producer`, `ref_location`,`containerType`,`harvestingType`,`kilograms`,
  	`quality`,`freight`,`comment`,`date`) VALUES (_ref_producer, _ref_location, _grapeVariety, _harvestingType, _containerType,
  	_kilograms, _quality, _freight, _comment,_date);
END//

DROP PROCEDURE IF EXISTS `update_planification`//
CREATE PROCEDURE `update_planification`(
IN `_planification_id` int,
IN `_ref_producer` VARCHAR(13),
IN `_ref_location` int,
IN `_grapeVariety` text,
IN `_harvestingType` text,
IN `_containerType` VARCHAR(255),
IN `_kilograms` int,
IN `_quality` int,
IN `_freight`int,
IN `_comment` text,
IN `_date` text
) BEGIN
     UPDATE `planification` SET 
     `ref_producer` = _ref_producer,
     `ref_location` = _ref_location,
     `containerType` = _containerType,
     `harvestingType` = _harvestingType,
     `kilograms` = _kilograms,
  	 `quality` = _quality,
  	 `freight`= _freight,
  	 `comment` = _comment,
  	 `date` = _date
     WHERE `planification`.`planification_id` = _planification_id;
END//
DELIMITER ;