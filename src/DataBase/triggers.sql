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

-- Fecha Inicio no puede ser mayor que fecha Fin
DELIMITER //
CREATE TRIGGER t_fechaInicioFin
BEFORE INSERT ON contracts FOR EACH ROW
BEGIN
    IF (NEW.fechaInicio > NEW.fechaFin) THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La fecha de inicio del contrato no puede ser mayor que la fecha fin';
    END IF;
END //
DELIMITER ;

-- Contraseñas más seguras