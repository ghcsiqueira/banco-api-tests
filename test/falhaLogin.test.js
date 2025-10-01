const request = require ('supertest')
const { expect } = require ('chai')
require('dotenv').config()

// Describe possui dois parâmetros sendo eles o nome do teste e a função function ou arrowfunction () => {}
describe('Login', () => {
    describe('POST/Login', () => {
        it('Deve retornar 400 com mensagem de erro em string quando usar credenciais inválidas', async() => {
            const response = await request(process.env.BASE_URL) 
                .post ('/login')
                .set ('Content-Type', 'application/json')
                .send ({ 
                    'username': 'julio.lima',
                    'senha': ''
                })
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error'); 
            expect(response.body.error).to.be.a('string');  
        });  
    });
});
