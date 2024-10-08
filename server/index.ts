import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import languages from "./routes/languages";
import words from "./routes/words";
import users from "./routes/users";

const app: Application = express();

// define CORS
const corsOptions = {
    optionSuccessStatus: 200,
    credentials: true,
    origin: "http://localhost:4200",
};
app.use(cors(corsOptions));

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/languages", languages);
app.use("/api/v1/words", words);
app.use("/api/v1/users", users);

app.get("/", (_: Request, res: Response) => {
    res.send("Conlang dictionary server is working!");
});

const port = 5000;
const host = "localhost";

app.listen(port, host, () => {
    console.log(`Server is running on port ${port}...`);
});
