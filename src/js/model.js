import {async} from "regenerator-runtime";
import 'regenerator-runtime';
import {getJSON, sendJSON} from "./helpers";
import {API_URL, RES_PER_PAGE, KEY} from "./config";

export const state = {
    data: {},
    config: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks:[],
};

const createArtworkObject = function (dates) {
    let data = dates.data;
    return {
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
        ...(data.key && {key: data.key}),

    };
}

export const loadArtwork = async function (id) {
    try {


        // const art = await fetch(
        //      `https://api.artic.edu/api/v1/artworks/${id}`);
        const dates = await getJSON(`${API_URL}${id}`)
state.data = createArtworkObject(dates);



        if (state.bookmarks.some(bookmark => bookmark.id === id))
            state.data.bookmarked = true;
        else state.data.bookmarked = false;

        console.log(state.data);

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

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const dates = await getJSON(`${API_URL}search?q=${query}`);
        console.log(dates);


state.search.results = dates.data.map(art => {
    return {
        id: art.id,
        api_link: art.api_link,
        model: art.api_model,
        title: art.title,
    };
});
state.search.page = 1;
    } catch (err) {
        console.error(`${err}`);
        throw err;

    }
};

export const getSearchResultsPage = function (page = state.search.page) {
state.search.page = page;
    const start = (page-1)*state.search.resultsPerPage;//0;
    const end = page*state.search.resultsPerPage; //9;

    return state.search.results.slice(start, end);
}

const persistBookmark = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function (data) {
//     Add bookmark
    state.bookmarks.push(data);

//     Mark current artwork as bookmark
    if (data.id === state.data.id) state.data.bookmarked = true;
persistBookmark();
}

export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1)

//     Mark current artwork as NOT bookmarked
    if (id === state.data.id) state.data.bookmarked = false;
    persistBookmark();
}

const init = function () {
const storage = localStorage.getItem('bookmarks');
   if (storage) state.bookmarks = JSON.parse(storage);
}
init();

const clearBookmarks = function () {
    localStorage.clear('bookmarks');
}
// clearBookmarks();

export const uploadArtwork = async function (newArtwork) {

    try {
        // console.log(Object.entries(newArtwork));
        const categories = Object.entries(newArtwork).filter(entry => entry[0].startsWith('category') && entry[1] != '')
            .filter(entry => entry[0].startsWith('category') && entry[1] !=='')
            .map(category => {
                const categoryArr = category[1].replaceAll(' ', '').split(',');
                if (categoryArr.length !== 3)
                    throw new Error('Wrong categories format! Please use the correct format!');
                const termTitle = categoryArr;
                return {termTitle};
                // console.log(categories);
            });


        const artworks = {
            title: newArtwork.title,
            image: newArtwork.image,
            date_start: newArtwork.performedIn,
            category_titles: newArtwork.typeOf,
            artist_title: newArtwork.artist,
            categories,
        };


        const dates = await sendJSON(`${API_URL}?key=${KEY}`, artworks);
        console.log(dates);
        state.data = createArtworkObject(dates);
        // addBookmark(state.data);
        console.log(artworks);

    } catch (err) {
        throw err;
    }


    }
