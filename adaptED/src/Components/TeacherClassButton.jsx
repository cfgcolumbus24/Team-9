import React from 'react';
// import { useNavigate } from 'react-router-dom';

function TeacherClassButton({ className = "Class Name", description = "Brief class description", route = "/class-detail" }) {
    // const navigate = useNavigate();

    // Navigate to the specified route when the card is clicked
    const handleClick = () => {
        // navigate(route);
    };

    const styles = {
        button: {
            backgroundColor: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            textAlign: "left",
            width: "100%",
        },
        card: {
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "200px",
            margin: "10px",
        },
        profileTitle: {
            fontSize: "1.2em",
            fontWeight: "bold",
            margin: "10px 0",
        },
        profileDescription: {
            fontSize: "0.9em",
            color: "#666",
        },
    };

    return (
        <button style={styles.button} onClick={handleClick}>
            <div style={styles.card}>
                <h2 style={styles.profileTitle}>{className}</h2>
                <p style={styles.profileDescription}>{description}</p>
            </div>
        </button>
    );
}

export default TeacherClassButton;