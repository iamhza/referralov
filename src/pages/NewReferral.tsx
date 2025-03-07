
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import ReferralForm from '@/components/forms/ReferralForm';

const NewReferral = () => {
  return (
    <DashboardLayout>
      <div className="page-container">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold">New Referral Request</h1>
        </div>
        <ReferralForm />
      </div>
    </DashboardLayout>
  );
};

export default NewReferral;
