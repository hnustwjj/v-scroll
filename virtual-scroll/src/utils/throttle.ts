export default function useThrottle(fn: Function) {
  const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame
  let preTime = 0
  const fps = 30
  const interval = 1000 / fps
  return function (...args: any[]) {
    requestAnimationFrame(() => {
      const now = Date.now()
      if (now - preTime > interval) {
        fn(...args)
        preTime = now
      }
    })
  }
}
