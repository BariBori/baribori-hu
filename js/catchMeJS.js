window.addEventListener("load", function LastClick (){
    let last = new Date();
    let lastClick = last.setTime(last.getTime());
    console.log("Set time of last click first time = page load time: " + lastClick);
    let bestDiff = 100;

    let randomItem = document.getElementById('randomItem');

    document.getElementById('randomItem').onclick = function(){

        //set random color for the item with hex colors
        //https://www.paulirish.com/2009/random-hex-color-code-snippets/
        let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

        //set the size of the item - between 50px and 175px
        let randomSize = Math.floor(Math.random() * 100) + 50;

        //set the border roundness of the item - between 0% and 100%
        let randomBorder = (Math.random() * (1 - 0.1) + 0.1).toFixed(2);

        //set the top position of the item - between 200px and 400px
        let randomTop = Math.floor(Math.random() * 200) + 200;

        //set the left position of the item - between 50px and 350 px
        let randomLeft = Math.floor(Math.random() * 300) + 50;

        console.log(randomBorder);

        //set style of the item
        randomItem.style.position = "absolute";
        randomItem.style.top = randomTop + "px";
        randomItem.style.left = randomLeft +"px";
        randomItem.style.backgroundColor = randomColor;
        randomItem.style.width = randomSize + "px";
        randomItem.style.height = randomSize + "px";

        //set circle or square
            // - if randomBorder >= 0.5 -> circle
            // - if randomBorder < 0.5 -> square

        if (randomBorder >= 0.5){
            randomItem.style.borderRadius = "50%";
        } else {
            randomItem.style.borderRadius = "0%";
        }

        //set actual click time
        let now = new Date();
        now = now.setTime(now.getTime());
        console.log("Actual click time: " + now);

        //calculate time between actual click time and the last click time
        const diff = (now - lastClick) / 1000;
        console.log("Difference: " + diff);

        //write result time to the 'Your time' field
        document.getElementById('time').innerHTML = diff + "sec";

        if (bestDiff > diff){
            bestDiff = diff;
        }

        //write the actual best time to the 'Your best time' field
        document.getElementById('bestTime').innerHTML = bestDiff + "sec";

        console.log("BestTime: " + bestDiff);

        lastClick = now;


    };

});