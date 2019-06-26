DROP PROCEDURE IF EXISTS edit_dispatch_insights_data;
DELIMITER //
CREATE PROCEDURE edit_dispatch_insights_data (  
  IN dispatchReference INT,
  IN stoppedTime INT,
  IN unloadYardTime INT,
  IN textMessagesSent INT,
  IN lastMessageSentDate  DATETIME
)
BEGIN

  UPDATE insights_data 
  SET stoppedTime = stoppedTime,
  unloadYardTime = unloadYardTime,
  textMessagesSent = textMessagesSent,
  lastMessageSentDate = lastMessageSentDate
  WHERE dispatchReference = dispatchReference;

END //
DELIMITER ;




DROP PROCEDURE IF EXISTS edit_time_per_status;
DELIMITER //
CREATE PROCEDURE edit_time_per_status (  
  IN dispatchId INT,
  IN stoppedTime TEXT,
  IN inUnloadYardTime TEXT
)
BEGIN
  UPDATE insights_data 
  SET stoppedTime = stoppedTime,
  unloadYardTime = inUnloadYardTime
  WHERE refDispatch = dispatchId;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS edit_last_message_sent_data;
DELIMITER //
CREATE PROCEDURE edit_last_message_sent_data (  
  IN dispatchId INT,
  IN message_datetime DATETIME
)
BEGIN

  UPDATE insights_data 
  SET textMessagesSent = textMessagesSent + 1,
  lastMessageSentDate = message_datetime
  WHERE refDispatch = dispatchId;

END //
DELIMITER ;


DROP PROCEDURE IF EXISTS count_dispatches;
DELIMITER //
CREATE PROCEDURE count_dispatches (  
  IN statusToFilterBy VARCHAR(255),
  IN startDate DATETIME,
  IN endDate DATETIME
)
BEGIN
  SELECT COUNT(id_dispatch) as dispatchCount
  FROM dispatch WHERE status = statusToFilterBy 
  AND dispatch.arrivalAtVineyardDate >= startDate 
  AND dispatch.arrivalAtVineyardDate <= endDate;
END //
DELIMITER ;




DROP PROCEDURE IF EXISTS get_dispatches_insights;
DELIMITER //
CREATE PROCEDURE get_dispatches_insights (  
  IN startDate DATETIME,
  IN endDate DATETIME
)
BEGIN
  SELECT 
  driver.run AS driverRun,
  driver.name AS driverName,
  driver.surname AS driverSurname,
  producer.name AS producerName,
  truck.licencePlate AS truckLicensePlate,
  dispatch.arrivalAtPataconDate AS dispatchDate,
  insights_data.textMessagesSent AS textMessagesSent,
  insights_data.lastMessageSentDate AS lastMessageSentDate,
  insights_data.stoppedTime AS stoppedTime,
  insights_data.unloadYardTime AS unloadYardTime
  FROM dispatch
  INNER JOIN planification ON dispatch.ref_planification = planification.planification_id
  INNER JOIN driver ON dispatch.ref_driver = driver.run
  INNER JOIN producer ON planification.ref_producer = producer.rut
  INNER JOIN truck ON dispatch.ref_truck = truck.id_truck
  INNER JOIN insights_data ON insights_data.refDispatch = dispatch.id_dispatch
  WHERE dispatch.arrivalAtVineyardDate >= startDate 
  AND dispatch.arrivalAtVineyardDate <= endDate;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS count_text_messages_sent;
DELIMITER //
CREATE PROCEDURE count_text_messages_sent (  
  IN startDate DATETIME,
  IN endDate DATETIME
)
BEGIN
  SELECT SUM(insights_data.textMessagesSent) as textMessageCount
  FROM dispatch INNER JOIN insights_data ON dispatch.id_dispatch=insights_data.refDispatch 
  WHERE dispatch.arrivalAtVineyardDate >= startDate 
  AND dispatch.arrivalAtVineyardDate <= endDate;
END //
DELIMITER ;

--CREATE TRIGGER create_dispatch_insights_row 
--AFTER INSERT ON dispatch
--FOR EACH ROW 
--INSERT INTO insights_data VALUES (NEW.id_dispatch, 0, 0, 0, NULL);

