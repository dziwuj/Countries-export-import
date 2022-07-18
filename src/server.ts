import express, { Express, Request, Response } from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app: Express = express();
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));

app.listen(PORT, () => {
    console.log("Server started at port " + PORT);
});

app.use((req: Request, res: Response, next) => {
    // console.log(store);
    // console.log(`${req.method} - ${req.url}`);
    next();
});

app.get("/", (req: Request, res: Response) => {
    // console.log("Main: " + req.sessionID);
    res.sendFile(path.join(__dirname + "/index.html"));
});

// app.get("/models/*", function (req, res) {
//     res.sendFile(path.join(__dirname + "/models/*"))
// })
