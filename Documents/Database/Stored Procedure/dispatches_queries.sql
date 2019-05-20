DROP PROCEDURE IF EXISTS register_dispatch;
DELIMITER //
CREATE PROCEDURE register_dispatch (  
  IN ref_driverValue  VARCHAR(13),
  IN ref_truckValue  VARCHAR(6),
  IN ref_planificationValue INT(11),
  IN shippedKilogramsValue  INT(5),
  IN arrivalAtVineyardDateValue  DATETIME,
  IN arrivalAtPataconDateValue  DATETIME,
  IN containerTypeValue  VARCHAR(255),
  IN statusValue  TEXT
)
BEGIN
  INSERT INTO dispatch (ref_planification, ref_driver, ref_truck, status, arrivalAtVineyardDate, arrivalAtPataconDate,
  shippedKilograms, containerType) VALUES (ref_planificationValue, ref_driverValue, ref_truckValue, statusValue, arrivalAtVineyardDateValue, arrivalAtPataconDateValue,
  shippedKilogramsValue, containerTypeValue);
END //
DELIMITER ; 

DROP PROCEDURE IF EXISTS delete_dispatch;
DELIMITER //
CREATE PROCEDURE delete_dispatch (  
  IN dispatch_id INT
)
BEGIN
  DELETE FROM dispatch WHERE id_dispatch = dispatch_id;
END //
DELIMITER ; 

DROP PROCEDURE IF EXISTS edit_dispatch;
DELIMITER //
CREATE PROCEDURE edit_dispatch (  
  IN dispatch_id INT,
  IN ref_driverValue  VARCHAR(13),
  IN ref_truckValue  VARCHAR(6),
  IN ref_planificationValue INT(11),
  IN shippedKilogramsValue  INT(5),
  IN arrivalAtVineyardDateValue  DATETIME,
  IN arrivalAtPataconDateValue  DATETIME,
  IN containerTypeValue  VARCHAR(255),
  IN statusValue  TEXT
)
BEGIN

  UPDATE dispatch 
  SET ref_driver = ref_driverValue,
  ref_truck = ref_truckValue,
  shippedKilograms = shippedKilogramsValue,
  arrivalAtPataconDate = arrivalAtPataconDateValue,
  arrivalAtVineyardDate = arrivalAtVineyardDateValue,
  containerType = containerTypeValue,
  status = statusValue
  WHERE id_dispatch = dispatch_id;

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS get_dispatches_with_full_info;
DELIMITER //
CREATE PROCEDURE get_dispatches_with_full_info ()
BEGIN
  SELECT dispatch.status AS dispatchStatus,
  dispatch.ref_driver AS driverRef,
  dispatch.ref_truck AS truckLicensePlate,
  dispatch.id_dispatch AS dispatchId,
  dispatch.arrivalAtPataconDate AS arrivalAtPataconDatetime,
  dispatch.arrivalAtVineyardDate AS arrivalAtVineyardDatetime,
  dispatch.shippedKilograms AS shippedKilograms,
  dispatch.containerType AS containerType,
  driver.run AS driverRun,
  driver.name AS driverName,
  driver.surname AS driverSurname,
  driver.phoneNumber AS driverPhoneNumber,
  producer.name AS producerName,
  location.address AS producerLocation,
  truck.ref_gps AS truckGPSImei
  FROM dispatch
  INNER JOIN planification ON dispatch.ref_planification = planification.planification_id
  INNER JOIN driver ON dispatch.ref_driver = driver.run
  INNER JOIN location ON planification.ref_location = location.id_location
  INNER JOIN producer ON planification.ref_producer = producer.rut
  INNER JOIN truck ON dispatch.ref_truck = truck.licencePlate
  WHERE dispatch.status <> 'Terminado' 
  && dispatch.status <> 'Pendiente'
  && truck.ref_gps IS NOT NULL;
END //