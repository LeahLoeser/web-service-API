// import express & cors
import express from 'express'
import cors from 'cors'
app.use(cors({
    origin: '*'
}));

// Create an instance of an express application 
const app = express();
app.use(express.json());

// Set the port the application will be running on
const port = process.env.PORT || 5502

// define objects

let birthstones = {
    1: { month: "January", stone: "Garnet" },
    2: { month: "February", stone: "Amethyst" },
    3: { month: "March", stone: "Aquamarine" },
    4: { month: "April", stone: "Diamond" },
    5: { month: "May", stone: "Emerald" },
    6: { month: "June", stone: "Alexandrite" },
    7: { month: "July", stone: "Ruby" },
    8: { month: "August", stone: "Peridot" },
    9: { month: "September", stone: "Sapphire" },
    10: { month: "October", stone: "Tourmaline" },
    11: { month: "November", stone: "Citrine" },
    12: { month: "December", stone: "Tanzanite" },
  };

 //query structures use ? 
 // car-api.com?color=Green

// Set up a response for the root path of the application
app.get('modern-birthstones.com?month=May', (req,res) => {
    let birthMonth =[]; 

    Object.keys(birthstones).forEach((key, value) => {
        if(req.query.color == birthstones[key].month){
            birthMonth.push(key)
        }
    })
    res.send(birthMonth)
 });

  //url parametesr use / 
 //car-api.com/car/:1

 app.get('modern-birthstones.com/stone/:1',(req, res) => {
    let stone; 
    //:1
    Object.keys(birthstones).forEach((key, value) => {

        if(req.params.stone.substring(1) == key){
            stone = birthstones[key]
        }
    })
    res.send(stone)
 })

// Set the application to listen a port
app.listen(port, () => {
  console.log(`app listening on port ${port}` )
})