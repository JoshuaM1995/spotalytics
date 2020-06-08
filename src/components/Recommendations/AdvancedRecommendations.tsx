import React, {useContext, useEffect, useState} from 'react';
import {
  AutoComplete, Button,
  Col,
  ControlLabel,
  Form,
  HelpBlock,
  Icon,
  InputGroup,
  Message,
  Row,
  SelectPicker,
  Slider, TagPicker
} from "rsuite";
import {Field, Formik, FormikProps} from "formik";
import RecommendationInputNumber from "./RecommendationInputNumber";
import moment from "moment";
import SpotifyApi from "../../api/SpotifyApi";
import SpotifyContext from "../../context/spotify";
import {
  SpotifyAdvancedRecommendationOptions
} from "../../api/interfaces/requests/spotify/spotifyAdvancedRecommendationOptions";

const initialValues: SpotifyAdvancedRecommendationOptions = {
  min_instrumentalness: 0,
  max_instrumentalness: 1,
  min_acousticness: 0,
  max_acousticness: 1,
  min_danceability: 0,
  max_danceability: 1,
  min_duration_ms: 0,
  max_duration_ms: 60,
  min_energy: 0,
  max_energy: 1,
  min_key: 0,
  max_key: 11,
  min_mode: 0,
  max_mode: 1,
  min_liveness: 0,
  max_liveness: 1,
  min_loudness: -60,
  max_loudness: 0,
  min_popularity: 0,
  max_popularity: 100,
  min_speechiness: 0,
  max_speechiness: 1,
  min_tempo: 0,
  max_tempo: 300,
  min_valence: 0,
  max_valence: 1,
  min_time_signature: 3,
  max_time_signature: 7,
};

const keyOptions = [
  {value: 0, label: 'C'},
  {value: 1, label: 'C♯, D♭'},
  {value: 2, label: 'D'},
  {value: 3, label: 'D♯, E♭'},
  {value: 4, label: 'E'},
  {value: 5, label: 'F'},
  {value: 6, label: 'F♯, G♭'},
  {value: 7, label: 'G'},
  {value: 8, label: 'G♯, A♭'},
  {value: 9, label: 'A'},
  {value: 10, label: 'A♯, B♭'},
  {value: 11, label: 'B'},
];

const modalityOptions = [
  {value: 0, label: 'Minor'},
  {value: 1, label: 'Major'},
];

const timeSignatureOptions = [
  {value: 3, label: '3/4'},
  {value: 4, label: '4/4'},
  {value: 5, label: '5/4'},
  {value: 6, label: '6/4'},
  {value: 7, label: '7/4'},
];

const AdvancedRecommendations = () => {
  const [genreOptions, setGenreOptions] = useState<any[]>([]);
  const {spotifyContext} = useContext(SpotifyContext);

  useEffect(() => {
    console.log('advanced');
    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);

    spotifyApi.getAvailableGenres().then((response: SpotifyApi.AvailableGenreSeedsResponse) => {
      const genres = response.genres.map((genre) => {
        return {value: genre, label: genre}
      });
      setGenreOptions(genres);
    });
  }, []);

  const getRecommendations = (options: SpotifyAdvancedRecommendationOptions) => {
    options.min_duration_ms = moment.duration(options.min_duration_ms, 'minutes').asMilliseconds();
    options.max_duration_ms = moment.duration(options.max_duration_ms, 'minutes').asMilliseconds();
    console.log('form values', options);

    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
    spotifyApi.getFilteredRecommendations(options).then((response) => {
      console.log('response', response);
    });
  };

  return (
    <>
      <Message
        type="info"
        showIcon
        description="Recommendations are generated based on the available information for a
                    given seed entity and matched against similar artists and tracks. If there
                    is sufficient information about the provided seeds, a list of tracks will
                    be returned. For artists and tracks that are very new or obscure there
                    might not be enough data to generate a list of tracks."
      />
      <br />

      <Formik initialValues={initialValues} onSubmit={getRecommendations}>
        {(props: FormikProps<SpotifyAdvancedRecommendationOptions>) => (
          <Form
            id="advanced-recommendation-filters"
            layout="inline"
            onSubmit={(checkStatus, event) => props.handleSubmit(event)}
          >
            <Row>
              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Minimum Instrumentalness"
                  inputName="min_instrumentalness"
                  helpText="Values above 0.5 are intended to represent instrumental tracks, but
                              confidence is higher as the value approaches 1.0."
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Maximum Instrumentalness"
                  inputName="max_instrumentalness"
                  helpText="Values above 0.5 are intended to represent instrumental tracks, but
                              confidence is higher as the value approaches 1.0."
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Minimum Acousticness"
                  inputName="min_acousticness"
                  helpText="A confidence measure from 0.0 to 1.0 of whether the track is acoustic.
                              1.0 represents a high confidence the track is acoustic."
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Maximum Acousticness"
                  inputName="max_acousticness"
                  helpText="A confidence measure from 0.0 to 1.0 of whether the track is acoustic.
                              1.0 represents a high confidence the track is acoustic."
                />
              </Col>
            </Row>

            <Row>
              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Minimum Danceability"
                  inputName="min_danceability"
                  helpText="A value of 0.0 is least danceable and 1.0 is most danceable."
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Maximum Danceability"
                  inputName="max_danceability"
                  helpText="A value of 0.0 is least danceable and 1.0 is most danceable."
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Minimum Energy"
                  inputName="min_energy"
                  helpText="Energy is a measure from 0.0 to 1.0 and represents a perceptual
                            measure of intensity and activity."
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Maximum Energy"
                  inputName="max_energy"
                  helpText="Energy is a measure from 0.0 to 1.0 and represents a perceptual
                            measure of intensity and activity."
                />
              </Col>
            </Row>

            <Row>
              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Minimum Liveness"
                  inputName="min_liveness"
                  helpText="Detects the presence of an audience in the recording. A value above
                          0.8 provides strong likelihood that the track is live."
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Maximum Liveness"
                  inputName="max_liveness"
                  helpText="Detects the presence of an audience in the recording. A value above
                          0.8 provides strong likelihood that the track is live."
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Minimum Speechiness"
                  inputName="min_speechiness"
                  helpText="Detects the presence of spoken words in a track. Values above 0.66
                          describe tracks that are probably made entirely of spoken words.
                          Values between 0.33 and 0.66 describe tracks that may contain both
                          music and speech. Values below 0.33 most likely represent music and
                          other non-speech-like tracks."
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Maximum Speechiness"
                  inputName="max_speechiness"
                  helpText="Detects the presence of spoken words in a track. Values above 0.66
                          describe tracks that are probably made entirely of spoken words.
                          Values between 0.33 and 0.66 describe tracks that may contain both
                          music and speech. Values below 0.33 most likely represent music and
                          other non-speech-like tracks."
                />
              </Col>
            </Row>

            <Row>
              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Minimum Valence"
                  inputName="min_valence"
                  helpText="A measure from 0.0 to 1.0 describing the musical positiveness conveyed
                          by a track. Tracks with high valence sound more positive (e.g. happy,
                          cheerful, euphoric), while tracks with low valence sound more negative
                          (e.g. sad, depressed, angry)."
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Maximum Valence"
                  inputName="max_valence"
                  helpText="A measure from 0.0 to 1.0 describing the musical positiveness conveyed
                          by a track. Tracks with high valence sound more positive (e.g. happy,
                          cheerful, euphoric), while tracks with low valence sound more negative
                          (e.g. sad, depressed, angry)."
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Minimum Loudness"
                  inputName="min_loudness"
                  helpText="Loudness is the quality of a sound that is the primary psychological
                          correlate of physical strength (amplitude). Values typical range
                          between -60 and 0 db."
                  min={-60}
                  max={0}
                  step={1}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Maximum Loudness"
                  inputName="max_loudness"
                  helpText="Loudness is the quality of a sound that is the primary psychological
                          correlate of physical strength (amplitude). Values typical range
                          between -60 and 0 db."
                  min={-60}
                  max={0}
                  step={1}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>Minimum Key</ControlLabel>
                <br/>
                <Field
                  name="min_key"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={keyOptions}
                      placeholder="Select Key"
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('min_key', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>Maximum Key</ControlLabel>
                <br/>
                <Field
                  name="max_key"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={keyOptions}
                      placeholder="Select Key"
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('max_key', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>Minimum Modality</ControlLabel>
                <br/>
                <Field
                  name="min_mode"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={modalityOptions}
                      placeholder="Select Modality"
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('min_mode', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>Maximum Modality</ControlLabel>
                <br/>
                <Field
                  name="max_mode"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={modalityOptions}
                      placeholder="Select Modality"
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('max_mode', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>Minimum Time Signature</ControlLabel>
                <br/>
                <Field
                  name="min_time_signature"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={timeSignatureOptions}
                      placeholder="Select Time Signature"
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('min_time_signature', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>Maximum Time Signature</ControlLabel>
                <br/>
                <Field
                  name="max_time_signature"
                  render={({field, form}: any) => (
                    <SelectPicker
                      {...field}
                      data={timeSignatureOptions}
                      placeholder="Select Time Signature"
                      searchable={false}
                      cleanable={false}
                      onChange={(value) => form.setFieldValue('max_time_signature', value)}
                      style={{width: '100%'}}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Minimum Duration (Minutes)"
                  inputName="min_duration_ms"
                  min={0}
                  max={60}
                  step={1}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <RecommendationInputNumber
                  label="Maximum Duration (Minutes)"
                  inputName="max_duration_ms"
                  min={0}
                  max={60}
                  step={1}
                />
              </Col>
            </Row>

            <Row>
              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>
                  Minimum Popularity
                  <HelpBlock tooltip>
                    The popularity is calculated by algorithm and is based, in the most part,
                    on the total number of plays the track has had and how recent those plays are.
                  </HelpBlock>
                </ControlLabel>
                <Field
                  name="min_popularity"
                  render={({field, form}: any) => (
                    <Slider
                      {...field}
                      progress
                      onChange={(value) => form.setFieldValue('min_popularity', value)}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>
                  Maximum Popularity
                  <HelpBlock tooltip>
                    The popularity is calculated by algorithm and is based, in the most part,
                    on the total number of plays the track has had and how recent those plays are.
                  </HelpBlock>
                </ControlLabel>
                <Field
                  name="max_popularity"
                  render={({field, form}: any) => (
                    <Slider
                      {...field}
                      progress
                      onChange={(value) => form.setFieldValue('max_popularity', value)}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>
                  Minimum Tempo
                  <HelpBlock tooltip>
                    The overall estimated tempo of a track in beats per minute (BPM). In musical
                    terminology, tempo is the speed or pace of a given piece and derives directly
                    from the average beat duration.
                  </HelpBlock>
                </ControlLabel>
                <Field
                  name="min_tempo"
                  render={({field, form}: any) => (
                    <Slider
                      {...field}
                      progress
                      min={0}
                      max={300}
                      step={1}
                      onChange={(value) => form.setFieldValue('min_tempo', value)}
                    />
                  )}
                />
              </Col>

              <Col xs={24} sm={12} md={6}>
                <ControlLabel style={{marginBottom: 8}}>
                  Maximum Tempo
                  <HelpBlock tooltip>
                    The overall estimated tempo of a track in beats per minute (BPM). In musical
                    terminology, tempo is the speed or pace of a given piece and derives directly
                    from the average beat duration.
                  </HelpBlock>
                </ControlLabel>
                <Field
                  name="max_tempo"
                  render={({field, form}: any) => (
                    <Slider
                      {...field}
                      progress
                      min={0}
                      max={300}
                      step={1}
                      onChange={(value) => form.setFieldValue('max_tempo', value)}
                    />
                  )}
                />
              </Col>
            </Row>

            <br/>
            <br/>

            <h3>Seed Data</h3>

            <Message
              type="info"
              showIcon
              description="Up to 5 seed values may be provided in any combination of artists,
                           tracks and genres."
            />

            <Row>
              <Col xs={24} md={8}>
                <ControlLabel style={{marginBottom: 8}}>Seed Artists</ControlLabel>
                <InputGroup inside style={{}}>
                  <InputGroup.Addon>
                    <Icon icon="user"/>
                  </InputGroup.Addon>
                  <AutoComplete data={[]} placeholder="Search Artists..."/>
                </InputGroup>
              </Col>

              <Col xs={24} md={8}>
                <ControlLabel style={{marginBottom: 8}}>Seed Tracks</ControlLabel>
                <InputGroup inside style={{}}>
                  <InputGroup.Addon>
                    <Icon icon="music"/>
                  </InputGroup.Addon>
                  <AutoComplete data={[]} placeholder="Search Tracks..."/>
                </InputGroup>
              </Col>

              <Col xs={24} md={8}>
                <ControlLabel style={{marginBottom: 8}}>Seed Genres</ControlLabel>
                <TagPicker
                  data={genreOptions}
                  placeholder="Select Genre(s)"
                  style={{width: '100%'}}
                />
              </Col>
            </Row>

            <Button color="green" style={{marginTop: 35}} type="submit">
              Get Recommendations
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AdvancedRecommendations;
