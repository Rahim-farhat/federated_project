import { useEffect, useState } from 'react';
import { useGetUserID } from '../hooks/useGetUserID';
import LoadingBox from '../components/loadingBox';
import axios from 'axios';

export const Home = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [savedOpportunities, setSavedOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get(
          'https://federated-project.onrender.com/opportunities'
        );
        setOpportunities(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    const fetchSavedOpportunities = async () => {
      try {
        console.log('trying to fetch opps');
        const response = await axios.get(
          `https://federated-project.onrender.com/opportunities/savedOpportunities/ids/${userID}`
        );

        setSavedOpportunities(response.data.savedOpp);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOpportunities();
    fetchSavedOpportunities();
  });

  const saveOpportunity = async (opportunityID) => {
    try {
      const response = await axios.put(
        'https://federated-project.onrender.com/opportunities',
        {
          opportunityID,
          userID,
        }
      );

      console.log({
        opportunityID,
        userID,
      });
      setSavedOpportunities(response.data.savedOpp);
    } catch (err) {
      console.log(err);
      console.log('failed to send');
    }
  };

  /* const issavedOpportunitySaved = (id) => savedOpportunities.includes(id);*/
  const issavedOpportunitySaved = (id) => {
    if (savedOpportunities) {
      return savedOpportunities.includes(id);
    }
    return false;
  };

  return (
    <div className="opportunity-list">
      <h1>Opportunities</h1>
      {loading ? (
        <LoadingBox />
      ) : (
        <ul>
          {opportunities.map((opportunity) => (
            <li key={opportunity._id} className="opportunity-item">
              <div className="opportunity-details">
                <h2>{opportunity.oppname}</h2>
                <button
                  onClick={() => saveOpportunity(opportunity._id)}
                  className={`save-button ${
                    issavedOpportunitySaved(opportunity._id) ? 'saved' : ''
                  }`}
                  disabled={issavedOpportunitySaved(opportunity._id)}
                >
                  {issavedOpportunitySaved(opportunity._id) ? 'Saved' : 'Save'}
                </button>
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
                      className="email-button"
                    >
                      Send Email
                    </a>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      ;
    </div>
  );
};
