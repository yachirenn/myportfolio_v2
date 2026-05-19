export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  timeStamp?: string
}

export function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
    timeStamp: new Date().toISOString(),
  }
}

export function createErrorResponse(error: string, message?: string): ApiResponse<null> {
  return {
    success: false,
    error,
    message,
    timeStamp: new Date().toISOString(),
  }
}