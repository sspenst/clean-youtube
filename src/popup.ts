import './popup.css';

const options: Record<string, boolean> = {
  homeCheckbox: true,
  shortsCheckbox: false,
  subscriptionsCheckbox: true,
  commentsCheckbox: true,
  relatedCheckbox: true,
  newsCheckbox: false,
};

document.addEventListener("DOMContentLoaded", () => {
  // const cleanButton = document.getElementById("cleanButton");

  // cleanButton.addEventListener("click", () => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     chrome.tabs.sendMessage(tabs[0].id, { action: "clean" });
  //   });
  // });

  const optionElements: Record<string, HTMLInputElement> = {};

  for (const key in options) {
    const element = document.getElementById(key);

    if (!element) {
      continue;
    }

    optionElements[key] = element as HTMLInputElement;
    optionElements[key].addEventListener('change', () => {
      chrome.storage.local.set({ [key]: optionElements[key].checked });
    });
  }

  chrome.storage.local.get(Object.keys(options), (data) => {
    for (const key in options) {
      if (!optionElements[key]) {
        continue;
      }

      optionElements[key].checked = data[key] !== undefined ? data[key] : options[key];
    }
  });
});