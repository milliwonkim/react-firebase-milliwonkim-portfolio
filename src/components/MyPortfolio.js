import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { firebase, storage } from '../firebase';
import YouTube from 'react-youtube';
import ReactCrop from '../utils/Crop';

export default function MyPortfolio() {
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [description, setDescription] = useState('');
    const [videoId, setVideoId] = useState('');
    const [genre, setGenre] = useState('music');
    const [genre2, setGenre2] = useState('');

    // const allInputs = { imgUrl: '' };
    // const [imageAsUrl, setImageAsUrl] = useState(allInputs);
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState('');
    const [imageAsFile, setImageAsFile] = useState('');
    const [rendering, setRendering] = useState([]);

    const [count, setCount] = useState(0);

    const [error, setError] = useState('');

    useEffect(() => {
        console.log(image);
        const unsubscribe = firebase
            .firestore()
            .collection('tasks')
            .orderBy('moment', 'desc')
            .onSnapshot((snapshot) => {
                const newRendering = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                });
                console.log(newRendering);
                setRendering(newRendering);
            });

        setGenre2('overview');

        return () => unsubscribe();
    }, []);

    const appliedHandleFireBaseUpload = (e) => {
        if (
            title === '' ||
            writer === '' ||
            description === '' ||
            videoId === '' ||
            imageAsFile === ''
        ) {
            console.log('Please Input something');
            setError('Please Input something');
            setCount((prevCount) => prevCount + 1);
            e.preventDefault();
        } else {
            handleFireBaseUpload(e);
        }
    };

    const handleFireBaseUpload = (e) => {
        e.preventDefault();
        console.log('start of upload');
        if (imageAsFile === '') {
            console.log(
                `not an image, the image file is ${typeof imageAsFile}`
            );
        }
        const uploadTask = storage
            .ref(`images/${imageAsFile.name}`)
            .put(imageAsFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                let progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (progress >= 100) {
                    progress = 0;
                }
                console.log('Upload is ' + progress + '% done');
                setProgress(progress);
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            },
            (err) => {
                console.log(err);
            },
            () => {
                storage
                    .ref('images')
                    .child(imageAsFile.name)
                    .getDownloadURL()
                    .then((fireBaseUrl) => {
                        firebase
                            .firestore()
                            .collection('tasks')
                            .add({
                                genre,
                                title,
                                writer,
                                description,
                                videoId,
                                moment: moment().format('YYYY-MM-DD_h:mm:ss'),
                                image: fireBaseUrl,
                            });
                        setImageAsFile((prevObject) => ({
                            ...prevObject,
                            imgUrl: fireBaseUrl,
                        }));
                        console.log(fireBaseUrl);
                    });
            }
        );
        setTitle('');
        setWriter('');
        setDescription('');
        setVideoId('');
    };

    const handleImageAsFile = (e) => {
        const image = e.target.files[0];
        setImageAsFile(image);
    };

    const handleDelete = (id) => {
        firebase.firestore().collection('tasks').doc(id).delete();
    };

    const opts = {
        width: '350',
        height: '200',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    const _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    };

    return (
        <StyledDiv3>
            <h1>SHOW ME WHAT YOU GOT!!</h1>
            <StyledProgress value={progress} max='100' />
            <select
                name='selectGenre'
                id='selectGenre'
                onChange={(e) => setGenre2(e.target.value)}>
                <option value='overview'>Overview</option>
                <option value='music'>Music</option>
                <option value='art'>Art</option>
            </select>
            <StyledGrid1>
                {rendering
                    .filter((r) => {
                        if (genre2 === 'overview') {
                            return r;
                        } else {
                            return r.genre === genre2;
                        }
                    })
                    .map((r, i) => {
                        return (
                            <StyledDiv2 key={r.id}>
                                <StyledDiv4>
                                    <h5>{r.genre}</h5>
                                    <h3>{r.writer}</h3>
                                    <h6>{r.moment}</h6>
                                </StyledDiv4>
                                <StyledDiv4>
                                    <h3>{r.title}</h3>
                                    <h3>{r.description}</h3>
                                    <YouTube
                                        videoId={r.videoId}
                                        opts={opts}
                                        onReady={_onReady}
                                    />
                                    <div>
                                        <StyledImg
                                            width='350'
                                            height='200'
                                            src={r.image}
                                            alt='image tag'
                                        />
                                    </div>
                                </StyledDiv4>
                                <StyledDiv5>
                                    <StyledDiv6>
                                        <StyledButton
                                            onClick={() => handleDelete(r.id)}>
                                            Delete
                                        </StyledButton>
                                    </StyledDiv6>
                                </StyledDiv5>
                            </StyledDiv2>
                        );
                    })}
            </StyledGrid1>
            <StyledSummaryBorder>
                <form onSubmit={appliedHandleFireBaseUpload}>
                    <h1>Add Portfolio</h1>
                    <label htmlFor='genre'>장르</label>
                    <select
                        name='genre'
                        id='genre'
                        onChange={(e) => setGenre(e.target.value)}>
                        <option value='music'>Music</option>
                        <option value='art'>Art</option>
                    </select>
                    {genre}
                    <h3>* 제목 *</h3>
                    <StyledInput
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <h3>* 참여자 *</h3>
                    <StyledInput
                        onChange={(e) => setWriter(e.target.value)}
                        value={writer}
                    />
                    <h3>* 간단설명 *</h3>
                    <StyledInput
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                    <h3>유튜브 인풋</h3>
                    <StyledInput
                        onChange={(e) => setVideoId(e.target.value)}
                        value={videoId}
                    />
                    <h3>첨부파일</h3>
                    <ReactCrop />
                    <StyledFileLabel htmlFor='upload_file'>
                        파일 업로드
                    </StyledFileLabel>
                    <StyledFile
                        type='file'
                        id='upload_file'
                        onChange={handleImageAsFile}
                    />
                    <br />
                    <br />
                    <StyledButton type='submit'>제출</StyledButton>
                </form>
                {`${count === 0 ? '' : count} ${error}`}
            </StyledSummaryBorder>
        </StyledDiv3>
    );
}

const StyledGrid1 = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    padding: 8px;
    gap: 10px;

    @media (min-width: 730px) {
        grid-template-columns: 1fr 1fr;
        min-width: 600px;
    }

    @media (min-width: 1100px) {
        grid-template-columns: 1fr 1fr 1fr;
        min-width: 375px;
    }

    @media (min-width: 1500px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        min-width: 375px;
    }
`;

const StyledDiv1 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: transparent;
    box-shadow: 2px 2px 10px 0.2px;
    border-radius: 8px;
    padding: 8px;
    height: auto;
    width: auto;
`;

const StyledProgress = styled.progress`
    height: 30px;
    width: 50vw;
    color: green;
`;

const StyledDiv2 = styled.div`
    display: flex;
    border: transparent;
    box-shadow: 2px 2px 10px 0.2px;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
`;

const StyledDiv3 = styled.div`
    min-width: 350px;
`;

const StyledDiv4 = styled.div`
    display: flex;
    border: transparent;
    flex-direction: column;
    justify-content: center;
`;

const StyledDiv5 = styled.div`
    position: relative;
    height: 50px;
`;

const StyledDiv6 = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`;

const StyledSummaryBorder = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 350px;
    border: transparent;
    padding: 10px;
    margin: 10px 0;
    border-radius: 8px;
    box-shadow: 2px 2px 10px 0.2px;
    border-radius: 8px;
`;

const StyledInput = styled.input`
    width: 200px;
    border: transparent;
    box-shadow: 2px 2px 10px 0.2px;
    border-radius: 8px;
    height: 40px;
    width: 30vw;
`;

const StyledFile = styled.input`
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
`;

const StyledFileLabel = styled.label`
    display: inline-block;
    border: transparent;
    box-shadow: 2px 2px 10px 0.2px;
    border-radius: 8px;
    padding: 8px;
`;

const StyledButton = styled.button`
    width: 200px;
    height: 30px;
    border: transparent;
    box-shadow: 2px 2px 10px 0.2px;
    border-radius: 8px;
`;

const StyledImg = styled.img`
    text-align: center;
`;
