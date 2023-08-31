/// <reference types="cypress" />

import { randoms } from "../utils/random";

describe(`Go Rest API`, () => {

    let arr = [];
    let userId = new Number;
    const access_token = '3b12fb26ba52ed045cca883bab9bf0d9a842691f5edeae247ed60b2c2c02aeaa';

    let newUser = {
        name: 'YuLee_' + randoms.getString(4),
        gender: "female",
        email: randoms.getString(8) + "_test@harakirimail.com",
    }

    it(`should Get All Users `, () => {
        cy.request('https://gorest.co.in/public/v2/users/').as('getUsers')
        cy.get('@getUsers')
            .then((response) => {
                expect(response.status).to.eq(200)
                arr = response.body.map(item => ({
                    name: item.name,
                    status: item.status
                }))
                console.log(arr)
                return arr
            })
    })

    it(`should create new user`, () => {
        cy.log(newUser.name)
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users/',
            headers: {
                'Content-Type': 'application/json', 
                Accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }, 
            body: {
                name: newUser.name,
                gender: "female",
                email: newUser.email,
                status: "active"
            },
        }).as('createUser')

        cy.get('@createUser')
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('name', newUser.name)
                expect(response.body).to.have.property('email', newUser.email)
                userId = response.body.id
                console.log(userId)
                return userId
            })
        cy.log()
    })

    it(`should get created user `, () => {
        cy.request({
            method: 'GET', 
            url: `https://gorest.co.in/public/v2/users/${userId}`, 
            headers: {
                'Content-Type': 'application/json', 
                Accept: 'application/json',
                Authorization: `Bearer ${access_token}`
            }, 

        }).as('getUser')
        
        cy.get('@getUser')
            .then((response) => {
                expect(response.status).to.eq(200)
                console.log(response.body)
                return response.body
            })
    })

})