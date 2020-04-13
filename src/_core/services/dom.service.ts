export class DomService {
  private registeredEvents: [] = [];

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

  public update() {
    const _glboal = window as any;

    document.querySelectorAll('*').forEach((element: Element) => {
      console.log(element);
    });
  }

  public reset() {
    this.registeredEvents = [];
    this.update();
  }
}
