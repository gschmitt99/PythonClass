import React from "react";
import styles from "./CatalogStyles.module.css";

const ModifierList = ({ list }) => (
  <div className={styles.modifierBox}>
    <h4 className={styles.sectionHeading}>
      {list.name}
      <span style={{ fontSize: "0.85rem", color: "#888", marginLeft: "8px" }}>
        ({list.selection_type})
      </span>
    </h4>
    <ul>
      {list.modifiers.map((mod) => (
        <li key={mod.pk}>
          {mod.name} {mod.amount ? `(+${(mod.amount / 100).toFixed(2)})` : ""}
        </li>
      ))}
    </ul>
  </div>
);

export default ModifierList;
