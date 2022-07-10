export default function useThrottle(fn: Function, delay: number) {
  let preTime = 0
  return function (...args: any[]) {
    const now = Date.now()
    if (now - preTime > delay) {
      fn(...args)
      preTime = now
    }
  }
}
