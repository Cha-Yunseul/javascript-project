const AnalogClock = ($container) => {
  // do something!

  $container.innerHTML =
    '<div class="hand hour"></div><div class="hand minute"></div><div class="hand second"></div><div class="time time1">|</div><div class="time time2">|</div><div class="time time3">|</div><div class="time time4">|</div><div class="time time5">|</div><div class="time time6">|</div>\n<div class="time time7">|</div>\n<div class="time time8">|</div>\n<div class="time time9">|</div>\n<div class="time time10">|</div>\n<div class="time time11">|</div>\n<div class="time time12">|</div>';
  const childNodes = $container.children;
  const hoursHand = childNodes[0];
  const minutesHand = childNodes[1];
  const secondsHand = childNodes[2];

  const setRotation = (element, rotationRatio) => {
    element.style.setProperty('--deg', rotationRatio * 360);
  };

  function Clock() {
    const date = new Date();
    const seconds = date.getSeconds() / 60;
    const minutes = (seconds + date.getMinutes()) / 60;
    const hrs = (minutes + date.getHours()) / 12;

    setRotation(secondsHand, seconds);
    setRotation(minutesHand, minutes);
    setRotation(hoursHand, hrs);
  }

  setInterval(Clock, 1000);
};

export default AnalogClock;
