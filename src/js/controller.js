import { async } from 'regenerator-runtime';
import {CONFIG_URL, ARTIC_URL} from "./config";
import {state} from "./model";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";

import 'regenerator-runtime/runtime';
import * as model from './model';
import artworkView from "./views/artworkView";
import paginationView from "./views/paginationView";
import bookmarkView from './views/bookmarksView'


//  https://api.artic.edu/docs/
// https://api.artic.edu/api/v1/artists/
////////////////////////////////////


const controlArtworks = async function () {
    try {

        const id = window.location.hash.slice(1);
        console.log(id);
        if (!id) return;
        artworkView.renderSpinner();

//         0) Update results view to mark selected search result
        resultsView.update(model.getSearchResultsPage());


// 1) Loading artworks

await model.loadArtwork(id);
const data  = model.state;
console.log(data);
const config= model.state;
// console.log(config);


// 2) Rendering artworks
      artworkView.render(model.state.data);
        bookmarkView.render(model.state.bookmarks);

    } catch (err) {
        console.log(err);
        artworkView.renderError();
    }
};

const controlSearchResults = async function () {
    try {
resultsView.renderSpinner();
//     //     1) Get search results
const query = searchView.getQuery();
if (!query) return;

// 2) Load search results
await model.loadSearchResults(query);
        console.log(model.state.search.results)
    // 3) Render results
        resultsView.render(model.getSearchResultsPage());

    //     4) Render initial pagination buttons
        paginationView.render(model.state.search)
    } catch (err) {
        console.log(err);
    }
};

const controlPagination = function (gotToPage) {
    // 1) Render  NEW results
    resultsView.render(model.getSearchResultsPage(gotToPage));

    //     2) Render NEW pagination buttons
    paginationView.render(model.state.search)
}

const controlAddBookmark = function () {
    // 1) add/remove book,ark
    if (!model.state.data.bookmarked)
    model.addBookmark(model.state.data);
    else model.deleteBookmark(model.state.data.id);
    // console.log(model.state.data);

//     2) Update artwork view
artworkView.update(model.state.data);

// 3 Render bookmarks
    bookmarkView.render(model.state.bookmarks);


}

const init = function () {
    artworkView.addHandlerRender(controlArtworks);
    artworkView.addHandlerBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};
init();