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


DROP PROCEDURE IF EXISTS edit_stopped_time;
DELIMITER //
CREATE PROCEDURE edit_stopped_time (  
  IN newTime INT
)
BEGIN
  UPDATE insights_data 
  SET stoppedTime = newTime
  WHERE dispatchReference = dispatchReference;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS edit_unload_yard_time;
DELIMITER //
CREATE PROCEDURE edit_unload_yard_time (  
  IN newTime INT
)
BEGIN
  UPDATE insights_data 
  SET unloadYardTime = newTime
  WHERE dispatchReference = dispatchReference;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS increment_text_messages_sent;
DELIMITER //
CREATE PROCEDURE increment_text_messages_sent (  
  IN dispatchReference INT
)
BEGIN

  UPDATE insights_data 
  SET textMessagesSent = textMessagesSent + 1
  WHERE dispatchReference = dispatchReference;

END //
DELIMITER ;

DROP PROCEDURE IF EXISTS edit_last_message_sent_date;
DELIMITER //
CREATE PROCEDURE edit_last_message_sent_date (  
  IN dispatchReference INT,
  IN lastMessageSentDate  DATETIME
)
BEGIN

  UPDATE insights_data 
  SET lastMessageSentDate = lastMessageSentDate
  WHERE dispatchReference = dispatchReference;

END //
DELIMITER ;

CREATE TRIGGER create_dispatch_insights_row 
AFTER INSERT ON dispatch
SET CONDITION = SELECT EXISTS (SELECT * FROM recent_events WHERE ref_Dispatch = NEW.ref_Dispatch && dispatch_status = 'Cargando');
IF NEW.dispatch_status = 'Detenido' and CONDITION = TRUE
THEN  
  SET SELECT TIMESTAMPDIFF(SECOND, '2012-06-06 13:13:55', '2012-06-06 15:20:18');
  INSERT INTO bar (a, b) VALUES(NEW.a, NEW.b) ;
END IF

--CREATE TRIGGER create_dispatch_insights_row 
--AFTER INSERT ON dispatch
--FOR EACH ROW 
--INSERT INTO insights_data VALUES (NEW.id_dispatch, 0, 0, 0, NULL);