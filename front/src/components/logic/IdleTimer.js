import { throttleFn} from '@/utils/jsutils';
import {DEFAULT_EVENTS} from '@/constants/data'
class IdleTimer {
  constructor({ timeout, onTimeout }) {
    this.timeout = timeout;
    this.onTimeout = onTimeout;

    const expiredTime = parseInt(localStorage.getItem("_expiredTime") || 0, 10);
    if (expiredTime > 0 && expiredTime < Date.now()) {
      // What if the users close the window and then they open the app again
      // and time is expired, we need to immediately trigger the onTimeout instead
      // onExpired();
      onTimeout();
      return;
    }

    this.eventHandler = throttleFn(this.updateExpiredTime.bind(this), 500);
    this.registerEvent();
    this.startInterval();
  }

  startInterval() {
    this.updateExpiredTime();

    // check timeout every 1 second
    this.interval = setInterval(() => {
      const expiredTime = parseInt(
        localStorage.getItem("_expiredTime") || 0,
        10
      );
      if (expiredTime < Date.now()) {
        if (this.onTimeout) {
          this.onTimeout();
          this.cleanUp();
        }
      }
    }, 1000);
  }

  updateExpiredTime(delay=300) {
    if (this.timeoutTracker) {
      clearTimeout(this.timeoutTracker);
    }
    this.timeoutTracker = setTimeout(() => {
      localStorage.setItem("_expiredTime", Date.now() + this.timeout * 1000);
    }, delay);
  }

  registerEvent() {
    window.addEventListener("mousemove", this.eventHandler);
    window.addEventListener("scroll", this.eventHandler);
    window.addEventListener("keydown", this.eventHandler);
  }

  // const eventsRef = useRef(DEFAULT_EVENTS)
  // const bindEvent = () => {
  //   eventsRef.current.forEach(e => {
  //     document.addEventListener(e, handleEvent.current, {
  //       capture: true,
  //       passive: true
  //     })
  //   })
  // }

  cleanUp() {
    console.log('cleanup');
    localStorage.removeItem("_expiredTime");
    clearInterval(this.interval);
    window.removeEventListener("mousemove", this.eventHandler);
    window.removeEventListener("scroll", this.eventHandler);
    window.removeEventListener("keydown", this.eventHandler);
  }
}
export default IdleTimer;
