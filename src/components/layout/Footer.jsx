export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 border-t border-white/5 mt-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <p className="font-mono text-xs text-muted/50 tracking-widest uppercase text-center md:text-left">
          © {new Date().getFullYear()} Nguyễn Bùi Gia Huy
        </p>
        
        <div className="flex items-center gap-8">
          <a href="#" className="font-mono text-xs text-muted hover:text-primary transition-colors tracking-widest uppercase">
            GitHub
          </a>
          <a href="#" className="font-mono text-xs text-muted hover:text-primary transition-colors tracking-widest uppercase">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
