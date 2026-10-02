// Everything shown in the YouTube section. Edit freely, it's all plain text.
export const channel = {
  host: 'Sandy',
  hello: 'Hi, I\'m Sandy 👋',
  intro: 'I make WoW Geography from Bengaluru. Thoda geography, thoda sarcasm, and a lot of flags drawn with way too much confidence.',
  language: 'Videos in Hinglish',
  subscribers: 'Almost 50K subscribers', // update as the channel grows
  signoff: 'See you in the comments!'
};

// playlist: paste a playlist link to send people straight to that series (empty = channel page)
// art: 'flags' | 'facts' | 'versus' | 'basics'
// note: Sandy's handwritten comment on the card
export const youtubeSeries = [
  { id: 'flags', title: 'Drawing Flags from Memory', blurb: 'No reference, just a pen and a lot of confidence. Europe Edition is on the way.', note: 'My USA had 7 stars. I stand by it.', playlist: '', art: 'flags' },
  { id: 'facts', title: 'Geography Facts', blurb: 'Short videos with the facts that make you say "wait, really?"', note: 'Pause on fact #4. Trust me.', playlist: '', art: 'facts' },
  { id: 'versus', title: 'Country vs Country', blurb: 'Two countries, one question: who wins on size, people, borders and more.', note: 'The comments get spicy on these.', playlist: '', art: 'versus' },
  { id: 'basics', title: 'Basic Geography for Adults', blurb: 'The stuff school skipped, explained without making you feel silly.', note: 'The series I wish I had in school.', playlist: '', art: 'basics' }
];