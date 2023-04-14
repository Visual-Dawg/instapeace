const supportedLanguages = ["en"] as const
type SupportedLanguage = (typeof supportedLanguages)[number]

const languageContent = {
  becauseYouLiked: { en: "Because you liked a post from" },
  follow: { en: "Follow" },
  viewAllComments: { en: "View all" },
  likedBy: { en: "Liked by" },
  reels: { en: "Reels" },
  sponsored: { en: "sponsored" },
  suggestedForYou: { en: "Suggested for you" },
  profilePictureAlt: { en: "profile picture" },
  photoBy: { en: "Photo by " },
} as const satisfies Record<string, Record<SupportedLanguage, string>>

const currentLanguage = getCurrentLanguage()

export const isLanguageSupported = supportedLanguages.includes(
  currentLanguage as SupportedLanguage
)
/**
 * Currently only english is supported
 */
export const language = getLanguageText(currentLanguage, "en", languageContent)

export function getCurrentLanguage(): string {
  return document.documentElement.lang
}

function getLanguageText(
  language_: string,
  fallbackLanguage: SupportedLanguage,
  content: typeof languageContent
) {
  const texts = {}
  const usedLanguage = isLanguageSupported ? language_ : fallbackLanguage

  for (const key in languageContent) {
    // @ts-expect-error
    texts[key] = content[key][usedLanguage]
  }

  return texts as Record<keyof typeof languageContent, string>
}
