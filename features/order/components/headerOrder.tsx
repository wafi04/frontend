export function HeaderOrder({id,subName} : {id : number,subName : string}){
    return (
          <div className="flex items-center overflow-hidden rounded-t-xl bg-card">
        <div className="flex h-10 w-10 items-center justify-center bg-primary font-semibold text-primary-foreground">
          {id}
        </div>
        <h2 className="px-4 py-2 text-sm/6 font-semibold text-card-foreground">
        {subName}
        </h2>
      </div>

    )
}