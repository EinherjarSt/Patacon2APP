DROP PROCEDURE IF EXISTS get_route;
DELIMITER //
CREATE PROCEDURE get_route(IN `_id_location` int)
BEGIN
	SELECT route.id_route AS idRoute,
	route.routes AS routes,
	route.ref_location AS refLocation,
	location.address AS addressLocation,
	location.ref_producer AS refProducer,
	location.latitude,
	location.longitude,
	location.manager,
	location.managerPhoneNumber
	FROM route,location
	WHERE
	route.ref_location = location.id_location AND
	route.ref_location = _id_location;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `add_route`;
DELIMITER //
CREATE PROCEDURE `add_route`(
IN `_routes` json,
IN `_ref_location` int

) BEGIN
  INSERT INTO `route` ( `routes`, `ref_location`) VALUES (_routes, _ref_location);
END//
DELIMETER;

DROP PROCEDURE IF EXISTS get_info_routes;
DELIMITER //
CREATE PROCEDURE get_info_routes()
BEGIN
	SELECT 
	route.id_route AS idRoute,
	producer.rut AS idProducer,
	producer.name AS producerName, 
	location.id_location AS idLocation, 
	location.address AS locationName
	FROM location,producer, route
	WHERE producer.rut = location.ref_producer AND
	route.ref_location = location.id_location;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS get_producers_without_routes;
DELIMITER //
CREATE PROCEDURE get_producers_without_routes()
BEGIN
SELECT location.id_location,
location.ref_producer,
location.latitude,
location.longitude,
location.manager,
location.managerPhoneNumber,
producer.`name` AS nameProducer
FROM location, producer
WHERE location.ref_producer = producer.rut AND location.id_location NOT IN
(SELECT route.ref_location FROM route);
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `update_route`;
DELIMITER //
CREATE PROCEDURE `update_route`(
IN `_ref_location` int,
IN `_routes` json
) BEGIN
  UPDATE route 
  SET  `routes` = _routes
  WHERE ref_location = _ref_location;
END//
DELIMETER;
