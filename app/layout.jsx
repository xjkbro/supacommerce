import "./globals.css";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
// import StripeProvider from "@/components/providers/stripe-provider";
// import SupabaseProvider from "@/components/providers/supabase-provider";
// import Footer from "@/components/Footer";
// import NavBar from "@/components/Navbar";
// import MobileNav from "@/components/MobileNav";
import dynamic from "next/dynamic";

const StripeProvider = dynamic(
    () => import("@/components/providers/stripe-provider"),
    {
        loading: () => <p>Loading...</p>,
    }
);
const SupabaseProvider = dynamic(
    () => import("@/components/providers/supabase-provider"),
    {
        loading: () => <p>Loading...</p>,
    }
);
const MobileNav = dynamic(() => import("@/components/MobileNav"), {
    loading: () => <p>Loading...</p>,
});
const NavBar = dynamic(() => import("@/components/Navbar"), {
    loading: () => <p>Loading...</p>,
});
const Footer = dynamic(() => import("@/components/Footer"), {
    loading: () => <p>Loading...</p>,
});

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
