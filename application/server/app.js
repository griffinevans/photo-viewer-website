const createError = require("http-errors");
const express = require("express");
const favicon = require('serve-favicon');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const PORT = process.env.PORT || 3001;
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts.js");
const commentsRouter = require("./routes/comments.js");

const app = express();

const sessionStore = new MySQLStore({},require('./database.js'));

app.use(
  session({
    key: "csid",
    secret: "csc317 secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("csc317 secret"));

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/posts/public",express.static(path.join(__dirname, "public")));

app.use((req,res,next) => {
  if(req.session.username) {
    res.locals.isLoggedIn = true;
    res.locals.username = req.session.username;
  }
  next();
});

app.use("/api/users", usersRouter); 
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);


/**
 * Catch all route, if we get to here then the 
 * resource requested could not be found.
 */
app.use((req,res,next) => {
  next(createError(404, `The route ${req.method} : ${req.url} does not exist.`));
});
  

/**
 * Error Handler, used to render the error html file
 * with relevant error information.
 */
app.use( (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = err;
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  //res.render("error");
});

module.exports = app;
