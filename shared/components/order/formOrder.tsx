import { PlaceholderInput } from "./placeholderInput";

export function FormOrder({subCategoryId} : {subCategoryId : number}) {
  return (
    <section className="relative scroll-mt-20 rounded-xl bg-card/50 shadow-2xl md:scroll-mt-[7.5rem]">
      <PlaceholderInput subCategoryId={subCategoryId}/>
    </section>
  );
}
