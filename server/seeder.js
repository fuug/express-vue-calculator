const mongoose = require('mongoose');
const Role = require('./models/Role');
const User = require('./models/User');
const Product = require('./models/Product');
const bcrypt = require('bcryptjs');

const conn_str = process.env.MONGO_DB ||
    'mongodb+srv://root:toor@cluster0.jmukfk0.mongodb.net/?retryWrites=true&w=majority'

const setupRole = async () => {
    await mongoose.connect(conn_str)

    const userRole = new Role()
    const adminRole = new Role({value: 'admin'})

    await userRole.save();
    await adminRole.save();
}

const setupUser = async () => {
    await mongoose.connect(conn_str)

    const admin = new User({
        email: 'admin@admin.com',
        name: 'Admin',
        password: bcrypt.hashSync('admin', 5),
        roles: ['admin']
    })

    await admin.save();
}

const setupProducts = async () => {
    await mongoose.connect(conn_str)

    await new Product({
        type: 'cup',
        price: '7',
        color: 'white',
        name: 'Кружка'
    }).save()

    await new Product({
        type: 'cup',
        price: '10',
        color: 'black',
        name: 'Кружка'
    }).save()

    await new Product({
        type: 'cup',
        price: '10',
        color: 'red',
        name: 'Кружка'
    }).save()


    await new Product({
        type: 't-shirt',
        price: '35',
        color: 'white',
        name: 'Майка'
    }).save()
}
setupProducts()
// setupRole()
//     .then(() => {
//         setupUser()
//     })