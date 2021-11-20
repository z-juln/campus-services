export const isDev = ['dev', 'mock'].includes(process.env.NODE_ENV)
export const isMock = process.env.NODE_ENV === 'mock'
