import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-secondary print:hidden" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container py-12 pb-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo & Deskripsi */}
          <div className="space-y-8">
            <Image
              src="/logo.svg"
              alt="Veinstore Logo"
              width={160}
              height={64}
              priority
              className="h-16 w-auto"
            />
            <p className="text-sm leading-6 text-secondary-foreground">
              Veinstore adalah Platform Resmi Untuk Semua Kebutuhan TopUp &amp;
              Voucher Game. Kami menyediakan harga termurah, proses cepat,
              dan kebutuhan lainnya dengan harga kompetitif.
            </p>

            {/* Sosial Media */}
            <div className="flex space-x-6">
              <a
                href="https://instagram.com/veinstore_id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-murky-400 hover:text-murky-500"
                aria-label="Instagram"
              >
                <Image
                  src="https://client-cdn.bangjeff.com/veinstore.id/gallery/6a804661-5978-4853-b5f9-401add38a594.webp"
                  alt="Instagram Logo"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=6281313222213"
                target="_blank"
                rel="noopener noreferrer"
                className="text-murky-400 hover:text-murky-500"
                aria-label="WhatsApp"
              >
                <Image
                  src="https://client-cdn.bangjeff.com/veinstore.id/gallery/664dce63-efac-4d52-85f4-70424c029a60.webp"
                  alt="WhatsApp Logo"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://www.tiktok.com/@veinstore.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-murky-400 hover:text-murky-500"
                aria-label="TikTok"
              >
                <Image
                  src="https://client-cdn.bangjeff.com/veinstore.id/gallery/tiktok-06842566.webp"
                  alt="TikTok Logo"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://www.youtube.com/@veinstoreid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-murky-400 hover:text-murky-500"
                aria-label="YouTube"
              >
                <Image
                  src="https://client-cdn.bangjeff.com/veinstore.id/gallery/Youtube-62176792.webp"
                  alt="YouTube Logo"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2">
            <nav aria-label="Peta Situs">
              <h3 className="text-sm font-semibold leading-6 text-primary">Peta Situs</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li><a href="/id-id" className="footer-link">Beranda</a></li>
                <li><a href="/id-id/sign-in" className="footer-link">Masuk</a></li>
                <li><a href="/id-id/price-list" className="footer-link">Cek Transaksi</a></li>
                <li><a href="/id-id/reviews" className="footer-link">Ulasan</a></li>
              </ul>
            </nav>

            <nav aria-label="Kemitraan">
              <h3 className="text-sm font-semibold leading-6 text-primary">Kemitraan</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li>
                  <a
                    href="https://wa.me/6282216536085?text=Halo%20min,%20mau%20gabung%20jadi%20Reseller%20Nih..%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    Daftar Reseller
                  </a>
                </li>
                <li><a href="/id-id/price-list" className="footer-link">Price List</a></li>
                <li><a href="/id-id/docs" className="footer-link">Dokumentasi API</a></li>
              </ul>
            </nav>

            <nav aria-label="Dukungan">
              <h3 className="text-sm font-semibold leading-6 text-primary">Dukungan</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li><a href="https://api.whatsapp.com/send?phone=6281313222213" target="_blank" rel="noopener noreferrer" className="footer-link">Whatsapp</a></li>
                <li><a href="https://instagram.com/veinstore_id" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a></li>
                <li><a href="mailto:veinstore.id@gmail.com" className="footer-link">Email</a></li>
                <li><a href="https://whatsapp.com/channel/0029ValCKVRGehESnOtHef2y" target="_blank" rel="noopener noreferrer" className="footer-link">Saluran Whatsapp</a></li>
              </ul>
            </nav>

            <nav aria-label="Legalitas">
              <h3 className="text-sm font-semibold leading-6 text-primary">Legalitas</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li><a href="/id-id/privacy-policy" className="footer-link">Kebijakan Pribadi</a></li>
                <li><a href="/id-id/terms-and-condition" className="footer-link">Member &amp; Reseller</a></li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 flex items-center justify-between border-t border-background/50 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-secondary-foreground">
            ©2025 PT. VEINSTORE DIGITAL TEKNOLOGI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* Tailwind helper class biar konsisten */
const footerLink = "flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75";
