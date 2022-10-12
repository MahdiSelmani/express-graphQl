const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema')
const express = require("express")
const app = express()
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
);
app.listen( 4000 , () => {
    console.log('app is listening at port 4000')
})