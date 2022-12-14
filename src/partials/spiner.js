import { Spinner } from 'spin.js';
import { refs } from './refs';
const opts = {
  lines: 18, // The number of lines to draw
  length: 22, // The length of each line
  width: 11, // The line thickness
  radius: 27, // The radius of the inner circle
  scale: 2, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 0.8, // Rounds per second
  rotate: 17, // The rotation offset
  animation: 'spinner-line-fade-default', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#7c68b6', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

const spinner = new Spinner(opts).spin(refs.spiner);
export function spinerPlay() {
  spinner.spin(refs.spiner);

  refs.loadspiner.classList.remove('is-hidden');
}

export function spinerStop() {
  refs.loadspiner.classList.add('is-hidden');

  spinner.stop();
}
