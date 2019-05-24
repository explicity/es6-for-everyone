import View from "./view";
import FighterView from "./fighterView";
import { fighterService } from "../services/fightersService";
import Setup from "../setup.js";

class FightersView extends View {
  constructor(fighters) {
    super();

    this.handleClick = this.handleFighterClick.bind(this);
    this.handleCheckbox = this.handleFighterCheckbox.bind(this);
    this.createFighters(fighters);
    this.setup = new Setup();
  }
  static healthInput = document.getElementById("health-input");
  static attackInput = document.getElementById("attack-input");
  static defenseInput = document.getElementById("defense-input");
  static button = document.getElementById("submit-btn");

  fightersDetailsMap = new Map();

  createFighters(fighters) {
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

  handleFighterClick(event, fighter) {
    const fighterDetails = this.setFighterDetails(fighter);
    const { target } = event;

    fighterDetails.then(details => {
      if (target.tagName === "IMG") {
        this.setModal(details);
      }
      this.setup.updateData(details);
    });
  }

  handleFighterCheckbox(event, id) {
    this.setup.updateFighters(event, id);
  }

  async setFighterDetails(fighter) {
    const id = fighter._id;

    if (this.fightersDetailsMap.has(id)) {
      return this.fightersDetailsMap.get(id);
    }

    try {
      const details = await fighterService.getFighterDetails(id);
      this.fightersDetailsMap.set(id, details[0]);

      return details[0];
    } catch (error) {
      throw error;
    }
  }

  setModal(details) {
    FightersView.healthInput.value = details.health;
    FightersView.attackInput.value = details.attack;
    FightersView.defenseInput.value = details.defense;

    FightersView.button.onclick = () => {
      event.preventDefault();
      this.handleChange(details._id);
    };
  }

  async handleChange(id) {
    const update = {
      health: FightersView.healthInput.value,
      attack: FightersView.attackInput.value,
      defense: FightersView.defenseInput.value
    };

    Object.keys(update).forEach(
      key => (this.fightersDetailsMap.get(id)[key] = parseInt(update[key]))
    );

    try {
      const update = await fighterService.putFighterDetails(
        this.fightersDetailsMap.get(id)
      );
      return update;
    } catch (error) {
      throw error;
    }
  }
}

export default FightersView;
