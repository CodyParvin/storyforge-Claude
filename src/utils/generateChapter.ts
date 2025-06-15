
export const generateChapter = async (prompt: string, model: string): Promise<string> => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 3000));

  // Mock chapter generation with varied content
  const mockChapters = [
    `The morning mist clung to the ancient cobblestones as **${Math.random() > 0.5 ? 'Aria' : 'the protagonist'}** stepped into the courtyard. The weight of destiny pressed upon their shoulders like a shroud of starlight.

### The Discovery

_Something was wrong._ The usual bustle of the market square had been replaced by an eerie silence that seemed to whisper of forgotten secrets. Every shadow held the promise of danger, every doorway concealed mysteries that had slumbered for centuries.

"You're late," came a voice from the darkness, smooth as silk yet sharp as winter's blade. The figure that emerged wore robes that seemed to absorb the very light around them, creating a void in the fabric of reality itself.

The confrontation that followed would change everything. Words were exchanged like sword strikes, each revelation cutting deeper than the last. Trust, once solid as mountain stone, began to crumble like ancient parchment in the rain.

### The Choice

Standing at the crossroads of fate, our hero faced the most difficult decision of their young life. The path ahead branched into infinite possibilities, each one fraught with peril and promise in equal measure.

As the chapter drew to a close, the distant sound of thunder rolled across the horizon, carrying with it the scent of change and the whisper of adventures yet to come.`,

    `The tavern erupted into chaos as **steel met steel** in a symphony of violence and desperation. Tables overturned, sending tankards of ale crashing to the floor in foamy cascades that mixed with the crimson drops of spilled blood.

### The Battle

Through the melee, our protagonist fought with the grace of a dancer and the fury of a storm. Each movement was calculated, each strike purposeful, as they carved a path through their enemies like lightning splits the night sky.

_"This ends now!"_ they bellowed above the din, their voice carrying the weight of conviction and the promise of justice. The blade in their hand gleamed with an otherworldly light, pulsing in rhythm with their heartbeat.

The antagonist's laughter echoed through the chaos, cold and mocking. "You think you can stop what has already begun? The wheels of fate turn for no one, not even heroes."

### The Revelation

But as the dust settled and the last enemy fell, a terrible truth emerged from the shadows. Everything they had believed, everything they had fought for, was built upon a foundation of lies as fragile as morning frost.

The chapter concluded with our hero standing alone amidst the wreckage, their world forever changed by the weight of knowledge they never wanted to bear.`,

    `The ancient library stretched endlessly into shadow, its towering shelves disappearing into darkness above. **Candlelight flickered** across leather-bound tomes that held the accumulated wisdom of ages, their pages yellow with time and heavy with secrets.

### The Search

Each step echoed through the vast chamber like a heartbeat in the silence. Dust motes danced in shafts of moonlight that filtered through stained glass windows, creating patterns of color that seemed to shift and move with a life of their own.

_The book they sought was here somewhere._ Hidden among thousands of volumes, waiting to reveal the truth that would either save their world or damn it to eternal darkness. The weight of responsibility pressed down like a physical force.

Suddenly, a whisper emerged from the shadows—not quite a voice, but something older and more primal. The very air seemed to thicken with anticipation as ancient magics stirred from their slumber.

### The Guardian

What they encountered in those depths between the shelves would test not only their courage but their very sanity. Some knowledge was never meant for mortal minds, some truths too terrible to comprehend.

The chapter ended with the sound of turning pages and the soft whisper of fate rewriting itself in the margins of reality.`
  ];

  // Return a random chapter with some dynamic elements
  return mockChapters[Math.floor(Math.random() * mockChapters.length)];
};
