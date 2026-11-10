import styles from "./factlist.module.css";

export interface Fact {
  term: string;
  value: string;
}

interface FactListProps {
  facts: Fact[];
  className?: string;
}

export default function FactList({ facts, className = "" }: FactListProps) {
  return (
    <dl className={`${styles.facts} ${className}`}>
      {facts.map((fact) => (
        <div key={fact.term} className={styles.fact}>
          <dt className={styles.term}>{fact.term}</dt>
          <dd className={styles.value}>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
