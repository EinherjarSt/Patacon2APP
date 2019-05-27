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


CREATE TRIGGER create_dispatch_insights_row 
AFTER INSERT ON dispatch
FOR EACH ROW 
  INSERT INTO insights_data VALUES (NEW.id_dispatch, 0, 0, 0, NULL);