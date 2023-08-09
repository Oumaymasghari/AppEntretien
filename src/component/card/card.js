
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, MenuItem, FormControl,InputLabel, Box } from '@mui/material';
import dbData from '../../CardsMock.json'; // Import the JSON data
function Card() {
    const [comptes, setComptes] = useState([]);
  const [selectedCompte, setSelectedCompte] = useState('');
  const [selectedCardNumber, setSelectedCardNumber] = useState('');
  const [selectedCardType, setSelectedCardType] = useState('');
  const [cards, setCards] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchedData = dbData.data;
    setData(fetchedData);
    setComptes([...new Set(fetchedData.map(item => item.accountId))]);
  }, []);

  useEffect(() => {
    if (selectedCompte) {
      const filteredCards = data.filter(item => item.accountId === selectedCompte);
      setCards(filteredCards);
    } else {
      setCards([]);
    }
    setSelectedCardNumber('');
    setSelectedCardType('');
  }, [selectedCompte, data]);

  const cardNumbersForSelectedAccount = cards
    .filter(card => card.accountId === selectedCompte)
    .map(card => card.cardNumber);

  const cardTypesForSelectedAccount = cards
    .filter(card => card.accountId === selectedCompte)
    .map(card => card.type);

  return (
    <Box p={3}>
      <FormControl fullWidth variant="outlined">
        <InputLabel>Select Compte</InputLabel>
        <Select
          value={selectedCompte}
          onChange={e => setSelectedCompte(e.target.value)}
          label="Select Compte"
        >
          <MenuItem value="">
            <em>Select Compte</em>
          </MenuItem>
          {comptes.map(compte => (
            <MenuItem key={compte} value={compte}>
              {compte}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedCompte && (
        <div>
          <FormControl fullWidth variant="outlined" style={{ marginTop: '1rem' }}>
            <InputLabel>Select Card Number</InputLabel>
            <Select
              value={selectedCardNumber}
              onChange={e => setSelectedCardNumber(e.target.value)}
              label="Select Card Number"
            >
              <MenuItem value="">
                <em>Select Card Number</em>
              </MenuItem>
              {cardNumbersForSelectedAccount.map(cardNumber => (
                <MenuItem key={cardNumber} value={cardNumber}>
                  {cardNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" style={{ marginTop: '1rem' }}>
            <InputLabel>Select Card Type</InputLabel>
            <Select
              value={selectedCardType}
              onChange={e => setSelectedCardType(e.target.value)}
              label="Select Card Type"
            >
              <MenuItem value="">
                <em>Select Card Type</em>
              </MenuItem>
              {cardTypesForSelectedAccount.map(cardType => (
                <MenuItem key={cardType} value={cardType}>
                  {cardType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
    </Box>
  );
}

export default Card;