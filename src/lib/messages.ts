export const catMessages = [
  // Affirmations
  "you are more than enough.",
  "the world is better because you're in it.",
  "rest is not laziness. rest is necessary.",
  "you don't have to earn softness.",
  "it's okay to just exist today.",
  "some things grow slowly. that's fine.",
  "you are allowed to change your mind.",
  "being gentle with yourself is not weakness.",
  "you are someone's favourite person.",
  "today doesn't have to be productive to be good.",
  "your feelings are valid, all of them.",
  "breathe. you're doing better than you think.",
  "small steps still count.",
  "you don't need to explain yourself.",
  "some days the bravest thing is getting up.",
  "there is no right way to be yourself.",
  "you are not behind. you are on your way.",
  "the quiet moments matter too.",
  "it's okay to not be okay.",
  "you deserve the love you give to others.",

  // Warm observations
  "you looked like you needed this.",
  "sometimes silence is the loudest comfort.",
  "not every day has to mean something.",
  "you don't have to hold it all together.",
  "you are more loved than you know.",
  "this too will become a memory.",
  "even the moon takes nights off.",
  "you've survived every bad day so far.",
  "healing isn't linear. that's okay.",
  "you don't owe anyone your energy.",
  "permission to do absolutely nothing: granted.",
  "your presence is enough. always has been.",
  "some flowers bloom late. they're still beautiful.",
  "you carry more grace than you give yourself credit for.",
  "it's okay to outgrow things that once fit.",
  "the stars don't rush. neither should you.",

  // Playful lines
  "i would headbutt you if i could.",
  "nothing to see here. just a cat.",
  "you smell nice today.",
  "i'm judging you. but with love.",
  "if i had thumbs, i'd give you two up.",
  "you're my favourite human. don't tell the others.",
  "i sat on this card for 20 minutes.",
  "i made this. you're welcome.",
  "consider yourself booped.",
  "i'd share my fish with you. maybe.",
  "this card was hard to carry. appreciate it.",

  // Cat sounds
  "hm.",
  "mrrp.",
  "...",
  "🧡",
  "*purrs*",
  "prrt?",
  "*slow blink*",
];

export const catSounds = ["mrrp.", "prrt.", "mew.", "hm.", "...", "*purr*", "mrrow?", "brrt.", "mew~"];

export const catReactions = {
  pet: ["*purrrr*", "mrrp.", "...nice.", "*closes eyes*", "*leans in*", "*slow blink*", "*melts*"],
  tap: ["hm?", "mrrow?", "*looks up*", "*ear twitch*", "what.", "*head tilt*", "oh?"],
  ignore: ["*stretches*", "*yawns*", "*curls tighter*", "zzz...", "*tail flick*"],
  longPress: ["*deep purr*", "*kneads*", "...thank you.", "*melts*", "*heavy eyes*", "*nuzzles*"],
  rapidTap: ["!!!", "*startled*", "*judges you*", "excuse me.", "*floof*", "rude.", "*the AUDACITY*"],
};

export function getRandomMessage(): string {
  return catMessages[Math.floor(Math.random() * catMessages.length)];
}

export function getRandomReaction(type: keyof typeof catReactions): string {
  const reactions = catReactions[type];
  return reactions[Math.floor(Math.random() * reactions.length)];
}

export function getRandomSound(): string {
  return catSounds[Math.floor(Math.random() * catSounds.length)];
}
