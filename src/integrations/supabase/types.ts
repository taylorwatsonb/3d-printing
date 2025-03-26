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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
