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

});

//conexion con la BD
async function conexion () {

  //SE CREA LA CONEXION
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password:"root", 
      database: "facecream",
      
    });
  
    await conn.connect();
    console.log('conexion con la BD ');
    return conn;
   } 
   catch (error) {

    console.log (error);
    
  }
};
  
//conexion();

// Endpoint 1 insertar un nuevo registro 

api.post("/facecream", async (req, res) =>{
  try {
      const conn = await conexion();
    const { tipe, ingredient, descr } = req.body;
  
    const sqlInsert =
      'INSERT INTO facecream (tipe, ingredient, descr) values(?,?,?)';
    const [newData] = await conn.query(sqlInsert, [
        tipe,
        ingredient,
        descr,
    ]);
    res.status(200).json({
      success: true,
      id: newData.insertId,
    });
  
    await conn.end();
  } catch (error) {
    res.status(400).json(error);
    
  }
  
  });

// Endpoint 2 :listar registros existentes


api.get("/facecream", async (req,res)=>{
    try {
        const conn = await conexion();

        const select= "SELECT * FROM facecream";
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

api.put('/cream/:idCream', async (req, res) => {
  try {
    const conn = await conexion();
    const idCream = req.params.idCream;
    const newData = req.body;
    const modificarSql =
      'UPDATE facecream SET tipe = ?, ingredient= ?, descr= ?  WHERE idCream = ?';
    const [result] = await conn.query(modificarSql, [
      newData.tipe,
      newData.ingredient,
      newData.descr,
      idCream,
    ])
    if (result.affectedRows > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false, message: 'No existe el id ' });
    }
  } catch (error) {
  console.error('Error ejecutando la consulta',error);
  return res.status(500).json ({success :false, message : 'No exixte id'});
}});

    
  
  // delete un registro 
  
  api.delete('/facecream/:idCream', async (req,res)=>{
    try {
      const conn = await conexion();
    const idCream = req.params.idCream;
    const deleteSql = 'DELETE FROM facecream WHERE idCream = ?';
    const[result]= await conn.query(deleteSql , [idCream]);
    if(result.affectedRows >0){
      res.status(200).json({success :true});
    }else{
      res.status(200).json({success:false , message:'no existe id'});
    }
    console.log(result);
    } catch (error) {
      console.error('Error ejecutando la consulta',error);
      return res.status(500).json ({success :false, message : 'Error del servidor'});
    }
    
  });
    
 
  
