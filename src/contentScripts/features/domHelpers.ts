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
    startingNode
      .querySelectorAll(`.${HIDING_CLASS_NAME}.${selector}`)
      .forEach((element) =>
        (element as HTMLElement).classList.remove(HIDING_CLASS_NAME)
      )
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

  node.childNodes.forEach(recursion)

  return children

  function recursion(child: Node) {
    if (child.childNodes.length === 0) {
      children.push(child)
      return
    }

    child.childNodes.forEach(recursion)
  }
}

export function getVisiblePosts(
  startingNode: HTMLElement | Document = document
) {
  return (
    [
      ...startingNode.querySelectorAll(`article:not(.${HIDING_CLASS_NAME})`),
    ] as unknown as readonly HTMLElement[]
  ).filter(isPost)
}

export function isHTMLElement(node: unknown): node is HTMLElement {
  return node instanceof HTMLElement
}

export function isVisible(element: HTMLElement) {
  return !element.classList.contains(HIDING_CLASS_NAME)
}
