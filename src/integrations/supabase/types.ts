export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alerts: {
        Row: {
          acknowledged: boolean
          created_at: string | null
          id: string
          machine_id: string | null
          message: string
          order_id: string | null
          type: string
        }
        Insert: {
          acknowledged?: boolean
          created_at?: string | null
          id?: string
          machine_id?: string | null
          message: string
          order_id?: string | null
          type: string
        }
        Update: {
          acknowledged?: boolean
          created_at?: string | null
          id?: string
          machine_id?: string | null
          message?: string
          order_id?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "alerts_machine_id_fkey"
            columns: ["machine_id"]
            isOneToOne: false
            referencedRelation: "machines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      machines: {
        Row: {
          created_at: string | null
          efficiency: number
          id: string
          last_maintenance: string | null
          material: string
          name: string
          next_maintenance: string | null
          nozzle_size: number
          printer_type: string
          status: string
          throughput: number
          updated_at: string | null
          uptime: number
        }
        Insert: {
          created_at?: string | null
          efficiency?: number
          id?: string
          last_maintenance?: string | null
          material?: string
          name: string
          next_maintenance?: string | null
          nozzle_size?: number
          printer_type?: string
          status: string
          throughput?: number
          updated_at?: string | null
          uptime?: number
        }
        Update: {
          created_at?: string | null
          efficiency?: number
          id?: string
          last_maintenance?: string | null
          material?: string
          name?: string
          next_maintenance?: string | null
          nozzle_size?: number
          printer_type?: string
          status?: string
          throughput?: number
          updated_at?: string | null
          uptime?: number
        }
        Relationships: []
      }
      metric_history: {
        Row: {
          id: string
          metric_id: string
          recorded_at: string | null
          value: number
        }
        Insert: {
          id?: string
          metric_id: string
          recorded_at?: string | null
          value: number
        }
        Update: {
          id?: string
          metric_id?: string
          recorded_at?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "metric_history_metric_id_fkey"
            columns: ["metric_id"]
            isOneToOne: false
            referencedRelation: "production_metrics"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer: string
          end_date: string | null
          id: string
          order_number: string
          product: string
          progress: number
          quantity: number
          start_date: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer: string
          end_date?: string | null
          id?: string
          order_number: string
          product: string
          progress?: number
          quantity?: number
          start_date?: string | null
          status: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer?: string
          end_date?: string | null
          id?: string
          order_number?: string
          product?: string
          progress?: number
          quantity?: number
          start_date?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      production_metrics: {
        Row: {
          category: string
          change: number
          created_at: string | null
          id: string
          name: string
          unit: string
          updated_at: string | null
          value: number
        }
        Insert: {
          category: string
          change?: number
          created_at?: string | null
          id?: string
          name: string
          unit: string
          updated_at?: string | null
          value: number
        }
        Update: {
          category?: string
          change?: number
          created_at?: string | null
          id?: string
          name?: string
          unit?: string
          updated_at?: string | null
          value?: number
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
