import React, {useContext, useEffect, useReducer, useState} from 'react';
import {
  Alert,
  Button,
  Col,
  ControlLabel,
  Form,
  HelpBlock,
  Row,
  SelectPicker,
} from "rsuite";
import {Field, Formik, FormikProps} from "formik";
import {
  AcousticnessOption,
  DurationOption,
  GenericRangeOption,
  InstrumentalTrackOption,
  LiveTrackOption,
  LoudnessOption,
  RecommendationDataOption,
  SpokenWordOption,
  SpotifySimpleRecommendationOptions,
  TempoOption
} from "../../api/interfaces/requests/spotify/spotifyAdvancedRecommendationOptions";
import {
  getAcousticnessRecommendationOptions,
  getDanceabilityRecommendationOptions,
  getDurationRecommendationOptions,
  getEnergyRecommendationOptions,
  getInstrumentalnessRecommendationOptions,
  getLiveTrackRecommendationOptions,
  getLoudnessRecommendationOptions,
  getPopularityRecommendationOptions,
  getPositivityRecommendationOptions, getSeedArtistOptions,
  getSeedGenreOptions, getSeedTrackOptions,
  getSpeechinessRecommendationOptions,
  getTempoRecommendationOptions
} from "../../utils/recommendations";
import SpotifyApi from "../../api/SpotifyApi";
import SpotifyContext from "../../context/spotify";
import {IS_LOADING, IS_NOT_LOADING, UPDATE_DATA} from "../../actions/tableActions";
import tableReducer, {TableState} from "../../reducers/tableReducer";
import RecommendationSeedData from "./RecommendationSeedData";
import RecommendationTable from "./RecommendationTable";
import {RecommendedTrack} from "../../utils/types";

const initialValues: SpotifySimpleRecommendationOptions = {
  recommendation_data: RecommendationDataOption.AUTO,
  instrumental_tracks: InstrumentalTrackOption.ANY,
  acousticness: AcousticnessOption.ANY,
  live_tracks: LiveTrackOption.ANY,
  danceability: GenericRangeOption.ANY,
  energy: GenericRangeOption.ANY,
  spoken_word: SpokenWordOption.ANY,
  positivity: GenericRangeOption.ANY,
  loudness: LoudnessOption.ANY,
  duration: DurationOption.ANY,
  popularity: GenericRangeOption.ANY,
  tempo: TempoOption.ANY,
  seed_artists: [],
  seed_tracks: [],
  seed_genres: [],
};

const seedTypesOptions = [
  {value: RecommendationDataOption.AUTO, label: RecommendationDataOption.AUTO},
  {value: RecommendationDataOption.MANUAL, label: RecommendationDataOption.MANUAL},
];

const instrumentalTracksOptions = [
  {value: InstrumentalTrackOption.ANY, label: InstrumentalTrackOption.ANY},
  {value: InstrumentalTrackOption.INSTRUMENTAL_ONLY, label: InstrumentalTrackOption.INSTRUMENTAL_ONLY},
  {value: InstrumentalTrackOption.NON_INSTRUMENTAL_ONLY, label: InstrumentalTrackOption.NON_INSTRUMENTAL_ONLY},
];

const acousticnessOptions = [
  {value: AcousticnessOption.ANY, label: AcousticnessOption.ANY,},
  {value: AcousticnessOption.ACOUSTIC_ONLY, label: AcousticnessOption.ACOUSTIC_ONLY,},
  {value: AcousticnessOption.NON_ACOUSTIC_ONLY, label: AcousticnessOption.NON_ACOUSTIC_ONLY,},
];

const genericRangeOptions = [
  {value: GenericRangeOption.ANY, label: GenericRangeOption.ANY},
  {value: GenericRangeOption.LOW, label: GenericRangeOption.LOW},
  {value: GenericRangeOption.MEDIUM, label: GenericRangeOption.MEDIUM},
  {value: GenericRangeOption.HIGH, label: GenericRangeOption.HIGH},
];

const liveTrackOptions = [
  {value: LiveTrackOption.ANY, label: LiveTrackOption.ANY},
  {value: LiveTrackOption.LIVE_ONLY, label: LiveTrackOption.LIVE_ONLY},
  {value: LiveTrackOption.STUDIO_ONLY, label: LiveTrackOption.STUDIO_ONLY},
];

const spokenWordOptions = [
  {value: SpokenWordOption.ANY, label: SpokenWordOption.ANY},
  {value: SpokenWordOption.SPOKEN_WORD_ONLY, label: SpokenWordOption.SPOKEN_WORD_ONLY},
  {value: SpokenWordOption.SPOKEN_AND_MUSIC, label: SpokenWordOption.SPOKEN_AND_MUSIC},
  {value: SpokenWordOption.MUSIC_ONLY, label: SpokenWordOption.MUSIC_ONLY},
];

const loudnessOptions = [
  {value: LoudnessOption.ANY, label: LoudnessOption.ANY},
  {value: LoudnessOption.QUIET, label: LoudnessOption.QUIET},
  {value: LoudnessOption.MEDIUM, label: LoudnessOption.MEDIUM},
  {value: LoudnessOption.LOUD, label: LoudnessOption.LOUD},
];

const durationOptions = [
  {value: DurationOption.ANY, label: DurationOption.ANY},
  {value: DurationOption.SHORT, label: DurationOption.SHORT},
  {value: DurationOption.MEDIUM, label: DurationOption.MEDIUM},
  {value: DurationOption.LONG, label: DurationOption.LONG},
];

const tempoOptions = [
  {value: TempoOption.ANY, label: TempoOption.ANY},
  {value: TempoOption.SLOW, label: TempoOption.SLOW},
  {value: TempoOption.MEDIUM, label: TempoOption.MEDIUM},
  {value: TempoOption.FAST, label: TempoOption.FAST},
];

const initialTableState: TableState<RecommendedTrack> = {
  data: [],
  page: 1,
  displayLength: 100,
  isLoading: true,
};

const SimpleRecommendations = () => {
  const [recommendations, setRecommendations] = useState<RecommendedTrack[]>([]);
  const [recommendationData, setRecommendationData] = useState(initialValues.recommendation_data);
  const [tableState, tableStateDispatch] = useReducer(tableReducer, initialTableState);
  const {spotifyContext} = useContext(SpotifyContext);
  const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

  useEffect(() => {
    tableStateDispatch({ type: UPDATE_DATA, value: recommendations });
  }, [recommendations]);

  const getRecommendations = (formValues: SpotifySimpleRecommendationOptions) => {
    tableStateDispatch({ type: IS_LOADING });

    // Build the options based on what the user selected
    const options = {
      ...getInstrumentalnessRecommendationOptions(formValues.instrumental_tracks),
      ...getAcousticnessRecommendationOptions(formValues.acousticness),
      ...getLiveTrackRecommendationOptions(formValues.live_tracks),
      ...getDanceabilityRecommendationOptions(formValues.danceability),
      ...getEnergyRecommendationOptions(formValues.energy),
      ...getSpeechinessRecommendationOptions(formValues.spoken_word),
      ...getPositivityRecommendationOptions(formValues.positivity),
      ...getLoudnessRecommendationOptions(formValues.loudness),
      ...getDurationRecommendationOptions(formValues.duration),
      ...getPopularityRecommendationOptions(formValues.popularity),
      ...getTempoRecommendationOptions(formValues.tempo),
      ...getSeedArtistOptions(formValues.seed_artists),
      ...getSeedTrackOptions(formValues.seed_tracks),
      ...getSeedGenreOptions(formValues.seed_genres),
      ...{limit: 100},
    };

    // Get the recommendations from the api based on the options and the seed data
    spotifyApi.getFilteredRecommendations(options).then((response: any) => {
      // setRecommendations(response.tracks);
      const tracksToAdd: RecommendedTrack[] = [];

      response.tracks.forEach((track: any) => {
        tracksToAdd.push({
          id: track.id,
          trackUri: track.uri,
          trackName: track.name,
          artistId: track.artists[0].id,
          artistName: track.artists[0].name,
          albumId: track.album.id,
          albumName: track.album.name,
          duration: track.duration_ms,
        });
      });

      tableStateDispatch({ type: IS_NOT_LOADING });
      setRecommendations(tracksToAdd);
    }).catch(() => {
      Alert.error(
        'No recommendations were returned by Spotify. You may have forgot to select recommendation genres.',
        5000
      );
    });
  };

  return (
    <>
      <h3 style={{ marginLeft: 8 }}>Filters</h3>
      <br />

      <Formik initialValues={initialValues} onSubmit={getRecommendations}>
        {(props: FormikProps<any>) => (
          <Form
            id="advanced-recommendation-filters"
            layout="inline"
            onSubmit={(checkStatus, event) => props.handleSubmit(event)}
          >
            <Row>
              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>
                  Recommendation Data
                  <HelpBlock tooltip>
                    "Automatic" will automatically choose one of your top artists and one of your top
                    tracks to use as seed data; you may then enter up to three genres. "Manual" will
                    allow you to add any combination of artists, tracks and genres.
                  </HelpBlock>
                </ControlLabel>
                <br/>
                <Field
                  name="recommendation_data"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={seedTypesOptions}
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => {
                        setRecommendationData(value);
                        form.setFieldValue('recommendation_data', value)
                      }}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 15}}>
                  Instrumental Tracks
                </ControlLabel>
                <br/>
                <Field
                  name="instrumental_tracks"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={instrumentalTracksOptions}
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('instrumental_tracks', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 15}}>
                  Acousticness
                </ControlLabel>
                <br/>
                <Field
                  name="acousticness"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={acousticnessOptions}
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('acousticness', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 15}}>
                  Live
                </ControlLabel>
                <br/>
                <Field
                  name="live_tracks"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={liveTrackOptions}
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('live_tracks', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>
                  Danceability
                  <HelpBlock tooltip>
                    Danceability describes how suitable a track is for dancing based on a
                    combination of musical elements including tempo, rhythm stability, beat
                    strength, and overall regularity.
                  </HelpBlock>
                </ControlLabel>
                <br/>
                <Field
                  name="danceability"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={genericRangeOptions}
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('danceability', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>
                  Energy
                  <HelpBlock tooltip>
                    Energy represents a perceptual measure of intensity and activity. Typically,
                    energetic tracks feel fast, loud, and noisy. For example, death metal has high
                    energy, while a Bach prelude scores low on the scale. Perceptual features
                    contributing to this attribute include dynamic range, perceived loudness, timbre,
                    onset rate, and general entropy.
                  </HelpBlock>
                </ControlLabel>
                <br/>
                <Field
                  name="energy"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={genericRangeOptions}
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('energy', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 15}}>
                  Spoken Word
                </ControlLabel>
                <br/>
                <Field
                  name="spoken_word"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={spokenWordOptions}
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('spoken_word', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>
                  Positivity
                  <HelpBlock tooltip>
                    Tracks with high positivity sound more happy, cheerful, or euphoric,
                    while tracks with low positivity sound more sad, depressed, or angry.
                  </HelpBlock>
                </ControlLabel>
                <br/>
                <Field
                  name="positivity"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={genericRangeOptions}
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('positivity', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>
                  Loudness
                </ControlLabel>
                <br/>
                <Field
                  name="loudness"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={loudnessOptions}
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('loudness', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>
                  Duration
                </ControlLabel>
                <br/>
                <Field
                  name="duration"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={durationOptions}
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('duration', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>
                  Popularity
                </ControlLabel>
                <br/>
                <Field
                  name="popularity"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={genericRangeOptions}
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('popularity', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>
                  Speed (BPM)
                </ControlLabel>
                <br/>
                <Field
                  name="tempo"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={tempoOptions}
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('tempo', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>
            </Row>
            <br />

            <RecommendationSeedData
              title="Seed Data"
              showArtists={recommendationData === RecommendationDataOption.MANUAL}
              showTracks={recommendationData === RecommendationDataOption.MANUAL}
            />

            <Row>
              <Col>
                <Button color="green" type="submit">Get Recommendations</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>

      <RecommendationTable
        recommendations={recommendations}
        tableState={tableState}
        tableStateDispatch={tableStateDispatch}
      />
    </>
  );
};

export default SimpleRecommendations;
