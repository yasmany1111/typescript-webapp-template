export class DomService {
  public onClick(elementSelector: string, eventCallback: (event: any) => void) {
    const elementSelected = document.querySelector(elementSelector);
    if (elementSelected) {
      elementSelected.addEventListener('click', eventCallback);
    }
  }

  public setHTML(elementSelector: string, htmlString: string) {
    const elementSelected = document.querySelector(elementSelector);
    if (elementSelected) {
      elementSelected.innerHTML = htmlString;
    }
  }
}
