
CREATE TRIGGER addEvent AFTER INSERT ON dispatch 
	FOR EACH ROW
	BEGIN
	DECLARE ubication TEXT;
	SET ubication := (SELECT location.address
             FROM location 
             WHERE location.id_location = (SELECT planification.ref_location 
             								FROM planification 
             								WHERE planification.planification_id = NEW.ref_planification));

	INSERT INTO recent_events (`time`,description,ref_Dispatch) VALUES (TIME(NOW()),CONCAT('El camión ',NEW.ref_truck,
		' ha comenzado su viaje', ubication), NEW.id_dispatch);
	END

CREATE TRIGGER updateEvent AFTER UPDATE ON dispatch 
	FOR EACH ROW
	BEGIN
		DECLARE ubication TEXT;
		DECLARE msg TEXT;
		SET ubication := (SELECT location.address
             FROM location 
             WHERE location.id_location = (SELECT planification.ref_location 
             								FROM planification 
             								WHERE planification.planification_id = NEW.ref_planification));
		IF NEW.status <> OLD.status THEN
			IF NEW.status = 'En tránsito a viña' THEN
				SET msg := CONCAT('El camión ',NEW.ref_truck,' ha comenzado su viaje a', ubication);
			ELSEIF NEW.status = 'Cargando' THEN
				SET msg := CONCAT('El camión ',NEW.ref_truck,' se encuentra cargando en', ubication);
			ELSEIF NEW.status = 'En patio' THEN
				SET msg := CONCAT('El camión ',NEW.ref_truck,' se encuentra en el patio de Patacon');
			ELSEIF NEW.status = 'Detenido' THEN
				SET msg :=CONCAT('¡El camión ',NEW.ref_truck,' se encuentra detenido!');
			ELSEIF NEW.status = 'Terminado' THEN
				SET msg :=CONCAT('El camion ',NEW.ref_truck,' ha terminado su operación');
			END IF;
		END IF;
		UPDATE recent_events SET `time`= TIME(NOW()), `description` = msg WHERE recent_events.ref_Dispatch = NEW.id_dispatch;
END