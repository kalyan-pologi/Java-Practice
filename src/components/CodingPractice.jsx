import { useState } from 'react';
import Editor, { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import 'monaco-editor/esm/vs/basic-languages/java/java.contribution';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import Navigator from './Navigator';
import TopicFilter from './TopicFilter';
self.MonacoEnvironment = { getWorker: () => new EditorWorker() };
loader.config({ monaco });

export default function CodingPractice({ challenges, active }) {
  const [topic, setTopic] = useState('All');
  const [selected, setSelected] = useState(challenges[0].id);
  const [drafts, setDrafts] = useState({});
  const [templates, setTemplates] = useState({});
  const filtered = challenges.filter(question => topic === 'All' || question.topic === topic);
  const question = filtered.find(question => question.id === selected) || filtered[0];
  const current = question?.id;
  const index = filtered.indexOf(question);
  const template = templates[current] || 'starter';
  const base = template === 'starter' ? question?.starter : '';
  const code = drafts[current] ?? base;
  function changeTemplate(value) {
    if (value === template) return;
    if (!window.confirm('Switch code template? This replaces your current draft for this challenge.')) return;
    setTemplates(previous => ({ ...previous, [current]: value }));
    setDrafts(previous => ({ ...previous, [current]: value === 'starter' ? question.starter : '' }));
  }
  function reset() {
    if (window.confirm('Reset this challenge to the selected code template?')) setDrafts(previous => ({ ...previous, [current]: base }));
  }
  return <section aria-label="Coding practice">
    <div className="toolbar"><TopicFilter value={topic} onChange={setTopic} /></div>
    <div className="layout"><aside className="panel"><h2>Challenges</h2><Navigator key={topic} items={filtered} current={current} onSelect={setSelected} pageSize={20} /></aside>
    {question ? <article className="panel"><div className="meta">Challenge {current} | {question.topic} | {question.difficulty}</div><h2>{question.title}</h2><p className="muted">{question.environment}</p><p>{question.statement}</p><h3>Expected output / behavior</h3><pre><code>{question.expected}</code></pre>
    <div className="toolbar"><label>Code template <select value={template} onChange={event => changeTemplate(event.target.value)}><option value="starter">Starter Code</option><option value="empty">Empty Code</option></select></label><button onClick={reset}>Reset code</button></div>
    <div className="editor" aria-label="Java code editor">{active && <Editor height="380px" path={`challenge-${current}.java`} language="java" theme="vs-dark" value={code} onChange={value => setDrafts(previous => ({ ...previous, [current]: value ?? '' }))} loading={<p>Loading Java editor...</p>} options={{ minimap: { enabled: false }, fontSize: 14, scrollBeyondLastLine: false, automaticLayout: true, tabSize: 4, wordWrap: 'on' }} />}</div>
    <div className="toolbar"><button disabled aria-describedby="execution-note">Run Code</button><button disabled aria-describedby="execution-note">Run Tests</button></div><p id="execution-note" className="muted">Java execution is not connected.</p>
    <details key={`context-${current}`}><summary>Requirements and checks</summary><p>{question.notes}</p></details>
    <details key={`hint-${current}`}><summary>Optional pseudocode</summary><p>{question.pseudocode}</p></details><details key={`solution-${current}`}><summary>Reveal solution</summary><pre><code>{question.solution}</code></pre></details>
    <div className="pagination"><button disabled={index === 0} onClick={() => setSelected(filtered[index - 1].id)}>Previous</button><span>{index + 1} of {filtered.length}</span><button disabled={index === filtered.length - 1} onClick={() => setSelected(filtered[index + 1].id)}>Next</button></div>
    </article> : <article className="panel"><h2>No challenges match this topic</h2><p>Select another topic to continue.</p></article>}</div>
  </section>;
}
