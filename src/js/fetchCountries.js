import refs from './refs';
import { debounce } from 'debounce';
import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';
import './pnotify';
//import 'material-design-icons/iconfont/material-icons.css';
// PNotify.defaults.styling = 'material';
// PNotify.defaults.icons = 'material';
import 'animate.css/animate.min.css';
import list_template from '../templates/list_template.hbs';
import info_template from '../templates/info_template.hbs';
let search = '';
const baseUrl = `https://restcountries.eu/rest/v2/name/`;
//let search = '';

refs.searchQuery.addEventListener('input', debounce(fetchCountries, 500));

function fetchCountries(searchQuery) {
  search = refs.searchQuery.value;
  //console.log(search);
  if (search) {
    let url = `${baseUrl}${search}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        if (data.length > 10) {
          //console.log('error');
          PNotify.error({
            text: `Too many matches found. Please enter a more specific query!`,
          });
          //refs.infoAlert.classList.add('animate__animated', `animate__wobble`);
        }
        if (data.length > 1 && data.length <= 10) {
          const list = data.map(element => element.name);
          refs.content.innerHTML = list_template(list);
        }
        if (data.length === 1) {
          // const country = data[0];
          // const newCountry = { name: country.name, language: country.language };
          //console.log(newCountry);
          refs.content.innerHTML = info_template(data[0]);
          console.log(data[0]);
        }
      });
  }
}
