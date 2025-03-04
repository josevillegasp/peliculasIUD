const mongoose = require('mongoose');

const getConnection = async ()=> {
    try {
    const url = 'mongodb+srv://leidycastrillon:bt8tU910eFi2HJnt@cluster0.goacw.mongodb.net/ing-web-PE?retryWrites=true&w=majority&appName=Cluster0'

    await mongoose.connect(url);

    console.log('conexion exitosa');

    } catch(error) {
        console.log(error);

    }
}
     module.exports = {
        getConnection,
     }  
  

     
