import { useState } from 'react';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const CreateOpp = () => {
  const userID = useGetUserID();
  const [cookies] = useCookies(['access_token']);
  const [opportunity, setOpportunity] = useState({
    oppname: '',
    imageUrl: '',
    duration: '',
    role: '',
    email: '',
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOpportunity({ ...opportunity, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        'https://federated-project.onrender.com/opportunities',
        { ...opportunity },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert('Opportunity Created');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  console.log(opportunity);
  return (
    <div className="opportunity-recipe">
      <h2>Create opportunity</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="oppname">Name</label>
        <input
          type="text"
          id="oppname"
          name="oppname"
          value={opportunity.name}
          onChange={handleChange}
        />
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={opportunity.imageUrl}
          onChange={handleChange}
        />
        <label htmlFor="duration">Duration</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={opportunity.duration}
          onChange={handleChange}
        />
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          value={opportunity.role}
          onChange={handleChange}
        />
        <label htmlFor="companyName">Company Name</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={opportunity.companyName}
          onChange={handleChange}
        />
        <label htmlFor="Email">Email</label>
        <input
          type="text"
          id="Email"
          name="Email"
          value={opportunity.Email}
          onChange={handleChange}
        />
        <label htmlFor="details">Details</label>
        <textarea
          id="details"
          name="details"
          value={opportunity.details}
          onChange={handleChange}
        />
        <button type="submit">Create opportunity</button>
      </form>
    </div>
  );
};
