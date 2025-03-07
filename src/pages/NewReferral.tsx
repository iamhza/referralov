
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import ReferralForm from '@/components/forms/ReferralForm';

const NewReferral = () => {
  return (
    <DashboardLayout>
      <div className="page-container">
        <ReferralForm />
      </div>
    </DashboardLayout>
  );
};

export default NewReferral;
