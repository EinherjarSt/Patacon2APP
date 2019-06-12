DROP PROCEDURE IF EXISTS get_event_with_id;
DELIMITER //
CREATE PROCEDURE get_event_with_id(IN idEvent INT)
BEGIN
  SELECT *
  FROM recent_event
  WHERE recent_event.id_event = idEvent;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS get_all_events;
DELIMITER //
CREATE PROCEDURE get_all_events()
BEGIN
  SELECT *
  FROM recent_event
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS get_last_n_events;
DELIMITER //
CREATE PROCEDURE get_last_n_events(IN n INT)
BEGIN
  SELECT id_event, time, description, ref_Dispatch 
  FROM recent_events 
  ORDER BY time DESC LIMIT n;
END //
DELIMITER ;
