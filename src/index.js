const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running in port : http://localhost:${PORT}`);
  console.log(process.env.DB_NAME);

 
});

//conexion con la BD
async function getConnection() {
   
  //SE CREA LA CONEXION
  const conex = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    
  });
  await conex.connect();
  console.log('conexion con la BD ' + conex.threadId);
  return conex;
};
getConnection();

// Endpoint 1 insertar un nuevo registro 
app.post('/facecream', async (req, res) => {
    const conn = await getConnection();
    const { tipe, ingredients, descr } = req.body;
  
    const sqlInsert =
      'insert into facecream (tipe, ingredients, descr,texture) values(?,?,?,?)';
    const [nuevaReceta] = await conn.query(sqlInsert, [
        tipe,
        ingredients,
        descr,
        texture,
    ]);
    res.status(200).json({
      success: true,
      id: newtexter.insertId, // id que generó MySQL para la nueva fila
    });
  
    await conn.end();
  });

// Endpoint 2 :listar registros existentes

app.get("/facecream", async (req,res)=>{
    try {
        const conn = await getConnection();

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
app.put('/cream/:id', async (req, res) => {
    const conn = await getConnection();
    const idReceta = req.params.id;
    const nuevaData = req.body;
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



  

        
    
