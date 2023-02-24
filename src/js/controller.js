import { async } from 'regenerator-runtime';
import {CONFIG_URL, ARTIC_URL} from "../config";
import icons from 'url:../img/icons.svg';

const artworkContainer = document.querySelector('artworks');

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject (new Error(`Request took too long! Timeout after 20 second`));
        }, s * 1000);
    });
};

//  https://api.artic.edu/docs/

////////////////////////////////////
const showArtworks = async function () {
    try {
const art = await fetch(
    " https://api.artic.edu/api/v1/artworks/14556");
const dates = await art.json();
if (!art.ok) throw new Error(`${dates.message} (${art.status})`);
console.log(art, dates);

let data = dates.data;
data = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    main_number: data.main_reference_number,
    date_display: data.date_display,
    artist_display: data.artist_display,
    image: data.image_id,
    date_start: data.date_start,
    data_end: data.date_end,
    display: data.medium_display,
    api_model: data.artwork_type_title,
    text: data.publication_history,
    term_titles: data.term_titles,
    category_titles: data.category_titles,
    artist_title: data.artist_title,
};
console.log(data);

let config = dates.config;
config = {
    url: config.iiif_url,
    website: config.website_url,
};
console.log(config);


const markup = `
 <figure class="artworks__fig">
          <img src="${CONFIG_URL}/${data.image}/full/843,/0/default.jpg" alt="${data.title}" class="artworks__img" />
          <h1 class="artworks__title">
            <span>${data.title}</span>
          </h1>
        </figure>
<div class="artworks__article" aria-label="Additional information">

    <h1 class="artworks__info-article">
   On View:
    </h1>

            <ul class="artworks__article-list artworks__info-text">
                            <li><a class ="artworks__info-text"  href="https://www.artic.edu/departments/PC-10/painting-and-sculpture-of-europe" data-gtm-event="Painting and Sculpture of Europe" data-gtm-event-category="collection-nav">Painting and Sculpture of Europe</a></li>
                                        <li><a class= "artworks__info-text" href="https://www.artic.edu/galleries/2147478672/gallery-240" data-gtm-event="Gallery 240" data-gtm-event-category="collection-nav">Gallery 240</a></li>
                    </ul>
                   <div class="artworks__user-generated">
                    <svg>
                      <use href="${icons}#icon-user"></use>
                    </svg>

                   </div>
                     <button class="btn--round">
                    <svg>
                      <use href="${icons}#icon-bookmark-fill"></use>
                    </svg>
                  </button>


          </div>
        <div class="artworks__details">
          <div class="artworks__info">
                     <span class="space artworks__info-text">was performed in:</span>
                        <span class="artworks__info-data artworks__info-data--minutes">${data.date_start}</span>
          </div>
          <div class="artworks__info">
           <span class="space artworks__info-text">an artist:</span>
            <span class="space artworks__info-data artworks__info-data--people">${data.artist_title}</span>
  </div>
 <div class="artworks__info">
           <span class="space artworks__info-text">type of artwork:</span>
            <span class="space artworks__info-data artworks__info-data--people">${data.api_model}</span>
  </div>
   <div class="artworks__info">
           <span class="space artworks__info-text">category title:</span>
            <span class="space artworks__info-data artworks__info-data--people">${data.category_titles}</span>
  </div>
       </div>


        <div class="artworks__categories">
          <h2 class="heading--2">Category of terminology</h2>
          <ul class="artworks__category-list">
${data.term_titles.map(term => {
    return `
    <li class="artworks__category">
              <svg class="artworks__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="artworks__quantity"></div>
              <div class="artworks__description">
                <span class="artworks__unit"></span>
                print
              </div>
            </li>
            `;
}).join('')};
            
          
        </div>

        <div class="artworks__directions">
          <h2 class="heading--2">description</h2>
          <p class="artworks__directions-text">
            This artwork was created by
            <span class="artworks__publisher">${data.artist_title}</span>. You can find out more about this work at the Art Institute Chicago website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${ARTIC_URL}${data.id}/${data.title.toLowerCase().split(' ').join('-')}";
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
`;

artworkContainer.innerHTML = '';
artworkContainer.insertAdjacentHTML('afterbegin', markup);

    } catch (err) {
        console.log(err);
    }
};
showArtworks();