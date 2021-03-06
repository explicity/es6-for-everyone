import { FightersView } from "./view/fightersView";
import { fighterService } from "./services/fightersService";

class App {
  constructor() {
    this.startApp();
  }

  static rootElement = document.getElementById("root") as HTMLElement;
  static loadingElement = document.getElementById(
    "loading-overlay"
  ) as HTMLElement;
  static mainElement = document.getElementById("main-content") as HTMLElement;

  private async startApp() {
    try {
      App.loadingElement.style.visibility = "visible";
      App.mainElement.style.visibility = "hidden";

      const fighters = await fighterService.getFighters();
      const fightersView = new FightersView(fighters);
      const fightersElement = fightersView.element;
      App.rootElement.appendChild(fightersElement);
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = "Failed to load data";
    } finally {
      App.loadingElement.style.visibility = "hidden";
      App.mainElement.style.visibility = "visible";
    }
  }
}

export default App;
