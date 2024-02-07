import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const url = "https://randomuser.me/api/";

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(url);
        const user = result.data.results[0];

        const content = {
            name: user.name.first + ' ' + user.name.last,
            picture: user.picture.large,
            country: user.location.country,
            age: user.dob.age
        }

        res.render("index.ejs", {content: content});
    } catch (error) {
        console.log(error);
        res.render("index.ejs", {content: error});
    }
});

app.post("/", async (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});