import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC9PJIqnM98p-2r7efeKNI54qf9nYJ2l58',
  authDomain: 'react-gallery-3ffdc.firebaseapp.com',
  projectId: 'react-gallery-3ffdc',
  storageBucket: 'react-gallery-3ffdc.appspot.com',
  messagingSenderId: '844124656098',
  appId: '1:844124656098:web:4d7a1bf3e64f8feb47a9bb',
};

const firebaseApp = initializeApp(firebaseConfig);
//configura e conecta no firebase

export const storage = getStorage(firebaseApp);
// conecta no storage especificamente
