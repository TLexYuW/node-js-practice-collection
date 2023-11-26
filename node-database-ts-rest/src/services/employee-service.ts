import { Employee } from 'model/models';
import { ResultSetHeader, FieldPacket } from 'mysql2';
import { mysqlpool } from '../db/mysql/db';

const getAllEmployees = async () => {
    const [data, _]: [ResultSetHeader, FieldPacket[]] = await mysqlpool.query("SELECT * FROM employees");
    return data;
}

const addOrEditEmployee = async (obj: Employee, id: number): Promise<number> => {
    const [data, columns]: [ResultSetHeader, FieldPacket[]] =
        await mysqlpool.query("CALL usp_employee_add_or_edit(?,?,?,?)", [id, obj.name, obj.employee_code, obj.salary]);

    return data.affectedRows;
}

const updateEmployee = async (obj: Employee, id: string): Promise<number> => {
    const [data, columns]: [any | { affectedRows: number }[], FieldPacket[]] =
        await mysqlpool.query("CALL usp_employee_add_or_edit(?,?,?,?)", [id, obj.name, obj.employee_code, obj.salary]);
    // console.log(data);
    // console.log(data[0]);
    // console.log(columns);
    const [{ affectedRows }] = data[0];
    // console.log(affectedRows);

    return affectedRows;
}

export { getAllEmployees, addOrEditEmployee, updateEmployee }