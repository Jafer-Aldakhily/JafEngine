import axios from "axios";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";


const ResultContext = createContext()

// const baseUrl = "https://google-search72.p.rapidapi.com"


export function ResultContextProvider({ children }) {
    const [results, setResults] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const auth = localStorage.getItem("auth")

    // /search /images /videos
    const getResults = async (type) => {
        setisLoading(true)
        console.log(type);

        if (type.includes('/images')) {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                    'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
                }
            };

            await  fetch(`https://bing-image-search1.p.rapidapi.com/images/search?q=${searchTerm}`, options)
                .then(response => response.json())
                .then((response) => {
                    setResults(response.value)
                    console.log(response.value)
                    })
                .catch(err => console.error(err));


        } else if (type.includes('/news')) {
            const options = {
                method: 'GET',
                headers: {
                    'X-BingApis-SDK': 'true',
                    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
                }
            };
            
           await fetch(`https://bing-news-search1.p.rapidapi.com/news/search?q=${searchTerm}` , options)
                .then(response => response.json())
                .then((response) => {
                    setResults(response.value)
                    console.log(response.value)
                    })
                .catch(err => console.error(err));

        } else if(type.includes('/videos')) {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                    'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
                }
            };
            
            fetch(`https://youtube-v2.p.rapidapi.com/search/?query=${searchTerm}&lang=en&order_by=this_month&country=us`, options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    setResults(response.videos)
                })
                .catch(err => console.error(err));

        }else{

            const options = {
                method: 'GET',
                headers: {
                    'X-BingApis-SDK': 'true',
                    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                    'X-RapidAPI-Host': 'bing-web-search1.p.rapidapi.com'
                }
            };

           await fetch(`https://bing-web-search1.p.rapidapi.com/search?q=${searchTerm}`, options)
                .then(response => response.json())
                .then((response) => {
                    setResults(response.webPages.value)
                    if(auth)
                    {
                        const history = {
                            userid : JSON.parse(localStorage.getItem("current-user")) ? JSON.parse(localStorage.getItem("current-user")) : JSON.parse(localStorage.getItem("google-current-user")),
                            name : response.webPages.value[0].name,
                            url: response.webPages.value[0].url
                        } 
                        if(history.userid)
                        {
                            axios.post("http://localhost:5000/history",history)
                        }
                    }
                    console.log(response.webPages.value[0])
                    })
                .catch(err => console.error(err));
        }

        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'X-BingApis-SDK': 'true',
        //         'X-RapidAPI-Key': '20afecf17cmshc445fe24cff4a85p1a32ccjsnf2dc86b552bf',
        //         'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        //     }
        // };

        // const response = await fetch(`https://bing-news-search1.p.rapidapi.com/news/search?q=Elon Musk`, options)
        //     .then(response => response.json())
        //     .then((response) => {
                    // setResults(response)
                    // console.log(response)
                    // })
        //     .catch(err => console.error(err));

        setisLoading(false)


    }


    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading, setisLoading }}>
            {children}
        </ResultContext.Provider>
    )
}




export const useResultContext = () => useContext(ResultContext)






// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '20afecf17cmshc445fe24cff4a85p1a32ccjsnf2dc86b552bf',
// 		'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
// 	}
// };

// fetch('https://youtube138.p.rapidapi.com/video/details/?id=kJQP7kiw5Fk&hl=en&gl=US', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));



// author:avatar:
// badges:
// canonicalBaseUrl:"/@LuisFonsiVEVO"
// channelId:"UCLp8RBhQHu9wSsq62j_Md6A"
// stats:
// title:"LuisFonsiVEVO"
// cards:
// category:"Music"
// chapters:
// description:"“Despacito” disponible ya en todas las plataformas digitales: https://UMLE.lnk.to/DOoUzFp “Imposible” disponible ya en todas las plataformas digitales: https://UMLE.lnk.to/IMPOSIBLEFp “Calypso” disponible ya en todas las plataformas digitales: https://UMLE.lnk.to/CLYPSFp Echame La Culpa disponible ya en todas las plataformas digitales: https://UMLE.lnk.to/ELCFp Best of Luis Fonsi / Lo mejor Luis Fonsi: https://goo.gl/KLWPSa Subscribe here: https://goo.gl/nkhcGc Sigue a Luis Fonsi: Official Site: http://www.luisfonsi.com/ Facebook: https://www.facebook.com/luisfonsi/ Twitter: https://twitter.com/LuisFonsi Instagram: https://www.instagram.com/luisfonsi #LuisFonsi #Despacito #Imposible #Calypso #EchamelaCulpa #NadaEsImposible #NothingisImpossible #LF Music video by Luis Fonsi performing Despacito. (C) 2017 Universal Music Latino"
// endScreen:items:
// isLiveContent:false
// isLiveNow:false
// keywords:
// 0:"Luis"
// 1:"Fonsi"
// 2:"Despacito"
// 3:"UMLE"
// 4:"Latino"
// 5:"Latin"
// 6:"Pop"
// 7:"Luis Fonsi"
// 8:"Daddy Yankee"
// 9:"Music Video"
// 10:"Oficial"
// 11:"Official Music Video"
// 12:"#Despacito"
// 13:"Zuleyka Rivera"
// 14:"Super model"
// 15:"Miss Universe"
// 16:"Puerto Rico"
// 17:"한글자막"
// 18:"日本語字幕"
// 19:"subtítulos en español"
// 20:"Türkçe Altyazılı"
// 21:"Phụ đề tiếng Việt"
// 22:"Subtitles in Tagalog"
// 23:"Teks dalam Bahasa Indonesia"
// 24:"उपशीर्षक हिंदी में"
// 25:"Sarikata Dalam Bahasa Malaysia"
// 26:"คำบรรยายภาษาไทย"
// 27:"ルイス・フォンシ"
// 28:"루이스 폰시"
// 29:"路易斯方辛"
// 30:"路易斯冯西"
// lengthSeconds:282
// musics:0:
// publishedDate:"2017-01-12"
// stats:
// comments:4245058
// likes:50156431
// views:8006572126
// superTitle:items:
// thumbnails:0:
// 1:
// 2:
// 3:
// 4:
// title:"Luis Fonsi - Despacito ft. Daddy Yankee"
// videoId:"kJQP7kiw5Fk"