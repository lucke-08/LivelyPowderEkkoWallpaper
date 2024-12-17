const images = document.querySelectorAll('.image');
let circleColor = "#123123";
let circleColorOpacity = 0.5;

function loadMedia(mediaElement, mediaPath) {
  const isVideo = mediaPath.endsWith('.webm');
  const container = mediaElement.parentElement;
  const classList = [...mediaElement.classList];

  mediaElement.remove();

  let newMedia;
  if (isVideo) {
    newMedia = document.createElement('video');
    newMedia.src = `./media/${mediaPath.substring(6)}`;
    newMedia.autoplay = true;
    newMedia.loop = true;
    newMedia.muted = true;
  } else {
    newMedia = document.createElement('img');
    newMedia.src = `./media/${mediaPath.substring(6)}`;
  }

  newMedia.classList.add(...classList);
  newMedia.style.objectFit = 'cover';
  newMedia.style.width = '100%';
  newMedia.style.height = '100%';

  container.appendChild(newMedia);
}

document.addEventListener('mousemove', (event) => {
  document.documentElement.style.setProperty('--mask-position', 
    `${event.clientX - (window.innerWidth / 2)}px ${event.clientY - (window.innerHeight / 2)}px`);
});

function changeCircleColor(color) {
  document.documentElement.style.setProperty('--circle-color', hexToRgba(color, circleColorOpacity));
  circleColor = color;
}

function changeCircleColorOpacity(value) {
  document.documentElement.style.setProperty('--circle-color', hexToRgba(circleColor, value));
  circleColorOpacity = value;
}

function changeCircleRadius(radius) {
  document.documentElement.style.setProperty('--circle-size', `${radius}px`);
}

function ghostMode(bool) {
  document.documentElement.style.setProperty('--circle-ghost', bool ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 1)');
}

function hexToRgba(hex, opacity) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

document.addEventListener('click', () => {
  const images = document.querySelectorAll('.image');
  images.forEach((image) => {
    if (image.classList.contains('above')) {
      image.style.opacity = '0';
      setTimeout(() => {
        image.classList.remove('above');
        image.classList.add('below');
        image.style.opacity = '1';
      }, 500);
    } else {
      image.style.opacity = '0';
      setTimeout(() => {
        image.classList.remove('below');
        image.classList.add('above');
        image.style.opacity = '1';
      }, 500);
    }
  });
});

function livelyPropertyListener(name, value) {
  switch (name) {
    case 'imgTopSelect':
      loadMedia(document.querySelector('.image.above'), value);
      break;
    case 'imgBottomSelect':
      loadMedia(document.querySelector('.image.below'), value);
      break;
    case 'circleRadius':
      changeCircleRadius(value);
      break;
    case 'circleColor':
      changeCircleColor(value);
      break;
    case 'circleColorOpacity':
      changeCircleColorOpacity(value/100);
      break;
    case 'ghostMode':
      ghostMode(value);
      break;
    default:
      console.log(`Proprietà non gestita: ${name}`);
  }
}