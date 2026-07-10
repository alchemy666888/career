export type CareerJob = {
  id: number;
  title: string;
  company: string;
  desc: string;
  tags: string[];
  type: "Remote" | "Hybrid";
  level: string;
  salary: string;
  posted: string;
  score: number;
};

export const careerJobs: CareerJob[] = [
  { id: 1, title: "Senior Product Designer", company: "Northstar AI", desc: "Shape intuitive AI workflows for growing operations teams.", tags: ["Remote", "Product", "SaaS"], type: "Remote", level: "Senior", salary: "$145–175k", posted: "2d ago", score: 94 },
  { id: 2, title: "Frontend Engineer", company: "Orbit Commerce", desc: "Build fast, accessible storefront tools with React and TypeScript.", tags: ["Hybrid", "React", "TypeScript"], type: "Hybrid", level: "Mid–Senior", salary: "$135–165k", posted: "1d ago", score: 91 },
  { id: 3, title: "Product Data Analyst", company: "BrightMetrics", desc: "Turn product behavior into dashboards, experiments, and decisions.", tags: ["Remote", "SQL", "Analytics"], type: "Remote", level: "Mid-level", salary: "$110–138k", posted: "3d ago", score: 88 },
  { id: 4, title: "UX Researcher", company: "Kindred Health", desc: "Lead mixed-method research for patient and clinician experiences.", tags: ["Hybrid", "Research", "Health"], type: "Hybrid", level: "Senior", salary: "$125–155k", posted: "4d ago", score: 85 },
  { id: 5, title: "Growth Marketing Manager", company: "Loop Finance", desc: "Own lifecycle experiments across acquisition, activation, and retention.", tags: ["Remote", "Growth", "B2B"], type: "Remote", level: "Manager", salary: "$120–150k", posted: "5d ago", score: 82 },
  { id: 6, title: "Customer Success Lead", company: "Harbor Cloud", desc: "Guide enterprise customers through onboarding, adoption, and expansion.", tags: ["Hybrid", "Enterprise", "SaaS"], type: "Hybrid", level: "Lead", salary: "$118–148k", posted: "1d ago", score: 79 }
];

export const drafts = {
  cv: {
    title: "Editable CV Preview",
    mode: "CV mode",
    tools: ["Product", "Engineering", "Data"],
    suggestions: ["Make it more concise", "Add ATS keywords", "Strengthen bullets with metrics"],
    html: `<h1>Alex Morgan</h1><p class="career-contact-line">Product Designer · alex@example.com · Portfolio: alex.design · Remote</p><h2>Professional Summary</h2><p>Product designer with 6+ years creating intuitive SaaS workflows, leading discovery, and translating complex user needs into polished interfaces.</p><h2>Experience</h2><p><strong>Senior Product Designer · Meridian Apps</strong></p><ul><li>Led an onboarding redesign that increased activation by 22%.</li><li>Built a reusable component library that reduced UI delivery time by 30%.</li><li>Conducted interviews, usability tests, and journey mapping for enterprise users.</li></ul><h2>Skills</h2><p>Product strategy · UX research · Figma · Design systems · Prototyping · Accessibility · SaaS</p>`
  },
  cover: {
    title: "Editable Cover Letter Preview",
    mode: "Cover letter mode",
    tools: ["Warm", "Direct", "Analytical"],
    suggestions: ["Shorten to 180 words", "Make the tone warmer", "Strengthen the opening"],
    html: `<h1>Cover Letter Draft</h1><p class="career-contact-line">Alex Morgan · alex@example.com · July 2026</p><p>Dear Hiring Team,</p><p>I am excited to apply for the Product Designer role. Your focus on practical AI tools stood out because my best work sits at the intersection of clear workflows, user empathy, and measurable product outcomes.</p><p>In my recent role, I led discovery, prototyping, and redesign efforts that improved activation by 22%. I also partnered with engineers to build a design system that helped teams ship consistent experiences faster.</p><p>I would welcome the chance to bring that same craft, structure, and customer focus to your team.</p><p>Sincerely,<br>Alex Morgan</p>`
  }
} as const;
