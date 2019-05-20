import Fighter from "./fighter.js";
import FighterView from "./view/fighterView.js";
import View from "./view/view.js";

const fightElement = document.getElementById("fight-wrapper");

export function fight(fighters) {
  let firstFighter = new Fighter(fighters[0]);
  let secondFighter = new Fighter(fighters[1]);

  let view = new View();

  fightElement.style.opacity = "1";

  const fighterElements = fighters.map((fighter, index) => {
    const fighterView = new FighterView(fighter, true);

    const healthIndicator = view.createElement({
      tagName: "span",
      className: "health-indicator",
      attributes: { id: `fighter-${fighter._id}` }
    });

    const btn = view.createElement({
      tagName: "button",
      className: "btn btn-secondary"
    });

    btn.innerText = "Attack!";

    if (index === 0) {
      btn.onclick = () => Commands.newTurn(firstFighter, secondFighter);
    } else {
      btn.onclick = () => Commands.newTurn(secondFighter, firstFighter);
    }

    healthIndicator.innerText = `Health: ${fighter.health}`;
    fighterView.element.append(healthIndicator, btn);

    return fighterView.element;
  });

  fightElement.append(...fighterElements);

  console.log(firstFighter, secondFighter);
}

class Commands {
  static updateHealth(fighter) {
    let comment = `Health: ${fighter.health}`;
    const label = document.getElementById(`fighter-${fighter.id}`);
    if (fighter.health <= 0) {
      comment = "Dead";
    }
    label.textContent = comment;
  }

  static newTurn(attackingCharacter, attackedCharacter) {
    attackingCharacter.attackOpponent(attackedCharacter);
    console.log(attackingCharacter, attackedCharacter);

    this.updateHealth(attackedCharacter);
  }
}
