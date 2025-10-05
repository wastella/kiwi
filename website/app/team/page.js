import KiwiWeatherFullHorizontal from "../../public/KiwiWeatherFullHorizontal.png";
import Image from "next/image";

export default function AboutUs() {
  const glassStyle = {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "60px",
  };

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: "3rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          ...glassStyle,
          padding: "1.5rem 3rem",
          marginBottom: "3rem",
        }}
      >
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "3rem",
            fontWeight: "bold",
            margin: 0,
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            color: "white",
          }}
        >
          About Us
        </h1>
      </div>

      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        <div
          style={{
            ...glassStyle,
            padding: "2rem",
            width: "100%",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "1.1rem",
              lineHeight: "1.8",
              margin: 0,
              textAlign: "justify",
              letterSpacing: "-0.02em",
              wordSpacing: "0em",
            }}
          >
            Kiwi Weather was created by 5 Solon High School students during the
            2025 NASA International Space Apps Hackathon. We created Kiwi
            Weather to assist in ensuring perfect weather for your
            events/gatherings far in advance. Kiwi is a machine learning model
            trained on years of meteorological data with advanced forecasting
            models to provide local predictions tailored to your specific
            location and schedule. Whether you’re planning a wedding, a sports
            tournament, or a community festival, Kiwi Weather helps you make
            confident decisions!
            <div
              style={{
                marginTop: "1.5rem",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.15rem",
              }}
            >
              — William, Zach, Viggo, Johnathan, and Deniz
            </div>
          </span>
        </div>

        <div
          style={{
            ...glassStyle,
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "60%",
          }}
        >
          <picture className="w-full h-full">
            <Image
              src={KiwiWeatherFullHorizontal}
              alt="Kiwi Weather Logo"
              className="object-contain min-w-full min-h-full"
            />
          </picture>
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          paddingTop: "3rem",
          color: "white",
          fontSize: "0.9rem",
          textAlign: "center",
          textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
        }}
      >
        Copyright 2025 Solon Superstars
      </div>
    </div>
  );
}
