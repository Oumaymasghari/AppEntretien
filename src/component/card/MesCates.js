import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Divider,
  IconButton,
  Slider,
  Switch,
} from "@mui/material";
import dbData from "../../CardsMock.json";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import cartebancaire from "../../assets/img/cartebancaire.png";
import EditIcon from "@mui/icons-material/Edit";
import "./MesCartes.css";
import { grey } from "@mui/material/colors";
const styles = {
  container: {
    width: "80%",
    aspectRatio: "16 / 9",
    background: `url(${cartebancaire}) center/cover no-repeat`,
    // display: 'flex',
    // alignItems: 'center',
    //justifyContent: 'center',
    //color: 'white',
    //  textAlign: 'center',

    //display: 'flex',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  content: {
    backgroundColor: "transparent",
    padding: "1rem",
    display: "flex",
    flexDirection: "column", // Display items vertically
    alignItems: "center",
  },
};
const responsiveH3 = {
  fontSize: "3vw", // Responsive font size
  margin: "0.3rem 0", // Add vertical spacing between h3 elements
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function MesCates() {
  const [comptes, setComptes] = useState([]);
  const [selectedCompte, setSelectedCompte] = useState("");
  const [selectedCardNumber, setSelectedCardNumber] = useState("");
  const [selectedCardType, setSelectedCardType] = useState("");
  const [cards, setCards] = useState([]);
  const [data, setData] = useState([]);
  const [cardAvailableLimit, setCardAvailableLimit] = useState();
  const [open, setOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState();

  const handleSwitchChange = (event) => {
    setIsChecked(event.target.checked);
    if (isChecked) {
      setStatus("Activeé");
    } else {
      setStatus("Bloquée");
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  const handleClose = () => {
    setCardAvailableLimit(sliderValue);
    console.log("cardAvailableLimit", cardAvailableLimit);
    setOpen(false);
  };

  useEffect(() => {
    const fetchedData = dbData.data;
    setData(fetchedData);

    setComptes([...new Set(fetchedData.map((item) => item.accountId))]);
  }, []);

  useEffect(() => {
    if (selectedCompte) {
      const filteredCards = data.filter(
        (item) => item.accountId === selectedCompte
      );
      setCards(filteredCards);
      console.log("selectedCar", selectedCardNumber);
    } else {
      setCards([]);
    }
    setCardAvailableLimit(
      cardForSelectedNumber.map((card) => card.cardAvailableLimit)
    );
    setStatus(cardForSelectedNumber.map((card) => card.status));
    console.log(
      "cardForSelectedNumber.cardAvailableLimit",
      cardForSelectedNumber.map((card) => card.cardAvailableLimit)
    );
    // setSelectedCardNumber('');

    // setSelectedCardType('');
  }, [selectedCompte, selectedCardNumber, data]);

  const cardNumbersForSelectedAccount = cards
    .filter((card) => card.accountId === selectedCompte)
    .map((card) => card);
  const cardForSelectedNumber = cards
    .filter((card) => card.cardNumber === selectedCardNumber)
    .map((card) => card);
  console.log("cardForSelectedNumber", cardForSelectedNumber);

  function formatCardNumber(cardNumber) {
    // Convert to string and remove all non-digit characters
    const digitsOnly = cardNumber.toString().replace(/\D/g, "");

    // Get the last 4 digits
    const last4Digits = digitsOnly.slice(-4);

    // Mask the other digits with points (...)
    const maskedDigits =
      digitsOnly.length > 4 ? "••••".repeat(digitsOnly.length - 4) : "";

    // Combine the masked digits and last 4 digits
    const maskedCardNumber =
      maskedDigits.replace(/(.{4})/g, "$1 ") + last4Digits;

    return maskedCardNumber;
  }
  const formattedCardNumber = formatCardNumber(
    cardForSelectedNumber.map((card) => card.cardNumber)
  );

  const cardTypesForSelectedAccount = cards
    .filter((card) => card.accountId === selectedCompte)
    .map((card) => card.type);
  const originalDate = cardForSelectedNumber
    .map((card) => card.expiryDate)
    .toString();
  const parts = originalDate.split("/");
  const formattedDate = `${parts[1]}/${parts[0]}`;
  return (
   < div>
   <div >
    <h1 style={{paddingRight:'50%'}}>Mes carte</h1>
    <div style={{marginTop:'-11%',marginRight:'10%'}}>
    <Button sx={{ backgroundColor: "#FC6A03",
                            color: "white",
                            float: "right",
                            marginTop:'0%' }}>
                          Ajouter carte
                        </Button>
    </div>
  
   </div>
    <Box p={3} style={{marginTop:'11%'}} >
      <FormControl fullWidth variant="outlined">
        <InputLabel>Select Compte</InputLabel>
        <Select
          value={selectedCompte}
          onChange={(e) => setSelectedCompte(e.target.value)}
          label="Select Compte"
        >
          <MenuItem value="">
            <em>Select Compte</em>
          </MenuItem>
          {comptes.map((compte) => (
            <MenuItem key={compte} value={compte}>
              {compte}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth variant="outlined" style={{ marginTop: "1rem" }}>
        <InputLabel>Select Card Number</InputLabel>
        <Select
          value={selectedCardNumber}
          onChange={(e) => setSelectedCardNumber(e.target.value)}
          label="Select Card Number"
        >
          <MenuItem value="">
            <em>Select Card Number</em>
          </MenuItem>
          {cardNumbersForSelectedAccount.map((cardNumber) => (
            <MenuItem key={cardNumber.cardNumber} value={cardNumber.cardNumber}>
              {cardNumber.cardNumber}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth variant="outlined" style={{ marginTop: "1rem" }}>
        <InputLabel>Select Card Type</InputLabel>
        <Select
          value={selectedCardType}
          onChange={(e) => setSelectedCardType(e.target.value)}
          label="Select Card Type"
        >
          <MenuItem value="">
            <em>Select Card Type</em>
          </MenuItem>
          {cardTypesForSelectedAccount.map((cardType) => (
            <MenuItem key={cardType} value={cardType}>
              {cardType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedCardNumber && (
        <div>
          {cardForSelectedNumber && (
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <h1>{cardForSelectedNumber.map((card) => card.type)}</h1>
                <center>
                  <div style={styles.container}>
                    <div /* style={styles.content} */>
                      <div className="cardNumber">{formattedCardNumber}</div>
                      <h3 className="accountName">
                        {cardForSelectedNumber.map((card) => card.accountName)}
                      </h3>
                      <p className="expiration">Date d'expiration</p>
                      <h3 className="expiryDate">{formattedDate}</h3>
                    </div>
                  </div>
                  <br />
                </center>
                <Switch checked={isChecked} onChange={handleSwitchChange} />
               
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h5 >status</h5>
                    <h5>
                      {status}
                    </h5>
                  </div>
                
                <Divider />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5 style={{ left: "80%" }}>Date d'expiration </h5>
                  <h5>
                    {" "}
                    {cardForSelectedNumber.map((card) => card.expiryDate)}{" "}
                  </h5>
                </div>
                <Divider />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5 style={{ left: "80%" }}>Plafond disponible </h5>
                  <h5>
                    {" "}
                    {cardForSelectedNumber.map((card) => card.cardLimit)}{" "}
                  </h5>
                </div>
                <Divider />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5 style={{ left: "80%" }}>Plafond hebdomadaire </h5>
                  <div style={{ display: "flex" }}>
                    <IconButton
                      aria-label="edit"
                      sx={{ color: "orange" }}
                      onClick={handleOpen}
                    >
                      <EditIcon />
                    </IconButton>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-title"
                      aria-describedby="modal-description"
                    >
                      <Box sx={modalStyle}>
                        <Typography
                          id="modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Augmentation plafond de la carte
                        </Typography>
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                          <Slider
                            value={sliderValue}
                            onChange={handleSliderChange}
                            aria-labelledby="modal-slider"
                            defaultValue={cardForSelectedNumber.map(
                              (card) => card.cardAvailableLimit
                            )}
                            min={400}
                            max={cardForSelectedNumber.map(
                              (card) => card.cardLimit
                            )}
                            sx={{ width: "100%", color: "#FC6A03" }}
                          />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography> 400</Typography>
                            <Typography style={{ float: "right" }}>
                              {" "}
                              {cardForSelectedNumber.map(
                                (card) => card.cardLimit
                              )}
                            </Typography>
                          </div>

                          <Typography>Value: {sliderValue}</Typography>
                        </Typography>
                        <Button
                          onClick={handleClose}
                          sx={{
                            backgroundColor: "#FC6A03",
                            color: "white",
                            float: "right",
                          }}
                        >
                          valider les modifications
                        </Button>
                      </Box>
                    </Modal>
                    <h5> {cardAvailableLimit} </h5>
                  </div>
                </div>
                <Divider />
              </CardContent>
              <CardActions></CardActions>
            </Card>
          )}
        </div>
      )}
      <br></br>
    </Box>
    </div>
  );
}

export default MesCates;
