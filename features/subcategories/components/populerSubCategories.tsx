import Image from "next/image"
import { useGetSubCategoryByCategories } from "../hooks/api"

export function PopulerSection(){
    const {data}  = useGetSubCategoryByCategories(7)
    return (
        <section className="container my-5">
                <div className="mb-5 text-foreground">
                    <div className="text-lg font-semibold uppercase leading-relaxed tracking-wider">
                        🔥 POPULER SEKARANG !
                    </div>
                    <p className="pl-6 text-xs">
                        💫 Silahkan Temukan Game Kamu Di PENCARIAN 🔍
                    </p>
                    
                </div>
                <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 opacity-100 transform-none">
                {
                    data?.map((item) => (
                    <li key={item.brand} className="relative [--card-padding:theme(spacing.2)] [--card-radius:theme(borderRadius.2xl)] opacity-100 transform-none">
                        <a 
                            href="" 
                            className="flex items-center gap-x-2 rounded-[--card-radius] bg-muted text-foreground duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background md:gap-x-3 bg-cover bg-center bg-no-repeat"
                            style={{
                                background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                                backgroundBlendMode: 'multiply'
                            }}
                        >
                            <div className="flex items-center gap-3 p-[0.5rem]">
                                    <Image alt={item.brand} sizes="100vw" width={56} height={56} src={item.thumbnail} className="aspect-square h-14 w-14 rounded-[calc(var(--card-radius)-var(--card-padding))] object-cover object-center duration-300 group-hover/recommendation:scale-110 group-hover/recommendation:shadow-2xl md:h-20 md:w-20"/>
                                <div className="relative flex w-full flex-col">
                                    <h2 className="w-[80px] truncate text-xxs font-semibold text-foreground sm:w-[125px] md:w-[150px] md:text-base lg:w-[175px]">
                                        {item.name}
                                    </h2>
                                    <p className="text-xxs text-foreground md:text-sm">
                                        {item.subName}
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>

                    ))
                }
                </ul>
        </section>    
    )
}