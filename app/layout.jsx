import "./globals.css";
import StripeProvider from "@/components/providers/stripe-provider";
import SupabaseProvider from "@/components/providers/supabase-provider";
import Footer from "@/components/Footer";

export const metadata = {
    title: "Create Supabase App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="bumblebee">
            <body>
                <SupabaseProvider>
                    <StripeProvider>
                        {children}
                        <Footer />
                    </StripeProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
