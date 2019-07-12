interface IView {
  tagName: string;
  className?: string;
  attributes?: { [index: string]: string };
}

class View {
  public createElement({ tagName, className = "", attributes = {} }: IView) {
    const element = document.createElement(tagName);
    if (className) {
      className.split(" ").map(item => element.classList.add(item));
    }
    Object.keys(attributes).forEach(key =>
      element.setAttribute(key, attributes[key])
    );

    return element;
  }
}

export default View;
