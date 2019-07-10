DELIMITER |

CREATE TRIGGER add_user_in_reset_password AFTER INSERT ON user
  FOR EACH ROW BEGIN
    INSERT INTO reset_password SET email = NEW.email;
  END
|

DELIMITER ;

DELIMITER |

CREATE TRIGGER delete_user_in_reset_password AFTER DELETE ON user
  FOR EACH ROW BEGIN
    DELETE FROM reset_password WHERE email = OLD.email;
  END
|

DELIMITER ;

DELIMITER |

CREATE TRIGGER update_user_in_reset_password AFTER UPDATE ON user
  FOR EACH ROW BEGIN
    INSERT INTO reset_password SET email = NEW.email;
  END
|

DELIMITER ;

DELIMITER |

CREATE TRIGGER delete_unused_mail_in_reset_password AFTER UPDATE ON user
  FOR EACH ROW BEGIN
    DELETE FROM reset_password WHERE email = OLD.email;
  END
|

DELIMITER ;


DELIMITER |

CREATE TRIGGER change_password AFTER UPDATE ON reset_password
  FOR EACH ROW BEGIN
    UPDATE user SET password = NEW.password WHERE email = NEW.email;
  END
|

DELIMITER ;