import type { Fetch, StringWithSuggestions } from "./types"
import type { CSSProperties } from "./types/css"
import type { ContentType } from "./types/fetch"

class DOMCollection extends Array<HTMLElement> {
  ready(cb: () => void) {
    const isReady = this.some(el => "readyState" in el && el.readyState !== "loading")
    if (isReady) {
      cb()
    } else {
      this.on("DOMContentLoaded", cb)
    }
    return this
  }

  on(event: StringWithSuggestions<keyof ElementEventMap>, cb: (this: Element, ev: Event) => void): void
  on(event: StringWithSuggestions<keyof ElementEventMap>, selector: StringWithSuggestions<keyof HTMLElementTagNameMap>, cb: (this: Element, ev: Event) => void): void
  on(
    event: StringWithSuggestions<keyof ElementEventMap>,
    cbOrSelector: StringWithSuggestions<keyof HTMLElementTagNameMap> | ((this: Element, ev: Event) => void),
    cb?: (this: Element, ev: Event) => void
  ) {
    if (typeof cbOrSelector === "function") {
      this.forEach(el => el.addEventListener(event, cbOrSelector))
    } else {
      this.forEach(el =>
        el.addEventListener(event, e => {
          if ((e.target as any).matches(cbOrSelector)) (cb as any)(e)
        })
      )
    }
    return this
  }

  next() {
    return new DOMCollection(...this.map(el => el.nextElementSibling as HTMLElement).filter(el => el !== null))
  }

  prev() {
    return new DOMCollection(...this.map(el => el.previousElementSibling as HTMLElement).filter(el => el !== null))
  }

  removeClass(className: string) {
    this.forEach(el => el.classList.remove(className))
    return this
  }

  addClass(className: string) {
    this.forEach(el => el.classList.add(className))
    return this
  }

  css<Property extends keyof CSSProperties>(property: StringWithSuggestions<Property>, value: CSSProperties[Property]) {
    const camelProp = property.replace(/(-[a-z])/, g => g.replace("-", "").toUpperCase())
    this.forEach(el => (el.style[camelProp as any] = value))
    return this
  }
}

export default function $(selector: StringWithSuggestions<keyof HTMLElementTagNameMap> | Document | HTMLElement) {
  if (typeof selector === "string" || selector instanceof String) {
    return new DOMCollection(...(Array.from(document.querySelectorAll(selector as string)) as HTMLElement[]))
  } else if (selector instanceof Document || selector instanceof HTMLElement) {
    return new DOMCollection(selector as HTMLElement)
  }

  throw new Error("Invalid selector")
}

class AjaxPromise<Response> {
  promise: Promise<any>

  constructor(promise: Promise<any>) {
    this.promise = promise
  }

  done(callback: (response: Response) => void) {
    this.promise = this.promise.then(data => {
      callback(data)
      return data
    })
    return this
  }

  fail(callback: (error: Error) => void) {
    this.promise = this.promise.catch(callback)
    return this
  }

  always(callback: () => void) {
    this.promise = this.promise.finally(callback)
    return this
  }
}

$.get = function <Response = any>(props: Fetch | string) {
  if (typeof props === "string") {
    return new AjaxPromise<Response>(
      fetch(props, {
        method: "GET"
      }).then(res => {
        if (res.ok) return res.json()
        throw new Error(res.status.toString())
      })
    )
  }

  const queryString = Object.entries(props.data ?? {})
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&")

  return new AjaxPromise<Response>(
    fetch(`${props.url}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": props.dataType ?? "application/json"
      }
    })
      .then(res => {
        if (res.ok) return res.json()
        else throw new Error(res.status.toString())
      })
      .then(data => {
        props.success?.(data)
        return data
      })
  )
}
