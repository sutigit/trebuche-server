export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      bots: {
        Row: {
          archived: boolean
          color: string
          created_at: string
          description: string
          id: string
          name: string
          prompt: string
          updated_at: string
        }
        Insert: {
          archived?: boolean
          color: string
          created_at?: string
          description: string
          id?: string
          name: string
          prompt: string
          updated_at?: string
        }
        Update: {
          archived?: boolean
          color?: string
          created_at?: string
          description?: string
          id?: string
          name?: string
          prompt?: string
          updated_at?: string
        }
        Relationships: []
      }
      "bots.default": {
        Row: {
          bot_id: string
          id: number
        }
        Insert: {
          bot_id: string
          id?: number
        }
        Update: {
          bot_id?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "bots.default_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
        ]
      }
      "bots.private": {
        Row: {
          bot_id: string
          id: number
          user_id: string
        }
        Insert: {
          bot_id: string
          id?: number
          user_id: string
        }
        Update: {
          bot_id?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bots.private_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          author_id: string
          created_at: string
          description: string
          id: number
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          created_at?: string
          description: string
          id?: number
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          created_at?: string
          description?: string
          id?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      "conversations.members.bots": {
        Row: {
          bot_id: string
          conversation_id: number
          id: number
        }
        Insert: {
          bot_id: string
          conversation_id: number
          id?: number
        }
        Update: {
          bot_id?: string
          conversation_id?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "conversations.members.bots_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations.members.bots_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      "conversations.messages.bots": {
        Row: {
          bot_id: string
          conversation_id: number
          created_at: string
          id: number
          message: string | null
        }
        Insert: {
          bot_id: string
          conversation_id: number
          created_at?: string
          id?: number
          message?: string | null
        }
        Update: {
          bot_id?: string
          conversation_id?: number
          created_at?: string
          id?: number
          message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations.bots.messages_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations.bots.messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      "conversations.messages.users": {
        Row: {
          conversation_id: number
          created_at: string
          id: number
          message: string | null
          user_id: string
        }
        Insert: {
          conversation_id: number
          created_at?: string
          id?: number
          message?: string | null
          user_id: string
        }
        Update: {
          conversation_id?: number
          created_at?: string
          id?: number
          message?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation.user.messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          id: number
          user_id: string
          username: string
        }
        Insert: {
          id?: number
          user_id?: string
          username: string
        }
        Update: {
          id?: number
          user_id?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      set_random_username: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      "conversation participant role": "user" | "bot"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      "conversation participant role": ["user", "bot"],
    },
  },
} as const
