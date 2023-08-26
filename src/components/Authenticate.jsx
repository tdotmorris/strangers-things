const cohort = '2305-FTB-ET-WEB-PT';
const BaseURL = `https://strangers-things.herokuapp.com/api/${cohort}`;

export default async function Authenticate(token,setUsername) {
    try {
        const APIResponse = await fetch(`${BaseURL}/users/me`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        
        const result = await APIResponse.json();
        console.log('API Response:', result);

        if (!APIResponse.ok) {
            throw new Error(result.error || 'Authentication failed');
        }

        // Check if the data property exists
        if (!result.data) {
            console.error("Unexpected API structure. User data missing.");
            return { success: false, error: "User data missing from API response" };
        }

        // Extracting user data from the 'data' property
        const userData = {
            username: result.data.username || null,
            posts: result.data.posts || [],
            messages: result.data.messages || [],
            _id: result.data._id || null
        };
        
        setUsername(userData.username)
        console.log('Extracted User Data:', userData);
        return userData;

    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
}
