const baseURL = "https://modern-birthstones.onrender.com" // add render URL

const monthPick = "May"; // user input here

const getStones = async function(){
    try { //request info from API
        const stoneIDs = await fetch(`${baseURL}?month=${monthPick}`)
        const stonesJSON = await carIDs.json();
            //getting osomething back
        console.log(stonesJSON)
  
        Object.keys(stonesJSON).forEach(async(key,value) => {
            try {
                const stoneInfo = await fetch(`${baseURL}car/:${stonesJSON[key]}`)
                const stoneInfoJSON = await carInfo.json();
            
                console.log(stoneInfoJSON)

                //update html
                const stoneh1 = document.getElementById("stoneIDs"); // carh1 madeup
                const listItem = document.createElement("li")

                const stoneName = document.createTextNode(stoneInfoJSON.name)

                listItem.appendChild(stoneName);
                carh1.appendChild(listItem)

            } catch (error) {
                console.log(error)
            }
        })

        // const carh1 = document.getElementById("carIDs"); // carh1 madeup 
        // carh1.innerHTML = carIDsJSON;


    } catch (error) {
        console.log(error)
    }
}

getStones();