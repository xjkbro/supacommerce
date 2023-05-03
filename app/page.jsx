import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Hero from "@/components/ui/Hero";
// import Welcome from "@/components/ui/Welcome";
import ThreeBlockBadge from "@/components/ui/ThreeBlockBadge";
// import FeaturedSeries from "@/components/ui/FeaturedSeries";
// import FeaturePosts from "@/components/ui/FeaturePosts";
// import VideoHero from "@/components/ui/VideoHero";
import CallToAction from "@/components/ui/CallToAction";
import CallToAction2 from "@/components/ui/CallToAction2";
// import Webinars from "@/components/ui/Webinars";

import dynamic from "next/dynamic";
import Top3Products from "@/components/ui/Top3Products";

const DynamicFeatureSeries = dynamic(
    () => import("@/components/ui/FeaturedSeries"),
    {
        loading: () => <p>Loading...</p>,
    }
);
const DynamicWelcome = dynamic(() => import("@/components/ui/Welcome"), {
    loading: () => <p>Loading...</p>,
});
const DynamicFeaturePosts = dynamic(
    () => import("@/components/ui/FeaturePosts"),
    {
        loading: () => <p>Loading...</p>,
    }
);

// do not cache this page
// export const revalidate = 0;

export default async function Home() {
    const supabase = createServerComponentSupabaseClient({
        headers,
        cookies,
    });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div>
            {/* <VideoHero url="./pexels-harabe-6450803-1920x1080-25fps.mp4" /> */}
            <Hero />
            <Top3Products />
            <ThreeBlockBadge />
            <DynamicFeatureSeries series="tgw" />
            <DynamicWelcome />
            <CallToAction2 />
            <DynamicFeaturePosts />

            <CallToAction />
        </div>
    );
}
