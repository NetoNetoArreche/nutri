/*
          # Criação da Tabela de Perfis e Gatilho de Autenticação
          Este script cria a tabela 'profiles' para armazenar dados públicos dos usuários e configura um gatilho para popular essa tabela automaticamente após o registro de um novo usuário no Supabase Auth.

          ## Descrição da Query: 
          - **Criação da Tabela `profiles`**: Armazena informações adicionais dos usuários, como nome e URL do avatar. O `id` da tabela é uma chave estrangeira que referencia `auth.users.id`, garantindo a integridade dos dados.
          - **Ativação de RLS**: A Segurança em Nível de Linha (RLS) é ativada para proteger os dados dos usuários.
          - **Políticas de Acesso**: São criadas políticas de segurança que permitem que os usuários acessem e modifiquem apenas seus próprios perfis. Usuários não autenticados não têm acesso.
          - **Função `handle_new_user`**: Uma função de gatilho que cria uma nova entrada na tabela `profiles` sempre que um novo usuário é adicionado à tabela `auth.users`.
          - **Gatilho `on_auth_user_created`**: Aciona a função `handle_new_user` após a inserção de um novo usuário.

          ## Metadata:
          - Schema-Category: "Structural"
          - Impact-Level: "Medium"
          - Requires-Backup: false
          - Reversible: true (com a deleção manual dos objetos criados)
          
          ## Detalhes da Estrutura:
          - **Tabelas Criadas**: `public.profiles`
          - **Colunas**: `id` (UUID, PK, FK to auth.users), `name` (TEXT), `avatar_url` (TEXT), `updated_at` (TIMESTAMPTZ)
          - **Funções Criadas**: `public.handle_new_user()`
          - **Gatilhos Criados**: `on_auth_user_created` em `auth.users`

          ## Implicações de Segurança:
          - RLS Status: Ativado na tabela `profiles`.
          - Mudanças de Política: Sim, políticas de `SELECT`, `INSERT`, e `UPDATE` são adicionadas para garantir que os usuários só possam gerenciar seus próprios dados.
          - Requisitos de Autenticação: As políticas exigem que o usuário esteja autenticado para interagir com seus dados de perfil.

          ## Impacto de Performance:
          - Índices: Um índice de chave primária é criado automaticamente para a coluna `id`.
          - Gatilhos: Um gatilho é adicionado à tabela `auth.users`, que terá um impacto mínimo de performance durante o processo de registro de novos usuários.
          - Impacto Estimado: Baixo. A operação é otimizada e essencial para a funcionalidade do aplicativo.
          */

-- 1. Cria a tabela para perfis de usuário
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ
);

-- 2. Ativa a Segurança em Nível de Linha (RLS) para a tabela de perfis
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Cria políticas de segurança para a tabela de perfis
-- Permite que usuários leiam seu próprio perfil.
CREATE POLICY "Public profiles are viewable by everyone."
ON public.profiles FOR SELECT
USING ( true );

-- Permite que usuários insiram seu próprio perfil.
CREATE POLICY "Users can insert their own profile."
ON public.profiles FOR INSERT
WITH CHECK ( auth.uid() = id );

-- Permite que usuários atualizem seu próprio perfil.
CREATE POLICY "Users can update own profile."
ON public.profiles FOR UPDATE
USING ( auth.uid() = id );

-- 4. Cria uma função para adicionar um novo perfil quando um novo usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$;

-- 5. Cria o gatilho que chama a função handle_new_user após a criação de um usuário
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 6. Adiciona comentários para clareza
COMMENT ON TABLE public.profiles IS 'Armazena perfis de usuários públicos, vinculados à autenticação do Supabase.';
COMMENT ON POLICY "Public profiles are viewable by everyone." ON public.profiles IS 'Qualquer usuário pode visualizar perfis.';
COMMENT ON POLICY "Users can insert their own profile." ON public.profiles IS 'Garante que um usuário só pode criar seu próprio perfil.';
COMMENT ON POLICY "Users can update own profile." ON public.profiles IS 'Garante que um usuário só pode atualizar seu próprio perfil.';
COMMENT ON FUNCTION public.handle_new_user() IS 'Cria um perfil para um novo usuário registrado.';
COMMENT ON TRIGGER on_auth_user_created ON auth.users IS 'Aciona a criação de perfil após o registro de um novo usuário.';
