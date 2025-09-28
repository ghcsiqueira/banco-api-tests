const request = require ('supertest')
const { expect } = require ('chai')

// Describe possui dois parâmetros sendo eles o nome do teste e a função function ou arrowfunction () => {}
describe('Login', () => {
    describe('POST/Login', () => {
        it('Deve retornar 200 com um token em string quando usar credenciais válidas', async() => {
            const response = await request('http://localhost:3000') 
                .post ('/login')
                .set ('Content-Type', 'application/json')
                .send ({ 
                    'username': 'julio.lima',
                    'senha': '123456'
                })
            expect(response.status).to.equal(200);
            expect(response.body.token).to.be.a('string');
        });  
    });
});