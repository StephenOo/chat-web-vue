/// <reference types="vite/client" />

// 环境变量...
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_PORT: number
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_STREAM_CHAT_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
