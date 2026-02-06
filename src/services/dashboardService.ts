import api from '@/services/api'

export const dashboardService = {
  getFiles: async (applicationId: string, datastoreId: string) => {
    const res = await api.post<{ data: object }>(
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
}
