import { logEvent, AnalyticsCallOptions } from "firebase/analytics";
import { analytics } from "./database";
import { AnalyticsEvent } from "./analytics-event";

export const handleAnalytics = (
  event: keyof typeof AnalyticsEvent,
  eventParams?: {
    [key: string]: any;
  },
  options?: AnalyticsCallOptions
): void => {
  logEvent(analytics, event, eventParams, options);
};

export const getFileExtension = (file: File) => file.name.split(".").pop();

export const makeId = () => (Math.random() + 1).toString(36).substring(6);

export interface ShareableData {
  options: IOptions;
  fileUrl: string;
  text: string;
}

export interface IOptions {
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  backgroundSize: "cover" | "contain" | "auto";
}

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const defaultOptions: IOptions = {
  fontSize: 12,
  letterSpacing: 0,
  lineHeight: 8,
  backgroundSize: "cover",
};

export const trimText = (text: string, options: IOptions) => {
  let max = 7500;
  if (options.letterSpacing < -1) max = 20000;
  else if (options.fontSize < 8 || options.lineHeight < 4) max = 15500;
  else if (options.fontSize < 10 || options.lineHeight < 6) max = 12000;
  else if (options.fontSize < 12 || options.lineHeight < 8) max = 10000;

  const og = text.split(" ");
  const ogLen = og.length;
  if (ogLen > max) {
    return og.slice(0, max).join(" ");
  }

  let i = 0;
  const words = text.split(" ");
  let len = words.length;

  while (len < max) {
    words.push(words[i]);
    if (i > ogLen - 1) i = 0;
    else i++;

    len++;
  }

  return words.join(" ");
};

export const defaultText = `
Aking sinta, ano ba'ng mayro'n sa iyo?
'Pag nakikita ka na, bumabagal ang mundo
'Pag ngumingiti ka, para bang may iba
'Pag tumitingin sa 'kin, mapupungay mong mga mata
Wala akong takas sa nakakalunod mong ganda, ha
Halika nga (ha, ha, ha)
Tingnan mo lang ang aking mga mata
'Wag kang titingin na sa iba
Akin ka na, wala nang iba (ha, ha, ha)
Andito 'ko hanggang sa 'ting pagtanda
Mamahalin kita basta't 'pag nahulog
Nakahawak ako, 'wag ka lang bibitaw
Habang-buhay na ako'y iyo
Wala nang ibang nakagawa sa 'kin nang ganito
Kundi ikaw, nag-iisang diyosa ng buhay ko
'Wag ka nang matakot, 'wag kang mangamba
Andito ako 'pag ika'y mag-isa
Wala akong takas sa nakakalunod mong ganda, ha
Halika nga (ha, ha, ha)
Tingnan mo lang ang aking mga mata
'Wag kang titingin na sa iba
Akin ka na, wala nang iba (ha, ha, ha)
Andito 'ko hanggang sa 'ting pagtanda
Mamahalin kita basta't pag nahulog
Nakahawak ako, 'wag ka lang bibitaw
Habang-buhay na ako'y iyo
Kahit ang likod mo'y kubang-kuba na
Kahit ang ulo mo'y puro uban na
Isasayaw ka hanggang sa pikit na ang ating mga mata (ha, ha, ha)
Wala naman na 'kong hiling pa
Basta't kasama ka, habang-buhay na kuntento ako
Basta't ikaw lang kasama, ikaw kasama ko
Aking sinta, ano ba'ng mayro'n sa iyo?
'Pag nakikita ka na, bumabagal ang mundo
Tingnan mo lang ang aking mga mata
'Wag kang titingin na sa iba
Akin ka na, wala nang iba (ha, ha, ha)
Andito 'ko hanggang sa 'ting pagtanda
Mamahalin kita basta't 'pag nahulog
Nakahawak ako, 'wag ka lang bibitaw
Habang-buhay na ako'y iyo
Tingnan mo lang ang aking mga mata
'Wag kang titingin na sa iba
Akin ka na, wala nang iba`;
