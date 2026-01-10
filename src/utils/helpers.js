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

export async function openFile(filePath) {
  const { exec } = await import('child_process');
  const { platform } = process;

  let command;
  if (platform === 'win32') {
    command = `start "" "${filePath}"`;
  } else if (platform === 'darwin') {
    command = `open "${filePath}"`;
  } else {
    command = `xdg-open "${filePath}"`;
  }

  return new Promise((resolve, reject) => {
    exec(command, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}