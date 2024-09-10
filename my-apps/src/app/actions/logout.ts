'use server'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function handleLogout() {
    const cookieStore = cookies();
    cookieStore.delete('Authorization'); // Ensure the cookie name is correct
    return redirect('/login');
}
