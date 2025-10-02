import { useContext, useState } from "react";
import { Container } from "rsuite";
import { ResponsivePie } from "@nivo/pie";
import useAsyncEffect from "../../../hooks/useAsyncEffect";
import { TimeRange } from "../../../utils/constants";
import SpotifyContext from "../../../context/spotify";
import SpotifyApi from "../../../api/SpotifyApi";
import "../Analytics.scss";

interface TasteProfileData {
  track_attribute: string;
  Value: number;
}

const defaultTasteProfileData: TasteProfileData[] = [
  { track_attribute: "Danceability", Value: 0 },
  { track_attribute: "Energy", Value: 0 },
  { track_attribute: "Loudness", Value: 0 },
  { track_attribute: "Positivity", Value: 0 },
  { track_attribute: "Speed", Value: 0 },
  { track_attribute: "Instrumentalness", Value: 0 },
  { track_attribute: "Liveness", Value: 0 },
  { track_attribute: "Song Length", Value: 0 },
];

const TasteProfile = () => {
  const { spotifyContext } = useContext(SpotifyContext);
  const [tasteProfileData, setTasteProfileData] = useState<any[]>(
    defaultTasteProfileData
  );

  useAsyncEffect(async () => {
    const NUM_LOOKUPS = 50;
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
    const trackIds: string[] = [];
    const topTracks = await spotifyApi.getTopTracks(
      TimeRange.LONG_TERM,
      NUM_LOOKUPS
    );
    let totalDanceability = 0;
    let totalEnergy = 0;
    let totalLoudness = 0;
    let totalPositivity = 0;
    let totalSpeed = 0;
    let totalInstrumentalness = 0;
    let totalLiveness = 0;
    let totalSpeechiness = 0;
    let totalAcousticness = 0;

    topTracks.forEach((track) => {
      trackIds.push(track.id);
    });

    const trackFeatures = await spotifyApi.getTracksFeatures(trackIds);

    trackFeatures.forEach((feature) => {
      if (feature) {
        totalDanceability += feature.danceability;
        totalEnergy += feature.energy;
        totalLoudness += feature.loudness;
        totalPositivity += feature.valence;
        totalSpeed += feature.tempo;
        totalInstrumentalness += feature.instrumentalness;
        totalLiveness += feature.liveness;
        totalSpeechiness += feature.speechiness;
        totalAcousticness += feature.acousticness;
      }
    });

    setTasteProfileData([
      {
        id: "Danceability",
        value: parseFloat(((totalDanceability / NUM_LOOKUPS) * 10).toFixed(2)),
      },
      {
        id: "Energy",
        value: parseFloat(((totalEnergy / NUM_LOOKUPS) * 10).toFixed(2)),
      },
      {
        id: "Positivity",
        value: parseFloat(((totalPositivity / NUM_LOOKUPS) * 10).toFixed(2)),
      },
      {
        id: "Instrumentalness",
        value: parseFloat(
          ((totalInstrumentalness / NUM_LOOKUPS) * 10).toFixed(2)
        ),
      },
      {
        id: "Liveness",
        value: parseFloat(((totalLiveness / NUM_LOOKUPS) * 10).toFixed(2)),
      },
      {
        id: "Speechiness",
        value: parseFloat(((totalSpeechiness / NUM_LOOKUPS) * 10).toFixed(2)),
      },
      {
        id: "Acousticness",
        value: parseFloat(((totalAcousticness / NUM_LOOKUPS) * 10).toFixed(2)),
      },
    ]);
  }, [spotifyContext.accessToken]);

  return (
    <Container
      className="analytics-container"
      style={{ height: window.outerHeight - 250 }}
    >
      <div style={{ textAlign: "center", margin: "15px 0 30px 0" }}>
        <h3>Taste Profile</h3>
        <h5>
          The attributes of the music you listen to based on your top 50 tracks.
        </h5>
      </div>

      <ResponsivePie
        data={tasteProfileData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: "spectral" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: "color" }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </Container>
  );
};

export default TasteProfile;
