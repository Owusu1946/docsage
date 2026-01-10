import { diffLines, createPatch } from 'diff';
import chalk from 'chalk';

/**
 * Generate a colorized diff between two strings
 * @param {string} oldContent - The original content
 * @param {string} newContent - The new content
 * @param {string} filename - The filename for the patch header
 * @returns {object} - Diff result with formatted output and statistics
 */
export function generateDiff(oldContent, newContent, filename = 'README.md') {
    const changes = diffLines(oldContent, newContent);

    let added = 0;
    let removed = 0;
    let formattedLines = [];

    changes.forEach((part) => {
        const lines = part.value.split('\n').filter(line => line !== '' || part.added || part.removed);

        lines.forEach((line) => {
            if (part.added) {
                added++;
                formattedLines.push(chalk.green(`+ ${line}`));
            } else if (part.removed) {
                removed++;
                formattedLines.push(chalk.red(`- ${line}`));
            } else {
                formattedLines.push(chalk.gray(`  ${line}`));
            }
        });
    });

    return {
        formatted: formattedLines.join('\n'),
        stats: {
            added,
            removed,
            total: added + removed
        },
        hasChanges: added > 0 || removed > 0
    };
}

/**
 * Generate a unified diff patch
 * @param {string} oldContent - The original content
 * @param {string} newContent - The new content
 * @param {string} filename - The filename for the patch header
 * @returns {string} - Unified diff patch
 */
export function generatePatch(oldContent, newContent, filename = 'README.md') {
    return createPatch(filename, oldContent, newContent, 'original', 'generated');
}

/**
 * Display a summary of changes
 * @param {object} stats - Stats object from generateDiff
 * @returns {string} - Formatted summary
 */
export function formatDiffSummary(stats) {
    const parts = [];

    if (stats.added > 0) {
        parts.push(chalk.green(`+${stats.added} additions`));
    }
    if (stats.removed > 0) {
        parts.push(chalk.red(`-${stats.removed} deletions`));
    }

    if (parts.length === 0) {
        return chalk.gray('No changes');
    }

    return parts.join(', ');
}

/**
 * Generate a compact diff view showing only changed sections
 * @param {string} oldContent - The original content
 * @param {string} newContent - The new content
 * @param {number} contextLines - Number of context lines to show around changes
 * @returns {string} - Compact diff view
 */
export function generateCompactDiff(oldContent, newContent, contextLines = 3) {
    const changes = diffLines(oldContent, newContent);
    let result = [];
    let lineNumber = 1;
    let hasShownDivider = false;

    changes.forEach((part, index) => {
        const lines = part.value.split('\n').filter(l => l !== '');

        if (part.added || part.removed) {
            // Show changes with line numbers
            lines.forEach((line) => {
                if (part.added) {
                    result.push(chalk.green(`${String(lineNumber).padStart(4)} + │ ${line}`));
                    lineNumber++;
                } else {
                    result.push(chalk.red(`${String(lineNumber).padStart(4)} - │ ${line}`));
                }
            });
            hasShownDivider = false;
        } else {
            // Context lines
            if (lines.length > contextLines * 2) {
                // Show first few context lines
                lines.slice(0, contextLines).forEach((line) => {
                    result.push(chalk.gray(`${String(lineNumber).padStart(4)}   │ ${line}`));
                    lineNumber++;
                });

                // Show divider
                if (!hasShownDivider) {
                    const skipped = lines.length - contextLines * 2;
                    result.push(chalk.dim(`     ... │ ${skipped} lines hidden ...`));
                    hasShownDivider = true;
                }

                // Skip to last few lines
                lineNumber += lines.length - contextLines * 2;

                // Show last few context lines
                lines.slice(-contextLines).forEach((line) => {
                    result.push(chalk.gray(`${String(lineNumber).padStart(4)}   │ ${line}`));
                    lineNumber++;
                });
            } else {
                lines.forEach((line) => {
                    result.push(chalk.gray(`${String(lineNumber).padStart(4)}   │ ${line}`));
                    lineNumber++;
                });
            }
        }
    });

    return result.join('\n');
}

/**
 * Get section-level diff for README files
 * @param {string} oldContent - The original content  
 * @param {string} newContent - The new content
 * @returns {object} - Section-level changes
 */
export function getSectionChanges(oldContent, newContent) {
    const parseToSections = (content) => {
        const sections = {};
        let currentSection = 'header';
        let currentContent = [];

        content.split('\n').forEach(line => {
            if (line.match(/^#{1,6}\s/)) {
                if (currentContent.length > 0) {
                    sections[currentSection] = currentContent.join('\n');
                }
                currentSection = line.replace(/^#+\s*/, '').trim();
                currentContent = [line];
            } else {
                currentContent.push(line);
            }
        });

        if (currentContent.length > 0) {
            sections[currentSection] = currentContent.join('\n');
        }

        return sections;
    };

    const oldSections = parseToSections(oldContent);
    const newSections = parseToSections(newContent);

    const allSections = new Set([...Object.keys(oldSections), ...Object.keys(newSections)]);

    const changes = {
        added: [],
        removed: [],
        modified: [],
        unchanged: []
    };

    allSections.forEach(section => {
        if (!oldSections[section] && newSections[section]) {
            changes.added.push(section);
        } else if (oldSections[section] && !newSections[section]) {
            changes.removed.push(section);
        } else if (oldSections[section] !== newSections[section]) {
            changes.modified.push(section);
        } else {
            changes.unchanged.push(section);
        }
    });

    return changes;
}
