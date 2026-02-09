export const formatFileSize = (bytes: number | undefined): string => {
  if (bytes === 0 || bytes === undefined) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const getFileIconColor = (type: string): string => {
  switch (type) {
    case 'pdf':
      return 'text-red-500 bg-red-50 border-red-200'
    case 'excel':
      return 'text-green-600 bg-green-50 border-green-200'
    case 'text':
      return 'text-blue-500 bg-blue-50 border-blue-200'
    case 'image':
      return 'text-purple-500 bg-purple-50 border-purple-200'
    default:
      return 'text-gray-500 bg-gray-50 border-gray-200'
  }
}
