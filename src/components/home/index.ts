import templateString from './index.html';

export const loadHomeComponent = () => {
  const mainDiv = document.querySelector('#main');
  if (mainDiv) {
    mainDiv.innerHTML = templateString;
  }
};