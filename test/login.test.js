const request = require ('supertest')
const { expect } = require ('chai')
require('dotenv').config()
const postLogin = require ('../fixtures/postLogin.json')

// Describe possui dois parâmetros sendo eles o nome do teste e a função function ou arrowfunction () => {}
describe('Login', () => {
    describe('POST/Login', () => {
        it('Deve retornar 200 com um token em string quando usar credenciais válidas', async() => {
            const bodyLogin = {...postLogin}
            const response = await request(process.env.BASE_URL) 
                .post ('/login')
                .set ('Content-Type', 'application/json')
                .send (bodyLogin)
                
            expect(response.status).to.equal(200);
            expect(response.body.token).to.be.a('string');
        });  

        it('Deve retornar 400 com mensagem de erro em string quando usar credenciais inválidas', async() => {
            const bodyLogin = {...postLogin}
            bodyLogin.senha = ''        

            const response = await request(process.env.BASE_URL) 
                        .post ('/login')
                        .set ('Content-Type', 'application/json')
                        .send (bodyLogin)

                    expect(response.status).to.equal(400);
                    expect(response.body).to.have.property('error'); 
                    expect(response.body.error).to.be.a('string');  
                });
    });
});