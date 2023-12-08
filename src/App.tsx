import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import useGoogleSheets from 'use-google-sheets';

const StyledDiv = styled.div`
  margin: 15px;
  padding: 5px;
  padding-top: 70px;
  padding-left: 20px;
  padding-right: 20px;
  width: 300px;
  height: 100px;
  display: inline-block;
  background-position: center;
  text-align: center;
  box-sizing: border-box;
  font-family: 'Gaegu', sans-serif;
  font-size: 28px;
  text-decoration-color: #3e3939;
  position: relative; /* 추가: 포지션을 상대적으로 설정 */
  z-index: 2; /* 추가: 명시적인 z-index 설정 */
  opacity: 0.9;
`;

const BackDiv = styled.div`
  background-image: url('/pingback.jpeg');
  background-size: cover;
  height: 100vh;
  position: relative;
  z-index: 1;
  display: inline-block;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:before {
    content: '';
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1; /* 추가: 명시적인 z-index 설정 */
  }
`;

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_GOOGLE_SHEETS_ID}/values/Sheet1?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );
      setData(response.data.values);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const answer1Array = data.map((row) => row[1]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000); // 5초마다 갱신
    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 정리
  }, []);

  if (!Array.isArray(answer1Array)) {
    return <div>Error: Invalid data format</div>;
  }

  return (
    <BackDiv>
      {answer1Array.map((answer, index) => (
        <StyledDiv key={index}>{answer}</StyledDiv>
      ))}
    </BackDiv>
  );
};

export default App;