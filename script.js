let x = document.querySelector(".myMessage")
let y = document.querySelector(".send")
let z = document.querySelector(".chat-history")






const loadBubble = () =>{
    z.insertAdjacentHTML("beforeend", `
        <div class="typing-indicator response" id="loading-bubble">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `)
}





async function send(){
    message = x.value;
    x.value = ''
    y.disabled = 'true'
    

    z.insertAdjacentHTML("beforeend", `
        <div class="message"> ${message} </div>
    `)
    loadBubble();


    try{

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

        if(response.status == 200){
            const data = await response.json();
            const clearData = data.choices[0].message.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");  //if html code comes then  change th < and > sign so the browser doesn't render those

            z.insertAdjacentHTML("beforeend", `               
                            <div class="response">${clearData}</div>
                `);
        }    
        else{
            z.insertAdjacentHTML("beforeend", `               
                            <div class="response">did not got any answer somthing went wrong</div>
                `);
        }


    }
    catch (e){
        z.insertAdjacentHTML("beforeend", `               
                            <div class="response">did not got any answer somthing went wrong</div>
                `);
    }



    y.disabled = false
    document.getElementById("loading-bubble").remove();

}



y.addEventListener("click" , ()=>{
    if(x.value != ''){
        send();
    }
})

document.addEventListener("keydown" , (event)=>{
    if (event.key === "Enter") {
        if(x.value != ''){
        send();
    }
    }
})