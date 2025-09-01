import React, { useState } from "react";
import { ChevronDown, Info, Search, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HeaderOrder } from "../../../features/order/components/headerOrder";

// Types
interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

// Data negara dengan kode telepon dan bendera
const countries: Country[] = [
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺" },
  { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
];

interface CountrySelectProps {
  selectedCountry: Country;
  onSelect: (country: Country) => void;
}

function CountrySelect({ selectedCountry, onSelect }: CountrySelectProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dialCode.includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (country: Country) => {
    onSelect(country);
    setOpen(false);
    setSearchTerm("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between rounded-e-none rounded-s-lg border-r-0 px-3"
        >
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="text-xs">{selectedCountry.dialCode}</span>
          <ChevronDown className="ml-2 h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari negara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-60 overflow-y-auto p-1">
          {filteredCountries.map((country) => (
            <Button
              key={country.code}
              variant="ghost"
              onClick={() => handleSelect(country)}
              className="w-full flex items-center gap-3 font-normal justify-start"
            >
              <span className="text-base">{country.flag}</span>
              <div className="flex-1 text-left">
                <div className="font-medium">{country.name}</div>
                <div className="text-xs text-muted-foreground">
                  {country.dialCode}
                </div>
              </div>
              {selectedCountry.code === country.code && (
                <Check className="h-4 w-4" />
              )}
            </Button>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="p-6 text-center text-sm text-muted-foreground">
            Negara tidak ditemukan
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default function ContactPerson() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]); // Default Indonesia
  const [phoneNumber, setPhoneNumber] = useState<string>(countries[0].dialCode);
  const [email, setEmail] = useState<string>("");

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    // Reset phone number when country changes
    setPhoneNumber(country.dialCode);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Ensure the dial code is always present
    if (value.startsWith(selectedCountry.dialCode)) {
      setPhoneNumber(value);
    } else {
      setPhoneNumber(selectedCountry.dialCode + value.replace(/^\+?\d*/, ""));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <section className="relative scroll-mt-20 rounded-xl bg-card/50 shadow-2xl md:scroll-mt-[7.5rem]">
      <HeaderOrder id={4} subName="Pilih Pembayaran" />
      {/* Email Field */}
      <div className="p-4 space-y-2">
        <div className="space-y-2 ">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        {/* Phone Number Field */}
        <div className="space-y-2">
          <Label htmlFor="phone">No. WhatsApp</Label>
          <div className="flex">
            <CountrySelect
              selectedCountry={selectedCountry}
              onSelect={handleCountrySelect}
            />
            <Input
              id="phone"
              type="tel"
              className="rounded-e-lg rounded-s-none"
              autoComplete="tel"
              placeholder="8XXXXXXXXXX"
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
          </div>
          <p className="text-xs italic text-muted-foreground">
            **Nomor ini akan dihubungi jika terjadi masalah
          </p>
        </div>

        {/* Info Message */}
        <div className="flex items-center gap-2 rounded-md bg-muted/50 px-4 mt-2 py-3">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Bukti transaksi akan dikirim ke email di atas (opsional)
          </span>
        </div>
      </div>
    </section>
  );
}
