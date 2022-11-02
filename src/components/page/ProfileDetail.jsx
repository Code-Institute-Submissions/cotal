import * as React from 'react';
// import { Link } from 'gatsby';

// import http from '../services/httpService';
import Seo from '../Seo';

const ProfileDetail = (rest) => {
  // console.log('ProfileDetails');
  // console.log(rest);
  return (
    <>
      <h1>
        This page is <b>User Page</b>
      </h1>
      <p>
        This page is for the user <code>hello</code> on the DRF db.
      </p>
    </>
  );
};

export const Head = () => <Seo title="Profile" />;

export default ProfileDetail;
