require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const port = process.env.APP_PORT;
const path = require('path')
const userRoutes = require('./routes/userRoute')
const noteRoutes = require('./routes/noteRoute')
const restRoutes = require('./routes/resetPassword')
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const authenticateTokenGraphql = require("./middlewares/authenticateTokenGraphql");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // Check user token
        const user = authenticateTokenGraphql(req);
        return { user };
    }
});

app.use(cors());
app.options('*', cors());

app.use(express.json());
// app.use(express.static(path.join(__dirname,"..","frontend","build")))
app.use(express.static("public"))

app.use('/v1/user', userRoutes);
app.use('/v1/note', noteRoutes);
app.use('/v1/reset', restRoutes);


// app.use((req,res,next)=>{
//     // res.sendFile(path.join(__dirname,"..","frontend","build","index.html"))
//     res.sendFile(path.join(__dirname,"public","index.html"))
// })

// Function to start the server
async function startServer() {
    try {
        await connectDB();  // Wait for database connection
        await server.start();
        server.applyMiddleware({ app });
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1); // Exit process with failure
    }
}

// Start the server
startServer();