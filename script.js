const baseURL = "https://modern-birthstones.onrender.com" // add render URL

const monthPick = "May"; // user input here


const getStones = async function(){
    try { // request info from API
        const stoneIDs = await fetch(`${baseURL}?month=${encodeURIComponent(monthPick)}`);
        const stoneIDsJSON = await stoneIDs.json();

        const stoneList = document.getElementById("stoneList");
        // get something back
        console.log(stoneIDsJSON)

        Object.keys(stoneIDsJSON).forEach(async (key, value) => {
            try {
                const stoneInfo = await fetch(`${baseURL}/stone/${stoneIDsJSON[key]}`);
                const stoneInfoJSON = await stoneInfo.json();

                console.log(stoneInfoJSON)

                // update html
                const listItem = document.createElement("li");
                const stoneText = document.createTextNode(`Month: ${monthPick}, Birthstone: ${stoneInfoJSON.stone}`);

                listItem.appendChild(stoneText);
                stoneList.appendChild(listItem);

            } catch (error) {
                console.error("Error fetching stone info:", error);
            }
        });

    } catch (error) {
        console.log(error);
    }
}

getStones();