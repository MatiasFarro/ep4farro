const mongoose = require('mongoose');
const conectarBD = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/ep4', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('BD conectada')
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = conectarBD





