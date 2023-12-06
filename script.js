const baseURL = "https://modern-birthstones.onrender.com" // add render URL

const monthPick = "May"; // user input here

const getStones = async function(){
    try { //request info from API
        const stoneIDs = await fetch(`${baseURL}?month=${encodeURIComponent(monthPick)}`);

        // const stoneIDs = await fetch(`${baseURL}?month=${monthPick}`)
        const stoneIDsJSON = await stoneIDs.json();
            //getting osomething back
        console.log(stoneIDsJSON)
  
        Object.keys(stoneIDsJSON).forEach(async(key,value) => {
            try {
                const stoneInfo = await fetch(`${baseURL}/stone/${stoneIDsJSON[key]}`)
                const stoneInfoJSON = await stoneInfo.json();
            
                console.log(stoneInfoJSON)

                //update html
                const stoneh1 = document.getElementById("stoneIDs");
                const listItem = document.createElement("li")

                const stoneName = document.createTextNode(`Month: ${monthPick}, Birthstone: ${stoneInfoJSON.stone}`);

                listItem.appendChild(stoneName);
                stoneh1.appendChild(listItem)

            } catch (error) {
                console.error("Error fetching stone info:", error);
            }
        })

        // const carh1 = document.getElementById("carIDs"); // carh1 madeup 
        // carh1.innerHTML = carIDsJSON;


    } catch (error) {
        console.log(error)
    }
}

getStones();