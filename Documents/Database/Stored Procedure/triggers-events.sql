CREATE TRIGGER updateEvent AFTER UPDATE ON dispatch 
	FOR EACH ROW
BEGIN
		DECLARE ubication TEXT;
		DECLARE msg TEXT;
		DECLARE patente VARCHAR(13); 
		SET ubication := (SELECT location.address
             FROM location 
             WHERE location.id_location = (SELECT planification.ref_location 
             								FROM planification 
             								WHERE planification.planification_id = NEW.ref_planification));
		SET patente := (SELECT truck.licencePlate FROM truck WHERE truck.id_truck = NEW.ref_truck);

		IF NEW.status <> OLD.status THEN
			IF NEW.status = 'En camino a viña' THEN
				SET msg := CONCAT(patente,' ha comenzado su viaje a ', ubication);
			ELSEIF NEW.status = 'Cargando' THEN
				SET msg := CONCAT(patente,' se encuentra cargando en ', ubication);
			ELSEIF NEW.status = 'En camino a Patacon' THEN
				SET msg := CONCAT(patente,' esta viajando rumbo a Patacon');
			ELSEIF NEW.status = 'En patio' THEN
				SET msg := CONCAT(patente,' se encuentra en el patio de Patacon');
			ELSEIF NEW.status = 'Detenido camino a viña' THEN
				SET msg :=CONCAT('¡',patente,' se encuentra detenido!');
			ELSEIF NEW.status = 'Detenido camino a Patacon' THEN
				SET msg :=CONCAT('¡',patente,' se encuentra detenido!');
			ELSEIF NEW.status = 'Terminado' THEN
				SET msg :=CONCAT(patente,' ha terminado su operación');
			END IF;
		INSERT INTO recent_events (`time`,description,ref_Dispatch,`status`) VALUES (NOW(),msg,NEW.id_dispatch,NEW.status);
		END IF;
		
	END