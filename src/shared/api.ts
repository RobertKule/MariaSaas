export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: unknown
  }
}

// Helper pour créer des réponses
export const Api = {
  success: <T>(data: T): ApiResponse<T> => ({ success: true, data }),
  error: (message: string, code = 'INTERNAL_ERROR', details?: unknown): ApiResponse => ({
    success: false,
    error: { code, message, details }
  })
}
