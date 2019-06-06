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


--CREATE TRIGGER create_dispatch_insights_row 
--AFTER INSERT ON dispatch
--SET CONDITION = SELECT EXISTS (SELECT * FROM recent_events WHERE ref_Dispatch = NEW.ref_Dispatch && dispatch_status = 'Cargando');
--IF NEW.dispatch_status = 'Detenido' and CONDITION = TRUE
--THEN  
  --SET SELECT TIMESTAMPDIFF(SECOND, '2012-06-06 13:13:55', '2012-06-06 15:20:18');
  --INSERT INTO bar (a, b) VALUES(NEW.a, NEW.b) ;
--END IF

--CREATE TRIGGER create_dispatch_insights_row 
--AFTER INSERT ON dispatch
--FOR EACH ROW 
--INSERT INTO insights_data VALUES (NEW.id_dispatch, 0, 0, 0, NULL);