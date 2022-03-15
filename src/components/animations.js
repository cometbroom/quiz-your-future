import { gsap } from 'gsap';
import { USER_INTERFACE_ID } from '../constants';

let intervalPlaceholder;
const opacityAdder = 0.02;

//Set opacity of element to 0 and animate it to 1
export const opacityAnimation = (el) => {
  el.style.opacity = '0';

  intervalPlaceholder = setInterval(intervalMethod(el), 4);
};

const intervalMethod = (el) => {
  return () => {
    let opacity = parseFloat(el.style.opacity);

    opacity += opacityAdder;
    el.style.opacity = opacity;
    if (opacity >= 1) {
      clearInterval(intervalPlaceholder);
      return;
    }
  };
};

export const sideAnimation = (from, to, delay = 0) => {
  gsap.fromTo(
    `#${USER_INTERFACE_ID}`,
    {
      left: from,
    },
    {
      left: to,
      duration: 0.4,
      delay: delay,
    }
  );
};
