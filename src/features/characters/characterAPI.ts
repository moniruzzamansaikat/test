import axios from 'axios';

const API_URL = 'https://swapi.dev/api/people';

export const allCharsWithoutPaging = async (urls: string[]) => {
  const responses = await Promise.all(
    urls.map(async (item) => (await axios.get(item)).data) 
  )
  
  return responses
}

export const fetchAllChars = (pageNumber: number) => {
  return axios.get(API_URL + '?page=' + pageNumber).then(response => {
    return response.data;
  });
}

export const fetchSearchCharacters = (nameQuery: string) => {
 return axios.get(API_URL + '?search=' + nameQuery).then(response =>  response.data); 
}

export const fetchCharacterByUrl = (url: string) => {
  return axios.get(url).then(response =>  {
    return response.data;
  });   
}
