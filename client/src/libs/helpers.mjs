
// create a function that can be used to wait
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// cache loaded modules
const loadedModules = {};

const getComponentPath = (componentName, isView = false) => {
  return `/src/${isView ? 'views' : 'components'}/${componentName}.vue`;
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const isComponentLoaded = (component) => {
  return loadedModules[component] !== undefined;
};

const getFile = async (url, isHead) => {
  if (isComponentLoaded(url)) {
    return loadedModules[url];
  }

  const options = {};
  if (isHead)
    options.method = 'HEAD';
  const res = await fetch(url, options);
  if ( !res.ok )
    throw Object.assign(new Error(`${res.statusText} ${url}`), { res });

  if (!isHead)
    loadedModules[url] = true;
  return {
    getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
  }
};

function getStringWidth(string) {
  const element = document.createElement('canvas');
  const context = element.getContext('2d');
  context.font = window.getComputedStyle(document.body).font;
  return context.measureText(string).width;
}

export {
  sleep,
  getStringWidth,
  getFile,
  getComponentPath,
  isComponentLoaded,
  scrollToTop,
};
