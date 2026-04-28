import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "procedure" | "form";

interface DraftData {
  fullName: string;
  position: string;
  orderNumber: string;
  orderDate: string;
  employer: string;
  reason: string;
  demand: string;
  savedAt: string;
}

const DRAFT_KEY = "appeal_form_draft";

const saveDraft = (data: Omit<DraftData, "savedAt">) => {
  const draft: DraftData = { ...data, savedAt: new Date().toISOString() };
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  return draft;
};

const loadDraft = (): DraftData | null => {
  const raw = localStorage.getItem(DRAFT_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
};

const clearDraft = () => localStorage.removeItem(DRAFT_KEY);

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const [form, setForm] = useState({
    fullName: "", position: "", orderNumber: "",
    orderDate: "", employer: "", reason: "", demand: "",
  });

  const [draftInfo, setDraftInfo] = useState<DraftData | null>(null);
  const [draftRestored, setDraftRestored] = useState(false);
  const [savedNow, setSavedNow] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const draft = loadDraft();
    if (draft) setDraftInfo(draft);
  }, []);

  const handleRestoreDraft = () => {
    const draft = loadDraft();
    if (!draft) return;
    setForm({
      fullName: draft.fullName, position: draft.position,
      orderNumber: draft.orderNumber, orderDate: draft.orderDate,
      employer: draft.employer, reason: draft.reason, demand: draft.demand,
    });
    setDraftRestored(true);
    setSection("form");
  };

  const handleSaveDraft = () => {
    const saved = saveDraft(form);
    setDraftInfo(saved);
    setSavedNow(true);
    setTimeout(() => setSavedNow(false), 3000);
  };

  const handleClearDraft = () => {
    clearDraft();
    setDraftInfo(null);
    setDraftRestored(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearDraft();
    setDraftInfo(null);
  };

  const navTo = (s: Section) => {
    setSection(s);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems: { key: Section; label: string }[] = [
    { key: "home", label: "Главная" },
    { key: "procedure", label: "Процедура" },
    { key: "form", label: "Подать заявление" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F2EC] font-ibm text-[#1A1612]">
      {/* NAV */}
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
            {navItems.map(({ key, label }) => (
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
            {navItems.map(({ key, label }) => (
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

      <div className="pt-16">
        {/* ===== HOME ===== */}
        {section === "home" && (
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
        )}

        {/* ===== PROCEDURE ===== */}
        {section === "procedure" && (
          <section className="min-h-screen py-20 bg-[#F5F2EC]">
            <div className="max-w-4xl mx-auto px-6">
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12 bg-[#B8962E]" />
                  <span className="text-[#B8962E] text-xs tracking-[0.3em]">ПОРЯДОК ДЕЙСТВИЙ</span>
                </div>
                <h1 className="font-cormorant text-5xl font-semibold text-[#1A1612] leading-tight">
                  Процедура отмены<br />
                  <span className="italic text-[#8B6914]">незаконного приказа</span>
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
        )}

        {/* ===== FORM ===== */}
        {section === "form" && (
          <section className="min-h-screen py-20 bg-[#F5F2EC]">
            <div className="max-w-3xl mx-auto px-6">
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-12 bg-[#B8962E]" />
                  <span className="text-[#B8962E] text-xs tracking-[0.3em]">ОНЛАЙН-ЗАЯВЛЕНИЕ</span>
                </div>
                <h1 className="font-cormorant text-5xl font-semibold text-[#1A1612] leading-tight">
                  Заявление об отмене<br />
                  <span className="italic text-[#8B6914]">незаконного приказа</span>
                </h1>
              </div>

              {draftInfo && !draftRestored && !submitted && (
                <div className="mb-8 border border-[#B8962E]/40 bg-[#B8962E]/5 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Icon name="FileEdit" size={18} className="text-[#B8962E] mt-0.5 shrink-0" />
                      <div>
                        <p className="font-ibm font-medium text-sm text-[#1A1612]">Обнаружен сохранённый черновик</p>
                        <p className="text-[#1A1612]/55 text-xs mt-1">Сохранён: {formatDate(draftInfo.savedAt)}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <button onClick={handleRestoreDraft} className="text-xs px-4 py-2 bg-[#B8962E] text-white hover:bg-[#D4AF5A] transition-colors">
                        Восстановить
                      </button>
                      <button onClick={handleClearDraft} className="text-xs px-4 py-2 border border-[#1A1612]/20 text-[#1A1612]/60 hover:border-[#1A1612]/40 transition-colors">
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {draftRestored && !submitted && (
                <div className="mb-8 flex items-center gap-3 text-sm text-[#2D6A4F] bg-[#2D6A4F]/8 border border-[#2D6A4F]/25 px-5 py-3">
                  <Icon name="CheckCircle" size={16} className="text-[#2D6A4F]" />
                  Черновик восстановлен — продолжайте заполнение
                </div>
              )}

              {savedNow && (
                <div className="mb-8 flex items-center gap-3 text-sm text-[#2D6A4F] bg-[#2D6A4F]/8 border border-[#2D6A4F]/25 px-5 py-3 animate-fade-in">
                  <Icon name="Save" size={16} className="text-[#2D6A4F]" />
                  Черновик сохранён — вернётесь позже и продолжите
                </div>
              )}

              {submitted ? (
                <div className="bg-white border border-[#1A1612]/10 p-12 text-center animate-fade-in">
                  <div className="w-16 h-16 border-2 border-[#B8962E] flex items-center justify-center mx-auto mb-6">
                    <Icon name="CheckCheck" size={28} className="text-[#B8962E]" />
                  </div>
                  <h2 className="font-cormorant text-3xl font-semibold mb-4">Заявление подано</h2>
                  <p className="text-[#1A1612]/60 text-sm leading-relaxed mb-8">
                    Ваше заявление принято в работу. Юрист свяжется с вами в течение рабочего дня для подтверждения и уточнения деталей.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ fullName: "", position: "", orderNumber: "", orderDate: "", employer: "", reason: "", demand: "" }); }}
                    className="px-8 py-3 border border-[#1A1612]/20 text-sm tracking-widest hover:border-[#B8962E] hover:text-[#B8962E] transition-colors"
                  >
                    НОВОЕ ЗАЯВЛЕНИЕ
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-[#1A1612]/10">
                  <div className="px-8 py-6 border-b border-[#1A1612]/8">
                    <p className="text-sm text-[#1A1612]/55 leading-relaxed">
                      Заполните форму. Нажмите «Сохранить черновик» — можно закрыть страницу и вернуться позже.
                    </p>
                  </div>

                  <div className="p-8 space-y-8">
                    <div>
                      <h3 className="font-cormorant text-xl font-semibold mb-5 pb-2 border-b border-[#1A1612]/8">
                        Сведения о заявителе
                      </h3>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                          <label className="block text-xs tracking-wider text-[#1A1612]/50 mb-2 uppercase">Фамилия, имя, отчество *</label>
                          <input type="text" required value={form.fullName}
                            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                            placeholder="Иванов Иван Иванович"
                            className="w-full border border-[#1A1612]/15 bg-[#F5F2EC]/50 px-4 py-3 text-sm focus:outline-none focus:border-[#B8962E] transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs tracking-wider text-[#1A1612]/50 mb-2 uppercase">Должность *</label>
                          <input type="text" required value={form.position}
                            onChange={(e) => setForm({ ...form, position: e.target.value })}
                            placeholder="Менеджер по продажам"
                            className="w-full border border-[#1A1612]/15 bg-[#F5F2EC]/50 px-4 py-3 text-sm focus:outline-none focus:border-[#B8962E] transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs tracking-wider text-[#1A1612]/50 mb-2 uppercase">Наименование работодателя *</label>
                          <input type="text" required value={form.employer}
                            onChange={(e) => setForm({ ...form, employer: e.target.value })}
                            placeholder='ООО "Название компании"'
                            className="w-full border border-[#1A1612]/15 bg-[#F5F2EC]/50 px-4 py-3 text-sm focus:outline-none focus:border-[#B8962E] transition-colors" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-cormorant text-xl font-semibold mb-5 pb-2 border-b border-[#1A1612]/8">
                        Реквизиты оспариваемого приказа
                      </h3>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs tracking-wider text-[#1A1612]/50 mb-2 uppercase">Номер приказа *</label>
                          <input type="text" required value={form.orderNumber}
                            onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
                            placeholder="№ 45/к"
                            className="w-full border border-[#1A1612]/15 bg-[#F5F2EC]/50 px-4 py-3 text-sm focus:outline-none focus:border-[#B8962E] transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs tracking-wider text-[#1A1612]/50 mb-2 uppercase">Дата приказа *</label>
                          <input type="date" required value={form.orderDate}
                            onChange={(e) => setForm({ ...form, orderDate: e.target.value })}
                            className="w-full border border-[#1A1612]/15 bg-[#F5F2EC]/50 px-4 py-3 text-sm focus:outline-none focus:border-[#B8962E] transition-colors" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-cormorant text-xl font-semibold mb-5 pb-2 border-b border-[#1A1612]/8">
                        Суть обращения
                      </h3>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-xs tracking-wider text-[#1A1612]/50 mb-2 uppercase">Основания для отмены приказа *</label>
                          <textarea required rows={4} value={form.reason}
                            onChange={(e) => setForm({ ...form, reason: e.target.value })}
                            placeholder="Опишите, в чём заключается нарушение: нарушена процедура, превышены полномочия, применено несуществующее основание..."
                            className="w-full border border-[#1A1612]/15 bg-[#F5F2EC]/50 px-4 py-3 text-sm focus:outline-none focus:border-[#B8962E] transition-colors resize-none" />
                        </div>
                        <div>
                          <label className="block text-xs tracking-wider text-[#1A1612]/50 mb-2 uppercase">Ваше требование *</label>
                          <textarea required rows={3} value={form.demand}
                            onChange={(e) => setForm({ ...form, demand: e.target.value })}
                            placeholder="Прошу отменить приказ, восстановить в должности, выплатить компенсацию..."
                            className="w-full border border-[#1A1612]/15 bg-[#F5F2EC]/50 px-4 py-3 text-sm focus:outline-none focus:border-[#B8962E] transition-colors resize-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-8 py-6 bg-[#F5F2EC]/60 border-t border-[#1A1612]/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <button type="button" onClick={handleSaveDraft}
                      className="flex items-center gap-2 text-sm text-[#1A1612]/55 hover:text-[#B8962E] transition-colors">
                      <Icon name="Save" size={15} />
                      Сохранить черновик
                    </button>
                    <button type="submit"
                      className="px-10 py-3.5 bg-[#1A1612] text-white font-ibm text-sm tracking-widest hover:bg-[#B8962E] transition-colors duration-200">
                      ПОДАТЬ ЗАЯВЛЕНИЕ
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="bg-[#1A1612] border-t border-white/5 py-10">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border border-[#B8962E]/60 flex items-center justify-center">
                <Icon name="Scale" size={12} className="text-[#B8962E]" />
              </div>
              <span className="font-cormorant text-white/80 text-sm">
                Lex<span className="text-[#B8962E]">Forma</span>
              </span>
            </div>
            <p className="text-white/30 text-xs text-center">
              Юридическая помощь в трудовых спорах. Конфиденциальность гарантирована.
            </p>
            <div className="flex gap-6">
              {navItems.map(({ key, label }) => (
                <button key={key} onClick={() => navTo(key)}
                  className="text-white/30 hover:text-[#B8962E] text-xs tracking-wider transition-colors">
                  {label}
                </button>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
