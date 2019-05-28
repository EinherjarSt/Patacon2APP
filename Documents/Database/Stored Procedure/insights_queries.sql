DROP PROCEDURE IF EXISTS update_dispatch_insights_data;
DELIMITER //
CREATE PROCEDURE update_dispatch_insights_data (  
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


DROP PROCEDURE IF EXISTS update_stopped_time;
DELIMITER //
CREATE PROCEDURE update_stopped_time (  
  IN newTime INT
)
BEGIN

  UPDATE insights_data 
  SET stoppedTime = newTime
  WHERE dispatchReference = dispatchReference;

END //
DELIMITER;

DROP PROCEDURE IF EXISTS update_unload_yard_time;
DELIMITER //
CREATE PROCEDURE update_unload_yard_time (  
  IN newTime INT
)
BEGIN

  UPDATE insights_data 
  SET unloadYardTime = newTime
  WHERE dispatchReference = dispatchReference;

END //
DELIMITER;

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
DELIMITER;

DROP PROCEDURE IF EXISTS update_last_message_sent_date;
DELIMITER //
CREATE PROCEDURE update_last_message_sent_date (  
  IN dispatchReference INT,
  IN lastMessageSentDate  DATETIME
)
BEGIN

  UPDATE insights_data 
  SET lastMessageSentDate = lastMessageSentDate
  WHERE dispatchReference = dispatchReference;

END //
DELIMITER;


CREATE TRIGGER create_dispatch_insights_row 
AFTER INSERT ON dispatch
FOR EACH ROW 
INSERT INTO insights_data VALUES (NEW.id_dispatch, 0, 0, 0, NULL);