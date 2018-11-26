export default function selectMany(array, fn) {
  function loop(result, index) {
    if (index >= array.length) {
      return result
    } else {
      return loop([...result, ...fn(array[index])], index + 1)
    }
  }
  return loop([], 0)
}
