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