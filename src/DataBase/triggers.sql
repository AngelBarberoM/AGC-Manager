-- Usar 
USE AGCdb;

-- Fecha creacion servicios
DELIMITER //
CREATE TRIGGER t_fechaCreacionServices
BEFORE INSERT ON services FOR EACH ROW
BEGIN
    IF (NEW.fechaCreacion IS NULL) THEN
		SET NEW.fechaCreacion = SYSDATE();
    END IF;
END //
DELIMITER ;

-- Conductor sin certificado antecedentes no puede conducir escolar
