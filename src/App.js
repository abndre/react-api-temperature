import { useEffect, useState } from "react";

function App() {
  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
      const response = await fetch(url);
      const data = await response.json();
      const celsius = (data.main.temp - 32) * 5 / 9;
      setTemperature(celsius);
    });
  }, []);

  let backgroundColor = "blue";
  if (temperature >= 15 && temperature <= 32) {
    const red = Math.floor(((temperature - 15) / 17) * 255);
    const green = Math.floor(((32 - temperature) / 17) * 255);
    backgroundColor = `rgb(${red}, ${green}, 0)`;
  } else if (temperature > 32) {
    backgroundColor = "red";
  }

  return (
    <div style={styles.container}>
      {temperature && (
        <div style={{ ...styles.box, backgroundColor }}>
          <h1 style={styles.temperature}>{temperature.toFixed(2)} °C</h1>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  box: {
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  temperature: {
    margin: 0,
    fontSize: "4rem",
  },
};

export default App;
