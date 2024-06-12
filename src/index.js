const express = require('express');
const cors = require ('cors');
const mysql = require('mysql2/promise');

require('dotenv').config();

const api = express();
api.use(cors());
api.use(express.json());

const PORT = process.env.PORT || 5001;

api.listen(PORT, () => {
  console.log(`Server running in port : http://localhost:${PORT}`);
  console.log(process.env.DB_NAME);
});

//conexion con la BD
async function conexion () {
 try {
  //SE CREA LA CONEXION
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    
  });

  await conn.connect();
  console.log('conexion con la BD ' + conex.threadId);
  return conn;

 } catch (error) {
  
 }  };
  
conexion();

// Endpoint 1 insertar un nuevo registro 
api.post('/facecream', async (req, res) => {
    const conn = await conexion();
    const { tipe, ingredients, descr,texture } = req.body;
  
    const sqlInsert =
      'insert into facecream (tipe, ingredients, descr,texture) values(?,?,?,?)';
    const [newtext] = await conn.query(sqlInsert, [
        tipe,
        ingredients,
        descr,
        texture,
    ]);
    res.status(200).json({
      success: true,
      id: texture.insertId,
    });
  
    await conn.end();
  });

// Endpoint 2 :listar registros existentes

api.get("/facecream", async (req,res)=>{
    try {
        const conn = await conexion();

        const select= "select * from facecream";
        const [result]= await conn.query(select);
        res.status(200).json({
            info:{count:result.length},
                result:result,
            });
        
        await conn.end();
    } catch (error) {
      res.status(400).json(error);
    }
});

//filtrar por id 
api.put('/cream/:id', async (req, res) => {
    const conn = await conexion();
    const ifacecream = req.params.id;
    const newData = req.body;
    const modificarSql =
      'UPDATE facecream SET  tipe = ?, ingredient= ?, descr= ?  WHERE id = ?';
    const [result] = await conn.query(modificarSql, [
      newData.tipe,
      newData.ingredient,
      newData.descr,
      idCream,
    ]);
    if (result.affectedRows > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false, message: 'No existe el id ' });
    }
    console.log(result);
  });

  // actualizar un registro existente



  

        
    
