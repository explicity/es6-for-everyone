import { fight } from './fight';
import { IModal } from './view/fightersView';

class Setup {
  allFighters: Set<object>;
  checked: Set<string | number>;

  constructor() {
    this.allFighters = new Set();
    this.checked = new Set();
  }

  static button = document.getElementById("fight-btn") as HTMLButtonElement;

  private setupFight(): void {
    let fighters: Array<IModal> = [];

    for (let fighter of this.checked) {
      const allFighters: IterableIterator<IModal> = this.allFighters.values();
      for (let details of allFighters) {
        const { _id } = details;

        if (fighter === _id) {
          fighters.push(details);
        }
      }
    }
    fight(fighters);
  }

  public updateData(details: IModal): void {
    let temp;

    const allFighters: IterableIterator<IModal> = this.allFighters.values();
    for (let fighter of allFighters) {
      if (details._id == fighter._id) {
        temp = fighter;
      }
    }

    if (temp) {
      this.allFighters.delete(temp);
    }
    this.allFighters.add(details);
  }

  public updateFighters(event: any, id: string | number): void {
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
