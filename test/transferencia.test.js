const request = require ('supertest')
const { expect } = require ('chai')
require('dotenv').config()
const { obterToken } = require ('../helpers/autenticacao')

describe ('Transferencias', () => {
    describe ('POST/Transferencias', () => {
        let token
        
        beforeEach(async () => {
            token = await obterToken ('julio.lima', '123456')
        })

        it('Deve retornar sucesso com 201 quando o valor da transferência for igual ou acima de R$ 10,00.', async () => {
            

            const responseTransferencia = await request (process.env.BASE_URL)
                .post('/transferencias')
                .set ('Content-Type', 'application/json')
                .set ('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 12,
                    token: ""
                })
                expect(responseTransferencia.status).to.equal(201);
         
        })

        it('Deve retornar falha com 422 quando o valor da transferência for abaixo de R$ 10,00.', async () => {
            const token = await obterToken ('julio.lima', '123456')
            

            const responseTransferencia = await request (process.env.BASE_URL)
                .post('/transferencias')
                .set ('Content-Type', 'application/json')
                .set ('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 8,
                    token: ""
                })
                expect(responseTransferencia.status).to.equal(422);
        })
    })
});