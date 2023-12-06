const baseURL = "https://modern-birthstones.onrender.com" // add render URL

const monthPick = "May"; // user input here

const getStones = async function(){
    try {
        // info from user
        const inputMonth = document.getElementById("inputMonth").value;
        // request info from API
        const stoneIDs = await fetch(`${baseURL}?month=${encodeURIComponent(inputMonth)}`);
        const stoneIDsJSON = await stoneIDs.json();

        const stoneList = document.getElementById("stoneList");

        // clear previous results
        stoneList.innerHTML = "";

        for (const key of stoneIDsJSON) {
            try {
                const stoneInfo = await fetch(`${baseURL}/stone/${key}`);
                const stoneInfoJSON = await stoneInfo.json();

                const listItem = document.createElement("li");
                const stoneText = document.createTextNode(`Month: ${inputMonth}, Birthstone: ${stoneInfoJSON.stone}`);

                listItem.appendChild(stoneText);
                stoneList.appendChild(listItem);

            } catch (error) {
                console.error("Error fetching stone info:", error);
            }
        }

    } catch (error) {
        console.log(error);
    }
}

getStones();