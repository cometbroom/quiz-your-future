export const createButton = (cssClasses = [], content = 'button', id = '') => {
  const btn = document.createElement('button');

  for (let i = 0; i < cssClasses.length; ++i) {
    btn.classList.add(cssClasses[i]);
  }
  btn.textContent = content;
  btn.id = id;
  return btn;
};
