'use strict';

const STEP_INTERVAL_MS = 50;
const STEP_SIZE_PX = 10;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    let loction = startPos;
    let walkToCenter=setInterval(()=>{
      img.style.left=`${loction}px`;
      loction += STEP_SIZE_PX;

      if (loction >= stopPos){
        clearInterval(walkToCenter)
        resolve();
      }
    
    },STEP_INTERVAL_MS)
  });
}

function dance(img) {
  return new Promise((resolve) => {
    let prvImgSrc=img.src;
    img.src=DANCING_CAT_URL;
    
    setTimeout(()=>{
      img.src=prvImgSrc;
      resolve();
    },DANCE_TIME_MS );
  });
}

async function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  while(true){
      
try {
  await walk(img,startPos,centerPos);
  await dance(img);
  await walk(img,centerPos,stopPos);
} catch (error) {
  
  console.log(error)
}
  }

}

window.addEventListener('load', catWalk);