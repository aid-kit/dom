import type { ContentType } from "./fetch"

export type StringWithSuggestions<S extends string> = S | (string & {})

export interface Fetch {
  url: string
  data?: Record<string, string>
  success?: (response: any) => void
  dataType?: StringWithSuggestions<ContentType>
}
