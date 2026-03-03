import api from '@/services/api'
import type { Department, Position, User } from '@/shared/type'

export const userService = {
  getUsers: async () => {
    const res = await api.post<{ items: User[] }>(
      `/applications/698081c54eabe6a4410ca1ae/datastores/698081fd6d977907383822bb/items/search`,
      {
        page: 1,
        per_page: 0,
        use_display_id: true,
        include_lookups: true,
      },
    )
    console.log('get user data from service:', res.data)
    console.log('type of res.data.items', typeof res.data.items)
    return res.data
  },
  getDepartments: async () => {
    const res = await api.post<{ items: Department[] }>(
      `/applications/698081c54eabe6a4410ca1ae/datastores/69a500323ad73cf404d367e2/items/search`,
      {
        page: 1,
        per_page: 0,
        use_display_id: true,
      },
    )
    return res.data
  },
  getPosition: async () => {
    const res = await api.post<{ items: Position[] }>(
      `/applications/698081c54eabe6a4410ca1ae/datastores/69a500763ad73cf404d36808/items/search`,
      {
        page: 1,
        per_page: 0,
        use_display_id: true,
      },
    )
    return res.data
  },
  createUser: async (
    user: User,
    departmentId: string,
    positionId: string,
    companyId: string,
  ) => {
    const { lookup_items, ...userWithoutLookup } = user

    const res = await api.post<{
      item: {
        i_id: string
      }
    }>(
      `/applications/698081c54eabe6a4410ca1ae/datastores/698081fd6d977907383822bb/items/new`,
      {
        item: {
          ...userWithoutLookup,
          department_lookup: departmentId,
          position_lookup: positionId,
          company_lookup: companyId,
        },
        return_item_result: true,
        return_display_id: true,
      },
    )
    return res.data
  },
}
