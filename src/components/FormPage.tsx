import { useState } from "react";
import Icon from "@/components/ui/icon";
import { DraftData, FormData, formatDate } from "@/lib/types";

const SEND_EMAIL_URL = "https://functions.poehali.dev/1fd43f43-be7e-4ec7-bab0-95e7cc4277b8";

interface FormPageProps {
  form: FormData;
  setForm: (form: FormData) => void;
  draftInfo: DraftData | null;
  draftRestored: boolean;
  savedNow: boolean;
  submitted: boolean;
  onRestoreDraft: () => void;
  onClearDraft: () => void;
  onSaveDraft: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onNewForm: () => void;
}

export default function FormPage({
  form, setForm,
  draftInfo, draftRestored, savedNow, submitted,
  onRestoreDraft, onClearDraft, onSaveDraft, onSubmit, onNewForm,
}: FormPageProps) {
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(null);
    setSending(true);
    try {
      const res = await fetch(SEND_EMAIL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Ошибка отправки");
      }
      onSubmit(e);
    } catch (err: unknown) {
      setSendError(err instanceof Error ? err.message : "Не удалось отправить заявление. Попробуйте позже.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="min-h-screen py-20 bg-[#F5F2EC]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#B8962E]" />
            <span className="text-[#B8962E] text-xs tracking-[0.3em]">ОНЛАЙН-ЗАЯВЛЕНИЕ</span>
          </div>
          <h1 className="font-cormorant text-5xl font-semibold text-[#1A1612] leading-tight">
            Заявление на отмену<br />
            <span className="italic text-[#8B6914]">судебного приказа</span>
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
                <button onClick={onRestoreDraft} className="text-xs px-4 py-2 bg-[#B8962E] text-white hover:bg-[#D4AF5A] transition-colors">
                  Восстановить
                </button>
                <button onClick={onClearDraft} className="text-xs px-4 py-2 border border-[#1A1612]/20 text-[#1A1612]/60 hover:border-[#1A1612]/40 transition-colors">
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
              Ваше заявление принято в работу. Копия отправлена на <strong>{form.email}</strong>. Юрист свяжется с вами в течение рабочего дня.
            </p>
            <button
              onClick={onNewForm}
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
                  <div className="md:col-span-2">
                    <label className="block text-xs tracking-wider text-[#1A1612]/50 mb-2 uppercase">Ваш email *</label>
                    <input type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="example@mail.ru"
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

            {sendError && (
              <div className="mx-8 mb-4 flex items-center gap-3 text-sm text-red-700 bg-red-50 border border-red-200 px-5 py-3">
                <Icon name="AlertCircle" size={16} className="text-red-500 shrink-0" />
                {sendError}
              </div>
            )}

            <div className="px-8 py-6 bg-[#F5F2EC]/60 border-t border-[#1A1612]/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <button type="button" onClick={onSaveDraft}
                className="flex items-center gap-2 text-sm text-[#1A1612]/55 hover:text-[#B8962E] transition-colors">
                <Icon name="Save" size={15} />
                Сохранить черновик
              </button>
              <button type="submit" disabled={sending}
                className="px-10 py-3.5 bg-[#1A1612] text-white font-ibm text-sm tracking-widest hover:bg-[#B8962E] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
                {sending && <Icon name="Loader" size={15} className="animate-spin" />}
                {sending ? "ОТПРАВКА..." : "ПОДАТЬ ЗАЯВЛЕНИЕ"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
