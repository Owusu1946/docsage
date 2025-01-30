export function filterSections(content, allowedSections) {
    const sections = content.split(/^#+ /m);
    return sections
      .filter(section => {
        const title = section.split('\n')[0].toLowerCase();
        return allowedSections.some(allowed => 
          title.includes(allowed.toLowerCase())
        );
      })
      .join('\n');
  }
  
  export function addEmojis(content) {
    const emojiMap = {
      'features': '✨',
      'installation': '📥',
      'usage': '🚀',
      'api': '📚',
      'contributing': '🤝',
      'license': '📄'
    };
  
    return content.replace(/^(#+\s*)(.*?)$/gm, (match, hashes, title) => {
      const lowercaseTitle = title.toLowerCase();
      const emoji = Object.entries(emojiMap).find(([key]) => 
        lowercaseTitle.includes(key)
      );
      return emoji ? `${hashes}${emoji[1]} ${title}` : match;
    });
  }