import { useState, useEffect } from 'react';

export default function Details({ info }) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!info) {
      setUserDetails(null);
      return;
    }

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        setError(err.message);
        setUserDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [info?.id]);

  if (!info) return <div className="details">Select a user to see details</div>;
  if (loading) return <div className="details">Loading details...</div>;
  if (error) return <div className="details">Error: {error}</div>;
  if (!userDetails) return <div className="details">No user details available</div>;

  return (
    <div className="details">
      <h2>{userDetails.name}</h2>
      {userDetails.avatar && (
        <img src={userDetails.avatar} alt={userDetails.name} width="150" />
      )}
      {userDetails.details && (
        <div>
          <p>City: {userDetails.details.city}</p>
          <p>Company: {userDetails.details.company}</p>
          <p>Position: {userDetails.details.position}</p>
        </div>
      )}
    </div>
  );
}
