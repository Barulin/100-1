import {database, initializeApp} from 'firebase';
import {environment} from '../src/environments/environment';
import {data} from './games-db';

initializeApp(environment.firebase);

const roundsRef = database().ref('rounds');

async function populate() {
  await roundsRef.set(null);

  const promises = data.map(i => roundsRef.push(i));

  await Promise.all(promises);

  process.exit();
}

populate();

