import React, { useState } from 'react';
import styles from './CodeBlock.module.css';

export default function CodeBlock({ tabs, repoLink }) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const currentTab = tabs[activeTab];
  const fullCommand = currentTab.commands.map(cmd => cmd.code).join('\n');

  return (
    <div className={styles.codeBlockWrapper}>
      {tabs.length > 1 && (
        <div className={styles.tabs}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`${styles.tab} ${activeTab === index ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div className={styles.codeBlockContainer}>
        <div className={styles.terminalBar}>
          <div className={styles.lights} aria-hidden="true">
            <span className={`${styles.light} ${styles.red}`} />
            <span className={`${styles.light} ${styles.yellow}`} />
            <span className={`${styles.light} ${styles.green}`} />
          </div>
          <span className={styles.path}>~/index</span>
        </div>

        <div className={styles.commandList}>
          {currentTab.commands.map((cmd, index) => (
            <div key={index} className={styles.commandRow}>
              {cmd.comment && (
                <div className={styles.comment}>{cmd.comment}</div>
              )}
              <code className={styles.command}>
                {cmd.parts ? (
                  cmd.parts.map((part, i) => (
                    <span key={i} className={styles[part.type] || ''}>
                      {part.text}
                    </span>
                  ))
                ) : (
                  cmd.code
                )}
              </code>
            </div>
          ))}
        </div>

        <button
          className={styles.copyButton}
          onClick={() => copyToClipboard(fullCommand)}
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13.5 4.5L6 12L2.5 8.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <rect
                  x="5" y="5" width="9" height="9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M3 11V3C3 2.44772 3.44772 2 4 2H10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {repoLink && (
        <a
          href={repoLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.repoButton}
        >
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          View on GitHub
        </a>
      )}
    </div>
  );
}
