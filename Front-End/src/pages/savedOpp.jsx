import { useEffect, useState } from 'react';
import { useGetUserID } from '../hooks/useGetUserID';
import axios from 'axios';

export const SavedOpp = () => {
  const [savedOpportunities, setSavedOpportunities] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedOpportunities = async () => {
      try {
        const response = await axios.get(
          `https://federated-project.onrender.com/opportunities/savedOpportunities/${userID}`
        );
        setSavedOpportunities(response.data.savedOpp);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedOpportunities();
  }); // Dependency array added to useEffect

  return (
    <div>
      <h1>Saved Opportunities</h1>
      <ul>
        {savedOpportunities.length > 0 ? (
          savedOpportunities.map((opportunity) => (
            <li key={opportunity._id} className="opportunity-item">
              <div className="opportunity-details">
                <h2>{opportunity.oppname}</h2>
              </div>
              <img
                className="opportunity-image"
                src={opportunity.imageUrl}
                alt={opportunity.name}
              />
              <div>
                {opportunity.duration && (
                  <p>
                    <strong>Duration:</strong> {opportunity.duration}
                  </p>
                )}
                {opportunity.role && (
                  <p>
                    <strong>Role:</strong> {opportunity.role}
                  </p>
                )}
                {opportunity.companyName && (
                  <p>
                    <strong>Company:</strong> {opportunity.companyName}
                  </p>
                )}
                {opportunity.details && (
                  <p>
                    <strong>Details:</strong> {opportunity.details}
                  </p>
                )}
                {opportunity.Email && (
                  <div>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${opportunity.Email}`}
                      target="_blank"
                      rel="noopener noreferrer" // Added rel attribute
                      className="email-button"
                    >
                      Send Email
                    </a>
                  </div>
                )}
              </div>
            </li>
          ))
        ) : (
          <li>No saved opportunities found.</li>
        )}
      </ul>
    </div>
  );
};
