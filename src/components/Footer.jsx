import React from 'react'

export default function Footer() {
  return (
    <div className='text-center p-10 mt-10 border-t dark:border-gray-700 border-gray-200'>
      <h1>2022 JafEngin, Inc.</h1>
    </div>
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