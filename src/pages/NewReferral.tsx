
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import ReferralForm from '@/components/forms/ReferralForm';

const NewReferral = () => {
  return (
    <DashboardLayout>
      <div className="page-container">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold">New Referral Request</h1>
          <p className="ml-4 text-gray-500">Complete the form to match with service providers</p>
        </div>
        <ReferralForm />
      </div>
    </DashboardLayout>
  );
};

export default NewReferral;
