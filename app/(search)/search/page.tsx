import Button from "@/components/Button";
import Input from "@/components/Input";
import { MagnifyingGlassIcon as OutlineMagnifyingGlassIcon } from "@heroicons/react/24/outline";
export default function Search() {
  return (
    <div>
      <div className="flex gap-2 justify-center">
        <Input name="search" type="text" placeholder="search" />
        <Button text="Search" />
      </div>
    </div>
  );
}
