import View from "./View";
import icons from 'url:../../img/icons.svg';
import previewView from "./previewView";

class ResultsView extends View{
    _parentElement = document.querySelector('.results');

    _errorMessage = 'No artworks found for your query. Please try again!';
    _message = '';



    _generateMarkup() {
        console.log(this._data);
        return this._data.map(this._generateMarkupPreview).join('');
    }
    _generateMarkupPreview (result) {
        const id = window.location.hash.slice(1);
        console.log(result);
        return `
        <li class="preview">
              <a class="preview__link ${result.id === id ? "preview__link--active" : ''}" href="#${result.id}">
                <div class="preview__data">


                  <h4 class="preview__title">${result.title}</h4>
                  <p class="preview__publisher">${result.model}</p>
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
export default new ResultsView();