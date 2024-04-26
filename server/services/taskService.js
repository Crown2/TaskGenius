import fetch from "node-fetch";

const getAllTaskData = async (userId) => {
    const response = (await fetch(`${process.env.ATLAS_URI}/earth911.getPostalData?api_key=${process.env.EARTH911_API_KEY}&country=${country}&postal_code=${postalCode}`));
    return await response.json();
}