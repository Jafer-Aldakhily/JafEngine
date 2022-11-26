import React from 'react'
export default function Footer() {
  
  return (
<footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://jafer-aldakhily.github.io/Portfolio/" className="hover:underline" target="_blank">Jafer Al-Dakhily</a>. All Rights Reserved.
    </span>
    
</footer>

  )
}


// const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://google-search72.p.rapidapi.com/search',
//   params: {
//     query: 'word cup',
//     gl: 'us',
//     lr: 'en',
//     num: '20',
//     start: '0',
//     sort: 'relevance'
//   },
//   headers: {
//     'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
//     'X-RapidAPI-Host': 'google-search72.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });