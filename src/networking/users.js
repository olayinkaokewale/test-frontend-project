import Config from "./config"


export default class UserAPI {

    static registerUser = async (name, email, password) => {
        const url = `${Config.API_URL}/users/signup`;
        const requestBody = JSON.stringify({
            name: name,
            email: email,
            password: password
        });
        console.log("Request URL & Body => ", url, requestBody);
        const response = await fetch(url, {
            method: "POST",
            body: requestBody,
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        });

        return response.json();
    }

    static loginUser = async (email, password) => {
        const url = `${Config.API_URL}/users/login`;
        const requestBody = JSON.stringify({
            email: email,
            password: password
        });
        console.log("Request URL & Body => ", url, requestBody);
        const response = await fetch(url, {
            method: "POST",
            body: requestBody,
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        });

        return response.json();
    }

    static authUser = async (authKey) => {
        const url = `${Config.API_URL}/users/dashboard`;
        console.log("Request URL => ", url);
        const response = await fetch(url, {
            headers: {
                "Authorization":`Bearer ${authKey}`
            }
        });

        return response.json();
    }

}