// components/AddStartup.js
import React, { useState } from 'react';

const AddStartup = () => {
  const [step, setStep] = useState(1);
  const [startupData, setStartupData] = useState({
    company_name: '',
    company_id: '',
    unified_sector: '',
    business_category: '',
    investment_score: '',
    investment_profile: '',
    tracxn_score: '',
    total_equity_funding: '',
    latest_post_money_valuation: '',
    latest_annual_revenue: '',
    num_funding_rounds: '',
    rolling_average_revenue_1_3: '',
    rolling_average_revenue_3_5: '',
    rolling_average_netprofit_1_3: '',
    net_profit_cagr_5_years: '',
    rolling_average_ebitda_1_3: '',
    rolling_average_ebitda_3_5: '',
    investor_score: '',
    funding_efficiency: '',
    revenue_multiple: '',
    funding_per_round: '',
    revenue_growth: '',
    profit_margin: '',
    investment_cluster: '',
    category1: '',
    category2: '',
    sector1: '',
    sector2: '',
    sector3: '',
    sector4: '',
    sector5: '',
  });

  const [yearlyData, setYearlyData] = useState({
    year: '',
    income_statement_revenue: '',
    ratios_ebitda_margin: '',
    ratios_net_profit_margin: '',
    summary_ebitda: '',
    summary_net_profit: '',
    summary_revenue: '',
    ebitda: '',
    netprofit: '',
    revenue: '',
    valuation: '',
  });

  const handleStartupChange = (e) => {
    const { name, value } = e.target;
    setStartupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleYearlyChange = (e) => {
    const { name, value } = e.target;
    setYearlyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the backend)
    console.log('Startup Data:', startupData);
    console.log('Yearly Data:', yearlyData);
    alert('Startup added successfully!');
  };

  return (
    <div>
      {step === 1 && (
        <form>
          <h2>Startup Information</h2>
          <input type="text" name="company_name" placeholder="Company Name" value={startupData.company_name} onChange={handleStartupChange} required />
          {/* Add other input fields similarly */}
          <button type="button" onClick={handleNext}>Next</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <h2>Yearly Data</h2>
          <input type="number" name="year" placeholder="Year" value={yearlyData.year} onChange={handleYearlyChange} required />
          <input type="number" name="income_statement_revenue" placeholder="Income Statement Revenue" value={yearlyData.income_statement_revenue} onChange={handleYearlyChange} required />
          {/* Add other input fields similarly */}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default AddStartup;
