import Footer from "@/components/Footer";
import Hero from "@/components/ui/Hero";
import Navbar from "@/components/Navbar";
import Button from "@/components/ui/Button";
import CallToAction from "@/components/ui/CallToAction";
import FeaturedSeries from "@/components/ui/FeaturedSeries";
import ThreeBlockBadge from "@/components/ui/ThreeBlockBadge";
import VideoHero from "@/components/ui/VideoHero";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Image from "next/image";
import CallToAction2 from "@/components/ui/CallToAction2";
import FeaturePosts from "@/components/ui/FeaturePosts";
import Webinars from "@/components/ui/Webinars";
import Welcome from "@/components/ui/Welcome";
import DynamicGrid from "@/components/ui/DynamicGrid";

// do not cache this page
export const revalidate = 0;

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
            {/* <Navbar user={user} /> */}
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
            {/* <VideoHero url="./pexels-harabe-6450803-1920x1080-25fps.mp4" /> */}

            <Hero />
            <ThreeBlockBadge />
            <Welcome />
            <FeaturedSeries series="tgw" />
            <CallToAction2 />
            <FeaturePosts />
            {/* <Webinars /> */}

            <CallToAction />
            {/* <div className="flex flex-col mx-auto lg:flex-row p-4 w-2/3">
                <div className="grid flex-grow h-fit card bg-base-300 rounded-box place-items-center">
                    <div className="card w-96 bg-base-100 shadow-xl image-full">
                        <figure>
                            <Image
                                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                width={400}
                                height={400}
                                alt="Shoes"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <p>
                                If a dog chews shoes whose shoes does he choose?
                            </p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider lg:divider-horizontal"></div>
                <div className="grid flex-grow h-fit card bg-base-300 rounded-box place-items-center">
                    <div className="card lg:card-side bg-base-100 shadow-xl">
                        <figure>
                            <Image
                                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                // src="/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                                width={400}
                                height={400}
                                alt="Album"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                New album is released!
                            </h2>
                            <p>Click the button to listen on Spotiwhy app.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">
                                    Listen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
