import styles from "./incidentList.module.css";
import IncidentItem from "./IncidentItem";

const IncidentList = ({ incidents }) => {
    return (
        <div className={styles.incidentList}>
            {incidents.map((incident) => (
                <IncidentItem key={incident.id} incident={incident} />
            ))}
        </div>
    );
};

export default IncidentList;
