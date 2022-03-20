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

export const fromTo = (target, fromValues, toValues) => {
  const targetElement = document.querySelector(target);

  const processAnimation = () => {
    Object.keys(fromValues).forEach((property) => {
      if (property in targetElement.style) {
        const SUFFIX = getSuffix(fromValues[property]);
        animate(
          targetElement,
          property,
          parseFloat(fromValues[property]),
          parseFloat(toValues[property]) - parseFloat(fromValues[property]),
          toValues.duration,
          SUFFIX
        );
      }
    });
  };

  if (toValues.delay) {
    setTimeout(processAnimation, toValues.delay * 1000);
  } else {
    processAnimation();
  }
};

const getSuffix = (value) => {
  if (value.endsWith('%')) return '%';
  if (value.endsWith('px')) return 'px';
  return '';
};

const animate = (
  targetElement,
  property,
  startValue,
  range,
  duration,
  SUFFIX
) => {
  let start;
  let advance = true;

  const COEFFICIENT = getCoefficient(range, duration);
  let animationHolder = (timestamp) => {
    if (start === undefined) start = timestamp;
    const elapsed = timestamp - start;
    const STEP_SIZE = getStepSize(COEFFICIENT, elapsed);
    if (elapsed >= duration * 1000) advance = false;
    targetElement.style[property] = `${startValue + STEP_SIZE}${SUFFIX}`;
    advance && window.requestAnimationFrame(animationHolder);
  };
  setTimeout(() => {
    window.cancelAnimationFrame(animationHolder);
  }, 100);
  window.requestAnimationFrame(animationHolder);
};

const getCoefficient = (range, duration) => {
  return range / (duration * 1000);
};

const getStepSize = (COEFFICIENT, elapsed) => {
  return COEFFICIENT * elapsed;
};
