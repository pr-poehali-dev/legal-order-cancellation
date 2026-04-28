import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HomePage from "@/components/HomePage";
import ProcedurePage from "@/components/ProcedurePage";
import FormPage from "@/components/FormPage";
import { Section, FormData, DraftData, NAV_ITEMS, saveDraft, loadDraft, clearDraft } from "@/lib/types";
import Icon from "@/components/ui/icon";

const EMPTY_FORM: FormData = {
  fullName: "", position: "", orderNumber: "",
  orderDate: "", employer: "", reason: "", demand: "",
};

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [draftInfo, setDraftInfo] = useState<DraftData | null>(null);
  const [draftRestored, setDraftRestored] = useState(false);
  const [savedNow, setSavedNow] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const draft = loadDraft();
    if (draft) setDraftInfo(draft);
  }, []);

  const navTo = (s: Section) => {
    setSection(s);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const handleNewForm = () => {
    setSubmitted(false);
    setForm(EMPTY_FORM);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EC] font-ibm text-[#1A1612]">
      <Navbar
        section={section}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navTo={navTo}
      />

      <div className="pt-16">
        {section === "home" && <HomePage navTo={navTo} />}
        {section === "procedure" && <ProcedurePage navTo={navTo} />}
        {section === "form" && (
          <FormPage
            form={form}
            setForm={setForm}
            draftInfo={draftInfo}
            draftRestored={draftRestored}
            savedNow={savedNow}
            submitted={submitted}
            onRestoreDraft={handleRestoreDraft}
            onClearDraft={handleClearDraft}
            onSaveDraft={handleSaveDraft}
            onSubmit={handleSubmit}
            onNewForm={handleNewForm}
          />
        )}

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
              {NAV_ITEMS.map(({ key, label }) => (
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
