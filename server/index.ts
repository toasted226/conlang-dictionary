import express, { Application, Request, Response } from "express";
import languages from "./routes/languages";
import words from "./routes/words";

const app: Application = express();

// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/api/v1/languages", languages);
app.use("/api/v1/words", words);

app.get("/", (req: Request, res: Response) => {
    res.send("Typescript server is working!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
