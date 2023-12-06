const baseURL = "https://modern-birthstones.onrender.com" // add render URL

const inputMonth = "May"; // user input here

const getStones = async function() {
    try {
        const inputMonth = document.getElementById("inputMonth").value;
        console.log("Input month:", inputMonth);

        const stoneIDs = await fetch(`${baseURL}?month=${encodeURIComponent(inputMonth)}`);
        const stoneIDsJSON = await stoneIDs.json();
        console.log("Stone IDs:", stoneIDsJSON);

        const stoneList = document.getElementById("stoneList");

        // Clear previous results
        stoneList.innerHTML = "";

        for (const key of stoneIDsJSON) {
            try {
                const stoneInfo = await fetch(`${baseURL}/stone/${key}`);
                const stoneInfoJSON = await stoneInfo.json();
                console.log("Stone Info:", stoneInfoJSON);

                const listItem = document.createElement("li");
                const stoneText = document.createTextNode(`Month: ${inputMonth}, Birthstone: ${stoneInfoJSON.stone}`);

                listItem.appendChild(stoneText);
                stoneList.appendChild(listItem);

            } catch (error) {
                console.error("Error fetching stone info:", error);
            }
        }

    } catch (error) {
        console.error("Error fetching stone IDs:", error);
    }
}

getStones();