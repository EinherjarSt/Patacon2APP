DELIMITER //
DROP PROCEDURE IF EXISTS `add_route`//
CREATE PROCEDURE `add_route`(
IN `_routes` JSON, 
IN `_ref_location` INT(11)
) BEGIN
  INSERT INTO `route` (`routes`, `ref_location`) VALUES (_routes, _ref_location);
END//

DROP PROCEDURE IF EXISTS `delete_route`//
CREATE PROCEDURE `delete_route`(
IN `_id_route` INT(11)
) BEGIN
     DELETE from `route` WHERE `id_route`=_id_route;
END//
DELIMITER ;