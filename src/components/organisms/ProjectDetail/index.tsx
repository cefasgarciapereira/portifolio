import Box from "@/components/atoms/Box";
import Button from "@/components/atoms/Button";
import Chips from "@/components/atoms/Chips";
import FactList from "@/components/atoms/FactList";
import GlitchText from "@/components/atoms/GlitchText";
import MarkThumbnail from "@/components/atoms/MarkThumbnail";
import SectionLabel from "@/components/atoms/SectionLabel";
import { LocalizedProject } from "@/components/organisms/Projects/data";

import styles from "./projectdetail.module.css";

export interface ProjectDetailLabels {
  close: string;
  role: string;
  year: string;
  status: string;
}

interface ProjectDetailProps {
  project: LocalizedProject;
  labels: ProjectDetailLabels;
  onClose: () => void;
}

export default function ProjectDetail({ project, labels, onClose }: ProjectDetailProps) {
  const facts = [
    { term: labels.role, value: project.role },
    { term: labels.year, value: project.year },
    { term: labels.status, value: project.status },
  ];

  return (
    <Box className={styles.detail}>
      <div className={styles.thumbnail} role="presentation">
        <MarkThumbnail mark={project.mark} size="detail" />
      </div>
      <div className={styles.body} role="region" aria-label={project.title}>
        <div className={styles.top}>
          <SectionLabel>
            {project.number} · {project.kicker}
          </SectionLabel>
          <Button onClick={onClose}>{labels.close} ×</Button>
        </div>
        <GlitchText as="h3" text={project.title} className={styles.title} />
        <p className={styles.description}>{project.description}</p>
        <FactList facts={facts} className={styles.facts} />
        <Chips items={project.tags} />
      </div>
    </Box>
  );
}
