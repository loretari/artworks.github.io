import {async} from "regenerator-runtime";
import 'regenerator-runtime';
import {getJSON} from "./helpers";
import {API_URL} from "./config";

export const state = {
    data: {},
    config: {},
}

export const loadArtwork = async function (id) {
    try {


        // const art = await fetch(
        //      `https://api.artic.edu/api/v1/artworks/${id}`);
        const dates = await getJSON(`${API_URL}${id}`)


        let data = dates.data;
        state.data = {
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
            gallery: data.gallery_id,
            department: data.department_id,
            department_title: data.department_title,

        };
        console.log(data);

        let config = dates.config;
        state.config = {
            url: config.iiif_url,
            website: config.website_url,
        };
        console.log(config);
    } catch (err) {
        console.error(`${err}`);
        throw err;
    }

}


