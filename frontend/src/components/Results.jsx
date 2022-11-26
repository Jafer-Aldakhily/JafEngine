import React,{useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useResultContext } from '../context/ResultContextProvider'
import Loading from './Loading'
import ReactPlayer from 'react-player';
import Masonry from 'react-masonry-css'
export default function Results() {
  const {results,isLoading,getResults,searchTerm} = useResultContext()
  const location = useLocation()


  const breakpointObj = {
    default:4,
    3000:6,
    2000:5,
    1200:3,
    1000:2,
    500:1
}

  useEffect(() => {
    if(searchTerm)
    {
      getResults(`${location.pathname}?q=${searchTerm}&num=20`)
    }
  },[searchTerm,location.pathname])

  if(isLoading) return <Loading />
  
  switch(location.pathname)
  {
    case "/search" :
      return (
        <div className="flex flex-wrap justify-between space-y-5 sm:px-56">
          {
            results?.map(({name, url,displayUrl,snippet}, index) => (
              <div key={index} className='md:w-2/5 w-full'>
                <a href={url} target="_blank">
                  <p className='text-sm'>
                    {/* {displayUrl.length > 30 ? displayUrl.substring(0,30) : displayUrl} */}
                    {displayUrl}
                  </p>
                  <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                    {name}
                  </p>
                  <p className='text-base'>
                    {snippet}
                  </p>
                  
                </a>
              </div>
            ))
          }
        </div>
      )

    case "/images" :
      return (
        <Masonry className='flex animate-slide-fwd gap-3' breakpointCols={breakpointObj}>
          {
            results?.map(({thumbnailUrl, webSearchUrl,name}, index) => (
              <a className='sm:p-2 p-5' href={webSearchUrl} key={index} target="_blank">
                  <img src={thumbnailUrl} alt={name} loading="layz" />
                  <p className='w-36 break-words text-sm mt-2'>
                    {name}
                  </p>
              </a>
            ))
          }
        </Masonry>
      )

      case '/news':
        return (
          <div className="sm:px-56 flex flex-wrap justify-between items-center space-y-6">
            {/* results?.entries? */}
            {results?.map(({ url, description, name },index) => (
              <div key={index} className="md:w-2/5 w-full">
                <a href={url} target="_blank" rel="noreferrer " className="hover:underline ">
                  <p className="text-lg dark:text-blue-300 text-blue-700">{name}</p>
                </a>
                <div className="flex gap-4">
                  <a href={url} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-300"> {description}</a>
                </div>
              </div>
            ))}
          </div>
        );
      case '/videos':
        return (
          <div className="grid lg:grid-cols-4 lg:gap-10 max-w-screen mx-auto px-1 sm:grid-cols-1 md:grid-cols-2">
            {/* { <ReactPlayer url="https://www.youtube.com/watch?v=UZzRP4K-RpQ" controls width="355px" height="200px" />} */}
            {results?.map(({description,title,video_id}, index) => (
              <>
              <article key={index}>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${video_id}`} controls width="355px" height="200px"
                className="h-56 rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
                 />
            
              <div class="py-4">
                  <a class="text-lg font-medium text-blue-500 underline"
                  href={`https://www.youtube.com/watch?v=${video_id}`} target="_blank"
                  >
                      {title}
                </a>
            
                <p class="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-3">
                  {description}
                </p>
              </div>
            </article>
            </>
            ))}
          </div>
        );
      default:
        return 'Error...';

  }

}

/*
/search 
results 
results : {
  0 : {
    link : https://link,title:title,description:description
  },
  1 : {},
  2 : {},
},

images_list :
{
  0 : {
    link : https://link,title:title,description:description
  },
  1 : {},
  2 : {},
}

*/
