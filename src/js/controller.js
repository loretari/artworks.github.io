import { async } from 'regenerator-runtime';
import {CONFIG_URL, ARTIC_URL} from "./config";
import {state} from "./model";
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";

import 'regenerator-runtime/runtime';
import * as model from './model';
import artworkView from "./views/artworkView";


//  https://api.artic.edu/docs/

////////////////////////////////////


const controlArtworks = async function () {
    try {

        const id = window.location.hash.slice(1);
        console.log(id);
        if (!id) return;

        artworkView.renderSpinner();

// 1) Loading artworks

await model.loadArtwork(id);
const data  = model.state;
console.log(data);
const config= model.state;
console.log(config);


// 2) Rendering artworks
      artworkView.render(model.state.data);


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
        resultsView.render(model.state.search.results);
    } catch (err) {
        console.log(err);
    }
};

const init = function () {
    artworkView.addHandlerRender(controlArtworks);
    searchView.addHandlerSearch(controlSearchResults);
};
init();