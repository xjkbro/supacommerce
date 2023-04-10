import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import { notFound, useRouter } from 'next/navigation';
import React from 'react'

export default async function Admin() {
  return (
<>
<h1>Admin Panel</h1>
    <ul>
      <li>User Dashboard</li>
      <li>Statistics</li>
      <li>Products</li>
      <li>Categories</li>
      <li>Posts</li>
      <li>Articles</li>
      <li>Videos</li>
    </ul>
</>
  )
}
