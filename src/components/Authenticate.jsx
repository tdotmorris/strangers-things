const cohort = '2305-FTB-ET-WEB-PT';
const BaseURL = `https://strangers-things.herokuapp.com/api/${cohort}`;

export default async function Authenticate(token) {
    try {
        const APIResponse = await fetch(`${BaseURL}/users/me`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        
        const result = await APIResponse.json();
        if (!APIResponse.ok) {
            throw new Error(result.error || 'Authentication failed');
        }

        console.log(result);
        return result;

    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
}
