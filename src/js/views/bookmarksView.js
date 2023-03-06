import View from "./View";
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View{
    _parentElement = document.querySelector('.bookmarks__list');

    _errorMessage =  ' No bookmarks yet. Find a impressive artwork and bookmark it!';
    _message = '';

    _generateMarkup() {
        console.log(this._data);
        return this._data.map(this._generateMarkupPreview).join('');
    }
    _generateMarkupPreview (result) {
        const id = window.location.hash.slice(1);
        // console.log(result);
        return `
        <li class="preview">
                              <a class="preview__link" href="#${result.id}">
                                <div class="preview__data">

                              <p class="preview__publisher "> Was performed in: </p>
<h4 class="preview__title">${result.date_display}</h4>
                                 
                                </div>
                                <div class="preview__data">
                                  <h4 class="preview__title">
                                    ${result.title}
                                  </h4>
                                  <p class="preview__publisher">${result.artist_title}</p>
                                    <div class="preview__user-generated">
                    <svg>
                      <use href="${icons}#icon-user"></use>
                    </svg>
                  </div>
                                </div>
                              </a>
                            </li>`;
    }
}
export default new BookmarksView();