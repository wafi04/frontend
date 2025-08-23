import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SubCategory } from "@/types/subcategory";
import { Switch } from "@/components/ui/switch";

interface TableSubCategoriesProps {
  data: SubCategory[];
}

export function TableSubCategories({ data }: TableSubCategoriesProps) {
    console.table(data)
  return (
    <section className="mt-5">

    <Table>
      <TableHeader>
        <TableRow className="border">
          <TableHead className="w-[60px] border-r">ID</TableHead>
          <TableHead className="border-r">Name</TableHead>
          <TableHead className="border-r">SubName</TableHead>
          <TableHead className="border-r">Brand</TableHead>
          <TableHead className="border-r">Thumbnail</TableHead>
          <TableHead className="border-r">Banner</TableHead>
          <TableHead className="border-r">Information</TableHead>
          <TableHead className="border-r">Instruction</TableHead>
          <TableHead className="text-center border-r">Is Active</TableHead>
          <TableHead className="text-center border-r">Check Nickname</TableHead>
          <TableHead className="w-[100px]">Action</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody className="border">
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={10} className="h-24 text-center text-muted-foreground">
              No subcategories found.
            </TableCell>
          </TableRow>
        ) : (
            data.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
              {/* ID */}
              <TableCell className="font-medium border-r">{item.id}</TableCell>

              {/* Name */}
              <TableCell className="border-r">
                <Input
                  className="border-0 shadow-none focus-visible:ring-0 p-1 h-8"
                  value={item.name}
                  placeholder="Enter name"
                  readOnly // atau hapus jika ingin bisa edit
                />
              </TableCell>

              {/* SubName */}
              <TableCell className="border-r">
                <Input
                  className="border-0 shadow-none focus-visible:ring-0 p-1 h-8"
                  value={item.subName}
                  placeholder="Enter sub name"
                  readOnly
                  />
              </TableCell>

              {/* Brand */}
              <TableCell className="border-r font-medium">{item.brand}</TableCell>

              {/* Thumbnail */}
              <TableCell className="border-r">
                <div className="flex items-center justify-center">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="h-10 w-10 object-cover rounded-md border"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/placeholder.png";
                    }}
                    />
                </div>
              </TableCell>

              {/* Banner URL */}
              <TableCell className="border-r">
                <div className="flex items-center justify-center">
                  <img
                    src={item.bannerUrl}
                    alt="Banner"
                    className="h-8 w-20 object-cover rounded border"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/placeholder-banner.png";
                    }}
                    />
                </div>
              </TableCell>

              {/* Information */}
              <TableCell className="border-r max-w-xs truncate text-sm" title={item.information}>
                {item.information}
              </TableCell>

              {/* Instruction */}
              <TableCell className="border-r max-w-xs truncate text-sm" title={item.instruction}>
                {item.instruction}
              </TableCell>

              {/* Is Active */}
              <TableCell className="border-r text-center">
                <Switch checked={item.isActive} disabled />
              </TableCell>

              {/* Is Check Nickname */}
            <TableCell className="border-r text-center">
                <Switch checked={item.isCheckNickname} disabled />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
        </section>
  );
}