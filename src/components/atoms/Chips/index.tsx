import styles from "./chips.module.css";

interface ChipsProps {
  items: string[];
}

export default function Chips({ items }: ChipsProps) {
  return (
    <ul className={styles.chips}>
      {items.map((item) => (
        <li key={item} className={styles.chip}>
          {item}
        </li>
      ))}
    </ul>
  );
}
