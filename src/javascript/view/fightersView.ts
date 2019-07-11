import View from "./view";
import { FighterView, IFighter } from "./fighterView";
import { fighterService } from "../services/fightersService";
import Setup from "../setup";

interface IFighters extends Array<IFighter> {}

interface IDetails {
  [index: string]: number;
}

type IModal = IFighter & IDetails;

class FightersView extends View {
  handleClick: (event: EventTarget, fighter: IFighter) => void;
  handleCheckbox: (event: EventTarget, id: string | number) => void;
  setup: Setup;

  constructor(fighters: Array<IFighters>) {
    super();

    this.handleClick = this.handleFighterClick.bind(this);
    this.handleCheckbox = this.handleFighterCheckbox.bind(this);
    this.createFighters(fighters);
    this.setup = new Setup();
  }
  static healthInput = document.getElementById(
    "health-input"
  ) as HTMLInputElement;
  static attackInput = document.getElementById(
    "attack-input"
  ) as HTMLInputElement;
  static defenseInput = document.getElementById(
    "defense-input"
  ) as HTMLInputElement;
  static button = document.getElementById("submit-btn") as HTMLButtonElement;

  fightersDetailsMap = new Map();

  private createFighters(fighters: Array<IFighters>) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(
        fighter,
        false,
        this.handleClick,
        this.handleCheckbox
      );
      return fighterView.element;
    });

    this.element = this.createElement({
      tagName: "div",
      className: "fighters"
    });
    this.element.append(...fighterElements);
  }

  private handleFighterClick(event: EventTarget, fighter: IFighter): void {
    const fighterDetails = this.setFighterDetails(fighter);

    fighterDetails.then((details: IModal) => {
      this.setModal(details);
      this.setup.updateData(details);
    });
  }

  private handleFighterCheckbox(event: EventTarget, id: string | number): void {
    this.setup.updateFighters(event, id);
  }

  private async setFighterDetails(fighter: IFighter): Promise<T> {
    const id: string | number = fighter._id;

    if (this.fightersDetailsMap.has(id)) {
      return this.fightersDetailsMap.get(id);
    }

    try {
      const details = await fighterService.getFighterDetails(id);
      this.fightersDetailsMap.set(id, details);

      return details;
    } catch (error) {
      throw error;
    }
  }

  private setModal(details: IModal): void {
    const { _id, health, attack, defense } = details;

    FightersView.healthInput.value = health.toString();
    FightersView.attackInput.value = attack.toString();
    FightersView.defenseInput.value = defense.toString();

    FightersView.button.onclick = () => {
      event.preventDefault();
      this.handleChange(_id);
    };
  }

  private handleChange(id: string | number): void {
    const update: IDetails = {
      health: parseInt(FightersView.healthInput.value),
      attack: parseInt(FightersView.attackInput.value),
      defense: parseInt(FightersView.defenseInput.value)
    };

    Object.keys(update).forEach(
      key => (this.fightersDetailsMap.get(id)[key] = update[key])
    );
  }
}

export { FightersView, IModal };
