const mongoose = require('mongoose');

const getConnection = async ()=> {
    try {
    const url = 'mongodb+srv://leidycastrillon:qujHL7?8@P2$RJi@cluster0.goacw.mongodb.net/ing-web-PE?retryWrites=true&w=majority&appName=Cluster0'

    await mongoose.connect(url);

    console.log('conexion exitosa');

    } catch(error) {
        console.long(error);

    }
}
     module.exports = {
        getConnection,
     }  
  

     
