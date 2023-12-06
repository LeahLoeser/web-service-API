// render URL
const baseURL = "https://modern-birthstones.onrender.com" 

 // user input
const inputMonth = "";

// add event listener to the input field to listen for "Enter" key press
document.getElementById("inputMonth").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        // if "Enter" key is pressed, trigger the getStones function
        getStoned();
    }
});

const getStoned = async function() {
    try {
        // get user input
        const inputMonth = document.getElementById("inputMonth").value;
        // log user input
        console.log("Input month:", inputMonth);

        // request info from API
        const birthstoneID = await fetch(`${baseURL}?month=${encodeURIComponent(inputMonth)}`);
        const birthstoneID_JSON = await birthstoneID.json();
        // get something back
        console.log("birthstone ID:", birthstoneID_JSON);

        // define output field
        const stoneList = document.getElementById("stoneList");

        // clear previous output results
        stoneList.innerHTML = "";

        for (const key of birthstoneID_JSON) {
            try {
                const stoneInfo = await fetch(`${baseURL}/stone/${key.id}`);
                const stoneInfoJSON = await stoneInfo.json();
                console.log("Stone Info:", stoneInfoJSON);

                // create new list item for input month
                const inputMonthListItem = document.createElement("li");
                const inputMonthText = document.createTextNode(`Birth month: ${inputMonth}`);
                inputMonthListItem.appendChild(inputMonthText);
                stoneList.appendChild(inputMonthListItem);

                // create new list item for birthstone text
                const stoneTextListItem = document.createElement("li");
                const stoneInfoText = document.createTextNode(`Birthstone: ${stoneInfoJSON.stone}`);
                stoneTextListItem.appendChild(stoneInfoText);
                // append birthstone text <li> to the list
                stoneList.appendChild(stoneTextListItem);

                // create new list item for the birthstone image
                const stoneImageListItem = document.createElement("li");
                // create <img> element for the birthstone image
                const stoneImage = document.createElement("img");
                stoneImage.src = stoneInfoJSON.imageUrl; // Use the imageUrl property directly from the API response
                stoneImage.alt = `${stoneInfoJSON.stone} Image`;
                // append the image to the image <li>
                stoneImageListItem.appendChild(stoneImage);
                // append birthstone image <li> to the list
                stoneList.appendChild(stoneImageListItem);
            
            } catch (error) {
                console.error("Error fetching stone list:", error);
            }
        }

    } catch (error) {
        console.error("Error fetching birthstone IDs:", error);
    }
}