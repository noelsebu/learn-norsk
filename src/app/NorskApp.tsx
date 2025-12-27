'use client';

import { useState } from 'react';
import { VOCAB } from '@/data/vocabulary';
import { GRAMMAR, PHRASES, EXERCISES, DIALOGUES, READING } from '@/data/content';
import styles from './NorskApp.module.css';

type Section = 'vocab' | 'grammar' | 'phrases' | 'exercises' | 'dialogues' | 'reading';

export default function NorskApp() {
  const [activeSection, setActiveSection] = useState<Section>('vocab');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Object.keys(VOCAB);
  const vocabItems = selectedCategory ? VOCAB[selectedCategory] : Object.values(VOCAB).flat();
  const filtered = vocabItems.filter(word =>
    word.n.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.e.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.app}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>Lær Norsk</h1>
        <p>Interactive Norwegian Learning App</p>
      </header>

      <nav style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {(['vocab', 'grammar', 'phrases', 'exercises', 'dialogues', 'reading'] as Section[]).map(section => (
          <button
            key={section}
            onClick={() => {
              setActiveSection(section);
              setSearchTerm('');
            }}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: activeSection === section ? 'var(--primary)' : 'var(--border)',
              color: activeSection === section ? 'white' : 'var(--text)',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: activeSection === section ? '600' : '400',
            }}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </nav>

      <div className={styles.section}>
        {activeSection === 'vocab' && (
          <>
            <h2>Vocabulary</h2>
            <input
              type="text"
              placeholder="Search Norwegian or English..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginBottom: '1rem',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
                fontSize: '1rem',
              }}
            />
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: selectedCategory === null ? 'var(--secondary)' : 'var(--border)',
                  color: selectedCategory === null ? 'white' : 'var(--text)',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                }}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: selectedCategory === cat ? 'var(--secondary)' : 'var(--border)',
                    color: selectedCategory === cat ? 'white' : 'var(--text)',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {filtered.slice(0, 100).map((word, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f9fafb',
                  }}
                >
                  <div style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {word.n}
                  </div>
                  <div style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{word.e}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>/{word.p}/</div>
                  {word.g && <div style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Gender: {word.g}</div>}
                  <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#0891b2' }}>CEFR: {word.l}</div>
                </div>
              ))}
            </div>
            {filtered.length === 0 && <p>No words found.</p>}
          </>
        )}

        {activeSection === 'grammar' && (
          <>
            <h2>Grammar</h2>
            <p>Grammar rules and explanations coming soon...</p>
            <pre style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto' }}>
              {JSON.stringify(GRAMMAR, null, 2).substring(0, 500)}...
            </pre>
          </>
        )}

        {activeSection === 'phrases' && (
          <>
            <h2>Phrases & Expressions</h2>
            <p>Common phrases and idioms coming soon...</p>
          </>
        )}

        {activeSection === 'exercises' && (
          <>
            <h2>Exercises</h2>
            <p>Interactive exercises coming soon...</p>
          </>
        )}

        {activeSection === 'dialogues' && (
          <>
            <h2>Dialogues</h2>
            <p>Real-world dialogue examples coming soon...</p>
          </>
        )}

        {activeSection === 'reading' && (
          <>
            <h2>Reading Comprehension</h2>
            <p>Reading texts with translations coming soon...</p>
          </>
        )}
      </div>
    </div>
  );
}
