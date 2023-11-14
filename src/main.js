const { Router } = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productsSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    productName: {type: String, required: true},
    productCategory: {type: String, required: true},
    productBrand: {type: String, required: true},
    productStock: {type: Number, required: true},
    productPurchase: {type: Number, required: true},
    productSale: {type: Number, required: true},
    profitMargin: {type: Number, required: true},
})
const clientsSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    clientName: {type: String, required: true},
    clientPhone: {type: String, required: true},
    clientCpf: {type: String, required: true},
    clientDebt: {type: Number, required: true},
    clientLimit: {type: Number, required: true},
    paymentDate: {type: String, required: true},
})
const productModel = mongoose.model('products_collections', productsSchema)
const clientModel = mongoose.model('clients_collections', clientsSchema)

const router = Router();

router.get('/', (req, res) => {
    res.send({msg: 'on air!'})
})

router.get('/import', async (req, res) => {
    const products = await productModel.find()
    const clients = await clientModel.find()

    res.send({
        success: 'success',
        productsList: products,
        clientsList: clients,
    })
})

router.post('/export', async (req, res) => {
    const { productsList, clientsList } = req.body

    await productModel.deleteMany()
    await clientModel.deleteMany()

    productsList.map(async (product) => {
        let newProduct = new productModel({
            id: product.id,
            productName: product.productName,
            productCategory: product.productCategory,
            productBrand: product.productBrand,
            productStock: product.productStock,
            productPurchase: product.productPurchase,
            productSale: product.productSale,
            profitMargin: product.profitMargin,
        })
        const sucess = await newProduct.save()
        // return res.send({success: 'failed'})
    })
    clientsList.map(async (client) => {
        let newClient = new clientModel({
            id: client.id,
            clientName: client.clientName,
            clientPhone: client.clientPhone,
            clientCpf: client.clientCpf,
            clientDebt: client.clientDebt,
            clientLimit: client.clientLimit,
            paymentDate: client.paymentDate == '' ? '-' : client.paymentDate,
        })
        const sucess = await newClient.save()
    })
    res.send({success: 'success'})
})

module.exports = router