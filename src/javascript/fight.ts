import Fighter from "./fighter";
import { FighterView } from "./view/fighterView";
import View from "./view/view";

const fightElement = document.getElementById("fight-wrapper");

function fight(fighters) {
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
      className: "btn btn-secondary",
      attributes: { id: `button-${fighter._id}` }
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
}

class Commands {
  static updateIndicator(fighter) {
    let comment = `Health: ${fighter.health}`;
    const label = document.getElementById(`fighter-${fighter.id}`);
    if (fighter.health <= 0) {
      comment = "Dead";
    }
    label.textContent = comment;
  }

  static newTurn(attackingCharacter, attackedCharacter) {
    let view = new View();

    attackingCharacter.attackOpponent(attackedCharacter);

    this.updateIndicator(attackedCharacter);
    if (attackedCharacter.health <= 0) {
      const message = view.createElement({
        tagName: "div",
        className: "result-message"
      });
      message.innerText = `${attackingCharacter.name} wins!`;
      fightElement.append(message);

      const firstButton = document.getElementById(
        `button-${attackingCharacter.id}`
      );
      const secondButton = document.getElementById(
        `button-${attackedCharacter.id}`
      );
      firstButton.disabled = true;
      secondButton.disabled = true;
    }
  }
}

export  {fight};
