import selectMany from './selectMany'

const many = fn => elems => selectMany(elems, fn)

const atIndex = index => elem => {
  const child = elem && elem.elements ? elem.elements[index] : null
  return child ? [child] : []
}

const getAttribute = name => elem => {
  const child = elem && elem.attributes ? elem.attributes[name] : null
  return child ? [child] : []
}

const getText = elem =>
  elem && elem.elements
    ? elem.elements.filter(e => e.type === 'text').map(e => e.text)
    : []

const getName = elem => (elem && elem.name ? [elem.name] : [])

const getType = elem => (elem && elem.type ? [elem.type] : [])

const getElement = name => elem =>
  elem && elem.elements
    ? elem.elements.filter(e => e.type === 'element' && e.name === name)
    : []

const getAnyElement = elem =>
  elem && elem.elements ? elem.elements.filter(e => e.type === 'element') : []

export default function xpath(root, ...path) {
  function loop(elems, index) {
    // console.log('loop', index, path[index], elems)
    if (!elems.length || index >= path.length) return elems
    const step = path[index]

    if (typeof step === 'number') {
      return loop(many(atIndex(step))(elems), index + 1)
    }
    if (typeof step === 'function') {
      return loop(many(step)(elems), index + 1)
    }
    if (typeof step === 'string') {
      if (step.startsWith('@')) {
        return loop(many(getAttribute(step.substring(1)))(elems), index + 1)
      }
      if (step === 'text()') {
        return loop(many(getText)(elems), index + 1)
      }
      if (step === 'name()') {
        return loop(many(getName)(elems), index + 1)
      }
      if (step === 'type()') {
        return loop(many(getType)(elems), index + 1)
      }
      if (step === '*') {
        return loop(many(getAnyElement)(elems), index + 1)
      }
      return loop(many(getElement(step))(elems), index + 1)
    }
    return []
  }
  return loop([root], 0)
}
