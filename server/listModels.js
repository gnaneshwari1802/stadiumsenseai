require("dotenv").config();

const https = require("https");

const apiKey = process.env.GEMINI_API_KEY;

const url =
`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;


https.get(url, (response) => {

    let data = "";

    response.on("data", chunk => {
        data += chunk;
    });


    response.on("end", () => {

        const result = JSON.parse(data);


        if(result.models){

            console.log("\nAvailable Models:\n");

            result.models.forEach(model => {

                console.log(
                    "Name:",
                    model.name
                );

                console.log(
                    "Methods:",
                    model.supportedGenerationMethods
                );

                console.log("----------------------");

            });

        }
        else {

            console.log(result);

        }

    });


}).on("error", (error)=>{

    console.log("Error:", error);

});