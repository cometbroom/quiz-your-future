export class CSS {
  static opacity = (el, value) => {
    el.style.opacity = `${value}`;
  };

  static #directionProps = (el, value, dir) => {
    let suffix = '';
    if (value.endsWith('%')) suffix = '%';
    if (value.endsWith('px')) suffix = 'px';
    el.style[dir] = `${parseFloat(value)}${suffix}`;
  };

  static left = (el, value) => {
    this.#directionProps(el, value, 'left');
  };
  static right = (el, value) => {
    this.#directionProps(el, value, 'right');
  };
  static top = (el, value) => {
    this.#directionProps(el, value, 'top');
  };
  static bottom = (el, value) => {
    this.#directionProps(el, value, 'bottom');
  };

  static others = (prop, el, value) => {
    if (el.style.hasOwnProperty(prop)) {
      el.style[prop] = value;
    }
  };
}
