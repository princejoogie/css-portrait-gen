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

export interface IOptions {
  fontSize: number;
  fontSpacing: number;
  lineHeight: number;
  objectFit: "cover" | "contain" | "auto";
}

export const defaultOptions: IOptions = {
  fontSize: 12,
  fontSpacing: 0,
  lineHeight: 8,
  objectFit: "cover",
};

export const trimText = (text: string) => {
  const max = 5000;
  const og = text.split(" ");
  const oglen = og.length;
  if (oglen > max) {
    return og.slice(0, max).join(" ");
  }

  let i = 0;
  const words = text.split(" ");
  let len = words.length;

  while (len < max) {
    words.push(words[i]);
    if (i > oglen - 1) i = 0;
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
