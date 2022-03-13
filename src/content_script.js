const fpEndpoint = 'https://fornpunkt.se/raa/lamning/';
const commonsUploadEndpoint = 'https://commons.wikimedia.org/w/index.php?title=Special:UploadWizard&campaign=Kulturl%C3%A4mningar&id=';

function waitForElm(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
            resolve(document.querySelector(selector));
            observer.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
  });
}

function fpBtn(link, text) {
  const aElm = document.createElement('a');
  const aText = document.createTextNode(text);
  aElm.appendChild(aText);
  aElm.href = link;

  aElm.style.color = '#FFF';
  aElm.style.background = '#30734c';
  aElm.style.padding = '.25rem .5rem';
  aElm.style.fontSize = '.875rem';
  aElm.style.borderRadius = '.2rem';
  aElm.style.display = 'inline-block';
  aElm.style.fontWeight = '400';
  aElm.style.lineHeight = '1.5';
  aElm.style.textAlign = 'center';
  aElm.style.textDecoration = 'none';
  aElm.style.marginRight = '.2rem';

  return aElm;
}

function doStuff() {
  if (document.location.pathname.startsWith('/open/fornsok/lamning/')) {
    waitForElm('.tw-mb-4.ng-star-inserted').then(target => {
      const uuid = document.location.pathname.replace('/open/fornsok/lamning/', '');

      const fpContainer = document.createElement('div');

      const header = document.createElement('h3');
      header.innerText = 'FornPunkt';
      header.style.marginTop = '1rem';
      header.style.marginBottom = '.5rem';
      header.classList.add('tw-heading-md');
      fpContainer.appendChild(header);

      const lamningUrl = fpEndpoint + uuid;
      const commonsUrl = commonsUploadEndpoint + uuid;
      fpContainer.appendChild(fpBtn(lamningUrl, 'Öppna i FornPunkt'));
      fpContainer.appendChild(fpBtn(lamningUrl + '#kommentarer', 'Kommentera'));
      fpContainer.appendChild(fpBtn(commonsUrl, 'Ladda upp en bild'));

      target.appendChild(fpContainer);
    });
  }
}

let oldHref = document.location.pathname;

window.onload = function () {
  doStuff();
  let bodyList = document.querySelector('body');

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (oldHref != document.location.pathname) {
        oldHref = document.location.pathname;
        doStuff();
      }
    });
  });

  const config = {
    childList: true,
    subtree: true
  };

  observer.observe(bodyList, config);
};
