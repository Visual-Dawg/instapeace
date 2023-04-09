import { language } from "../Lang"
import { HIDING_CLASS_NAME } from "../constants"

export function hideAndMark(mark: string): (node: HTMLElement) => HTMLElement {
  return (node) => {
    node.classList.add(HIDING_CLASS_NAME)
    node.classList.add(mark)

    return node
  }
}

export function unhideElements(
  selector: string
): (startingNode?: HTMLElement | Document) => void {
  return (startingNode = document) => {
    const elementsToUnhide = startingNode.querySelectorAll(
      `.${HIDING_CLASS_NAME}.${selector}`
    )

    for (const element of elementsToUnhide) {
      ;(element as HTMLElement).classList.remove(HIDING_CLASS_NAME)
    }
  }
}

export function isPost(node: Node): node is HTMLElement {
  if (node.nodeName !== "ARTICLE") return false

  const element = node as HTMLElement

  // Has profile picture
  if (
    !element.querySelector(`header img[alt*='${language.profilePictureAlt}']`)
  )
    return false

  if (!element.querySelector(`video, img`)) return false

  return true
}

export function getBottomChildren(node: Node) {
  const children: Node[] = []

  // eslint-disable-next-line unicorn/no-array-for-each
  node.childNodes.forEach(recursion)

  return children

  function recursion(node_: Node) {
    if (node_.childNodes.length === 0) {
      children.push(node_)
      return
    }

    // eslint-disable-next-line unicorn/no-array-for-each
    node_.childNodes.forEach(recursion)
  }
}

export function getVisibleArticles(
  startingNode: HTMLElement | Document = document
) {
  return [
    ...startingNode.querySelectorAll(`article:not(.${HIDING_CLASS_NAME})`),
  ] as unknown as readonly HTMLElement[]
}

export function isHTMLElement(node: unknown): node is HTMLElement {
  return node instanceof HTMLElement
}
