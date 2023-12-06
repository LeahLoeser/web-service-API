import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5502;

let birthstones = {
    1: { month: "January", stone: "Garnet", imageUrl: "./images/january.png" },
    2: { month: "February", stone: "Amethyst", imageUrl: "./images/february.png" },
    3: { month: "March", stone: "Aquamarine & Bloodstone", imageUrl: "./images/march.png" },
    4: { month: "April", stone: "Diamond", imageUrl: "./images/april.png" },
    5: { month: "May", stone: "Emerald", imageUrl: "./images/may.png" },
    6: { month: "June", stone: "Alexandrite, Pearl, & Moonstone", imageUrl: "./images/june.png" },
    7: { month: "July", stone: "Ruby", imageUrl: "./images/july.png" },
    8: { month: "August", stone: "Peridot", imageUrl: "./images/august.png" },
    9: { month: "September", stone: "Sapphire", imageUrl: "./images/september.png" },
    10: { month: "October", stone: "Tourmaline & Opal", imageUrl: "./images/october.png" },
    11: { month: "November", stone: "Citrine", imageUrl: "./images/november.png" },
    12: { month: "December", stone: "Tanzanite, Turquoise, & Zircon", imageUrl: "./images/december.png" },
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