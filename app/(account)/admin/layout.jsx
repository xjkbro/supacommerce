import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import { notFound, useRouter } from 'next/navigation';
import React from 'react'

export default async function AdminLayout({children}) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    // const router = useRouter()

    const {
        data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase.from("users").select("id,role").eq("user_id", user.id).single()

    if(data.role != "admin")
      notFound()
    // console.log(user)
  return (
    <div>{children}</div>
  )
}
