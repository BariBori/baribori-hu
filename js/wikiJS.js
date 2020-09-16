
document.addEventListener('DOMContentLoaded', () => {

    const searchButton = document.getElementById("sbutton");
    const searchResultTable = document.getElementById("resultTable");
    const searchResultLimit = 5;

    searchButton.addEventListener('click', (event) =>{

        document.getElementById("resultTable").innerHTML = "";


        const searchTerm = document.getElementById("searchTerm").value;

        let url = "https://en.wikipedia.org/w/api.php";
        let params = {
            action: "opensearch",
            search: searchTerm,
            limit: searchResultLimit,
            namespace: "0",
            format: "json"
        };

        url = url + "?origin=*";
        Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

        event.preventDefault();
        console.log("button clicked");
        console.log("search: " + searchTerm);

        fetch(url)

            .then(response=>response.json())

            .then(parsedData => {


                for(i=0; i<searchResultLimit; i++){
                    let newTr = document.createElement("tr");
                    let newTd = document.createElement("td");

                    let newHeader = document.createElement("h1");
                    newHeader.className = "resultHeader";
                    let newLink = document.createElement("p");
                    newLink.className = "resultLink";

                    newTd.appendChild(newHeader);
                    newTd.appendChild(newLink);
                    newTr.appendChild(newTd);
                    searchResultTable.appendChild(newTr);

                    newHeader.innerHTML = "<a href='" + parsedData[3][i] + "'  target='_blank'>" + parsedData[1][i]; + "</a>";
                    newLink.innerHTML = "<a href='" + parsedData[3][i] + "'  target='_blank'>" + parsedData[3][i]; + "</a>";


                    console.log(parsedData[1][i]);
                    console.log(parsedData[3][i]);
                }


                console.log(parsedData);})
            .catch(function(error){console.log(error);});

    });
    
});


 $("#searchTerm").autocomplete({
        source: function(request, response) {
            $.ajax({
                url: "https://en.wikipedia.org/w/api.php",
                dataType: "jsonp",
                data: {
                    'action': "opensearch",
                    'format': "json",
                    'search': request.term
                },
                success: function(data) {
                    response(data[1]);
                }
            });
        }
    });






