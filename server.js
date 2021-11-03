const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const { graphqlHTTP } = require("express-graphql")
const graphqlSchema = require("./graphql/schema")
const graphqlResolvers = require("./graphql/resolvers")

// App
const app = express();
const port = 3000;
// TODO: dev is temp
app.use(logger('dev'));

// DB
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB is open');
});

// End Points
/*
const indexRouter = require('./routes/index');
app.use('/', indexRouter);
app.get('*',function (req, res) {
  res.redirect('/');
});*/
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

module.exports = app;
