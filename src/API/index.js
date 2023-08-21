const cohort = '2305-FTB-ET-WEB-PT'
const BaseURL=`https://strangers-things.herokuapp.com/api/${cohort}`

export async function FetchAllData() {
    try {
        const response= await fetch(`${BaseURL}/posts`);
        const result= await response.json();
        return result
    } catch (error) {
        console.log(error);
    }
}

export const registerUser = async (username, password) => {
    try {
        const response = await fetch(
            `${BaseURL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (err) {
        console.error(err);
    }
}