import Fighter from "./fighter.js";
import { fighterService } from "./services/fightersService";

class Setup {
  constructor() {
    this.allFighters = new Set();
    this.checked = new Set();
  }

  static button = document.getElementById("fight-btn");

  setupFight() {
    let fighters = [];

    for (let fighter of this.checked) {
      for (let details of this.allFighters.values()) {
        const { _id } = details;

        if (fighter === _id) {
          fighters.push(details);
        }
      }
    }
  }

  updateData(details) {
    let temp;

    for (let fighter of this.allFighters.values()) {
      if (details._id == fighter._id) {
        temp = fighter;
      }
    }

    if (temp) {
      this.allFighters.delete(temp);
    }
    this.allFighters.add(details);
  }

  updateFighters(event, id) {
    event ? this.checked.add(id) : this.checked.delete(id);

    if (this.checked.size == 2) {
      Setup.button.disabled = false;
    } else {
      Setup.button.disabled = true;
    }

    Setup.button.onclick = () => {
      this.setupFight();
    };
  }
}

export default Setup;
