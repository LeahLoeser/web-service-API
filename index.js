import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5502;

let birthstones = {
    1: { month: "January", stone: "Garnet", imageUrl: "images/january.png" },
    2: { month: "February", stone: "Amethyst" },
    3: { month: "March", stone: "Aquamarine & Bloodstone" },
    4: { month: "April", stone: "Diamond" },
    5: { month: "May", stone: "Emerald" },
    6: { month: "June", stone: "Alexandrite, Pearl, & Moonstone" },
    7: { month: "July", stone: "Ruby" },
    8: { month: "August", stone: "Peridot" },
    9: { month: "September", stone: "Sapphire" },
    10: { month: "October", stone: "Tourmaline & Opal" },
    11: { month: "November", stone: "Citrine" },
    12: { month: "December", stone: "Tanzanite, Turquoise, & Zircon" },
};


app.get('/', (req, res) => {
    console.log("Received request for birthstones");
    const { month } = req.query;
    console.log("Requested month:", month);

    if (month) {
        const birthMonth = Object.keys(birthstones).filter(key => birthstones[key].month.toLowerCase() === month.toLowerCase());
       // Include image URL in the response
       const response = birthMonth.map(key => ({ ...birthstones[key], id: key }));
       return res.json(response);
   }

   res.status(400).send("Invalid request. Please provide a valid month parameter.");
});

app.get('/stone/:id', (req, res) => {
    const { id } = req.params;
    const stone = birthstones[id];
    if (stone) {
        res.send(stone);
    } else {
        res.status(404).send("Stone not found");
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});