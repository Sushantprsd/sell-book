require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
var cors = require("cors");
let PORT = process.env.PORT || 5000;
const path = require("path");

const graphqlSchema = require("./graphql/schema");
const userResolver = require("./graphql/resolver/user");
const shopResolver = require("./graphql/resolver/shop");
const authRouter = require("./routes/user");
const auth = require("./middleware/isAuth");
mongoose
    .connect(process.env.MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => {
        app.use(express.urlencoded({ limit: "4mb", extended: true }));
        app.use(express.json({ limit: "4mb" }));
        app.use(cors());
        app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
            next();
        });
        app.use(express.static(path.join(__dirname, "public")));
        app.use("/api/", authRouter);
        app.use(
            "/api/shop",
            graphqlHTTP({
                schema: graphqlSchema,
                rootValue: shopResolver,
                graphiql: true,
                customFormatErrorFn(err) {
                    if (!err.originalError) {
                        return err;
                    }
                    const data = err.originalError.data;
                    const message = err.message || "An error occurred.";
                    const code = err.originalError.code || 500;
                    return { message: message, status: code, data: data };
                },
            }),
        );
        app.use(auth);
        app.use(
            "/api/user",
            graphqlHTTP({
                schema: graphqlSchema,
                rootValue: userResolver,
                graphiql: true,
                customFormatErrorFn(err) {
                    if (!err.originalError) {
                        return err;
                    }
                    const data = err.originalError.data;
                    const message = err.message || "An error occurred.";
                    const code = err.originalError.code || 500;
                    return { message: message, status: code, data: data };
                },
            }),
        );

        app.use((error, req, res, next) => {
            const status = error.statusCode || 500;
            const message = error.message;
            const data = error.data;
            res.status(status).json({ message: message, data: data });
        });
        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname + "/public/index.html"));
        });
        app.listen(PORT, () => {
            console.log(`server started at http://localhost:${PORT}`);
        });
        return console.log("running");
    })
    .catch((err) => {
        return console.log(err);
    });
