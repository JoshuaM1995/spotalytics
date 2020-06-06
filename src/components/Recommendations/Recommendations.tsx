import React, {useContext} from 'react';
import Page from "../Page/Page";
import {Button, ControlLabel, Form, FormGroup, HelpBlock, SelectPicker, Slider} from "rsuite";
import './Recommendations.scss';
import {Field, Formik, FormikProps} from "formik";
import RecommendationInputNumber from "./RecommendationInputNumber";
import moment from 'moment';
import SpotifyRecommendationOptions from "../../api/interfaces/requests/spotify/spotifyRecommendationOptions";
import SpotifyApi from "../../api/SpotifyApi";
import SpotifyContext from "../../context/spotify";

const initialValues: SpotifyRecommendationOptions = {
  min_instrumentalness: 0,
  max_instrumentalness: 1,
  min_acousticness: 0,
  max_acousticness: 1,
  min_danceability: 0,
  max_danceability: 1,
  min_duration: 0,
  max_duration: 60,
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
  { value: 0, label: 'C' },
  { value: 1, label: 'C♯, D♭' },
  { value: 2, label: 'D' },
  { value: 3, label: 'D♯, E♭' },
  { value: 4, label: 'E' },
  { value: 5, label: 'F' },
  { value: 6, label: 'F♯, G♭' },
  { value: 7, label: 'G' },
  { value: 8, label: 'G♯, A♭' },
  { value: 9, label: 'A' },
  { value: 10, label: 'A♯, B♭' },
  { value: 11, label: 'B' },
];

const modalityOptions = [
  { value: 0, label: 'Minor' },
  { value: 1, label: 'Major' },
];

const timeSignatureOptions = [
  { value: 3, label: '3/4' },
  { value: 4, label: '4/4' },
  { value: 5, label: '5/4' },
  { value: 6, label: '6/4' },
  { value: 7, label: '7/4' },
];

const Recommendations = () => {
  const { spotifyContext } = useContext(SpotifyContext);

  const getRecommendations = (options: SpotifyRecommendationOptions) => {
    options.min_duration = moment.duration(options.min_duration, 'minutes').asMilliseconds();
    options.max_duration = moment.duration(options.max_duration, 'minutes').asMilliseconds();
    console.log('form values', options);

    const spotifyApi = new SpotifyApi(spotifyContext.accessToken);
    spotifyApi.getFilteredRecommendations(options).then((response) => {
      console.log('response', response);
    });
  };

  return (
    <Page title="Recommendations">
      <h3>Advanced Recommendation Filters</h3>
      <br />
      <Formik initialValues={initialValues} onSubmit={getRecommendations}>
        {(props: FormikProps<SpotifyRecommendationOptions>) => (
          <Form
            layout="inline"
            onSubmit={(checkStatus, event) => props.handleSubmit(event)}
          >
            <FormGroup>
              <RecommendationInputNumber
                label="Minimum Instrumentalness"
                inputName="min_instrumentalness"
                helpText="Values above 0.5 are intended to represent instrumental tracks, but
                          confidence is higher as the value approaches 1.0."
              />
            </FormGroup>

            <FormGroup>
              <RecommendationInputNumber
                label="Maximum Instrumentalness"
                inputName="max_instrumentalness"
                helpText="Values above 0.5 are intended to represent instrumental tracks, but
                          confidence is higher as the value approaches 1.0."
              />
            </FormGroup>

            <FormGroup>
              <RecommendationInputNumber
                label="Minimum Acousticness"
                inputName="min_acousticness"
                helpText="A confidence measure from 0.0 to 1.0 of whether the track is acoustic.
                          1.0 represents a high confidence the track is acoustic."
              />
            </FormGroup>

            <FormGroup>
              <RecommendationInputNumber
                label="Maximum Acousticness"
                inputName="max_acousticness"
                helpText="A confidence measure from 0.0 to 1.0 of whether the track is acoustic.
                          1.0 represents a high confidence the track is acoustic."
              />
            </FormGroup>

            <FormGroup>
              <RecommendationInputNumber
                label="Minimum Danceability"
                inputName="min_danceability"
                helpText="A value of 0.0 is least danceable and 1.0 is most danceable."
              />
            </FormGroup>

            <FormGroup>
              <RecommendationInputNumber
                label="Maximum Danceability"
                inputName="max_danceability"
                helpText="A value of 0.0 is least danceable and 1.0 is most danceable."
              />
            </FormGroup>

            <FormGroup>
              <RecommendationInputNumber
                label="Minimum Energy"
                inputName="min_energy"
                helpText="Energy is a measure from 0.0 to 1.0 and represents a perceptual
                          measure of intensity and activity."
              />
            </FormGroup>

            <FormGroup>
              <RecommendationInputNumber
                label="Maximum Energy"
                inputName="max_energy"
                helpText="Energy is a measure from 0.0 to 1.0 and represents a perceptual
                          measure of intensity and activity."
              />
            </FormGroup>

            <FormGroup>
              <RecommendationInputNumber
                label="Minimum Liveness"
                inputName="min_liveness"
                helpText="Detects the presence of an audience in the recording. A value above
                          0.8 provides strong likelihood that the track is live."
              />
            </FormGroup>

            <FormGroup>
              <RecommendationInputNumber
                label="Maximum Liveness"
                inputName="max_liveness"
                helpText="Detects the presence of an audience in the recording. A value above
                          0.8 provides strong likelihood that the track is live."
              />
            </FormGroup>

            <FormGroup>
              <RecommendationInputNumber
                label="Minimum Speechiness"
                inputName="min_speechiness"
                helpText="Detects the presence of spoken words in a track. Values above 0.66
                          describe tracks that are probably made entirely of spoken words.
                          Values between 0.33 and 0.66 describe tracks that may contain both
                          music and speech. Values below 0.33 most likely represent music and
                          other non-speech-like tracks."
              />
            </FormGroup>

            <FormGroup>
              <RecommendationInputNumber
                label="Maximum Speechiness"
                inputName="max_speechiness"
                helpText="Detects the presence of spoken words in a track. Values above 0.66
                          describe tracks that are probably made entirely of spoken words.
                          Values between 0.33 and 0.66 describe tracks that may contain both
                          music and speech. Values below 0.33 most likely represent music and
                          other non-speech-like tracks."
              />
            </FormGroup>

            <FormGroup>
              <RecommendationInputNumber
                label="Minimum Valence"
                inputName="min_valence"
                helpText="A measure from 0.0 to 1.0 describing the musical positiveness conveyed
                          by a track. Tracks with high valence sound more positive (e.g. happy,
                          cheerful, euphoric), while tracks with low valence sound more negative
                          (e.g. sad, depressed, angry)."
              />
            </FormGroup>

            <FormGroup>
              <RecommendationInputNumber
                label="Maximum Valence"
                inputName="max_valence"
                helpText="A measure from 0.0 to 1.0 describing the musical positiveness conveyed
                          by a track. Tracks with high valence sound more positive (e.g. happy,
                          cheerful, euphoric), while tracks with low valence sound more negative
                          (e.g. sad, depressed, angry)."
              />
            </FormGroup>

            <FormGroup>
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
            </FormGroup>

            <FormGroup>
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
            </FormGroup>

            <FormGroup>
              <ControlLabel style={{ marginBottom: 8 }}>Minimum Key</ControlLabel>
              <br />
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
                    style={{ width: 200 }}
                  />
                )}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel style={{ marginBottom: 8 }}>Maximum Key</ControlLabel>
              <br />
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
                    style={{ width: 200 }}
                  />
                )}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel style={{ marginBottom: 8 }}>Minimum Modality</ControlLabel>
              <br />
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
                    style={{ width: 200 }}
                  />
                )}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel style={{ marginBottom: 8 }}>Maximum Modality</ControlLabel>
              <br />
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
                    style={{ width: 200 }}
                  />
                )}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel style={{ marginBottom: 8 }}>Minimum Time Signature</ControlLabel>
              <br />
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
                    style={{ width: 200 }}
                  />
                )}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel style={{ marginBottom: 8 }}>Maximum Time Signature</ControlLabel>
              <br />
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
                    style={{ width: 200 }}
                  />
                )}
              />
            </FormGroup>

            <FormGroup>
              <RecommendationInputNumber
                label="Minimum Duration (Minutes)"
                inputName="min_duration"
                min={0}
                max={60}
                step={1}
              />
            </FormGroup>

            <FormGroup>
              <RecommendationInputNumber
                label="Maximum Duration (Minutes)"
                inputName="max_duration"
                min={0}
                max={60}
                step={1}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel style={{ marginBottom: 8 }}>
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
                    style={{ width: 200 }}
                  />
                )}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel style={{ marginBottom: 8 }}>
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
                    style={{ width: 200 }}
                  />
                )}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel style={{ marginBottom: 8 }}>
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
                    style={{ width: 200 }}
                  />
                )}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel style={{ marginBottom: 8 }}>
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
                    style={{ width: 200 }}
                  />
                )}
              />
            </FormGroup>

            <br />

            <Button color="green" style={{marginTop: 35}} type="submit">
              Get Recommendations
            </Button>
          </Form>
        )}
      </Formik>
    </Page>
  );
};

export default Recommendations;
