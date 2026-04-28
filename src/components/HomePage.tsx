import Icon from "@/components/ui/icon";
import { Section } from "@/lib/types";

interface HomePageProps {
  navTo: (s: Section) => void;
}

export default function HomePage({ navTo }: HomePageProps) {
  return (
    <>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/da6a8bf4-94af-4194-99ea-d10518543b8c/files/2fd1bcda-13e5-46c6-8e72-dbaeecc5d815.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1612]/92 via-[#1A1612]/70 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-2xl animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#B8962E]" />
              <span className="text-[#B8962E] text-xs tracking-[0.3em] font-ibm font-medium">ЮРИДИЧЕСКАЯ ПОМОЩЬ</span>
            </div>
            <h1 className="font-cormorant text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
              Отмена незаконных<br />
              <span className="italic text-[#D4AF5A]">приказов</span>
            </h1>
            <p className="text-white/70 text-lg font-light leading-relaxed mb-10 max-w-lg">
              Защищаем трудовые права работников. Профессиональная подготовка заявлений об отмене незаконных приказов работодателя.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navTo("form")}
                className="px-8 py-4 bg-[#B8962E] text-white font-ibm font-medium text-sm tracking-widest hover:bg-[#D4AF5A] transition-colors duration-200"
              >
                ПОДАТЬ ЗАЯВЛЕНИЕ
              </button>
              <button
                onClick={() => navTo("procedure")}
                className="px-8 py-4 border border-white/30 text-white font-ibm font-medium text-sm tracking-widest hover:border-[#B8962E] hover:text-[#D4AF5A] transition-colors duration-200"
              >
                УЗНАТЬ ПРОЦЕДУРУ
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1A1612] py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "98%", label: "успешных дел" },
            { value: "12+", label: "лет практики" },
            { value: "3 000+", label: "заявлений подано" },
            { value: "24ч", label: "подготовка документа" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-cormorant text-4xl font-bold text-[#B8962E]">{s.value}</div>
              <div className="text-white/50 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-[#F5F2EC]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#B8962E]" />
              <span className="text-[#B8962E] text-xs tracking-[0.3em]">ПОЧЕМУ МЫ</span>
              <div className="h-px w-8 bg-[#B8962E]" />
            </div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-[#1A1612]">
              Профессиональный подход
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "ShieldCheck", title: "Правовая защита", desc: "Анализируем каждый приказ на соответствие трудовому законодательству и нормам охраны труда." },
              { icon: "FileText", title: "Точная документация", desc: "Формируем заявления в строгом соответствии с требованиями ГИТ, прокуратуры и суда." },
              { icon: "Clock", title: "Оперативность", desc: "Подготовка заявления в течение 24 часов. Срочное оформление при необходимости." },
            ].map((f) => (
              <div key={f.title} className="border border-[#1A1612]/10 bg-white p-8 hover:border-[#B8962E]/40 transition-colors duration-300">
                <div className="w-12 h-12 border border-[#B8962E]/40 flex items-center justify-center mb-6">
                  <Icon name={f.icon} size={20} className="text-[#B8962E]" />
                </div>
                <h3 className="font-cormorant text-2xl font-semibold mb-3">{f.title}</h3>
                <p className="text-[#1A1612]/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1A1612] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-cormorant text-4xl md:text-5xl font-semibold text-white mb-6">
            Готовы защитить свои права?
          </h2>
          <p className="text-white/60 mb-10 leading-relaxed">
            Заполните заявление онлайн — черновик сохраняется, можно вернуться в любой момент.
          </p>
          <button
            onClick={() => navTo("form")}
            className="px-10 py-4 bg-[#B8962E] text-white font-ibm text-sm tracking-widest hover:bg-[#D4AF5A] transition-colors duration-200"
          >
            НАЧАТЬ ЗАЯВЛЕНИЕ
          </button>
        </div>
      </section>
    </>
  );
}
