import { useState, useEffect, FormEvent } from 'react';
import * as C from './App.styles';
import * as Photos from './services/photos';
import { Photo } from './types/Photo';
import 'materialize-css/dist/css/materialize.min.css';
import { PhotoItem } from './components/PhotoItem';

//import { PhotoItem } from './components/PhotoItem';

const App = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = async () => {
    setLoading(true);
    setPhotos(await Photos.getAll());
    setLoading(false);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    if (file && file.size > 0) {
      setUploading(true);
      let result = await Photos.insert(file);
      setUploading(false);

      if (result instanceof Error) {
        alert(`${result.name} - ${result.message}`);
      } else {
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  };

  return (
    <C.Container>
      <C.Area>
        <C.Header>
          Galeria de Fotos
          <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
            <input type="file" name="image" />
            <input type="submit" value="Enviar" />
            {uploading && 'Enviando...'}
          </C.UploadForm>
          {loading && (
            <C.ScreenWarning>
              <div className="preloader-wrapper active">
                <div className="spinner-layer spinner-red-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div>
                  <div className="gap-patch">
                    <div className="circle"></div>
                  </div>
                  <div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>

              <div className="loading">Carregando...</div>
            </C.ScreenWarning>
          )}
          {!loading && photos.length > 0 && (
            <C.PhotoList>
              {photos.map((item, index) => (
                <PhotoItem key={index} url={item.url} name={item.name} />
              ))}
            </C.PhotoList>
          )}
          {!loading && photos.length === 0 && (
            <C.ScreenWarning>
              <div className="emoji">😞</div>
              <div>Não há fotos cadastradas.</div>
            </C.ScreenWarning>
          )}
        </C.Header>
      </C.Area>
    </C.Container>
  );
};

export default App;
