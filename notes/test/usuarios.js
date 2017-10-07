process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../app')
const should = chai.should()


chai.use(chaiHttp)


describe('Usuarios', () => {


    after(() => setTimeout(() => process.exit(), 1000))

    describe('/POST novo usuarios', () => {
        it('deve cadastrar usuario', (done) => {
          chai.request(server)
              .post('/usuarios')
              .send({ nome: 'fabio', email: 'fabio', senha: '123'})
              .end((err, res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  res.body.should.have.property('_id')
                done()
              })
        })
    })
    
    
    describe('/POST login', () => {
        it('deve logar na API', (done) => {
          chai.request(server)
              .post('/usuarios/logar')
              .send({ email: 'fabio', senha: '123'})
              .end((err, res) => {
                  res.should.have.status(200)
                  res.body.should.be.a('object')
                  res.body.should.have.property('isValid')
                done()
              })
        })
    })

})
