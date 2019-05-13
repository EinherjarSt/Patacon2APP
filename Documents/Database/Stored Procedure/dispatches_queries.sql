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


DELIMITER //
CREATE PROCEDURE delete_dispatch (  
  IN dispatch_id INT,
)
BEGIN
  DELETE FROM dispatch WHERE id_dispatch = dispatch_id;
END //
DELIMITER ; 


