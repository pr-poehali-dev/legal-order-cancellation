export type Section = "home" | "procedure" | "form";

export interface DraftData {
  fullName: string;
  position: string;
  orderNumber: string;
  orderDate: string;
  employer: string;
  reason: string;
  demand: string;
  savedAt: string;
}

export type FormData = Omit<DraftData, "savedAt">;

export const NAV_ITEMS: { key: Section; label: string }[] = [
  { key: "home", label: "Главная" },
  { key: "procedure", label: "Процедура" },
  { key: "form", label: "Подать заявление" },
];

const DRAFT_KEY = "appeal_form_draft";

export const saveDraft = (data: FormData): DraftData => {
  const draft: DraftData = { ...data, savedAt: new Date().toISOString() };
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  return draft;
};

export const loadDraft = (): DraftData | null => {
  const raw = localStorage.getItem(DRAFT_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
};

export const clearDraft = () => localStorage.removeItem(DRAFT_KEY);

export const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
};
