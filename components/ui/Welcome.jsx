import Image from "next/image";
import React from "react";

export default function Welcome() {
    const arr = [
        "https://plus.unsplash.com/premium_photo-1663011472110-7eae3fcd7a22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        "https://images.unsplash.com/photo-1493476523860-a6de6ce1b0c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2338&q=80",
        "https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2338&q=80",
    ];
    return (
        <div className="hero min-h-screen bg-slate-100">
            <div className="hero-content flex-col lg:flex-row">
                <div className="grid grid-cols-3 md:grid-cols-1 md:grid-row-3 gap-4 w-full md:w-56">
                    {arr.map((item, i) => (
                        <Image
                            key={i}
                            src={item}
                            alt={i}
                            width={300}
                            height={300}
                            className="h-56 w-56"
                        />
                    ))}
                </div>
                <div className="w-full md:w-2/3">
                    <h1 className="text-3xl md:text-5xl font-bold">
                        Welcome to SupaCommerce!
                    </h1>
                    <div className="py-6 flex flex-col gap-2">
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. In quod ipsam omnis eveniet suscipit
                            laboriosam fugiat cum, illo facilis sunt. Lorem
                            ipsum dolor sit amet consectetur adipisicing elit.
                            Explicabo asperiores laborum voluptate ullam minima
                            quibusdam error tenetur esse hic voluptas?
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Explicabo hic reiciendis ducimus cupiditate
                            ipsa natus asperiores expedita, distinctio accusamus
                            quod illo rerum alias qui placeat non? Nostrum
                            officia doloribus quaerat autem iure! Non quisquam
                            dicta temporibus nihil distinctio incidunt vel?
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Doloribus, nihil.
                        </p>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Molestiae in dolorum autem eaque corporis
                            quibusdam commodi esse exercitationem minus
                            distinctio facilis, amet ut iure quo?Lorem ipsum
                            dolor sit amet consectetur adipisicing elit. Debitis
                            adipisci doloremque, sed magnam, facere molestias
                            autem harum earum neque laborum perferendis rem
                            sapiente, quod pariatur voluptatem illo id? Dolores,
                            architecto.
                        </p>{" "}
                    </div>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
}
