import api from '@/services/api'
import type { AddUserResponse, Department, Position, User } from '@/shared/type'

export const userService = {
  getUser: async (user_id: string) => {
    const res = await api.post<{ items: User[] }>(
      `/applications/698081c54eabe6a4410ca1ae/datastores/698081fd6d977907383822bb/items/search`,
      {
        conditions: [
          {
            id: 'user_id',
            search_value: [user_id],
            exact_match: true,
          },
        ],
        use_or_condition: false,
        page: 1,
        per_page: 1,
        use_display_id: true,
        return_number_value: true,
        include_lookups: true,
      },
    )

    return res.data
  },
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
          user_name: user.email.split('@')[0],
          department_lookup: departmentId,
          position_lookup: positionId,
          company_lookup: companyId,
        },
        return_item_result: true,
        return_display_id: true,
      },
    )
    return res
  },
  updateUser: async (
    user: User,
    departmentId: string,
    departmentCode: string,
    positionId: string,
    positionCode: string,
    companyId: string,
  ) => {
    const { user_id, i_id, lookup_items, ...userWithoutLookup } = user

    const res = await api.post<{
      itemHistory: {
        IsChanged: boolean
      }
    }>(
      `/applications/698081c54eabe6a4410ca1ae/datastores/698081fd6d977907383822bb/items/edit/${user.i_id}`,
      {
        item: {
          approval_permisson: user.approval_permisson?.toString(),
          first_name_kanji: user.first_name_kanji,
          last_name_kanji: user.last_name_kanji,
          first_name_kana: user.first_name_kana,
          last_name_kana: user.last_name_kana,
          email: user.email,
          user_name: user.email.split('@')[0],
          position_code: positionCode,
          department_code: departmentCode,
          company_code: user.company_code,

          department_lookup: departmentId,
          position_lookup: positionId,
          company_lookup: companyId,
        },
        is_force_update: true,
        use_display_id: true,
      },
    )
    return res.data
  },
  deleteUser: async (user_i_id: string) => {
    const res = await api.delete(
      `/applications/698081c54eabe6a4410ca1ae/datastores/698081fd6d977907383822bb/items/delete/${user_i_id}`,
      { data: {} },
    )
    return res.data
  },
  addUser: async (user: User) => {
    const res = await api.post<AddUserResponse>(`/users`, {
      email: user.email,
      g_id: 'Grp-XTzrUOg3',
      username: user.email.split('@')[0],
      send_password_to_email: true,
      sender_address: 'noreply@hexabase.com',
      no_confirm_email: true,
      tmp_password: '123456',
      invitor_id: '698080f9a0ea6a03fd2679b0',
      conf_email_template_id: 'string',
      confirm_email_ack: true,
      exclusive_w_id: '6980819286bbce7dbccd7efb',
      user_code: user.email.split('@')[0],
    })
    return res.data
  },
}
