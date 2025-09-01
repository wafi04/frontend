export function Footer() {
  return (
    <footer
      className="bg-secondary print:hidden"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container py-12 pb-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo dan Deskripsi */}
          <div className="space-y-8">
            {/* <img
              alt="Logo Veinstore"
              width={500}
              height={500}
              className="h-16 w-auto"
              src="https://client-cdn.bangjeff.com/veinstore.id/meta/veinstore-ezgif.com-resize.gif"
            /> */}
            <p className="text-sm leading-6 text-secondary-foreground">
              adalah Platform Resmi Untuk Semua Kebutuhan TopUp & Voucher Game.
              Menyediakan Harga Termurah, Proses Cepat, dan Kebutuhan Lainnya
              dengan harga Kompetitif.
            </p>

            {/* Social Media */}
            <div className="flex space-x-6">
              <a
                href="https://instagram.com/veinstore_id"
                className="text-murky-400 hover:text-murky-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Instagram</span>
                <img
                  alt="Instagram"
                  width={24}
                  height={24}
                  src="https://client-cdn.bangjeff.com/veinstore.id/gallery/6a804661-5978-4853-b5f9-401add38a594.webp"
                />
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=6281313222213"
                className="text-murky-400 hover:text-murky-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">WhatsApp</span>
                <img
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  src="https://client-cdn.bangjeff.com/veinstore.id/gallery/664dce63-efac-4d52-85f4-70424c029a60.webp"
                />
              </a>

              <a
                href="https://www.tiktok.com/@veinstore.id"
                className="text-murky-400 hover:text-murky-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">TikTok</span>
                <img
                  alt="TikTok"
                  width={24}
                  height={24}
                  src="https://client-cdn.bangjeff.com/veinstore.id/gallery/tiktok-06842566.webp"
                />
              </a>

              <a
                href="https://www.youtube.com/@veinstoreid"
                className="text-murky-400 hover:text-murky-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">YouTube</span>
                <img
                  alt="YouTube"
                  width={24}
                  height={24}
                  src="https://client-cdn.bangjeff.com/veinstore.id/gallery/Youtube-62176792.webp"
                />
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-primary">
                Peta Situs
              </h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <a
                    href="/id-id"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    Beranda
                  </a>
                </li>
                <li>
                  <a
                    href="/id-id/sign-in"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    Masuk
                  </a>
                </li>
                <li>
                  <a
                    href="/id-id/price-list"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    Cek Transaksi
                  </a>
                </li>
                <li>
                  <a
                    href="/id-id/reviews"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    Ulasan
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold leading-6 text-primary">
                Kemitraan
              </h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <a
                    href="https://wa.me/6282216536085?text=Halo%20min,%20mau%20gabung%20jadi%20Reseller%20Nih.."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    Daftar Reseller
                  </a>
                </li>
                <li>
                  <a
                    href="/id-id/price-list"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    Price List
                  </a>
                </li>
                <li>
                  <a
                    href="/id-id/docs"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    Dokumentasi API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold leading-6 text-primary">
                Dukungan
              </h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <a
                    href="https://api.whatsapp.com/send?phone=6281313222213"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    Whatsapp
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/veinstore_id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:veinstore.id@gmail.com"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://whatsapp.com/channel/0029ValCKVRGehESnOtHef2y"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    Saluran Whatsapp
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold leading-6 text-primary">
                Legalitas
              </h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <a
                    href="/id-id/privacy-policy"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    Kebijakan Pribadi
                  </a>
                </li>
                <li>
                  <a
                    href="/id-id/terms-and-condition"
                    className="flex items-center gap-2 text-sm leading-6 text-secondary-foreground hover:text-primary/75"
                  >
                    Member & Reseller
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 flex items-center justify-between border-t border-background/50 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-secondary-foreground">
            {/* © 2025 PT. VEINSTORE DIGITAL TEKNOLOGI. All rights reserved. */}
          </p>

          {/* Toggle Theme */}
          <button
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border/50 bg-transparent hover:bg-accent/75 hover:text-accent-foreground transition-all"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-sun h-[1.2rem] w-[1.2rem]"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
