import View from "./view";

class FighterView extends View {
  constructor(fighter, handleClick) {
    super();

    this.createFighter(fighter, handleClick);
  }

  createFighter(fighter, handleClick) {
    const { name, source } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);
    const divElement = this.createElement({ tagName: "div", className: "card-body" });
    divElement.append(nameElement);

    this.element = this.createElement({ tagName: "div", className: "fighter card text-center" });
    this.element.append(imageElement, divElement);
    this.element.addEventListener(
      "click",
      event => handleClick(event, fighter),
      false
    );
  }

  createName(name) {
    const nameElement = this.createElement({
      tagName: "h5",
      className: "card-title name"
    });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source) {
    const attributes = { src: source };
    const imgElement = this.createElement({
      tagName: "img",
      className: "fighter-image card-img-top",
      attributes
    });

    return imgElement;
  }
}

export default FighterView;
