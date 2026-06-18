const express = require("express"); //server sends html file
const fs = require("fs"); //used to connect and interact with the JSON file

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/book", (req, res) => {
    let data = [];

    try {
        data = JSON.parse(fs.readFileSync("bookings.json"));
    } catch {
        data = [];
    }

    data.push(req.body);
    fs.writeFileSync("bookings.json", JSON.stringify(data, null, 2));

    res.send("Booking Successful");
});

app.get("/bookings", (req, res) => {
    try {
        let data = JSON.parse(fs.readFileSync("bookings.json"));
        res.json(data);
    } catch {
        res.json([]);
    }
});

app.delete("/delete/:index", (req, res) => {
    let data = JSON.parse(fs.readFileSync("bookings.json"));
    data.splice(req.params.index, 1);
    fs.writeFileSync("bookings.json", JSON.stringify(data, null, 2));
    res.send("Deleted");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

//connects frontend with backend