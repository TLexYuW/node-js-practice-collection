DELIMITER //

CREATE PROCEDURE `test_db`.`usp_employee_add_or_edit` (
IN _id INT,
IN _name VARCHAR(45),
IN _employee_code VARCHAR(45),
IN _salary INT
)

BEGIN
	IF _id = 0 THEN
		INSERT INTO employees(name,employee_code,salary)
		VALUES (_name,_employee_code,_salary);

	ELSE
		UPDATE employees
        SET name = _name,
			employee_code = _employee_code,
        	salary = _salary
        WHERE id = _id;
	END IF;
    
    SELECT ROW_COUNT() AS 'affectedRows';
END //

DELIMITER ;