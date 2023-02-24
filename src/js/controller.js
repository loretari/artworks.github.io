import { async } from 'regenerator-runtime';

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
    } catch (err) {
        console.log(err);
    }
};
showArtworks();