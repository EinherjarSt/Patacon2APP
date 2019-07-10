DELIMITER |

CREATE TRIGGER assign_new_truck_to_driver AFTER INSERT ON truck
  FOR EACH ROW BEGIN
    UPDATE driver SET has_truck_assigned = 1 WHERE run = NEW.ref_driver;
  END
|

DELIMITER ;

DELIMITER |

CREATE TRIGGER assign_updated_truck_to_driver AFTER UPDATE ON truck
  FOR EACH ROW BEGIN
    UPDATE driver SET has_truck_assigned = 1 WHERE run = NEW.ref_driver;
    UPDATE gps SET has_truck_assigned = 1 WHERE imei = NEW.ref_gps;
    UPDATE driver SET has_truck_assigned = 0 WHERE run = "11111111-1";
    UPDATE driver SET has_truck_assigned = 0 WHERE run = OLD.ref_driver;
  END
|

DELIMITER ;

DELIMITER |

CREATE TRIGGER unassign_deleted_truck_to_driver AFTER DELETE ON truck
  FOR EACH ROW BEGIN
    UPDATE driver SET has_truck_assigned = 0 WHERE run = OLD.ref_driver;
  END
|

DELIMITER ;

DELIMITER |

CREATE TRIGGER assign_new_truck_to_gps AFTER INSERT ON truck
  FOR EACH ROW BEGIN
    UPDATE gps SET has_truck_assigned = 1 WHERE imei = NEW.ref_gps;
  END
|

DELIMITER ;

DELIMITER |

CREATE TRIGGER assign_updated_truck_to_gps AFTER UPDATE ON truck
  FOR EACH ROW BEGIN
    UPDATE gps SET has_truck_assigned = 1 WHERE imei = NEW.ref_gps;
    UPDATE driver SET has_truck_assigned = 1 WHERE run = NEW.ref_driver;
    UPDATE gps SET has_truck_assigned = 0 WHERE imei = "1";
    UPDATE gps SET has_truck_assigned = 0 WHERE imei = OLD.ref_gps;
  END
|

DELIMITER ;

DELIMITER |

CREATE TRIGGER unassign_deleted_truck_to_gps AFTER DELETE ON truck
  FOR EACH ROW BEGIN
    UPDATE gps SET has_truck_assigned = 0 WHERE imei = OLD.ref_driver;
  END
|

DELIMITER ;


IDEA PARA TRIGGER QUE AUTOMATICE LA ASIGNACION AUTOMATICA POR DEFECTO EN CASO DE ELIMINAR

DELIMITER |

CREATE TRIGGER unassign_disabled_driver_to_truck AFTER UPDATE ON driver
  FOR EACH ROW BEGIN
    IF NEW.disabled = 1 THEN BEGIN
        UPDATE truck SET ref_driver = "11111111-1" WHERE ref_driver = NEW.run;
    END; END IF;
  END
|

DELIMITER ;

DELIMITER |

CREATE TRIGGER unassign_deleted_GPS_to_truck AFTER DELETE ON gps
  FOR EACH ROW BEGIN
    UPDATE truck SET ref_gps = "1" WHERE ref_gps = OLD.imei;
  END
|

/*DELIMITER ;

ALTER TABLE truck ADD CONSTRAINT UNIQUE (ref_gps);
ALTER TABLE truck ADD CONSTRAINT UNIQUE (ref_driver);

INSERT INTO `driver` (`run`, `name`, `surname`, `surname2`, `phoneNumber`, `disabled`, `has_truck_assigned`) 
VALUES ("11111111-1", "Chofer", "Por", "Defecto", "00000000000", 0, 0);
INSERT INTO `gps` (`imei`, `simnumber`, `brand`, `model`, `has_truck_assigned`) 
VALUES ("1", "000000", "Marca por Defecto", "Modelo por Defecto", 0);*/
