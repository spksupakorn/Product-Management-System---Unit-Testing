const supertest = require('supertest');
const app = require('./index');

describe('Api tests products management system', () => {
    //Post
    it('Add product should return 201', async () => {
        const response = await supertest(app).post('/products').send({
            id: 1, name: "Ipad Pro", 
            category: "tablet", 
            price: 20000, 
            stock: 10
        });
        expect(response.status).toBe(201);
        expect(response.body.product.id).toBe(1);
    });

    //Post Failed
    it('Add product unsuccess should return 400', async () => {
        const response1 = await supertest(app).post('/products').send({
            id: "a",
            name: "Airpod3",
            category: "device",
            price: "b",
            stock: "c"
        });
        const response2 = await supertest(app).post('/products').send({});
        expect(response1.status).toBe(400);
        expect(response2.status).toBe(400);
    });

    //Get All
    it('Get products all should return 200', async () => {
        const response = await supertest(app).get('/products');
        expect(response.status).toBe(200);
    });

    //Get by id
    it('Get product by id should return 200', async () => {
        const response = await supertest(app).get('/products/1');
        expect(response.status).toBe(200);
        expect(response.body.product.id).toBe(1);
    });

    //Product not found 
    it('Get product not found should return 404', async () => {
        const response = await supertest(app).get('/products/1234');
        expect(response.status).toBe(404);
    });

    //Edit product
    it('Edit product should return 200', async () => {
        const response = await supertest(app).put('/products').send({
            id: 1,
            name: "Macbook Pro",
            category: "computer",
            price: 50000,
            stock: 2
        });
        expect(response.status).toBe(200);
    });

    //Edit product failed
    it('Edit product unsuccess should return 404', async () => {
        const response = await supertest(app).put('/products').send({
            id: 2,
            name: "Macbook Pro",
            category: "computer",
            price: 50000,
            stock: 2
        });
        expect(response.status).toBe(404);
    });

    //Delete product
    it('Delete product should return 200', async () => {
        const response = await supertest(app).delete('/products/1');
        expect(response.status).toBe(200);
    });

    //Delete product failed
    it('Delete product unseccess should return 404', async () => {
        const response = await supertest(app).delete('/products/2');
        expect(response.status).toBe(404);
    });
});
