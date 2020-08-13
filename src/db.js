const mongoose = require('mongoose');
const tunnel = require('tunnel-ssh')

const uri = 'mongodb://127.0.0.1:27017/toko'
const cluster = 'mongodb+srv://shop:YwtKKJKlzUPx4b7N@users.yjles.mongodb.net/shop?retryWrites=true&w=majority'

mongoose.connect(cluster, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}, err => {
    if(err) console.log(err)
})



module.exports = mongoose