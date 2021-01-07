export function nationSort(value1: string, value2: string) {
  if (value1 === 'None' && value2 !== 'None') {
    return -1
  } else if (value1 !== 'None' && value2 === 'None') {
    return 1
  } else if (value1 === 'None' && value2 === 'None') {
    return 0
  } else if (typeof value1 === 'string' && typeof value2 === 'string') {
    return value1.localeCompare(value2)
  } else {
    return (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0
  }
}
