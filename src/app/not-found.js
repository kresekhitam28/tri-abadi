import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-5 pb-20 pt-32 text-center sm:pt-40">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        Periksa kembali alamat halaman atau lanjutkan ke daftar layanan dan artikel.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex min-h-11 items-center rounded-lg bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800">
          Beranda
        </Link>
        <Link href="/layanan" className="inline-flex min-h-11 items-center rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-800 hover:border-blue-600">
          Lihat Layanan
        </Link>
        <Link href="/blog" className="inline-flex min-h-11 items-center rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-800 hover:border-blue-600">
          Baca Artikel
        </Link>
      </div>
    </section>
  );
}
