export function HeaderOrder({id,subName} : {id : number,subName : string}){
    return (
        <div className="flex items-center overflow-hidden rounded-t-2xl bg-gradient-to-r from-primary via-primary/95 to-primary/90 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="relative flex h-12 w-12 items-center justify-center bg-gradient-to-br from-primary-foreground/20 to-primary-foreground/10 backdrop-blur-sm font-bold text-primary-foreground text-lg border-r border-primary-foreground/20">
          {id}
        </div>
        <div className="relative flex items-center gap-2 px-4 py-3">
          <div className="h-2 w-2 rounded-full bg-primary-foreground/60 animate-pulse" />
          <h2 className="text-sm font-bold text-primary-foreground tracking-wide">
            {subName}
          </h2>
        </div>
      </div>

    )
}