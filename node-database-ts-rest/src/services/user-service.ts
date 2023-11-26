import { Employee, User } from 'model/models';
import { ResultSetHeader, FieldPacket } from 'mysql2';
import { mysqlpool } from '../db/mysql/db';


const getAllUsers = async () => {
    const [data, _] = await mysqlpool.query("SELECT * FROM user LIMIT 10000");
    return data;
}

const getUserById = async (id: string) => {
    const [data, columns]: [ResultSetHeader, FieldPacket[]] = await mysqlpool.query("SELECT * FROM user WHERE id = ?", [id]);
    console.log(data, columns)
    return data;
}

const deleteUserById = async (id: string): Promise<number> => {
    const [data, columns]: [ResultSetHeader, FieldPacket[]] = await mysqlpool.query("DELETE FROM user WHERE id = ?", [id]);

    return data.affectedRows;
}


export { getAllUsers, getUserById, deleteUserById }