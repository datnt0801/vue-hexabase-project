import api from '@/services/api'

// interface for get item response
export interface Menu {
  name: string
  description: string
  price: number
  i_id: string
  menu_id: string
}

export interface Food {
  name: string
  description: string
  price: number
  i_id: string
  food_id: string
}

export interface MenuDetail {
  i_id: string
  menu_id: string
  food_id: string
  lookup_items: {
    food_lookup: Food
    menu_lookup: Menu
  }
}

export const foodService = {
  getMenu: async () => {
    const res = await api.post<{ items: Menu[] }>(
      `/applications/698081c54eabe6a4410ca1ae/datastores/698acc886d97790738656163/items/search`,
      {
        page: 1,
        per_page: 0,
        use_display_id: true,
      },
    )
    return res.data
  },
  getMenuDetail: async (menu_id: string) => {
    const res = await api.post<{ items: MenuDetail[] }>(
      `/applications/698081c54eabe6a4410ca1ae/datastores/698081fd6d977907383822bb/items/search`,
      {
        conditions: [{ id: 'menu_id', search_value: [menu_id] }],
        use_or_condition: false,
        page: 1,
        per_page: 0,
        use_display_id: true,
      },
    )
    return res.data
  },
}
