const images = document.querySelectorAll('.image');

// Funzione per caricare le immagini dai file JSON
function loadImage(imageElement, imagePath) {
  imageElement.src = `./photos/${imagePath.substring(7)}`;
}

// Gestire il movimento del cerchio
document.addEventListener('mousemove', (event) => {
  const maskPosition = `${event.clientX-(window.innerWidth/2)}px ${event.clientY-(window.innerHeight/2)}px`;
  images.forEach((image) => {
    image.style.maskPosition = maskPosition;
    image.style.webkitMaskPosition = maskPosition;
  });
});

// Cambiare il colore del cerchio
function changeCircleColor(color) {
  document.documentElement.style.setProperty('--circle-color', color);
}

// Cambiare il raggio del cerchio
function changeCircleRadius(radius) {
  document.documentElement.style.setProperty('--circle-size', `${radius}px`);
}

// Funzione per scambiare le immagini al click
document.addEventListener('click', () => {
  images.forEach((image) => {
    if (image.classList.contains('above')) {
      image.style.opacity = '0'; // Effetto sfumatura
      setTimeout(() => {
        image.classList.remove('above');
        image.classList.add('below');
        image.style.opacity = '1'; // Ripristina opacità
      }, 500);
    } else {
      image.style.opacity = '0'; // Effetto sfumatura
      setTimeout(() => {
        image.classList.remove('below');
        image.classList.add('above');
        image.style.opacity = '1'; // Ripristina opacità
      }, 500);
    }
  });
});

// Lively Property Listener per leggere le impostazioni
function livelyPropertyListener(name, value) {
  switch (name) {
    case 'imgTopSelect':
      console.log("topImgChange",value," ",value.substring(7))
      loadImage(document.querySelector('.image.above'), value); // Cambia immagine sopra
      break;
    case 'imgBottomSelect':
      console.log("bottomImgChange",value," ",value.substring(7))
      loadImage(document.querySelector('.image.below'), value); // Cambia immagine sotto
      break;
    case 'circleInerColor':
      changeCircleColor(value); // Cambia colore del cerchio
      break;
    case 'circleRadius':
      changeCircleRadius(value); // Cambia raggio del cerchio
      break;
    default:
      console.log(`Proprietà non gestita: ${name}`);
  }
}
