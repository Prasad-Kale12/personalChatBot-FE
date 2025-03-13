import axios from "axios"
import { assistantEndPoint } from "../utils/ApiNames.js"
const finalUrl  = process.env.VUE_APP_API_URL

export const getMessageFromAssistant = async (userPrompt) => {
    console.log('finalUrl', finalUrl);
    try {
  const data = await axios.post(`${finalUrl}${assistantEndPoint}`, { message: userPrompt })
  return data
    } catch (error) {
        console.error('Error creating thread:', error.message)
        return ''
    }
}