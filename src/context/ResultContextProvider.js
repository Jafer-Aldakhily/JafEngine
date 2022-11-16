import {createContext,useContext,useState} from "react";


const ResultContext = createContext()

const baseUrl = "https://google-search72.p.rapidapi.com"


export function ResultContextProvider({children}){
    const [results,setResults] = useState([])
    const [isLoading,setisLoading] = useState(false)
    const [searchTerm,setSearchTerm] = useState('')

    // /search /images /videos
    const getResults = (type) => {
        setisLoading(true)

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'aa4e5d6ef0msh898be8cb859eca7p1c9551jsn1e701193f950',
                'X-RapidAPI-Host': 'google-search72.p.rapidapi.com' 
            }
        };

        
        const response = fetch(`${baseUrl}${type}`, options)
            .then(response => response.json())
            .then(res => {
                setResults(res.items)
                console.log(res.items);
            })
            .catch(err => console.error(err));


            // fetch(url).then(response => 
            //     response.json().then(data => ({
            //         data: data,
            //         status: response.status
            //     })
            // ).then(res => {
            //     console.log(res.status, res.data.title)
            // }));

            // const data = await response.json()

            // if(type.includes('/news'))
            // {
            // setResults(data.entries)
            // }else if(type.includes('/images'))
            // {
            // setResults(data.images_results)
            // }else{
            // setResults(data.items)
            // }
            setisLoading(false)

        
    }


    return (
        <ResultContext.Provider value={{getResults,results,searchTerm,setSearchTerm,isLoading}}>
            {children}
        </ResultContext.Provider>
    )   
}




export const useResultContext = () => useContext(ResultContext)