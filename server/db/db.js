import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config();
const Database = new Pool({

});

Database.on('connect',() =>{
    console.log('connected to the  db');
});

export default Database;