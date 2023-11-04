import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const localKey = 'videoplayer-current-time';
const stopTime = localStorage.getItem(localKey);

player.on('timeupdate', throttle(currentTime, 1000));
function currentTime(data) {
  const playingTime = data.seconds;
  localStorage.setItem(localKey, playingTime);
}

player
  .setCurrentTime(stopTime)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
