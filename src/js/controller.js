import { async } from 'regenerator-runtime';
import {CONFIG_URL, ARTIC_URL} from "./config";

import 'regenerator-runtime/runtime';
import * as model from './model';
import artworkView from "./Views/artworkView";

const artworkContainer = document.querySelector('.artworks');

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject (new Error(`Request took too long! Timeout after 20 second`));
        }, s * 1000);
    });
};

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
    }
};
const init = function () {
    artworkView.addHandlerRender(controlArtworks);
};
init();