export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      orders: {
        Row: {
          city_zone: string
          created_at: string
          customer_address: string
          customer_name: string
          customer_phone: string
          delivery_fee: number
          id: number
          items: Json
          notes: string | null
          order_id: string
          payment_method: string
          status: string
          subtotal: number
          total_amount: number
        }
        Insert: {
          city_zone?: string
          created_at?: string
          customer_address: string
          customer_name: string
          customer_phone: string
          delivery_fee?: number
          id?: number
          items?: Json
          notes?: string | null
          order_id: string
          payment_method?: string
          status?: string
          subtotal?: number
          total_amount?: number
        }
        Update: {
          city_zone?: string
          created_at?: string
          customer_address?: string
          customer_name?: string
          customer_phone?: string
          delivery_fee?: number
          id?: number
          items?: Json
          notes?: string | null
          order_id?: string
          payment_method?: string
          status?: string
          subtotal?: number
          total_amount?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
