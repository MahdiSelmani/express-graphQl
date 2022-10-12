const graphql = require('graphql');

const {GraphQLObjectType , GraphQLSchema ,GraphQLString ,GraphQLID, GraphQLInt ,GraphQLList , GraphQLNonNull} =graphql;

const books =[
    {
        id:1,
        name:"Book 1",
        genre:"Cool"

    },
    {
        id:2,
        name:"Book 2",
        genre:"CoolSmile"

    }
]

const BookType = new GraphQLObjectType({
    name: 'Book' ,
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        genre: { type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book:{
            type: BookType,
            args:{id:{type: GraphQLID}},
            resolve (parent ,args){
                return Book.findById(args.id) // Replace with your own database query
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve (){
                return books // Replace with your own database query
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addBook: {
            type: BookType,
            args: {
                name: {type : new GraphQLNonNull(GraphQLString)},
                genre: {type : GraphQLString},
            },
            resolve(parent , args){
                const book = new Book({name: args.name , genre: args.genre})
                return book.save(); // replace with your database call
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})