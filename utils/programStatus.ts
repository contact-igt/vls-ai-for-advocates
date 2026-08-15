export const PRICE_ANNOUNCEMENT_TEXT = "Price will be announced shortly.";
export const DATE_TIME_ANNOUNCEMENT_TEXT = "Date and time will be announced shortly.";

export interface ProgramConfig {
  sessionStatus?: string;
  classStartAt?: string;
  date?: string;
  time?: string;
  fee?: number;
  [key: string]: unknown;
}

export const isRegistrationOpen = (programConfig?: ProgramConfig): boolean => {
  if (programConfig?.sessionStatus !== "announced") return false;
  if (!programConfig?.classStartAt) return false;

  const classStartDate = new Date(programConfig.classStartAt);
  if (Number.isNaN(classStartDate.getTime())) return false;

  return new Date() < classStartDate;
};

export const isWaitlistMode = (programConfig?: ProgramConfig): boolean => {
  return !isRegistrationOpen(programConfig);
};

export const getPrimaryCtaText = (programConfig?: ProgramConfig): string => {
  return isRegistrationOpen(programConfig) ? "Register Here" : "Join Waitlist";
};

export const getSectionCtaText = (
  programConfig?: ProgramConfig,
  fallback: string = "Register Now"
): string => {
  return isRegistrationOpen(programConfig) ? fallback : "Join Waitlist";
};

export const getSessionDisplay = (programConfig?: ProgramConfig): string => {
  if (!isRegistrationOpen(programConfig)) return DATE_TIME_ANNOUNCEMENT_TEXT;

  return programConfig?.date && programConfig?.time
    ? `${programConfig.date} - ${programConfig.time}`
    : DATE_TIME_ANNOUNCEMENT_TEXT;
};

export const getProgramDate = (programConfig?: ProgramConfig): string => {
  if (!isRegistrationOpen(programConfig)) {
    return "TBA";
  }
  return (programConfig?.date as string) || (programConfig?.programm_date as string) || "TBA";
};

