import {ARTIC_URL, CONFIG_URL, WEBSITE_URL} from "../config";
import icons from 'url:../../img/icons.svg';

class ArtworkView {
    _parentElement = document.querySelector('.artworks');
    _data;

    render(data) {
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    renderSpinner = function () {
        const markup = `
    <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>

    `;
        this._parentElement.innerHTML = '';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    addHandlerRender (handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
    }


    _generateMarkup() {
        return `
 <figure class="artworks__fig">
          <img src="${CONFIG_URL}/${this._data.image}/full/843,/0/default.jpg" alt="${this._data.title}" class="artworks__img" />
          <h1 class="artworks__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>
<div class="artworks__article" aria-label="Additional information">

    <h1 class="artworks__info-article">
   On View:
    </h1>

            <ul>
             <a class ="btn--small recipe__btn"  href="${WEBSITE_URL}/departments/${this._data.department}/${this._data.department_title
            .toLowerCase()
            .split(' ')
            .join('')}" 
            target="_blank"><span>Painting and Sculpture of Europe</span><svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg></a>
            <a class= "btn--small recipe__btn" href="${WEBSITE_URL}/galleries/${this._data.gallery}/gallery-240"
            target="_blank"><span>Gallery 240</span><svg class="search__icon">          
           <use href="${icons}#icon-arrow-right"></use></svg></a>
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
                     <span class="space artworks__info-text">Date:</span>
                        <span class="artworks__info-data artworks__info-data--minutes">${this._data.date_start}</span>
          </div>
          <div class="artworks__info">
           <span class="space artworks__info-text">artist:</span>
            <span class="space artworks__info-data artworks__info-data--people">${this._data.artist_title}</span>
  </div>
 <div class="artworks__info">
           <span class="space artworks__info-text">type of artwork:</span>
            <span class="space artworks__info-data artworks__info-data--people">${this._data.api_model}</span>
  </div>
   <div class="artworks__info">
           <span class="space artworks__info-text">category title:</span>
            <span class="space artworks__info-data artworks__info-data--people">${this._data.category_titles}</span>
  </div>
       </div>


        <div class="artworks__categories">
          <h2 class="heading--2">Category of terminology</h2>
          <ul class="artworks__category-list">
${this._data.term_titles.map(this._generateMarkupArtworks).join('')}
            
          
        </div>

        <div class="artworks__directions">
          <h2 class="heading--2">description</h2>
          <p class="artworks__directions-text">
            This artwork was created by
            <span class="artworks__publisher">${this._data.artist_title}</span>. You can find out more about this work at the Art Institute Chicago website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${ARTIC_URL}${this._data.id}/${this._data.title.toLowerCase().split(' ').join('-')}";
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
`;
    };
    _generateMarkupArtworks (term) {
        return `
    <li class="artworks__category">
              <svg class="artworks__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="artworks__quantity"></div>
              <div class="artworks__description">
                <span class="artworks__unit"></span>
               ${term}
              </div>
            </li>
            `
    }
}


export default new ArtworkView();