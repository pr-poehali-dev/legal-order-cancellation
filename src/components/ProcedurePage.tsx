import Icon from "@/components/ui/icon";
import { Section } from "@/lib/types";

interface ProcedurePageProps {
  navTo: (s: Section) => void;
}

export default function ProcedurePage({ navTo }: ProcedurePageProps) {
  return (
    <section className="min-h-screen py-20 bg-[#F5F2EC]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#B8962E]" />
            <span className="text-[#B8962E] text-xs tracking-[0.3em]">ПОРЯДОК ДЕЙСТВИЙ</span>
          </div>
          <h1 className="font-cormorant text-5xl font-semibold text-[#1A1612] leading-tight">
            Процедура отмены<br />
            <span className="italic text-[#8B6914]">судебного приказа</span>
          </h1>
        </div>

        <div className="space-y-0">
          {[
            { num: "01", title: "Анализ приказа", desc: "Проверяем соответствие приказа нормам Трудового кодекса РФ. Выявляем нарушения процедуры издания, превышение полномочий, несоответствие оснований.", detail: "Срок: 1 рабочий день" },
            { num: "02", title: "Подготовка заявления", desc: "Составляем мотивированное заявление об отмене приказа с правовым обоснованием. Указываем конкретные нормы закона, которые нарушены работодателем.", detail: "Срок: 24 часа" },
            { num: "03", title: "Направление в органы", desc: "Подаём заявление в государственную инспекцию труда, прокуратуру или суд — в зависимости от характера нарушения и желаемого результата.", detail: "Выбор органа: ГИТ / Прокуратура / Суд" },
            { num: "04", title: "Контроль исполнения", desc: "Отслеживаем рассмотрение заявления. При необходимости — направляем дополнительные документы, представляем интересы в ходе проверки.", detail: "Срок ответа: 30 дней по закону" },
            { num: "05", title: "Исполнение решения", desc: "Контролируем фактическую отмену приказа работодателем. При уклонении — инициируем административное или судебное принуждение к исполнению.", detail: "Результат: документальная отмена приказа" },
          ].map((step, i) => (
            <div key={step.num} className={`flex gap-8 py-10 ${i !== 4 ? "border-b border-[#1A1612]/10" : ""}`}>
              <div className="font-cormorant text-5xl font-bold text-[#B8962E]/25 leading-none mt-1 w-16 shrink-0">
                {step.num}
              </div>
              <div className="flex-1">
                <h3 className="font-cormorant text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-[#1A1612]/65 leading-relaxed text-sm mb-3">{step.desc}</p>
                <div className="inline-flex items-center gap-2 bg-[#B8962E]/10 px-3 py-1.5 text-xs text-[#8B6914] font-medium tracking-wide">
                  <Icon name="Clock" size={12} />
                  {step.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 border border-[#B8962E]/30 bg-white p-8">
          <div className="flex items-start gap-4">
            <Icon name="Info" size={20} className="text-[#B8962E] mt-0.5 shrink-0" />
            <div>
              <h4 className="font-cormorant text-xl font-semibold mb-2">Важно знать</h4>
              <p className="text-[#1A1612]/65 text-sm leading-relaxed">
                Срок исковой давности по трудовым спорам составляет <strong>1 месяц</strong> с момента ознакомления с приказом об увольнении, и <strong>3 месяца</strong> — по иным нарушениям. Не затягивайте с обращением.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navTo("form")}
            className="px-10 py-4 bg-[#1A1612] text-white font-ibm text-sm tracking-widest hover:bg-[#B8962E] transition-colors duration-200"
          >
            ПЕРЕЙТИ К ЗАЯВЛЕНИЮ
          </button>
        </div>
      </div>
    </section>
  );
}