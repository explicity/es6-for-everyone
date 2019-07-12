import { fight } from './fight';
import { IFighter } from './view/fighterView';

class Setup {
  allFighters: Set<object>;
  checked: Set<string | number>;

  constructor() {
    this.allFighters = new Set();
    this.checked = new Set();
  }

  static button = document.getElementById("fight-btn") as HTMLButtonElement;

  setupFight() {
    let fighters: Array<IFighter> = [];

    for (let fighter of this.checked) {
      for (let details of this.allFighters.values()) {
        const { _id } = details;

        if (fighter === _id) {
          fighters.push(details);
        }
      }
    }
    console.log(fighters);
    fight(fighters);
  }

  updateData(details: IFighter) {
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

  updateFighters(event: any, id: string | number): void {
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
