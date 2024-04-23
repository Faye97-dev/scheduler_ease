import { BASE_URL } from "@/config"

export interface IClientApiParams<T> {
  endpoint: string
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE"
  isExternalApi?: boolean
  token?: string
  body?: T
  customConfig?: RequestInit
}

export default function client<PayloadType, ResponseType>({
  endpoint,
  method,
  body,
  token = "",
  customConfig = {},
  isExternalApi = false,
}: IClientApiParams<PayloadType>) {
  const controller = new AbortController()
  const baseUrl = BASE_URL

  const headers: RequestInit["headers"] = { "content-type": "application/json" }
  if (token) headers.authorization = `Bearer ${token}`

  const config = {
    method,
    signal: controller.signal,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body && config.method !== "GET") config.body = JSON.stringify(body)

  // console.log(`${baseUrl}${endpoint}`, headers.authorization, { token })

  const promise: Promise<ResponseType> = window.fetch(`${baseUrl}${endpoint}`, config).then(async (response) => {
    // if (response.status === 401) return Promise.reject() 
    if (response.status === 202) return Promise.resolve()

    const data = await response.json()
    if (response.ok) return data
    else return Promise.reject(data)
  })
  // todo fixme
  // promise.cancel = () => controller.abort() 
  return promise
}
