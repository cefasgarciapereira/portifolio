"use client";

import { useEffect, useRef, useState } from "react";

import HalftonePatterns from "@/components/atoms/HalftonePatterns";
import SectionLabel from "@/components/atoms/SectionLabel";
import ProjectCard from "@/components/organisms/ProjectCard";
import ProjectDetail from "@/components/organisms/ProjectDetail";
import Section from "@/components/organisms/Section";
import { Language } from "@/contexts/language";

import { localizeProject, projects } from "./data";
import { content, ProjectFilter } from "./translation";
import styles from "./projects.module.css";

function padCount(count: number) {
  return String(count).padStart(2, "0");
}

interface ProjectsProps {
  locale: Language;
}

export default function Projects({ locale }: ProjectsProps) {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const text = content[locale];

  const localizedProjects = projects.map((project, index) => localizeProject(project, index, locale));
  const visibleProjects = localizedProjects.filter((project) => filter === "all" || project.pinned || project.category === filter);
  const filters = Object.keys(text.filters) as ProjectFilter[];

  const expandedRef = useRef<HTMLDivElement>(null);
  const shouldRevealRef = useRef(false);

  useEffect(() => {
    if (!shouldRevealRef.current) {
      return;
    }
    shouldRevealRef.current = false;
    expandedRef.current?.focus({ preventScroll: true });
    expandedRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedId]);

  const selectProject = (id: string) => {
    shouldRevealRef.current = true;
    setSelectedId(id);
  };

  return (
    <Section
      id="projetos"
      label={text.label}
      title={text.title}
      aside={
        <SectionLabel>
          {padCount(visibleProjects.length)} / {padCount(localizedProjects.length)} {text.count}
        </SectionLabel>
      }
    >
      <HalftonePatterns />
      <div className={styles.filters} role="group" aria-label={text.filterAria}>
        {filters.map((option) => (
          <button
            key={option}
            type="button"
            className={`${styles.filter} ${filter === option ? styles.active : ""}`}
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
          >
            {text.filters[option]}
          </button>
        ))}
      </div>

      <p className={styles.hint}>&gt; {text.hint}</p>

      <div className={styles.grid}>
        {visibleProjects.map((project) =>
          project.id === selectedId ? (
            <div key={project.id} ref={expandedRef} className={styles.expanded} tabIndex={-1}>
              <ProjectDetail project={project} labels={text} onClose={() => setSelectedId(null)} />
            </div>
          ) : (
            <ProjectCard key={project.id} project={project} onSelect={selectProject} />
          )
        )}
      </div>
    </Section>
  );
}
