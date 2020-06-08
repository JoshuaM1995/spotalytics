import React from 'react';
import {Button, Col, ControlLabel, Form, HelpBlock, Message, Row, SelectPicker} from "rsuite";
import {Field, Formik, FormikProps} from "formik";
import {
  AcousticnessOption,
  DurationOption,
  GenericRangeOption,
  InstrumentalTrackOption,
  LiveTrackOption,
  LoudnessOption,
  SeedTypeOption,
  SpokenWordOption,
  SpotifySimpleRecommendationOptions,
  TempoOption
} from "../../api/interfaces/requests/spotify/spotifyAdvancedRecommendationOptions";
import {
  getAcousticnessRecommendationOptions,
  getInstrumentalnessRecommendationOptions
} from "../../utils/recommendations";

const initialValues: SpotifySimpleRecommendationOptions = {
  recommendation_data: SeedTypeOption.BOTH,
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
};

const seedTypesOptions = [
  { value: SeedTypeOption.BOTH, label: SeedTypeOption.BOTH },
  { value: SeedTypeOption.ARTIST, label: SeedTypeOption.ARTIST },
  { value: SeedTypeOption.ALBUM, label: SeedTypeOption.ALBUM },
];

const instrumentalTracksOptions = [
  { value: InstrumentalTrackOption.ANY, label: InstrumentalTrackOption.ANY },
  { value: InstrumentalTrackOption.INSTRUMENTAL_ONLY, label: InstrumentalTrackOption.INSTRUMENTAL_ONLY },
  { value: InstrumentalTrackOption.NON_INSTRUMENTAL_ONLY, label: InstrumentalTrackOption.NON_INSTRUMENTAL_ONLY },
];

const acousticnessOptions = [
  { value: AcousticnessOption.ANY, label: AcousticnessOption.ANY, },
  { value: AcousticnessOption.ACOUSTIC_ONLY, label: AcousticnessOption.ACOUSTIC_ONLY, },
  { value: AcousticnessOption.NON_ACOUSTIC_ONLY, label: AcousticnessOption.NON_ACOUSTIC_ONLY, },
];

const genericRangeOptions = [
  { value: GenericRangeOption.ANY, label: GenericRangeOption.ANY },
  { value: GenericRangeOption.LOW, label: GenericRangeOption.LOW },
  { value: GenericRangeOption.MEDIUM, label: GenericRangeOption.MEDIUM },
  { value: GenericRangeOption.HIGH, label: GenericRangeOption.HIGH },
];

const liveTrackOptions = [
  { value: LiveTrackOption.ANY, label: LiveTrackOption.ANY },
  { value: LiveTrackOption.LIVE_ONLY, label: LiveTrackOption.LIVE_ONLY },
  { value: LiveTrackOption.STUDIO_ONLY, label: LiveTrackOption.STUDIO_ONLY },
];

const spokenWordOptions = [
  { value: SpokenWordOption.ANY, label: SpokenWordOption.ANY },
  { value: SpokenWordOption.SPOKEN_WORD_ONLY, label: SpokenWordOption.SPOKEN_WORD_ONLY },
  { value: SpokenWordOption.SPOKEN_AND_MUSIC, label: SpokenWordOption.SPOKEN_AND_MUSIC },
  { value: SpokenWordOption.MUSIC_ONLY, label: SpokenWordOption.MUSIC_ONLY },
];

const loudnessOptions = [
  { value: LoudnessOption.ANY, label: LoudnessOption.ANY },
  { value: LoudnessOption.QUIET, label: LoudnessOption.QUIET },
  { value: LoudnessOption.MEDIUM, label: LoudnessOption.MEDIUM },
  { value: LoudnessOption.LOUD, label: LoudnessOption.LOUD },
];

const durationOptions = [
  { value: DurationOption.ANY, label: DurationOption.ANY },
  { value: DurationOption.SHORT, label: DurationOption.SHORT },
  { value: DurationOption.MEDIUM, label: DurationOption.MEDIUM },
  { value: DurationOption.LONG, label: DurationOption.LONG },
];

const tempoOptions = [
  { value: TempoOption.ANY, label: TempoOption.ANY },
  { value: TempoOption.SLOW, label: TempoOption.SLOW },
  { value: TempoOption.MEDIUM, label: TempoOption.MEDIUM },
  { value: TempoOption.FAST, label: TempoOption.FAST },
];

const SimpleRecommendations = () => {
  const getRecommendations = (formValues: SpotifySimpleRecommendationOptions) => {
    // Build the options based on what the user selected
    const options = {
      ...getInstrumentalnessRecommendationOptions(formValues.instrumental_tracks),
      ...getAcousticnessRecommendationOptions(formValues.acousticness),
    };

    // TODO: Get the recommendations from the api based on the options and the seed data
    console.log('options', options);
  };

  return (
    <>
      <Message
        type="info"
        showIcon
        description="Recommendations are generated based on the selected filter values,
                   your top artists/albums (randomly chosen), and one or two genres you
                   choose. Spotify's algorithm may not return anything if your top artists
                   have recently been added to Spotify or if they're too obscure."
      />
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
                    "Artist" will randomly select 3 of your top artists, and "Album" will randomly
                    select 3 top albums. Both will either randomly select 2 top artists and 1 top
                    album, or 1 top artist and 2 top albums.
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
                      onChange={(value) => form.setFieldValue('recommendation_data', value)}
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

            <Row>
              <Col>
                <Button color="green" type="submit">Get Recommendations</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SimpleRecommendations;
