import api from '@/services/api'
import type { FileMetadata } from '@/views/DashboardView.vue'

// interface for get item response
interface FileItem {
  Status: string
  created_at: string
  created_by: string
  d_id: string
  file: string
  file_id: string
  file_size: number
  file_name: string
  i_id: string
  p_id: string
  rev_no: number
  status_id: string
  title: string
  unread: number
  updated_at: string
  updated_by: string
}

export const dashboardService = {
  getItems: async (applicationId: string, datastoreId: string) => {
    const res = await api.post<{ items: FileItem[] }>(
      `/applications/${applicationId}/datastores/${datastoreId}/items/search`,
      {
        page: 1,
        per_page: 0,
        use_display_id: true,
        return_number_value: true,
      },
    )
    return res.data
  },

  getFile: async (file_id: string) => {
    const res = await api.get(`/files/${file_id}`, {
      responseType: 'arraybuffer',
    })

    return res.data as ArrayBuffer
  },

  uploadItem: async (item: FileMetadata) => {
    const res = await api.post(
      `/applications/${import.meta.env.VITE_HEXABASE_APPLICATION_ID}/datastores/${import.meta.env.VITE_HEXABASE_DATASTORE_ID}/items/new`,
      {
        item: {
          file_name: item.name,
          file_type: item.type,
          file_size: item.size,
          file_last_modified: item.lastModified,
        },
      },
    )
    return res.data
  },

  uploadFile: async (file: File) => {
    const formData = new FormData()
    formData.append('filename', file.name)
    formData.append('file', file)
    const res = await api.post(`/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  },
  updateItem: async (item_id: string, file_id: string) => {
    const res = await api.post(
      `/applications/${import.meta.env.VITE_HEXABASE_APPLICATION_ID}/datastores/${import.meta.env.VITE_HEXABASE_DATASTORE_ID}/items/edit/${item_id}`,
      {
        comment: 'test-comment',
        item: {
          file: [file_id],
          file_id: file_id,
        },
        is_force_update: true,
        use_display_id: true,
      },
    )
    return res.data
  },
  deleteItemAndFile: async (item_id: string, file_id: string) => {
    const res = await api.delete(
      `/applications/${import.meta.env.VITE_HEXABASE_APPLICATION_ID}/datastores/${import.meta.env.VITE_HEXABASE_DATASTORE_ID}/items/delete/${item_id}`,
      { data: {} },
    )
    console.log(
      `/applications/${import.meta.env.VITE_HEXABASE_APPLICATION_ID}/datastores/${import.meta.env.VITE_HEXABASE_DATASTORE_ID}/items/delete/${item_id}`,
    )
    const res2 = await api.delete(`/files/${file_id}`)
    return { itemData: res.status, fileData: res2.status }
  },
}
