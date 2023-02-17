import { debounce } from "../utils";

var lazyImages = [];
var imageIndex = 0;


// check if the element is in the viewport
function isElementInView(element) {
  const rect = element.getBoundingClientRect();
  const elementTop = rect.top;
  const elementBottom = rect.bottom;
  return (elementTop >= 0 && elementBottom - 300 <= window.innerHeight);
}


function loadImage(item) {
  item.src = item.dataset.src;
  item.removeAttribute('data-src');

  let grandParent = item.parentNode.parentNode;
  grandParent.classList.remove("small-load", "medium-load", "large-load");
  grandParent.classList.add("small-loaded", "medium-loaded", "large-loaded")
  imageIndex++;
}

// load the image which is in the viewport
function viewPortLoad() {
  if(imageIndex >= lazyImages.length) return;
  let item = lazyImages[imageIndex];

  if(!isElementInView(item)) {
    imageIndex++;
    viewPortLoad()
    return;
  };

  loadImage(item);
  viewPortLoad();
}

// load the image when the user scrolls
function lazyLoad() {
  lazyImages = document.querySelectorAll('img[data-src]');
  imageIndex = 0;
  viewPortLoad();
}


// when the page is loaded,  load the images
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOMContentLoaded");
  // get all the images with data-src attribute
  lazyImages = document.querySelectorAll('img[data-src]')

  // load the images which are in the viewport
  viewPortLoad();

  const debouncedHandleScroll = debounce(lazyLoad, 200);
  // add the event listener
  window.addEventListener('scroll', debouncedHandleScroll);
});