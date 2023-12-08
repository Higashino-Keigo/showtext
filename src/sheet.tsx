import React from 'react';
import useGoogleSheets from 'use-google-sheets';

function Sheet() {
  const { data, loading, error } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
    sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID || '',
    sheetsOptions: [{ id: 'sheet1' }],
  });

  if (loading) {
    console.log('loading');
    return <div>Loading...</div>;
  }

  if (error) {
    console.log('error');
    return <div>Error!</div>;
  }

  const jsonData = (data[0]?.data || []) as { answer: any }[];
  const answer1Array = jsonData.map((item) => item.answer);

  console.log(answer1Array);

  return answer1Array;
}

export default Sheet;