import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.less';
import { publish } from '../publish/github/web';

const Hello = () => {
  const [pc, setProcess] = useState(0);
  const [msg, setMsg] = useState<string>('');

  const onClick = () => {
    console.log(window, publish);
    if (window.electron) {
      window.electron.ipcRenderer.publish({
        url: 'https://www.github.com/login',
      });
    } else {
      publish(
        {
          form: {
            accessToken: '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',
            // owner: 'ludejun',
            repo: 'CHENJI',
            keepPath: true,
          },
          note: {},
        },
        (process, message) => {
          setProcess(process);
          setMsg(message);
        },
        (type, message, help) => {
          setProcess(100);
          setMsg(message);
        }
      );
    }
  };
  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
        <button type="button" onClick={onClick}>
          发布
        </button>
      </div>
      <p>进度：{pc}</p>
      <p>说明：{msg}</p>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
