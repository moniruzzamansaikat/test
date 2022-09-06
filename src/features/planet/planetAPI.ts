import axios from "axios"

export const fetchPlanetByUrl = async (url:string) => {
  return await (await axios(url)).data;
}