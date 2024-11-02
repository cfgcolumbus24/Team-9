// import React, { useState } from 'react';

// // Function-based component for teacher's classes
// function TeacherClassButton() {
//     const [count, setCount] = useState(0);
    
//     // Array of classes
//     const classes = [
//         "Mathematics",
//         "Science",
//         "History",
//         "Literature",
//         "Art"
//     ];

//     // Allow for redirect to class attendance page
//     const handleClick = (e) => 
//         {
            
//     };

//     const styles = {
//         button: {
//             backgroundColor: "navy",
//             color: "white",
//             padding: "20px 40px",
//             borderRadius: "10px",
//             border: "none",
//             cursor: "pointer",
//         },
//         classList: {
//             display: "flex",
//             listStyleType: "none",
//             padding: 0,
//             marginTop: "10px",
//         },
//         classItem: {
//             marginRight: "15px",
//             padding: "5px 10px",
//             backgroundColor: "#f0f0f0",
//             borderRadius: "5px",
//             boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//         },
//     };

//     return (
//         <div>
//             <button style={styles.button} onClick={handleClick}>
//                 Click me 😃
//             </button>
//             <ul style={styles.classList}>
//                 {classes.map((className, index) => (
//                     <li key={index} style={styles.classItem}>{className}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default TeacherClassButton;
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
        profileImage: {
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
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
