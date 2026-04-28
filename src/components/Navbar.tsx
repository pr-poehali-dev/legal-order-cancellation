import Icon from "@/components/ui/icon";
import { Section, NAV_ITEMS } from "@/lib/types";

interface NavbarProps {
  section: Section;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  navTo: (s: Section) => void;
}

export default function Navbar({ section, menuOpen, setMenuOpen, navTo }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A1612]/95 backdrop-blur-sm border-b border-[#B8962E]/30">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => navTo("home")} className="flex items-center gap-3">
          <div className="w-8 h-8 border border-[#B8962E] flex items-center justify-center">
            <Icon name="Scale" size={16} className="text-[#B8962E]" />
          </div>
          <span className="font-cormorant text-lg font-semibold text-white tracking-wide">
            Lex<span className="text-[#B8962E]">Forma</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => navTo(key)}
              className={`text-sm tracking-wider transition-colors duration-200 ${
                section === key ? "text-[#B8962E]" : "text-white/70 hover:text-white"
              }`}
            >
              {label.toUpperCase()}
            </button>
          ))}
        </nav>

        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#1A1612] border-t border-[#B8962E]/20 px-6 py-4 flex flex-col gap-4">
          {NAV_ITEMS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => navTo(key)}
              className={`text-left text-sm tracking-wider ${section === key ? "text-[#B8962E]" : "text-white/70"}`}
            >
              {label.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
