let x = document.querySelector("#textData")
let y = document.querySelector(".sbutton")
let z = document.querySelector(".textbox")

async function send(){
    message = x.value;
    x.value = ''
    y.disabled = 'true'

    const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer baadf3543722b013f68a0e7aef754185dd114c683c69df00808a31832c6cd38f",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
            messages: [
                {
                    role: "user",
                    content: message
                }
            ]
        })
    });

    const data = await response.json();
    console.log(data)
    z.insertAdjacentHTML("beforeend", `
                <div class="row d-flex justify-content-end">
                    <div class="col-6 data"><p>${message}</p></div>
                </div>
                <div class="row d-flex justify-content-start">
                    <div class="col-6 data"><p>${data.choices[0].message.content}</p></div>
                </div>
                <br><br>
        `);
    y.disabled = false

}





document.addEventListener("keydown" , (event)=>{
    if (event.key === "Enter") {
        send();
    }
})