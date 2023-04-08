const langContentText = {
  becauseYouLiked: { en: "Because you liked a post from" },
  follow: { en: "Follow" },
  viewAllComments: { en: "View all" },
  likedBy: { en: "Liked by" },
  reels: { en: "Reels" },
  sponsored: { en: "sponsored" },
  suggestedForYou: { en: "Suggested for you" },
  profilePictureAlt: { en: "profile picture" },
} satisfies Record<string, Record<SuppportedLanguage, string>>

/**
 * Currently only english is supported
 */
const currentLanguage: SuppportedLanguage = "en"

export const language = getLanguageText(currentLanguage)

function getLanguageText(lang: SuppportedLanguage) {
  const texts = {}

  for (const key in langContentText) {
    // @ts-expect-error
    texts[key] = langContentText[key][lang]
  }

  return texts as Record<keyof typeof langContentText, string>
}

type SuppportedLanguage = "en"
