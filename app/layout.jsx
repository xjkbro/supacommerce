import "./globals.css";
import StripeProvider from "@/components/providers/stripe-provider";
import SupabaseProvider from "@/components/providers/supabase-provider";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import MobileNav from "@/components/MobileNav";

export const metadata = {
    title: "SupaCommerce",
    description: "A supa way to handle all your commerce needs",
    icons: {
        icon: "/supacommerce-short.svg",
    },
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
        <html lang="en" data-theme="icp">
            <body>
                <SupabaseProvider>
                    <StripeProvider>
                        <MobileNav user={user}>
                            <NavBar user={user} />
                            {children}
                            <Footer user={user} />
                        </MobileNav>
                    </StripeProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
