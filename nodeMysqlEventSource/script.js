if (typeof window !== 'undefined') {
    const eventSource = new EventSource("http://localhost:5000/event");
    eventSource.addEventListener("message", (event) => {
        console.log("sucess", event);
        let data = JSON.parse(event.data);
        console.log("data", data);
        show(data)
    });

    eventSource.addEventListener("open", (event) => {
        console.log("event", event);
    });

    eventSource.addEventListener("error", (error) => {
        console.log("error", error);
    });
};

show = (data) => {
    let tab =
        `<tr>
    <th>User Name<th>
    <th>Email<th>
    <tr>`;
    for (let r of data) {
        tab += `<tr>
        <td>${r.name}</td>
        <td>${r.email}</td>
        </tr>`;
    }
    document.getElementById("productList").innerHTML = tab + "<br>";
};


        // if (data.length > sum) {
        //     alert("New record created!");
        //     sum = data.length;
            
        // } else {
        //     alert("Failed....!!!")
        // }