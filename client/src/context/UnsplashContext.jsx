import React, { useState, createContext, useEffect } from 'react';
import { createApi } from 'unsplash-js';

//create context object
const UnsplashContext = createContext();

//create context provider

function UnsplashProvider({ children}) {
    const [allPhotos, setAllPhotos] = useState([])

    //create unsplash link
    const unsplash = createApi({
        accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
    });
    
    useEffect(()=> {
        unsplash.search.getPhotos({
            query: 'apartment interior',
            page: 2,
            perPage: 30,
            orientation: 'landscape',
        }).then(result => {
            if (result.errors) {
            // handle error here
            console.log('error occurred: ', result.errors[0]);
            } else {
                // handle success here
                let photosArr = []
                const fetchPhotos = result.response;
                fetchPhotos.results.forEach(photo => {
                    photosArr.push(photo.urls.raw)
                })
                setAllPhotos(photosArr)
            }
        })
    },[])

    return (
        <UnsplashContext.Provider value = {allPhotos}>
            {children}
        </UnsplashContext.Provider>
    )
}

export { UnsplashContext, UnsplashProvider };
