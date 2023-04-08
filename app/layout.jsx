import "./globals.css";
import StripeProvider from "@/components/providers/stripe-provider";
import SupabaseProvider from "@/components/providers/supabase-provider";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

export const metadata = {
    title: "Create Supabase App",
    description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <html lang="en" data-theme="bumblebee">
            <body>
                <SupabaseProvider>
                    <StripeProvider>
                        <NavBar user={user} />
                        {children}
                        <Footer />
                    </StripeProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
