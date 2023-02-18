import md5 from "md5";

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOMContentLoaded");
  var images = document.querySelectorAll('img[data-src]')

  images.forEach((image) => {
    let sign = md5(image.dataset.src);
    image.src = image.dataset.src;
    image.removeAttribute('data-src');

    let img = new Image();
    img.src = image.src;
    img.onload = function () {
      let percent = (img.height / img.width * 100).toFixed(5);

      var style = document.createElement('style');

      style.innerHTML = `
      .image-${sign} {
        width: 100%;
        padding-top: ${percent}%;
        height: auto;
      }
      
      @media only screen and (max-width: 1068px) {
        .image-${sign} {
          width: 100%;
          padding-top: ${percent}%;
          height: auto;
        }
      }
      
      @media only screen and (max-width: 734px) {
        .image-${sign} {
          width: 100%;
          padding-top: ${percent}%;
          height: auto;
        }
      };`;
 
      let target = document.querySelector(`#lht${sign}`);
      target.parentNode.insertBefore(style, target);
    }
  });

});