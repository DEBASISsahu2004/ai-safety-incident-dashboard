import styles from "./incidentList.module.css";
import { useState } from "react";


const IncidentItem = ({ incident }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles.incidentItem}>
            <h3>{incident.title}</h3>
            <p><strong>Severity:</strong> {incident.severity}</p>
            <p><strong>Reported:</strong> {new Date(incident.reported_at).toLocaleDateString()}</p>
            <button onClick={toggleDescription}>
                {isExpanded ? "Hide Details" : "View Details"}
            </button>
            {isExpanded && <p>{incident.description}</p>}
        </div>
    );
};

export default IncidentItem;
