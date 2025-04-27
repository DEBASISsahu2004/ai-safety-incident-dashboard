import { useState } from "react";
import styles from "./incidentform.module.css";

const IncidentForm = ({ addIncident, setToggle }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        severity: "low"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            alert("Title and Description are required!");
            return;
        }

        const newIncident = {
            id: Date.now(),
            ...formData,
            reported_at: new Date().toISOString()
        };

        addIncident(newIncident);
        setFormData({ title: "", description: "", severity: "low" });
        alert("Incident reported successfully!");
        setToggle("list");
    };

    return (
        <form onSubmit={handleSubmit} className={styles.newIncidentForm}>
            <label className={styles.title} htmlFor="title">Title
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a title for the incident"
                    required
                />
            </label>

            <label htmlFor="description">Description
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter a description of the incident"
                    required
                />
            </label>

            <label htmlFor="severity">Severity
                <select
                    id="severity"
                    name="severity"
                    value={formData.severity}
                    onChange={handleInputChange}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </label>

            <button type="submit">Report Incident</button>
        </form>
    );
};

export default IncidentForm;
