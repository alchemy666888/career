"use client";

import { useState } from "react";
import { CareerIcon } from "./icons";

const questions = [
  "Tell me about a product decision you changed after user research.",
  "How do you balance user needs, business goals, and technical constraints?",
  "Describe a time you influenced a team without direct authority."
];

const checklist = [
  "Review the role requirements and success metrics",
  "Prepare two STAR stories with measurable outcomes",
  "Research Northstar AI's product and customers",
  "Write thoughtful questions for the interview panel"
];

export function InterviewPrepPage() {
  const [question, setQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [notes, setNotes] = useState("");
  const [completed, setCompleted] = useState<number[]>([]);

  function generateFeedback() {
    if (!answer.trim()) {
      setFeedback("Start with a brief answer, then we can help you make it more specific.");
      return;
    }
    const wordCount = answer.trim().split(/\s+/).length;
    setFeedback(`Feedback for your ${wordCount}-word draft: add a concrete outcome, name your contribution, and close with what you learned.`);
  }

  function nextQuestion() {
    setQuestion((current) => (current + 1) % questions.length);
    setAnswer("");
    setFeedback("");
  }

  function toggleChecklist(index: number) {
    setCompleted((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index]);
  }

  return <>
    <section className="career-page-banner career-container interview-hero">
      <span className="interview-kicker"><CareerIcon name="mic" /> Interview preparation</span>
      <h1 className="career-page-title">Practice with purpose.</h1>
      <p className="career-lede small">Prepare clear, evidence-based answers for your upcoming Product Designer interview at Northstar AI.</p>
    </section>
    <section className="career-container interview-summary">
      <article><span>Next interview</span><strong>Thu, Jul 16 · 10:00 AM</strong><p>Hiring manager conversation · 45 min</p></article>
      <article><span>Role</span><strong>Senior Product Designer</strong><p>Northstar AI · Remote</p></article>
      <article><span>Readiness</span><strong>{Math.round((completed.length / checklist.length) * 100)}%</strong><p>{completed.length} of {checklist.length} preparation steps complete</p></article>
    </section>
    <section className="career-container interview-workspace">
      <div className="interview-main">
        <article className="career-panel interview-panel">
          <div className="career-panel-bar"><div><span className="interview-label">Practice question {question + 1} of {questions.length}</span><h2>{questions[question]}</h2></div><button className="career-tool" type="button" onClick={nextQuestion}>Next question</button></div>
          <div className="interview-answer"><label htmlFor="interview-answer">Draft your answer</label><textarea id="interview-answer" value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Use the situation, task, action, and result to structure your response." /><div className="interview-answer-actions"><span>Tip: lead with context, then focus on your contribution.</span><button className="career-btn" type="button" onClick={generateFeedback}><CareerIcon name="bolt" />Get feedback</button></div>{feedback && <p className="interview-feedback" role="status">{feedback}</p>}</div>
        </article>
        <article className="career-panel interview-panel">
          <div className="career-panel-bar"><div><span className="interview-label">Your evidence</span><h2>Stories worth using</h2></div></div>
          <div className="interview-stories"><article><strong>Onboarding redesign</strong><p>Led discovery and prototyping that increased activation by 22%.</p><span>Research · Product strategy · Impact</span></article><article><strong>Design system rollout</strong><p>Built shared patterns with engineering that reduced UI delivery time by 30%.</p><span>Collaboration · Systems thinking · Delivery</span></article><article><strong>Accessibility improvement</strong><p>Turned usability feedback into practical changes across a complex workflow.</p><span>User advocacy · Problem solving · Craft</span></article></div>
        </article>
      </div>
      <aside className="interview-sidebar">
        <article className="career-panel interview-panel"><div className="career-panel-bar"><div><span className="interview-label">Preparation plan</span><h2>Before the call</h2></div></div><div className="interview-checklist">{checklist.map((item, index) => <label key={item}><input type="checkbox" checked={completed.includes(index)} onChange={() => toggleChecklist(index)} /><span>{item}</span></label>)}</div></article>
        <article className="career-panel interview-panel"><div className="career-panel-bar"><div><span className="interview-label">Private notes</span><h2>Questions to ask</h2></div></div><div className="interview-notes"><textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="What would you like to learn about the team, product, and role?" /><span>{notes ? "Saved in this browser" : "Add notes for your interview"}</span></div></article>
      </aside>
    </section>
  </>;
}
