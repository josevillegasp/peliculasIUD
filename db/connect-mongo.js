const mongoose = require('mongoose');

const getConnection = async ()=> {
    try {
    const url = 'mongodb://leidycastrillon:bt8tU910eFi2HJnt@cluster0-shard-00-00.goacw.mongodb.net:27017,cluster0-shard-00-01.goacw.mongodb.net:27017,cluster0-shard-00-02.goacw.mongodb.net:27017/ing-web-PE?ssl=true&replicaSet=atlas-esn25j-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'

    await mongoose.connect(url);

    console.log('conexion exitosa');

    } catch(error) {
        console.log(error);

    }
}
     module.exports = {
        getConnection,
     }  
  

     
