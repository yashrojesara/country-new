import axios from 'axios'

const countryAxiosInstance = axios.create({
    baseURL: 'https://restcountries.com/v3.1/'
})

const capitalAxiosInstance = axios.create({
    baseURL: 'http://api.weatherstack.com/'
})

export const getCountriesByName = async(name: string) => {
    return await countryAxiosInstance.get(`/name/${name}`);        
}

export const getWeatherByCapital = async(capital: string) => {
    return await capitalAxiosInstance.get(`current?access_key=9ed6f8706dfd1b669f07689f4a781a78&query=${capital}`)         
}
