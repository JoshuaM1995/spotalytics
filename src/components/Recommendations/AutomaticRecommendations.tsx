import React from 'react';
import {Button, Message, Tag} from "rsuite";

const AutomaticRecommendations = () => {
  return (
    <>
      <h5 style={{marginLeft: 8}}>
        The music you listen to most is: low in <Tag color="violet">danceability</Tag>{' '}
        high in<Tag color="orange">energy</Tag> low in<Tag color="blue">positivity</Tag>{' '}
        very<Tag color="red">loud</Tag> and<Tag color="cyan">fast</Tag> and not very
        <Tag color="green">popular</Tag>.
        <br /><br />

        You tend to prefer <Tag>non-instrumental</Tag> tracks which are generally recorded in the
        <Tag>studio</Tag>. The songs you listen to tend to be around<Tag>5 minutes</Tag> long on average.
        <br /><br />

        Your top artist is <Tag>Trivium</Tag>, your top album is<Tag>Outsider (Veil of Maya)</Tag>{' '}
        and your most listened to genre is<Tag>Heavy Metal</Tag>.
      </h5>
      <br /><br />

      <Button color="green">Get Recommendations</Button>
    </>
  );
};

export default AutomaticRecommendations;
