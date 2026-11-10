import GlitchText, { GLITCH_TRIGGER } from "@/components/atoms/GlitchText";
import MarkThumbnail from "@/components/atoms/MarkThumbnail";
import { LocalizedProject } from "@/components/organisms/Projects/data";

import styles from "./projectcard.module.css";

interface ProjectCardProps {
  project: LocalizedProject;
  onSelect: (id: string) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <button
      type="button"
      className={`${styles.card} ${GLITCH_TRIGGER}`}
      onClick={() => onSelect(project.id)}
      aria-expanded={false}
    >
      <span className={styles.thumbnail}>
        <MarkThumbnail mark={project.mark} size="card" />
        <span className={styles.number}>{project.number}</span>
      </span>
      <span className={styles.body}>
        <span className={styles.kicker}>{project.kicker}</span>
        <GlitchText text={project.title} className={styles.title} />
        <span className={styles.summary}>{project.summary}</span>
      </span>
      <span className={styles.footer}>
        <span>
          {project.year} · {project.status}
        </span>
        <span className={styles.plus} aria-hidden="true">
          +
        </span>
      </span>
    </button>
  );
}
