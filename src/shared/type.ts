export type Department = {
  i_id: string
  department_name: string
  department_code: string
}

export type Position = {
  i_id: string
  department_code: string
  position_name: string
  position_code: string
}

export type User = {
  user_id?: number
  i_id?: string
  approval_permisson?: string
  first_name_kanji: string
  last_name_kanji: string
  first_name_kana: string
  last_name_kana: string
  email: string
  user_name: string
  position_code: string
  department_code: string
  company_code: string
  lookup_items: {
    company_lookup: {
      company_name: string
    }
    department_lookup: {
      department_name: string
    }
    position_lookup: {
      position_name: string
    }
  }
}

export type AddUserResponse = {
  added: boolean
  exists: boolean
  user_profile: {
    confirmed: boolean
    email: string
    email_sent: boolean
    exclusive_w_id: string
    profile_pics: {
      mediaLink: string
    }[]
  }
}
