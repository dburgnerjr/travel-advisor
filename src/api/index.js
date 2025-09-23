import axios from "axios";

export const getPlacesData = async(type, sw, ne) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
            },
            headers: {
                'x-rapidapi-key': '70bfa19f3amsh8ddb2b30c8ad568p1d9255jsn7d2a51b7de6b',
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
        });

        return data;
    } catch (error) {
        console.log(error)
    }
}